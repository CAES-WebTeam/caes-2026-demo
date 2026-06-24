/* global React */
// ============ Pattern — Detail hero ============
// Dark page-top metadata header: breadcrumb, title, department, facts, CTAs,
// and a decorative photo faded in on the right.
window.DetailHero = function DetailHero() {
  const IMG = window.IMG;
  const FACTS = [
    { label: "Degree", value: "B.S.A." },
    { label: "Department", value: "Horticulture" },
    { label: "Available at", value: "Athens" },
  ];
  return (
    <header className="dh has-header-photo">
      <div className="header-photo" aria-hidden="true"><img src={IMG.greenhouse} alt="" /></div>
      <div className="dh-inner">
        <div className="dh-copy">
          <nav className="dh-breadcrumb" aria-label="Breadcrumb">
            <a href="#">Academics</a>
            <span aria-hidden="true">/</span>
            <a href="#">Degrees and Programs</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Horticulture</span>
          </nav>
          <h1 className="dh-title">Horticulture</h1>
          <p className="eyebrow">Undergraduate Major</p>
          {/* <p className="dh-dept">Department of Horticulture</p> */}
          <p className="dh-lead">
            Horticulture is at the nexus of many of the solutions to the problems facing the world
            today — and the starting point for a career that will stay with you wherever you go.
          </p>
          <dl className="dh-facts">
            {FACTS.map((f) => (
              <div className="dh-fact" key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
            ))}
          </dl>
          <div className="dh-ctas">
            <a href="#" className="btn btn-filled">Apply to UGA</a>
            <a href="#" className="btn btn-outline-white">Plan your visit</a>
          </div>
        </div>
      </div>
    </header>
  );
};
