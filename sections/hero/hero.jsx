/* global React */
const { useState: useStateHero } = React;

// ============ Hero ============
// Two-column split: a colored panel on the left holds the floating white card,
// and the photo lives on the right as a background-image div (NOT an <img>) so
// `cover` + a fixed aspect-ratio control the crop and drive the row height —
// the source photo's own (non-standard) aspect ratio no longer matters. The
// card juts out of the panel and overlaps the seam onto the photo. On narrow
// screens the row stacks: photo on top, card below.
// Headline + red rule + sub copy + CTA pair.
window.Hero = function Hero(props) {
  const { onMenu } = props;
  const Brand = window.Brand;
  const IMG = window.IMG;
  // Content is overridable per page; defaults are the homepage hero.
  const title = props.title || "Cultivating a more fruitful world";
  const lead = props.lead || "From farms and labs to medical school and the halls of government, there's no shortage of places your CAES education can take you.";
  const note = props.note || "Visit our campuses in Athens, Griffin and Tifton.";
  const ctaPrimary = props.ctaPrimary || "Explore our programs";
  const ctaSecondary = props.ctaSecondary || "More about the college →";
  const heroImage = props.image || IMG.hero;
  const heroAlt = props.imageAlt || "A CAES student tending plants in a Georgia research field";
  return (
    <section className="hero">
      <div className="hero-panel">
        <div className="hero-card">
          <h1>{title}</h1>
          <hr className="red-rule" />
          <p className="hero-sub">{lead}</p>
          {note && <p className="hero-sub italic">{note}</p>}
          <div className="hero-ctas">
            <a href="#" className="btn">{ctaPrimary}</a>
            <a href="#" className="link-arrow">{ctaSecondary}</a>
          </div>
        </div>
      </div>
      <div
        className="hero-image"
        style={{ backgroundImage: `url(${heroImage})` }}
        role="img"
        aria-label={heroAlt}
      />
    </section>
  );
};
