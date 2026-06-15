/* global React, ReactDOM */
const { useState } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "displayFont": "Source Serif 4",
  "showAnnouncement": true,
  "showSpotlight": true,
  "showStudentLife": true,
  "showNewsletter": true,
  "showResearch": true,
  "showEvents": true,
  "showAreas": true,
  "showReadAbout": true,
  "showInnovation": true
}/*EDITMODE-END*/;

const DISPLAY_FONTS = {
  "Source Serif 4": "'Source Serif 4', 'Source Serif Pro', Georgia, serif",
  "Playfair Display": "'Playfair Display', Georgia, serif",
  "Fraunces": "'Fraunces', Georgia, serif",
  "PT Serif": "'PT Serif', Georgia, serif",
};

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [menuOpen, setMenuOpen] = useState(false);

  React.useEffect(() => {
    document.documentElement.style.setProperty("--font-serif", DISPLAY_FONTS[tweaks.displayFont] || DISPLAY_FONTS["Source Serif 4"]);
  }, [tweaks.displayFont]);

  return (
    <>
      <GlobalBar />
      {menuOpen && <MegaDrawer onClose={() => setMenuOpen(false)} />}
      <main id="main">
        <Hero onMenu={() => setMenuOpen(true)} />
        {tweaks.showAnnouncement && <Announcement />}
        <Impact />
        {tweaks.showStudentLife && <StudentLife />}
        {tweaks.showSpotlight && <Spotlight />}
        {tweaks.showNewsletter && <Newsletter />}
        {tweaks.showResearch && <Research />}
        {tweaks.showAreas && <Areas />}
        {tweaks.showEvents && <Events />}
        {tweaks.showReadAbout && <ReadAbout />}
        {tweaks.showInnovation && <Innovation />}
        <Closing />
      </main>
      <FooterCAES />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Type">
          <TweakSelect label="Display serif" value={tweaks.displayFont}
            onChange={v => setTweak("displayFont", v)}
            options={Object.keys(DISPLAY_FONTS).map(k => ({ value: k, label: k }))} />
        </TweakSection>
        <TweakSection title="Kaptiv8 sections">
          <TweakToggle label="Announcement bar" value={tweaks.showAnnouncement} onChange={v => setTweak("showAnnouncement", v)} />
          <TweakToggle label="Student Life accordion" value={tweaks.showStudentLife} onChange={v => setTweak("showStudentLife", v)} />
          <TweakToggle label="Departments / Areas carousel" value={tweaks.showAreas} onChange={v => setTweak("showAreas", v)} />
          <TweakToggle label="Read All About CAES strip" value={tweaks.showReadAbout} onChange={v => setTweak("showReadAbout", v)} />
          <TweakToggle label="Innovation Grows Here CTA" value={tweaks.showInnovation} onChange={v => setTweak("showInnovation", v)} />
        </TweakSection>
        <TweakSection title="Frankel sections">
          <TweakToggle label="Story spotlight (teal)" value={tweaks.showSpotlight} onChange={v => setTweak("showSpotlight", v)} />
          <TweakToggle label="Newsletter strip" value={tweaks.showNewsletter} onChange={v => setTweak("showNewsletter", v)} />
          <TweakToggle label="Featured research" value={tweaks.showResearch} onChange={v => setTweak("showResearch", v)} />
          <TweakToggle label="Events / Get involved" value={tweaks.showEvents} onChange={v => setTweak("showEvents", v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
