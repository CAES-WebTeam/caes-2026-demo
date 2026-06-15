/* global React */
const { useState, useEffect, useRef } = React;

// ============ Sample imagery ============
const IMG = {
  // Hero — student in a field of greens with a wide hat (matches ref tone)
  hero: "../sections/assets/img/photo-1464226184884-fa280b87c399.jpg",
  // Stat mosaic photos
  campus: "../sections/assets/img/photo-1607237138185-eedd9c632b0b.jpg",
  greenhouse: "../sections/assets/img/photo-1530836369250-ef72a3f5cda8.jpg",
  field: "../sections/assets/img/photo-1500382017468-9049fed747ef.jpg",
  classroom: "../sections/assets/img/photo-1543269865-cbf427effbad.jpg",
  // Spotlight
  spotlight: "../sections/assets/img/photo-1488459716781-31db52582fe9.jpg",
  // Featured research
  research: "../sections/assets/img/photo-1581094794329-c8112a89af12.jpg",
  // Events
  event1: "../sections/assets/img/photo-1523240795612-9a054b0db644.jpg",
  event2: "../sections/assets/img/photo-1416879595882-3373a0480b5b.jpg",
  event3: "../sections/assets/img/photo-1466692476868-aef1dfb1e735.jpg",
  // Departments / areas of study
  dept1: "../sections/assets/img/photo-1625246333195-78d9c38ad449.jpg",
  dept2: "../sections/assets/img/photo-1500595046743-cd271d694d30.jpg",
  dept3: "../sections/assets/img/photo-1473973266408-ed4e27abdd47.jpg",
  dept4: "../sections/assets/img/photo-1498936178812-4b2e558d2937.jpg",
  dept5: "../sections/assets/img/photo-1466692476868-aef1dfb1e735.jpg",
  dept6: "../sections/assets/img/photo-1581094794329-c8112a89af12.jpg",
  // Closing
  closing: "../sections/assets/img/photo-1530836369250-ef72a3f5cda8.jpg",
};

// ============ Logo mark (placeholder) ============
const LogoMark = ({ size = 42, dark = false }) => (
  <svg width={size} height={size * 1.18} viewBox="0 0 42 50" aria-hidden="true">
    <rect x="2" y="2" width="38" height="42" stroke={dark ? "#fff" : "#1a1a1a"} strokeWidth="2" fill="none" />
    <path d="M21 8 L21 32" stroke="#BA0C2F" strokeWidth="2.4" />
    <path d="M21 18 Q14 22 14 30 L14 34 L28 34 L28 30 Q28 22 21 18 Z" fill="#BA0C2F" />
    <circle cx="21" cy="14" r="2.6" fill={dark ? "#fff" : "#1a1a1a"} />
    <rect x="6" y="40" width="30" height="4" fill={dark ? "#fff" : "transparent"} />
  </svg>
);

const Brand = ({ dark = false }) => (
  <a href="#" className="brand" aria-label="College of Agricultural and Environmental Sciences home">
    <span className="brand-mark"><LogoMark dark={dark} /></span>
    <span className="brand-text">
      <span className="brand-college">College of Agricultural &amp;<br/>Environmental Sciences</span>
      <span className="brand-uga">UNIVERSITY OF GEORGIA</span>
    </span>
  </a>
);

// ============ UGA black global bar ============
const GlobalBar = () => (
  <div className="uga-global">
    <div className="container uga-global-inner">
      <a className="uga-wordmark" href="https://www.uga.edu" target="_blank" rel="noreferrer">
        <svg width="20" height="22" viewBox="0 0 20 22" aria-hidden="true">
          <path d="M3 4 L3 18 L17 18 L17 4 L10 1 Z" fill="none" stroke="#fff" strokeWidth="1.4"/>
          <path d="M10 4 L10 14 M7 9 Q10 11 13 9" stroke="#BA0C2F" strokeWidth="1.4" fill="none"/>
        </svg>
        University of Georgia
      </a>
      <nav className="uga-global-links" aria-label="UGA quick links">
        <a href="#">Partner with Us</a>
        <a href="#">Make a Gift</a>
        <a href="#">Apply</a>
      </nav>
    </div>
  </div>
);

// ============ Search/menu pill nav (top-right floating) ============
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 18 18" aria-hidden="true">
    <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.6" fill="none"/>
    <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
    <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
  </svg>
);

function HeroNavPills({ onMenu }) {
  return (
    <div className="hero-nav">
      <button className="pill-btn" aria-label="Search"><SearchIcon /> Search</button>
      <a className="pill-btn" href="#"> → Field Report</a>
      <button className="pill-btn" onClick={onMenu}><MenuIcon /> Menu</button>
    </div>
  );
}

// ============ Mega drawer (slide-in from right) ============
const NAV = [
  { h: "Academics", links: ["Undergraduate Majors", "Graduate Programs", "Certificates", "Double Dawgs", "Departments", "Apply Now"] },
  { h: "Research", links: ["Research Areas", "Centers & Institutes", "Grants & Partnerships", "Where We Work", "Our Impact"] },
  { h: "Extension", links: ["Find Your County Office", "Commodity Teams", "Urban Programs", "Georgia 4-H", "Publications"] },
  { h: "About", links: ["History", "Administration", "Personnel Directory", "Jobs at CAES", "News", "Events", "Almanac Magazine"] },
  { h: "Alumni & Giving", links: ["Get Connected", "Mentor a Student", "Make a Gift", "Scholarship Funds", "Annual Report"] },
];

function MegaDrawer({ onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <>
      <div className="megadrawer-backdrop" onClick={onClose} />
      <aside className="megadrawer" role="dialog" aria-modal="true" aria-label="Site navigation">
        <div className="megadrawer-header">
          <Brand />
          <button onClick={onClose} aria-label="Close menu" style={{ width: 44, height: 44 }}>
            <svg width="22" height="22" viewBox="0 0 22 22"><path d="M3 3l16 16M19 3L3 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div className="megadrawer-body">
          {NAV.map(col => (
            <div key={col.h}>
              <h4>{col.h}</h4>
              <ul>{col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}

Object.assign(window, { IMG, LogoMark, Brand, GlobalBar, HeroNavPills, MegaDrawer, NAV });
