import { storyMockup as m } from "@/lib/services";

/**
 * A fictional bakery website on a phone. Pure HTML/CSS/inline SVG.
 * Exposed to assistive tech as a single image; the inner markup is hidden.
 * The default CSS state is the final state (site + notification visible).
 */
export default function PhoneMockup() {
  return (
    <div className="sv-phone-wrap">
      <div className="sv-phone-glow" aria-hidden="true" />
      <div className="sv-phone" role="img" aria-label={m.ariaLabel}>
        <div className="sv-phone-screen" aria-hidden="true">
          <div className="sv-phone-island" />
          <div className="sv-statusbar">
            <span>{m.time}</span>
            <svg viewBox="0 0 34 12" className="sv-statusbar-icons" focusable="false">
              <rect x="0" y="8" width="3" height="4" rx="1" />
              <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
              <rect x="10" y="3" width="3" height="9" rx="1" />
              <rect x="15" y="0.5" width="3" height="11.5" rx="1" />
              <rect x="22" y="2" width="10" height="8" rx="2.2" fill="none" stroke="currentColor" />
              <rect x="23.6" y="3.6" width="6" height="4.8" rx="1.2" />
            </svg>
          </div>

          <div className="sv-screen-inner">
            <div className="sv-site-header">
              <span className="sv-site-logo">{m.monogram}</span>
              <span className="sv-site-name">{m.name}</span>
            </div>

            <div className="sv-site-hero">
              <svg className="sv-wheat" viewBox="0 0 40 80" focusable="false">
                <path d="M20 78 V18" />
                <path d="M20 22 C12 18 10 10 12 4 C18 8 21 14 20 22 Z" />
                <path d="M20 22 C28 18 30 10 28 4 C22 8 19 14 20 22 Z" />
                <path d="M20 36 C11 33 8 25 10 18 C17 22 20 28 20 36 Z" />
                <path d="M20 36 C29 33 32 25 30 18 C23 22 20 28 20 36 Z" />
                <path d="M20 50 C11 47 8 39 10 32 C17 36 20 42 20 50 Z" />
                <path d="M20 50 C29 47 32 39 30 32 C23 36 20 42 20 50 Z" />
              </svg>
              <span className="sv-site-headline">{m.headline}</span>
            </div>

            <div className="sv-site-pills">
              <span className="sv-site-pill sv-site-pill--call">
                <span className="sv-ring" />
                {m.call}
              </span>
              <span className="sv-site-pill sv-site-pill--ghost">{m.directions}</span>
            </div>

            <div className="sv-site-card sv-site-hours sv-site-reveal">
              <span className="sv-dot" />
              <span>
                <span className="sv-site-strong">{m.hoursTitle}</span>
                <span className="sv-site-small">{m.hours}</span>
              </span>
            </div>

            <div className="sv-site-card sv-site-map sv-site-reveal">
              <div className="sv-map">
                <svg className="sv-map-pin" viewBox="0 0 24 32" focusable="false">
                  <path d="M12 31 C12 31 2 19 2 11.5 A10 10 0 0 1 22 11.5 C22 19 12 31 12 31 Z" />
                  <circle cx="12" cy="11.5" r="3.8" />
                </svg>
              </div>
              <span className="sv-site-small">{m.mapCaption}</span>
            </div>

            <div className="sv-site-chips sv-site-reveal">
              {m.chips.map((chip) => (
                <span className="sv-site-chip" key={chip}>
                  {chip}
                </span>
              ))}
            </div>

            <div className="sv-site-card sv-site-form">
              <span className="sv-site-strong">{m.formTitle}</span>
              <span className="sv-site-input" />
              <span className="sv-site-input sv-site-input--tall" />
              <span className="sv-site-pill sv-site-pill--send">{m.send}</span>
            </div>
          </div>

          <div className="sv-layer-a">
            <div className="sv-search">
              <svg viewBox="0 0 20 20" className="sv-search-icon" focusable="false">
                <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M13 13 L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="sv-search-text">{m.search}</span>
            </div>
            <div className="sv-result">
              <span className="sv-result-logo" />
              <span className="sv-result-body">
                <span className="sv-site-strong">{m.name}</span>
                <span className="sv-site-small">{m.meta}</span>
              </span>
              <span className="sv-result-chip">{m.chip}</span>
            </div>
          </div>

          <div className="sv-notif">
            <span className="sv-notif-icon">
              <svg viewBox="0 0 20 20" focusable="false">
                <rect x="2.5" y="4.5" width="15" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M3 5.5 L10 11 L17 5.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="sv-notif-body">
              <span className="sv-notif-title">{m.notifTitle}</span>
              <span className="sv-notif-text">{m.notifText}</span>
            </span>
          </div>
        </div>
      </div>
      <p className="sv-phone-caption sv-mono" aria-hidden="true">
        {m.caption}
      </p>
    </div>
  );
}
