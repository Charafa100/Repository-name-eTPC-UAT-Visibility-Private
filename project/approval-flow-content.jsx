/* global React, ReactDOM, DesignCanvas, DCSection, DCArtboard */

// ─── Icons ───────────────────────────────────────────────
const I = {
  activity: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  flask:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6"/><path d="M10 3v6L4 20a2 2 0 002 3h12a2 2 0 002-3l-6-11V3"/><path d="M8 14h8"/></svg>,
  wallet:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 010-4h12v4"/><rect x="2" y="6" width="20" height="14" rx="2"/><circle cx="16" cy="13" r="1.5"/></svg>,
  receipt:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2h12l4 4v15l-3-2-3 2-3-2-3 2-3-2-1 2z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>,
  shield:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l9 4v6c0 5-4 9-9 10-5-1-9-5-9-10V6l9-4z"/><path d="M9 12l2 2 4-4"/></svg>,
  filter:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
};

// Solution palette
const SOL = {
  safety:  { name: 'Safety Data',     color: '#C0392B', sw: '#C0392B', cls: 'red'    },
  cash:    { name: 'Cash Advance',    color: '#8A6500', sw: '#F0C040', cls: 'yellow' },
  expense: { name: 'Daily Expense',   color: '#1F6FCC', sw: '#1F6FCC', cls: 'blue'   },
  escort:  { name: 'Security Escort', color: '#1F7C3B', sw: '#1F7C3B', cls: 'green'  },
};

// Generic stage counts — across all solutions
// Drafted · Pending review · Awaiting approval · Final
const PHASES = [
  { id:'drafted',  name:'Drafted',           total: 8,  byS: { safety: 4, cash: 2, expense: 1, escort: 1 } },
  { id:'review',   name:'Pending review',    total: 15, byS: { safety: 9, cash: 3, expense: 2, escort: 1 }, btl: true },
  { id:'approval', name:'Awaiting approval', total: 8,  byS: { safety: 4, cash: 2, expense: 1, escort: 1 } },
  { id:'final',    name:'Final / done',      total: 3,  byS: { safety: 3, cash: 0, expense: 0, escort: 0 } },
];

// Per-solution real pipelines
const LANES = [
  {
    key: 'safety',
    stages: [
      { n: 'Submit', v: 4 },
      { n: 'Physician', v: 6 },
      { n: 'IH', v: 9, btl: true },
      { n: 'OI', v: 7 },
      { n: 'EMP', v: 5 },
      { n: 'Final', v: 3 },
    ],
    total: 34,
    meta: 'Bottleneck · IH Review',
  },
  {
    key: 'cash',
    stages: [
      { n: 'Submit', v: 2 },
      { n: 'Line mgr', v: 4 },
      { n: 'Budget', v: 5, btl: true },
      { n: 'Disburse', v: 1 },
    ],
    total: 12,
    meta: 'Bottleneck · Budget Control',
  },
  {
    key: 'expense',
    stages: [
      { n: 'Submit', v: 1 },
      { n: 'Line mgr', v: 2 },
      { n: 'Refund', v: 1 },
    ],
    total: 4,
    meta: 'Healthy',
  },
  {
    key: 'escort',
    stages: [
      { n: 'Submit', v: 1 },
      { n: 'Risk', v: 1, btl: true },
      { n: 'Ops', v: 1 },
      { n: 'Dispatch', v: 1 },
    ],
    total: 4,
    meta: 'Bottleneck · Risk Review',
  },
];

// ═══════════════════════════════════════════════════════════
// CURRENT — what's on the dashboard today (the problem)
// ═══════════════════════════════════════════════════════════
function CurrentState() {
  return (
    <div className="af af-card" style={{width: 1100}}>
      <div className="af-card-h">
        <div className="af-card-h-t">
          <span className="ic">{I.activity}</span>
          Approval flow · 34 requests in motion
        </div>
        <div className="af-card-h-m">
          <span>Bottleneck</span>
          <span className="btl">IH Review</span>
          <span className="ic" style={{color:'var(--muted)'}}>{I.filter}</span>
        </div>
      </div>
      <div className="opA" style={{padding:'24px 22px'}}>
        <div className="opA-eyebrow" style={{color:'#C0392B'}}>⚠ Problem · these stages are Safety-Data-specific. They mean nothing for a Cash, Expense or Escort request.</div>
        <div className="opA-stages" style={{gridTemplateColumns:'repeat(6, 1fr)'}}>
          {[
            { n:'Submission', v:4 },
            { n:'Physician',  v:6 },
            { n:'IH Review',  v:9, btl:true },
            { n:'OI Safety',  v:7 },
            { n:'EMP Review', v:5 },
            { n:'Final',      v:3 },
          ].map((s,i)=>(
            <div key={i} className={`opA-stage ${s.btl ? 'btl' : ''}`}>
              <div className="opA-stage-l">
                <span className="opA-stage-name">{s.n}</span>
                {s.btl && <span className="opA-stage-tag">BTLNCK</span>}
              </div>
              <div className="opA-stage-v">{s.v}</div>
              <div className="opA-stage-bar"><span style={{width:'100%',background:'var(--red)'}}></span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// OPTION A — Generic 4 stages, aggregated
// ═══════════════════════════════════════════════════════════
function OptionA() {
  return (
    <div className="af af-card" style={{width: 1100}}>
      <div className="af-card-h">
        <div className="af-card-h-t">
          <span className="ic">{I.activity}</span>
          Approval flow · all solutions · 34 requests in motion
        </div>
        <div className="af-card-h-m">
          <span>Bottleneck</span>
          <span className="btl">Pending review</span>
          <span className="ic" style={{color:'var(--muted)'}}>{I.filter}</span>
        </div>
      </div>
      <div className="opA">
        <div className="opA-eyebrow">Universal stages · counts aggregate across Safety Data, Cash, Expense, Escort</div>
        <div className="opA-stages">
          {PHASES.map((p, i) => {
            const total = p.total;
            const widths = Object.entries(p.byS).map(([k, v]) => ({
              cls: SOL[k].cls, color: SOL[k].sw, name: SOL[k].name, pct: total ? (v/total)*100 : 0, v,
            })).filter(x => x.v > 0);
            return (
              <div key={i} className={`opA-stage ${p.btl ? 'btl' : ''}`}>
                <div className="opA-stage-l">
                  <span className="opA-stage-name">{p.name}</span>
                  {p.btl && <span className="opA-stage-tag">BTLNCK</span>}
                </div>
                <div className="opA-stage-v">{p.total}</div>
                <div className="opA-stage-bar">
                  {widths.map((w, j) => (
                    <span key={j} style={{ width: `${w.pct}%`, background: w.color }} title={`${w.name}: ${w.v}`}></span>
                  ))}
                </div>
                <div className="opA-stage-leg">
                  {widths.map((w, j) => (
                    <span key={j}><span className="ldot" style={{background: w.color}}></span>{w.v}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="opA-eyebrow" style={{marginTop:18, marginBottom:6}}>By solution · totals in motion</div>
        {Object.entries(SOL).map(([k, s]) => {
          const total = PHASES.reduce((sum, p) => sum + (p.byS[k] || 0), 0);
          const segs = PHASES.map(p => ({ pct: total ? ((p.byS[k]||0)/total)*100 : 0, btl: p.btl }));
          return (
            <div key={k} className="opA-break">
              <div className="opA-break-name">
                <span className="sw" style={{background: s.sw}}></span>
                {s.name}
              </div>
              <div className="opA-break-stack">
                {segs.map((seg, j) => (
                  <span key={j} style={{ width: `${seg.pct}%`, background: seg.btl ? 'var(--gold)' : s.sw, opacity: seg.btl ? 1 : 0.7 }}></span>
                ))}
              </div>
              <div className="opA-break-total">{total}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// OPTION B — Per-solution swimlanes
// ═══════════════════════════════════════════════════════════
function OptionB() {
  return (
    <div className="af af-card" style={{width: 1100}}>
      <div className="af-card-h">
        <div className="af-card-h-t">
          <span className="ic">{I.activity}</span>
          Approval flow · per solution · 54 requests in motion
        </div>
        <div className="af-card-h-m">
          <span>2 bottlenecks</span>
          <span className="btl">IH · Budget</span>
          <span className="ic" style={{color:'var(--muted)'}}>{I.filter}</span>
        </div>
      </div>
      <div className="opB">
        {LANES.map((lane, i) => {
          const s = SOL[lane.key];
          const ic = lane.key === 'safety' ? I.flask : lane.key === 'cash' ? I.wallet : lane.key === 'expense' ? I.receipt : I.shield;
          return (
            <div key={i} className="opB-row">
              <div className="opB-row-sol">
                <div className={`opB-row-icon ${s.cls}`}>{ic}</div>
                <div>
                  <div className="opB-row-name">{s.name}</div>
                  <div className="opB-row-meta">{lane.meta}</div>
                </div>
              </div>
              <div className="opB-stages" style={{gridTemplateColumns: `repeat(${lane.stages.length}, 1fr)`}}>
                {lane.stages.map((st, j) => (
                  <div key={j} className={`opB-stage ${st.btl ? 'btl' : ''}`}>
                    <span className="opB-stage-n">{st.n}</span>
                    <span className="opB-stage-v">{st.v}</span>
                  </div>
                ))}
              </div>
              <div className="opB-row-total">
                <div className="opB-row-total-v">{lane.total}</div>
                <div className="opB-row-total-l">In motion</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// OPTION C — Hybrid · aggregate top, swimlane underneath
// ═══════════════════════════════════════════════════════════
function OptionC() {
  return (
    <div className="af af-card" style={{width: 1100}}>
      <div className="af-card-h">
        <div className="af-card-h-t">
          <span className="ic">{I.activity}</span>
          Approval flow · 54 requests · 4 solutions
        </div>
        <div className="af-card-h-m">
          <div className="opC-toggle">
            <button className="on">Overview</button>
            <button>By stage</button>
            <button>By solution</button>
          </div>
        </div>
      </div>

      <div className="opC-summary">
        <div className="opC-sum-cell lead">
          <div className="opC-sum-l">Cross-solution health</div>
          <div className="opC-sum-v">54 <em>in motion</em></div>
          <div className="opC-sum-d">2 bottlenecks · 3 SLA breaches · cycle 3.2 d</div>
        </div>
        <div className="opC-sum-cell">
          <div className="opC-sum-l">Drafted</div>
          <div className="opC-sum-v">8</div>
          <div className="opC-sum-d">+2 today</div>
        </div>
        <div className="opC-sum-cell" style={{background:'rgba(240,192,64,0.08)'}}>
          <div className="opC-sum-l" style={{color:'var(--gold-deep)'}}>Pending review · BTLNCK</div>
          <div className="opC-sum-v" style={{color:'var(--gold-deep)'}}>15</div>
          <div className="opC-sum-d">9 Safety · 3 Cash · 2 Exp · 1 Esc</div>
        </div>
        <div className="opC-sum-cell">
          <div className="opC-sum-l">Awaiting approval</div>
          <div className="opC-sum-v">8</div>
          <div className="opC-sum-d">3 ready to sign</div>
        </div>
      </div>

      <div className="opC-lanes">
        {LANES.map((lane, i) => {
          const s = SOL[lane.key];
          const ic = lane.key === 'safety' ? I.flask : lane.key === 'cash' ? I.wallet : lane.key === 'expense' ? I.receipt : I.shield;
          return (
            <div key={i} className="opB-row">
              <div className="opB-row-sol">
                <div className={`opB-row-icon ${s.cls}`}>{ic}</div>
                <div>
                  <div className="opB-row-name">{s.name}</div>
                  <div className="opB-row-meta">{lane.meta}</div>
                </div>
              </div>
              <div className="opB-stages" style={{gridTemplateColumns: `repeat(${lane.stages.length}, 1fr)`}}>
                {lane.stages.map((st, j) => (
                  <div key={j} className={`opB-stage ${st.btl ? 'btl' : ''}`}>
                    <span className="opB-stage-n">{st.n}</span>
                    <span className="opB-stage-v">{st.v}</span>
                  </div>
                ))}
              </div>
              <div className="opB-row-total">
                <div className="opB-row-total-v">{lane.total}</div>
                <div className="opB-row-total-l">In motion</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Notes
// ═══════════════════════════════════════════════════════════
function Notes() {
  return (
    <div className="design-notes">
      <h1>The Hub's approval flow can't be <em>Safety-Data-only</em>.</h1>
      <p className="lead">
        You're right: "Submission · Physician · IH · OI · EMP · Final" are HSE stages. They have no meaning for a cash advance or a daily expense. The Hub dashboard needs to show <strong>every solution's pipeline</strong> — and Safety Data is just one of them, still connected, still counted. Here are three ways to fix it. Same data: 54 requests across 4 solutions, 2 bottlenecks.
      </p>

      <div className="grid3">
        <div className="col">
          <div className="num">Option A</div>
          <div className="h">Universal 4-stage view</div>
          <div className="d">Every solution's pipeline collapses to 4 phases: <strong>Drafted · Pending review · Awaiting approval · Final.</strong> Each phase shows total + a stacked bar telling you which solution contributes. Best when the user mostly wants a quick health check and doesn't care about each solution's internal stages.</div>
        </div>
        <div className="col">
          <div className="num">Option B</div>
          <div className="h">One swimlane per solution</div>
          <div className="d">One row for each of the 4 solutions, each showing its <strong>real stages</strong> (Safety = 6 stages, Cash = 4, etc.) with counts + bottleneck highlight. More honest — you see Cash's "Budget" bottleneck differently from Safety's "IH" bottleneck. Denser, but maps to how teams actually work.</div>
        </div>
        <div className="col">
          <div className="num">Option C</div>
          <div className="h">Hybrid · aggregate + lanes</div>
          <div className="d">A 4-cell summary header (universal stages, with the bottleneck highlighted) followed by per-solution swimlanes below. Has a view toggle (Overview / By stage / By solution) so the same card serves both the manager glance and the operator drill-down. <strong>My recommendation.</strong></div>
        </div>
      </div>

      <h2>On your second point — keeping Safety Data connected</h2>
      <p>Every request, no matter which solution, is still a <strong>request</strong>. Safety Data requests show up:</p>
      <p style={{paddingLeft:18}}>
        <strong>• My Requests inbox</strong> — every request you submitted, across every solution.<br/>
        <strong>• Approvals queue</strong> — every request waiting on your decision, across every solution.<br/>
        <strong>• This approval flow card</strong> — counted in totals + bottlenecks.<br/>
        <strong>• Safety Data dashboard</strong> — the 6-stage detail (IH / OI / EMP / Final) lives <em>there</em>, where it belongs.
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Canvas
// ═══════════════════════════════════════════════════════════
function App() {
  return (
    <DesignCanvas>
      <DCSection id="brief" title="The fix">
        <DCArtboard id="notes" label="Why the current flow is wrong + 3 fixes" width={1200} height={620}>
          <Notes/>
        </DCArtboard>
      </DCSection>

      <DCSection id="now" title="What's on the dashboard today (the problem)">
        <DCArtboard id="current" label="Current · Safety-Data-only stages" width={1100} height={300}>
          <CurrentState/>
        </DCArtboard>
      </DCSection>

      <DCSection id="options" title="Three ways to fix it">
        <DCArtboard id="opA" label="A · Universal 4-stage (aggregate)" width={1100} height={560}>
          <OptionA/>
        </DCArtboard>
        <DCArtboard id="opB" label="B · Per-solution swimlanes" width={1100} height={420}>
          <OptionB/>
        </DCArtboard>
        <DCArtboard id="opC" label="C · Hybrid (recommended)" width={1100} height={560}>
          <OptionC/>
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
