/* global React */
const { useEffect: useEffectIM, useRef: useRefIM } = React;

// ============ Impact Mosaic ============
// Asymmetric photo+stat grid — the v2 mosaic block.
// 4-column grid, 2 rows tall: 1 tall photo + alternating stat/photo tiles.
// Each stat has its own CTA. On scroll into view the stats rise/fade in (gated
// behind prefers-reduced-motion).
window.ImpactMosaic = function ImpactMosaic() {
  const IMG = window.IMG;
  const mosaicRef = useRefIM(null);

  useEffectIM(() => {
    const root = mosaicRef.current;
    if (!root) return;
    root.classList.add("is-armed"); // opt the reveal CSS in only when JS runs
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        root.classList.add("is-revealed");
        obs.disconnect();
      });
    }, { threshold: 0, rootMargin: "0px 0px -15% 0px" });
    // Observe on the next frame so the hidden (armed) state paints first —
    // otherwise a mosaic already in view reveals instantly with no transition.
    const raf = requestAnimationFrame(() => obs.observe(root));
    return () => { cancelAnimationFrame(raf); obs.disconnect(); };
  }, []);

  const STATS = [
    { num: "$80.1M",   lbl: <>New Research<br/>Awards</>,             cta: "Explore research" },
    { num: "$899M",    lbl: <>Economic Impact<br/>on State of Georgia</>, cta: "See our impact" },
    { num: "$710,146", lbl: <>In Scholarship<br/>Awards in 2025</>,   cta: "Find scholarships" },
    { num: "1,521",    lbl: <>Undergraduate<br/>Students</>,          cta: "Browse degrees" },
  ];
  const Stat = ({ i }) => (
    <div className="mosaic-stat">
      <div className="num">{STATS[i].num}</div>
      <div className="lbl">{STATS[i].lbl}</div>
      <a className="mosaic-cta" href="#">{STATS[i].cta} →</a>
    </div>
  );

  return (
    <section className="impactm bg-dotted">
      <div className="container">
        <div className="impactm-intro">
          <h2 id="impactm-heading">Our Impact</h2>
          <p>
            In the lab and in the field, CAES is advancing agricultural and environmental sciences across Georgia and beyond.
            Our students in Athens, Griffin and Tifton learn from researchers who are pioneering new methods, making discoveries
            and using cutting-edge technology to ensure the future of agriculture and the environment for generations to come.
          </p>
        </div>

        <div className="mosaic" ref={mosaicRef}>
          <div className="mosaic-col">{/* col 1: photo / stat */}
            <div className="mosaic-photo"><img src={IMG.campus} alt="Students at UGA campus" loading="lazy" /></div>
            <Stat i={0} />
          </div>
          <div className="mosaic-col">{/* col 2: stat / photo */}
            <Stat i={1} />
            <div className="mosaic-photo"><img src={IMG.greenhouse} alt="Researchers in the greenhouse" loading="lazy" /></div>
          </div>
          <div className="mosaic-col">{/* col 3: photo / stat */}
            <div className="mosaic-photo"><img src={IMG.field} alt="CAES research field" loading="lazy" /></div>
            <Stat i={2} />
          </div>
          <div className="mosaic-col">{/* col 4: stat / photo */}
            <Stat i={3} />
            <div className="mosaic-photo"><img src={IMG.classroom} alt="CAES students in a classroom" loading="lazy" /></div>
          </div>
        </div>

        <div className="impactm-cta">
          <a className="btn btn-filled" href="#">Read the CAES Impact Report</a>
        </div>
      </div>
    </section>
  );
};
