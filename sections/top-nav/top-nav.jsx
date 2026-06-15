/* global React */
// ============ Top Nav (CAES masthead) ============
// Sits below the UGA global bar. Lockup left, primary nav right, search far right.
// Each nav item opens a mega-flyout below the bar; on mobile (<=980px) a hamburger
// opens an off-canvas drawer with accordion sub-menus.
window.TopNav = function TopNav() {
  const { useState, useEffect } = React;
  const Brand = window.Brand;
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  const NAV = [
    { label: "About", panels: [
      { heading: "About CAES",   links: ["History", "Campuses", "Our People", "Administration & Leadership", "Administrative Offices & Support Units", "Jobs at CAES"] },
      { heading: "Departments",  links: ["Agricultural and Applied Economics", "Agricultural Leadership, Education and Communication", "Animal and Dairy Science", "Crop and Soil Sciences", "Entomology", "Food Science and Technology", "Horticulture", "Plant pathology", "Poultry science"] },
      { heading: "News",         links: ["News and stories", "Expert resources", "Almanac magazine", "Cultivating Curiosity podcast"] },
      { heading: "Events",       links: ["D.W. Brooks Lecture and Awards", "Georgia Ag Forecast", "Ag Dawg Kickoff", "UGA CAES Alumni Association Awards", "Flavor of Georgia", "See full events calendar"] },
    ]},
    { label: "Academics", panels: [
      { heading: "Academics",    links: ["Degrees and programs", "Experiential learning", "Study abroad", "Scholarships and funding", "Admissions"] },
      { heading: "Student life", links: ["CAES experience", "Prospective students", "Clubs and student organizations", "Transfer to CAES", "Career resources"] },
    ]},
    { label: "Research", panels: [
      { heading: "Our Experts",     links: [] },
      { heading: "Research Areas",  links: ["Agricultural and applied economics", "Agricultural leadership, education and communication", "Animal and dairy science", "Crop and soil sciences", "Entomology", "Food science and technology", "Horticulture", "Plant pathology", "Poultry science"] },
      { heading: "Where We Work",   links: ["Research and Education Centers", "Centers, institutes and labs", "Plant growth facilities", "Global initiatives"] },
      { heading: "Our Impact",      links: ["Land-grant impacts", "Research impact"] },
      { heading: "Partner With Us", links: ["Industry Partnerships", "Innovation Gateway", "Innovation District"] },
    ]},
    { label: "Extension", panels: [
      { heading: "Extension", links: ["UGA Extension", "Georgia 4-H", "Expert resources", "Extension experts", "Find your county agent", "Commodity teams"] },
    ]},
    { label: "Alumni", panels: [
      { heading: "Get Connected", links: ["Update Your Information", "Alumni Newsletter", "Departmental Newsletters"] },
      { heading: "Get Involved",  links: ["Join the CAES Alumni Association", "Become a mentor", "Hire an Ag Dawg", "Attend an event"] },
      { heading: "Awards",        links: ["CAES Alumni Awards", "Georgia Agricultural Hall of Fame"] },
      { heading: "Giving",        links: ["CAES Student Emergency Fund", "Support a CAES Fund", "Buy a Brick"] },
    ]},
  ];

  // Esc closes both desktop flyout and mobile drawer
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { setOpenMenu(null); setMobileOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const Caret = () => (
    <svg className="tn-caret" viewBox="0 0 10 6" aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const SearchIcon = () => (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M14 14l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );

  const active = NAV.find(n => n.label === openMenu);
  // Small menus (≤2 columns) render as an inline dropdown anchored to the trigger.
  // Larger menus stay in the full-width mega panel below the bar.
  const isAnchored = (item) => item.panels.length <= 2;
  const megaActive = active && !isAnchored(active);

  return (
    <div className="top-nav" onMouseLeave={() => setOpenMenu(null)}>
      <div className="wide-width top-nav-inner">
        <Brand height={56} />
        <nav className="tn-nav" aria-label="Primary">
          <ul className="tn-list">
            {NAV.map(item => (
              <li key={item.label} className={`tn-item ${openMenu === item.label ? "is-open" : ""}`}>
                <a
                  href="#"
                  className="tn-link"
                  aria-haspopup="true"
                  aria-expanded={openMenu === item.label}
                  onMouseEnter={() => setOpenMenu(item.label)}
                  onFocus={() => setOpenMenu(item.label)}>
                  {item.label} <Caret />
                </a>
                {isAnchored(item) && (
                  <div
                    className={`tn-dropdown ${openMenu === item.label ? "is-open" : ""}`}
                    role="region"
                    aria-label={`${item.label} submenu`}
                    aria-hidden={openMenu !== item.label}>
                    {item.panels.map(col => (
                      <div className="tn-col" key={col.heading}>
                        <p className="tn-col-head">{col.heading}</p>
                        {col.links.length > 0 && (
                          <ul className="tn-col-list">
                            {col.links.map(l => (
                              <li key={l}>
                                <a href="#" className="tn-col-link" onClick={() => setOpenMenu(null)}>{l}</a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="tn-hamburger"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <button className="tn-search" aria-label="Search">
          <SearchIcon />
        </button>
      </div>

      {/* Desktop mega-menu — full-width panel for menus with 3+ columns. */}
      <div className={`tn-panel ${megaActive ? "is-open" : ""}`} role="region" aria-label="Submenu">
        {megaActive && (
          <div className="wide-width tn-panel-inner">
            {active.panels.map(col => (
              <div className="tn-col" key={col.heading}>
                <p className="tn-col-head">{col.heading}</p>
                {col.links.length > 0 && (
                  <ul className="tn-col-list">
                    {col.links.map(l => (
                      <li key={l}>
                        <a href="#" className="tn-col-link" onClick={() => setOpenMenu(null)}>{l}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="tn-drawer" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="tn-drawer-head">
            <Brand height={56} />
            <button className="tn-drawer-close" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
              <svg viewBox="0 0 16 16" aria-hidden="true">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <ul className="tn-drawer-list">
            {NAV.map(item => (
              <li key={item.label} className={`tn-drawer-item ${mobileExpanded === item.label ? "is-expanded" : ""}`}>
                <button
                  className="tn-drawer-link"
                  aria-expanded={mobileExpanded === item.label}
                  onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}>
                  <span>{item.label}</span>
                  <Caret />
                </button>
                <div className="tn-drawer-sub">
                  {item.panels.map(col => (
                    <div className="tn-drawer-col" key={col.heading}>
                      <p className="tn-drawer-col-head">{col.heading}</p>
                      {col.links.length > 0 && (
                        <ul className="tn-drawer-col-list">
                          {col.links.map(l => (
                            <li key={l}>
                              <a href="#" className="tn-drawer-col-link" onClick={() => setMobileOpen(false)}>{l}</a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
