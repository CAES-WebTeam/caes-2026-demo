/* global React */
const { useState: useStatePD3, useEffect: useEffectPD3, useRef: useRefPD3 } = React;

// ============ Program Detail (Horticulture) ============
// Black title area carries the metadata with a decorative photo faded in on
// the right; a sticky horizontal "On this page" bar sits below it and tracks
// the active section as the reader scrolls. Content is full-width sections
// (alternating background bands) on a centered inner column.
window.ProgramDetailPage = function ProgramDetailPage() {
  const IMG = window.IMG;

  const SECTIONS = [
    { id: "about", label: "About" },
    { id: "coursework", label: "Coursework" },
    { id: "prepare", label: "How to Prepare" },
    { id: "hands-on", label: "Hands-On Learning" },
    { id: "careers", label: "Careers" },
    { id: "paying", label: "Paying for College" },
    { id: "faq", label: "FAQ" },
    { id: "connect", label: "Connect" },
  ];
  const [active, setActive] = useStatePD3("about");
  useEffectPD3(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const activeLabel = (SECTIONS.find((s) => s.id === active) || SECTIONS[0]).label;

  const PREPARE = [
    "Volunteer at a local community garden, school, park, or botanical garden.",
    "Take part in the Young Scholars Program, 4-H, FFA, or another related program.",
    "Work or volunteer at a farm, golf course, nursery, garden center, or similar enterprise.",
  ];

  const HANDS_ON = [
    "Run experiments in lab — collecting data and thinking critically.",
    "Take field trips to nearby farms, nurseries, and landscapes.",
    "Conduct independent research for credit with a faculty mentor.",
    "Grow plants in our greenhouses, plant vegetables at UGArden, and prune trees at our farm.",
    "Grow and sell vegetables and herbs in our entrepreneurship class.",
    "Learn growing and sales through the Horticulture Club's semi-annual plant sale.",
    "Serve the community in a service-learning course or through UGArden.",
    "Join one of many student clubs and organizations.",
    "Work an internship to build your résumé and decide your path.",
    "Study Away in another country — for a single course or a whole semester.",
  ];

  const JOBS = [
    "Botanical Garden, Arboretum & Community Garden Curator",
    "Plant, Seed, Chemical & Equipment Sales Representative",
    "Urban, Vertical, or Hydroponic Farm Manager/Operator",
    "Greenhouse, Nursery & Farm Manager/Operator",
    "Cooperative Extension & Government Specialist",
    "Fruit or Vegetable Farm Manager/Operator",
    "Native Plant Restoration Specialist",
    "Landscape Designer/Contractor",
    "Horticulture Instructor",
    "Floral Designer",
    "Plant Breeder",
  ];

  const OUTCOMES = [
    { value: 50, label: "Employed full-time" },
    { value: 25, label: "In internships" },
    { value: 13, label: "Attending graduate school" },
  ];

  return (
    <main className="pd3" id="main">
      {/* ---------- Title area (composed from the detail-hero pattern) ---------- */}
      <DetailHero />

      {/* ---------- Sticky "On this page" bar — strip on desktop, disclosure on mobile ---------- */}
      <CollapsibleNav
        className="pd3-subnav"
        innerClassName="pd3-subnav-inner"
        ariaLabel="On this page"
        breakpoint="(min-width: 761px)"
        bodyId="pd3-subnav-list"
        toggleCap="On This Page"
        toggleCurrent={activeLabel}
        header={<span className="pd3-subnav-label">On this page</span>}
        trailing={<a href="#" className="btn btn-filled pd3-subnav-apply">Apply</a>}
      >
        {({ close }) => (
          <ul>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={active === s.id ? "is-active" : ""} onClick={close}>{s.label}</a>
              </li>
            ))}
          </ul>
        )}
      </CollapsibleNav>

      {/* ---------- Content (full-width sections, centered inner) ---------- */}
      <div className="pd3-content">
        {/* About */}
        <section id="about" className="pd3-section">
          <div className="pd3-inner">
            <h2 className="section-kicker">About this major</h2>
            <p className="section-display">Horticulture is everywhere.</p>
            <div className="pd3-prose">
              <p>
                Horticulture is sustainably growing fruits, vegetables, and medicinal herbs to feed
                and heal a hungry population. It's rainwater harvesting, rain gardens, and hydroponics
                to conserve water in greenhouses, nurseries, and home landscapes. It's mapping genes,
                breeding, and cloning to help plants grow more efficiently, look prettier, and resist
                pests.
              </p>
              <p>
                It's using new technologies like LED lighting and environmental sensors to save
                energy and grow plants in new places — even outer space. It's preserving and
                protecting our native plant ecosystems, and brightening our days with fresh bouquets
                and colorful landscapes. And it's helping others, at home and around the world, who
                are less fortunate.
              </p>
            </div>
            <blockquote className="pd3-pull">
              A starting point for an exciting career and life-long pursuit — one that stays with you
              no matter where in the world you go, and whichever path your life takes.
            </blockquote>
            <figure className="pd3-section-fig"><img src={IMG.field} alt="" loading="lazy" /></figure>
          </div>
        </section>

        {/* Coursework (composed from the phase-cards pattern) */}
        <PhaseCards id="coursework" tint />

        {/* How to prepare */}
        <section id="prepare" className="pd3-section">
          <div className="pd3-inner">
            <h2 className="section-kicker">How to prepare</h2>
            <p className="section-display">Get a head start before you arrive.</p>
            <p className="pd3-intro">A few ways to build experience and confirm horticulture is for you:</p>
            <ol className="pd3-prep-grid" role="list">
              {PREPARE.map((p, i) => (
                <li className="pd3-prep-card" key={i}>
                  <span className="pd3-prep-num" aria-hidden="true">{i + 1}</span>
                  <p>{p}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Hands-on learning */}
        <section id="hands-on" className="pd3-section pd3-section--tint">
          <div className="pd3-inner">
            <h2 className="section-kicker">Hands-on learning</h2>
            <p className="section-display">In horticulture classes, you will…</p>
            <ul className="pd3-checklist" role="list">
              {HANDS_ON.map((item, i) => (
                <li key={i}>
                  <span className="pd3-check" aria-hidden="true">
                    <svg viewBox="0 0 16 16"><path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <figure className="pd3-section-fig"><img src={IMG.classroom} alt="" loading="lazy" /></figure>
          </div>
        </section>

        {/* Careers */}
        <section id="careers" className="pd3-section">
          <div className="pd3-inner">
            <h2 className="section-kicker">Careers</h2>
            <p className="section-display">Where a horticulture degree can take you.</p>

            <h3 className="pd3-sub">Roles our graduates step into</h3>
            <ul className="pd3-jobs" role="list">
              {JOBS.map((job, i) => (
                <li key={i}><span className="pd3-job-dot" aria-hidden="true" />{job}</li>
              ))}
            </ul>

            <h3 className="pd3-sub pd3-sub-spaced">Class of 2023 career outcomes</h3>
            <div className="pd3-outcomes">
              {OUTCOMES.map((o) => (
                <div className="pd3-outcome" key={o.label}>
                  <span className="pd3-outcome-num">{o.value}%</span>
                  <span className="pd3-outcome-bar" aria-hidden="true">
                    <span style={{ width: `${o.value}%` }} />
                  </span>
                  <span className="pd3-outcome-label">{o.label}</span>
                </div>
              ))}
            </div>
            <p className="pd3-footnote">
              Full-time figure includes self-employed graduates. Source: UGA Career Outcomes Survey,
              Class of 2023. <a href="#" className="link-arrow pd3-footnote-link">Read detailed career outcomes →</a>
            </p>
          </div>
        </section>

        {/* Paying for college (composed from the info-cards pattern) */}
        <InfoCards id="paying" tint />

        {/* FAQ (composed from the faq pattern) */}
        <Faq id="faq" />

        {/* Connect (composed from the connect pattern) */}
        <ConnectBlock id="connect" tint />
      </div>

      {/* ---------- Closing CTA (composed from the closing-cta pattern) ---------- */}
      <ClosingCTA />
    </main>
  );
};
