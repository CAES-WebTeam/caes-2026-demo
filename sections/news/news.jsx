/* global React */
// ============ Latest News ============
// Asymmetric layout: one large feature story (left) + 3 stacked story rows (right).
window.LatestNews = function LatestNews() {
  const feature = {
    cat: "Research",
    date: "Mar 14, 2026",
    title: "CAES scientists develop drought-resistant peanut variety set for 2027 release",
    blurb: "After eight years of field trials across Georgia, the new line shows 22% higher yields under water stress — a potential game-changer for the state's $700M peanut industry.",
    img: window.IMG.research,
  };
  const stories = [
    { cat: "Extension", date: "Mar 12, 2026", title: "Spring planting forecast: what to expect across Georgia's seven climate zones", img: window.IMG.field },
    { cat: "Students",  date: "Mar 09, 2026", title: "Graduate student earns USDA fellowship for cover-crop research in the Southeast", img: window.IMG.classroom },
    { cat: "Alumni",    date: "Mar 06, 2026", title: "From CAES to Capitol Hill: Class of '08 alum confirmed as USDA Deputy Secretary", img: window.IMG.campus },
    { cat: "Research",  date: "Mar 03, 2026", title: "New study reveals the impact of climate change on Georgia's agricultural sector", img: window.IMG.research },
    { cat: "Extension", date: "Mar 01, 2026", title: "New guidelines for sustainable farming practices in Georgia", img: window.IMG.field }
  ];

  return (
    <section className="news bg-dotted">
      <div className="container">
        <div className="news-head">
          <div>
            <h2 id="news-heading">Latest News</h2>
          </div>
          <a href="#" className="link-arrow">All CAES news →</a>
        </div>

        <div className="news-grid">
          <article className="news-feature">
            <div className="news-feature-img">
              <img src={feature.img} alt="" loading="lazy" />
            </div>
            <div className="news-feature-body">
              <h3 className="news-feature-title"><a href="#" className="card-link">{feature.title}</a></h3>
              <p className="news-feature-blurb">{feature.blurb}</p>
              <div className="news-meta">
                <span className="news-cat">{feature.cat}</span>
                <span className="news-date">{feature.date}</span>
              </div>
              {/* <span className="link-arrow" aria-hidden="true">Read story →</span> */}
            </div>
          </article>

          <ol className="news-list">
            {stories.map((s, i) => (
              <li key={i}>
                <article className="news-row">
                  <div className="news-row-img"><img src={s.img} alt="" loading="lazy" /></div>
                  <div className="news-row-body">
                    <h3 className="news-row-title"><a href="#" className="card-link">{s.title}</a></h3>
                    <div className="news-meta">
                      <span className="news-cat">{s.cat}</span>
                      <span className="news-date">{s.date}</span>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
