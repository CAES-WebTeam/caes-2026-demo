/* global React */
// ============ Pattern — Closing CTA band ============
window.ClosingCTA = function ClosingCTA() {
  return (
    <section className="cta">
      <div className="container cta-inner">
        <div className="cta-copy">
          <h2>Ready to grow your future?</h2>
          <hr className="red-rule" />
          <p>Bring your curiosity about how things grow — we'll give you the greenhouses, the labs, and the mentors to turn it into a career.</p>
        </div>
        <div className="cta-ctas">
          <a href="#" className="btn btn-white">Apply to UGA</a>
          <a href="#" className="btn btn-outline-white">Plan your visit</a>
        </div>
      </div>
    </section>
  );
};
