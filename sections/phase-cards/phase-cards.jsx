/* global React */
// ============ Pattern — Phase / timeline cards ============
window.PhaseCards = function PhaseCards(props) {
  const { id, tint } = props || {};
  const PHASES = [
    { tag: "Years 1–2", title: "Science core", body: "Biology, chemistry, and the foundations every horticulturist builds on." },
    { tag: "Years 3–4", title: "Horticulture focus", body: "Upper-level horticulture coursework shaped around the direction you choose." },
  ];
  return (
    <section className={`phasecards${tint ? " phasecards--tint" : ""}`} id={id}>
      <div className="container">
        <h2 className="section-kicker">Coursework</h2>
        <p className="section-display">How your four years take shape.</p>
        <p className="phasecards-intro">
          You'll take mostly the basic science core for your first two years, then focus on
          horticulture courses for the rest of your degree.
        </p>
        <div className="phase-grid">
          {PHASES.map((p) => (
            <div className="phase" key={p.tag}>
              <span className="phase-tag">{p.tag}</span>
              <h3 className="phase-title">{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
        <a href="#" className="link-arrow">See full degree requirements →</a>
      </div>
    </section>
  );
};
