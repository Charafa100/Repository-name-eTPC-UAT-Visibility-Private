/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard */

const I = {
  grid:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  inbox:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13l3 7v6a2 2 0 01-2 2h-15a2 2 0 01-2-2v-6z"/></svg>,
  flask:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6"/><path d="M10 3v6L4 20a2 2 0 002 3h12a2 2 0 002-3l-6-11V3"/><path d="M8 14h8"/></svg>,
  db:      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6"/></svg>,
  wallet:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 010-4h12v4"/><rect x="2" y="6" width="20" height="14" rx="2"/><circle cx="16" cy="13" r="1.5"/></svg>,
  recpt:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2h12l4 4v15l-3-2-3 2-3-2-3 2-3-2-1 2z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>,
  shield:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 4v6c0 5-4 9-9 10-5-1-9-5-9-10V6l9-4z"/><path d="M9 12l2 2 4-4"/></svg>,
  check:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 12l3 3 5-6"/></svg>,
  users:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  cog:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.4 1.9l.1.1a2 2 0 11-2.9 2.9l-.1-.1a1.7 1.7 0 00-1.9-.4 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.9.4l-.1.1a2 2 0 11-2.9-2.9l.1-.1a1.7 1.7 0 00.4-1.9 1.7 1.7 0 00-1.5-1H2a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.4-1.9L3.1 7a2 2 0 112.9-2.9l.1.1a1.7 1.7 0 001.9.4H8a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.4l.1-.1a2 2 0 112.9 2.9l-.1.1a1.7 1.7 0 00-.4 1.9V10a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>,
  bell:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 16v-5a6 6 0 00-12 0v5l-2 2h16z"/><path d="M10 21a2 2 0 004 0"/></svg>,
  moon:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 13A9 9 0 1111 3a7 7 0 0010 10z"/></svg>,
  arrow:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  plus:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
};

// ─── Shared chrome ───────────────────────────────────────────────
function Topbar() {
  return (
    <div className="dm-top">
      <div className="dm-brand">
        <div className="dm-mark"><span>TPC</span></div>
        <div className="dm-brand-n">SolutionHub</div>
      </div>
      <div className="dm-pills">
        <span className="dm-pill"><span className="l">Sites</span><span className="v ok"><span className="dm-pulse"></span>6/6</span></span>
        <span className="dm-pill"><span className="l">SLA</span><span className="v ok">92%</span></span>
        <span className="dm-pill"><span className="l">Breached</span><span className="v dng">2</span></span>
        <span className="dm-pill"><span className="l">Incidents</span><span className="v ok">0</span></span>
      </div>
      <div className="dm-top-r">
        <span className="dm-clock"><strong>14:32</strong> · DLA</span>
        <button className="dm-ib">{I.moon}</button>
        <button className="dm-ib">{I.bell}<span className="dot"></span></button>
        <div className="dm-user">
          <span className="av">CH</span>
          <span className="dm-user-m">
            <span className="n">Cherif Hassan</span>
            <span className="r">Global Admin</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="dm-side">
      <div className="dm-side-l">Platform</div>
      <div className="dm-nav active"><span className="ic">{I.grid}</span><span>Dashboard</span></div>
      <div className="dm-nav"><span className="ic">{I.inbox}</span><span>My Requests</span><span className="bdg">3</span></div>

      <div className="dm-side-l">Solutions</div>
      <div className="dm-nav"><span className="ic">{I.flask}</span><span>Safety Data</span></div>
      <div className="dm-nav"><span className="ic">{I.db}</span><span>Master Sheet</span></div>
      <div className="dm-nav"><span className="ic">{I.wallet}</span><span>Cash Advance</span><span className="bdg">5</span></div>
      <div className="dm-nav"><span className="ic">{I.recpt}</span><span>Daily Expense</span></div>
      <div className="dm-nav"><span className="ic">{I.shield}</span><span>Security Escort</span><span className="bdg">1</span></div>

      <div className="dm-side-l">Administration</div>
      <div className="dm-nav"><span className="ic">{I.check}</span><span>Approvals</span><span className="bdg">11</span></div>
      <div className="dm-nav"><span className="ic">{I.users}</span><span>Users</span></div>
      <div className="dm-nav"><span className="ic">{I.cog}</span><span>Settings</span></div>
    </aside>
  );
}

// ═══════════════════════════════════════════════════════════════
// DIRECTION A — Quiet & spacious
// ═══════════════════════════════════════════════════════════════
function DirectionA() {
  // Spark data for KPIs
  const spark = (points, color) => {
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min || 1;
    const w = 100; const h = 30;
    const pts = points.map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / range) * h * 0.9 - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
    return (
      <svg className="dA-kpi-spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
        <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  };

  // Flow segments — sized as %
  const flow = [
    { id:'drafted',  name:'Drafted',           v: 8,  color: '#A89F8C', sub: '+2 today' },
    { id:'review',   name:'Pending review',    v: 15, color: '#F0C040', sub: 'Bottleneck', btl: true },
    { id:'approval', name:'Awaiting approval', v: 8,  color: '#C0392B', sub: '3 ready' },
    { id:'final',    name:'Final',             v: 3,  color: '#1F7C3B', sub: 'Today' },
  ];
  const total = flow.reduce((s, x) => s + x.v, 0);

  return (
    <div className="dm dA">
      <Topbar/>
      <Sidebar/>
      <main className="dm-main">
        <div className="dA-hello">Friday · 15 May 2026 · Douala</div>
        <h1 className="dA-headline">
          Good afternoon, Cherif.<br/>
          <span className="next">You have <em>3 chemical requests</em> awaiting your decision today.</span>
        </h1>
        <div className="dA-meta">
          <span><strong>92%</strong> on-time SLA</span>
          <span>Avg cycle <strong>3.2 days</strong></span>
          <span><strong>23</strong> active reviewers</span>
          <span><strong>6/6</strong> sites online</span>
        </div>

        {/* KPI cards — big numbers, soft shadow */}
        <div className="dA-kpis">
          <div className="dA-kpi">
            <div className="dA-kpi-l">
              <span>Active requests</span>
              <span className="dA-kpi-tag">+7</span>
            </div>
            <div className="dA-kpi-v">42</div>
            {spark([28,32,30,38,40,42,42], '#C0392B')}
          </div>
          <div className="dA-kpi">
            <div className="dA-kpi-l">
              <span>Approved · May</span>
              <span className="dA-kpi-tag">+18%</span>
            </div>
            <div className="dA-kpi-v">47</div>
            {spark([32,38,35,40,42,45,47], '#1F7C3B')}
          </div>
          <div className="dA-kpi">
            <div className="dA-kpi-l">
              <span>Avg cycle</span>
              <span className="dA-kpi-tag">−12%</span>
            </div>
            <div className="dA-kpi-v">3.2<span className="u">d</span></div>
            {spark([4.1,3.8,4.0,3.6,3.4,3.3,3.2], '#1F7C3B')}
          </div>
          <div className="dA-kpi">
            <div className="dA-kpi-l">
              <span>SLA breached</span>
              <span className="dA-kpi-tag dn">+1</span>
            </div>
            <div className="dA-kpi-v">2</div>
            {spark([1,1,2,1,2,2,2], '#C0392B')}
          </div>
        </div>

        {/* Approval flow — single ribbon */}
        <div className="dA-flow">
          <div className="dA-flow-h">
            <div className="dA-flow-t">Approval flow · {total} requests in motion</div>
            <div className="dA-flow-m">across 4 solutions <span className="btl">Pending review</span></div>
          </div>
          <div className="dA-flow-bar">
            {flow.map((f) => (
              <span key={f.id} style={{width: `${(f.v/total)*100}%`, background: f.color, color: f.btl ? '#1A1814' : '#fff', textShadow: f.btl ? 'none' : '0 1px 2px rgba(0,0,0,0.18)'}}>
                <span className="lbl" style={{color: f.btl ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.7)'}}>{f.name}</span>
                <span>{f.v}</span>
              </span>
            ))}
          </div>
          <div className="dA-flow-phases">
            {flow.map((f) => (
              <div key={f.id} className={`dA-flow-phase ${f.btl ? 'btl' : ''}`}>
                <div className="num">{f.v}</div>
                <div className="lbl">{f.name}</div>
                <div className={`sub ${f.btl ? 'btl' : ''}`}>{f.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Queue + Solutions rail */}
        <div className="dA-grid2">
          <div className="dA-card">
            <div className="dA-card-h">
              <div className="dA-card-t">Your queue · awaiting your decision</div>
              <div className="dA-card-m">4 items · sorted by SLA</div>
            </div>
            <div className="dA-queue">
              <div className="dA-q-row">
                <span className="pp dng"></span>
                <div className="dA-q-main">
                  <div className="id">#CHM-154 · Safety Data</div>
                  <div className="ttl">Methanol — IH hazard classification needed</div>
                  <div className="sub">PS3-Belabo · Ibrahim Saleh</div>
                </div>
                <div className="dA-q-age dng">4d overdue</div>
              </div>
              <div className="dA-q-row">
                <span className="pp warn"></span>
                <div className="dA-q-main">
                  <div className="id">#CHM-156 · Safety Data</div>
                  <div className="ttl">Acetone — SHE review pending</div>
                  <div className="sub">Douala · Ahmed Mahamat</div>
                </div>
                <div className="dA-q-age warn">2d 4h</div>
              </div>
              <div className="dA-q-row">
                <span className="pp"></span>
                <div className="dA-q-main">
                  <div className="id">#CHM-152 · Safety Data</div>
                  <div className="ttl">Hydraulic Fluid ISO 46 — environmental review</div>
                  <div className="sub">PS2-Dompta · Cherif Hassan</div>
                </div>
                <div className="dA-q-age">5d left</div>
              </div>
              <div className="dA-q-row">
                <span className="pp"></span>
                <div className="dA-q-main">
                  <div className="id">#CHM-155 · Safety Data</div>
                  <div className="ttl">Diesel — final sign-off ready</div>
                  <div className="sub">PS2-Dompta · Fatima Moussa</div>
                </div>
                <div className="dA-q-age">Today</div>
              </div>
            </div>
          </div>

          <div className="dA-card">
            <div className="dA-card-h">
              <div className="dA-card-t">Solutions</div>
              <div className="dA-card-m">4 active</div>
            </div>
            <div className="dA-sol">
              <div className="dA-sol-row">
                <div className="dA-sol-icon red">{I.flask}</div>
                <div>
                  <div className="dA-sol-name">Safety Data Management</div>
                  <div className="dA-sol-meta">145 chemicals · 12 pending</div>
                </div>
                <div className="dA-sol-arr">Open →</div>
              </div>
              <div className="dA-sol-row">
                <div className="dA-sol-icon yellow">{I.wallet}</div>
                <div>
                  <div className="dA-sol-name">Cash Advance</div>
                  <div className="dA-sol-meta">12 active · 1 overdue</div>
                </div>
                <div className="dA-sol-arr">Open →</div>
              </div>
              <div className="dA-sol-row">
                <div className="dA-sol-icon blue">{I.recpt}</div>
                <div>
                  <div className="dA-sol-name">Daily Expense</div>
                  <div className="dA-sol-meta">13 entries · May 2026</div>
                </div>
                <div className="dA-sol-arr">Open →</div>
              </div>
              <div className="dA-sol-row">
                <div className="dA-sol-icon green">{I.shield}</div>
                <div>
                  <div className="dA-sol-name">Security Escort</div>
                  <div className="dA-sol-meta">1 in transit · 3 planned</div>
                </div>
                <div className="dA-sol-arr">Open →</div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DIRECTION B — Editorial focus
// ═══════════════════════════════════════════════════════════════
function DirectionB() {
  const flow = [
    { name: 'Drafted',           v: 8,  color: '#A89F8C' },
    { name: 'Pending review',    v: 15, color: '#F0C040', btl: true },
    { name: 'Awaiting approval', v: 8,  color: '#C0392B' },
    { name: 'Final',             v: 3,  color: '#1F7C3B' },
  ];
  const total = flow.reduce((s, x) => s + x.v, 0);

  return (
    <div className="dm dB">
      <Topbar/>
      <Sidebar/>
      <main className="dm-main">

        <div className="dB-eyebrow-strip">
          <span className="live">Live</span>
          <span>Friday · 15 May 2026 · Douala 14:32</span>
          <span className="div">·</span>
          <span>6/6 sites online</span>
          <span className="div">·</span>
          <span>92% SLA</span>
          <span className="right">2 SLA breaches · 0 incidents (7d)</span>
        </div>

        <div className="dB-hero">
          <div className="dB-eyebrow">The Friday Brief</div>
          <h1 className="dB-h">Three chemical requests need <em>your decision</em> before close of day.</h1>
          <p className="dB-dek">
            Operations sit at 92% on-time SLA across six sites — the strongest month this quarter. The bottleneck is industrial-hygiene review; one methanol filing has now been open for four days.
          </p>
          <div className="dB-actions">
            <button className="dB-btn primary">{I.arrow}<span>Open my queue</span></button>
            <button className="dB-btn secondary">{I.plus}<span>New request</span></button>
          </div>
        </div>

        <div className="dB-stats-strip">
          <div className="dB-stat">
            <div className="dB-stat-l">Active requests</div>
            <div className="dB-stat-v">42</div>
            <div className="dB-stat-d">+7 vs last week</div>
          </div>
          <div className="dB-stat">
            <div className="dB-stat-l">Avg cycle time</div>
            <div className="dB-stat-v">3.2<span className="u">d</span></div>
            <div className="dB-stat-d">−12%</div>
          </div>
          <div className="dB-stat">
            <div className="dB-stat-l">Approved · May</div>
            <div className="dB-stat-v">47</div>
            <div className="dB-stat-d">+18%</div>
          </div>
          <div className="dB-stat">
            <div className="dB-stat-l">SLA breached</div>
            <div className="dB-stat-v">2</div>
            <div className="dB-stat-d dn">+1 today</div>
          </div>
        </div>

        <div className="dB-body">
          <div>
            <div className="dB-section-t">
              <span>On your desk</span>
              <span className="right">4 items · sorted by SLA</span>
            </div>
            <div className="dB-q-row">
              <div>
                <div className="ttl">Methanol — IH hazard classification needed</div>
                <div className="sub">#CHM-154 · Safety Data · PS3-Belabo · Ibrahim Saleh</div>
              </div>
              <div className="tag dng">4d overdue</div>
            </div>
            <div className="dB-q-row">
              <div>
                <div className="ttl">Acetone — SHE review pending</div>
                <div className="sub">#CHM-156 · Safety Data · Douala · Ahmed Mahamat</div>
              </div>
              <div className="tag warn">2d 4h</div>
            </div>
            <div className="dB-q-row">
              <div>
                <div className="ttl">Hydraulic Fluid ISO 46 — environmental review</div>
                <div className="sub">#CHM-152 · Safety Data · PS2-Dompta · Cherif Hassan</div>
              </div>
              <div className="tag">5d left</div>
            </div>
            <div className="dB-q-row">
              <div>
                <div className="ttl">Diesel — final sign-off ready</div>
                <div className="sub">#CHM-155 · Safety Data · PS2-Dompta · Fatima Moussa</div>
              </div>
              <div className="tag ok">Today</div>
            </div>

            <div className="dB-flow">
              <div className="dB-section-t">
                <span>Approval flow</span>
                <span className="right">{total} requests · 4 solutions · bottleneck Pending review</span>
              </div>
              <div className="dB-flow-bar">
                {flow.map((f, i) => (
                  <span key={i} style={{width: `${(f.v/total)*100}%`, background: f.color}}></span>
                ))}
              </div>
              <div className="dB-flow-grid">
                {flow.map((f, i) => (
                  <div key={i} className={`dB-flow-cell ${f.btl ? 'btl' : ''}`}>
                    <span className="dot" style={{background: f.color}}></span>
                    <span className="lbl">{f.name}</span>
                    <div className="v">{f.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="dB-section-t">
              <span>Solutions</span>
              <span className="right">4 connected</span>
            </div>
            <div className="dB-sol">
              <div className="dB-sol-row">
                <div className="dB-sol-icon red">{I.flask}</div>
                <div>
                  <div className="dB-sol-name">Safety Data Management</div>
                  <div className="dB-sol-meta">145 chemicals · 12 pending</div>
                </div>
                <div className="dB-sol-arr">→</div>
              </div>
              <div className="dB-sol-row">
                <div className="dB-sol-icon yellow">{I.wallet}</div>
                <div>
                  <div className="dB-sol-name">Cash Advance</div>
                  <div className="dB-sol-meta">12 active · 1 overdue</div>
                </div>
                <div className="dB-sol-arr">→</div>
              </div>
              <div className="dB-sol-row">
                <div className="dB-sol-icon blue">{I.recpt}</div>
                <div>
                  <div className="dB-sol-name">Daily Expense</div>
                  <div className="dB-sol-meta">13 entries · May 2026</div>
                </div>
                <div className="dB-sol-arr">→</div>
              </div>
              <div className="dB-sol-row">
                <div className="dB-sol-icon green">{I.shield}</div>
                <div>
                  <div className="dB-sol-name">Security Escort</div>
                  <div className="dB-sol-meta">1 in transit · 3 planned</div>
                </div>
                <div className="dB-sol-arr">→</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Notes
// ═══════════════════════════════════════════════════════════════
function Notes() {
  return (
    <div className="design-notes">
      <h1>Lighter, more modern — two directions for the dashboard.</h1>
      <p className="lead">
        The current dashboard works, but everything competes for attention — hero, approval flow, queue, news, activity stream, solutions, quick actions. Below are two ways to <em>quiet it down</em>. Same data, same ivory palette, but each picks a different visual rhythm.
      </p>

      <div className="grid2">
        <div className="col">
          <div className="num">A · Quiet &amp; spacious</div>
          <div className="h">Soft shadows, big numbers, breathing room.</div>
          <div className="d">
            Borders go away — cards float on the cream with soft drop shadows. KPIs get <strong>big bold numbers</strong> with mini sparklines. The approval flow becomes a single horizontal pill-bar plus 4 phase numbers — denser, cleaner, easier to scan. Queue and Solutions live side by side as two airy cards. News and activity stream are gone for now — we can bring them back as a 3rd row if needed. <strong>Most modern, most "SaaS calm".</strong>
          </div>
        </div>
        <div className="col">
          <div className="num">B · Editorial focus</div>
          <div className="h">Serif headline, single narrative.</div>
          <div className="d">
            A dark live-strip at the top (live ticker), then a magazine hero with a <strong>serif headline that writes itself</strong> ("Three chemical requests need your decision"). Stats sit in a 4-cell strip without cards. Two columns below: "On your desk" left (queue + approval flow), Solutions right. Pill-shaped buttons, no card borders anywhere — just type and rules. <strong>Most distinctive, most premium feel.</strong>
          </div>
        </div>
      </div>

      <h2>What goes away in both</h2>
      <p>News & announcements, Live activity stream, Quick actions, Site activity map — none are essential for the daily glance. They belong on a dedicated page (Activity / Newsroom) reachable from the sidebar, not crowding the home view. Tell me if you disagree on any.</p>

      <h2>Keep in both</h2>
      <p>Hero with "Good afternoon, Cherif" · the new 4-phase approval flow (Drafted · Pending review · Awaiting approval · Final) · your queue · the 4 solutions list · the topbar pills.</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Canvas
// ═══════════════════════════════════════════════════════════════
function App() {
  return (
    <DesignCanvas>
      <DCSection id="brief" title="Two directions">
        <DCArtboard id="notes" label="What changes &amp; why" width={1200} height={520}>
          <Notes/>
        </DCArtboard>
      </DCSection>

      <DCSection id="dirs" title="Pick a direction">
        <DCArtboard id="quiet" label="A · Quiet &amp; spacious (modern SaaS)" width={1440} height={1000}>
          <DirectionA/>
        </DCArtboard>
        <DCArtboard id="editorial" label="B · Editorial focus (serif headline)" width={1440} height={1000}>
          <DirectionB/>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
