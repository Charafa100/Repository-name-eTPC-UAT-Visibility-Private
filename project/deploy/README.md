# Déploiement TPC E-Solution sur Azure

Script PowerShell pour déployer le fichier `TPC E-Solution (standalone).html` sur Azure.

## Prérequis

1. **Azure CLI** — https://aka.ms/installazurecli
   ```powershell
   winget install Microsoft.AzureCLI
   ```
2. **Connexion**
   ```powershell
   az login
   az account set --subscription "<NOM-OU-ID-ABONNEMENT>"
   ```
3. **(Mode SWA uniquement)** SWA CLI
   ```powershell
   npm install -g @azure/static-web-apps-cli
   ```

## Usage

### Option 1 — Azure Storage Static Website (recommandé pour POC, ~0,05 €/mois)

```powershell
cd deploy
.\Deploy-TPCESolution.ps1 `
    -Mode Storage `
    -ResourceGroup rg-tpc-esolution `
    -StorageAccountName tpcesolutionprod
```

> Le nom du compte de stockage doit être **globalement unique**, 3-24 caractères, minuscules et chiffres uniquement.

URL finale : `https://<compte>.z6.web.core.windows.net/`

### Option 2 — Azure Static Web Apps (gratuit, HTTPS auto, intégration Azure AD)

```powershell
cd deploy
.\Deploy-TPCESolution.ps1 `
    -Mode SWA `
    -ResourceGroup rg-tpc-esolution `
    -SwaName tpc-esolution
```

URL finale : `https://<nom-aléatoire>.azurestaticapps.net/`

## Paramètres

| Paramètre              | Défaut                                  | Description                                      |
|------------------------|-----------------------------------------|--------------------------------------------------|
| `-Mode`                | `Storage`                               | `Storage` ou `SWA`                               |
| `-ResourceGroup`       | *(requis)*                              | Nom du resource group Azure                       |
| `-Location`            | `francecentral`                         | Région Azure                                     |
| `-StorageAccountName`  | *(requis en mode Storage)*              | Nom unique du compte de stockage                 |
| `-SwaName`             | *(requis en mode SWA)*                  | Nom de la Static Web App                         |
| `-SourceFile`          | `../TPC E-Solution (standalone).html`   | Chemin du fichier HTML à déployer                |

## Mises à jour

Relancer simplement le même script — il détecte les ressources existantes et met à jour le fichier.

## Étapes optionnelles post-déploiement

### Domaine personnalisé (ex : esolution.tpc.td)

**Static Web Apps :**
```powershell
az staticwebapp hostname set `
    --name tpc-esolution `
    --resource-group rg-tpc-esolution `
    --hostname esolution.tpc.td
```

**Storage :** activer Azure CDN puis pointer un CNAME sur l'endpoint CDN.

### Authentification Azure AD / Entra ID (Static Web Apps)

Ajouter dans `staticwebapp.config.json` :
```json
{
  "routes": [
    { "route": "/*", "allowedRoles": ["authenticated"] }
  ],
  "responseOverrides": {
    "401": { "redirect": "/.auth/login/aad", "statusCode": 302 }
  }
}
```

### Restriction par IP (réseau TPC uniquement)

**Storage :**
```powershell
az storage account update `
    --name tpcesolutionprod `
    --resource-group rg-tpc-esolution `
    --default-action Deny

az storage account network-rule add `
    --account-name tpcesolutionprod `
    --resource-group rg-tpc-esolution `
    --ip-address <IP-PUBLIQUE-TPC>
```
