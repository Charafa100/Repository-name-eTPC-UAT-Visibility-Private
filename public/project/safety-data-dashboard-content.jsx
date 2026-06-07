/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard */

const I = {
  grid:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  flask:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6"/><path d="M10 3v6L4 20a2 2 0 002 3h12a2 2 0 002-3l-6-11V3"/><path d="M8 14h8"/></svg>,
  db:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6"/></svg>,
  hardhat:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 18v-2a4 4 0 014-4h12a4 4 0 014 4v2"/><path d="M10 12V8.5a1.5 1.5 0 013 0V12"/><path d="M4 18h16"/><path d="M8 12V6a2 2 0 012-2h4a2 2 0 012 2v6"/></svg>,
  arch:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="5" rx="1"/><path d="M5 8v11a2 2 0 002 2h10a2 2 0 002-2V8"/><path d="M10 12h4"/></svg>,
  bldg:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01"/></svg>,
  book:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
  plus:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  arrow:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  download:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  back:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  pin:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 7-8 13-8 13s-8-6-8-13a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  bell:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 16v-5a6 6 0 00-12 0v5l-2 2h16z"/><path d="M10 21a2 2 0 004 0"/></svg>,
  moon:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 13A9 9 0 1111 3a7 7 0 0010 10z"/></svg>,
};

function Topbar() {
  return (
    <div className="sdm-top">
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <div className="sdm-mark"><span>TPC</span></div>
        <div className="sdm-brand-n">SolutionHub</div>
      </div>
      <div className="sdm-crumb">
        <span className="sep">/</span>
        <span>Hub</span>
        <span className="sep">/</span>
        <span className="now">Safety Data Management</span>
      </div>
      <div className="sdm-top-r">
        <div className="sdm-pills">
          <span className="sdm-pill"><span className="l">Active</span><span className="v">145</span></span>
          <span className="sdm-pill"><span className="l">Pending</span><span className="v dng">12</span></span>
          <span className="sdm-pill"><span className="l">SLA</span><span className="v ok">92%</span></span>
        </div>
        <button className="sdm-btn secondary" style={{padding:'7px 10px'}}>{I.bell}</button>
        <div className="sdm-user">
          <span className="av">CH</span>
          <span>
            <span className="n" style={{display:'block',lineHeight:1.1}}>Cherif Hassan</span>
            <span className="r" style={{display:'block',lineHeight:1.1}}>Global Admin</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="sdm-side">
      <div className="sdm-side-l back">
        <span className="ch">‹</span>
        <span>Back to Hub</span>
      </div>

      <div className="sdm-side-l">Overview</div>
      <div className="sdm-nav active">
        <span className="ic">{I.flask}</span><span>Dashboard</span>
      </div>
      <div className="sdm-nav">
        <span className="ic">{I.db}</span><span>Master Sheet</span>
        <span className="bdg">145</span>
      </div>

      <div className="sdm-side-l">Workflow</div>
      <div className="sdm-nav">
        <span className="ic">{I.plus}</span><span>New chemical</span>
      </div>
      <div className="sdm-nav">
        <span className="ic">{I.pin}</span><span>Add to my site</span>
      </div>

      <div className="sdm-side-l">Manage</div>
      <div className="sdm-nav">
        <span className="ic">{I.arch}</span><span>Storage</span>
      </div>
      <div className="sdm-nav">
        <span className="ic">{I.bldg}</span><span>Manufacturers</span>
      </div>
      <div className="sdm-nav">
        <span className="ic">{I.hardhat}</span><span>PPE</span>
      </div>

      <div className="sdm-side-l">Resources</div>
      <div className="sdm-nav">
        <span className="ic">{I.book}</span><span>User guide</span>
      </div>
    </aside>
  );
}

function Hero() {
  const flow = [
    { v: 4,  color: '#A89F8C', name: 'Submit',    sub: 'Avg 0.4d' },
    { v: 6,  color: '#1F6FCC', name: 'Physician', sub: 'Avg 0.8d' },
    { v: 9,  color: '#F0C040', name: 'IH',        sub: 'Avg 1.6d', btl: true },
    { v: 7,  color: '#0D9488', name: 'OI',        sub: 'Avg 0.9d' },
    { v: 5,  color: '#7C3AED', name: 'EMP',       sub: 'Avg 0.6d' },
    { v: 3,  color: '#1F7C3B', name: 'Final',     sub: 'Avg 0.3d' },
  ];
  const total = flow.reduce((s, x) => s + x.v, 0);

  return (
    <div className="sdm-hero">
      <div>
        <div className="sdm-hero-eyebrow">
          <span className="dot"></span>
          <span>Safety Data Management · 15 May 2026</span>
        </div>
        <h1 className="sdm-hero-h">
          <em>145 chemicals</em> across 6 sites, <em>12 awaiting</em> review.
        </h1>
        <p className="sdm-hero-d">
          IH classification is the current bottleneck — 9 requests in motion, average 1.6&nbsp;days. Two filings have breached SLA and need attention before close of day.
        </p>
        <div className="sdm-hero-actions">
          <button className="sdm-btn primary">{I.plus}<span>New chemical</span></button>
          <button className="sdm-btn secondary">{I.download}<span>Export</span></button>
        </div>

        {/* Compact flow ribbon — animates fill */}
        <div className="sdm-flow-bar" style={{marginTop:24}}>
          {flow.map((f, i) => (
            <span key={i} style={{
              '--w': `${(f.v/total)*100}%`,
              '--d': `${0.9 + i*0.06}s`,
              background: f.color,
              color: f.btl ? '#1A1814' : '#fff',
              textShadow: f.btl ? 'none' : '0 1px 2px rgba(0,0,0,0.18)'
            }}>
              <span className="lbl" style={{color: f.btl ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.78)'}}>{f.name}</span>
              <span>{f.v}</span>
            </span>
          ))}
        </div>
        <div className="sdm-flow-stages">
          {flow.map((f, i) => (
            <div key={i} className={`sdm-flow-stage ${f.btl ? 'btl' : ''}`} style={{'--c': f.color}}>
              <span className="dot"></span>
              <span className="n">{f.v}</span>
              <span className="lbl">{f.name}</span>
              <span className="sub">{f.sub}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{position:'relative'}}>
        <div className="sdm-gauge">
          <svg viewBox="0 0 200 200">
            <circle className="tr" cx="100" cy="100" r="80"/>
            <circle className="fl" cx="100" cy="100" r="80" stroke="#1F7C3B"
              strokeDasharray="463 502" strokeDashoffset="0" />
            <circle className="fl" cx="100" cy="100" r="80" stroke="#F0C040"
              strokeDasharray="55 502" strokeDashoffset="-463"
              style={{animationDelay:'0.55s'}}/>
            <circle className="fl" cx="100" cy="100" r="80" stroke="#C0392B"
              strokeDasharray="13 502" strokeDashoffset="-518"
              style={{animationDelay:'0.7s'}}/>
          </svg>
          <div className="sdm-gauge-center">
            <div>
              <div className="v">92<span className="u">%</span></div>
              <div className="l">SLA · 30 days</div>
            </div>
          </div>
        </div>
        <div className="sdm-gauge-leg">
          <div className="sdm-gauge-leg-row"><span className="sw" style={{background:'#1F7C3B'}}></span>On-time · <strong>34</strong></div>
          <div className="sdm-gauge-leg-row"><span className="sw" style={{background:'#F0C040'}}></span>At risk · <strong>6</strong></div>
          <div className="sdm-gauge-leg-row"><span className="sw" style={{background:'#C0392B'}}></span>Breached · <strong>2</strong></div>
        </div>
      </div>
    </div>
  );
}

function Spark({ pts, color }) {
  const max = Math.max(...pts); const min = Math.min(...pts);
  const r = max - min || 1;
  const w = 100, h = 24;
  const path = pts.map((p, i) => {
    const x = (i / (pts.length - 1)) * w;
    const y = h - ((p - min) / r) * h * 0.85 - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return (
    <svg className="sdm-spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <polyline points={path} stroke={color}/>
    </svg>
  );
}

function Kpis() {
  return (
    <div className="sdm-kpis">
      <div className="sdm-kpi" style={{'--kc':'#C0392B'}}>
        <div className="sdm-kpi-top">
          <span className="sdm-kpi-l">Active chemicals</span>
          <span className="sdm-kpi-tag">+6 month</span>
        </div>
        <div className="sdm-kpi-v">145</div>
        <Spark pts={[126,131,134,138,140,142,145]} color="#C0392B"/>
      </div>
      <div className="sdm-kpi" style={{'--kc':'#F0C040'}}>
        <div className="sdm-kpi-top">
          <span className="sdm-kpi-l">Pending review</span>
          <span className="sdm-kpi-tag dn">+3 today</span>
        </div>
        <div className="sdm-kpi-v">12</div>
        <Spark pts={[8,10,7,9,11,13,12]} color="#F0C040"/>
      </div>
      <div className="sdm-kpi" style={{'--kc':'#1F7C3B'}}>
        <div className="sdm-kpi-top">
          <span className="sdm-kpi-l">Approved · May</span>
          <span className="sdm-kpi-tag">+18%</span>
        </div>
        <div className="sdm-kpi-v">47</div>
        <Spark pts={[32,38,35,40,42,45,47]} color="#1F7C3B"/>
      </div>
      <div className="sdm-kpi" style={{'--kc':'#1F6FCC'}}>
        <div className="sdm-kpi-top">
          <span className="sdm-kpi-l">SDS up to date</span>
          <span className="sdm-kpi-tag">+2 pt</span>
        </div>
        <div className="sdm-kpi-v">98<span className="u">%</span></div>
        <Spark pts={[91,93,94,95,96,97,98]} color="#1F6FCC"/>
      </div>
    </div>
  );
}

function DecisionQueue() {
  return (
    <div className="sdm-card">
      <div className="sdm-card-h">
        <div className="sdm-card-t">Awaiting your decision</div>
        <div className="sdm-card-m">4 items · sorted by SLA</div>
      </div>
      <div className="sdm-q-row">
        <span className="pp dng"></span>
        <span className="id">#CHM-154</span>
        <div>
          <div className="ttl">Methanol — IH hazard classification needed</div>
          <div className="sub">PS3-Belabo · Ibrahim Saleh</div>
        </div>
        <span className="age dng">4d overdue</span>
      </div>
      <div className="sdm-q-row">
        <span className="pp warn"></span>
        <span className="id">#CHM-156</span>
        <div>
          <div className="ttl">Acetone — SHE review pending</div>
          <div className="sub">Douala · Ahmed Mahamat</div>
        </div>
        <span className="age warn">2d 4h</span>
      </div>
      <div className="sdm-q-row">
        <span className="pp"></span>
        <span className="id">#CHM-152</span>
        <div>
          <div className="ttl">Hydraulic Fluid ISO 46 — EMP environmental review</div>
          <div className="sub">PS2-Dompta · Cherif Hassan</div>
        </div>
        <span className="age">5d left</span>
      </div>
      <div className="sdm-q-row">
        <span className="pp"></span>
        <span className="id">#CHM-155</span>
        <div>
          <div className="ttl">Diesel — final sign-off ready</div>
          <div className="sub">PS2-Dompta · Fatima Moussa</div>
        </div>
        <span className="age">Today</span>
      </div>
    </div>
  );
}

function HazardComposition() {
  const haz = [
    { l: 'Flammable',  v: 58, color: '#C0392B', d: '40% of inventory' },
    { l: 'Toxic',      v: 34, color: '#F0C040', d: '23%' },
    { l: 'Environment',v: 22, color: '#1F7C3B', d: '15%' },
    { l: 'Corrosive',  v: 18, color: '#7C3AED', d: '12%' },
    { l: 'Oxidising',  v: 9,  color: '#1F6FCC', d: '6%' },
    { l: 'Compressed', v: 4,  color: '#0D9488', d: '3%' },
  ];
  const max = Math.max(...haz.map(h => h.v));
  return (
    <div className="sdm-card" style={{animationDelay:'0.40s'}}>
      <div className="sdm-card-h">
        <div className="sdm-card-t">Hazard composition</div>
        <div className="sdm-card-m">GHS · 145 chemicals</div>
      </div>
      <div className="sdm-ghs">
        {haz.map((h, i) => (
          <div key={i} className="sdm-ghs-cell" style={{'--c': h.color, '--w': `${(h.v/max)*100}%`}}>
            <span className="sdm-ghs-l" style={{color: h.color}}>{h.l}</span>
            <span className="sdm-ghs-v">{h.v}</span>
            <span className="sdm-ghs-d">{h.d}</span>
          </div>
        ))}
      </div>

      <div className="sdm-card-h" style={{marginTop:20}}>
        <div className="sdm-card-t">Sites with chemical inventory</div>
        <div className="sdm-card-m">6 / 6 reporting</div>
      </div>
      <div className="sdm-sites">
        <div className="sdm-site-cell">
          <span className="pp dng"></span>
          <span className="code">PS3-BEL</span>
          <span className="name">Belabo</span>
          <span className="stat"><strong>28</strong> chemicals · <strong>11</strong> req · SLA 86%</span>
        </div>
        <div className="sdm-site-cell">
          <span className="pp"></span>
          <span className="code">PS2-DOM</span>
          <span className="name">Dompta</span>
          <span className="stat"><strong>34</strong> chemicals · <strong>8</strong> req · SLA 96%</span>
        </div>
        <div className="sdm-site-cell">
          <span className="pp warn"></span>
          <span className="code">DLA-MAIN</span>
          <span className="name">Douala</span>
          <span className="stat"><strong>52</strong> chemicals · <strong>14</strong> req · SLA 91%</span>
        </div>
        <div className="sdm-site-cell">
          <span className="pp"></span>
          <span className="code">KRB-PRT</span>
          <span className="name">Kribi Port</span>
          <span className="stat"><strong>18</strong> chemicals · <strong>5</strong> req · SLA 98%</span>
        </div>
        <div className="sdm-site-cell">
          <span className="pp"></span>
          <span className="code">PS1-NDJ</span>
          <span className="name">N'Djamena</span>
          <span className="stat"><strong>13</strong> chemicals · <strong>4</strong> req · SLA 94%</span>
        </div>
        <div className="sdm-site-cell">
          <span className="pp"></span>
          <span className="code">FLD-MOB</span>
          <span className="name">Mobile · E12</span>
          <span className="stat"><strong>0</strong> chemicals · idle</span>
        </div>
      </div>
    </div>
  );
}

function ModulesRow() {
  return (
    <div className="sdm-mods">
      <div className="sdm-mod">
        <div className="ic" style={{'--bg':'rgba(192,57,43,0.10)','--c':'#C0392B'}}>{I.plus}</div>
        <div>
          <div className="sdm-mod-name">New chemical</div>
          <div className="sdm-mod-sub">Submit for HSE review</div>
        </div>
      </div>
      <div className="sdm-mod">
        <div className="ic" style={{'--bg':'rgba(31,111,204,0.10)','--c':'#1F6FCC'}}>{I.pin}</div>
        <div>
          <div className="sdm-mod-name">Add to my site</div>
          <div className="sdm-mod-sub">Existing chemical · new site</div>
        </div>
      </div>
      <div className="sdm-mod">
        <div className="ic" style={{'--bg':'rgba(124,58,237,0.10)','--c':'#7C3AED'}}>{I.db}</div>
        <div>
          <div className="sdm-mod-name">Master Sheet</div>
          <div className="sdm-mod-sub">All 145 entries</div>
        </div>
      </div>
      <div className="sdm-mod">
        <div className="ic" style={{'--bg':'rgba(240,192,64,0.18)','--c':'#8A6500'}}>{I.hardhat}</div>
        <div>
          <div className="sdm-mod-name">PPE Library</div>
          <div className="sdm-mod-sub">Per-chemical equipment</div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="sdm">
      <Topbar/>
      <Sidebar/>
      <main className="sdm-main">
        <Hero/>
        <Kpis/>
        <div className="sdm-body">
          <DecisionQueue/>
          <HazardComposition/>
        </div>
        <ModulesRow/>
      </main>
    </div>
  );
}

function Notes() {
  return (
    <div className="notes">
      <h1>A dedicated <em>Safety Data Management</em> dashboard, connected to the Hub.</h1>
      <p className="lead">
        When you click the <strong>Safety Data Management</strong> card on the Hub, you now land on this — its own dashboard, with its own chrome, its own data, and a clear "Back to Hub" path. The Hub keeps the overview; this page handles the actual chemical work.
      </p>

      <h2>What's on the page</h2>
      <ul>
        <li><strong>Hero with serif headline</strong> that writes the day's story: "145 chemicals across 6 sites, 12 awaiting review." The eyebrow has a pulsing red dot to signal a live system.</li>
        <li><strong>Animated SLA ring</strong> on the right — green/gold/red arcs draw in over 1.6s, center number fades up.</li>
        <li><strong>6-stage approval pipeline</strong> below the headline: a coloured ribbon that fills in left-to-right, then the stage dots/numbers appear underneath. The IH bottleneck has a soft gold pulse.</li>
        <li><strong>4 KPI cards</strong>: chemicals, pending, approved, SDS health — each rises into place with a sparkline that draws after.</li>
        <li><strong>Awaiting your decision</strong> queue — 4 items, urgent ones glow red.</li>
        <li><strong>Hazard composition</strong> — 6 GHS categories, each cell's bottom bar animates to its proportion. Underneath, the 6 sites with chemical inventory.</li>
        <li><strong>Quick modules row</strong> — New chemical · Add to site · Master Sheet · PPE.</li>
      </ul>

      <h2>Motion language</h2>
      <ul>
        <li><strong>Stagger entrance</strong> — every section fades up with a small Y-translation, in cascading delays (hero → KPIs → cards → modules).</li>
        <li><strong>Draw on load</strong> — the SLA ring, the pipeline ribbon, the GHS bars, the sparklines all animate from 0 to their value.</li>
        <li><strong>Living indicators</strong> — red eyebrow dot pulses; SLA-breach pip in the queue glows; gold bottleneck dot breathes. Subtle but constantly present.</li>
        <li><strong>Hover lifts</strong> — module cards rise 2px on hover with a soft shadow.</li>
      </ul>

      <h2>Connected to the Hub</h2>
      <p>"Back to Hub" sits at the very top of the sidebar. Topbar shows the Hub crumb so the user always knows where they are. Topbar pills show this solution's KPIs (Active · Pending · SLA) — not the Hub's, since we're inside a solution now. Sidebar nav is solution-specific: Dashboard, Master Sheet, New chemical, Add to site, Storage, Manufacturers, PPE, User guide — exactly what Safety Data needs, nothing else.</p>

      <h2>Next steps if you approve</h2>
      <ul>
        <li>Replace the existing <code>#page-chemical</code> section in the main file with this layout.</li>
        <li>Wire the click on the Safety Data card on the Hub to navigate here with a soft cross-fade transition.</li>
        <li>Apply the same pattern (own dashboard, own sidebar, own chrome) to Cash, Expense, Escort as we touch them.</li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <DesignCanvas>
      <DCSection id="brief" title="The plan">
        <DCArtboard id="notes" label="Why a dedicated SDM dashboard" width={1200} height={720}>
          <Notes/>
        </DCArtboard>
      </DCSection>

      <DCSection id="design" title="The dashboard">
        <DCArtboard id="sdm-dashboard" label="Safety Data Management · animated" width={1440} height={1000}>
          <Dashboard/>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
