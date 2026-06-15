/* global React */
const { useState: useStateSL } = React;

// ============ Tabbed feature section (Student Life pattern) ============
// Tabbed accordion: click a row → expands with a paragraph; a feature image
// tracks the active row on the right. Content is overridable per use; defaults
// are the homepage "Student Life" set. Pass a unique `id` when more than one
// instance appears on a page (it namespaces the heading/panel ids).
window.StudentLife = function StudentLife(props) {
  props = props || {};
  const id = props.id || "sl";
  const heading = props.heading || "Student Life";
  const lede = props.lede || "CAES offers world-class immersive learning experiences, including internships, research opportunities and study abroad programs. Unlock your true potential at UGA.";
  const items = props.items || [
    { key: "majors", title: "Majors", img: window.IMG.classroom,
      body: "Twenty-seven undergraduate majors across the agricultural and environmental sciences — from agribusiness and biological engineering to plant biology, food science, and turfgrass. Find the discipline that fits where you want to take your career." },
    { key: "scholarships", title: "Scholarships", img: window.IMG.research,
      body: "More than $700,000 in scholarship awards each year, distributed across new and returning CAES students. From need-based aid to research stipends to first-in-family awards, financial support is built into your time here." },
    { key: "visit", title: "Schedule a Visit", img: window.IMG.campus,
      body: "Walk our campuses in Athens, Griffin, and Tifton. Sit in on a class, tour the labs and student farms, and talk to a current student over coffee. Visits run year-round — the best way to know if CAES is right for you is to come see." },
    { key: "apply", title: "Apply Now", img: window.IMG.greenhouse,
      body: "Applications for fall 2026 admission open in August. First-year, transfer, or graduate — our admissions team walks you through every step, from the application itself to scholarship review to enrollment day." },
  ];
  const [open, setOpen] = useStateSL(items[0].key);
  const headingId = id + "-heading";
  const panelId = id + "-panel";

  return (
    <section className={"student-life" + (props.tint ? " student-life--tint" : "")}>
      <div className="container">
        <div className="sl-body">
          <div className="sl-left">
            <div className="sl-head">
              <h2 id={headingId}>{heading}</h2>
              {lede && <p className="sl-lede">{lede}</p>}
            </div>

            <ul className="sl-list" role="tablist" aria-label={heading + " topics"}>
              {items.map(it => {
                const isOpen = it.key === open;
                return (
                  <li key={it.key} className={`sl-row ${isOpen ? "is-open" : ""}`}>
                    <button
                      role="tab"
                      aria-selected={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(it.key)}
                      className="sl-row-btn"
                    >
                      <span className="sl-row-title">{it.title}</span>
                      <span className="sl-row-icon" aria-hidden="true">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    <div className="sl-row-body" aria-hidden={!isOpen}>
                      <div className="sl-row-body-inner">
                        <p>{it.body}</p>
                        <a href={it.href || "#"} className="link-arrow" tabIndex={isOpen ? undefined : -1}>Learn more →</a>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="sl-image" id={panelId} role="tabpanel">
            {items.map(it => (
              <img
                key={it.key}
                src={it.img}
                alt=""
                className={it.key === open ? "is-active" : ""}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
