/* global React */
const { useState, useEffect, useRef } = React;

// ============ Hero (floating card over photo) ============
function Hero({ onMenu }) {
  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${IMG.hero})` }} role="img" aria-label="A CAES student tending plants in a Georgia research field" />
      <HeroNavPills onMenu={onMenu} />
      <div className="container hero-content">
        <div className="hero-card">
          <div className="hero-card-top">
            <Brand />
            <a href="#" className="btn">Support our students</a>
          </div>
          <h1>Cultivating a more fruitful world</h1>
          <hr className="red-rule" />
          <p className="hero-sub">From farms and labs to medical school and the halls of government, there's no shortage of places your CAES education can take you.</p>
          <p className="hero-sub italic">Visit our campuses in Athens, Griffin and Tifton.</p>
          <div className="hero-ctas">
            <a href="#" className="btn">Explore our programs</a>
            <a href="#" className="link-arrow">More about the college →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ Impact mosaic ============
function Impact() {
  return (
    <section className="section impact">
      <div className="wide-width">
        <div className="impact-intro">
          <h2 className="h-display">Georgia innovation. Global impact.</h2>
          <p>In the lab and in the field, CAES is advancing agricultural and environmental sciences across Georgia and beyond. Our students in Athens, Griffin and Tifton learn from researchers who are pioneering new methods, making discoveries and using cutting-edge technology to ensure the future of agriculture and the environment for generations to come.</p>
        </div>
        <div className="mosaic">
          <div className="mosaic-photo m-1" style={{ backgroundImage: `url(${IMG.campus})` }} role="img" aria-label="Students at UGA campus" />
          <div className="mosaic-stat m-2">
            <div className="num">$80.1M</div>
            <div className="lbl">New Research<br/>Awards</div>
          </div>
          <div className="mosaic-photo m-3" style={{ backgroundImage: `url(${IMG.greenhouse})` }} role="img" aria-label="Researchers in greenhouse" />
          <div className="mosaic-photo m-4" style={{ backgroundImage: `url(${IMG.field})` }} role="img" aria-label="CAES research field" />
          <div className="mosaic-stat m-5">
            <div className="num">$710,146</div>
            <div className="lbl">In Scholarship<br/>Awards in 2025</div>
          </div>
          <div className="mosaic-stat m-6">
            <div className="num">$899M</div>
            <div className="lbl">Economic Impact<br/>on State of Georgia</div>
          </div>
          <div className="mosaic-photo m-7" style={{ backgroundImage: `url(${IMG.classroom})` }} role="img" aria-label="CAES students in a classroom" />
        </div>
        <div className="mosaic-stat" style={{ textAlign: "center", marginTop: 28, padding: 20 }}>
          <div className="num" style={{ fontSize: "clamp(40px,3.6vw,56px)" }}>1,521</div>
          <div className="lbl">Undergraduate Students</div>
        </div>
        <div className="chips">
          <a className="chip" href="#">Undergraduate programs</a>
          <a className="chip" href="#">Graduate programs</a>
          <a className="chip" href="#">Extension and outreach</a>
          <a className="chip" href="#">News and events</a>
        </div>
      </div>
    </section>
  );
}

// ============ Announcement (Kaptiv8 — dismissible) ============
function Announcement() {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <div className="announcement" role="region" aria-label="Site announcement">
      <div className="announcement-inner">
        <span>Fall 2026 applications are open. <a href="#">Start your application</a> by November 15.</span>
      </div>
      <button className="announcement-close" onClick={() => setShow(false)} aria-label="Dismiss announcement">
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>
    </div>
  );
}

// ============ Student Life (Kaptiv8 accordion w/ image-swap) ============
const STUDENT_ITEMS = [
  { id: "life", label: "Student Life at CAES", img: IMG.classroom, body: "CAES offers world-class immersive learning experiences, including internships, research opportunities and study abroad programs across Athens, Griffin and Tifton." },
  { id: "majors", label: "Majors", img: IMG.field, body: "More than 25 majors and minors across nine departments — from Agribusiness and Animal Science to Environmental Resource Science and Turfgrass Management." },
  { id: "scholarships", label: "Scholarships", img: IMG.event1, body: "CAES awards more than $710K in scholarships each year. Apply once for hundreds of college, departmental and named awards." },
  { id: "visit", label: "Schedule a Visit", img: IMG.campus, body: "Tour our Athens, Griffin or Tifton campus. Meet faculty, sit in on a class, and walk the same paths our students walk every day." },
  { id: "apply", label: "Apply Now", img: IMG.greenhouse, body: "Ready to grow with us? Apply through the UGA undergraduate application or directly to a CAES graduate program." },
];
function StudentLife() {
  const [openIdx, setOpenIdx] = useState(0);
  const current = STUDENT_ITEMS[openIdx] || STUDENT_ITEMS[0];
  return (
    <section className="section studentlife">
      <div className="wide-width">
        <div className="events-head" style={{ textAlign: "left", marginBottom: 32 }}>
          <span className="eyebrow">Student Life</span>
          <h2 className="h-display" style={{ marginTop: 14 }}>Find your place at CAES.</h2>
        </div>
        <div className="studentlife-grid">
          <div className="acc-list">
            {STUDENT_ITEMS.map((it, i) => (
              <div key={it.id} className={`acc-item ${openIdx === i ? "is-open" : ""}`}>
                <button className="acc-trigger"
                  aria-expanded={openIdx === i}
                  onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                  onMouseEnter={() => setOpenIdx(i)}>
                  {it.label}
                  <span className="plus" aria-hidden="true" />
                </button>
                <div className="acc-panel">
                  <p>{it.body}</p>
                  <a href="#" className="btn">Learn more</a>
                </div>
              </div>
            ))}
          </div>
          <div className="studentlife-img" style={{ backgroundImage: `url(${current.img})` }} role="img" aria-label={current.label}>
            <span className="studentlife-img-label">{current.label}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ Read All About CAES strip (Kaptiv8) ============
function ReadAbout() {
  return (
    <section className="read-about">
      <div className="container read-about-inner">
        <div className="read-about-text">
          <h3>Read all about CAES.</h3>
          <p>News, magazines and reports from across the College.</p>
        </div>
        <div className="read-about-links">
          <a href="#">All News</a>
          <a href="#">View Publications</a>
          <a href="#">View Magazine</a>
          <a href="#">Annual Report</a>
        </div>
      </div>
    </section>
  );
}

// ============ Innovation Grows Here (Kaptiv8 closing CTA, Frankel-styled) ============
function Innovation() {
  return (
    <section className="innovation">
      <div className="container">
        <span className="eyebrow">Innovation Grows Here</span>
        <h2>Be a part of the<span className="accent">future of agriculture.</span></h2>
        <p>From the lab to the soil, CAES students, faculty and Extension agents are growing the future of agriculture, environment and life sciences across Georgia.</p>
        <div className="innovation-ctas">
          <a href="#" className="btn btn-white">Apply</a>
          <a href="#" className="btn btn-outline-white">Give</a>
        </div>
      </div>
    </section>
  );
}

// ============ Spotlight ============
const SPOTLIGHTS = [
  {
    eyebrow: "Community Development",
    title: "Community-driven agriculture grows more than just produce",
    body: "In Winterville, Georgia, a small market grew into a movement. Meet the people behind the Marigold Collective, where farmers, volunteers and neighbors band together to transform fresh food into shared growth.",
    img: IMG.spotlight,
  },
  {
    eyebrow: "Research",
    title: "How a CAES lab is helping Georgia farmers anticipate climate change",
    body: "A new partnership between CAES and the Georgia Climate Project pairs machine-learning models with on-the-ground field data to predict the next decade of growing conditions.",
    img: IMG.research,
  },
  {
    eyebrow: "Extension",
    title: "From the field to the table: rebuilding rural food systems in South Georgia",
    body: "UGA Extension agents and CAES alumni are partnering with county leaders to bring fresh food access — and economic opportunity — to underserved communities.",
    img: IMG.field,
  },
];

function Spotlight() {
  const [idx, setIdx] = useState(0);
  const s = SPOTLIGHTS[idx];
  return (
    <section className="spotlight">
      <div className="wide-width spotlight-inner">
        <article className="spotlight-card">
          <span className="eyebrow">{s.eyebrow}</span>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
          <a href="#" className="link-arrow">Read more »»</a>
        </article>
        <div className="spotlight-img" style={{ backgroundImage: `url(${s.img})` }} role="img" aria-label={s.title} />
      </div>
      <div className="spotlight-controls">
        <button onClick={() => setIdx((idx - 1 + SPOTLIGHTS.length) % SPOTLIGHTS.length)} aria-label="Previous story">
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 1L3 7l6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
        </button>
        <span className="spotlight-counter">{idx + 1} / {SPOTLIGHTS.length}</span>
        <button onClick={() => setIdx((idx + 1) % SPOTLIGHTS.length)} aria-label="Next story">
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M5 1l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
        </button>
      </div>
    </section>
  );
}

// ============ Newsletter strip ============
function Newsletter() {
  return (
    <section className="newsletter" aria-label="Newsletter signup">
      <div className="container">
        <h3>Sign up for more insights, discoveries and solutions.</h3>
        <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert("Thanks — you'll be the first to know."); }}>
          <input className="newsletter-input" type="email" placeholder="Enter your email" aria-label="Email address" required />
          <button className="newsletter-submit" aria-label="Subscribe" type="submit">
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </form>
      </div>
    </section>
  );
}

// ============ Featured research (overlapping card on photo) ============
const RESEARCHES = [
  {
    title: "Promising new stroke treatment is on his mind",
    body: "A team led by CAES researchers in regenerative bioscience is testing a small-molecule therapy that may protect brain tissue in the first hours after a stroke. Preclinical results have the lab racing to a clinical trial.",
    caption: "Director of UGA's Regenerative Bioscience Center, Steven Stice",
    img: IMG.research,
  },
  {
    title: "Mapping Georgia's pollinators, one county at a time",
    body: "A statewide entomology project is combining citizen-science observations with lab-based DNA analysis to track the pollinators farmers depend on most.",
    caption: "Department of Entomology",
    img: IMG.dept4,
  },
  {
    title: "Soil that feeds itself: regenerative practices come to row crops",
    body: "Crop & Soil Sciences researchers in Tifton are partnering with growers to test cover-crop rotations that build organic matter and reduce input costs.",
    caption: "Crop & Soil Sciences, Tifton",
    img: IMG.field,
  },
];

function Research() {
  const [idx, setIdx] = useState(0);
  const r = RESEARCHES[idx];
  return (
    <section className="section research">
      <div className="wide-width">
        <div className="research-head">
          <h2 className="h-display">Innovative solutions in agricultural &amp; environmental research</h2>
        </div>
        <div className="research-grid">
          <div className="research-photo" style={{ backgroundImage: `url(${r.img})` }} role="img" aria-label={r.caption}>
            <div className="research-photo-caption">{r.caption}</div>
          </div>
          <article className="research-card">
            <h3>{r.title}</h3>
            <hr className="red-rule" />
            <p>{r.body}</p>
            <a href="#" className="link-arrow">Read more →</a>
          </article>
        </div>
        <div className="research-controls">
          {RESEARCHES.map((_, i) => (
            <button key={i} className={`dot ${i === idx ? "is-active" : ""}`} onClick={() => setIdx(i)} aria-label={`Go to story ${i+1}`} />
          ))}
        </div>
        <div className="research-cta-row">
          <a href="#" className="btn">Learn more about our research</a>
          <a href="#" className="btn">Alumni giving</a>
        </div>
      </div>
    </section>
  );
}

// ============ Events ============
const EVENTS = [
  { time: "3:30 PM", date: "November 19, 2025", title: "DW Brooks lecture & awards", img: IMG.event1 },
  { time: "1:30 PM", date: "November 20, 2025", title: "Greenhouse Mgmt class plant sale", img: IMG.event2 },
  { time: "4:00 PM", date: "November 30, 2025", title: "CAES study abroad fair", img: IMG.event3 },
];
function Events() {
  return (
    <section className="section events">
      <div className="wide-width">
        <div className="events-head">
          <h2 className="h-display">Get involved around campus</h2>
        </div>
        <div className="events-grid">
          {EVENTS.map(e => (
            <a key={e.title} href="#" className="event-card">
              <div className="event-photo" style={{ backgroundImage: `url(${e.img})` }} role="img" aria-label="" />
              <div className="event-body">
                <div className="event-time">{e.time}</div>
                <div className="event-date">{e.date}</div>
                <h3 className="event-title">{e.title}</h3>
                <span className="link-arrow">Read more →</span>
              </div>
            </a>
          ))}
        </div>
        <div className="events-foot">
          <a href="#" className="link-arrow">View more CAES events →</a>
        </div>
      </div>
    </section>
  );
}

// ============ Areas of Study (replaces Departments carousel — surfaces Frankel taxonomy) ============
const AREAS = [
  { name: "Plants & Horticulture", img: IMG.dept1 },
  { name: "Animals & Dairy", img: IMG.dept2 },
  { name: "Crops & Soil", img: IMG.dept3 },
  { name: "Insects & Pollinators", img: IMG.dept4 },
  { name: "Food, Health & Nutrition", img: IMG.dept5 },
  { name: "Robotics & Technology", img: IMG.dept6 },
  { name: "Environment & Sustainability", img: IMG.field },
];

function Areas() {
  const trackRef = useRef(null);
  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".dept-card");
    const w = card ? card.getBoundingClientRect().width + 18 : 320;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };
  return (
    <section className="section departments">
      <div className="wide-width">
        <div className="events-head">
          <h2 className="h-display">Explore by area of study</h2>
        </div>
        <div className="dept-track" ref={trackRef}>
          {AREAS.map(d => (
            <a key={d.name} href="#" className="dept-card" style={{ backgroundImage: `url(${d.img})` }}>
              <span>{d.name}</span>
            </a>
          ))}
        </div>
        <div className="dept-controls">
          <button className="dept-arrow" aria-label="Previous" onClick={() => scrollBy(-1)}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 1L3 7l6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
          </button>
          <button className="dept-arrow" aria-label="Next" onClick={() => scrollBy(1)}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M5 1l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

// ============ Closing CTA ("future of agriculture") ============
function Closing() {
  return (
    <section className="closing">
      <div className="wide-width closing-grid">
        <div className="closing-photo" style={{ backgroundImage: `url(${IMG.closing})` }} role="img" aria-label="A CAES researcher in a corn field" />
        <div className="closing-text">
          <h2>Be a part of the<span className="accent">future of agriculture.</span></h2>
          <hr className="red-rule" />
          <div className="closing-cta-row">
            <a href="#" className="btn">Schedule a student visit</a>
          </div>
          <div className="closing-inline-links">
            <a href="#" className="link-arrow">Apply today →</a>
            <a href="#" className="link-arrow">Campus life →</a>
            <a href="#" className="link-arrow">Programs &amp; degrees →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ Footers ============
const SocialIcon = ({ kind }) => {
  const paths = {
    fb: <path d="M14 8h-2.5V6.5c0-.6.4-1 1-1H14V3h-2c-2 0-3 1-3 3v2H7v2.5h2V18h2.5v-7.5H13.5L14 8z" fill="currentColor"/>,
    x: <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>,
    ig: <><rect x="3.5" y="3.5" width="13" height="13" rx="3" stroke="currentColor" strokeWidth="1.4" fill="none"/><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.4" fill="none"/><circle cx="14" cy="6" r="0.8" fill="currentColor"/></>,
    yt: <><rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" fill="none"/><path d="M9 8l3.5 2L9 12V8z" fill="currentColor"/></>,
    li: <><rect x="4" y="4" width="12" height="12" stroke="currentColor" strokeWidth="1.4" fill="none"/><circle cx="7" cy="8" r="0.8" fill="currentColor"/><path d="M7 10v4M10 10v4M10 12c0-1 .5-2 1.5-2s1.5 1 1.5 2v2" stroke="currentColor" strokeWidth="1.2" fill="none"/></>,
  };
  return <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">{paths[kind]}</svg>;
};

function FooterCAES() {
  return (
    <footer>
      <div className="footer-red">
        <div className="container footer-red-inner">
          <ul>
            <li><a href="#">CAES Careers</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Intranet</a></li>
          </ul>
          <ul>
            <li><a href="#">A-Z Directory</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
          <ul>
            <li><a href="#">Extension</a></li>
            <li><a href="#">Athens</a></li>
            <li><a href="#">Tifton</a></li>
            <li><a href="#">Griffin</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-uga">
        <div className="container footer-uga-inner">
          <div>
            <Brand dark />
            <p>© University of Georgia, Athens, GA 30602<br/>706-542-3000</p>
          </div>
          <ul>
            <li><a href="#">Schools and Colleges</a></li>
            <li><a href="#">Directory</a></li>
            <li><a href="#">MyUGA</a></li>
          </ul>
          <ul>
            <li><a href="#">Employment Opportunities</a></li>
            <li><a href="#">Copyright and Trademarks</a></li>
            <li><a href="#">Privacy</a></li>
          </ul>
          <ul>
            <li><a href="#">Submit a Student Complaint</a></li>
          </ul>
        </div>
        <div className="footer-social-row">
          #UGA on
          <a href="#" aria-label="Facebook"><SocialIcon kind="fb" /></a>
          <a href="#" aria-label="X"><SocialIcon kind="x" /></a>
          <a href="#" aria-label="Instagram"><SocialIcon kind="ig" /></a>
          <a href="#" aria-label="YouTube"><SocialIcon kind="yt" /></a>
          <a href="#" aria-label="LinkedIn"><SocialIcon kind="li" /></a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Hero, Impact, Spotlight, Newsletter, Research, Events, Areas, Closing, FooterCAES, Announcement, StudentLife, ReadAbout, Innovation });
