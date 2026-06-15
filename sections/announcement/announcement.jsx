/* global React */

// ============ Announcement bar ============
// Site-wide notice strip.
window.Announcement = function Announcement({ message, ctaLabel, ctaHref }) {
  return (
    <div className="announcement" role="region" aria-label="Site announcement">
      <div className="announcement-inner">
        <span>
          {message || "Fall 2026 applications are open."}{" "}
          <a href={ctaHref || "#"}>{ctaLabel || "Start your application"}</a> by November 15.
        </span>
      </div>
    </div>
  );
};
