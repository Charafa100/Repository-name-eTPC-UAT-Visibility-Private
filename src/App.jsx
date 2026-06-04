/**
 * App.jsx — minimal React shell.
 *
 * The existing application lives in project/TPC E-Solution.html and
 * is served as-is by Vite. This file is the entry point for future
 * React components — add them here incrementally as needed.
 *
 * src/components/  — shared React components (empty, ready)
 * src/pages/       — page-level React components (empty, ready)
 * src/styles/      — CSS copies for future import into React components
 */
export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '40px', color: '#344054' }}>
      <h2>TPC E-Solution — React Shell</h2>
      <p>
        The main application is at{' '}
        <a href="/project/TPC E-Solution.html">project/TPC E-Solution.html</a>.
      </p>
      <p style={{ color: '#667085', fontSize: '14px' }}>
        This shell is the future home for incremental React components.
      </p>
    </div>
  )
}
