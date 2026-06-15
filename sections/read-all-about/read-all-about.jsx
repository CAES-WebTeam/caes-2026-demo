/* global React */
// ============ Read All About CAES ============
// Compact red call-out strip — heading + flavor text left, 4 white pill buttons in a row on the right.
window.ReadAllAbout = function ReadAllAbout() {
  return (
    <section className="raac">
      <div className="container">
        <div className="raac-inner">
          <div className="raac-copy">
            <h2 id="raac-heading" className="raac-head">Read all about CAES</h2>
            <p className="raac-sub">From breaking news to long-form magazine features, explore everything we're publishing.</p>
          </div>
          <div className="raac-ctas">
            <a href="#" className="btn btn-white">All News</a>
            <a href="#" className="btn btn-white">View Expert Resources</a>
            <a href="#" className="btn btn-white">View Magazine</a>
            <a href="#" className="btn btn-white">Annual Report</a>
          </div>
        </div>
      </div>
    </section>
  );
};
