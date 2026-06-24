/* global React */
const { useState: useStatePR, useEffect: useEffectPR, useMemo: useMemoPR, useRef: useRefPR } = React;

// ============ Degrees and Programs ============
// Searchable, filterable directory of every degree program in the college.
// Three filters (Interest / Program Type / Department) open in modals — keeps
// the page clean and works well on mobile. Interest is the primary axis since
// it maps to how prospective students think.
window.ProgramsPage = function ProgramsPage() {

  // Interest tags come from "Academic programs by interests + topics.xlsx"
  const INTERESTS = [
    "Animals", "Business", "Economics", "Education",
    "Environment and Sustainability", "Food", "Health and Nutrition",
    "Insects", "Law", "Global Leadership", "Marketing and Communications",
    "Medicine", "Plants", "Robotics and Technology",
  ];

  // A small decorative emoji per interest. Rendered aria-hidden everywhere, so
  // screen readers announce the interest name only — never the emoji's literal
  // name. Keys must match the INTERESTS spellings above.
  const INTEREST_EMOJI = {
    "Animals": "🐓",
    "Business": "💼",
    "Economics": "📈",
    "Education": "📚",
    "Environment and Sustainability": "🌎",
    "Food": "🫐",
    "Health and Nutrition": "🍎",
    "Insects": "🐞",
    "Law": "🏛️",
    "Global Leadership": "🏆",
    "Marketing and Communications": "🎙️",
    "Medicine": "🩺",
    "Plants": "🌱",
    "Robotics and Technology": "⚙️",
  };

  // Generic filler descriptions — rotated to avoid visual monotony.
  const FILLER = [
    "Hands-on coursework with leading faculty, paired with research opportunities at UGA campuses in Athens, Griffin, and Tifton.",
    "Combines fieldwork, lab research, and applied coursework — graduates move into industry, government, and academic research roles.",
    "Build a foundation in the science behind sustainable food, fiber, and natural-resource systems through faculty-mentored study.",
    "Examine production systems, applied science, and policy that drive decision-making across regional and global markets.",
  ];

  const PROGRAMS = [
    { name: "Agribusiness", type: "Undergraduate Major", dept: "Agricultural and Applied Economics", interests: ["Business", "Marketing and Communications"] },
    { name: "Agricultural Education", type: "Undergraduate Major", dept: "Agricultural Leadership, Education and Communication", interests: ["Education"] },
    { name: "Agricultural and Applied Economics", type: "Undergraduate Major", dept: "Agricultural and Applied Economics", interests: ["Business", "Economics", "Law"] },
    { name: "Agricultural and Environmental Science Communication", type: "Undergraduate Major", dept: "Agricultural Leadership, Education and Communication", interests: ["Environment and Sustainability", "Marketing and Communications"] },
    { name: "Agriscience and Environmental Systems", type: "Undergraduate Major", dept: "Agricultural Leadership, Education and Communication", interests: ["Environment and Sustainability", "Plants", "Robotics and Technology"] },
    { name: "Animal Biosciences", type: "Undergraduate Major", dept: "Animal and Dairy Science", interests: ["Animals", "Medicine"] },
    { name: "Animal Health", type: "Undergraduate Major", dept: "Animal and Dairy Science", interests: ["Animals", "Health and Nutrition", "Medicine"] },
    { name: "Animal and Dairy Science", type: "Undergraduate Major", dept: "Animal and Dairy Science", interests: ["Animals", "Food", "Medicine"] },
    { name: "Applied Biotechnology", type: "Undergraduate Major", dept: "Animal and Dairy Science", interests: ["Animals", "Medicine"] },
    { name: "Avian Biology", type: "Undergraduate Major", dept: "Poultry Science", interests: ["Animals", "Medicine"] },
    { name: "Biological Science", type: "Undergraduate Major", dept: "Multiple Departments", interests: ["Animals", "Medicine"] },
    { name: "Entomology", type: "Undergraduate Major", dept: "Entomology", interests: ["Animals", "Insects"] },
    { name: "Environmental Economics and Management", type: "Undergraduate Major", dept: "Agricultural and Applied Economics", interests: ["Business", "Economics", "Environment and Sustainability", "Law"] },
    { name: "Environmental Resource Science", type: "Undergraduate Major", dept: "Crop and Soil Sciences", interests: ["Business", "Economics", "Environment and Sustainability", "Law", "Plants"] },
    { name: "Food Science", type: "Undergraduate Major", dept: "Food Science and Technology", interests: ["Food", "Health and Nutrition"] },
    { name: "Honors Interdisciplinary Studies", type: "Undergraduate Major", dept: "Multiple Departments", interests: INTERESTS },
    { name: "Horticulture", type: "Undergraduate Major", dept: "Horticulture", interests: ["Environment and Sustainability", "Plants", "Robotics and Technology"] },
    { name: "Hospitality and Food Industry Management", type: "Undergraduate Major", dept: "Food Science and Technology", interests: ["Business", "Food", "Marketing and Communications"] },
    { name: "Poultry Science", type: "Undergraduate Major", dept: "Poultry Science", interests: ["Animals", "Food", "Medicine", "Robotics and Technology"] },
    { name: "Regenerative Bioscience", type: "Undergraduate Major", dept: "Animal and Dairy Science", interests: ["Animals", "Medicine"] },
    { name: "Turfgrass Management", type: "Undergraduate Major", dept: "Horticulture", interests: ["Environment and Sustainability", "Plants"] },
    { name: "Agribusiness (MAB)", type: "Master's", dept: "Agricultural and Applied Economics", interests: ["Business", "Marketing and Communications"] },
    { name: "Agricultural and Applied Economics (MS)", type: "Master's", dept: "Agricultural and Applied Economics", interests: ["Business", "Economics", "Law"] },
    { name: "Agricultural and Environmental Education (MAEE)", type: "Master's", dept: "Agricultural Leadership, Education and Communication", interests: ["Education", "Environment and Sustainability"] },
    { name: "Animal and Dairy Science – Non-Thesis (MS)", type: "Master's", dept: "Animal and Dairy Science", interests: ["Animals", "Food", "Medicine"] },
    { name: "Animal and Dairy Science – Thesis (MS)", type: "Master's", dept: "Animal and Dairy Science", interests: ["Animals", "Food", "Medicine"] },
    { name: "Crop and Soil Sciences (MS)", type: "Master's", dept: "Crop and Soil Sciences", interests: ["Environment and Sustainability", "Food", "Plants", "Robotics and Technology"] },
    { name: "Entomology (MS)", type: "Master's", dept: "Entomology", interests: ["Animals", "Insects"] },
    { name: "Environmental Economics (MS)", type: "Master's", dept: "Agricultural and Applied Economics", interests: ["Business", "Economics", "Environment and Sustainability"] },
    { name: "Food Science (MS)", type: "Master's", dept: "Food Science and Technology", interests: ["Food", "Health and Nutrition"] },
    { name: "Food Technology (MFT)", type: "Master's", dept: "Food Science and Technology", interests: ["Food", "Health and Nutrition"] },
    { name: "Horticulture (MS)", type: "Master's", dept: "Horticulture", interests: ["Environment and Sustainability", "Plants", "Robotics and Technology"] },
    { name: "Plant Breeding, Genetics and Genomics (MS)", type: "Master's", dept: "Institute of Plant Breeding, Genetics and Genomics", interests: ["Environment and Sustainability", "Food", "Plants", "Robotics and Technology"] },
    { name: "Plant Pathology (MS)", type: "Master's", dept: "Plant Pathology", interests: ["Insects", "Plants"] },
    { name: "Plant Protection and Pest Management – Agronomy (MPPPM)", type: "Master's", dept: "Crop and Soil Sciences", interests: ["Business", "Environment and Sustainability", "Insects", "Plants"] },
    { name: "Plant Protection and Pest Management – Entomology (MPPPM)", type: "Master's", dept: "Entomology", interests: ["Environment and Sustainability", "Insects", "Plants"] },
    { name: "Plant Protection and Pest Management – Plant Pathology (MPPPM)", type: "Master's", dept: "Plant Pathology", interests: ["Environment and Sustainability", "Insects", "Plants"] },
    { name: "Poultry Science – Non-Thesis (MS)", type: "Master's", dept: "Poultry Science", interests: ["Animals", "Food", "Medicine", "Robotics and Technology"] },
    { name: "Poultry Science – Thesis (MS)", type: "Master's", dept: "Poultry Science", interests: ["Animals", "Food", "Medicine", "Robotics and Technology"] },
    { name: "Toxicology: Animal and Dairy Science (MS)", type: "Master's", dept: "Animal and Dairy Science", interests: ["Animals", "Health and Nutrition", "Insects", "Medicine"] },
    { name: "Toxicology: Crop and Soil Sciences (MS)", type: "Master's", dept: "Crop and Soil Sciences", interests: ["Food", "Health and Nutrition", "Insects", "Medicine", "Plants"] },
    { name: "Toxicology: Entomology (MS)", type: "Master's", dept: "Entomology", interests: ["Animals", "Health and Nutrition", "Insects", "Medicine"] },
    { name: "Toxicology: Plant Pathology (MS)", type: "Master's", dept: "Plant Pathology", interests: ["Health and Nutrition", "Insects", "Medicine", "Plants"] },
    { name: "Agricultural and Applied Economics (PhD)", type: "Doctoral", dept: "Agricultural and Applied Economics", interests: ["Business", "Economics", "Law"] },
    { name: "Agricultural Leadership, Education and Communication (PhD)", type: "Doctoral", dept: "Agricultural Leadership, Education and Communication", interests: ["Education", "Global Leadership", "Marketing and Communications"] },
    { name: "Animal and Dairy Science (PhD)", type: "Doctoral", dept: "Animal and Dairy Science", interests: ["Animals", "Food", "Medicine"] },
    { name: "Crop and Soil Sciences (PhD)", type: "Doctoral", dept: "Crop and Soil Sciences", interests: ["Environment and Sustainability", "Food", "Plants", "Robotics and Technology"] },
    { name: "Entomology (PhD)", type: "Doctoral", dept: "Entomology", interests: ["Animals", "Insects"] },
    { name: "Food Science (PhD)", type: "Doctoral", dept: "Food Science and Technology", interests: ["Food", "Health and Nutrition"] },
    { name: "Horticulture (PhD)", type: "Doctoral", dept: "Horticulture", interests: ["Environment and Sustainability", "Plants", "Robotics and Technology"] },
    { name: "Integrated Plant Sciences (PhD)", type: "Doctoral", dept: "Multiple Departments", interests: ["Environment and Sustainability", "Plants", "Robotics and Technology"] },
    { name: "Plant Breeding, Genetics and Genomics (PhD)", type: "Doctoral", dept: "Institute of Plant Breeding, Genetics and Genomics", interests: ["Environment and Sustainability", "Food", "Plants", "Robotics and Technology"] },
    { name: "Plant Pathology (PhD)", type: "Doctoral", dept: "Plant Pathology", interests: ["Insects", "Plants"] },
    { name: "Poultry Science (PhD)", type: "Doctoral", dept: "Poultry Science", interests: ["Animals", "Food", "Medicine", "Robotics and Technology"] },
    { name: "Regenerative Bioscience (PhD)", type: "Doctoral", dept: "Animal and Dairy Science", interests: ["Animals", "Medicine"] },
    { name: "Toxicology: Animal and Dairy Science (PhD)", type: "Doctoral", dept: "Animal and Dairy Science", interests: ["Animals", "Health and Nutrition", "Insects", "Medicine"] },
    { name: "Toxicology: Crop and Soil Sciences (PhD)", type: "Doctoral", dept: "Crop and Soil Sciences", interests: ["Food", "Health and Nutrition", "Insects", "Medicine", "Plants"] },
    { name: "Toxicology: Entomology (PhD)", type: "Doctoral", dept: "Entomology", interests: ["Animals", "Health and Nutrition", "Insects", "Medicine"] },
    { name: "Toxicology: Plant Pathology (PhD)", type: "Doctoral", dept: "Plant Pathology", interests: ["Health and Nutrition", "Insects", "Medicine", "Plants"] },
  ].map((p, i) => ({ ...p, description: FILLER[i % FILLER.length] }));

  // ---- Double Dawgs ----
  // UGA's accelerated pathway: earn a bachelor's + master's in five years or
  // less. Each pairing links an undergraduate program to a graduate one; the
  // `programs` array lists which CAES programs (by their PROGRAMS name) the
  // pairing should appear on. A program shows the Double Dawgs badge whenever it
  // turns up in any pairing. Grad partners outside CAES (Journalism, Public
  // Health) and ambiguous ones (the MPPPM tracks) are intentionally left
  // unmatched, so the badge lands on the program a CAES visitor is browsing.
  const DOUBLE_DAWGS_INTRO = "The Double Dawgs program was created to give ambitious and motivated students a competitive advantage in today's knowledge economy. By earning both a bachelor's degree and a master's degree in five years or less, students can save time and money while positioning themselves for success after graduation.";
  const DOUBLE_DAWGS_URL = "#"; // TODO: point at the live Double Dawgs page
  const DOUBLE_DAWGS_PAIRS = [
    { label: "Agribusiness (BSA) / Agribusiness (MAB) Non-Thesis", programs: ["Agribusiness", "Agribusiness (MAB)"] },
    { label: "Agribusiness (BSA) / Agricultural and Applied Economics (MS)", programs: ["Agribusiness", "Agricultural and Applied Economics (MS)"] },
    { label: "Agribusiness (BSA) / Environmental Economics (MS)", programs: ["Agribusiness", "Environmental Economics (MS)"] },
    { label: "Agricultural and Applied Economics (BSA) / Agribusiness (MAB) Non-Thesis", programs: ["Agricultural and Applied Economics", "Agribusiness (MAB)"] },
    { label: "Agricultural and Applied Economics (BSA) / Agricultural and Applied Economics (MS)", programs: ["Agricultural and Applied Economics", "Agricultural and Applied Economics (MS)"] },
    { label: "Agricultural and Applied Economics (BSA) / Environmental Economics (MS)", programs: ["Agricultural and Applied Economics", "Environmental Economics (MS)"] },
    { label: "Agricultural Communication (BSA) / Journalism and Mass Communication MA (Emerging Media) Non-Thesis", programs: ["Agricultural and Environmental Science Communication"] },
    { label: "Agricultural Education (BSA) / Agricultural Leadership, Education and Communication (MS) Non-Thesis", programs: ["Agricultural Education"] },
    { label: "Agriscience and Environmental Systems (BSA) / Plant Breeding, Genetics and Genomics (MS)", programs: ["Agriscience and Environmental Systems", "Plant Breeding, Genetics and Genomics (MS)"] },
    { label: "Agriscience and Environmental Systems (BSA) / Plant Protection and Pest Management (MPPPM) Non-Thesis", programs: ["Agriscience and Environmental Systems"] },
    { label: "Applied Biotechnology (Plant Science) (BSAB) / Plant Breeding, Genetics and Genomics (MS)", programs: ["Applied Biotechnology", "Plant Breeding, Genetics and Genomics (MS)"] },
    { label: "Applied Biotechnology (Biomedical Science) (BSAB) / Public Health (MPH) (Health Promotion and Behavior) Non-Thesis", programs: ["Applied Biotechnology"] },
    { label: "Applied Biotechnology (Biomedical Science) (BSAB) / Public Health (MPH) (Environmental Health) Non-Thesis", programs: ["Applied Biotechnology"] },
    { label: "Avian Biology (BSA) / Poultry Science (MS)", programs: ["Avian Biology", "Poultry Science – Non-Thesis (MS)"] },
    { label: "Biological Science (BSA) / Poultry Science (MS)", programs: ["Biological Science", "Poultry Science – Non-Thesis (MS)"] },
    { label: "Biological Science (BSA) / Public Health - Biostatistics (MPH) Non-Thesis", programs: ["Biological Science"] },
    { label: "Biological Science (BSA) / Public Health - Disaster Management (MPH) Non-Thesis", programs: ["Biological Science"] },
    { label: "Biological Science (BSA) / Public Health - Environmental Health (MPH) Non-Thesis", programs: ["Biological Science"] },
    { label: "Biological Science (BSA) / Public Health - Epidemiology (MPH) Non-Thesis", programs: ["Biological Science"] },
    { label: "Biological Science (BSA) / Public Health - Health Policy and Management (MPH) Non-Thesis", programs: ["Biological Science"] },
    { label: "Entomology (BSA) / Entomology (MS)", programs: ["Entomology", "Entomology (MS)"] },
    { label: "Environmental Economics and Management (BSES) / Agribusiness (MAB) Non-Thesis", programs: ["Environmental Economics and Management", "Agribusiness (MAB)"] },
    { label: "Environmental Economics and Management (BSES) / Agricultural and Applied Economics (MS)", programs: ["Environmental Economics and Management", "Agricultural and Applied Economics (MS)"] },
    { label: "Environmental Economics and Management (BSES) / Environmental Economics (MS)", programs: ["Environmental Economics and Management", "Environmental Economics (MS)"] },
    { label: "Environmental Resource Science (BSES) / Plant Protection and Pest Management (MPPPM) Non-Thesis", programs: ["Environmental Resource Science"] },
    { label: "Horticulture (BSA) / Horticulture (MS)", programs: ["Horticulture", "Horticulture (MS)"] },
    { label: "Horticulture (BSA) / Plant Protection and Pest Management (MPPPM) Non-Thesis", programs: ["Horticulture"] },
    { label: "Hospitality and Food Industry Management (BSA) / Agribusiness (MAB) Non-thesis", programs: ["Hospitality and Food Industry Management", "Agribusiness (MAB)"] },
    { label: "Plant Biology (BS) / Plant Pathology (MS)", programs: ["Plant Pathology (MS)"] },
    { label: "Poultry Science (BSA) / Agribusiness (MAB) Non-Thesis", programs: ["Poultry Science", "Agribusiness (MAB)"] },
    { label: "Regenerative Bioscience (BS) / Public Health - Epidemiology (MPH) Non-Thesis", programs: ["Regenerative Bioscience"] },
  ];
  // Program name -> list of pairing labels it belongs to.
  const DOUBLE_DAWGS = {};
  DOUBLE_DAWGS_PAIRS.forEach(pair => {
    pair.programs.forEach(name => {
      (DOUBLE_DAWGS[name] = DOUBLE_DAWGS[name] || []).push(pair.label);
    });
  });

  const TYPE_OPTIONS = ["Undergraduate Major", "Master's", "Doctoral"];
  const DEPT_OPTIONS = Array.from(new Set(PROGRAMS.map(p => p.dept))).sort();

  // Small circular thumbnails for the card view (decorative placeholders).
  const IMG = window.IMG;
  const CARD_THUMBS = ["dept1", "dept2", "dept3", "dept4", "dept5", "dept6", "field", "greenhouse", "classroom", "research"];

  const [search, setSearch] = useStatePR("");
  const [interests, setInterests] = useStatePR([]);
  const [types, setTypes] = useStatePR([]);
  const [depts, setDepts] = useStatePR([]);
  const [openModal, setOpenModal] = useStatePR(null); // null | "interest" | "type" | "dept"
  const [view, setView] = useStatePR("cards");      // "cards" | "table"
  const [dawgsFor, setDawgsFor] = useStatePR(null); // program object whose Double Dawgs modal is open

  const filtered = useMemoPR(() => {
    const q = search.trim().toLowerCase();
    return PROGRAMS.filter(p => {
      if (q && !p.name.toLowerCase().includes(q) && !p.dept.toLowerCase().includes(q)) return false;
      if (interests.length && !interests.some(i => p.interests.includes(i))) return false;
      if (types.length && !types.includes(p.type)) return false;
      if (depts.length && !depts.includes(p.dept)) return false;
      return true;
    });
  }, [search, interests, types, depts]);

  // Default grouping: bucket the filtered results by program type — the type
  // becomes the H2 section header, so individual programs no longer repeat it.
  // Empty groups are dropped so we never render a bare/empty header.
  const grouped = useMemoPR(() =>
    TYPE_OPTIONS
      .map(t => ({
        label: t,
        items: filtered.filter(p => p.type === t),
        total: PROGRAMS.filter(p => p.type === t).length,
      }))
      .filter(g => g.items.length > 0)
  , [filtered]);

  const interestCounts = useMemoPR(() => countByMulti(PROGRAMS, "interests"), []);
  const typeCounts = useMemoPR(() => countBy(PROGRAMS, "type"), []);
  const deptCounts = useMemoPR(() => countBy(PROGRAMS, "dept"), []);

  const clearAll = () => { setSearch(""); setInterests([]); setTypes([]); setDepts([]); };
  const removeFrom = (setter, list) => (val) => setter(list.filter(x => x !== val));
  const activeCount = interests.length + types.length + depts.length + (search.trim() ? 1 : 0);

  // Shared interest rendering — each name with a trailing decorative emoji,
  // pipe-separated. Used by both the cards and the table so the views match.
  // Omitted when a program spans every interest (no signal to add).
  const showInterests = (p) => p.interests && p.interests.length > 0 && p.interests.length < INTERESTS.length;
  const renderInterests = (list) => list.map((it, idx) => (
    <React.Fragment key={it}>
      {idx > 0 && <span className="interest-sep" aria-hidden="true"> | </span>}
      {it}
      {INTEREST_EMOJI[it] && <span className="interest-emoji" aria-hidden="true"> {INTEREST_EMOJI[it]}</span>}
    </React.Fragment>
  ));

  return (
    <main className="programs" id="main">
      <header className="programs-hero">
        <div className="container">
          <nav className="programs-breadcrumb" aria-label="Breadcrumb">
            <a href="#">Home</a>
            <span aria-hidden="true">/</span>
            <a href="#">Academics</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Degrees and Programs</span>
          </nav>
          <h1>Degrees and Programs</h1>
          <p className="programs-lead">
            Explore every degree CAES offers — from undergraduate majors and minors to master's,
            doctoral, and joint programs. Start with what you're interested in, then narrow by
            program type or department.
          </p>
        </div>
      </header>

      <section className="programs-controls" aria-label="Search and filter programs">
        <div className="container">
          <div className="programs-search">
            <label htmlFor="programs-q" className="sr-only">Search degrees</label>
            <svg className="programs-search-icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              id="programs-q"
              type="search"
              placeholder="Search by program or department…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="programs-search-clear" onClick={() => setSearch("")} aria-label="Clear search">×</button>
            )}
          </div>

          <div className="programs-filter-row">
            <FilterTrigger
              label="Interest"
              count={interests.length}
              primary
              onClick={() => setOpenModal("interest")}
            />
            <FilterTrigger
              label="Program Type"
              count={types.length}
              onClick={() => setOpenModal("type")}
            />
            <FilterTrigger
              label="Department"
              count={depts.length}
              onClick={() => setOpenModal("dept")}
            />

            {activeCount > 0 && (
              <button type="button" className="programs-clear-all" onClick={clearAll}>
                Clear all
              </button>
            )}
          </div>

          {(interests.length + types.length + depts.length > 0) && (
            <div className="programs-active-chips" aria-label="Active filters">
              {interests.map(v => (
                <button key={`i-${v}`} className="programs-chip" onClick={() => removeFrom(setInterests, interests)(v)}>
                  {v}
                  {INTEREST_EMOJI[v] && <span className="interest-emoji" aria-hidden="true"> {INTEREST_EMOJI[v]}</span>}
                  <span aria-hidden="true">×</span>
                  <span className="sr-only">Remove filter</span>
                </button>
              ))}
              {types.map(v => (
                <button key={`t-${v}`} className="programs-chip" onClick={() => removeFrom(setTypes, types)(v)}>
                  {v}<span aria-hidden="true">×</span>
                  <span className="sr-only">Remove filter</span>
                </button>
              ))}
              {depts.map(v => (
                <button key={`d-${v}`} className="programs-chip" onClick={() => removeFrom(setDepts, depts)(v)}>
                  {v}<span aria-hidden="true">×</span>
                  <span className="sr-only">Remove filter</span>
                </button>
              ))}
            </div>
          )}

          <div className="programs-result-row">
            <div className="programs-result-count" aria-live="polite">
              {filtered.length === PROGRAMS.length
                ? <>Showing <strong>all {PROGRAMS.length}</strong> programs</>
                : <>Showing <strong>{filtered.length}</strong> of {PROGRAMS.length} programs</>}
            </div>
            <div className="programs-view-toggle" role="group" aria-label="Result view">
              <button
                type="button"
                className={`programs-view-btn ${view === "table" ? "is-on" : ""}`}
                onClick={() => setView("table")}
                aria-pressed={view === "table"}
              >
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M2 4h16M2 10h16M2 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>Table</span>
              </button>
              <button
                type="button"
                className={`programs-view-btn ${view === "cards" ? "is-on" : ""}`}
                onClick={() => setView("cards")}
                aria-pressed={view === "cards"}
              >
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <rect x="2" y="2" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <rect x="11" y="2" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <rect x="2" y="11" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <rect x="11" y="11" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>Cards</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="programs-results">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="programs-empty">
              <h2>No programs match your filters.</h2>
              <p>Try a different keyword or clear a filter.</p>
              <button type="button" className="btn" onClick={clearAll}>Clear all filters</button>
            </div>
          ) : (
            grouped.map((group) => (
              <div className="programs-group" key={group.label}>
                <h2 className="programs-group-title">
                  <span className="programs-group-label">{group.label}</span>
                  <span className="programs-group-count">
                    {group.items.length}
                    {activeCount > 0 && group.items.length !== group.total && (
                      <span className="programs-group-count-total"> of {group.total}</span>
                    )}
                    <span className="sr-only"> programs</span>
                  </span>
                </h2>
                {view === "table" ? (
                  <table className="programs-table">
                    <caption className="sr-only">{group.label} degree programs</caption>
                    <thead>
                      <tr>
                        <th scope="col">Degree Program</th>
                        <th scope="col">Description</th>
                        <th scope="col">Department</th>
                        <th scope="col">Interests</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.items.map((p, i) => (
                        <tr key={`${p.name}-${i}`}>
                          <td data-label="Degree Program">
                            <a href="#" className="programs-row-link">{p.name}</a>
                          </td>
                          <td data-label="Description" className="programs-row-desc">
                            {p.description}
                            {DOUBLE_DAWGS[p.name] && (
                              <DoubleDawgsNote programName={p.name} onClick={() => setDawgsFor(p)} />
                            )}
                          </td>
                          <td data-label="Department" className="programs-row-dept">{p.dept}</td>
                          <td data-label="Interests" className="programs-row-interests">
                            {showInterests(p) ? renderInterests(p.interests) : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <ul className="programs-cards" role="list">
                    {group.items.map((p, i) => (
                      <li className="programs-card" key={`${p.name}-${i}`}>
                        <article className="programs-card-link">
                          <div className="programs-card-head">
                            <span className="programs-card-thumb" aria-hidden="true">
                              <img src={IMG[CARD_THUMBS[i % CARD_THUMBS.length]]} alt="" loading="lazy" />
                            </span>
                            <div className="programs-card-headings">
                              <h3 className="programs-card-title"><a href="#" className="card-link">{p.name}</a></h3>
                            </div>
                          </div>
                          <p className="programs-card-desc">
                            {p.description}
                            {DOUBLE_DAWGS[p.name] && (
                              <DoubleDawgsNote programName={p.name} onClick={() => setDawgsFor(p)} />
                            )}
                          </p>
                          <div className="programs-card-foot">
                            <span className="programs-card-dept-label">Department</span>
                            <span className="programs-card-dept">{p.dept}</span>
                            {showInterests(p) && (
                              <>
                                <span className="programs-card-interest-label">Interest</span>
                                <span className="programs-card-interests">{renderInterests(p.interests)}</span>
                              </>
                            )}
                          </div>
                          <span className="programs-card-arrow" aria-hidden="true">→</span>
                        </article>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {openModal === "interest" && (
        <FilterModal
          title="Filter by Interest"
          subtitle="Pick one or more topics that match what you'd like to study."
          options={INTERESTS}
          selected={interests}
          counts={interestCounts}
          icons={INTEREST_EMOJI}
          onApply={(next) => { setInterests(next); setOpenModal(null); }}
          onClose={() => setOpenModal(null)}
        />
      )}
      {openModal === "type" && (
        <FilterModal
          title="Filter by Program Type"
          options={TYPE_OPTIONS}
          selected={types}
          counts={typeCounts}
          onApply={(next) => { setTypes(next); setOpenModal(null); }}
          onClose={() => setOpenModal(null)}
        />
      )}
      {openModal === "dept" && (
        <FilterModal
          title="Filter by Department"
          options={DEPT_OPTIONS}
          selected={depts}
          counts={deptCounts}
          onApply={(next) => { setDepts(next); setOpenModal(null); }}
          onClose={() => setOpenModal(null)}
        />
      )}
      {dawgsFor && (
        <DoubleDawgsModal
          program={dawgsFor}
          pairs={DOUBLE_DAWGS[dawgsFor.name] || []}
          intro={DOUBLE_DAWGS_INTRO}
          url={DOUBLE_DAWGS_URL}
          onClose={() => setDawgsFor(null)}
        />
      )}
    </main>
  );
};

function FilterTrigger({ label, count, onClick, primary }) {
  const isActive = count > 0;
  return (
    <button
      type="button"
      className={`programs-filter-btn ${primary ? "is-primary" : ""} ${isActive ? "is-active" : ""}`}
      onClick={onClick}
    >
      <span className="programs-filter-btn-label">{label}</span>
      {count > 0 && <span className="programs-filter-count">{count} selected</span>}
      <svg viewBox="0 0 12 8" aria-hidden="true" className="programs-filter-caret">
        <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

function countBy(arr, key) {
  const out = {};
  for (const item of arr) out[item[key]] = (out[item[key]] || 0) + 1;
  return out;
}

function countByMulti(arr, key) {
  const out = {};
  for (const item of arr) {
    for (const v of item[key] || []) out[v] = (out[v] || 0) + 1;
  }
  return out;
}

function FilterModal({ title, subtitle, options, selected, counts, onApply, onClose, icons }) {
  const [draft, setDraft] = useStatePR(selected);
  const closeRef = useRefPR(null);

  useEffectPR(() => {
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

  const toggle = (opt) => {
    setDraft(draft.includes(opt) ? draft.filter(x => x !== opt) : [...draft, opt]);
  };
  const clearDraft = () => setDraft([]);

  return (
    <div className="programs-modal-backdrop" onClick={onClose}>
      <div
        className="programs-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="programs-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="programs-modal-head">
          <div className="programs-modal-titles">
            <h2 id="programs-modal-title">{title}</h2>
            {subtitle && <p className="programs-modal-subtitle">{subtitle}</p>}
          </div>
          <button ref={closeRef} className="programs-modal-close" onClick={onClose} aria-label="Close filter">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6l-6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
          </button>
        </header>

        <div className="programs-modal-body">
          <ul className="programs-modal-list">
            {options.map(opt => {
              const isOn = draft.includes(opt);
              return (
                <li key={opt}>
                  <label className={`programs-modal-row ${isOn ? "is-on" : ""}`}>
                    <input
                      type="checkbox"
                      checked={isOn}
                      onChange={() => toggle(opt)}
                    />
                    <span className="programs-modal-check" aria-hidden="true">
                      <svg viewBox="0 0 16 16">
                        <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="programs-modal-label">
                      {opt}
                      {icons && icons[opt] && (
                        <span className="interest-emoji" aria-hidden="true"> {icons[opt]}</span>
                      )}
                    </span>
                    {counts && counts[opt] !== undefined && (
                      <span className="programs-modal-count">{counts[opt]}</span>
                    )}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <footer className="programs-modal-foot">
          <button className="programs-modal-clear" onClick={clearDraft} disabled={draft.length === 0}>
            Reset
          </button>
          <button className="btn btn-filled programs-modal-apply" onClick={() => onApply(draft)}>
            Show {draft.length === 0 ? "all" : `${draft.length} selected`}
          </button>
        </footer>
      </div>
    </div>
  );
}

// "Double Dawgs" link, shown after a short lead-in below a participating
// program's description. Opens the Double Dawgs modal. The aria-label adds the
// program name so otherwise-identical links are distinguishable out of context
// (e.g. a screen reader's element list) while keeping the visible text in the
// accessible name (WCAG 2.5.3).
function DoubleDawgsNote({ programName, onClick }) {
  return (
    <span className="dd-note-line">
      This program is part of{" "}
      <button
        type="button"
        className="dd-note"
        onClick={onClick}
        aria-label={`Double Dawgs pairings for ${programName}`}
      >Double Dawgs</button>.
    </span>
  );
}

// Explains the program, lists every pairing this program belongs to, and links
// out. Mirrors FilterModal's focus/escape/scroll-lock behavior.
function DoubleDawgsModal({ program, pairs, intro, url, onClose }) {
  const closeRef = useRefPR(null);
  // Double Dawgs wordmark. Resolve the path like _shared.jsx does, so it works
  // from the standalone /sections/ page and a composed root page alike.
  const logoSrc = window.location.pathname.includes("/sections/")
    ? "../../uploads/NewDoubleDawgsLogo.png"
    : "uploads/NewDoubleDawgsLogo.png";

  useEffectPR(() => {
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

  return (
    <div className="programs-modal-backdrop" onClick={onClose}>
      <div
        className="programs-modal dd-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dd-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="programs-modal-head">
          <div className="programs-modal-titles">
            <h2 id="dd-modal-title" className="dd-modal-title">
              <img
                className="dd-modal-logo"
                src={logoSrc}
                alt="Double Dawgs — The University of Georgia Advantage"
              />
            </h2>
          </div>
          <button ref={closeRef} className="programs-modal-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6l-6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <div className="programs-modal-body dd-modal-body">
          <p className="dd-intro">{intro}</p>
          <h3 className="dd-pairs-title">Double Ag Dawg Programs with {program.name}</h3>
          <ul className="dd-pairs">
            {pairs.map(label => {
              const at = label.indexOf(" / ");
              const bach = at === -1 ? label : label.slice(0, at);
              const mast = at === -1 ? "" : label.slice(at + 3);
              return (
                <li key={label} className="dd-pair">
                  {mast && <span className="dd-pair-brace" aria-hidden="true" />}
                  <span className="dd-pair-degs">
                    <span className="dd-pair-deg">{bach}</span>
                    {mast && (
                      <>
                        <span className="sr-only"> paired with </span>
                        <span className="dd-pair-deg">{mast}</span>
                      </>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <footer className="programs-modal-foot dd-modal-foot">
          <a className="btn btn-filled dd-modal-link" href={url}>Learn more about Double Dawgs</a>
        </footer>
      </div>
    </div>
  );
}
