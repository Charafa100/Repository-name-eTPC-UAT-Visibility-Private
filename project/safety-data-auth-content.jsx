/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard */

// ─── Icon set ───────────────────────────────────────────────────
const I = {
  grid:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  inbox:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13l3 7v6a2 2 0 01-2 2h-15a2 2 0 01-2-2v-6z"/></svg>,
  flask:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6"/><path d="M10 3v6L4 20a2 2 0 002 3h12a2 2 0 002-3l-6-11V3"/><path d="M8 14h8"/></svg>,
  db:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6"/></svg>,
  wallet: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 010-4h12v4"/><rect x="2" y="6" width="20" height="14" rx="2"/><circle cx="16" cy="13" r="1.5"/></svg>,
  recpt:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2h12l4 4v15l-3-2-3 2-3-2-3 2-3-2-1 2z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 4v6c0 5-4 9-9 10-5-1-9-5-9-10V6l9-4z"/><path d="M9 12l2 2 4-4"/></svg>,
  check:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 12l3 3 5-6"/></svg>,
  users:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  cog:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.4 1.9l.1.1a2 2 0 11-2.9 2.9l-.1-.1a1.7 1.7 0 00-1.9-.4 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.9.4l-.1.1a2 2 0 11-2.9-2.9l.1-.1a1.7 1.7 0 00.4-1.9 1.7 1.7 0 00-1.5-1H2a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.4-1.9L3.1 7a2 2 0 112.9-2.9l.1.1a1.7 1.7 0 001.9.4H8a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.4l.1-.1a2 2 0 112.9 2.9l-.1.1a1.7 1.7 0 00-.4 1.9V10a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></svg>,
  bell:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 16v-5a6 6 0 00-12 0v5l-2 2h16z"/><path d="M10 21a2 2 0 004 0"/></svg>,
  moon:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 13A9 9 0 1111 3a7 7 0 0010 10z"/></svg>,
  slider: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="9" cy="6" r="2" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="2" fill="currentColor" stroke="none"/><circle cx="7" cy="18" r="2" fill="currentColor" stroke="none"/></svg>,
  eye:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  pen:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 113 3L7 19l-4 1 1-4z"/></svg>,
  plus:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  filter: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  dnld:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  shield2:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  dots:   <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>,
  lock:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>,
};

// ─── Topbar ─────────────────────────────────────────────────────
function Topbar({ session }) {
  // session: { kind: 'ro'|'app'|'adm', label, time }
  return (
    <div className="vb-top">
      <div className="vb-brand">
        <div className="vb-mark"><span>TPC</span></div>
        <div className="vb-brand-name">SolutionHub</div>
      </div>

      {session && (
        <div className={`vb-subsession ${session.kind}`}>
          {I.lock}
          <span><strong>SAFETY DATA</strong> · {session.label} · {session.time}</span>
        </div>
      )}

      <div className="vb-pills">
        <span className="ppill"><span className="ppill-lbl">Sites</span><span className="ppill-val ok"><span className="pulse"></span>6/6</span></span>
        <span className="ppill"><span className="ppill-lbl">SLA</span><span className="ppill-val ok">92%</span></span>
        <span className="ppill"><span className="ppill-lbl">Breached</span><span className="ppill-val dng">2</span></span>
        <span className="ppill"><span className="ppill-lbl">Incidents</span><span className="ppill-val ok">0</span></span>
      </div>

      <div className="vb-top-right">
        <span className="vb-clock"><strong>14:32</strong> · DLA</span>
        <button className="vb-lang">EN</button>
        <button className="vb-ibtn">{I.moon}</button>
        <button className="vb-ibtn">{I.slider}</button>
        <button className="vb-ibtn">{I.bell}<span className="dot"></span></button>
        <div className="vb-user">
          <span className="av">{session && session.kind === 'app' ? 'MD' : session && session.kind === 'adm' ? 'CH' : 'AM'}</span>
          <span>
            <span className="vb-user-name">
              {session && session.kind === 'app' ? 'Mariam Deby' : session && session.kind === 'adm' ? 'Cherif Hassan' : 'Ahmed Mahamat'}
            </span>
            <span className="vb-user-role">
              {session && session.kind === 'app' ? 'HSE Approver' : session && session.kind === 'adm' ? 'Global Admin' : 'Field user'}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ────────────────────────────────────────────────────
function Sidebar({ active = 'safety', showSdaAdmin = false }) {
  return (
    <aside className="vb-side">
      <div className="vb-side-label">Platform</div>
      <div className={`vb-nav-item ${active==='dashboard'?'active':''}`}><span className="ico">{I.grid}</span><span>Dashboard</span></div>
      <div className="vb-nav-item"><span className="ico">{I.inbox}</span><span>My Requests</span><span className="bdg">3</span></div>

      <div className="vb-side-label">Solutions</div>
      <div className={`vb-nav-item ${active==='safety'?'active':''}`}><span className="ico">{I.flask}</span><span>Safety Data</span></div>
      <div className="vb-nav-item"><span className="ico">{I.db}</span><span>Master Sheet</span></div>
      <div className="vb-nav-item"><span className="ico">{I.wallet}</span><span>Cash Advance</span><span className="bdg">5</span></div>
      <div className="vb-nav-item"><span className="ico">{I.recpt}</span><span>Daily Expense</span></div>
      <div className="vb-nav-item"><span className="ico">{I.shield}</span><span>Security Escort</span><span className="bdg">1</span></div>

      {showSdaAdmin && (
        <React.Fragment>
          <div className="vb-side-label" style={{color:'#8A6500'}}>Safety Data · Admin</div>
          <div className={`vb-nav-item ${active==='sda-users'?'active':''}`}>
            <span className="ico" style={{color:'#C0392B'}}>{I.users}</span>
            <span>User access</span>
            <span className="bdg" style={{background:'#F0C040', color:'#1A1814'}}>SDA</span>
          </div>
          <div className="vb-nav-item">
            <span className="ico">{I.cog}</span>
            <span>SDA settings</span>
          </div>
        </React.Fragment>
      )}

      <div className="vb-side-label">Administration</div>
      <div className="vb-nav-item"><span className="ico">{I.check}</span><span>Approvals</span><span className="bdg">11</span></div>
      <div className="vb-nav-item"><span className="ico">{I.users}</span><span>Hub Users</span></div>
      <div className="vb-nav-item"><span className="ico">{I.cog}</span><span>Settings</span></div>
    </aside>
  );
}

// ─── Notes (corrected model) ────────────────────────────────────
function Notes() {
  return (
    <div className="design-notes">
      <h1>Hub access ≠ Safety Data role. <em>Everyone walks in</em> — what you can do inside depends on your role.</h1>
      <p className="lead">
        I had it wrong. There's no lock on the door. Every Hub user can enter Safety Data Management. But inside, permission is layered — most users have read-only access; a smaller group can edit; an even smaller group can approve; one or two are Safety Data Admins who manage who's who. That admin is separate from the Hub Global Admin, though Global Admin still oversees everything.
      </p>

      <div className="steps">
        <div className="step">
          <div className="num">01 · Read-only</div>
          <div className="h">Default for every Hub user.</div>
          <div className="d">Walks into Safety Data, sees the inventory, opens SDS files, reads classifications. Cannot edit, cannot approve, cannot create. The topbar shows a grey "READ-ONLY" badge so they always know their state.</div>
        </div>
        <div className="step">
          <div className="num">02 · Approver / Editor</div>
          <div className="h">Promoted by the SDA Admin.</div>
          <div className="d">Same view, but action buttons light up: New chemical, Approve, Reject, Edit. The topbar badge turns red — APPROVER · MD. Every elevated action is audit-logged. Promotion is per-user and per-site if needed.</div>
        </div>
        <div className="step">
          <div className="num">03 · Safety Data Admin</div>
          <div className="h">Manages who can do what — inside SDA only.</div>
          <div className="d">A separate role with its own screen ("User access" in the Admin section of the sidebar). Lists every Hub user, shows their current SDA role, lets the admin change it. Cannot touch Hub roles. Topbar badge is gold.</div>
        </div>
        <div className="step">
          <div className="num">04 · Global Admin (Hub)</div>
          <div className="h">Sees everything, can become any role.</div>
          <div className="d">Lives above all solutions. Can grant SDA Admin to anyone, override roles, audit everything. The "User access" screen is also reachable from here, but the SDA Admin role exists so HSE can run their own house without bothering IT.</div>
        </div>
      </div>
    </div>
  );
}

// ─── 01 · Read-only view ───────────────────────────────────────
function ReadOnlyView() {
  return (
    <div className="vb">
      <Topbar session={{ kind: 'ro', label: 'READ-ONLY · A. MAHAMAT', time: 'session 23:47' }} />
      <Sidebar active="safety" />
      <div className="vb-main">
        <div className="ph">
          <div>
            <div className="ph-eyebrow">Safety Data Management · PS2-Dompta site view</div>
            <div className="ph-title">Chemical inventory</div>
            <div className="ph-sub">145 active chemicals · last sync 14:21</div>
          </div>
          <div className="ph-act">
            <button className="btn btn-secondary">{I.filter} Filter</button>
            <button className="btn btn-secondary">{I.dnld} Export</button>
            <button className="btn btn-secondary disabled">{I.plus} New chemical</button>
          </div>
        </div>

        <div className="notice ro">
          <div className="nic">{I.eye}</div>
          <div>
            <strong>You have read-only access.</strong> You can browse the inventory and read SDS files, but cannot edit, approve, or add chemicals. Contact <strong style={{color:'#1A1814'}}>Mariam Deby (HSE)</strong> to request elevated rights.
          </div>
        </div>

        <div className="stats-row">
          <div className="stat" style={{'--sc':'#C0392B'}}><div className="stat-l">Active chemicals</div><div className="stat-v">145</div><div className="stat-d">+6 month</div></div>
          <div className="stat" style={{'--sc':'#F0C040'}}><div className="stat-l">Pending review</div><div className="stat-v">12</div><div className="stat-d dn">+3 today</div></div>
          <div className="stat" style={{'--sc':'#1F7C3B'}}><div className="stat-l">SDS up to date</div><div className="stat-v">98%</div><div className="stat-d">+2pt</div></div>
          <div className="stat" style={{'--sc':'#175CD3'}}><div className="stat-l">Sites covered</div><div className="stat-v">6/6</div><div className="stat-d">Operational</div></div>
        </div>

        <div className="chem-table">
          <div className="chem-h">
            <div className="chem-h-t">Chemical inventory · 145 substances</div>
            <div className="chem-h-m">read-only · last refresh 14:21</div>
          </div>
          {[
            { id:'CHM-154', name:'Methanol (CH₃OH)', sub:'Anhydrous · Brenntag Chad · 99.9%', ghs:['tox','flame'], qty:'1 250 L', site:'PS3-BEL', cls:'flam' },
            { id:'CHM-155', name:'Diesel B5', sub:'Automotive grade · Total Energies', ghs:['flame'], qty:'42 000 L', site:'PS2-DOM', cls:'flam' },
            { id:'CHM-156', name:'Acetone', sub:'Technical grade · cleaning solvent', ghs:['flame','tox'], qty:'320 L', site:'DLA-MAIN', cls:'flam' },
            { id:'CHM-152', name:'Hydraulic Fluid ISO 46', sub:'Mineral-based · Shell Tellus S2', ghs:['env'], qty:'2 800 L', site:'PS2-DOM', cls:'env' },
            { id:'CHM-148', name:'Sulfuric Acid 98%', sub:'Battery electrolyte grade', ghs:['tox','env'], qty:'180 L', site:'PS3-BEL', cls:'tox' },
            { id:'CHM-141', name:'Sodium Hydroxide', sub:'Caustic soda flakes · water treatment', ghs:['tox'], qty:'650 kg', site:'DLA-MAIN', cls:'tox' },
          ].map(r => (
            <div className="chem-row" key={r.id}>
              <div className={`h-icon ${r.cls}`}>{I.flask}</div>
              <div className="id">{r.id}</div>
              <div className="name">{r.name}<span className="sub">{r.sub}</span></div>
              <div className="ghs">{r.ghs.map((g,i)=><span key={i} className={g}></span>)}</div>
              <div className="qty">{r.qty}</div>
              <div className="site">{r.site}</div>
              <div className="more">{I.eye}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 02 · Approver / Editor view ────────────────────────────────
function ApproverView() {
  return (
    <div className="vb">
      <Topbar session={{ kind: 'app', label: 'APPROVER · M. DEBY', time: 'session 23:21' }} />
      <Sidebar active="safety" />
      <div className="vb-main">
        <div className="ph">
          <div>
            <div className="ph-eyebrow">Safety Data Management · all sites</div>
            <div className="ph-title">Chemical inventory <span className="role-pill app" style={{marginLeft:10, fontSize:11, verticalAlign:'middle'}}><span className="dot"></span>Approver</span></div>
            <div className="ph-sub">145 active · 12 awaiting your decision</div>
          </div>
          <div className="ph-act">
            <button className="btn btn-secondary">{I.filter} Filter</button>
            <button className="btn btn-secondary">{I.dnld} Export</button>
            <button className="btn btn-primary">{I.plus} New chemical</button>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat" style={{'--sc':'#C0392B'}}><div className="stat-l">Active chemicals</div><div className="stat-v">145</div><div className="stat-d">+6 month</div></div>
          <div className="stat" style={{'--sc':'#F0C040'}}><div className="stat-l">Awaiting you</div><div className="stat-v">12</div><div className="stat-d dn">+3 today</div></div>
          <div className="stat" style={{'--sc':'#1F7C3B'}}><div className="stat-l">Approved · May</div><div className="stat-v">47</div><div className="stat-d">+18%</div></div>
          <div className="stat" style={{'--sc':'#175CD3'}}><div className="stat-l">Avg decision</div><div className="stat-v">1.6d</div><div className="stat-d">−0.4d</div></div>
        </div>

        <div className="chem-table">
          <div className="chem-h">
            <div className="chem-h-t">Pending your decision · 4 of 12</div>
            <div className="chem-h-m">sorted by SLA · breaches first</div>
          </div>
          {[
            { id:'CHM-154', name:'Methanol (CH₃OH)', sub:'IH classification needed · 4 days overdue', ghs:['tox','flame'], qty:'1 250 L', site:'PS3-BEL', cls:'flam', urgent:true },
            { id:'CHM-156', name:'Acetone',          sub:'SHE review pending · due tomorrow',     ghs:['flame','tox'], qty:'320 L',  site:'DLA-MAIN', cls:'flam' },
            { id:'CHM-152', name:'Hydraulic Fluid ISO 46', sub:'EMP environmental review · 5d left', ghs:['env'],       qty:'2 800 L',site:'PS2-DOM', cls:'env' },
            { id:'CHM-148', name:'Sulfuric Acid 98%',sub:'Re-classification submitted by I. Saleh', ghs:['tox','env'], qty:'180 L',  site:'PS3-BEL', cls:'tox' },
          ].map(r => (
            <div className="chem-row" key={r.id} style={r.urgent ? { background:'rgba(192,57,43,0.03)' } : null}>
              <div className={`h-icon ${r.cls}`}>{I.flask}</div>
              <div className="id">{r.id}</div>
              <div className="name">{r.name}<span className="sub" style={r.urgent ? {color:'#9D2E22'} : null}>{r.sub}</span></div>
              <div className="ghs">{r.ghs.map((g,i)=><span key={i} className={g}></span>)}</div>
              <div className="qty">{r.qty}</div>
              <div className="tinl">
                <button className="tinl-btn approve">Approve</button>
                <button className="tinl-btn reject">Reject</button>
              </div>
              <div className="more">{I.dots}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── 03 · Safety Data User Management (admin view) ─────────────
function SdaUserMgmt() {
  const users = [
    { ini:'AM', cls:'',      name:'Ahmed Mahamat',     sub:'ahmed.mahamat@tpc.td · Field · Douala',       hub:'FIELD',      sda:'Read-only',  scope:'All sites',    last:'12 min ago' },
    { ini:'FM', cls:'gold',  name:'Fatima Moussa',     sub:'fatima.moussa@tpc.td · Store Manager',        hub:'STORE MGR',  sda:'Editor',     scope:'PS2-Dompta',   last:'1 h ago' },
    { ini:'IS', cls:'blue',  name:'Ibrahim Saleh',     sub:'ibrahim.saleh@tpc.td · IH Reviewer · HSE',    hub:'HSE',        sda:'Approver',   scope:'All sites',    last:'4 min ago' },
    { ini:'MD', cls:'red',   name:'Mariam Deby',       sub:'mariam.deby@tpc.td · HSE Manager',            hub:'HSE',        sda:'SDA Admin',  scope:'All sites',    last:'now' },
    { ini:'OC', cls:'',      name:'Oumar Cheikh',      sub:'oumar.cheikh@tpc.td · OI Safety · PS2',       hub:'OPS',        sda:'Editor',     scope:'PS2-Dompta',   last:'2 d ago' },
    { ini:'HI', cls:'blue',  name:'Hassan Ibrahim',    sub:'hassan.ibrahim@tpc.td · IH Reviewer',         hub:'HSE',        sda:'Approver',   scope:'PS3-Belabo',   last:'18 min ago' },
    { ini:'AK', cls:'',      name:'Aisha Koné',        sub:'aisha.kone@tpc.td · Budget Controller',       hub:'FIN',        sda:'Read-only',  scope:'All sites',    last:'5 h ago' },
    { ini:'CH', cls:'red',   name:'Cherif Hassan',     sub:'cherif.hassan@tpc.td · Global Admin',         hub:'GLOBAL',     sda:'SDA Admin',  scope:'All sites',    last:'now' },
  ];

  const roleColor = (r) => r === 'SDA Admin' ? 'adm' : r === 'Approver' ? 'app' : r === 'Editor' ? 'ed' : 'ro';

  return (
    <div className="vb">
      <Topbar session={{ kind: 'adm', label: 'SDA ADMIN', time: 'session 24:00' }} />
      <Sidebar active="sda-users" showSdaAdmin={true} />
      <div className="vb-main">
        <div className="ph">
          <div>
            <div className="ph-eyebrow">Safety Data Management · Admin</div>
            <div className="ph-title">User access <span className="role-pill adm" style={{marginLeft:10, fontSize:11, verticalAlign:'middle'}}><span className="dot"></span>SDA Admin only</span></div>
            <div className="ph-sub">Manage what each Hub user can do inside Safety Data. New users start with read-only.</div>
          </div>
          <div className="ph-act">
            <button className="btn btn-secondary">{I.dnld} Audit log</button>
            <button className="btn btn-primary">{I.plus} Invite reviewer</button>
          </div>
        </div>

        <div className="notice adm">
          <div className="nic">{I.shield2}</div>
          <div>
            <strong>You're the Safety Data Admin.</strong> Changes here only affect Safety Data. Hub user accounts are managed by the Global Admin in Hub Settings. Every role change is audit-logged with timestamp + actor.
          </div>
        </div>

        <div className="role-dist-card">
          <div className="role-dist-h">
            <div className="role-dist-h-t">Role distribution · 47 Hub users</div>
            <div className="role-dist-h-m">last change · MD added I. Saleh as Approver · 18 min ago</div>
          </div>
          <div className="role-dist">
            <div className="seg" style={{ background:'#A89F8C', width:'72%' }} title="Read-only"></div>
            <div className="seg" style={{ background:'#175CD3', width:'13%' }} title="Editor"></div>
            <div className="seg" style={{ background:'#C0392B', width:'11%' }} title="Approver"></div>
            <div className="seg" style={{ background:'#F0C040', width:'4%'  }} title="SDA Admin"></div>
          </div>
          <div className="role-legend">
            <div className="role-legend-row"><span className="sw" style={{background:'#A89F8C'}}></span><strong>34</strong> Read-only</div>
            <div className="role-legend-row"><span className="sw" style={{background:'#175CD3'}}></span><strong>6</strong> Editor</div>
            <div className="role-legend-row"><span className="sw" style={{background:'#C0392B'}}></span><strong>5</strong> Approver</div>
            <div className="role-legend-row"><span className="sw" style={{background:'#F0C040'}}></span><strong>2</strong> SDA Admin</div>
            <div className="role-legend-row" style={{marginLeft:'auto'}}><span style={{color:'#8A8170'}}>Filter:</span>
              <span className="umt-chip active">All</span>
              <span className="umt-chip">Read-only</span>
              <span className="umt-chip">Editor</span>
              <span className="umt-chip">Approver</span>
              <span className="umt-chip">Admin</span>
            </div>
          </div>
        </div>

        <div className="umt">
          <div className="umt-h">
            <div className="umt-h-t">All users · 47 with Safety Data access</div>
            <div className="umt-filter">
              <span className="umt-chip" style={{display:'inline-flex',alignItems:'center',gap:6}}>{I.search} Search users…</span>
              <span className="umt-chip">Site: all</span>
            </div>
          </div>
          <div className="umt-row head">
            <div></div>
            <div>User</div>
            <div>Hub role</div>
            <div>Safety Data role</div>
            <div>Site scope</div>
            <div>Last active</div>
            <div></div>
          </div>
          {users.map((u,i) => (
            <div className="umt-row" key={i}>
              <div className={`av ${u.cls}`}>{u.ini}</div>
              <div className="name">{u.name}<span className="sub">{u.sub}</span></div>
              <div className="hub-role">{u.hub}</div>
              <div>
                <select className="sda-sel" defaultValue={u.sda}>
                  <option>Read-only</option>
                  <option>Editor</option>
                  <option>Approver</option>
                  <option>SDA Admin</option>
                  <option>— No access —</option>
                </select>
              </div>
              <div className="site">{u.scope}</div>
              <div className="last">{u.last}</div>
              <div className="more">{I.dots}</div>
            </div>
          ))}
          <div className="umt-foot">
            <span>Showing 8 of 47 · scroll for more</span>
            <span>13 with elevated access (Editor+) · 2 SDA Admins</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 04 · Role hierarchy ───────────────────────────────────────
function Hierarchy() {
  return (
    <div className="hier">
      <h1>How the two role systems <em>stack</em>.</h1>
      <p className="hier-lead">
        Hub roles are about who can sign in to the SolutionHub at all. Safety Data roles are about what you can do once you're inside Safety Data. They're independent — except at the very top, where the Hub Global Admin oversees everything.
      </p>

      <div className="hier-cols">
        <div className="hier-col">
          <h2><span>Hub roles · who can sign in</span><span className="cnt">47 users</span></h2>

          <div className="hier-tier top">
            <div className="box">
              <span className="b-r">Global Admin</span>
              <span className="b-d">1 user · CH</span>
            </div>
          </div>
          <div className="hier-arrow">↓</div>
          <div className="hier-tier">
            <div className="box">
              <span className="b-r">Admin</span>
              <span className="b-d">3 users</span>
            </div>
          </div>
          <div className="hier-arrow">↓</div>
          <div className="hier-tier">
            <div className="box">
              <span className="b-r">HSE · Ops · Field · Finance · Store</span>
              <span className="b-d">43 users</span>
            </div>
          </div>

          <p style={{marginTop:20, fontSize:12.5, color:'#5C5443', lineHeight:1.5}}>
            <strong style={{color:'#1A1814'}}>Managed in:</strong> Hub Settings → Users.<br/>
            <strong style={{color:'#1A1814'}}>Decides:</strong> can you log into the Hub, which solutions appear in your sidebar.
          </p>
        </div>

        <div className="hier-col">
          <h2><span>Safety Data roles · what you can do inside</span><span className="cnt">47 users</span></h2>

          <div className="hier-tier top">
            <div className="box" style={{background:'linear-gradient(135deg, #1A1814 0%, #5C4824 100%)', borderColor:'#1A1814'}}>
              <span className="b-r">SDA Admin <span style={{color:'#F0C040', marginLeft:6, fontSize:11}}>★</span></span>
              <span className="b-d" style={{color:'rgba(240,192,64,0.9)'}}>2 users · MD, CH</span>
            </div>
          </div>
          <div className="hier-arrow">↓ grants ↓</div>
          <div className="hier-tier">
            <div className="box" style={{borderColor:'#C0392B', background:'rgba(192,57,43,0.04)'}}>
              <span className="b-r" style={{color:'#9D2E22'}}>Approver</span>
              <span className="b-d">5 users · sign-off</span>
            </div>
          </div>
          <div className="hier-arrow">↓</div>
          <div className="hier-tier">
            <div className="box" style={{borderColor:'#175CD3', background:'rgba(23,92,211,0.04)'}}>
              <span className="b-r" style={{color:'#175CD3'}}>Editor</span>
              <span className="b-d">6 users · edit</span>
            </div>
          </div>
          <div className="hier-arrow">↓</div>
          <div className="hier-tier">
            <div className="box" style={{borderColor:'#A89F8C', background:'rgba(168,159,140,0.06)'}}>
              <span className="b-r" style={{color:'#5C5443'}}>Read-only <span style={{color:'#8A8170', marginLeft:6, fontSize:11}}>(default)</span></span>
              <span className="b-d">34 users · view</span>
            </div>
          </div>

          <p style={{marginTop:20, fontSize:12.5, color:'#5C5443', lineHeight:1.5}}>
            <strong style={{color:'#1A1814'}}>Managed in:</strong> Safety Data → User access (visible to SDA Admin + Global Admin).<br/>
            <strong style={{color:'#1A1814'}}>Decides:</strong> view, edit, approve, or manage roles inside Safety Data.
          </p>
        </div>

        <div className="hier-bridge">
          <strong>Bridge rule.</strong> When IT creates a new Hub user, that user automatically lands as <strong style={{color:'#1A1814'}}>Read-only</strong> in Safety Data — no extra step needed. From there, the SDA Admin (HSE) decides if and when to promote them. The Hub Global Admin can override any SDA role at any time, but doesn't need to in day-to-day operation.
        </div>
      </div>
    </div>
  );
}

// ─── Canvas ─────────────────────────────────────────────────────
function App() {
  return (
    <DesignCanvas>
      <DCSection id="overview" title="The corrected model">
        <DCArtboard id="notes" label="Hub access ≠ Safety Data role" width={1200} height={520}>
          <Notes/>
        </DCArtboard>
      </DCSection>

      <DCSection id="inside" title="What you see inside Safety Data — by role">
        <DCArtboard id="ro"  label="01 · Read-only (default for every Hub user)" width={1440} height={900}>
          <ReadOnlyView/>
        </DCArtboard>
        <DCArtboard id="app" label="02 · Approver / Editor (elevated)" width={1440} height={900}>
          <ApproverView/>
        </DCArtboard>
      </DCSection>

      <DCSection id="admin" title="Safety Data has its own admin — separate from Hub">
        <DCArtboard id="userm" label="03 · SDA Admin · User access" width={1440} height={900}>
          <SdaUserMgmt/>
        </DCArtboard>
        <DCArtboard id="hier" label="04 · Role hierarchy · Hub vs SDA" width={1200} height={720}>
          <Hierarchy/>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
