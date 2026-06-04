<#
.SYNOPSIS
    Déploie TPC E-Solution sur Azure (Storage Static Website ou Static Web Apps).

.DESCRIPTION
    Script PowerShell de déploiement du fichier standalone HTML vers Azure.
    Deux modes :
      - Storage : Azure Storage account + Static Website (le moins cher, ~0.05€/mois)
      - SWA     : Azure Static Web Apps (gratuit, HTTPS auto, intégration Azure AD)

.PARAMETER Mode
    "Storage" ou "SWA". Par défaut : Storage.

.PARAMETER ResourceGroup
    Nom du resource group Azure (créé s'il n'existe pas).

.PARAMETER Location
    Région Azure. Par défaut : francecentral.

.PARAMETER StorageAccountName
    Nom du compte de stockage (3-24 caractères, minuscules + chiffres uniquement).
    Requis si Mode = Storage.

.PARAMETER SwaName
    Nom de la Static Web App. Requis si Mode = SWA.

.PARAMETER SourceFile
    Chemin du fichier HTML standalone à déployer.
    Par défaut : ../TPC E-Solution (standalone).html

.EXAMPLE
    .\Deploy-TPCESolution.ps1 -Mode Storage `
        -ResourceGroup rg-tpc-esolution `
        -StorageAccountName tpcesolutionprod

.EXAMPLE
    .\Deploy-TPCESolution.ps1 -Mode SWA `
        -ResourceGroup rg-tpc-esolution `
        -SwaName tpc-esolution

.NOTES
    Prérequis :
      - Azure CLI installé (https://aka.ms/installazurecli)
      - Connecté : az login
      - Abonnement actif : az account set --subscription "<id>"
#>

[CmdletBinding()]
param(
    [ValidateSet('Storage', 'SWA')]
    [string]$Mode = 'Storage',

    [Parameter(Mandatory = $true)]
    [string]$ResourceGroup,

    [string]$Location = 'francecentral',

    [string]$StorageAccountName,

    [string]$SwaName,

    [string]$SourceFile = (Join-Path $PSScriptRoot '..\TPC E-Solution (standalone).html')
)

$ErrorActionPreference = 'Stop'

# ---------- 0. Vérifications ----------
Write-Host "`n=== TPC E-Solution · Déploiement Azure ===" -ForegroundColor Cyan
Write-Host "Mode           : $Mode"
Write-Host "Resource Group : $ResourceGroup"
Write-Host "Location       : $Location"
Write-Host "Source         : $SourceFile`n"

if (-not (Get-Command az -ErrorAction SilentlyContinue)) {
    throw "Azure CLI (az) introuvable. Installer depuis https://aka.ms/installazurecli"
}

if (-not (Test-Path -LiteralPath $SourceFile)) {
    throw "Fichier source introuvable : $SourceFile"
}

# Vérifier la connexion
$account = az account show --output json 2>$null | ConvertFrom-Json
if (-not $account) {
    throw "Non connecté. Exécuter : az login"
}
Write-Host "Abonnement     : $($account.name) ($($account.id))" -ForegroundColor DarkGray

# ---------- 1. Resource Group ----------
Write-Host "`n[1/4] Resource Group..." -ForegroundColor Yellow
$rgExists = az group exists --name $ResourceGroup
if ($rgExists -eq 'false') {
    az group create --name $ResourceGroup --location $Location --output none
    Write-Host "  → créé : $ResourceGroup ($Location)" -ForegroundColor Green
} else {
    Write-Host "  → existe déjà : $ResourceGroup" -ForegroundColor DarkGray
}

# ---------- 2. Déploiement ----------
switch ($Mode) {

    'Storage' {
        if (-not $StorageAccountName) {
            throw "Le paramètre -StorageAccountName est requis en mode Storage."
        }
        if ($StorageAccountName -notmatch '^[a-z0-9]{3,24}$') {
            throw "StorageAccountName invalide : 3-24 caractères, minuscules et chiffres uniquement."
        }

        Write-Host "`n[2/4] Compte de stockage..." -ForegroundColor Yellow
        $saExists = az storage account check-name --name $StorageAccountName --query nameAvailable --output tsv
        if ($saExists -eq 'true') {
            az storage account create `
                --name $StorageAccountName `
                --resource-group $ResourceGroup `
                --location $Location `
                --sku Standard_LRS `
                --kind StorageV2 `
                --allow-blob-public-access true `
                --output none
            Write-Host "  → créé : $StorageAccountName" -ForegroundColor Green
        } else {
            Write-Host "  → existe déjà : $StorageAccountName" -ForegroundColor DarkGray
        }

        Write-Host "`n[3/4] Activation du site statique..." -ForegroundColor Yellow
        az storage blob service-properties update `
            --account-name $StorageAccountName `
            --static-website `
            --index-document 'index.html' `
            --404-document 'index.html' `
            --auth-mode login `
            --output none
        Write-Host "  → static website activé" -ForegroundColor Green

        Write-Host "`n[4/4] Upload du fichier..." -ForegroundColor Yellow
        az storage blob upload `
            --account-name $StorageAccountName `
            --container-name '$web' `
            --name 'index.html' `
            --file $SourceFile `
            --content-type 'text/html; charset=utf-8' `
            --overwrite `
            --auth-mode login `
            --output none
        Write-Host "  → uploadé comme index.html" -ForegroundColor Green

        $url = az storage account show `
            --name $StorageAccountName `
            --resource-group $ResourceGroup `
            --query 'primaryEndpoints.web' `
            --output tsv

        Write-Host "`n✅ Déploiement terminé." -ForegroundColor Green
        Write-Host "URL : $url" -ForegroundColor Cyan
    }

    'SWA' {
        if (-not $SwaName) {
            throw "Le paramètre -SwaName est requis en mode SWA."
        }

        # Static Web Apps n'est dispo qu'en quelques régions
        $swaLocations = @('westeurope', 'eastus2', 'centralus', 'westus2', 'eastasia')
        $swaLocation = if ($swaLocations -contains $Location) { $Location } else { 'westeurope' }

        Write-Host "`n[2/4] Création de la Static Web App..." -ForegroundColor Yellow
        Write-Host "  Région SWA : $swaLocation (différente du RG si nécessaire)" -ForegroundColor DarkGray

        $swaExists = az staticwebapp show --name $SwaName --resource-group $ResourceGroup --output json 2>$null
        if (-not $swaExists) {
            az staticwebapp create `
                --name $SwaName `
                --resource-group $ResourceGroup `
                --location $swaLocation `
                --sku Free `
                --output none
            Write-Host "  → créée : $SwaName" -ForegroundColor Green
        } else {
            Write-Host "  → existe déjà : $SwaName" -ForegroundColor DarkGray
        }

        # Préparer un dossier de déploiement
        Write-Host "`n[3/4] Préparation du package..." -ForegroundColor Yellow
        $stage = Join-Path ([System.IO.Path]::GetTempPath()) "swa-deploy-$([guid]::NewGuid().ToString('N'))"
        New-Item -ItemType Directory -Path $stage -Force | Out-Null
        Copy-Item -LiteralPath $SourceFile -Destination (Join-Path $stage 'index.html')

        # staticwebapp.config.json — headers de sécurité + SPA fallback
        $swaConfig = @'
{
  "navigationFallback": {
    "rewrite": "/index.html"
  },
  "globalHeaders": {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()"
  },
  "mimeTypes": {
    ".html": "text/html; charset=utf-8"
  }
}
'@
        Set-Content -Path (Join-Path $stage 'staticwebapp.config.json') -Value $swaConfig -Encoding UTF8
        Write-Host "  → package prêt : $stage" -ForegroundColor Green

        Write-Host "`n[4/4] Déploiement via SWA CLI..." -ForegroundColor Yellow
        if (-not (Get-Command swa -ErrorAction SilentlyContinue)) {
            Write-Host "  SWA CLI non détecté. Installation : npm install -g @azure/static-web-apps-cli" -ForegroundColor Yellow
            Write-Host "  Puis relancer ce script, ou déployer manuellement :"
            Write-Host "    cd $stage"
            Write-Host "    swa deploy . --app-name $SwaName --resource-group $ResourceGroup --env production"
            return
        }

        $deployToken = az staticwebapp secrets list `
            --name $SwaName `
            --resource-group $ResourceGroup `
            --query 'properties.apiKey' `
            --output tsv

        swa deploy $stage `
            --deployment-token $deployToken `
            --env production

        $url = az staticwebapp show `
            --name $SwaName `
            --resource-group $ResourceGroup `
            --query 'defaultHostname' `
            --output tsv

        Write-Host "`n✅ Déploiement terminé." -ForegroundColor Green
        Write-Host "URL : https://$url" -ForegroundColor Cyan

        # Nettoyage
        Remove-Item -Recurse -Force $stage
    }
}

Write-Host "`nÉtapes suivantes possibles :" -ForegroundColor DarkGray
Write-Host "  • Domaine custom : az staticwebapp hostname set ..." -ForegroundColor DarkGray
Write-Host "  • Auth Azure AD  : configurer staticwebapp.config.json (rôles + auth)" -ForegroundColor DarkGray
Write-Host "  • Restrictions IP : az storage account network-rule add ..." -ForegroundColor DarkGray
