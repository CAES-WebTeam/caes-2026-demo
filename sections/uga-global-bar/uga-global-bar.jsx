/* global React */
// ============ UGA Global Bar ============
// Black bar across the very top of every UGA-system page.
// Wordmark left, quick links right.
window.UGAGlobalBar = function UGAGlobalBar() {
  const wordmarkSrc = window.location.pathname.includes('/sections/') ? '../assets/GEORGIA-HW-W.png' : 'sections/assets/GEORGIA-HW-W.png';
  return (
    <div className="uga-global">
      <div className="container uga-global-inner">
        <a className="uga-wordmark" href="https://www.uga.edu" target="_blank" rel="noreferrer">
          <img src={wordmarkSrc} alt="University of Georgia" />
        </a>
      </div>
    </div>
  );
};
