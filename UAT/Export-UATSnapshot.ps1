<#
.SYNOPSIS
    Exports a point-in-time snapshot of the UAT defect register to JSON and CSV.

.DESCRIPTION
    Reads UAT-DEFECTS.md, parses the three defect tables (Active, Closed Sprint
    Pre-UAT, and Deferred), builds a structured summary object, and writes it to
    UAT\snapshots\ as both a JSON document and a flat CSV. Run at the end of each
    UAT day, after any defect triage session, or whenever a status summary is
    needed.

    The JSON snapshot is the authoritative record for downstream reporting.
    The CSV is for opening in Excel or sharing via email.

.PARAMETER DefectsFile
    Path to UAT-DEFECTS.md. Defaults to .\UAT-DEFECTS.md relative to this script.

.PARAMETER OutputPath
    Folder where snapshot files are written. Defaults to .\snapshots\ relative
    to this script. Created if it does not exist.

.PARAMETER Format
    Output format. Valid values: JSON, CSV, Both. Defaults to Both.

.PARAMETER Label
    Optional label appended to snapshot filenames (e.g. "end-of-day-1").
    Defaults to no label — filenames use timestamp only.

.EXAMPLE
    .\Export-UATSnapshot.ps1
    Reads UAT-DEFECTS.md and writes snapshot-20260604-173000.json and .csv.

.EXAMPLE
    .\Export-UATSnapshot.ps1 -Label "end-of-day-1" -Format JSON
    Writes snapshot-20260604-173000-end-of-day-1.json only.

.EXAMPLE
    .\Export-UATSnapshot.ps1 -OutputPath "C:\UAT-Exports"
    Writes to a custom output path.

.NOTES
    Requires Windows PowerShell 5.0 or later.
    No external module dependencies.
    Build reference: UAT-2026-06-04 | Branch: uat-feedback
    Logs written to: UAT\logs\Export-UATSnapshot-[timestamp].log
#>

[CmdletBinding()]
param(
    [Parameter()]
    [string]$DefectsFile,

    [Parameter()]
    [string]$OutputPath,

    [Parameter()]
    [ValidateSet('JSON', 'CSV', 'Both')]
    [string]$Format = 'Both',

    [Parameter()]
    [string]$Label
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# ── Constants ──────────────────────────────────────────────────────────────────
$BUILD_REF  = 'UAT-2026-06-04'
$GIT_TAG    = 'UAT-2026-06-04'
$SCRIPT_VER = '1.0'

# ── Paths ──────────────────────────────────────────────────────────────────────
$UATRoot  = $PSScriptRoot
$LogsRoot = Join-Path $UATRoot 'logs'

if (-not $DefectsFile) { $DefectsFile = Join-Path $UATRoot 'UAT-DEFECTS.md' }
if (-not $OutputPath)  { $OutputPath  = Join-Path $UATRoot 'snapshots' }

# ── Logging ────────────────────────────────────────────────────────────────────
$ScriptLogName = "Export-UATSnapshot-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"
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

# ── Markdown table parser ──────────────────────────────────────────────────────
# Finds the first markdown table after a named section header and returns rows
# as an array of PSCustomObjects keyed by column header.
function Read-TableAfterHeader {
    param(
        [string[]]$Lines,
        [string]  $Header
    )

    $results    = [System.Collections.Generic.List[PSCustomObject]]::new()
    $headerLine = -1

    # Locate section header (any # level)
    for ($i = 0; $i -lt $Lines.Count; $i++) {
        if ($Lines[$i].Trim() -match "^#+\s+$([regex]::Escape($Header))\s*$") {
            $headerLine = $i
            break
        }
    }

    if ($headerLine -eq -1) {
        Write-Log "Section not found: '$Header'" -Level WARN
        return $results
    }

    # Find first table row after the header
    $tableStart = -1
    for ($i = $headerLine + 1; $i -lt $Lines.Count; $i++) {
        if ($Lines[$i].Trim() -match '^\|') {
            $tableStart = $i
            break
        }
    }

    if ($tableStart -eq -1) {
        Write-Log "No table found after section '$Header'" -Level WARN
        return $results
    }

    # Parse table: first row = headers, skip separator rows, rest = data
    $colHeaders  = @()
    $headerParsed = $false

    for ($i = $tableStart; $i -lt $Lines.Count; $i++) {
        $line = $Lines[$i].Trim()

        # Stop if we leave the table
        if ($line -notmatch '^\|') { break }

        # Separator row: contains only |, -, :, space
        if ($line -match '^[\|\s\-:]+$') { continue }

        # Split cells
        $cells = $line -split '\|' |
                 ForEach-Object { $_.Trim() } |
                 Where-Object   { $_ -ne '' }

        if (-not $headerParsed) {
            $colHeaders   = $cells
            $headerParsed = $true
            continue
        }

        # Skip placeholder rows where every cell is '—' or '-' or empty
        $nonPlaceholder = @($cells | Where-Object { $_ -ne '—' -and $_ -ne '-' -and $_ -ne '' })
        if ($nonPlaceholder.Count -eq 0) { continue }

        # Build ordered object
        $obj = [ordered]@{}
        $limit = [Math]::Min($colHeaders.Count, $cells.Count)
        for ($j = 0; $j -lt $limit; $j++) {
            $obj[$colHeaders[$j]] = $cells[$j]
        }
        $results.Add([PSCustomObject]$obj)
    }

    return $results
}

# ── Severity counter ───────────────────────────────────────────────────────────
function Get-SeverityCounts {
    param([object[]]$Rows)

    $counts = [ordered]@{
        Critical = 0
        High     = 0
        Medium   = 0
        Low      = 0
    }

    foreach ($row in $Rows) {
        $sev = if ($row.PSObject.Properties['Severity']) { $row.Severity } else { '' }
        switch -Regex ($sev) {
            'Critical' { $counts.Critical++ }
            'High'     { $counts.High++     }
            'Medium'   { $counts.Medium++   }
            'Low'      { $counts.Low++      }
        }
    }

    return $counts
}

# ── Status counter ─────────────────────────────────────────────────────────────
function Get-StatusCounts {
    param([object[]]$Rows)

    $counts = [ordered]@{
        Open       = 0
        InProgress = 0
        Fixed      = 0
        Retest     = 0
        Closed     = 0
        Rejected   = 0
        Deferred   = 0
    }

    foreach ($row in $Rows) {
        $status = if ($row.PSObject.Properties['Status']) { $row.Status } else { '' }
        switch -Regex ($status) {
            'OPEN'        { $counts.Open++        }
            'IN.PROGRESS' { $counts.InProgress++  }
            'FIXED'       { $counts.Fixed++        }
            'RETEST'      { $counts.Retest++       }
            'CLOSED'      { $counts.Closed++       }
            'REJECTED'    { $counts.Rejected++     }
            'DEFERRED'    { $counts.Deferred++     }
        }
    }

    return $counts
}

# ── CSV writer (no Export-Csv to keep control of encoding) ─────────────────────
function Write-CsvFile {
    param([object[]]$Rows, [string]$Path)

    if ($Rows.Count -eq 0) {
        [System.IO.File]::WriteAllText($Path, "No data`r`n", [System.Text.Encoding]::UTF8)
        return
    }

    $headers = $Rows[0].PSObject.Properties.Name
    $sb      = [System.Text.StringBuilder]::new()

    # Header row
    $null = $sb.AppendLine(($headers | ForEach-Object { '"' + $_ + '"' }) -join ',')

    # Data rows
    foreach ($row in $Rows) {
        $values = $headers | ForEach-Object {
            $v = if ($row.PSObject.Properties[$_]) { [string]$row.$_ } else { '' }
            '"' + $v.Replace('"', '""') + '"'
        }
        $null = $sb.AppendLine($values -join ',')
    }

    [System.IO.File]::WriteAllText($Path, $sb.ToString(), [System.Text.Encoding]::UTF8)
}

# ══════════════════════════════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════════════════════════════

try {

    # ── Bootstrap ─────────────────────────────────────────────────────────────
    if (-not (Test-Path $LogsRoot))   { $null = New-Item -ItemType Directory -Force -Path $LogsRoot }
    if (-not (Test-Path $OutputPath)) { $null = New-Item -ItemType Directory -Force -Path $OutputPath }

    Write-Banner 'TPC eSolutions — Export-UATSnapshot.ps1'
    Write-Log "Script version : $SCRIPT_VER"
    Write-Log "Build ref      : $BUILD_REF"
    Write-Log "Defects file   : $DefectsFile"
    Write-Log "Output path    : $OutputPath"
    Write-Log "Format         : $Format"

    # ── Validate source ───────────────────────────────────────────────────────
    if (-not (Test-Path $DefectsFile)) {
        throw "UAT-DEFECTS.md not found at: $DefectsFile"
    }

    Write-Log "Reading: $DefectsFile"
    $rawContent = [System.IO.File]::ReadAllText($DefectsFile, [System.Text.Encoding]::UTF8)
    $lines      = $rawContent -split "`n"
    Write-Log "Read $($lines.Count) lines from defect file."

    # ── Parse the three tables ────────────────────────────────────────────────
    Write-Log "Parsing Active Defects table..."
    $activeDefects = @(Read-TableAfterHeader -Lines $lines -Header 'Active Defects')
    Write-Log "Active defects found: $($activeDefects.Count)"

    Write-Log "Parsing Closed Defects (Sprint Pre-UAT) table..."
    $closedSprint = @(Read-TableAfterHeader -Lines $lines -Header 'Closed Defects — Sprint Pre-UAT')
    Write-Log "Closed sprint defects found: $($closedSprint.Count)"

    Write-Log "Parsing Deferred Defects table..."
    $deferred = @(Read-TableAfterHeader -Lines $lines -Header 'Deferred Defects — Formally Accepted')
    Write-Log "Deferred items found: $($deferred.Count)"

    # ── Compute summary metrics ───────────────────────────────────────────────
    $activeSev    = Get-SeverityCounts -Rows $activeDefects
    $activeStatus = Get-StatusCounts   -Rows $activeDefects

    $summary = [ordered]@{
        totalActive      = $activeDefects.Count
        totalClosedSprint= $closedSprint.Count
        totalDeferred    = $deferred.Count
        totalAll         = $activeDefects.Count + $closedSprint.Count + $deferred.Count
        bySeverity       = $activeSev
        byStatus         = $activeStatus
        openBlockers     = $activeSev.Critical + $activeSev.High
        goNoGoStatus     = if (($activeSev.Critical + $activeSev.High) -eq 0) { 'ELIGIBLE' } else { 'BLOCKED' }
    }

    Write-Log "Summary — Active: $($activeDefects.Count) | Critical: $($activeSev.Critical) | High: $($activeSev.High) | Closed (sprint): $($closedSprint.Count) | Deferred: $($deferred.Count)"

    # ── Build snapshot object ─────────────────────────────────────────────────
    $snapshot = [ordered]@{
        metadata = [ordered]@{
            exportedAt    = (Get-Date -Format 'o')
            exportedDate  = (Get-Date -Format 'yyyy-MM-dd')
            exportedTime  = (Get-Date -Format 'HH:mm:ss')
            buildRef      = $BUILD_REF
            gitTag        = $GIT_TAG
            scriptVersion = $SCRIPT_VER
            sourceFile    = $DefectsFile
            machine       = $env:COMPUTERNAME
            user          = $env:USERNAME
        }
        summary       = $summary
        activeDefects = $activeDefects
        closedSprint  = $closedSprint
        deferred      = $deferred
    }

    # ── Filename base ─────────────────────────────────────────────────────────
    $ts       = Get-Date -Format 'yyyyMMdd-HHmmss'
    $baseName = if ($Label) { "snapshot-$ts-$Label" } else { "snapshot-$ts" }

    $jsonPath = Join-Path $OutputPath "$baseName.json"
    $csvPath  = Join-Path $OutputPath "$baseName.csv"

    # ── Write JSON ────────────────────────────────────────────────────────────
    if ($Format -in 'JSON','Both') {
        Write-Log "Writing JSON snapshot..."
        $json = ConvertTo-Json -InputObject $snapshot -Depth 10
        [System.IO.File]::WriteAllText($jsonPath, $json, [System.Text.Encoding]::UTF8)
        Write-Log "JSON written: $jsonPath" -Level SUCCESS
    }

    # ── Write CSV (active defects only — most useful for email/Excel) ─────────
    if ($Format -in 'CSV','Both') {
        Write-Log "Writing CSV snapshot (active defects)..."

        # Add metadata columns to each row for CSV context
        $csvRows = [System.Collections.Generic.List[PSCustomObject]]::new()

        if ($activeDefects.Count -gt 0) {
            foreach ($row in $activeDefects) {
                $enriched            = [ordered]@{ ExportDate = (Get-Date -Format 'yyyy-MM-dd') }
                $enriched.ExportTime = Get-Date -Format 'HH:mm:ss'
                $enriched.BuildRef   = $BUILD_REF

                foreach ($prop in $row.PSObject.Properties) {
                    $enriched[$prop.Name] = $prop.Value
                }
                $csvRows.Add([PSCustomObject]$enriched)
            }
        } else {
            # Write a summary row if no active defects
            $csvRows.Add([PSCustomObject][ordered]@{
                ExportDate    = (Get-Date -Format 'yyyy-MM-dd')
                ExportTime    = (Get-Date -Format 'HH:mm:ss')
                BuildRef      = $BUILD_REF
                ID            = 'NONE'
                Title         = 'No active defects'
                Severity      = ''
                Status        = ''
                GoNoGoStatus  = $summary.goNoGoStatus
            })
        }

        Write-CsvFile -Rows $csvRows.ToArray() -Path $csvPath
        Write-Log "CSV written: $csvPath" -Level SUCCESS
    }

    # ── Output summary ────────────────────────────────────────────────────────
    $goColor = if ($summary.goNoGoStatus -eq 'ELIGIBLE') { 'Green' } else { 'Red' }

    Write-Host ''
    Write-Host '  ┌─────────────────────────────────────────────────────────┐' -ForegroundColor Cyan
    Write-Host '  │  Snapshot Export Complete                                │' -ForegroundColor Cyan
    Write-Host '  ├─────────────────────────────────────────────────────────┤' -ForegroundColor Cyan
    Write-Host "  │  Active defects   : $($activeDefects.Count)" -ForegroundColor White
    Write-Host "  │    Critical       : $($activeSev.Critical)" -ForegroundColor $(if ($activeSev.Critical -gt 0) { 'Red' } else { 'White' })
    Write-Host "  │    High           : $($activeSev.High)" -ForegroundColor $(if ($activeSev.High -gt 0) { 'Red' } else { 'White' })
    Write-Host "  │    Medium         : $($activeSev.Medium)" -ForegroundColor $(if ($activeSev.Medium -gt 0) { 'Yellow' } else { 'White' })
    Write-Host "  │    Low            : $($activeSev.Low)" -ForegroundColor White
    Write-Host "  │  Closed (sprint)  : $($closedSprint.Count)" -ForegroundColor White
    Write-Host "  │  Deferred         : $($deferred.Count)" -ForegroundColor White
    Write-Host "  │  GO/NO-GO status  : $($summary.goNoGoStatus)" -ForegroundColor $goColor
    Write-Host '  ├─────────────────────────────────────────────────────────┤' -ForegroundColor Cyan
    if ($Format -in 'JSON','Both') {
        Write-Host "  │  JSON : $jsonPath" -ForegroundColor DarkGray
    }
    if ($Format -in 'CSV','Both') {
        Write-Host "  │  CSV  : $csvPath" -ForegroundColor DarkGray
    }
    Write-Host "  │  Log  : $ScriptLogPath" -ForegroundColor DarkGray
    Write-Host '  └─────────────────────────────────────────────────────────┘' -ForegroundColor Cyan
    Write-Host ''

    Write-Log "Export-UATSnapshot complete." -Level SUCCESS

} catch {
    Write-Log "FATAL: $($_.Exception.Message)" -Level ERROR
    Write-Log "Stack: $($_.ScriptStackTrace)" -Level ERROR
    Write-Host ''
    Write-Host "  Script failed. Check log: $ScriptLogPath" -ForegroundColor Red
    Write-Host ''
    exit 1
}
