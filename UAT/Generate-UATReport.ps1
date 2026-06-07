<#
.SYNOPSIS
    Generates a styled HTML and plain-text UAT status report from the UAT markdown files.

.DESCRIPTION
    Reads UAT-DEFECTS.md, UAT-SIGNOFF.md, and UAT-EXECUTION-PLAN.md, parses the
    structured data, and produces two report files:

      - UAT-Report-[timestamp].html  — Full styled HTML report for stakeholder distribution
      - UAT-Report-[timestamp].txt   — Plain-text summary for email body or console review

    The HTML report uses TPC brand colours (red #C8102E, dark #0B0E12, gold #FFB81C)
    and embedded CSS. No external stylesheets or JavaScript libraries are required.

.PARAMETER Title
    Report title displayed in the HTML header. Defaults to
    "TPC eSolutions — UAT Status Report".

.PARAMETER OutputPath
    Folder where report files are written. Defaults to .\reports\ relative to
    this script. Created if it does not exist.

.PARAMETER NoHtml
    Switch. Skip HTML generation — write the plain-text report only.

.PARAMETER NoText
    Switch. Skip plain-text generation — write the HTML report only.

.PARAMETER Open
    Switch. Open the HTML report in the default browser after generation.

.EXAMPLE
    .\Generate-UATReport.ps1
    Generates both HTML and TXT reports in UAT\reports\.

.EXAMPLE
    .\Generate-UATReport.ps1 -Title "UAT Day 2 Status" -Open
    Generates reports with a custom title and opens the HTML in the browser.

.EXAMPLE
    .\Generate-UATReport.ps1 -NoHtml
    Generates the plain-text report only — useful for copy-pasting into email.

.NOTES
    Requires Windows PowerShell 5.0 or later.
    No external module dependencies.
    Build reference: UAT-2026-06-04 | Branch: uat-feedback
    Logs written to: UAT\logs\Generate-UATReport-[timestamp].log
#>

[CmdletBinding()]
param(
    [Parameter()]
    [string]$Title = 'TPC eSolutions — UAT Status Report',

    [Parameter()]
    [string]$OutputPath,

    [Parameter()]
    [switch]$NoHtml,

    [Parameter()]
    [switch]$NoText,

    [Parameter()]
    [switch]$Open
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# ── Constants ──────────────────────────────────────────────────────────────────
$BUILD_REF  = 'UAT-2026-06-04'
$GIT_TAG    = 'UAT-2026-06-04'
$MODULE     = 'Safety Data Management'
$SCRIPT_VER = '1.0'

# ── Paths ──────────────────────────────────────────────────────────────────────
$UATRoot     = $PSScriptRoot
$LogsRoot    = Join-Path $UATRoot 'logs'
$DefectsFile = Join-Path $UATRoot 'UAT-DEFECTS.md'
$SignoffFile  = Join-Path $UATRoot 'UAT-SIGNOFF.md'
$PlanFile    = Join-Path $UATRoot 'UAT-EXECUTION-PLAN.md'

if (-not $OutputPath) { $OutputPath = Join-Path $UATRoot 'reports' }

# ── Logging ────────────────────────────────────────────────────────────────────
$ScriptLogName = "Generate-UATReport-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"
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

# ── Markdown table parser ──────────────────────────────────────────────────────
function Read-TableAfterHeader {
    param([string[]]$Lines, [string]$Header)

    $results      = [System.Collections.Generic.List[PSCustomObject]]::new()
    $headerLine   = -1

    for ($i = 0; $i -lt $Lines.Count; $i++) {
        if ($Lines[$i].Trim() -match "^#+\s+$([regex]::Escape($Header))\s*$") {
            $headerLine = $i; break
        }
    }

    if ($headerLine -eq -1) { return $results }

    $tableStart = -1
    for ($i = $headerLine + 1; $i -lt $Lines.Count; $i++) {
        if ($Lines[$i].Trim() -match '^\|') { $tableStart = $i; break }
    }

    if ($tableStart -eq -1) { return $results }

    $cols         = @()
    $headerParsed = $false

    for ($i = $tableStart; $i -lt $Lines.Count; $i++) {
        $line = $Lines[$i].Trim()
        if ($line -notmatch '^\|') { break }
        if ($line -match '^[\|\s\-:]+$') { continue }

        $cells = $line -split '\|' |
                 ForEach-Object { $_.Trim() } |
                 Where-Object   { $_ -ne '' }

        if (-not $headerParsed) {
            $cols = $cells; $headerParsed = $true; continue
        }

        $nonPlaceholder = @($cells | Where-Object { $_ -ne '—' -and $_ -ne '-' -and $_ -ne '' })
        if ($nonPlaceholder.Count -eq 0) { continue }

        $obj   = [ordered]@{}
        $limit = [Math]::Min($cols.Count, $cells.Count)
        for ($j = 0; $j -lt $limit; $j++) { $obj[$cols[$j]] = $cells[$j] }
        $results.Add([PSCustomObject]$obj)
    }

    return $results
}

# ── Exit criteria parser ───────────────────────────────────────────────────────
function Get-ExitCriteriaStatus {
    param([string[]]$Lines)

    $criteria = [System.Collections.Generic.List[PSCustomObject]]::new()
    $rows = @(Read-TableAfterHeader -Lines $Lines -Header 'Exit Criteria')

    foreach ($row in $rows) {
        # Look for ✅ or ☐ or MET / NOT MET in any column
        $met = $false
        foreach ($prop in $row.PSObject.Properties) {
            if ($prop.Value -match '✅|MET(?!\s+NOT)|\[x\]') { $met = $true; break }
        }
        $criteria.Add([PSCustomObject]@{
            Row = $row
            Met = $met
        })
    }

    return $criteria
}

# ── HTML helpers ───────────────────────────────────────────────────────────────
function ConvertTo-HtmlSafe {
    param([string]$Text)
    if (-not $Text) { return '' }
    $Text.Replace('&','&amp;').Replace('<','&lt;').Replace('>','&gt;').Replace('"','&quot;')
}

function New-SeverityBadge {
    param([string]$Severity)
    $style = switch -Regex ($Severity) {
        'Critical' { 'background:#C8102E;color:#fff'  }
        'High'     { 'background:#E84D0E;color:#fff'  }
        'Medium'   { 'background:#CA8A04;color:#fff'  }
        'Low'      { 'background:#475467;color:#fff'  }
        default    { 'background:#E4E7EC;color:#101828' }
    }
    return "<span style='$style;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;font-family:monospace'>" +
           (ConvertTo-HtmlSafe $Severity) + '</span>'
}

function New-StatusBadge {
    param([string]$Status)
    $style = switch -Regex ($Status) {
        'OPEN'        { 'background:#FEF3F2;color:#B42318;border:1px solid #FECDCA' }
        'IN.PROGRESS' { 'background:#FFF4ED;color:#B93815;border:1px solid #F9DBAF' }
        'FIXED'       { 'background:#ECFDF3;color:#027A48;border:1px solid #A9EFC5' }
        'RETEST'      { 'background:#EFF8FF;color:#175CD3;border:1px solid #B2DDFF' }
        'CLOSED'      { 'background:#ECFDF3;color:#027A48;border:1px solid #A9EFC5' }
        'DEFERRED'    { 'background:#F9F5FF;color:#6941C6;border:1px solid #D9D6FE' }
        'REJECTED'    { 'background:#F2F4F7;color:#344054;border:1px solid #D0D5DD' }
        default       { 'background:#F2F4F7;color:#344054;border:1px solid #D0D5DD' }
    }
    return "<span style='$style;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;font-family:monospace'>" +
           (ConvertTo-HtmlSafe $Status) + '</span>'
}

# ── HTML report builder ────────────────────────────────────────────────────────
function New-HtmlReport {
    param(
        [object[]]$ActiveDefects,
        [object[]]$ClosedSprint,
        [object[]]$Deferred,
        [string]  $ReportTitle,
        [string]  $GoNoGo
    )

    $genDate    = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
    $critCount  = @($ActiveDefects | Where-Object { $_.PSObject.Properties['Severity'] -and $_.Severity -match 'Critical' }).Count
    $highCount  = @($ActiveDefects | Where-Object { $_.PSObject.Properties['Severity'] -and $_.Severity -match 'High'     }).Count
    $medCount   = @($ActiveDefects | Where-Object { $_.PSObject.Properties['Severity'] -and $_.Severity -match 'Medium'   }).Count
    $lowCount   = @($ActiveDefects | Where-Object { $_.PSObject.Properties['Severity'] -and $_.Severity -match 'Low'      }).Count

    $goColor    = if ($GoNoGo -eq 'ELIGIBLE') { '#027A48' } else { '#B42318' }
    $goBg       = if ($GoNoGo -eq 'ELIGIBLE') { '#ECFDF3' } else { '#FEF3F2' }

    # Build active defects table rows
    $activeRows = ''
    if ($ActiveDefects.Count -eq 0) {
        $activeRows = '<tr><td colspan="6" style="text-align:center;color:#667085;padding:24px">No active defects</td></tr>'
    } else {
        foreach ($d in $ActiveDefects) {
            $id       = if ($d.PSObject.Properties['ID'])         { ConvertTo-HtmlSafe $d.ID }         else { '—' }
            $title    = if ($d.PSObject.Properties['Title'])      { ConvertTo-HtmlSafe $d.Title }      else { '—' }
            $sev      = if ($d.PSObject.Properties['Severity'])   { $d.Severity }                      else { '' }
            $status   = if ($d.PSObject.Properties['Status'])     { $d.Status }                        else { '' }
            $scenario = if ($d.PSObject.Properties['Scenario'])   { ConvertTo-HtmlSafe $d.Scenario }   else { '—' }
            $assigned = if ($d.PSObject.Properties['Assigned to']){ ConvertTo-HtmlSafe $d.'Assigned to' } else { '—' }

            $activeRows += "<tr>
                <td style='font-family:monospace;font-size:12px;font-weight:600'>$id</td>
                <td>$title</td>
                <td>$(New-SeverityBadge $sev)</td>
                <td>$(New-StatusBadge $status)</td>
                <td style='font-size:12px;color:#667085'>$scenario</td>
                <td style='font-size:12px'>$assigned</td>
            </tr>"
        }
    }

    # Build deferred table rows
    $deferredRows = ''
    if ($Deferred.Count -eq 0) {
        $deferredRows = '<tr><td colspan="4" style="text-align:center;color:#667085;padding:16px">No deferred items</td></tr>'
    } else {
        foreach ($d in $Deferred) {
            $id    = if ($d.PSObject.Properties['ID'])          { ConvertTo-HtmlSafe $d.ID }          else { '—' }
            $desc  = if ($d.PSObject.Properties['Description']) { ConvertTo-HtmlSafe $d.Description } else { '—' }
            $sev   = if ($d.PSObject.Properties['Severity'])    { $d.Severity }                       else { '' }
            $waiver= if ($d.PSObject.Properties['Waiver status']){ ConvertTo-HtmlSafe $d.'Waiver status' } else { '—' }
            $deferredRows += "<tr>
                <td style='font-family:monospace;font-size:12px;font-weight:600'>$id</td>
                <td style='font-size:13px'>$desc</td>
                <td>$(New-SeverityBadge $sev)</td>
                <td style='font-size:12px;color:#667085'>$waiver</td>
            </tr>"
        }
    }

    return @"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>$ReportTitle</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
         font-size: 14px; color: #101828; background: #F9FAFB; line-height: 1.5; }
  .header { background: #0B0E12; padding: 28px 40px; border-bottom: 4px solid #C8102E; }
  .header-brand { display: flex; align-items: center; gap: 16px; margin-bottom: 8px; }
  .header-mark { width: 10px; height: 36px; background: linear-gradient(#FFB81C 33%,#C8102E 33%,#C8102E 66%,#0B0E12 66%);
                  border-radius: 2px; flex-shrink: 0; }
  .header-title { color: #fff; font-size: 22px; font-weight: 700; letter-spacing: -0.3px; }
  .header-sub { color: #98A2B3; font-size: 12px; font-family: monospace; letter-spacing: 1px; }
  .container { max-width: 1100px; margin: 0 auto; padding: 32px 24px; }
  .meta-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 28px; }
  .meta-chip { background: #fff; border: 1px solid #E4E7EC; border-radius: 6px;
               padding: 6px 14px; font-size: 12px; color: #475467; font-family: monospace; }
  .meta-chip strong { color: #101828; }
  .kpi-row { display: grid; grid-template-columns: repeat(auto-fill,minmax(160px,1fr));
             gap: 16px; margin-bottom: 32px; }
  .kpi { background: #fff; border: 1px solid #E4E7EC; border-radius: 12px;
         padding: 20px; text-align: center; }
  .kpi-value { font-size: 36px; font-weight: 700; font-family: monospace; line-height: 1; }
  .kpi-label { font-size: 11px; color: #667085; text-transform: uppercase;
               letter-spacing: 0.5px; margin-top: 6px; }
  .kpi.danger .kpi-value { color: #C8102E; }
  .kpi.warn   .kpi-value { color: #CA8A04; }
  .kpi.ok     .kpi-value { color: #027A48; }
  .kpi.neutral .kpi-value { color: #475467; }
  .section { background: #fff; border: 1px solid #E4E7EC; border-radius: 12px;
             margin-bottom: 24px; overflow: hidden; }
  .section-head { padding: 16px 24px; border-bottom: 1px solid #E4E7EC;
                  display: flex; align-items: center; gap: 10px; }
  .section-title { font-size: 15px; font-weight: 600; color: #101828; }
  .section-count { background: #F2F4F7; border-radius: 99px; font-size: 11px;
                   font-weight: 600; font-family: monospace; padding: 2px 8px;
                   color: #344054; }
  .section-body { padding: 0; }
  table { width: 100%; border-collapse: collapse; }
  th { background: #F9FAFB; padding: 10px 16px; text-align: left;
       font-size: 11px; font-weight: 600; text-transform: uppercase;
       letter-spacing: 0.5px; color: #667085; border-bottom: 1px solid #E4E7EC; }
  td { padding: 12px 16px; border-bottom: 1px solid #F2F4F7;
       vertical-align: middle; color: #344054; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: #F9FAFB; }
  .gonogo-bar { border-radius: 10px; padding: 20px 24px; margin-bottom: 32px;
                border: 1px solid; display: flex; align-items: center;
                justify-content: space-between; }
  .gonogo-label { font-weight: 600; font-size: 15px; }
  .gonogo-value { font-family: monospace; font-size: 20px; font-weight: 700; }
  .footer { text-align: center; color: #98A2B3; font-size: 11px;
            padding: 24px; border-top: 1px solid #E4E7EC; margin-top: 8px; }
  .accent-bar { height: 3px; background: #C8102E; }
</style>
</head>
<body>
<div class="header">
  <div class="header-brand">
    <div class="header-mark"></div>
    <div>
      <div class="header-title">$ReportTitle</div>
      <div class="header-sub">TCHAD PETROLEUM COMPANY · ESOLUTIONS PLATFORM</div>
    </div>
  </div>
</div>
<div class="container">

  <!-- Meta -->
  <div class="meta-row">
    <div class="meta-chip"><strong>Build</strong> $BUILD_REF</div>
    <div class="meta-chip"><strong>Tag</strong> $GIT_TAG</div>
    <div class="meta-chip"><strong>Module</strong> $MODULE</div>
    <div class="meta-chip"><strong>Generated</strong> $genDate</div>
    <div class="meta-chip"><strong>Machine</strong> $env:COMPUTERNAME</div>
  </div>

  <!-- GO/NO-GO -->
  <div class="gonogo-bar" style="background:$goBg;border-color:$goColor;color:$goColor">
    <div>
      <div class="gonogo-label">Sign-Off Eligibility</div>
      <div style="font-size:12px;margin-top:4px">
        Based on current open defects (Critical + High must be 0 to be ELIGIBLE)
      </div>
    </div>
    <div class="gonogo-value">$GoNoGo</div>
  </div>

  <!-- KPIs -->
  <div class="kpi-row">
    <div class="kpi $(if ($ActiveDefects.Count -gt 0) { 'danger' } else { 'ok' })">
      <div class="kpi-value">$($ActiveDefects.Count)</div>
      <div class="kpi-label">Active Defects</div>
    </div>
    <div class="kpi $(if ($critCount -gt 0) { 'danger' } else { 'ok' })">
      <div class="kpi-value">$critCount</div>
      <div class="kpi-label">Critical</div>
    </div>
    <div class="kpi $(if ($highCount -gt 0) { 'danger' } else { 'ok' })">
      <div class="kpi-value">$highCount</div>
      <div class="kpi-label">High</div>
    </div>
    <div class="kpi $(if ($medCount -gt 0) { 'warn' } else { 'neutral' })">
      <div class="kpi-value">$medCount</div>
      <div class="kpi-label">Medium</div>
    </div>
    <div class="kpi neutral">
      <div class="kpi-value">$lowCount</div>
      <div class="kpi-label">Low</div>
    </div>
    <div class="kpi ok">
      <div class="kpi-value">$($ClosedSprint.Count)</div>
      <div class="kpi-label">Closed (Sprint)</div>
    </div>
    <div class="kpi neutral">
      <div class="kpi-value">$($Deferred.Count)</div>
      <div class="kpi-label">Deferred</div>
    </div>
  </div>

  <!-- Active Defects -->
  <div class="section">
    <div class="section-head">
      <div class="section-title">Active Defects</div>
      <div class="section-count">$($ActiveDefects.Count)</div>
    </div>
    <div class="section-body">
      <table>
        <thead>
          <tr>
            <th style="width:80px">ID</th>
            <th>Title</th>
            <th style="width:100px">Severity</th>
            <th style="width:110px">Status</th>
            <th style="width:80px">Scenario</th>
            <th style="width:130px">Assigned to</th>
          </tr>
        </thead>
        <tbody>$activeRows</tbody>
      </table>
    </div>
  </div>

  <!-- Deferred Items -->
  <div class="section">
    <div class="section-head">
      <div class="section-title">Deferred / Known Issues</div>
      <div class="section-count">$($Deferred.Count)</div>
    </div>
    <div class="section-body">
      <table>
        <thead>
          <tr>
            <th style="width:80px">ID</th>
            <th>Description</th>
            <th style="width:100px">Severity</th>
            <th>Waiver status</th>
          </tr>
        </thead>
        <tbody>$deferredRows</tbody>
      </table>
    </div>
  </div>

  <!-- Pre-UAT Closed -->
  <div class="section">
    <div class="section-head">
      <div class="section-title">Closed Defects — Pre-UAT Sprint</div>
      <div class="section-count">$($ClosedSprint.Count)</div>
    </div>
    <div class="section-body">
      <table>
        <thead>
          <tr><th>ID</th><th>Title</th><th>Severity</th><th>Fix summary</th></tr>
        </thead>
        <tbody>
$(
    if ($ClosedSprint.Count -eq 0) {
        '<tr><td colspan="4" style="text-align:center;color:#667085;padding:16px">No entries</td></tr>'
    } else {
        foreach ($d in $ClosedSprint) {
            $id   = if ($d.PSObject.Properties['ID'])           { ConvertTo-HtmlSafe $d.ID }           else { '—' }
            $ttl  = if ($d.PSObject.Properties['Title'])        { ConvertTo-HtmlSafe $d.Title }        else { '—' }
            $sev  = if ($d.PSObject.Properties['Severity'])     { $d.Severity }                        else { '' }
            $fix  = if ($d.PSObject.Properties['Fix summary'])  { ConvertTo-HtmlSafe $d.'Fix summary' } else { '—' }
            "          <tr>
                <td style='font-family:monospace;font-size:12px;font-weight:600'>$id</td>
                <td>$ttl</td>
                <td>$(New-SeverityBadge $sev)</td>
                <td style='font-size:12px;color:#667085'>$fix</td>
            </tr>"
        }
    }
)
        </tbody>
      </table>
    </div>
  </div>

</div>
<div class="footer">
  Generated by Generate-UATReport.ps1 v$SCRIPT_VER &nbsp;·&nbsp;
  Build: $BUILD_REF &nbsp;·&nbsp;
  $genDate &nbsp;·&nbsp;
  TPC eSolutions — Tchad Petroleum Company
</div>
<div class="accent-bar"></div>
</body>
</html>
"@
}

# ── Text report builder ────────────────────────────────────────────────────────
function New-TextReport {
    param(
        [object[]]$ActiveDefects,
        [object[]]$ClosedSprint,
        [object[]]$Deferred,
        [string]  $ReportTitle,
        [string]  $GoNoGo
    )

    $line  = '=' * 64
    $line2 = '-' * 64
    $genDate = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'

    $critCount = @($ActiveDefects | Where-Object { $_.PSObject.Properties['Severity'] -and $_.Severity -match 'Critical' }).Count
    $highCount = @($ActiveDefects | Where-Object { $_.PSObject.Properties['Severity'] -and $_.Severity -match 'High'     }).Count
    $medCount  = @($ActiveDefects | Where-Object { $_.PSObject.Properties['Severity'] -and $_.Severity -match 'Medium'   }).Count
    $lowCount  = @($ActiveDefects | Where-Object { $_.PSObject.Properties['Severity'] -and $_.Severity -match 'Low'      }).Count

    $sb = [System.Text.StringBuilder]::new()
    $null = $sb.AppendLine($line)
    $null = $sb.AppendLine($ReportTitle)
    $null = $sb.AppendLine("TPC eSolutions — Tchad Petroleum Company")
    $null = $sb.AppendLine($line)
    $null = $sb.AppendLine("Generated   : $genDate")
    $null = $sb.AppendLine("Build ref   : $BUILD_REF")
    $null = $sb.AppendLine("Git tag     : $GIT_TAG")
    $null = $sb.AppendLine("Module      : $MODULE")
    $null = $sb.AppendLine("Machine     : $env:COMPUTERNAME  User: $env:USERNAME")
    $null = $sb.AppendLine('')
    $null = $sb.AppendLine($line2)
    $null = $sb.AppendLine("SIGN-OFF ELIGIBILITY: $GoNoGo")
    $null = $sb.AppendLine($line2)
    $null = $sb.AppendLine('')

    $null = $sb.AppendLine('DEFECT SUMMARY')
    $null = $sb.AppendLine($line2)
    $null = $sb.AppendLine("  Active defects    : $($ActiveDefects.Count)")
    $null = $sb.AppendLine("    Critical        : $critCount")
    $null = $sb.AppendLine("    High            : $highCount")
    $null = $sb.AppendLine("    Medium          : $medCount")
    $null = $sb.AppendLine("    Low             : $lowCount")
    $null = $sb.AppendLine("  Closed (sprint)   : $($ClosedSprint.Count)")
    $null = $sb.AppendLine("  Deferred / waived : $($Deferred.Count)")
    $null = $sb.AppendLine('')

    $null = $sb.AppendLine('ACTIVE DEFECTS')
    $null = $sb.AppendLine($line2)
    if ($ActiveDefects.Count -eq 0) {
        $null = $sb.AppendLine('  No active defects.')
    } else {
        foreach ($d in $ActiveDefects) {
            $id     = if ($d.PSObject.Properties['ID'])       { $d.ID }       else { 'N/A' }
            $title  = if ($d.PSObject.Properties['Title'])    { $d.Title }    else { 'N/A' }
            $sev    = if ($d.PSObject.Properties['Severity']) { $d.Severity } else { 'N/A' }
            $status = if ($d.PSObject.Properties['Status'])   { $d.Status }   else { 'N/A' }
            $null = $sb.AppendLine("  [$sev] $id — $title")
            $null = $sb.AppendLine("         Status: $status")
        }
    }
    $null = $sb.AppendLine('')

    $null = $sb.AppendLine('DEFERRED / KNOWN ISSUES')
    $null = $sb.AppendLine($line2)
    if ($Deferred.Count -eq 0) {
        $null = $sb.AppendLine('  No deferred items on record.')
    } else {
        foreach ($d in $Deferred) {
            $id    = if ($d.PSObject.Properties['ID'])          { $d.ID }          else { 'N/A' }
            $desc  = if ($d.PSObject.Properties['Description']) { $d.Description } else { 'N/A' }
            $waiver= if ($d.PSObject.Properties['Waiver status']){ $d.'Waiver status' } else { 'N/A' }
            $null = $sb.AppendLine("  $id — $desc")
            $null = $sb.AppendLine("       Waiver: $waiver")
        }
    }
    $null = $sb.AppendLine('')
    $null = $sb.AppendLine($line)
    $null = $sb.AppendLine("END OF REPORT — $genDate")
    $null = $sb.AppendLine($line)

    return $sb.ToString()
}

# ══════════════════════════════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════════════════════════════

try {

    if (-not (Test-Path $LogsRoot))   { $null = New-Item -ItemType Directory -Force -Path $LogsRoot }
    if (-not (Test-Path $OutputPath)) { $null = New-Item -ItemType Directory -Force -Path $OutputPath }

    Write-Banner 'TPC eSolutions — Generate-UATReport.ps1'
    Write-Log "Script version : $SCRIPT_VER"
    Write-Log "Build ref      : $BUILD_REF"
    Write-Log "Title          : $Title"
    Write-Log "Output path    : $OutputPath"

    # ── Read source files ─────────────────────────────────────────────────────
    function Read-MarkdownLines {
        param([string]$Path, [string]$Label)
        if (Test-Path $Path) {
            Write-Log "Reading: $Path"
            return [System.IO.File]::ReadAllText($Path, [System.Text.Encoding]::UTF8) -split "`n"
        }
        Write-Log "$Label not found: $Path" -Level WARN
        return @()
    }

    $defectLines  = Read-MarkdownLines -Path $DefectsFile  -Label 'UAT-DEFECTS.md'
    $signoffLines = Read-MarkdownLines -Path $SignoffFile   -Label 'UAT-SIGNOFF.md'
    $planLines    = Read-MarkdownLines -Path $PlanFile      -Label 'UAT-EXECUTION-PLAN.md'

    # ── Parse ─────────────────────────────────────────────────────────────────
    Write-Log "Parsing defect tables..."
    $activeDefects = @(Read-TableAfterHeader -Lines $defectLines -Header 'Active Defects')
    $closedSprint  = @(Read-TableAfterHeader -Lines $defectLines -Header 'Closed Defects — Sprint Pre-UAT')
    $deferred      = @(Read-TableAfterHeader -Lines $defectLines -Header 'Deferred Defects — Formally Accepted')

    $critCount = @($activeDefects | Where-Object { $_.PSObject.Properties['Severity'] -and $_.Severity -match 'Critical' }).Count
    $highCount = @($activeDefects | Where-Object { $_.PSObject.Properties['Severity'] -and $_.Severity -match 'High' }).Count
    $goNoGo    = if (($critCount + $highCount) -eq 0) { 'ELIGIBLE' } else { 'BLOCKED' }

    Write-Log "Active: $($activeDefects.Count) | Closed Sprint: $($closedSprint.Count) | Deferred: $($deferred.Count)"
    Write-Log "GO/NO-GO: $goNoGo"

    # ── Generate filename base ─────────────────────────────────────────────────
    $ts       = Get-Date -Format 'yyyyMMdd-HHmmss'
    $baseName = "UAT-Report-$ts"
    $htmlPath = Join-Path $OutputPath "$baseName.html"
    $txtPath  = Join-Path $OutputPath "$baseName.txt"

    # ── Write HTML ────────────────────────────────────────────────────────────
    if (-not $NoHtml) {
        Write-Log "Generating HTML report..."
        $html = New-HtmlReport -ActiveDefects $activeDefects `
                               -ClosedSprint  $closedSprint  `
                               -Deferred      $deferred      `
                               -ReportTitle   $Title         `
                               -GoNoGo        $goNoGo
        [System.IO.File]::WriteAllText($htmlPath, $html, [System.Text.Encoding]::UTF8)
        Write-Log "HTML report written: $htmlPath" -Level SUCCESS
    }

    # ── Write text ────────────────────────────────────────────────────────────
    if (-not $NoText) {
        Write-Log "Generating plain-text report..."
        $txt = New-TextReport -ActiveDefects $activeDefects `
                              -ClosedSprint  $closedSprint  `
                              -Deferred      $deferred      `
                              -ReportTitle   $Title         `
                              -GoNoGo        $goNoGo
        [System.IO.File]::WriteAllText($txtPath, $txt, [System.Text.Encoding]::UTF8)
        Write-Log "Text report written: $txtPath" -Level SUCCESS
    }

    # ── Open browser ──────────────────────────────────────────────────────────
    if ($Open -and (-not $NoHtml) -and (Test-Path $htmlPath)) {
        Write-Log "Opening report in default browser..."
        Start-Process $htmlPath
    }

    # ── Summary ───────────────────────────────────────────────────────────────
    $goColor = if ($goNoGo -eq 'ELIGIBLE') { 'Green' } else { 'Red' }
    Write-Host ''
    Write-Host '  ┌─────────────────────────────────────────────────────────┐' -ForegroundColor Magenta
    Write-Host '  │  Report Generation Complete                              │' -ForegroundColor Magenta
    Write-Host '  ├─────────────────────────────────────────────────────────┤' -ForegroundColor Magenta
    Write-Host "  │  Active defects  : $($activeDefects.Count)  (Critical: $critCount | High: $highCount)" -ForegroundColor White
    Write-Host "  │  GO/NO-GO        : $goNoGo" -ForegroundColor $goColor
    if (-not $NoHtml) { Write-Host "  │  HTML            : $htmlPath" -ForegroundColor DarkGray }
    if (-not $NoText) { Write-Host "  │  Text            : $txtPath"  -ForegroundColor DarkGray }
    Write-Host "  │  Log             : $ScriptLogPath" -ForegroundColor DarkGray
    Write-Host '  └─────────────────────────────────────────────────────────┘' -ForegroundColor Magenta
    Write-Host ''

    Write-Log "Generate-UATReport complete." -Level SUCCESS

} catch {
    Write-Log "FATAL: $($_.Exception.Message)" -Level ERROR
    Write-Log "Stack: $($_.ScriptStackTrace)" -Level ERROR
    Write-Host ''
    Write-Host "  Script failed. Check log: $ScriptLogPath" -ForegroundColor Red
    Write-Host ''
    exit 1
}
