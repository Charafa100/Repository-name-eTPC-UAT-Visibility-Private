/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard */
const { useState } = React;

// =====================================================
// VARIATION A — OPS COMMAND
// =====================================================
function OpsCommand() {
  return (
    <div className="vab va-ops">
      {/* Command bar */}
      <div className="cmd-bar">
        <div className="cmd-brand">
          <span className="cmd-brand-dot"></span>
          TPC · SOLUTIONHUB
        </div>
        <div className="cmd-nav">
          <div className="cmd-nav-item active">Ops</div>
          <div className="cmd-nav-item">Requests</div>
          <div className="cmd-nav-item">Safety</div>
          <div className="cmd-nav-item">Master</div>
          <div className="cmd-nav-item">Cash</div>
          <div className="cmd-nav-item">Expense</div>
          <div className="cmd-nav-item">Escort</div>
          <div className="cmd-nav-item">Approvals</div>
        </div>
        <div className="cmd-ticker">
          <div className="cmd-ticker-cell"><span className="lbl">Sites</span><span className="val up">6/6 ●</span></div>
          <div className="cmd-ticker-cell"><span className="lbl">Active</span><span className="val">42</span></div>
          <div className="cmd-ticker-cell"><span className="lbl">SLA</span><span className="val up">92.0%</span></div>
          <div className="cmd-ticker-cell"><span className="lbl">Breach</span><span className="val dn">2</span></div>
          <div className="cmd-ticker-cell"><span className="lbl">Risk</span><span className="val warn">6</span></div>
          <div className="cmd-ticker-cell"><span className="lbl">Incident</span><span className="val up">0</span></div>
          <div className="cmd-ticker-cell"><span className="lbl">SQL</span><span className="val up">OK</span></div>
        </div>
      </div>
      <div className="hazard"></div>
      <div className="sub-strip">
        <span className="breadcrumb">/ ops <span className="sep">›</span> overview</span>
        <span>operator: <span style={{color:'#E4E7EC'}}>cherif.hassan</span> · role: <span style={{color:'#FCD34D'}}>GA</span></span>
        <span className="timestamp">FRI 15 MAY 2026 · 14:32:08 UTC+1 · Δ 240ms</span>
      </div>

      {/* Grid */}
      <div className="ops-grid">
        {/* Sites cell — spans 2 cols */}
        <div className="ops-cell" style={{gridColumn:'span 2'}}>
          <div className="ops-cell-head">
            <div className="ops-cell-title">Sites · operational status</div>
            <div className="ops-cell-tag">6 nodes / 6 online</div>
          </div>
          <div className="sites" style={{gridTemplateColumns:'repeat(6, 1fr)'}}>
            <div className="site">
              <span className="site-status"></span>
              <div className="site-id">PS2-DOM</div>
              <div className="site-name">Dompta</div>
              <div className="site-stats">
                <span className="site-stat">chm <strong>34</strong></span>
                <span className="site-stat">req <strong>8</strong></span>
              </div>
            </div>
            <div className="site">
              <span className="site-status warn"></span>
              <div className="site-id">PS3-BEL</div>
              <div className="site-name">Belabo</div>
              <div className="site-stats">
                <span className="site-stat">chm <strong>28</strong></span>
                <span className="site-stat">req <strong>11</strong></span>
              </div>
            </div>
            <div className="site">
              <span className="site-status"></span>
              <div className="site-id">DLA-MAIN</div>
              <div className="site-name">Douala</div>
              <div className="site-stats">
                <span className="site-stat">chm <strong>52</strong></span>
                <span className="site-stat">req <strong>14</strong></span>
              </div>
            </div>
            <div className="site">
              <span className="site-status"></span>
              <div className="site-id">KRB-PRT</div>
              <div className="site-name">Kribi Port</div>
              <div className="site-stats">
                <span className="site-stat">chm <strong>18</strong></span>
                <span className="site-stat">req <strong>5</strong></span>
              </div>
            </div>
            <div className="site">
              <span className="site-status danger"></span>
              <div className="site-id">PS1-NDJ</div>
              <div className="site-name">N'Djamena</div>
              <div className="site-stats">
                <span className="site-stat">chm <strong>13</strong></span>
                <span className="site-stat">req <strong>4</strong></span>
              </div>
            </div>
            <div className="site">
              <span className="site-status"></span>
              <div className="site-id">FLD-MOB</div>
              <div className="site-name">Mobile · E12</div>
              <div className="site-stats">
                <span className="site-stat">chm <strong>0</strong></span>
                <span className="site-stat">req <strong>0</strong></span>
              </div>
            </div>
          </div>

          {/* SLA gauge below */}
          <div className="ops-cell-head" style={{marginTop:20}}>
            <div className="ops-cell-title">SLA · rolling 30 days</div>
            <div className="ops-cell-tag">+4 pt MoM</div>
          </div>
          <div className="gauge">
            <div className="gauge-num">92<span className="gauge-pct">.0%</span></div>
            <div className="gauge-bars">
              <div className="gauge-bar">
                <span style={{minWidth:80,color:'#22C55E'}}>On-time</span>
                <div className="gauge-bar-track"><div className="gauge-bar-fill" style={{width:'81%',background:'#22C55E'}}></div></div>
                <span className="gauge-bar-val">34</span>
              </div>
              <div className="gauge-bar">
                <span style={{minWidth:80,color:'#FCD34D'}}>At risk</span>
                <div className="gauge-bar-track"><div className="gauge-bar-fill" style={{width:'14%',background:'#FCD34D'}}></div></div>
                <span className="gauge-bar-val">6</span>
              </div>
              <div className="gauge-bar">
                <span style={{minWidth:80,color:'#EF4444'}}>Breached</span>
                <div className="gauge-bar-track"><div className="gauge-bar-fill" style={{width:'5%',background:'#EF4444'}}></div></div>
                <span className="gauge-bar-val">2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Throughput cell */}
        <div className="ops-cell">
          <div className="ops-cell-head">
            <div className="ops-cell-title">Throughput · last 7d</div>
            <div className="ops-cell-tag">unit: requests/day</div>
          </div>
          <div style={{marginTop:8}}>
            <div className="spark-row">
              <span className="spark-lbl">Submitted</span>
              <svg className="spark-svg" viewBox="0 0 200 24" preserveAspectRatio="none">
                <polyline fill="none" stroke="#22C55E" strokeWidth="1.5" points="0,18 28,14 56,16 84,10 112,12 140,8 168,6 200,4" />
              </svg>
              <span className="spark-val">47</span>
            </div>
            <div className="spark-row">
              <span className="spark-lbl">Approved</span>
              <svg className="spark-svg" viewBox="0 0 200 24" preserveAspectRatio="none">
                <polyline fill="none" stroke="#FCD34D" strokeWidth="1.5" points="0,16 28,14 56,12 84,14 112,10 140,8 168,10 200,6" />
              </svg>
              <span className="spark-val">39</span>
            </div>
            <div className="spark-row">
              <span className="spark-lbl">Cycle (d)</span>
              <svg className="spark-svg" viewBox="0 0 200 24" preserveAspectRatio="none">
                <polyline fill="none" stroke="#5FE0B7" strokeWidth="1.5" points="0,6 28,8 56,7 84,10 112,12 140,14 168,16 200,18" />
              </svg>
              <span className="spark-val">3.2</span>
            </div>
            <div className="spark-row">
              <span className="spark-lbl">Breaches</span>
              <svg className="spark-svg" viewBox="0 0 200 24" preserveAspectRatio="none">
                <polyline fill="none" stroke="#EF4444" strokeWidth="1.5" points="0,18 28,16 56,20 84,14 112,12 140,16 168,18 200,20" />
              </svg>
              <span className="spark-val">2</span>
            </div>
          </div>

          <div className="ops-cell-head" style={{marginTop:'auto',marginBottom:8}}>
            <div className="ops-cell-title">Approval flow</div>
            <div className="ops-cell-tag" style={{color:'#FCD34D'}}>BTLNCK: IH</div>
          </div>
          <div className="flow-stages">
            <div className="flow-stage">
              <div className="flow-stage-lbl">Submit</div>
              <div className="flow-stage-val">8</div>
            </div>
            <div className="flow-stage">
              <div className="flow-stage-lbl">SHE</div>
              <div className="flow-stage-val">6</div>
            </div>
            <div className="flow-stage bottleneck">
              <div className="flow-stage-lbl">IH</div>
              <div className="flow-stage-val">12</div>
            </div>
            <div className="flow-stage">
              <div className="flow-stage-lbl">EMP</div>
              <div className="flow-stage-val">5</div>
            </div>
            <div className="flow-stage">
              <div className="flow-stage-lbl">Approve</div>
              <div className="flow-stage-val">3</div>
            </div>
          </div>
        </div>

        {/* Queue cell — spans 2 cols */}
        <div className="ops-cell" style={{gridColumn:'span 2'}}>
          <div className="ops-cell-head">
            <div className="ops-cell-title">Action queue · awaiting your decision</div>
            <div className="ops-cell-tag">4 items · sorted by SLA</div>
          </div>
          <div className="queue">
            <div className="qrow">
              <span className="qstat danger"></span>
              <span className="qid">CHM-154</span>
              <span className="qtitle">Methanol — IH hazard classification needed</span>
              <span className="qsite">PS3-BEL</span>
              <span className="qage danger">-4d OVDU</span>
            </div>
            <div className="qrow">
              <span className="qstat warn"></span>
              <span className="qid">CHM-156</span>
              <span className="qtitle">Acetone — SHE review pending</span>
              <span className="qsite">DLA-MAIN</span>
              <span className="qage warn">2d 4h</span>
            </div>
            <div className="qrow">
              <span className="qstat"></span>
              <span className="qid">CHM-152</span>
              <span className="qtitle">Hydraulic Fluid ISO 46 — EMP review</span>
              <span className="qsite">PS2-DOM</span>
              <span className="qage">5d 12h</span>
            </div>
            <div className="qrow">
              <span className="qstat"></span>
              <span className="qid">CHM-155</span>
              <span className="qtitle">Diesel — Final sign-off ready</span>
              <span className="qsite">PS2-DOM</span>
              <span className="qage">today</span>
            </div>
            <div className="qrow">
              <span className="qstat warn"></span>
              <span className="qid">CSH-088</span>
              <span className="qtitle">Cash advance · field expedition Adré</span>
              <span className="qsite">PS1-NDJ</span>
              <span className="qage warn">1d 8h</span>
            </div>
            <div className="qrow">
              <span className="qstat"></span>
              <span className="qid">ESC-021</span>
              <span className="qtitle">Convoy E85 · Douala → PS2 (3 vehicles)</span>
              <span className="qsite">DLA-MAIN</span>
              <span className="qage">3d</span>
            </div>
          </div>
        </div>

        {/* Activity stream cell */}
        <div className="ops-cell">
          <div className="ops-cell-head">
            <div className="ops-cell-title">Event stream</div>
            <div className="ops-cell-tag" style={{color:'#22C55E'}}>● live</div>
          </div>
          <div className="stream">
            <div className="stream-row"><span className="t">14:32</span><span className="l g">[OK]</span><span className="m">CHM-155 diesel · final sig</span></div>
            <div className="stream-row"><span className="t">14:30</span><span className="l">[INFO]</span><span className="m">user f.moussa logged in</span></div>
            <div className="stream-row"><span className="t">14:28</span><span className="l r">[WARN]</span><span className="m">CHM-154 SLA breach +4d</span></div>
            <div className="stream-row"><span className="t">14:21</span><span className="l">[INFO]</span><span className="m">site PS3-BEL sync 18 rows</span></div>
            <div className="stream-row"><span className="t">14:19</span><span className="l g">[OK]</span><span className="m">CSH-087 advance disbursed</span></div>
            <div className="stream-row"><span className="t">14:14</span><span className="l">[INFO]</span><span className="m">SDS scan · methanol v3.1</span></div>
            <div className="stream-row"><span className="t">14:09</span><span className="l g">[OK]</span><span className="m">ESC-020 convoy → Kribi</span></div>
            <div className="stream-row"><span className="t">14:02</span><span className="l">[INFO]</span><span className="m">EXP batch · 18 entries</span></div>
            <div className="stream-row"><span className="t">13:58</span><span className="l">[INFO]</span><span className="m">backup OK · 412 MB</span></div>
            <div className="stream-row"><span className="t">13:51</span><span className="l">[INFO]</span><span className="m">a.mahamat opened CHM-156</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// VARIATION B — EXECUTIVE BRIEF
// =====================================================
function ExecutiveBrief() {
  return (
    <div className="vab vb-brief">
      <aside className="vb-side">
        <div className="vb-brand">TPC<span className="amp">.</span></div>
        <div className="vb-sub">SolutionHub · Tchad</div>

        <div className="vb-nav-label">Today</div>
        <div className="vb-nav-item active">Briefing</div>
        <div className="vb-nav-item">My queue <span className="badge">3</span></div>

        <div className="vb-nav-label">Solutions</div>
        <div className="vb-nav-item">Safety data</div>
        <div className="vb-nav-item">Master sheet</div>
        <div className="vb-nav-item">Cash advance <span className="badge">5</span></div>
        <div className="vb-nav-item">Daily expense</div>
        <div className="vb-nav-item">Security escort <span className="badge">1</span></div>

        <div className="vb-nav-label">Admin</div>
        <div className="vb-nav-item">Approvals <span className="badge">11</span></div>
        <div className="vb-nav-item">Users & roles</div>
        <div className="vb-nav-item">Settings</div>

        <div className="vb-foot">
          <div className="vb-avatar">CH</div>
          <div>
            <div style={{color:'#1A1814',fontSize:13}}>Cherif Hassan</div>
            <div>Global admin</div>
          </div>
        </div>
      </aside>

      <main className="vb-main">
        <div className="vb-eyebrow">
          <span className="rule"></span>
          <span>The Friday Brief</span>
          <span>·</span>
          <span>15 May 2026</span>
          <span>·</span>
          <span>Douala, 14:32</span>
        </div>
        <h1 className="vb-headline">
          Three chemical requests need <em>your decision</em> before close of day.
        </h1>
        <p className="vb-dek">
          Operations sit at <strong>92%</strong> on-time SLA across six sites — the strongest month this quarter. The bottleneck is industrial-hygiene review; one methanol filing has now been open for four days.
        </p>

        <div className="vb-rule"></div>

        <div className="vb-prio">
          <div className="vb-prio-item">
            <div className="vb-prio-num danger">PRIORITY 01 · SLA BREACHED</div>
            <div className="vb-prio-title">Methanol — IH classification, PS3-Belabo</div>
            <div className="vb-prio-meta">CHM-154 · open 4 days · I. Saleh</div>
          </div>
          <div className="vb-prio-item">
            <div className="vb-prio-num">PRIORITY 02 · DUE TOMORROW</div>
            <div className="vb-prio-title">Acetone — SHE review, Douala</div>
            <div className="vb-prio-meta">CHM-156 · 2d 4h remaining · A. Mahamat</div>
          </div>
          <div className="vb-prio-item">
            <div className="vb-prio-num">PRIORITY 03 · SIGN-OFF READY</div>
            <div className="vb-prio-title">Diesel — final approval, PS2-Dompta</div>
            <div className="vb-prio-meta">CHM-155 · today · F. Moussa</div>
          </div>
        </div>

        <div className="vb-cols">
          <div>
            <div className="vb-col-h">
              <span>Also on your desk</span>
              <span className="count">+ 8 more</span>
            </div>
            <div className="vb-q-row">
              <div>
                <div className="vb-q-title">Hydraulic Fluid ISO 46 — environmental review</div>
                <div className="vb-q-sub">CHM-152 · PS2-Dompta · 5 days left</div>
              </div>
              <div className="vb-q-status">Environmental</div>
            </div>
            <div className="vb-q-row">
              <div>
                <div className="vb-q-title">Cash advance — Adré expedition</div>
                <div className="vb-q-sub">CSH-088 · field team · 1d 8h left</div>
              </div>
              <div className="vb-q-status warn">Due soon</div>
            </div>
            <div className="vb-q-row">
              <div>
                <div className="vb-q-title">Convoy E85 — Douala to PS2, 3 vehicles</div>
                <div className="vb-q-sub">ESC-021 · routing approved · 3 days out</div>
              </div>
              <div className="vb-q-status ok">Scheduled</div>
            </div>
            <div className="vb-q-row">
              <div>
                <div className="vb-q-title">Brenntag Chad — supplier onboarding</div>
                <div className="vb-q-sub">Procurement · documents attached</div>
              </div>
              <div className="vb-q-status">Review</div>
            </div>
          </div>

          <div>
            <div className="vb-col-h">
              <span>By the numbers</span>
              <span className="count">May · MoM</span>
            </div>
            <div className="vb-mini">
              <div className="vb-mini-row">
                <span className="vb-mini-lbl">Active requests</span>
                <span className="vb-mini-val">42 <span className="delta">+7</span></span>
              </div>
              <div className="vb-mini-row">
                <span className="vb-mini-lbl">Avg cycle time</span>
                <span className="vb-mini-val">3.2d <span className="delta">−12%</span></span>
              </div>
              <div className="vb-mini-row">
                <span className="vb-mini-lbl">Approved this month</span>
                <span className="vb-mini-val">47 <span className="delta">+18%</span></span>
              </div>
              <div className="vb-mini-row">
                <span className="vb-mini-lbl">SLA breached</span>
                <span className="vb-mini-val">2 <span className="delta dn">+1</span></span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// =====================================================
// VARIATION C — FIELD ATLAS
// =====================================================
function FieldAtlas() {
  // Map marker positions
  const sites = [
    { x: 28, y: 36, status: 'ok',     name: 'Douala',     code: 'DLA-MAIN', chm: 52, req: 14 },
    { x: 44, y: 52, status: 'ok',     name: 'Kribi Port', code: 'KRB-PRT', chm: 18, req: 5 },
    { x: 56, y: 38, status: 'warn',   name: 'PS3 Belabo', code: 'PS3-BEL', chm: 28, req: 11 },
    { x: 68, y: 28, status: 'ok',     name: 'PS2 Dompta', code: 'PS2-DOM', chm: 34, req: 8 },
    { x: 78, y: 22, status: 'danger', name: "PS1 N'Djamena", code: 'PS1-NDJ', chm: 13, req: 4 },
  ];

  return (
    <div className="vab vc-atlas">
      {/* Icon rail */}
      <aside className="vc-rail">
        <div className="vc-rail-logo">TPC</div>
        <div className="vc-rail-btn active" title="Atlas">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 2C7 2 4 5.5 4 10c0 5.5 8 12 8 12s8-6.5 8-12c0-4.5-3-8-8-8z"/></svg>
        </div>
        <div className="vc-rail-btn" title="Inbox"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13l3-8h12l3 8v6H3z"/><path d="M3 13h5l1 2h6l1-2h5"/></svg><span className="pip"></span></div>
        <div className="vc-rail-btn" title="Safety"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6l-1 4h-4z"/><path d="M10 7v4l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V7"/></svg></div>
        <div className="vc-rail-btn" title="Cash"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="13" rx="2"/><circle cx="12" cy="12.5" r="2.5"/></svg></div>
        <div className="vc-rail-btn" title="Expense"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3h11l3 3v15H5z"/><path d="M9 9h6M9 13h6M9 17h4"/></svg></div>
        <div className="vc-rail-btn" title="Escort"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 4v6c0 5-4 9-9 10-5-1-9-5-9-10V6l9-4z"/></svg></div>
        <div style={{flex:1}}></div>
        <div className="vc-rail-btn" title="Settings"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.4 1.9l.1.1a2 2 0 11-2.9 2.9l-.1-.1a1.7 1.7 0 00-1.9-.4 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1A1.7 1.7 0 008 19.4a1.7 1.7 0 00-1.9.4l-.1.1a2 2 0 11-2.9-2.9l.1-.1a1.7 1.7 0 00.4-1.9 1.7 1.7 0 00-1.5-1H2a2 2 0 110-4h.1a1.7 1.7 0 001.5-1A1.7 1.7 0 003.2 8L3 7.9A2 2 0 116 5l.1.1A1.7 1.7 0 008 5.5 1.7 1.7 0 009 4V3a2 2 0 114 0v.1A1.7 1.7 0 0014 4.6a1.7 1.7 0 001.9-.4l.1-.1a2 2 0 112.9 2.9l-.1.1a1.7 1.7 0 00-.4 1.9V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg></div>
      </aside>

      <div className="vc-body">
        {/* Top */}
        <div className="vc-top">
          <div className="vc-crumb">
            <span>Atlas</span>
            <span style={{color:'#475467'}}>/</span>
            <span className="now">Live operations · Tchad-Cameroon</span>
          </div>
          <div className="vc-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
            <span>Search sites, requests, chemicals…</span>
            <span className="k">⌘K</span>
          </div>
          <div className="vc-top-stats">
            <div className="vc-top-stat"><span className="l">Sites</span><span className="v ok">6/6</span></div>
            <div className="vc-top-stat"><span className="l">Active</span><span className="v">42</span></div>
            <div className="vc-top-stat"><span className="l">SLA</span><span className="v ok">92%</span></div>
            <div className="vc-top-stat"><span className="l">Breached</span><span className="v warn">2</span></div>
          </div>
        </div>

        {/* Map + sidecar */}
        <div className="vc-map-wrap">
          <div className="vc-map">
            <div className="vc-map-grid"></div>

            <div className="vc-map-title">
              <strong>TPC Atlas</strong> · 15 MAY 2026 · 14:32 UTC+1
            </div>
            <div className="vc-map-legend">
              <span><span className="dot" style={{background:'#5FE0B7'}}></span>Operational</span>
              <span><span className="dot" style={{background:'#FFB547'}}></span>At risk</span>
              <span><span className="dot" style={{background:'#FF6B47'}}></span>Action req.</span>
            </div>

            {/* Routes — drawn as SVG between sites */}
            <svg className="vc-routes" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="dashes" patternUnits="userSpaceOnUse" width="3" height="0.4" patternTransform="rotate(0)">
                  <line x1="0" y1="0" x2="2" y2="0" stroke="#5FE0B7" strokeWidth="0.4" opacity="0.5"/>
                </pattern>
              </defs>
              {/* Douala -> Kribi */}
              <line x1="28" y1="36" x2="44" y2="52" stroke="#5FE0B7" strokeWidth="0.25" strokeDasharray="1 1" opacity="0.6"/>
              {/* Douala -> Belabo */}
              <line x1="28" y1="36" x2="56" y2="38" stroke="#5FE0B7" strokeWidth="0.25" strokeDasharray="1 1" opacity="0.6"/>
              {/* Belabo -> Dompta */}
              <line x1="56" y1="38" x2="68" y2="28" stroke="#5FE0B7" strokeWidth="0.25" strokeDasharray="1 1" opacity="0.6"/>
              {/* Dompta -> N'Djamena (active escort, brighter) */}
              <line x1="68" y1="28" x2="78" y2="22" stroke="#FFB547" strokeWidth="0.4" strokeDasharray="2 1" opacity="0.9"/>
            </svg>

            {/* Country outline (very abstract) */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{position:'absolute',inset:0,opacity:0.18}}>
              <path d="M 18,42 Q 22,30 32,28 L 42,26 Q 50,20 58,22 L 72,16 Q 82,12 88,18 L 90,32 Q 86,40 82,46 L 74,52 Q 68,60 58,62 L 48,66 Q 38,68 32,62 L 24,56 Q 16,50 18,42 Z"
                fill="none" stroke="#5FE0B7" strokeWidth="0.25"/>
              {/* River-like line */}
              <path d="M 20,46 Q 30,50 40,48 T 60,52 T 80,56" fill="none" stroke="#5FE0B7" strokeWidth="0.15" opacity="0.6"/>
            </svg>

            {/* Markers */}
            {sites.map((s, i) => (
              <div key={i} className={`marker ${s.status}`} style={{left: `${s.x}%`, top: `${s.y}%`}}>
                <div className="ring"></div>
                <div className="core"></div>
                <div className="lbl">
                  <span className="n">{s.code}</span>
                  {s.name}
                </div>
              </div>
            ))}

            {/* Convoy marker — moving dot along route */}
            <div className="marker warn" style={{left:'73%', top:'25%'}}>
              <div className="core" style={{width:8,height:8,boxShadow:'0 0 8px currentColor'}}></div>
              <div className="lbl" style={{top:14}}>
                <span className="n">ESC-021</span>
                Convoy · 3 vehicles
              </div>
            </div>

            {/* Compass / scale */}
            <div style={{position:'absolute',bottom:16,left:16,zIndex:3,fontFamily:'IBM Plex Mono, monospace',fontSize:10,color:'#6B7B85'}}>
              <div style={{marginBottom:4}}>N ↑</div>
              <div style={{display:'flex',alignItems:'center',gap:6}}>
                <div style={{width:60,height:2,background:'#5FE0B7',opacity:0.5}}></div>
                <span>200 km</span>
              </div>
            </div>

            <div className="vc-map-controls">
              <button>+</button>
              <button>−</button>
            </div>
          </div>

          {/* Sidecar */}
          <aside className="vc-side">
            <div className="vc-side-head">
              <div className="vc-side-eyebrow">● Selected · operational</div>
              <div className="vc-side-title">PS2 · Dompta</div>
              <div className="vc-side-coord">10.4892° N, 16.0721° E · pumping station</div>
            </div>
            <div className="vc-side-tabs">
              <div className="vc-side-tab active">Overview</div>
              <div className="vc-side-tab">Queue</div>
              <div className="vc-side-tab">Crew</div>
            </div>

            <div className="vc-side-section">
              <div className="vc-side-section-lbl">Site snapshot</div>
              <div className="vc-stat-grid">
                <div className="vc-stat">
                  <span className="vc-stat-val">34</span>
                  <span className="vc-stat-lbl">Chemicals on site</span>
                </div>
                <div className="vc-stat">
                  <span className="vc-stat-val warn">8</span>
                  <span className="vc-stat-lbl">Active requests</span>
                </div>
                <div className="vc-stat">
                  <span className="vc-stat-val ok">96%</span>
                  <span className="vc-stat-lbl">SLA · 30d</span>
                </div>
                <div className="vc-stat">
                  <span className="vc-stat-val">2.8d</span>
                  <span className="vc-stat-lbl">Avg cycle</span>
                </div>
              </div>
            </div>

            <div className="vc-side-section">
              <div className="vc-side-section-lbl">Awaiting your decision</div>
              <div className="vc-alert">
                <div className="bar danger"></div>
                <div>
                  <div className="vc-alert-title">Hydraulic Fluid ISO 46 — EMP review</div>
                  <div className="vc-alert-sub">CHM-152 · Cherif Hassan · 5d</div>
                </div>
                <div className="vc-alert-time">14:21</div>
              </div>
              <div className="vc-alert">
                <div className="bar ok"></div>
                <div>
                  <div className="vc-alert-title">Diesel — final sign-off ready</div>
                  <div className="vc-alert-sub">CHM-155 · Fatima Moussa</div>
                </div>
                <div className="vc-alert-time">today</div>
              </div>
            </div>

            <div className="vc-side-section" style={{borderBottom:0}}>
              <div className="vc-side-section-lbl">Roster · on site</div>
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {['FM','IS','AB','MN','TK','+3'].map((n,i) => (
                  <div key={i} style={{
                    width:32,height:32,borderRadius:'50%',
                    background: i===5 ? 'transparent' : '#1A2329',
                    border: i===5 ? '1px dashed #1A2329' : 'none',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    fontFamily:'IBM Plex Mono, monospace',fontSize:10,color:'#E4E7EC'
                  }}>{n}</div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom strip */}
        <div className="vc-bottom">
          <div className="vc-bot-col">
            <div className="vc-bot-h">
              <span className="vc-bot-h-title">○ Alerts</span>
              <span className="vc-bot-h-meta">3 active</span>
            </div>
            <div className="vc-alert">
              <div className="bar danger"></div>
              <div>
                <div className="vc-alert-title">Methanol IH classification overdue</div>
                <div className="vc-alert-sub">CHM-154 · PS3-Belabo · 4d</div>
              </div>
              <div className="vc-alert-time">14:28</div>
            </div>
            <div className="vc-alert">
              <div className="bar"></div>
              <div>
                <div className="vc-alert-title">Acetone SHE review due tomorrow</div>
                <div className="vc-alert-sub">CHM-156 · Douala · 2d 4h</div>
              </div>
              <div className="vc-alert-time">10:14</div>
            </div>
            <div className="vc-alert">
              <div className="bar"></div>
              <div>
                <div className="vc-alert-title">Cash advance — Adré expedition</div>
                <div className="vc-alert-sub">CSH-088 · field · 1d 8h</div>
              </div>
              <div className="vc-alert-time">09:02</div>
            </div>
          </div>

          <div className="vc-bot-col">
            <div className="vc-bot-h">
              <span className="vc-bot-h-title">↗ In motion</span>
              <span className="vc-bot-h-meta">1 convoy · 3 planned</span>
            </div>
            <div className="vc-alert">
              <div className="bar" style={{background:'#FFB547'}}></div>
              <div>
                <div className="vc-alert-title">ESC-021 · Douala → PS2</div>
                <div className="vc-alert-sub">3 vehicles · ETA 17:40 · escort armed</div>
              </div>
              <div className="vc-alert-time">live</div>
            </div>
            <div className="vc-alert">
              <div className="bar"></div>
              <div>
                <div className="vc-alert-title">ESC-022 · PS2 → Belabo</div>
                <div className="vc-alert-sub">Tomorrow 06:00 · routing approved</div>
              </div>
              <div className="vc-alert-time">+1d</div>
            </div>
            <div className="vc-alert">
              <div className="bar"></div>
              <div>
                <div className="vc-alert-title">ESC-023 · Kribi Port pickup</div>
                <div className="vc-alert-sub">17 May · cargo manifest pending</div>
              </div>
              <div className="vc-alert-time">+2d</div>
            </div>
          </div>

          <div className="vc-bot-col">
            <div className="vc-bot-h">
              <span className="vc-bot-h-title">⊞ Approval flow</span>
              <span className="vc-bot-h-meta">34 in motion</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:4}}>
              {[
                { lbl: 'Submitted', n: 8,  pct: 22 },
                { lbl: 'SHE review', n: 6, pct: 18 },
                { lbl: 'IH review', n: 12, pct: 36, btl: true },
                { lbl: 'EMP review', n: 5, pct: 15 },
                { lbl: 'Final', n: 3,     pct: 9 },
              ].map((s, i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:10}}>
                  <span style={{
                    fontFamily:'IBM Plex Mono, monospace',
                    fontSize:10,color: s.btl ? '#FFB547' : '#8B98A2',
                    minWidth: 90, textTransform:'uppercase', letterSpacing:'0.06em'
                  }}>{s.lbl}</span>
                  <div style={{flex:1,height:6,background:'#1A2329',position:'relative'}}>
                    <div style={{
                      position:'absolute',inset:'0 auto 0 0',
                      width:`${s.pct*2.4}%`,
                      background: s.btl ? '#FFB547' : '#5FE0B7'
                    }}></div>
                  </div>
                  <span style={{fontFamily:'IBM Plex Mono, monospace',fontSize:11,color:'#E4E7EC',minWidth:24,textAlign:'right'}}>{s.n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// Design notes header
// =====================================================
function DesignNotes() {
  return (
    <div className="design-notes" style={{width: 1200}}>
      <h1>Three directions for the <em>SolutionHub</em> dashboard.</h1>
      <p className="lead">
        Same data, six sites, the same operator (Cherif). What changes is the reading of the work: a control room, a morning memo, or a map. Each leans on different defaults — typography, density, navigation, where the eye lands first. Pick the one that matches how you actually want people using the page.
      </p>

      <div className="row">
        <div className="tag">A · Ops</div>
        <div className="name">Ops Command<span className="sub">Dark · Geist Mono · Top nav</span></div>
        <div className="desc">
          A mission-control reading. <strong>Top-nav with a live metrics ticker</strong>, modular 3×3 grid, monospace numbers everywhere, hazard band under the chrome. High information density — built for an operator who keeps this open all day on a second screen. Strongest when SLA, breaches and event-stream are the primary work.
        </div>
      </div>

      <div className="row">
        <div className="tag">B · Brief</div>
        <div className="name">Executive Brief<span className="sub">Cream · Source Serif · Sidebar</span></div>
        <div className="desc">
          An editorial reading. <strong>Serif headline writes itself</strong> ("three requests need your decision today"), priority cards numbered like a newspaper page, breathing room over chrome. Strongest when leadership opens the page once or twice a day and wants the day's narrative — not the telemetry.
        </div>
      </div>

      <div className="row">
        <div className="tag">C · Atlas</div>
        <div className="name">Field Atlas<span className="sub">Teal/charcoal · IBM Plex · Hybrid nav</span></div>
        <div className="desc">
          A spatial reading. <strong>Map fills the hero</strong> with site markers, convoys and routes; a sidecar panel deep-dives the selected site; alerts/in-motion/flow live in a bottom strip. Strongest when geography is the work — knowing which site is hot, where a convoy is, who's on roster — versus a flat queue.
        </div>
      </div>
    </div>
  );
}

// =====================================================
// CANVAS
// =====================================================
function App() {
  return (
    <DesignCanvas>
      <DCSection id="overview" title="Design notes">
        <DCArtboard id="notes" label="The brief" width={1200} height={680}>
          <DesignNotes/>
        </DCArtboard>
      </DCSection>

      <DCSection id="variations" title="Three dashboard directions">
        <DCArtboard id="ops" label="A · Ops Command (mission control)" width={1440} height={1100}>
          <OpsCommand/>
        </DCArtboard>
        <DCArtboard id="brief" label="B · Executive Brief (editorial)" width={1440} height={1100}>
          <ExecutiveBrief/>
        </DCArtboard>
        <DCArtboard id="atlas" label="C · Field Atlas (spatial)" width={1440} height={1100}>
          <FieldAtlas/>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
