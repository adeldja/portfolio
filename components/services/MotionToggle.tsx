"use client";

import { useSyncExternalStore } from "react";
import { getPaused, getServerPaused, setPaused, subscribe } from "./motion/store";

export default function MotionToggle({
  className,
  iconOnly = false,
}: {
  className?: string;
  iconOnly?: boolean;
}) {
  const paused = useSyncExternalStore(subscribe, getPaused, getServerPaused);
  const base = iconOnly ? "sv-motion-icon-btn" : "sv-btn sv-btn--ghost sv-btn--sm";

  return (
    <button
      type="button"
      className={`${base} sv-motion-toggle${className ? " " + className : ""}`}
      aria-pressed={paused}
      aria-label="Mettre en pause les animations"
      title={paused ? "Relancer les animations" : "Mettre en pause les animations"}
      onClick={() => setPaused(!paused)}
    >
      <svg
        className="sv-motion-icon"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        aria-hidden="true"
        focusable="false"
      >
        {paused ? (
          <path d="M4.5 2.75v10.5L13 8z" fill="currentColor" />
        ) : (
          <path d="M4 2.5h2.75v11H4zM9.25 2.5H12v11H9.25z" fill="currentColor" />
        )}
      </svg>
      {iconOnly ? null : (
        <span className="sv-motion-label">
          Pause<span className="sv-motion-long"> des animations</span>
        </span>
      )}
    </button>
  );
}
