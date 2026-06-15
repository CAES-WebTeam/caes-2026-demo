/* global React */
// ============ Pattern — Two-up info cards ============
window.InfoCards = function InfoCards(props) {
  const { id, tint } = props || {};
  return (
    <section className={`infocards${tint ? " infocards--tint" : ""}`} id={id}>
      <div className="container">
        <h2 className="section-kicker">Paying for college</h2>
        <p className="section-display">How do I pay for college?</p>
        <div className="infocards-grid">
          <div className="infocard">
            <h3 className="infocard-title">Scholarships</h3>
            <p>
              Each year, CAES awards scholarships to students in our majors, and the department offers
              work-study opportunities through Financial Aid. Many students also find part-time work
              assisting faculty research or at nearby greenhouses, nurseries, and farms.
            </p>
            <a href="#" className="link-arrow">Explore CAES scholarships →</a>
          </div>
          <div className="infocard">
            <h3 className="infocard-title">Financial aid</h3>
            <p>
              For deadlines and eligibility requirements, start with the University of Georgia Office
              of Student Financial Aid. They'll help you map grants, loans, and work-study to your
              situation.
            </p>
            <a href="#" className="link-arrow">Visit the Office of Student Financial Aid →</a>
          </div>
        </div>
      </div>
    </section>
  );
};
