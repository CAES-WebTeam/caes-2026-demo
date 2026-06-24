/* global React */
// ============ Pattern — Connect / get in touch ============
// Department-promo card + learn-more link, then profile (contact) cards.
window.ConnectBlock = function ConnectBlock(props) {
  const { id, tint } = props || {};
  const IMG = window.IMG;
  const ADVISOR = {
    name: "Debbie Hargrave",
    role: "Academic Advisor",
    office: "Office of the Associate Dean for Academic and Faculty Affairs",
    email: "dbh88132@uga.edu",
    phone: "706-542-1205",
    address: "3117 Miller Plant Science · 120 Carlton St., Athens, GA 30602",
  };
  return (
    <section className={`connect${tint ? " connect--tint" : ""}`} id={id}>
      <div className="container">
        <h2 className="section-kicker">Connect</h2>
        <p className="section-display">Learn more and get in touch.</p>

        <div className="connect-learn">
          <a href="#" className="connect-dept-card">
            <span className="connect-dept-title">Visit the Department of Horticulture</span>
            <span className="connect-dept-arrow" aria-hidden="true">→</span>
          </a>
          {/* <a href="#" className="connect-learn-link">
            Read student testimonials
            <span aria-hidden="true">→</span>
          </a> */}
        </div>

        <div className="connect-grid">
          {["Prospective students", "Current students"].map((tag) => (
            <div className="contact-card" key={tag}>
              <span className="contact-tag">{tag}</span>
              <div className="contact-person">
                <span className="contact-avatar" aria-hidden="true"><img src={IMG.classroom} alt="" loading="lazy" /></span>
                <div>
                  <h3 className="contact-name">{ADVISOR.name}</h3>
                  <p className="contact-role">{ADVISOR.role}</p>
                </div>
              </div>
              <p className="contact-office">{ADVISOR.office}</p>
              <ul className="contact-links">
                <li><a href={`mailto:${ADVISOR.email}`}>{ADVISOR.email}</a></li>
                <li><a href={`tel:+1${ADVISOR.phone.replace(/[^0-9]/g, "")}`}>{ADVISOR.phone}</a></li>
              </ul>
              <p className="contact-address">{ADVISOR.address}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
