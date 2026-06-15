/* global React */
const { useRef: useRefFaq, useEffect: useEffectFaq } = React;

// ============ Pattern — FAQ ============
// Native <details> disclosures (styled in _tokens.css). Accepts optional
// id (anchor) and tint (background band) so it composes into a page rhythm.
window.Faq = function Faq(props) {
  const { id, tint } = props || {};
  const FAQS = [
    { q: "Do I need experience with plants before I start?", a: "No. Plenty of students arrive having never grown anything — the first-year courses assume you're starting from curiosity, not expertise. What helps most is a willingness to spend time outdoors and in the greenhouse." },
    { q: "What are the concentrations within the major?", a: "You can focus your upper-level work toward production (fruits, vegetables, ornamentals), the green industry and landscape management, or plant science and research. All three share a common core, so you don't decide on day one." },
    { q: "When can I get involved in research?", a: "As early as your first year. Faculty regularly hire undergraduates into breeding, physiology, and post-harvest labs — many of these positions are paid, and they often grow into an independent project for credit." },
    { q: "Can I add a minor or double major?", a: "Yes. Horticulture pairs naturally with minors in business, environmental economics, food science, or Spanish. Talk with your advisor early so the schedule lines up within four years." },
    { q: "Is study abroad required?", a: "It isn't required, but it's encouraged. You can Study Away for a single course or a full semester — past students have studied tropical horticulture, European landscape design, and global food systems." },
  ];
  return (
    <section className={`faq${tint ? " faq--tint" : ""}`} id={id}>
      <div className="container">
        <h2 className="section-kicker">FAQ</h2>
        <p className="section-display">Good to know.</p>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <FaqItem key={i} question={f.q} answer={f.a} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Initial open state is set imperatively (on mount only) so a parent's
// re-renders never snap a user-toggled row back closed.
function FaqItem({ question, answer, defaultOpen }) {
  const ref = useRefFaq(null);
  useEffectFaq(() => { if (ref.current) ref.current.open = !!defaultOpen; }, []);
  return (
    <details ref={ref}>
      <summary>{question}</summary>
      <p>{answer}</p>
    </details>
  );
}
