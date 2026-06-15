/* global React */
const { useState, useEffect, useRef } = React;

// Shared imagery — local assets in sections/assets/img/.
// Resolve base path so it works from both /sections/*.html (standalone) and / (composed pages).
window.IMG = window.IMG || (function () {
  const base = window.location.pathname.includes('/sections/') ? '../assets/img/' : 'sections/assets/img/';
  return {
    hero: base + "photo-1464226184884-fa280b87c399.jpg",
    campus: base + "photo-1607237138185-eedd9c632b0b.jpg",
    greenhouse: base + "photo-1530836369250-ef72a3f5cda8.jpg",
    field: base + "photo-1500382017468-9049fed747ef.jpg",
    classroom: base + "photo-1543269865-cbf427effbad.jpg",
    research: base + "photo-1581094794329-c8112a89af12.jpg",
    dept1: base + "photo-1625246333195-78d9c38ad449.jpg",
    dept2: base + "photo-1500595046743-cd271d694d30.jpg",
    dept3: base + "photo-1473973266408-ed4e27abdd47.jpg",
    dept4: base + "photo-1498936178812-4b2e558d2937.jpg",
    dept5: base + "photo-1466692476868-aef1dfb1e735.jpg",
    dept6: base + "photo-1581094794329-c8112a89af12.jpg",
    closing: base + "photo-1530836369250-ef72a3f5cda8.jpg",
  };
})();

// Official CAES lockup — full horizontal logo (shield + CAES wordmark + tagline + band)
window.LogoMark = window.LogoMark || function LogoMark({ height = 56, dark = false }) {
  // Resolve logo path: works from both /sections/*.html (standalone) and / (composed homepage)
  const logoSrc = window.location.pathname.includes('/sections/') ? '../assets/caes-logo.png' : 'sections/assets/caes-logo.png';
  const filter = dark ? "brightness(0) invert(1)" : "none";
  return (
    <img
      src={logoSrc}
      alt=""
      aria-hidden="true"
      style={{ height: `${height}px`, width: "auto", display: "block", filter }}
    />
  );
};

window.Brand = window.Brand || function Brand({ dark = false, height = 56 }) {
  const Logo = window.LogoMark;
  return (
    <a href="#" className="brand" aria-label="College of Agricultural and Environmental Sciences home">
      <Logo height={height} dark={dark} />
    </a>
  );
};

// ============ CollapsibleNav ============
// Shared disclosure behavior for section / on-page navs: shown in full on
// desktop, collapsed behind a toggle on mobile. Above `breakpoint` it renders
// the `header` slot (or nothing) and the body is always visible; below it,
// a toggle button shows the current item and reveals the body when tapped.
// Layout/looks are the caller's (via className + the body markup) — this only
// owns the matchMedia state, the toggle, and the collapse.
//   children may be a node, or a function ({ desktop, close }) => node so links
//   can call close() to dismiss the panel after navigating.
//   Pass `collapsed` to make it a dropdown at every width (never expands inline).
window.CollapsibleNav = window.CollapsibleNav || function CollapsibleNav(props) {
  const breakpoint = props.breakpoint || "(min-width: 901px)";
  const collapsed = !!props.collapsed;
  const [open, setOpen] = useState(false);
  const [matches, setMatches] = useState(function () { return collapsed ? false : window.matchMedia(breakpoint).matches; });
  useEffect(function () {
    if (collapsed) return undefined;
    const mq = window.matchMedia(breakpoint);
    const onChange = function (e) { setMatches(e.matches); };
    mq.addEventListener("change", onChange);
    return function () { mq.removeEventListener("change", onChange); };
  }, [breakpoint, collapsed]);
  const desktop = collapsed ? false : matches;

  const close = function () { setOpen(false); };
  const bodyContent = typeof props.children === "function"
    ? props.children({ desktop: desktop, close: close })
    : props.children;

  const toggle = (
    <button type="button" className="cnav-toggle" aria-expanded={open}
      aria-controls={props.bodyId} onClick={function () { setOpen(function (o) { return !o; }); }}>
      <span className="cnav-toggle-text">
        {props.toggleCap ? <span className="cnav-toggle-cap">{props.toggleCap}</span> : null}
        <span className="cnav-toggle-cur">{props.toggleCurrent}</span>
      </span>
      <svg className="cnav-chev" width="14" height="9" viewBox="0 0 14 9" aria-hidden="true">
        <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  const inner = (
    <React.Fragment>
      {desktop ? (props.header || null) : toggle}
      <div className="cnav-body" id={props.bodyId} hidden={!desktop && !open}>{bodyContent}</div>
      {props.trailing || null}
    </React.Fragment>
  );

  return (
    <nav className={props.className} aria-label={props.ariaLabel}>
      {props.innerClassName ? <div className={props.innerClassName}>{inner}</div> : inner}
    </nav>
  );
};
