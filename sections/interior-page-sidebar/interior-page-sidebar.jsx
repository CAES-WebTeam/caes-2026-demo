/* global React, CollapsibleNav */
// ============ Interior page WITH SIDEBAR (content + right section rail) ============
// The default treatment for an evergreen page nested inside a section.
//   Header band → content + RIGHT section rail → full-width on-page zone →
//   full-width section footer.
// The rail lists the page's DIRECT PARENT and that parent's child pages (this
// page's siblings) only — it never shows the parent's own siblings or climbs
// higher. Breadcrumbs handle moving back up the tree, so the rail stays short.
// (Reuses interior-page.css for the shared header / content / zones / footer.)
// Mockup uses generic, self-documenting copy.
window.InteriorPageSidebar = function InteriorPageSidebar() {
  // The current page's DIRECT PARENT + its child pages (current page's siblings).
  const SECTION = {
    label: "Parent Section",
    href: "#",
    pages: [
      { label: "Section Overview", href: "#" },
      { label: "A Sibling Page", href: "#" },
      { label: "Current Page", href: "#", current: true },
      { label: "Another Sibling Page", href: "#" },
      { label: "One More Sibling Page", href: "#" },
    ],
  };

  return (
    <main className="ip" id="main">

      {/* ---------- Header band ---------- */}
      <header className="ip-header">
        <div className="container">
          {/* Breadcrumb carries the full path — that's what moves you back UP a level */}
          <nav className="ip-breadcrumb" aria-label="Breadcrumb">
            <a href="#">Home</a>
            <span aria-hidden="true">/</span>
            <a href="#">Top-Level Section</a>
            <span aria-hidden="true">/</span>
            <a href="#">Parent Section</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Current Page</span>
          </nav>
          <h1>Standard Interior Page</h1>
          <p className="ip-intro">A page nested inside a section, with a navigation rail to its sibling pages on the right.</p>
        </div>
      </header>

      {/* ---------- Body shell: content (left) + section rail (right) ---------- */}
      <div className="container sp-shell">
        <div className="ip-content">
          <p>This is the default treatment for an evergreen page that lives under a section. The body reads in a single column at a comfortable measure, and the rail on the right lists the pages alongside this one so visitors can move laterally without going back to the main navigation.</p>

          <h2>How the section rail works</h2>
          <p>The rail shows this page's <strong>direct parent</strong> ("Parent Section") and that parent's child pages — the current page's siblings — and nothing more. It deliberately does not show the parent's own siblings or climb further up the tree. Moving back up the hierarchy is the breadcrumb's job, which keeps the rail short and scoped to exactly where you are.</p>

          <p>Text blocks hold a reading measure; media and embeds may run the full width of this column. Below the shell, the page can add a full-width on-page area and a full-width section footer (shown beneath).</p>
        </div>

        {/* Section rail — direct parent + sibling pages; boxed on desktop, a disclosure on mobile */}
        <CollapsibleNav
          className="sp-sidebar"
          ariaLabel="In this section"
          breakpoint="(min-width: 901px)"
          bodyId="sp-section-nav"
          toggleCap="In This Section"
          toggleCurrent={SECTION.label}
          header={(
            <div className="sp-nav-head">
              <a className="sp-nav-head-name" href={SECTION.href}>{SECTION.label}</a>
            </div>
          )}
        >
          <ul className="ip-nav-list">
            {SECTION.pages.map((p) => (
              <li key={p.label}>
                <a href={p.href} className={p.current ? "is-current" : ""} aria-current={p.current ? "page" : undefined}>{p.label}</a>
              </li>
            ))}
          </ul>
        </CollapsibleNav>
      </div>

      {/* ---------- Full-width on-page area (per-page; optional) ---------- */}
      <section className="ip-fullwidth">
        <div className="container">
          <div className="ip-feed-head"><h2>Full-width on-page area</h2></div>
          <p className="sp-note">Optional, per-page. Drop full-width blocks here — a news feed, gallery, stat row, or CTA — for content that should break out of the two-column shell above. It spans the full content width.</p>
          <div className="sp-blocks">
            <div className="sp-block">Full-width block</div>
            <div className="sp-block">Full-width block</div>
            <div className="sp-block">Full-width block</div>
          </div>
        </div>
      </section>

      {/* ---------- Full-width section footer (section-wide; repeats across the section) ---------- */}
      <section className="ip-band">
        <div className="container ip-band-grid">
          <div className="ip-band-mod">
            <h2 className="ip-band-title">Section footer area</h2>
            <p className="sp-note" style={{ margin: 0 }}>Section-wide content repeated on every page in this section — related links, contacts, social, or a CTA. Defined once for the section, not per page.</p>
          </div>
          <div className="ip-band-mod">
            <h2 className="ip-band-title">Another footer module</h2>
            <ul className="ip-deptlinks">
              <li><a href="#">Related link one</a></li>
              <li><a href="#">Related link two</a></li>
              <li><a href="#">Related link three</a></li>
              <li><a href="#">Related link four</a></li>
            </ul>
          </div>
        </div>
      </section>

    </main>
  );
};
