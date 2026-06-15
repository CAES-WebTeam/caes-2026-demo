/* global React */

// ============ Berry Decoration ============
// Decorative blueberry sprig that rides the right edge of the homepage. It
// overlaps the lower-right of the hero photo and hangs down to lap the top of
// the Impact (stats) section. The sprig is a background-image on this div (see
// berry-decor.css) so its right half can be cropped flush to the screen edge.
// Purely decorative — aria-hidden and pointer-events:none so it never
// intercepts clicks — and it slides off to the right on viewports too narrow to
// clear the centered content.
window.BerryDecor = function BerryDecor() {
  return <div className="berry-decor" aria-hidden="true" />;
};
