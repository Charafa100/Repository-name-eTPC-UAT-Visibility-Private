<#
.SYNOPSIS
    Creates a new dated UAT session workspace for TPC eSolutions Safety Data UAT.

.DESCRIPTION
    Initialises a fresh UAT session folder under UAT\sessions\ with the standard
    subfolder structure (logs, feedback, snapshots), writes a SESSION.json manifest,
    and begins a session log. Run this once at the start of each UAT day or per
    tester session. All subsequent toolkit scripts can reference the session ID
    produced here.

.PARAMETER Coordinator
    Full name of the UAT Coordinator running this session. Required.

.PARAMETER SessionID
    Optional. Custom session identifier (e.g. "UAT-20260604-SPRINT2").
    If omitted, auto-generates as UAT-YYYYMMDD-NNN where NNN is the next
    available three-digit sequence for today.

.PARAMETER OutputPath
    Root path for all sessions. Defaults to .\sessions\ relative to this script
    (i.e. UAT\sessions\). Override only if you need sessions stored elsewhere.

.PARAMETER Force
    Switch. If the session folder already exists, overwrite it rather than aborting.

.PARAMETER WhatIf
    Switch. Describes what would be created without creating anything.

.EXAMPLE
    .\New-UATFolder.ps1 -Coordinator "Aissatou Sow"
    Auto-generates session UAT-20260604-001 under UAT\sessions\.

.EXAMPLE
    .\New-UATFolder.ps1 -Coordinator "Aissatou Sow" -SessionID "UAT-20260604-SPRINT2"
    Creates a session with a custom identifier.

.EXAMPLE
    .\New-UATFolder.ps1 -Coordinator "Aissatou Sow" -Force
    Overwrites an existing session folder if one already exists for today.

.EXAMPLE
    .\New-UATFolder.ps1 -Coordinator "Aissatou Sow" -WhatIf
    Preview what would be created without touching the filesystem.

.NOTES
    Requires Windows PowerShell 5.0 or later.
    No external module dependencies.
    Build reference: UAT-2026-06-04 | Branch: uat-feedback
    Logs written to: UAT\sessions\[SessionID]\logs\session.log
                 and UAT\logs\New-UATFolder-[timestamp].log
#>

[CmdletBinding(SupportsShouldProcess)]
param(
    [Parameter(Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string]$Coordinator,

    [Parameter()]
    [string]$SessionID,

    [Parameter()]
    [string]$OutputPath,

    [Parameter()]
    [switch]$Force
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# ── Constants ──────────────────────────────────────────────────────────────────
$BUILD_REF    = 'UAT-2026-06-04'
$GIT_TAG      = 'UAT-2026-06-04'
$MODULE_SCOPE = 'Safety Data Management'
$SCRIPT_VER   = '1.0'

# ── Paths ──────────────────────────────────────────────────────────────────────
$UATRoot     = $PSScriptRoot
$ProjectRoot = Split-Path $UATRoot -Parent
$LogsRoot    = Join-Path $UATRoot 'logs'

if (-not $OutputPath) {
    $OutputPath = Join-Path $UATRoot 'sessions'
}

# ── Logging ────────────────────────────────────────────────────────────────────
$ScriptLogName = "New-UATFolder-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"
$ScriptLogPath = Join-Path $LogsRoot $ScriptLogName

function Write-Log {
    param(
        [string]$Message,
        [ValidateSet('INFO','SUCCESS','WARN','ERROR')]
        [string]$Level = 'INFO'
    )
    $ts    = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    $entry = "[$ts] [$Level] $Message"
    $color = switch ($Level) {
        'SUCCESS' { 'Green'  }
        'WARN'    { 'Yellow' }
        'ERROR'   { 'Red'    }
        default   { 'Cyan'   }
    }
    Write-Host $entry -ForegroundColor $color
    if (Test-Path $LogsRoot) {
        Add-Content -Path $ScriptLogPath -Value $entry -Encoding UTF8
    }
}

function Write-Banner {
    param([string]$Title)
    $line = '─' * 60
    Write-Host ''
    Write-Host $line -ForegroundColor DarkGray
    Write-Host "  $Title" -ForegroundColor White
    Write-Host $line -ForegroundColor DarkGray
    Write-Host ''
}

# ── Session ID helpers ─────────────────────────────────────────────────────────
function Get-NextSessionID {
    param([string]$SessionsRoot, [string]$DateStr)

    $null = New-Item -ItemType Directory -Force -Path $SessionsRoot
    $existing = Get-ChildItem -Path $SessionsRoot -Filter "UAT-$DateStr-*" `
                    -Directory -ErrorAction SilentlyContinue

    if ($null -eq $existing -or @($existing).Count -eq 0) {
        return "UAT-$DateStr-001"
    }

    $maxNum = @($existing) | ForEach-Object {
        if ($_.Name -match 'UAT-\d{8}-(\d+)$') { [int]$Matches[1] } else { 0 }
    } | Measure-Object -Maximum | Select-Object -ExpandProperty Maximum

    return 'UAT-{0}-{1:D3}' -f $DateStr, ($maxNum + 1)
}

# ── Template copier ────────────────────────────────────────────────────────────
function Copy-Templates {
    param([string]$SessionPath)

    $templates = @(
        'UAT-DEFECTS.md',
        'UAT-FEEDBACK.md',
        'UAT-SIGNOFF.md',
        'UAT-TEST-REPORT.md',
        'UAT-EXECUTION-PLAN.md'
    )

    $copied  = 0
    $missing = 0

    foreach ($t in $templates) {
        $src  = Join-Path $UATRoot $t
        $dest = Join-Path $SessionPath $t

        if (Test-Path $src) {
            Copy-Item -Path $src -Destination $dest -Force
            Write-Log "Copied template: $t" -Level INFO
            $copied++
        } else {
            Write-Log "Template not found (skipped): $t" -Level WARN
            $missing++
        }
    }

    return @{ Copied = $copied; Missing = $missing }
}

# ── Manifest writer ────────────────────────────────────────────────────────────
function Write-SessionManifest {
    param([string]$SessionPath, [string]$SessID)

    $manifest = [ordered]@{
        sessionId     = $SessID
        coordinator   = $Coordinator
        buildRef      = $BUILD_REF
        gitTag        = $GIT_TAG
        moduleScope   = $MODULE_SCOPE
        createdAt     = (Get-Date -Format 'o')
        createdDate   = (Get-Date -Format 'yyyy-MM-dd')
        createdTime   = (Get-Date -Format 'HH:mm:ss')
        machine       = $env:COMPUTERNAME
        user          = $env:USERNAME
        scriptVersion = $SCRIPT_VER
        paths = [ordered]@{
            sessionRoot   = $SessionPath
            logsDir       = Join-Path $SessionPath 'logs'
            feedbackDir   = Join-Path $SessionPath 'feedback'
            snapshotsDir  = Join-Path $SessionPath 'snapshots'
            exportsDir    = Join-Path $SessionPath 'exports'
        }
        status = 'ACTIVE'
    }

    $json = ConvertTo-Json -InputObject $manifest -Depth 5
    $dest = Join-Path $SessionPath 'SESSION.json'
    [System.IO.File]::WriteAllText($dest, $json, [System.Text.Encoding]::UTF8)

    return $dest
}

# ══════════════════════════════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════════════════════════════

try {

    # ── Bootstrap global logs folder ──────────────────────────────────────────
    if (-not (Test-Path $LogsRoot)) {
        $null = New-Item -ItemType Directory -Force -Path $LogsRoot
    }

    Write-Banner 'TPC eSolutions — New-UATFolder.ps1'
    Write-Log "Script version : $SCRIPT_VER"
    Write-Log "UAT Root       : $UATRoot"
    Write-Log "Project Root   : $ProjectRoot"
    Write-Log "Build ref      : $BUILD_REF"
    Write-Log "Coordinator    : $Coordinator"

    # ── Resolve session ID ────────────────────────────────────────────────────
    $dateStr = Get-Date -Format 'yyyyMMdd'

    if (-not $SessionID) {
        $SessionID = Get-NextSessionID -SessionsRoot $OutputPath -DateStr $dateStr
        Write-Log "Auto-generated SessionID: $SessionID" -Level SUCCESS
    } else {
        Write-Log "Custom SessionID: $SessionID"
    }

    $sessionPath = Join-Path $OutputPath $SessionID

    # ── Guard: existing session ───────────────────────────────────────────────
    if ((Test-Path $sessionPath) -and (-not $Force)) {
        Write-Log "Session folder already exists: $sessionPath" -Level WARN
        Write-Log "Use -Force to overwrite, or choose a different SessionID." -Level WARN
        throw "Session '$SessionID' already exists. Use -Force to overwrite."
    }

    if ($WhatIfPreference) {
        Write-Log "[WHATIF] Would create session: $sessionPath" -Level WARN
        Write-Log "[WHATIF] Subfolders: logs, feedback, snapshots, exports" -Level WARN
        Write-Log "[WHATIF] Would copy 5 UAT document templates" -Level WARN
        Write-Log "[WHATIF] Would write SESSION.json manifest" -Level WARN
        Write-Host ''
        Write-Host '  WhatIf complete — no changes made.' -ForegroundColor Yellow
        Write-Host ''
        return
    }

    # ── Create folder structure ───────────────────────────────────────────────
    $subFolders = @('logs', 'feedback', 'snapshots', 'exports')

    Write-Log "Creating session folder: $sessionPath"
    $null = New-Item -ItemType Directory -Force -Path $sessionPath

    foreach ($sub in $subFolders) {
        $subPath = Join-Path $sessionPath $sub
        $null = New-Item -ItemType Directory -Force -Path $subPath
        Write-Log "Created subfolder: $sub"
    }

    # ── Copy document templates ───────────────────────────────────────────────
    Write-Log "Copying UAT document templates..."
    $copyResult = Copy-Templates -SessionPath $sessionPath

    # ── Write SESSION.json ────────────────────────────────────────────────────
    Write-Log "Writing SESSION.json..."
    $manifestPath = Write-SessionManifest -SessionPath $sessionPath -SessID $SessionID
    Write-Log "Manifest written: $manifestPath" -Level SUCCESS

    # ── Initialise session log ────────────────────────────────────────────────
    $sessionLogPath = Join-Path $sessionPath 'logs' 'session.log'
    $sessionLogHeader = @"
# TPC eSolutions — UAT Session Log
# Session ID  : $SessionID
# Coordinator : $Coordinator
# Build ref   : $BUILD_REF
# Module      : $MODULE_SCOPE
# Started     : $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
# Machine     : $env:COMPUTERNAME
# User        : $env:USERNAME
# ─────────────────────────────────────────────────────────────
"@
    [System.IO.File]::WriteAllText($sessionLogPath, $sessionLogHeader,
        [System.Text.Encoding]::UTF8)
    Write-Log "Session log initialised: $sessionLogPath" -Level SUCCESS

    # ── Summary ───────────────────────────────────────────────────────────────
    Write-Host ''
    Write-Host '  ┌─────────────────────────────────────────────────────────┐' -ForegroundColor Green
    Write-Host "  │  Session created: $SessionID" -ForegroundColor Green
    Write-Host '  ├─────────────────────────────────────────────────────────┤' -ForegroundColor Green
    Write-Host "  │  Path       : $sessionPath" -ForegroundColor White
    Write-Host "  │  Coordinator: $Coordinator" -ForegroundColor White
    Write-Host "  │  Build ref  : $BUILD_REF" -ForegroundColor White
    Write-Host "  │  Templates  : $($copyResult.Copied) copied" -ForegroundColor White
    if ($copyResult.Missing -gt 0) {
        Write-Host "  │  Warnings   : $($copyResult.Missing) templates not found" -ForegroundColor Yellow
    }
    Write-Host "  │  Script log : $ScriptLogPath" -ForegroundColor DarkGray
    Write-Host '  └─────────────────────────────────────────────────────────┘' -ForegroundColor Green
    Write-Host ''
    Write-Host "  Next step: distribute $SessionID\UAT-FEEDBACK.md to each participant." -ForegroundColor Cyan
    Write-Host ''

    Write-Log "New-UATFolder complete. Session: $SessionID" -Level SUCCESS

} catch {
    Write-Log "FATAL: $($_.Exception.Message)" -Level ERROR
    Write-Log "Stack: $($_.ScriptStackTrace)" -Level ERROR
    Write-Host ''
    Write-Host "  Script failed. Check log: $ScriptLogPath" -ForegroundColor Red
    Write-Host ''
    exit 1
}
