/* global React */
const { useState: useStateEX, useEffect: useEffectEX, useMemo: useMemoEX, useRef: useRefEX } = React;

// ============ Our Experts ============
// An expertise-first companion to the Our People directory. Same people, same
// profile links — but the page is organized around *areas of expertise* rather
// than names. Top filters (Expertise / Department / Campus) open in modals, the
// degree-programs pattern, instead of the directory's left rail. Results are a
// scannable list of expert rows with their expertise areas trailing.
//
// Data comes from window.DIR_PEOPLE (directory-data.jsx). Only people who list
// at least one area of expertise appear here.
window.ExpertsPage = function ExpertsPage() {
  const EXPERTS = useMemoEX(
    () => (window.DIR_PEOPLE || []).filter((p) => p.expertise && p.expertise.length > 0),
    []
  );

  // Facet option lists, derived from the expert pool.
  const EXPERTISE_OPTIONS = useMemoEX(() => uniqEX(EXPERTS.flatMap((p) => p.expertise)), [EXPERTS]);
  const DEPT_OPTIONS = useMemoEX(() => uniqEX(EXPERTS.map((p) => p.dept)), [EXPERTS]);
  const CAMPUS_OPTIONS = useMemoEX(() => uniqEX(EXPERTS.map((p) => p.campus)), [EXPERTS]);

  const [search, setSearch] = useStateEX("");
  const [expertise, setExpertise] = useStateEX([]);
  const [depts, setDepts] = useStateEX([]);
  const [campuses, setCampuses] = useStateEX([]);
  const [openModal, setOpenModal] = useStateEX(null); // null | "expertise" | "dept" | "campus"

  const filtered = useMemoEX(() => {
    const q = search.trim().toLowerCase();
    return EXPERTS.filter((p) => {
      if (q) {
        const hay = `${p.name} ${p.title || ""} ${p.expertise.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (expertise.length && !expertise.some((a) => p.expertise.includes(a))) return false;
      if (depts.length && !depts.includes(p.dept)) return false;
      if (campuses.length && !campuses.includes(p.campus)) return false;
      return true;
    });
  }, [EXPERTS, search, expertise, depts, campuses]);

  const expertiseCounts = useMemoEX(() => countByMultiEX(EXPERTS, "expertise"), [EXPERTS]);
  const deptCounts = useMemoEX(() => countByEX(EXPERTS, "dept"), [EXPERTS]);
  const campusCounts = useMemoEX(() => countByEX(EXPERTS, "campus"), [EXPERTS]);

  const clearAll = () => { setSearch(""); setExpertise([]); setDepts([]); setCampuses([]); };
  const removeFrom = (setter, list) => (val) => setter(list.filter((x) => x !== val));
  const activeCount = expertise.length + depts.length + campuses.length + (search.trim() ? 1 : 0);

  return (
    <main className="experts" id="main">
      <header className="programs-hero">
        <div className="container">
          <nav className="programs-breadcrumb" aria-label="Breadcrumb">
            <a href="#">Home</a>
            <span aria-hidden="true">/</span>
            <a href="#">About</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Our Experts</span>
          </nav>
          <h1>Our Experts</h1>
          <p className="programs-lead">
            Find a CAES expert by what they study. Search an area of expertise — or a name or
            title — then narrow by department or campus. Every result links to the person's full
            profile.
          </p>
        </div>
      </header>

      <section className="programs-controls" aria-label="Search and filter experts">
        <div className="container">
          <div className="programs-search">
            <label htmlFor="experts-q" className="sr-only">Search experts</label>
            <svg className="programs-search-icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              id="experts-q"
              type="search"
              placeholder="Search by expertise, name, or title…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="programs-search-clear" onClick={() => setSearch("")} aria-label="Clear search">×</button>
            )}
          </div>

          <div className="programs-filter-row">
            <ExFilterTrigger label="Expertise" count={expertise.length} primary onClick={() => setOpenModal("expertise")} />
            <ExFilterTrigger label="Department" count={depts.length} onClick={() => setOpenModal("dept")} />
            <ExFilterTrigger label="Campus" count={campuses.length} onClick={() => setOpenModal("campus")} />
            {activeCount > 0 && (
              <button type="button" className="programs-clear-all" onClick={clearAll}>Clear all</button>
            )}
          </div>

          {(expertise.length + depts.length + campuses.length > 0) && (
            <div className="programs-active-chips" aria-label="Active filters">
              {expertise.map((v) => (
                <button key={`e-${v}`} className="programs-chip" onClick={() => removeFrom(setExpertise, expertise)(v)}>
                  {v}<span aria-hidden="true">×</span><span className="sr-only">Remove filter</span>
                </button>
              ))}
              {depts.map((v) => (
                <button key={`d-${v}`} className="programs-chip" onClick={() => removeFrom(setDepts, depts)(v)}>
                  {v}<span aria-hidden="true">×</span><span className="sr-only">Remove filter</span>
                </button>
              ))}
              {campuses.map((v) => (
                <button key={`c-${v}`} className="programs-chip" onClick={() => removeFrom(setCampuses, campuses)(v)}>
                  {v}<span aria-hidden="true">×</span><span className="sr-only">Remove filter</span>
                </button>
              ))}
            </div>
          )}

          <div className="programs-result-row">
            <div className="programs-result-count" aria-live="polite">
              {filtered.length === EXPERTS.length
                ? <>Showing <strong>all {EXPERTS.length}</strong> experts</>
                : <>Showing <strong>{filtered.length}</strong> of {EXPERTS.length} experts</>}
            </div>
          </div>
        </div>
      </section>

      <section className="programs-results">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="programs-empty">
              <h3>No experts match your filters.</h3>
              <p>Try a different keyword or clear a filter.</p>
              <button type="button" className="btn" onClick={clearAll}>Clear all filters</button>
            </div>
          ) : (
            <ExpertList people={filtered} />
          )}
        </div>
      </section>

      {openModal === "expertise" && (
        <ExFilterModal
          title="Filter by Expertise"
          subtitle="Pick one or more areas of expertise."
          options={EXPERTISE_OPTIONS}
          selected={expertise}
          counts={expertiseCounts}
          onApply={(next) => { setExpertise(next); setOpenModal(null); }}
          onClose={() => setOpenModal(null)}
        />
      )}
      {openModal === "dept" && (
        <ExFilterModal
          title="Filter by Department"
          options={DEPT_OPTIONS}
          selected={depts}
          counts={deptCounts}
          onApply={(next) => { setDepts(next); setOpenModal(null); }}
          onClose={() => setOpenModal(null)}
        />
      )}
      {openModal === "campus" && (
        <ExFilterModal
          title="Filter by Campus"
          options={CAMPUS_OPTIONS}
          selected={campuses}
          counts={campusCounts}
          onApply={(next) => { setCampuses(next); setOpenModal(null); }}
          onClose={() => setOpenModal(null)}
        />
      )}
    </main>
  );
};

// ----- Shared bits -----
function expInitials(name) {
  const parts = (name || "").trim().split(/\s+/);
  return ((parts[0] || " ")[0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
}
function ExpAvatar({ person, className }) {
  return (
    <span className={`exp-avatar ${className || ""}`} aria-hidden="true">
      <span className="exp-initials">{expInitials(person.name)}</span>
      {person.img && <img src={person.img} alt="" loading="lazy" onError={(e) => e.currentTarget.remove()} />}
    </span>
  );
}
function ExpTags({ areas, cap, className }) {
  if (!areas || !areas.length) return null;
  const shown = areas.slice(0, cap);
  const extra = areas.length - shown.length;
  return (
    <ul className={`exp-tags ${className || ""}`} aria-label="Areas of expertise">
      {shown.map((a) => <li className="exp-tag" key={a}>{a}</li>)}
      {extra > 0 && (
        <li className="exp-tag exp-tag--more" title={areas.slice(cap).join(", ")}>+{extra}</li>
      )}
    </ul>
  );
}

// ----- Layout A: compact list rows -----
function ExpertList({ people }) {
  return (
    <ul className="exp-list" role="list">
      {people.map((p, i) => (
        <li className="exp-row" key={`${p.name}-${i}`}>
          <ExpAvatar person={p} className="exp-row-avatar" />
          <div className="exp-row-main">
            <h3 className="exp-row-name"><a href="#" className="card-link">{p.name}</a></h3>
            <p className="exp-row-meta">{[p.title, p.dept].filter(Boolean).join(" · ")}</p>
          </div>
          <ExpTags areas={p.expertise} cap={5} className="exp-row-tags" />
        </li>
      ))}
    </ul>
  );
}

// ----- Filter chrome (reuses the degree-programs modal styling) -----
function ExFilterTrigger({ label, count, onClick, primary }) {
  const isActive = count > 0;
  return (
    <button type="button" className={`programs-filter-btn ${primary ? "is-primary" : ""} ${isActive ? "is-active" : ""}`} onClick={onClick}>
      <span className="programs-filter-btn-label">{label}</span>
      {count > 0 && <span className="programs-filter-count">{count}</span>}
      <svg viewBox="0 0 12 8" aria-hidden="true" className="programs-filter-caret">
        <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function uniqEX(arr) { return Array.from(new Set(arr.filter(Boolean))).sort(); }
function countByEX(arr, key) {
  const out = {};
  for (const item of arr) { const v = item[key]; if (v) out[v] = (out[v] || 0) + 1; }
  return out;
}
function countByMultiEX(arr, key) {
  const out = {};
  for (const item of arr) for (const v of item[key] || []) out[v] = (out[v] || 0) + 1;
  return out;
}

function ExFilterModal({ title, subtitle, options, selected, counts, onApply, onClose }) {
  const [draft, setDraft] = useStateEX(selected);
  const closeRef = useRefEX(null);

  useEffectEX(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => { if (closeRef.current) closeRef.current.focus(); }, 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const toggle = (opt) => setDraft(draft.includes(opt) ? draft.filter((x) => x !== opt) : [...draft, opt]);

  return (
    <div className="programs-modal-backdrop" onClick={onClose}>
      <div className="programs-modal" role="dialog" aria-modal="true" aria-labelledby="experts-modal-title" onClick={(e) => e.stopPropagation()}>
        <header className="programs-modal-head">
          <div className="programs-modal-titles">
            <h2 id="experts-modal-title">{title}</h2>
            {subtitle && <p className="programs-modal-subtitle">{subtitle}</p>}
          </div>
          <button ref={closeRef} className="programs-modal-close" onClick={onClose} aria-label="Close filter">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6l-6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="programs-modal-body">
          <ul className="programs-modal-list">
            {options.map((opt) => {
              const isOn = draft.includes(opt);
              return (
                <li key={opt}>
                  <label className={`programs-modal-row ${isOn ? "is-on" : ""}`}>
                    <input type="checkbox" checked={isOn} onChange={() => toggle(opt)} />
                    <span className="programs-modal-check" aria-hidden="true">
                      <svg viewBox="0 0 16 16"><path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span className="programs-modal-label">{opt}</span>
                    {counts && counts[opt] !== undefined && <span className="programs-modal-count">{counts[opt]}</span>}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <footer className="programs-modal-foot">
          <button className="programs-modal-clear" onClick={() => setDraft([])} disabled={draft.length === 0}>Reset</button>
          <button className="btn btn-filled programs-modal-apply" onClick={() => onApply(draft)}>
            Show {draft.length === 0 ? "all" : `${draft.length} selected`}
          </button>
        </footer>
      </div>
    </div>
  );
}
