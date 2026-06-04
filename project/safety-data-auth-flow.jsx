/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard */

const { useState } = React;

// ─── Icons ───────────────────────────────────────────────────────
const I = {
  grid:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  inbox:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13l3 7v6a2 2 0 01-2 2h-15a2 2 0 01-2-2v-6z"/></svg>,
  flask:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6"/><path d="M10 3v6L4 20a2 2 0 002 3h12a2 2 0 002-3l-6-11V3"/><path d="M8 14h8"/></svg>,
  wallet:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 010-4h12v4"/><rect x="2" y="6" width="20" height="14" rx="2"/><circle cx="16" cy="13" r="1.5"/></svg>,
  recpt:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2h12l4 4v15l-3-2-3 2-3-2-3 2-3-2-1 2z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>,
  shield:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 4v6c0 5-4 9-9 10-5-1-9-5-9-10V6l9-4z"/><path d="M9 12l2 2 4-4"/></svg>,
  lock:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>,
  unlock:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 017.9-.9"/></svg>,
  key:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="15" r="4"/><path d="M10.85 12.15L19 4"/><path d="M18 5l2 2"/><path d="M15 8l2 2"/></svg>,
  shieldCheck: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 4v6c0 5-4 9-9 10-5-1-9-5-9-10V6l9-4z"/><path d="M9 12l2 2 4-4"/></svg>,
  alert:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L1 21h22z"/><path d="M12 9v5"/><circle cx="12" cy="17.5" r="1" fill="currentColor"/></svg>,
  bell:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 16v-5a6 6 0 00-12 0v5l-2 2h16z"/><path d="M10 21a2 2 0 004 0"/></svg>,
  moon:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 13A9 9 0 1111 3a7 7 0 0010 10z"/></svg>,
  send:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>,
  check:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  clock:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/></svg>,
  user:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  mail:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22 6 12 13 2 6"/></svg>,
  arrow:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  history: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/><polyline points="12 7 12 12 16 14"/></svg>,
  info:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="16" x2="12" y2="12"/><circle cx="12" cy="8" r="0.7" fill="currentColor"/></svg>,
};

// ─── Shared Topbar (for full-app screens) ────────────────────────
function Topbar({ crumb, secure }) {
  return (
    <div className="sd-top">
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <div className="sd-mark"><span>TPC</span></div>
        <div className="sd-brand">SolutionHub</div>
      </div>
      {crumb && (
        <div className="sd-crumb">
          <span className="sep">/</span>
          {crumb.map((c, i) => (
            <React.Fragment key={i}>
              <span className={i === crumb.length - 1 ? 'now' : ''}>{c}</span>
              {i < crumb.length - 1 && <span className="sep">/</span>}
            </React.Fragment>
          ))}
          {secure && (
            <span style={{display:'inline-flex',alignItems:'center',gap:4,marginLeft:6,color:'var(--ok)',fontFamily:'Sora, sans-serif',fontSize:10.5,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.06em'}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:'var(--ok)'}}></span>
              Secure session
            </span>
          )}
        </div>
      )}
      <div className="sd-top-r">
        <span className="sd-clock"><strong>14:32</strong> · DLA</span>
        <button className="sd-ibtn">{I.moon}</button>
        <button className="sd-ibtn">{I.bell}<span className="dot"></span></button>
        <div className="sd-user">
          <span className="av">CH</span>
          <span className="sd-user-meta">
            <span className="n">Cherif Hassan</span>
            <span className="r">Global Admin</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Shared Sidebar ──────────────────────────────────────────────
function Sidebar({ activePage = 'dashboard', sdmLocked = false, sdmActive = false }) {
  return (
    <aside className="sd-side">
      <div className="sd-nav-l">Platform</div>
      <div className={`sd-nav ${activePage === 'dashboard' ? 'active' : ''}`}>
        <span className="ic">{I.grid}</span><span>Dashboard</span>
      </div>
      <div className={`sd-nav ${activePage === 'requests' ? 'active' : ''}`}>
        <span className="ic">{I.inbox}</span><span>My Requests</span><span className="bdg">3</span>
      </div>

      <div className="sd-nav-l">Solutions</div>
      <div className={`sd-nav ${sdmActive ? 'active' : ''}`}>
        <span className="ic">{I.flask}</span><span>Safety Data</span>
        {sdmLocked && <span className="lock">{I.lock}</span>}
      </div>
      <div className="sd-nav">
        <span className="ic">{I.wallet}</span><span>Cash Advance</span><span className="bdg">5</span>
      </div>
      <div className="sd-nav">
        <span className="ic">{I.recpt}</span><span>Daily Expense</span>
      </div>
      <div className="sd-nav">
        <span className="ic">{I.shield}</span><span>Security Escort</span><span className="bdg">1</span>
      </div>

      <div className="sd-nav-l">Administration</div>
      <div className="sd-nav">
        <span className="ic">{I.check}</span><span>Approvals</span><span className="bdg">11</span>
      </div>
      <div className="sd-nav">
        <span className="ic">{I.user}</span><span>Users</span>
      </div>
    </aside>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 1 — Dashboard with Solutions cards (both states visible)
// ═══════════════════════════════════════════════════════════════════
function Screen_Dashboard({ userHasAccess }) {
  return (
    <div className="sd sd-shell">
      <Topbar crumb={['Dashboard']} />
      <Sidebar activePage="dashboard" sdmLocked={!userHasAccess} />
      <div className="sd-main">
        <div className="sd-page-h">
          <div>
            <div className="sd-page-t">Solutions</div>
            <div className="sd-page-s">
              {userHasAccess
                ? 'Pick a solution to enter. Each one has its own access rights.'
                : 'You have access to 3 of 4 solutions. Click Safety Data to request access.'}
            </div>
          </div>
        </div>

        <div className="sol-grid">
          {/* Safety Data — VARIES by access */}
          {userHasAccess ? (
            <div className="sol-card" style={{borderColor:'var(--red)', boxShadow:'0 0 0 1px var(--red), 0 4px 12px rgba(192,57,43,0.10)'}}>
              <div className="sol-badge live">Live</div>
              <div className="sol-icon red">{I.flask}</div>
              <div>
                <div className="sol-name">Safety Data Management</div>
                <div className="sol-desc">Chemical inventory, SDS, PPE and multi-level HSE approval workflows.</div>
              </div>
              <div className="sol-foot">
                <span>145 chemicals · 12 pending</span>
                <span style={{color:'var(--red)',display:'inline-flex',alignItems:'center',gap:4}}>Enter {I.arrow}</span>
              </div>
            </div>
          ) : (
            <div className="sol-card locked">
              <div className="sol-badge locked">{I.lock}Locked</div>
              <div className="sol-icon">{I.flask}</div>
              <div>
                <div className="sol-name">Safety Data Management</div>
                <div className="sol-desc">Chemical inventory, SDS, PPE and HSE approval workflows. Restricted access.</div>
              </div>
              <div className="sol-foot">
                <span>Separate authentication required</span>
                <span style={{color:'var(--ink-2)',display:'inline-flex',alignItems:'center',gap:4}}>Request {I.arrow}</span>
              </div>
            </div>
          )}

          <div className="sol-card">
            <div className="sol-badge live">Live</div>
            <div className="sol-icon yellow">{I.wallet}</div>
            <div>
              <div className="sol-name">Cash Advance</div>
              <div className="sol-desc">Request and track cash advances with line-manager approval.</div>
            </div>
            <div className="sol-foot">
              <span>12 active · 1 overdue</span>
              <span style={{color:'var(--red)',display:'inline-flex',alignItems:'center',gap:4}}>Enter {I.arrow}</span>
            </div>
          </div>

          <div className="sol-card">
            <div className="sol-badge live">Live</div>
            <div className="sol-icon blue">{I.recpt}</div>
            <div>
              <div className="sol-name">Daily Expense</div>
              <div className="sol-desc">Capture daily expenses by category, attach receipts, route to line manager.</div>
            </div>
            <div className="sol-foot">
              <span>13 entries · May 2026</span>
              <span style={{color:'var(--red)',display:'inline-flex',alignItems:'center',gap:4}}>Enter {I.arrow}</span>
            </div>
          </div>

          <div className="sol-card">
            <div className="sol-badge live">Live</div>
            <div className="sol-icon green">{I.shield}</div>
            <div>
              <div className="sol-name">Security Escort (E85)</div>
              <div className="sol-desc">Plan and track armed-escort convoys between TPC sites.</div>
            </div>
            <div className="sol-foot">
              <span>1 in transit · 3 planned</span>
              <span style={{color:'var(--red)',display:'inline-flex',alignItems:'center',gap:4}}>Enter {I.arrow}</span>
            </div>
          </div>
        </div>

        <div style={{marginTop:24,padding:'14px 18px',background:'var(--cream)',borderRadius:10,border:'1px solid var(--border)',display:'flex',gap:14,alignItems:'center'}}>
          <div style={{width:32,height:32,borderRadius:8,background:'#fff',color:'var(--gold-deep)',display:'grid',placeItems:'center',border:'1px solid var(--border)'}}>{I.info}</div>
          <div style={{fontSize:12.5,color:'var(--ink-2)'}}>
            <strong style={{color:'var(--ink)'}}>Hub login ≠ Solution access.</strong> Each solution has its own access rights. Hub admin can grant Hub access, but solution access is granted by the solution owner.
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 2 — Gate / Auth challenge (user HAS access)
// ═══════════════════════════════════════════════════════════════════
function Screen_Gate() {
  return (
    <div className="sd gate-wrap">
      <div className="gate-top">
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div className="sd-mark"><span>TPC</span></div>
          <div className="sd-brand">SolutionHub</div>
        </div>
        <div className="sd-crumb">
          <span className="sep">/</span>
          <span>Dashboard</span>
          <span className="sep">/</span>
          <span className="now">Safety Data Management</span>
        </div>
        <div className="sd-top-r">
          <span className="sd-clock"><strong>14:32</strong> · DLA</span>
          <button className="sd-ibtn">{I.bell}</button>
          <div className="sd-user">
            <span className="av">CH</span>
            <span className="sd-user-meta">
              <span className="n">Cherif Hassan</span>
              <span className="r">Global Admin</span>
            </span>
          </div>
        </div>
      </div>

      <div className="gate-body">
        <div className="gate-l">
          <div className="gate-eyebrow">
            <span className="ic">{I.shieldCheck}</span>
            <span>Safety Data Management · Restricted</span>
          </div>
          <h1 className="gate-h">
            This solution is <em>protected</em>.
          </h1>
          <p className="gate-d">
            Safety Data Management holds chemical inventories, hazard classifications and approval signatures with regulatory weight. Enter your Safety Data password to unlock it for this session.
          </p>

          <div className="gate-meta">
            <div className="gate-meta-row">
              <span className="gate-meta-l">Signed in to Hub</span>
              <span className="gate-meta-v">Cherif Hassan</span>
            </div>
            <div className="gate-meta-row">
              <span className="gate-meta-l">Solution role</span>
              <span className="gate-meta-v">SDM Admin · Final Approver</span>
            </div>
            <div className="gate-meta-row">
              <span className="gate-meta-l">Session</span>
              <span className="gate-meta-v">Unlocks until logout</span>
            </div>
            <div className="gate-meta-row">
              <span className="gate-meta-l">Last entry</span>
              <span className="gate-meta-v">15 May · 09:14 (today)</span>
            </div>
          </div>
        </div>

        <div className="gate-r">
          <div className="gate-form-eyebrow">Step 2 of 2 · Solution authentication</div>
          <h2 className="gate-form-h">Enter your Safety Data password</h2>
          <div className="gate-form-s">This is different from your Hub login. Provisioned by your SDM administrator.</div>

          <div className="gate-field">
            <div className="gate-field-row">
              <label className="gate-field-l">Safety Data password</label>
              <a href="#">Forgot password?</a>
            </div>
            <input type="password" defaultValue="••••••••••••" />
            <span className="gate-helper">{I.info}<span>Min 12 characters · case-sensitive · rotates every 90 days</span></span>
          </div>

          <div className="gate-cta">
            <button className="sd-btn primary">{I.unlock}<span>Unlock Safety Data</span></button>
            <button className="sd-btn ghost">Cancel</button>
          </div>

          <div className="gate-info">
            <div className="gate-info-ic">{I.shield}</div>
            <div className="gate-info-text">
              <strong>This entry will be logged.</strong> Every unlock, sign-off and chemical edit is recorded for HSE audit. You can review your own history inside Safety Data → Account → Access log.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 3 — Inside SDM (post-auth, success)
// ═══════════════════════════════════════════════════════════════════
function Screen_InsideSDM() {
  return (
    <div className="sd sd-shell">
      <Topbar crumb={['Dashboard','Safety Data Management']} secure />
      <Sidebar activePage="" sdmActive sdmLocked={false} />
      <div className="sd-main" style={{padding:0,display:'flex',flexDirection:'column'}}>
        <div className="sd-banner-secure">
          {I.shieldCheck}
          <span>Welcome back, Cherif. Safety Data is unlocked for this session.</span>
          <span className="right">Session opened 14:32:14 · Auto-locks on logout</span>
        </div>

        <div style={{padding:'24px 28px',overflow:'hidden'}}>
          <div className="sd-page-h">
            <div>
              <div className="sd-page-t">Safety Data Management</div>
              <div className="sd-page-s">Chemical inventory, SDS, PPE and HSE approval workflows · 7 modules</div>
            </div>
            <div style={{display:'flex',gap:8}}>
              <button className="sd-btn">Export</button>
              <button className="sd-btn primary">{I.send}<span>New request</span></button>
            </div>
          </div>

          <div className="sdm-stats">
            <div className="sdm-stat">
              <div className="sdm-stat-l">Active chemicals</div>
              <div className="sdm-stat-v">145</div>
              <div className="sdm-stat-d">+6 this month</div>
            </div>
            <div className="sdm-stat">
              <div className="sdm-stat-l">Pending requests</div>
              <div className="sdm-stat-v" style={{color:'var(--red)'}}>12</div>
              <div className="sdm-stat-d" style={{color:'var(--warn)'}}>+3 today</div>
            </div>
            <div className="sdm-stat">
              <div className="sdm-stat-l">SLA · 30d</div>
              <div className="sdm-stat-v">92<span style={{fontSize:14,color:'var(--muted)'}}>%</span></div>
              <div className="sdm-stat-d">+4 pt</div>
            </div>
            <div className="sdm-stat">
              <div className="sdm-stat-l">Authorized users</div>
              <div className="sdm-stat-v">23</div>
              <div className="sdm-stat-d" style={{color:'var(--muted)'}}>across 6 sites</div>
            </div>
          </div>

          <div className="sdm-card">
            <div className="sdm-card-h">
              <div className="sdm-card-t">Your queue · awaiting your decision</div>
              <div style={{fontFamily:'IBM Plex Mono, monospace',fontSize:11,color:'var(--muted)'}}>4 items</div>
            </div>
            <div className="sdm-q-row">
              <span className="pp dng"></span>
              <span className="id">#CHM-154</span>
              <span className="ttl">Methanol — IH hazard classification needed</span>
              <span className="site">PS3-BEL</span>
              <span className="age dng">4d overdue</span>
            </div>
            <div className="sdm-q-row">
              <span className="pp warn"></span>
              <span className="id">#CHM-156</span>
              <span className="ttl">Acetone — SHE review pending</span>
              <span className="site">DOUALA</span>
              <span className="age warn">2d 4h</span>
            </div>
            <div className="sdm-q-row">
              <span className="pp"></span>
              <span className="id">#CHM-152</span>
              <span className="ttl">Hydraulic Fluid ISO 46 — EMP environmental review</span>
              <span className="site">PS2-DOM</span>
              <span className="age">5d left</span>
            </div>
            <div className="sdm-q-row">
              <span className="pp"></span>
              <span className="id">#CHM-155</span>
              <span className="ttl">Diesel — final sign-off ready</span>
              <span className="site">PS2-DOM</span>
              <span className="age">Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 4 — Access Denied (user clicked locked card)
// ═══════════════════════════════════════════════════════════════════
function Screen_Denied() {
  return (
    <div className="sd gate-wrap">
      <div className="gate-top">
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div className="sd-mark"><span>TPC</span></div>
          <div className="sd-brand">SolutionHub</div>
        </div>
        <div className="sd-crumb">
          <span className="sep">/</span>
          <span>Dashboard</span>
          <span className="sep">/</span>
          <span className="now">Safety Data Management</span>
        </div>
        <div className="sd-top-r">
          <span className="sd-clock"><strong>14:32</strong> · DLA</span>
          <button className="sd-ibtn">{I.bell}</button>
          <div className="sd-user">
            <span className="av" style={{background:'#1F6FCC'}}>AM</span>
            <span className="sd-user-meta">
              <span className="n">Ahmed Mahamat</span>
              <span className="r">Field User</span>
            </span>
          </div>
        </div>
      </div>

      <div className="gate-body">
        <div className="gate-l">
          <span className="deny-badge">{I.lock}Access required</span>
          <h1 className="gate-h">
            You don't have access to <em>Safety Data Management</em>.
          </h1>
          <p className="gate-d">
            Safety Data Management has its own authentication, separate from your Hub login. You'll need to request access from the SDM administrator before you can enter.
          </p>

          <div className="gate-meta">
            <div className="gate-meta-row">
              <span className="gate-meta-l">Signed in to Hub</span>
              <span className="gate-meta-v">Ahmed Mahamat</span>
            </div>
            <div className="gate-meta-row">
              <span className="gate-meta-l">Your Hub role</span>
              <span className="gate-meta-v">Field User · PS2-Dompta</span>
            </div>
            <div className="gate-meta-row">
              <span className="gate-meta-l">Solution status</span>
              <span className="gate-meta-v" style={{color:'var(--red)'}}>● No access</span>
            </div>
            <div className="gate-meta-row">
              <span className="gate-meta-l">Typical response</span>
              <span className="gate-meta-v">1–2 business days</span>
            </div>
          </div>
        </div>

        <div className="gate-r denied">
          <div className="gate-form-eyebrow">Why am I seeing this</div>
          <h2 className="gate-form-h">Restricted solution</h2>
          <div className="gate-form-s">Hub login grants you the dashboard. Safety Data has a second layer of access for compliance reasons.</div>

          <div className="deny-card">
            <div className="deny-card-h">To get in, here's what happens</div>
            <div className="deny-list">
              <div className="deny-list-row"><span className="dot" style={{background:'var(--red)'}}></span><span>You submit a quick request below (role + reason).</span></div>
              <div className="deny-list-row"><span className="dot"></span><span>Your line manager is notified and approves.</span></div>
              <div className="deny-list-row"><span className="dot"></span><span>The SDM administrator provisions your password.</span></div>
              <div className="deny-list-row"><span className="dot"></span><span>You'll receive an email with your Safety Data login.</span></div>
            </div>

            <div className="deny-contact">
              <span className="av">MD</span>
              <div className="deny-contact-meta">
                <div className="n">Mariam Deby</div>
                <div className="r">SDM Administrator · Douala HQ</div>
              </div>
              <button className="sd-btn" style={{marginLeft:'auto',padding:'6px 12px',fontSize:11.5}}>{I.mail}<span>Contact</span></button>
            </div>
          </div>

          <div className="gate-cta" style={{marginTop:20}}>
            <button className="sd-btn primary" style={{padding:'12px 22px'}}>{I.send}<span>Request access</span></button>
            <button className="sd-btn ghost" style={{padding:'12px 18px'}}>Back to Hub</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 5 — Request access form
// ═══════════════════════════════════════════════════════════════════
function Screen_RequestForm() {
  const [picked, setPicked] = useState('viewer');
  const roles = [
    { id: 'viewer', name: 'Viewer', sub: 'Read-only · all sites' },
    { id: 'submitter', name: 'Submitter', sub: 'Create requests · my site' },
    { id: 'she', name: 'SHE Reviewer', sub: 'First-line HSE review' },
    { id: 'ih', name: 'IH Reviewer', sub: 'Industrial hygiene' },
    { id: 'emp', name: 'EMP Reviewer', sub: 'Environmental' },
    { id: 'oi', name: 'OI Safety', sub: 'Operations safety' },
  ];
  return (
    <div className="sd gate-wrap">
      <div className="gate-top">
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div className="sd-mark"><span>TPC</span></div>
          <div className="sd-brand">SolutionHub</div>
        </div>
        <div className="sd-crumb">
          <span className="sep">/</span><span>Dashboard</span>
          <span className="sep">/</span><span>Safety Data</span>
          <span className="sep">/</span><span className="now">Request access</span>
        </div>
        <div className="sd-top-r">
          <span className="sd-clock"><strong>14:32</strong> · DLA</span>
          <div className="sd-user">
            <span className="av" style={{background:'#1F6FCC'}}>AM</span>
            <span className="sd-user-meta">
              <span className="n">Ahmed Mahamat</span>
              <span className="r">Field User</span>
            </span>
          </div>
        </div>
      </div>

      <div className="gate-body">
        <div className="gate-l">
          <div className="gate-eyebrow">
            <span className="ic">{I.send}</span>
            <span>Request · Safety Data Management</span>
          </div>
          <h1 className="gate-h">
            Tell us <em>who you are</em> and what you need to do.
          </h1>
          <p className="gate-d">
            Your line manager and the SDM administrator will receive this request automatically. You'll be emailed once your password is provisioned — typically within 1–2 business days.
          </p>

          <div className="gate-meta">
            <div className="gate-meta-row">
              <span className="gate-meta-l">Requesting on behalf of</span>
              <span className="gate-meta-v">Ahmed Mahamat · PS2-Dompta</span>
            </div>
            <div className="gate-meta-row">
              <span className="gate-meta-l">Line manager</span>
              <span className="gate-meta-v">Fatima Moussa</span>
            </div>
            <div className="gate-meta-row">
              <span className="gate-meta-l">SDM admin</span>
              <span className="gate-meta-v">Mariam Deby</span>
            </div>
            <div className="gate-meta-row">
              <span className="gate-meta-l">Will be logged</span>
              <span className="gate-meta-v">Yes · audit trail</span>
            </div>
          </div>
        </div>

        <div className="gate-r req-form">
          <div className="gate-form-eyebrow">Step 1 of 1 · Access request</div>
          <h2 className="gate-form-h">Pick the role you need</h2>
          <div className="gate-form-s">SDM admin will adjust if needed.</div>

          <div className="gate-field">
            <label className="gate-field-l">Requested role</label>
            <div className="role-grid">
              {roles.map(r => (
                <div key={r.id}
                     className={`role-pick ${picked === r.id ? 'checked' : ''}`}
                     onClick={() => setPicked(r.id)}>
                  <span className="rd"></span>
                  <span style={{display:'flex',flexDirection:'column',gap:2}}>
                    <span>{r.name}</span>
                    <span className="sub">{r.sub}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="gate-field">
            <label className="gate-field-l">Why do you need access?</label>
            <textarea defaultValue="I need to view chemical inventory and SDS sheets for the new diesel batch arriving at PS2-Dompta next week. Will only need read access to start."/>
          </div>

          <div className="gate-cta">
            <button className="sd-btn primary" style={{padding:'12px 22px'}}>{I.send}<span>Send request</span></button>
            <button className="sd-btn ghost" style={{padding:'12px 18px'}}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 6 — Request sent · status timeline
// ═══════════════════════════════════════════════════════════════════
function Screen_Sent() {
  return (
    <div className="sd gate-wrap">
      <div className="gate-top">
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div className="sd-mark"><span>TPC</span></div>
          <div className="sd-brand">SolutionHub</div>
        </div>
        <div className="sd-crumb">
          <span className="sep">/</span><span>Dashboard</span>
          <span className="sep">/</span><span className="now">Access requested</span>
        </div>
        <div className="sd-top-r">
          <span className="sd-clock"><strong>14:34</strong> · DLA</span>
          <div className="sd-user">
            <span className="av" style={{background:'#1F6FCC'}}>AM</span>
            <span className="sd-user-meta">
              <span className="n">Ahmed Mahamat</span>
              <span className="r">Field User</span>
            </span>
          </div>
        </div>
      </div>

      <div style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 80px',height:'100%'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:80,alignItems:'center',maxWidth:1080}}>
          <div>
            <div className="sent-medal">{I.check}</div>
            <h1 className="sent-h">Your request is on its way.</h1>
            <p className="sent-d">
              Fatima Moussa (your line manager) and Mariam Deby (SDM admin) have both been notified. You'll get an email when your Safety Data password is ready.
            </p>
            <div style={{display:'flex',gap:10}}>
              <button className="sd-btn primary">Back to Hub</button>
              <button className="sd-btn">View request status</button>
            </div>
          </div>

          <div className="sent-timeline">
            <div style={{fontFamily:'Sora, sans-serif',fontSize:12,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--muted)',fontWeight:700,marginBottom:12}}>Request · SDM-AR-0042</div>
            <div className="sent-step done">
              <div className="pip">{I.check}</div>
              <div>
                <div className="ttl">Submitted</div>
                <div className="sub">You · Viewer role · PS2-Dompta</div>
              </div>
              <span className="time">14:32</span>
            </div>
            <div className="sent-step active">
              <div className="pip">{I.clock}</div>
              <div>
                <div className="ttl">Line-manager approval</div>
                <div className="sub">Fatima Moussa · pending</div>
              </div>
              <span className="time">—</span>
            </div>
            <div className="sent-step">
              <div className="pip">{I.user}</div>
              <div>
                <div className="ttl">SDM admin provisioning</div>
                <div className="sub">Mariam Deby · password setup</div>
              </div>
              <span className="time">—</span>
            </div>
            <div className="sent-step">
              <div className="pip">{I.mail}</div>
              <div>
                <div className="ttl">Email with credentials</div>
                <div className="sub">Sent to a.mahamat@tpc.td</div>
              </div>
              <span className="time">—</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCREEN 7 — Access history (user's own log, inside SDM)
// ═══════════════════════════════════════════════════════════════════
function Screen_History() {
  return (
    <div className="sd sd-shell">
      <Topbar crumb={['Safety Data','Account','Access log']} secure />
      <Sidebar activePage="" sdmActive />
      <div className="sd-main" style={{padding:0,display:'flex',flexDirection:'column'}}>
        <div className="sd-banner-secure">
          {I.shieldCheck}
          <span>Secure session · Cherif Hassan</span>
          <span className="right">Session opened 09:14 · 5h 18m ago</span>
        </div>

        <div style={{padding:'24px 28px',overflow:'hidden'}}>
          <div className="sd-page-h">
            <div>
              <div className="sd-page-t">My access log</div>
              <div className="sd-page-s">Every time you unlocked, exited or failed to enter Safety Data — visible only to you and the SDM admin.</div>
            </div>
            <div style={{display:'flex',gap:8}}>
              <button className="sd-btn">{I.history}<span>Last 30 days</span></button>
              <button className="sd-btn">Export CSV</button>
            </div>
          </div>

          <div className="sdm-stats" style={{marginBottom:20,gridTemplateColumns:'repeat(4, 1fr)'}}>
            <div className="sdm-stat">
              <div className="sdm-stat-l">Sessions · 30d</div>
              <div className="sdm-stat-v">47</div>
              <div className="sdm-stat-d" style={{color:'var(--muted)'}}>Avg 1.6 / day</div>
            </div>
            <div className="sdm-stat">
              <div className="sdm-stat-l">Avg session</div>
              <div className="sdm-stat-v">2h 14m</div>
              <div className="sdm-stat-d" style={{color:'var(--muted)'}}>Auto-locked on logout</div>
            </div>
            <div className="sdm-stat">
              <div className="sdm-stat-l">Failed attempts</div>
              <div className="sdm-stat-v" style={{color:'var(--ok)'}}>0</div>
              <div className="sdm-stat-d">Clean record</div>
            </div>
            <div className="sdm-stat">
              <div className="sdm-stat-l">Password rotates</div>
              <div className="sdm-stat-v">62<span style={{fontSize:14,color:'var(--muted)'}}>d</span></div>
              <div className="sdm-stat-d" style={{color:'var(--warn)'}}>~28 days remaining</div>
            </div>
          </div>

          <div className="hist-h">
            <span>Date</span><span>Time</span><span>Event</span><span>Source</span><span>Status</span>
          </div>
          {[
            { d: '15 May', t: '14:32:14', what: 'Unlocked Safety Data', sub: 'Password challenge passed', src: '197.244.18.42 · Web', tag: 'in' },
            { d: '15 May', t: '13:08:02', what: 'Session ended', sub: 'User logged out of Hub', src: 'Web', tag: 'out' },
            { d: '15 May', t: '09:14:55', what: 'Unlocked Safety Data', sub: 'Password challenge passed', src: '197.244.18.42 · Web', tag: 'in' },
            { d: '14 May', t: '18:42:11', what: 'Session ended', sub: 'Auto-logout · 30 min idle', src: 'Web', tag: 'out' },
            { d: '14 May', t: '08:51:30', what: 'Unlocked Safety Data', sub: 'Password challenge passed', src: '197.244.18.42 · Web', tag: 'in' },
            { d: '13 May', t: '11:17:08', what: 'Failed unlock', sub: 'Wrong password · 1 of 3', src: '41.86.10.7 · Mobile', tag: 'fail' },
            { d: '13 May', t: '11:17:42', what: 'Unlocked Safety Data', sub: 'Password challenge passed', src: '41.86.10.7 · Mobile', tag: 'in' },
            { d: '12 May', t: '17:08:21', what: 'Session ended', sub: 'User logged out of Hub', src: 'Web', tag: 'out' },
          ].map((r, i) => (
            <div key={i} className="hist-row">
              <span className="date">{r.d}</span>
              <span className="time">{r.t}</span>
              <span className="what">{r.what}<span className="sub">{r.sub}</span></span>
              <span className="src">{r.src}</span>
              <span><span className={`tag ${r.tag}`}>{r.tag === 'in' ? 'Unlocked' : r.tag === 'out' ? 'Closed' : 'Failed'}</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Notes
// ═══════════════════════════════════════════════════════════════════
function Notes() {
  return (
    <div className="design-notes">
      <h1>Safety Data — a <em>solution inside the Hub</em>, with its own door.</h1>
      <p className="lead">
        Hub login gets you the dashboard. Safety Data has a second lock. The flow below tells two stories side-by-side: <strong>Cherif (has access)</strong> walks straight through; <strong>Ahmed (no access)</strong> hits a wall, requests access, and waits for provisioning.
      </p>

      <h2>The contract</h2>
      <div className="spec-grid">
        <div>Entry point</div><div>The "Safety Data" card on the Hub dashboard (and the sidebar item).</div>
        <div>No-access state</div><div>Card stays visible but is shown as locked. Clicking it leads to an access-denied page that explains why and offers "Request access".</div>
        <div>Authentication</div><div>A password, separate from Hub login — provisioned by the SDM admin (no self-setup).</div>
        <div>Session</div><div>Once unlocked, stays open until the user logs out of the Hub. No idle timeout, no per-action re-auth.</div>
        <div>Roles inside</div><div>Viewer · Submitter · SHE Reviewer · IH Reviewer · EMP Reviewer · OI Safety · Final Approver · SDM Admin.</div>
        <div>Access request</div><div>Quick form → automatic notification to user's line manager + SDM admin. Typical SLA 1–2 business days.</div>
        <div>Audit visibility</div><div>Every unlock/exit/failed attempt is logged. The user can see their own log inside Safety Data → Account → Access log.</div>
      </div>

      <h2>What you're looking at</h2>
      <ul>
        <li><strong>01 · Dashboard, two states.</strong> Same card, two outcomes. The locked variant uses a dashed border, muted icon and "Request" CTA — no fake-out, just honest.</li>
        <li><strong>02 · Gate (Cherif, has access).</strong> Editorial split-screen: left tells the user where they are and what's happening; right is the password challenge. Reassures them this is a deliberate second auth, not a re-login.</li>
        <li><strong>03 · Inside SDM.</strong> A green "Secure session" banner under the topbar makes it unambiguous that they're past the gate. The sidebar marks Safety Data as the active solution.</li>
        <li><strong>04 · Denied (Ahmed, no access).</strong> Same layout as the Gate so it feels like the natural other-side of the door, not an error page. Explains the process, names the admin, offers the CTA.</li>
        <li><strong>05 · Request form.</strong> Pick a role (one click), say why, send. Six roles surfaced; SDM Admin and Final Approver are hidden because they're not self-requestable.</li>
        <li><strong>06 · Request sent.</strong> Confirmation + a 4-step timeline showing exactly where the request sits. Sets expectations — no mystery wait.</li>
        <li><strong>07 · Access log.</strong> The user's own audit trail. Builds trust — they can see every entry/exit/failed attempt, with IP and source.</li>
      </ul>

      <h2>What I haven't built yet (next, if you agree)</h2>
      <ul>
        <li><strong>Admin's view</strong> — Mariam Deby's screen when a request lands: approve / adjust role / decline, plus a roster of who has SDM access across sites.</li>
        <li><strong>Forgot-password flow</strong> for SDM password (separate from Hub).</li>
        <li><strong>Email templates</strong> — the message Cherif and Ahmed receive at each step.</li>
        <li><strong>The same pattern for Cash, Expense, Escort</strong> — once you confirm this contract.</li>
      </ul>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// App
// ═══════════════════════════════════════════════════════════════════
function App() {
  return (
    <DesignCanvas>
      <DCSection id="brief" title="The contract">
        <DCArtboard id="notes" label="Why · how · what's next" width={1200} height={920}>
          <Notes/>
        </DCArtboard>
      </DCSection>

      <DCSection id="entry" title="01 · Entry — the Solutions card, two states">
        <DCArtboard id="dash-access" label="With access · Cherif" width={1280} height={800}>
          <Screen_Dashboard userHasAccess />
        </DCArtboard>
        <DCArtboard id="dash-locked" label="No access · Ahmed" width={1280} height={800}>
          <Screen_Dashboard userHasAccess={false} />
        </DCArtboard>
      </DCSection>

      <DCSection id="path-a" title="02 · Path A — with access (Cherif)">
        <DCArtboard id="gate" label="The gate — password challenge" width={1280} height={800}>
          <Screen_Gate/>
        </DCArtboard>
        <DCArtboard id="inside" label="Unlocked — inside SDM" width={1280} height={800}>
          <Screen_InsideSDM/>
        </DCArtboard>
      </DCSection>

      <DCSection id="path-b" title="03 · Path B — no access (Ahmed)">
        <DCArtboard id="denied" label="Access denied" width={1280} height={800}>
          <Screen_Denied/>
        </DCArtboard>
        <DCArtboard id="req-form" label="Request access form" width={1280} height={800}>
          <Screen_RequestForm/>
        </DCArtboard>
        <DCArtboard id="sent" label="Request sent — timeline" width={1280} height={800}>
          <Screen_Sent/>
        </DCArtboard>
      </DCSection>

      <DCSection id="audit" title="04 · Audit — your own access log">
        <DCArtboard id="history" label="Account → Access log" width={1280} height={800}>
          <Screen_History/>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
