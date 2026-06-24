/* global React */
const { useState: useStateDir, useEffect: useEffectDir, useMemo: useMemoDir } = React;

// ============ Our People — directory (filters in sidebar, paginated) ============
// Faceted left rail: collapsible checkbox groups + search. R&E Centers and
// Labs and Programs appear as collapsed groups with no options drawn.
const DIR_PAGE_SIZE = 12;

window.DirectoryPage = function DirectoryPage() {
  const GROUPS = window.DIR_GROUPS;
  const PEOPLE = window.DIR_PEOPLE;

  const [search, setSearch] = useStateDir("");
  const [selected, setSelected] = useStateDir({});
  const [page, setPage] = useStateDir(1);
  const [filtersOpen, setFiltersOpen] = useStateDir(false); // mobile-only disclosure

  const filtered = useMemoDir(() => window.dirFilter(PEOPLE, search, selected), [search, selected]);
  const counts = useMemoDir(() => {
    const c = {};
    GROUPS.forEach((g) => { c[g.key] = window.dirCounts(PEOPLE, g.key); });
    return c;
  }, []);

  // Any filter or search change returns to page 1.
  useEffectDir(() => { setPage(1); }, [search, selected]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / DIR_PAGE_SIZE));
  const cur = Math.min(page, pages);
  const start = (cur - 1) * DIR_PAGE_SIZE;
  const shown = filtered.slice(start, start + DIR_PAGE_SIZE);
  const rangeStart = total === 0 ? 0 : start + 1;
  const rangeEnd = Math.min(start + DIR_PAGE_SIZE, total);

  const toggle = (k, opt) => setSelected((s) => {
    const cur2 = s[k] || [];
    return { ...s, [k]: cur2.includes(opt) ? cur2.filter((x) => x !== opt) : [...cur2, opt] };
  });
  const clearAll = () => { setSearch(""); setSelected({}); };
  const activeCount = GROUPS.reduce((n, g) => n + (selected[g.key] || []).length, 0) + (search.trim() ? 1 : 0);

  const OPEN_BY_DEFAULT = { type: true, acad: true, extension: true, campus: true };

  return (
    <main className="dir" id="main">
      <header className="dir-hero">
        <div className="container">
          <nav className="dir-breadcrumb" aria-label="Breadcrumb">
            <a href="#">Home</a><span aria-hidden="true">/</span>
            <a href="#">About</a><span aria-hidden="true">/</span>
            <span aria-current="page">Our People</span>
          </nav>
          <h1>Our People</h1>
          <p className="dir-lead">Find faculty, staff, students, and county personnel across CAES — narrow the list with the filters at left.</p>
        </div>
      </header>

      <div className="container">
        <div className="dir-shell">
          <aside className="dir-sidebar" aria-label="Filters">
            <div className="dir-sidebar-inner">
              <div className="programs-search">
                <label htmlFor="dir-q" className="sr-only">Search the directory</label>
                <svg className="programs-search-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input id="dir-q" type="search" placeholder="Search people…" value={search} onChange={(e) => setSearch(e.target.value)} />
                {search && <button className="programs-search-clear" onClick={() => setSearch("")} aria-label="Clear search">×</button>}
              </div>

              {/* Mobile-only disclosure for the facet groups (search stays visible above). */}
              <button
                type="button"
                className="dir-filter-toggle"
                aria-expanded={filtersOpen}
                aria-controls="dir-facets"
                onClick={() => setFiltersOpen((o) => !o)}
              >
                <span>Filters{activeCount > 0 ? ` (${activeCount})` : ""}</span>
                <span className="dir-filter-toggle-icon" aria-hidden="true">{filtersOpen ? "−" : "+"}</span>
              </button>

              <div id="dir-facets" className={`dir-facets${filtersOpen ? " is-open" : ""}`}>
                <div className="dir-sidebar-head">
                  <h2>Filters</h2>
                  {activeCount > 0 && <button type="button" className="dir-clear" onClick={clearAll}>Clear all</button>}
                </div>

                {GROUPS.map((g) => (
                  <DirFacet
                    key={g.key}
                    group={g}
                    sel={selected[g.key] || []}
                    counts={counts[g.key]}
                    onToggle={toggle}
                    defaultOpen={!!OPEN_BY_DEFAULT[g.key]}
                  />
                ))}
              </div>
            </div>
          </aside>

          <div className="dir-content">
            <div className="dir-result-row">
              <div className="dir-count" aria-live="polite">
                {total === 0
                  ? <>No people match</>
                  : <>Showing <strong>{rangeStart}–{rangeEnd}</strong> of {total} {total === 1 ? "person" : "people"}</>}
              </div>
            </div>

            {total === 0 ? (
              <div className="dir-empty">
                <h3>No one matches those filters.</h3>
                <p>Try removing a filter or changing your search.</p>
                <button type="button" className="btn" onClick={clearAll}>Clear all filters</button>
              </div>
            ) : (
              <>
                <ul className="dir-grid" role="list">
                  {shown.map((p, i) => <li key={`${p.name}-${i}`}><PersonCard person={p} /></li>)}
                </ul>
                {pages > 1 && (
                  <nav className="dir-pager" aria-label="Pagination">
                    <button type="button" className="dir-pager-btn" disabled={cur === 1} onClick={() => setPage(cur - 1)}>← Prev</button>
                    {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                      <button
                        type="button"
                        key={n}
                        className={`dir-pager-num ${n === cur ? "is-current" : ""}`}
                        aria-current={n === cur ? "page" : undefined}
                        onClick={() => setPage(n)}
                      >{n}</button>
                    ))}
                    <button type="button" className="dir-pager-btn" disabled={cur === pages} onClick={() => setPage(cur + 1)}>Next →</button>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

function DirFacet({ group, sel, counts, onToggle, defaultOpen }) {
  const [open, setOpen] = useStateDir(defaultOpen);
  return (
    <div className="dir-facet">
      <button type="button" className="dir-facet-btn" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span>{group.label}</span>
        {sel.length > 0 && <span className="dir-facet-count">{sel.length}</span>}
        <span className="dir-facet-icon" aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      {open && (group.options.length > 0 ? (
        <div className="dir-facet-body">
          {group.options.map((opt) => (
            <label className="dir-check" key={opt}>
              <input type="checkbox" checked={sel.includes(opt)} onChange={() => onToggle(group.key, opt)} />
              <span className="dir-check-label">{opt}</span>
              {counts[opt] !== undefined && <span className="dir-check-count">{counts[opt]}</span>}
            </label>
          ))}
        </div>
      ) : (
        <p className="dir-facet-empty">No options available yet.</p>
      ))}
    </div>
  );
}
