<#
.SYNOPSIS
    Creates a verified, timestamped backup of the TPC eSolutions application build.

.DESCRIPTION
    Copies the application files (HTML, JS, CSS from project\) and the UAT
    documentation (UAT\*.md) to a dated backup folder under UAT\backups\.
    For every file copied, the script computes a SHA256 hash. It then writes
    a MANIFEST.json describing the backup. If -Verify is specified, the script
    re-hashes every file in the backup and confirms each one matches the source
    hash — any mismatch causes the script to exit with a non-zero code.

    Run before UAT begins, before deploying any fix to the UAT slot, and after
    UAT sign-off as the final artefact record.

.PARAMETER Tag
    Label for this backup (e.g. "pre-uat", "day1-fix1", "final-signed").
    Included in the folder name and manifest. Defaults to the current timestamp.

.PARAMETER BackupPath
    Root folder for all backups. Defaults to .\backups\ relative to this script.
    Created if it does not exist.

.PARAMETER Verify
    Switch. After copying, re-hash every backed-up file and compare against the
    source hash. Exits with code 1 if any file fails verification.

.PARAMETER IncludeUATDocs
    Switch. Also backs up the UAT\*.md and UAT\*.ps1 documents alongside the
    application files. On by default — use -IncludeUATDocs:$false to skip.

.PARAMETER WhatIf
    Switch. Describes what would be backed up without copying anything.

.EXAMPLE
    .\Backup-UATBuild.ps1 -Tag "pre-uat"
    Creates: UAT\backups\UAT-2026-06-04-pre-uat\

.EXAMPLE
    .\Backup-UATBuild.ps1 -Tag "final-signed" -Verify
    Creates backup and verifies every file hash matches the source.

.EXAMPLE
    .\Backup-UATBuild.ps1 -Tag "day1-fix1" -IncludeUATDocs:$false
    Backs up application files only — excludes UAT markdown and scripts.

.EXAMPLE
    .\Backup-UATBuild.ps1 -WhatIf
    Shows which files would be backed up without touching the filesystem.

.NOTES
    Requires Windows PowerShell 5.0 or later. Get-FileHash requires PS 4+.
    No external module dependencies.
    Build reference: UAT-2026-06-04 | Branch: uat-feedback
    Logs written to: UAT\logs\Backup-UATBuild-[timestamp].log
#>

[CmdletBinding(SupportsShouldProcess)]
param(
    [Parameter()]
    [string]$Tag,

    [Parameter()]
    [string]$BackupPath,

    [Parameter()]
    [switch]$Verify,

    [Parameter()]
    [bool]$IncludeUATDocs = $true,

    [Parameter()]
    [switch]$Force
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# ── Constants ──────────────────────────────────────────────────────────────────
$BUILD_REF  = 'UAT-2026-06-04'
$GIT_TAG    = 'UAT-2026-06-04'
$MODULE     = 'Safety Data Management'
$SCRIPT_VER = '1.0'

# ── Application files to back up ──────────────────────────────────────────────
# Primary build deliverables — the main HTML and all supporting JS/CSS.
$APP_FILE_PATTERNS = @(
    'TPC E-Solution.html',
    'TPC E-Solution (standalone).html',
    'tpc-app.js',
    'tpc-v2.js', 'tpc-v3.js', 'tpc-v4.js', 'tpc-v5.js', 'tpc-v6.js',
    'tpc-cash.js', 'tpc-expense.js', 'tpc-escort.js',
    'tpc-icons.js', 'tpc-ghs.js',
    'tpc.css',
    'tpc-v2.css', 'tpc-v3.css', 'tpc-v4.css', 'tpc-v5.css', 'tpc-v6.css',
    'tpc-cash.css', 'tpc-expense.css', 'tpc-escort.css', 'tpc-polish.css'
)

# ── Paths ──────────────────────────────────────────────────────────────────────
$UATRoot     = $PSScriptRoot
$ProjectRoot = Split-Path $UATRoot -Parent
$ProjectDir  = Join-Path $ProjectRoot 'project'
$LogsRoot    = Join-Path $UATRoot 'logs'

if (-not $BackupPath) { $BackupPath = Join-Path $UATRoot 'backups' }

# ── Logging ────────────────────────────────────────────────────────────────────
$ScriptLogName = "Backup-UATBuild-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"
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
    param([string]$Text)
    $line = '─' * 60
    Write-Host ''
    Write-Host $line -ForegroundColor DarkGray
    Write-Host "  $Text" -ForegroundColor White
    Write-Host $line -ForegroundColor DarkGray
    Write-Host ''
}

# ── File hash ──────────────────────────────────────────────────────────────────
function Get-SHA256 {
    param([string]$FilePath)
    try {
        $hash = Get-FileHash -Path $FilePath -Algorithm SHA256 -ErrorAction Stop
        return $hash.Hash
    } catch {
        Write-Log "Could not hash: $FilePath — $($_.Exception.Message)" -Level WARN
        return 'ERROR'
    }
}

# ── Collect source files ────────────────────────────────────────────────────────
function Get-SourceFiles {
    $files = [System.Collections.Generic.List[PSCustomObject]]::new()

    # Application files from project/
    foreach ($pattern in $APP_FILE_PATTERNS) {
        $fullPath = Join-Path $ProjectDir $pattern
        if (Test-Path $fullPath) {
            $files.Add([PSCustomObject]@{
                Source   = $fullPath
                RelPath  = Join-Path 'project' $pattern
                Category = 'Application'
            })
        } else {
            Write-Log "Source file not found (skipped): $pattern" -Level WARN
        }
    }

    # UAT documents and scripts
    if ($IncludeUATDocs) {
        $uatFiles = Get-ChildItem -Path $UATRoot -File -ErrorAction SilentlyContinue |
                    Where-Object { $_.Extension -in '.md', '.ps1' -and
                                   $_.Name -notmatch 'MANIFEST' }
        foreach ($f in $uatFiles) {
            $files.Add([PSCustomObject]@{
                Source   = $f.FullName
                RelPath  = Join-Path 'UAT' $f.Name
                Category = 'UAT Documentation'
            })
        }
    }

    return $files
}

# ── Copy with hash ─────────────────────────────────────────────────────────────
function Copy-FileWithHash {
    param(
        [PSCustomObject]$FileEntry,
        [string]$BackupRoot
    )

    $destPath = Join-Path $BackupRoot $FileEntry.RelPath
    $destDir  = Split-Path $destPath -Parent

    if (-not (Test-Path $destDir)) {
        $null = New-Item -ItemType Directory -Force -Path $destDir
    }

    Copy-Item -Path $FileEntry.Source -Destination $destPath -Force

    $srcHash  = Get-SHA256 -FilePath $FileEntry.Source
    $destHash = Get-SHA256 -FilePath $destPath
    $ok       = ($srcHash -eq $destHash -and $srcHash -ne 'ERROR')

    return [PSCustomObject]@{
        RelPath    = $FileEntry.RelPath
        Source     = $FileEntry.Source
        Dest       = $destPath
        Category   = $FileEntry.Category
        SizeBytes  = (Get-Item $destPath).Length
        SHA256     = $srcHash
        CopyVerify = if ($ok) { 'OK' } else { 'MISMATCH' }
    }
}

# ── Write manifest ─────────────────────────────────────────────────────────────
function Write-Manifest {
    param(
        [object[]]$Entries,
        [string]  $BackupRoot,
        [string]  $BackupTag,
        [int]     $ErrorCount
    )

    $totalBytes = ($Entries | Measure-Object -Property SizeBytes -Sum).Sum
    $totalMB    = [Math]::Round($totalBytes / 1MB, 2)

    $manifest = [ordered]@{
        manifest = [ordered]@{
            version       = '1.0'
            createdAt     = (Get-Date -Format 'o')
            createdDate   = (Get-Date -Format 'yyyy-MM-dd')
            createdTime   = (Get-Date -Format 'HH:mm:ss')
            tag           = $BackupTag
            buildRef      = $BUILD_REF
            gitTag        = $GIT_TAG
            module        = $MODULE
            machine       = $env:COMPUTERNAME
            user          = $env:USERNAME
            scriptVersion = $SCRIPT_VER
        }
        summary = [ordered]@{
            totalFiles  = $Entries.Count
            totalBytes  = $totalBytes
            totalMB     = $totalMB
            errorCount  = $ErrorCount
            integrityOK = ($ErrorCount -eq 0)
        }
        files = $Entries | ForEach-Object {
            [ordered]@{
                path      = $_.RelPath
                category  = $_.Category
                sizeBytes = $_.SizeBytes
                sha256    = $_.SHA256
                verify    = $_.CopyVerify
            }
        }
    }

    $json = ConvertTo-Json -InputObject $manifest -Depth 10
    $dest = Join-Path $BackupRoot 'MANIFEST.json'
    [System.IO.File]::WriteAllText($dest, $json, [System.Text.Encoding]::UTF8)
    Write-Log "Manifest written: $dest" -Level SUCCESS

    return $dest
}

# ── Verify backup from manifest ────────────────────────────────────────────────
function Test-BackupIntegrity {
    param([string]$BackupRoot, [object[]]$ManifestEntries)

    $errors  = 0
    $checked = 0

    Write-Log "Running integrity verification against source hashes..."

    foreach ($entry in $ManifestEntries) {
        $destPath  = Join-Path $BackupRoot $entry.RelPath
        $srcPath   = Join-Path $ProjectRoot $entry.RelPath   # approximate

        if (-not (Test-Path $destPath)) {
            Write-Log "MISSING in backup: $($entry.RelPath)" -Level ERROR
            $errors++
            continue
        }

        $destHash = Get-SHA256 -FilePath $destPath

        if ($destHash -ne $entry.SHA256) {
            Write-Log "HASH MISMATCH: $($entry.RelPath)" -Level ERROR
            Write-Log "  Expected : $($entry.SHA256)" -Level ERROR
            Write-Log "  Got      : $destHash" -Level ERROR
            $errors++
        } else {
            Write-Log "OK: $($entry.RelPath)"
        }

        $checked++
    }

    return [PSCustomObject]@{
        FilesChecked = $checked
        Errors       = $errors
        Passed       = ($errors -eq 0)
    }
}

# ══════════════════════════════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════════════════════════════

try {

    # ── Bootstrap ─────────────────────────────────────────────────────────────
    if (-not (Test-Path $LogsRoot))   { $null = New-Item -ItemType Directory -Force -Path $LogsRoot }
    if (-not (Test-Path $BackupPath)) { $null = New-Item -ItemType Directory -Force -Path $BackupPath }

    Write-Banner 'TPC eSolutions — Backup-UATBuild.ps1'
    Write-Log "Script version : $SCRIPT_VER"
    Write-Log "Build ref      : $BUILD_REF"
    Write-Log "Project dir    : $ProjectDir"
    Write-Log "UAT root       : $UATRoot"
    Write-Log "Backup path    : $BackupPath"
    Write-Log "Include UAT docs: $IncludeUATDocs"

    # ── Validate source ───────────────────────────────────────────────────────
    if (-not (Test-Path $ProjectDir)) {
        throw "Project directory not found: $ProjectDir"
    }

    # ── Resolve tag and backup folder ─────────────────────────────────────────
    $dateStr  = Get-Date -Format 'yyyy-MM-dd'
    $BackupTag = if ($Tag) { "$dateStr-$Tag" } else { Get-Date -Format 'yyyy-MM-dd-HHmmss' }
    $backupFolder = Join-Path $BackupPath $BackupTag

    Write-Log "Backup tag    : $BackupTag"
    Write-Log "Backup folder : $backupFolder"

    # Guard existing backup
    if ((Test-Path $backupFolder) -and (-not $Force)) {
        throw "Backup folder already exists: $backupFolder — use -Force to overwrite."
    }

    # ── Collect source files ──────────────────────────────────────────────────
    Write-Log "Collecting source files..."
    $sourceFiles = @(Get-SourceFiles)
    Write-Log "Files to back up: $($sourceFiles.Count)"

    if ($sourceFiles.Count -eq 0) {
        throw "No source files found to back up. Check that ProjectDir exists: $ProjectDir"
    }

    # ── WhatIf preview ────────────────────────────────────────────────────────
    if ($WhatIfPreference) {
        Write-Host ''
        Write-Host '  [WHATIF] Files that would be backed up:' -ForegroundColor Yellow
        foreach ($f in $sourceFiles) {
            Write-Host "    $($f.RelPath)  [$($f.Category)]" -ForegroundColor DarkGray
        }
        Write-Host ''
        Write-Host "  [WHATIF] Backup tag    : $BackupTag" -ForegroundColor Yellow
        Write-Host "  [WHATIF] Backup folder : $backupFolder" -ForegroundColor Yellow
        Write-Host '  [WHATIF] No changes made.' -ForegroundColor Yellow
        Write-Host ''
        return
    }

    # ── Create backup folder ───────────────────────────────────────────────────
    $null = New-Item -ItemType Directory -Force -Path $backupFolder
    Write-Log "Created backup folder: $backupFolder"

    # ── Copy files ────────────────────────────────────────────────────────────
    $entries        = [System.Collections.Generic.List[PSCustomObject]]::new()
    $copyErrors     = 0
    $filesProcessed = 0

    Write-Log "Copying files..."

    foreach ($file in $sourceFiles) {
        try {
            $result = Copy-FileWithHash -FileEntry $file -BackupRoot $backupFolder
            $entries.Add($result)
            $filesProcessed++

            $sizekb = [Math]::Round($result.SizeBytes / 1KB, 1)
            if ($result.CopyVerify -eq 'OK') {
                Write-Log "  [OK] $($result.RelPath) ($sizekb KB)"
            } else {
                Write-Log "  [MISMATCH] $($result.RelPath) — hash mismatch after copy" -Level ERROR
                $copyErrors++
            }
        } catch {
            Write-Log "  [FAIL] $($file.RelPath) — $($_.Exception.Message)" -Level ERROR
            $copyErrors++
        }
    }

    Write-Log "Copy complete. $filesProcessed files processed. Errors: $copyErrors."

    # ── Write manifest ────────────────────────────────────────────────────────
    Write-Log "Writing MANIFEST.json..."
    $manifestPath = Write-Manifest -Entries        $entries.ToArray() `
                                   -BackupRoot     $backupFolder      `
                                   -BackupTag      $BackupTag         `
                                   -ErrorCount     $copyErrors

    # ── Optional: post-copy verification ─────────────────────────────────────
    $verifyResult = $null
    if ($Verify) {
        Write-Log "Running post-copy integrity verification..."
        $verifyResult = Test-BackupIntegrity -BackupRoot       $backupFolder    `
                                              -ManifestEntries  $entries.ToArray()

        if ($verifyResult.Passed) {
            Write-Log "Integrity check PASSED — all $($verifyResult.FilesChecked) files verified." -Level SUCCESS
        } else {
            Write-Log "Integrity check FAILED — $($verifyResult.Errors) file(s) with hash mismatch." -Level ERROR
        }
    }

    # ── Compute totals ─────────────────────────────────────────────────────────
    $totalBytes = ($entries | Measure-Object -Property SizeBytes -Sum).Sum
    $totalMB    = [Math]::Round($totalBytes / 1MB, 2)
    $appCount   = @($entries | Where-Object { $_.Category -eq 'Application'      }).Count
    $docCount   = @($entries | Where-Object { $_.Category -eq 'UAT Documentation' }).Count

    # ── Summary ───────────────────────────────────────────────────────────────
    $statusColor = if ($copyErrors -eq 0) { 'Green' } else { 'Red' }
    $statusLabel = if ($copyErrors -eq 0) { 'SUCCESS' } else { "ERRORS: $copyErrors" }

    Write-Host ''
    Write-Host '  ┌─────────────────────────────────────────────────────────┐' -ForegroundColor $statusColor
    Write-Host '  │  Build Backup Complete                                   │' -ForegroundColor $statusColor
    Write-Host '  ├─────────────────────────────────────────────────────────┤' -ForegroundColor $statusColor
    Write-Host "  │  Tag          : $BackupTag" -ForegroundColor White
    Write-Host "  │  Status       : $statusLabel" -ForegroundColor $statusColor
    Write-Host "  │  Files copied : $($entries.Count)  (App: $appCount | Docs: $docCount)" -ForegroundColor White
    Write-Host "  │  Total size   : $totalMB MB ($totalBytes bytes)" -ForegroundColor White
    Write-Host "  │  Errors       : $copyErrors" -ForegroundColor $(if ($copyErrors -gt 0) { 'Red' } else { 'White' })
    if ($verifyResult) {
        $vColor = if ($verifyResult.Passed) { 'Green' } else { 'Red' }
        $vLabel = if ($verifyResult.Passed) { 'PASSED' } else { "FAILED ($($verifyResult.Errors) mismatches)" }
        Write-Host "  │  Verification : $vLabel" -ForegroundColor $vColor
    }
    Write-Host '  ├─────────────────────────────────────────────────────────┤' -ForegroundColor $statusColor
    Write-Host "  │  Backup  : $backupFolder" -ForegroundColor DarkGray
    Write-Host "  │  Manifest: $manifestPath" -ForegroundColor DarkGray
    Write-Host "  │  Log     : $ScriptLogPath" -ForegroundColor DarkGray
    Write-Host '  └─────────────────────────────────────────────────────────┘' -ForegroundColor $statusColor
    Write-Host ''

    Write-Log "Backup-UATBuild complete. Tag: $BackupTag | Files: $($entries.Count) | Errors: $copyErrors" `
              -Level $(if ($copyErrors -eq 0) { 'SUCCESS' } else { 'WARN' })

    # Non-zero exit if there were copy errors or verification failures
    if ($copyErrors -gt 0) { exit 1 }
    if ($verifyResult -and (-not $verifyResult.Passed)) { exit 1 }

} catch {
    Write-Log "FATAL: $($_.Exception.Message)" -Level ERROR
    Write-Log "Stack: $($_.ScriptStackTrace)" -Level ERROR
    Write-Host ''
    Write-Host "  Script failed. Check log: $ScriptLogPath" -ForegroundColor Red
    Write-Host ''
    exit 1
}
