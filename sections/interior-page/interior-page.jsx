/* global React */
// ============ Interior page (no section rail) ============
// The base interior page — no section rail (the main nav covers where it sits).
// Zones:
//   1. header band     (breadcrumb · H1 · one-line intro)
//   2. body shell      (intro text + a video, side by side)
//   3. full-width zone  (per-page blocks past the intro — here, a news feed)
//   4. section footer   (full-width; repeatable, section-wide content)
// For the variant that adds a section rail, see interior-page-sidebar.
// Demo content: the "Food Science and Technology" research page.
window.InteriorPage = function InteriorPage() {
  const IMG = window.IMG;

  // The section's navigation — parent (overview) + sibling pages, Title Cased.
  const SECTION = {
    label: "Research Areas",
    href: "#",
    pages: [
      { label: "Agricultural and Applied Economics", href: "#" },
      { label: "Agricultural Leadership, Education and Communication", href: "#" },
      { label: "Animal and Dairy Science", href: "#" },
      { label: "Crop and Soil Sciences", href: "#" },
      { label: "Entomology", href: "#" },
      { label: "Food Science and Technology", href: "#", current: true },
      { label: "Horticulture", href: "#" },
      { label: "Plant Pathology", href: "#" },
      { label: "Poultry Science", href: "#" },
    ],
  };

  const TOPICS = ["Food Safety", "Nutrition and Quality", "Food Science Advances", "Impacts for Consumer Behavior"];

  // Per-page full-width content (example: news featuring this research).
  const STORIES = [
    { cat: "Food Safety", title: "New rapid test detects listeria in produce within hours", date: "May 2026", img: IMG.research },
    { cat: "Nutrition", title: "Study links fermented foods to measurable gut-health gains", date: "Apr 2026", img: IMG.classroom },
    { cat: "Innovation", title: "Lab scales up plant-based protein from Georgia peanuts", date: "Mar 2026", img: IMG.greenhouse },
  ];

  const DEPARTMENTS = [
    "Department of Food Science and Technology",
    "Center for Food Safety",
    "Department of Horticulture",
    "Department of Plant Pathology",
    "Department of Crop and Soil Sciences",
    "Department of Animal and Dairy Science",
    "Department of Poultry Science",
    "Department of Agricultural Leadership, Education and Communication",
    "Department of Agricultural and Applied Economics",
  ];

  return (
    <main className="ip" id="main">

      {/* ---------- 1. Header band — title + an "explore other areas" dropdown on the right ---------- */}
      <header className="ip-header">
        <div className="container ip-header-inner">
          <div className="ip-header-main">
            <nav className="ip-breadcrumb" aria-label="Breadcrumb">
              <a href="#">Research</a>
              <span aria-hidden="true">/</span>
              <a href="#">Research Areas</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Food Science and Technology</span>
            </nav>
            <h1>Food Science and Technology Research</h1>
            <p className="ip-intro">Safeguarding the safety, quality, and innovation of the food supply — from the farm to the table.</p>
          </div>
        </div>
      </header>

      {/* ---------- 2. Body shell ---------- */}
      <div className="container ip-shell">
        <div className="ip-content">
          <p>At UGA, researchers are striving to supply not only an abundance of food for a growing population, but to ensure the safety and quality of that food supply. Faculty discover new ways to minimize pathogens, increase safety practices, and bring innovative products to market by exploring the following topics:</p>

          <ul>
            {TOPICS.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>

        {/* Video sits to the right of the introduction text */}
        <figure className="ip-intro-media">
          <div className="ip-video">
            <iframe src="https://www.youtube.com/embed/bAItn6MSLoc" title="What is Food Science and Technology?" allow="encrypted-media" allowFullScreen></iframe>
          </div>
          <figcaption className="ip-video-caption">Learn more about our research in Food Science and Technology.</figcaption>
        </figure>
      </div>

      {/* ---------- Per-page full-width zone — full-width blocks past the intro (here: a news feed) ---------- */}
      <section className="ip-fullwidth">
        <div className="container">
          <div className="ip-feed-head">
            <h2>Food Science in the News</h2>
            <a className="link-arrow" href="#">All Food Science news →</a>
          </div>
          <ul className="ip-feed">
            {STORIES.map((s) => (
              <li className="ip-story" key={s.title}>
                <span className="ip-story-img"><img src={s.img} alt="" loading="lazy" /></span>
                <h3 className="ip-story-title"><a href="#" className="card-link">{s.title}</a></h3>
                <div className="ip-story-meta">
                  <span className="ip-story-cat">{s.cat}</span>
                  <span className="ip-story-date">{s.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- 4. Section footer band — repeatable, section-wide content ---------- */}
      <section className="ip-band">
        <div className="container ip-band-grid">
          <div className="ip-band-mod">
            <h2 className="ip-band-title">Follow CAES for Research Updates</h2>
            <div className="ip-social">
              <a href="#" aria-label="Connect on Facebook"><svg viewBox="0 0 512 512" aria-hidden="true"><path d="M211.9 197.4h-36.7v59.9h36.7V433.1h70.5V256.5h49.2l5.2-59.1h-54.4c0 0 0-22.1 0-33.7 0-13.9 2.8-19.5 16.3-19.5 10.9 0 38.2 0 38.2 0V82.9c0 0-40.2 0-48.8 0 -52.5 0-76.1 23.1-76.1 67.3C211.9 188.8 211.9 197.4 211.9 197.4z" /></svg></a>
              <a href="#" aria-label="Connect on X"><svg viewBox="-2 0 30 30" aria-hidden="true"><path d="M18.1,8.5H21l-6.3,7.2l7.4,9.8h-5.8l-4.5-5.9l-5.2,5.9H3.7l6.7-7.7L3.4,8.5h5.9l4.1,5.4L18.1,8.5z M17.1,23.8h1.6L8.4,10.1H6.7L17.1,23.8z" /></svg></a>
              <a href="#" aria-label="Connect on Instagram"><svg viewBox="0 0 512 512" aria-hidden="true"><path d="M256 109.3c47.8 0 53.4 0.2 72.3 1 17.4 0.8 26.9 3.7 33.2 6.2 8.4 3.2 14.3 7.1 20.6 13.4 6.3 6.3 10.1 12.2 13.4 20.6 2.5 6.3 5.4 15.8 6.2 33.2 0.9 18.9 1 24.5 1 72.3s-0.2 53.4-1 72.3c-0.8 17.4-3.7 26.9-6.2 33.2 -3.2 8.4-7.1 14.3-13.4 20.6 -6.3 6.3-12.2 10.1-20.6 13.4 -6.3 2.5-15.8 5.4-33.2 6.2 -18.9 0.9-24.5 1-72.3 1s-53.4-0.2-72.3-1c-17.4-0.8-26.9-3.7-33.2-6.2 -8.4-3.2-14.3-7.1-20.6-13.4 -6.3-6.3-10.1-12.2-13.4-20.6 -2.5-6.3-5.4-15.8-6.2-33.2 -0.9-18.9-1-24.5-1-72.3s0.2-53.4 1-72.3c0.8-17.4 3.7-26.9 6.2-33.2 3.2-8.4 7.1-14.3 13.4-20.6 6.3-6.3 12.2-10.1 20.6-13.4 6.3-2.5 15.8-5.4 33.2-6.2C202.6 109.5 208.2 109.3 256 109.3M256 77.1c-48.6 0-54.7 0.2-73.8 1.1 -19 0.9-32.1 3.9-43.4 8.3 -11.8 4.6-21.7 10.7-31.7 20.6 -9.9 9.9-16.1 19.9-20.6 31.7 -4.4 11.4-7.4 24.4-8.3 43.4 -0.9 19.1-1.1 25.2-1.1 73.8 0 48.6 0.2 54.7 1.1 73.8 0.9 19 3.9 32.1 8.3 43.4 4.6 11.8 10.7 21.7 20.6 31.7 9.9 9.9 19.9 16.1 31.7 20.6 11.4 4.4 24.4 7.4 43.4 8.3 19.1 0.9 25.2 1.1 73.8 1.1s54.7-0.2 73.8-1.1c19-0.9 32.1-3.9 43.4-8.3 11.8-4.6 21.7-10.7 31.7-20.6 9.9-9.9 16.1-19.9 20.6-31.7 4.4-11.4 7.4-24.4 8.3-43.4 0.9-19.1 1.1-25.2 1.1-73.8s-0.2-54.7-1.1-73.8c-0.9-19-3.9-32.1-8.3-43.4 -4.6-11.8-10.7-21.7-20.6-31.7 -9.9-9.9-19.9-16.1-31.7-20.6 -11.4-4.4-24.4-7.4-43.4-8.3C310.7 77.3 304.6 77.1 256 77.1L256 77.1z" /><path d="M256 164.1c-50.7 0-91.9 41.1-91.9 91.9s41.1 91.9 91.9 91.9 91.9-41.1 91.9-91.9S306.7 164.1 256 164.1zM256 315.6c-32.9 0-59.6-26.7-59.6-59.6s26.7-59.6 59.6-59.6 59.6 26.7 59.6 59.6S288.9 315.6 256 315.6z" /><circle cx="351.5" cy="160.5" r="21.5" /></svg></a>
            </div>
          </div>

          <div className="ip-band-mod">
            <h2 className="ip-band-title">UGA Departments and Centers</h2>
            <ul className="ip-deptlinks">
              {DEPARTMENTS.map((d) => <li key={d}><a href="#">{d}</a></li>)}
            </ul>
          </div>
        </div>
      </section>

    </main>
  );
};
