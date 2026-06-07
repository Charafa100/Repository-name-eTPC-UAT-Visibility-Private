/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard */

// ─── Tiny icon set ──────────────────────────────────────────────
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
  slider:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="9" cy="6" r="2" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="2" fill="currentColor" stroke="none"/><circle cx="7" cy="18" r="2" fill="currentColor" stroke="none"/></svg>,
};

// ─── Shared chrome (topbar + sidebar internals) ───────────────────
function Topbar({ variant }) {
  return (
    <div className="vb-top">
      <div className="vb-top-brand">
        <div className="vb-top-mark"><span>TPC</span></div>
        <div className="vb-top-brand-name">SolutionHub</div>
      </div>

      <div className="vb-top-pills">
        <span className="ppill">
          <span className="ppill-lbl">Sites</span>
          <span className="ppill-val ok"><span className="pulse"></span>6/6</span>
        </span>
        <span className="ppill">
          <span className="ppill-lbl">SLA</span>
          <span className="ppill-val ok">92%</span>
        </span>
        <span className="ppill">
          <span className="ppill-lbl">Breached</span>
          <span className="ppill-val dng">2</span>
        </span>
        <span className="ppill">
          <span className="ppill-lbl">Incidents</span>
          <span className="ppill-val ok">0</span>
        </span>
      </div>

      <div className="vb-top-right">
        <span className="vb-clock"><strong>14:32</strong> · DLA</span>
        <button className="vb-lang">EN</button>
        <button className="vb-ibtn">{I.moon}</button>
        <button className="vb-ibtn">{I.slider}</button>
        <button className="vb-ibtn">{I.bell}<span className="dot"></span></button>
        <div className="vb-user">
          <span className="av">CH</span>
          <span className="vb-user-meta">
            <span className="vb-user-name">Cherif Hassan</span>
            <span className="vb-user-role">Global Admin</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="vb-side">
      <nav className="vb-side-nav">
        <div className="vb-side-label">Platform</div>
        <div className="vb-nav-item active"><span className="ico">{I.grid}</span><span>Dashboard</span></div>
        <div className="vb-nav-item"><span className="ico">{I.inbox}</span><span>My Requests</span><span className="bdg">3</span></div>

        <div className="vb-side-label">Solutions</div>
        <div className="vb-nav-item"><span className="ico">{I.flask}</span><span>Safety Data</span></div>
        <div className="vb-nav-item"><span className="ico">{I.db}</span><span>Master Sheet</span></div>
        <div className="vb-nav-item"><span className="ico">{I.wallet}</span><span>Cash Advance</span><span className="bdg">5</span></div>
        <div className="vb-nav-item"><span className="ico">{I.recpt}</span><span>Daily Expense</span></div>
        <div className="vb-nav-item"><span className="ico">{I.shield}</span><span>Security Escort</span><span className="bdg">1</span></div>

        <div className="vb-side-label">Administration</div>
        <div className="vb-nav-item"><span className="ico">{I.check}</span><span>Approvals</span><span className="bdg">11</span></div>
        <div className="vb-nav-item"><span className="ico">{I.users}</span><span>Users</span></div>
        <div className="vb-nav-item"><span className="ico">{I.cog}</span><span>Settings</span></div>
      </nav>

      <div className="vb-role">
        <div className="vb-role-l">Demo role</div>
        <select className="vb-role-s"><option>Global Admin · Cherif Hassan</option></select>
      </div>

      <div className="vb-side-foot">
        <span className="pulse"></span>
        <span>Live · Synced</span>
      </div>
    </aside>
  );
}

// ─── Hero / dashboard content (same for all 3, theme inherited) ──
function DashContent() {
  return (
    <div className="vb-main">
      <div className="vb-hero">
        <div className="vb-hero-l">
          <div className="vb-eyebrow">Friday · 15 May 2026 · Douala</div>
          <div className="vb-h1">
            Good afternoon, Cherif.<br/>
            <span className="vb-h1-sub">You have <em>3 chemical requests</em> awaiting your decision today.</span>
          </div>
          <div className="vb-hero-meta">
            <span><strong>92%</strong> on-time SLA</span>
            <span>Avg cycle <strong>3.2 days</strong></span>
            <span><strong>23</strong> active reviewers</span>
          </div>
        </div>
        <div className="vb-hero-r">
          <div className="vb-ring">
            <svg viewBox="0 0 100 100">
              <circle className="c" cx="50" cy="50" r="40" stroke="#F0F2F5"/>
              <circle className="c" cx="50" cy="50" r="40" stroke="#16A34A" strokeDasharray="200 251" strokeLinecap="round"/>
              <circle className="c" cx="50" cy="50" r="40" stroke="#F59E0B" strokeDasharray="36 251" strokeDashoffset="-200" strokeLinecap="round"/>
              <circle className="c" cx="50" cy="50" r="40" stroke="#DC2626" strokeDasharray="12 251" strokeDashoffset="-236" strokeLinecap="round"/>
            </svg>
            <div className="vb-ring-center">42</div>
          </div>
          <div className="vb-kpi">
            <div className="vb-kpi-v">42</div>
            <div className="vb-kpi-l">Active requests</div>
          </div>
        </div>
      </div>

      <div className="vb-kpis">
        <div className="vb-kcard" style={{'--kc':'#C0392B'}}>
          <span className="vb-kcard-l">Pending</span>
          <span className="vb-kcard-v">12</span>
          <span className="vb-kcard-d dn">+3 today</span>
        </div>
        <div className="vb-kcard" style={{'--kc':'#16A34A'}}>
          <span className="vb-kcard-l">Approved · May</span>
          <span className="vb-kcard-v">47</span>
          <span className="vb-kcard-d">+18%</span>
        </div>
        <div className="vb-kcard" style={{'--kc':'#F0C040'}}>
          <span className="vb-kcard-l">Avg cycle</span>
          <span className="vb-kcard-v">3.2d</span>
          <span className="vb-kcard-d">−12%</span>
        </div>
        <div className="vb-kcard" style={{'--kc':'#1A1A2E'}}>
          <span className="vb-kcard-l">SLA</span>
          <span className="vb-kcard-v">92%</span>
          <span className="vb-kcard-d">+4pt</span>
        </div>
      </div>

      <div className="vb-card">
        <div className="vb-card-h">
          <div className="vb-card-t">Your queue · awaiting decision</div>
          <div className="vb-card-meta">4 items · sorted by SLA</div>
        </div>
        <div className="vb-row">
          <span className="pip dng"></span>
          <span className="id">#CHM-154</span>
          <span className="ttl">Methanol — IH hazard classification needed</span>
          <span className="site">PS3-BEL</span>
          <span className="age dng">4d overdue</span>
        </div>
        <div className="vb-row">
          <span className="pip warn"></span>
          <span className="id">#CHM-156</span>
          <span className="ttl">Acetone — SHE review pending</span>
          <span className="site">DOUALA</span>
          <span className="age warn">2d 4h</span>
        </div>
        <div className="vb-row">
          <span className="pip"></span>
          <span className="id">#CHM-152</span>
          <span className="ttl">Hydraulic Fluid ISO 46 — EMP environmental review</span>
          <span className="site">PS2-DOM</span>
          <span className="age">5d left</span>
        </div>
        <div className="vb-row">
          <span className="pip"></span>
          <span className="id">#CHM-155</span>
          <span className="ttl">Diesel — final sign-off ready</span>
          <span className="site">PS2-DOM</span>
          <span className="age">Today</span>
        </div>
      </div>
    </div>
  );
}

function Shell({ klass }) {
  return (
    <div className={`vb vb-shell ${klass}`}>
      <Topbar/>
      <Sidebar/>
      <DashContent/>
    </div>
  );
}

// ─── Notes ──────────────────────────────────────────────────────
function Notes() {
  return (
    <div className="design-notes">
      <h1>The dark navy is too heavy — here are three <em>lighter</em> reads.</h1>
      <p className="lead">
        Same dashboard, same data, three different treatments for the top bar and sidebar. The body stays calm and white in all of them — only the chrome changes.
      </p>

      <div className="row">
        <div className="swatch">
          <span style={{background:'#fff'}}></span>
          <span style={{background:'#F7F8FA'}}></span>
          <span style={{background:'#C0392B'}}></span>
        </div>
        <div className="name">A · Frost<span className="sub">All white · red accent</span></div>
        <div className="desc">
          The lightest, calmest read. <strong>White topbar, white sidebar</strong>, hairline borders, red accent only on the active nav item and the brand mark. Status pills sit in soft grey. Feels like Notion or Linear — modern SaaS calm. The dashboard becomes a single sheet of paper.
        </div>
      </div>

      <div className="row">
        <div className="swatch">
          <span style={{background:'#FDFCFA'}}></span>
          <span style={{background:'#F4EFE3'}}></span>
          <span style={{background:'#F0C040'}}></span>
        </div>
        <div className="name">B · Ivory<span className="sub">Warm cream · gold accent</span></div>
        <div className="desc">
          A warmer, branded read. <strong>Cream sidebar with gold labels</strong> (TPC gold), white topbar, red still owns "active" but gold owns hierarchy. Active nav items lift to white cards with a red stripe. Feels editorial, premium — closer to oil-industry brand books than tech-startup. Strongest reinforcement of the TPC palette.
        </div>
      </div>

      <div className="row">
        <div className="swatch">
          <span style={{background:'#ECE9E2'}}></span>
          <span style={{background:'#2E2E33'}}></span>
          <span style={{background:'#F0C040'}}></span>
        </div>
        <div className="name">C · Graphite<span className="sub">Sand top · warm charcoal side</span></div>
        <div className="desc">
          Keeps a dark sidebar but <strong>swaps the navy for a softer graphite</strong> (#2E2E33 — neutral, less "tech bro"), pairs it with a warm sand topbar. Yellow gold leads the active state, red is reserved for badges + the brand. The dark sidebar still gives the app weight and focus, without the cold midnight-blue feel.
        </div>
      </div>
    </div>
  );
}

// ─── Canvas ─────────────────────────────────────────────────────
function App() {
  return (
    <DesignCanvas>
      <DCSection id="notes" title="Why three">
        <DCArtboard id="brief" label="The brief" width={1200} height={520}>
          <Notes/>
        </DCArtboard>
      </DCSection>

      <DCSection id="variants" title="Three lighter chrome treatments">
        <DCArtboard id="frost" label="A · Frost (all white)" width={1440} height={920}>
          <Shell klass="va"/>
        </DCArtboard>
        <DCArtboard id="ivory" label="B · Ivory (warm cream)" width={1440} height={920}>
          <Shell klass="vbb"/>
        </DCArtboard>
        <DCArtboard id="graphite" label="C · Graphite (soft charcoal)" width={1440} height={920}>
          <Shell klass="vc"/>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
