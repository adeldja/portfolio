"use client";

import type { CSSProperties, ReactNode } from "react";
import * as m from "motion/react-m";
import type { Variants } from "motion/react";
import type { StoryShared, StoryTrade, TradeGlyph } from "@/lib/product";

const EASE = [0.16, 1, 0.3, 1] as const;

// Chapter states: s0 = Google search, s1 = the site, s2 = incoming message.
const searchLayer: Variants = {
  s0: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE } },
  s1: { opacity: 0, y: -24, transition: { duration: 0.42, ease: EASE } },
  s2: { opacity: 0, y: -24, transition: { duration: 0.42, ease: EASE } },
};

const siteShown = (i: number) => ({
  opacity: 1,
  y: 0,
  transition: { duration: 0.52, ease: EASE, delay: i * 0.06 },
});

const siteItem: Variants = {
  s0: (i: number) => ({
    opacity: 0,
    y: 28,
    transition: { duration: 0.52, ease: EASE, delay: (6 - i) * 0.06 },
  }),
  s1: siteShown,
  s2: siteShown,
};

const searchText: Variants = {
  s0: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.6, ease: "linear" } },
  s1: { clipPath: "inset(0 100% 0 0)", transition: { duration: 0 } },
  s2: { clipPath: "inset(0 100% 0 0)", transition: { duration: 0 } },
};

const ringIdle = { opacity: 0, scale: 0.8, transition: { duration: 0.2 } };
const ring: Variants = {
  s0: ringIdle,
  s1: ringIdle,
  s2: {
    opacity: [0.6, 0],
    scale: [0.8, 1.6],
    transition: { duration: 0.9, repeat: 2, ease: "easeOut" },
  },
};

const notifHidden = { opacity: 0, y: "-120%", transition: { duration: 0.42, ease: EASE } };
const notif: Variants = {
  s0: notifHidden,
  s1: notifHidden,
  s2: { opacity: 1, y: "0%", transition: { duration: 0.56, ease: EASE, delay: 0.25 } },
};

// Trade change: the site content is rebuilt with a short stagger.
const tradeItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  shown: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: EASE, delay: i * 0.04 },
  }),
};

function Glyph({ glyph }: { glyph: TradeGlyph }) {
  if (glyph === "wheat") {
    return (
      <svg className="pd-glyph" viewBox="0 0 40 80" focusable="false">
        <path d="M20 78 V18" fill="none" />
        <path d="M20 22 C12 18 10 10 12 4 C18 8 21 14 20 22 Z" />
        <path d="M20 22 C28 18 30 10 28 4 C22 8 19 14 20 22 Z" />
        <path d="M20 36 C11 33 8 25 10 18 C17 22 20 28 20 36 Z" />
        <path d="M20 36 C29 33 32 25 30 18 C23 22 20 28 20 36 Z" />
        <path d="M20 50 C11 47 8 39 10 32 C17 36 20 42 20 50 Z" />
        <path d="M20 50 C29 47 32 39 30 32 C23 36 20 42 20 50 Z" />
      </svg>
    );
  }
  if (glyph === "drop") {
    return (
      <svg className="pd-glyph" viewBox="0 0 40 80" focusable="false">
        <path d="M20 14 C20 14 6 34 6 46 A14 14 0 0 0 34 46 C34 34 20 14 20 14 Z" />
        <path d="M13 47 A7 7 0 0 0 19 54" fill="none" stroke="rgba(0,0,0,.25)" />
      </svg>
    );
  }
  if (glyph === "scissors") {
    return (
      <svg className="pd-glyph" viewBox="0 0 40 80" focusable="false">
        <circle cx="12" cy="58" r="7" fill="none" />
        <circle cx="28" cy="58" r="7" fill="none" />
        <path d="M16 52 L30 10" fill="none" />
        <path d="M24 52 L10 10" fill="none" />
      </svg>
    );
  }
  return (
    <svg className="pd-glyph" viewBox="0 0 40 80" focusable="false">
      <circle cx="20" cy="42" r="15" fill="none" />
      <circle cx="20" cy="42" r="9" fill="none" />
      <path d="M3 18 V30 M0 18 V26 M6 18 V26 M3 30 V66" fill="none" />
      <path d="M37 18 C33 22 33 32 37 36 V66" fill="none" />
    </svg>
  );
}

function Block({
  index,
  tradeKey,
  animateTrade,
  className,
  children,
}: {
  index: number;
  tradeKey: string;
  animateTrade: boolean;
  className: string;
  children: ReactNode;
}) {
  return (
    <m.div className="pd-site-item" variants={siteItem} custom={index}>
      <m.div
        key={tradeKey}
        className={className}
        variants={tradeItem}
        custom={index}
        initial={animateTrade ? "hidden" : false}
        animate="shown"
      >
        {children}
      </m.div>
    </m.div>
  );
}

export interface PhoneProps {
  trade: StoryTrade;
  shared: StoryShared;
  state: number;
  /** true once the visitor picked a trade: SSR and first paint never start hidden. */
  interacted: boolean;
}

export default function Phone({ trade, shared, state, interacted }: PhoneProps) {
  const label = `Exemple fictif : le site de ${trade.name} (${trade.meta}) sur un téléphone, avec horaires, adresse et bouton Appeler`;
  const block = { tradeKey: trade.id, animateTrade: interacted };

  return (
    <div className="pd-tilt">
      <div className="pd-scale">
        <div
          className="pd-phone"
          role="img"
          aria-label={label}
          style={{ "--mock-brand": trade.brand } as CSSProperties}
        >
          <m.div
            className="pd-screen"
            aria-hidden="true"
            initial={false}
            animate={`s${state}`}
          >
            <div className="pd-island" />
            <div className="pd-statusbar">
              <span>{shared.time}</span>
              <svg viewBox="0 0 34 12" className="pd-statusbar-icons" focusable="false">
                <rect x="0" y="8" width="3" height="4" rx="1" />
                <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
                <rect x="10" y="3" width="3" height="9" rx="1" />
                <rect x="15" y="0.5" width="3" height="11.5" rx="1" />
                <rect x="22" y="2" width="10" height="8" rx="2.2" fill="none" stroke="currentColor" />
                <rect x="23.6" y="3.6" width="6" height="4.8" rx="1.2" />
              </svg>
            </div>

            <div className="pd-screen-inner">
              <Block index={0} className="pd-site-header" {...block}>
                <span className="pd-site-logo">{trade.monogram}</span>
                <span className="pd-site-name">{trade.name}</span>
              </Block>

              <Block index={1} className="pd-site-hero" {...block}>
                <Glyph glyph={trade.glyph} />
                <span className="pd-site-headline">{trade.headline}</span>
              </Block>

              <Block index={2} className="pd-site-pills" {...block}>
                <span className="pd-site-pill pd-site-pill--call">
                  <m.span className="pd-ring" variants={ring} />
                  {trade.call}
                </span>
                <span className="pd-site-pill pd-site-pill--ghost">{shared.directions}</span>
              </Block>

              <Block index={3} className="pd-site-card pd-site-hours" {...block}>
                <span className="pd-dot" />
                <span>
                  <span className="pd-site-strong">{trade.hoursTitle}</span>
                  <span className="pd-site-small">{trade.hours}</span>
                </span>
              </Block>

              <Block index={4} className="pd-site-card pd-site-map" {...block}>
                <svg className="pd-map" viewBox="0 0 260 84" preserveAspectRatio="xMidYMid slice" focusable="false">
                  <rect width="260" height="84" className="pd-map-bg" />
                  <path className="pd-map-road" d="M-10 64 L270 18" />
                  <path className="pd-map-road" d="M60 -10 L120 94" />
                  <path className="pd-map-road pd-map-road--thin" d="M170 -10 L210 94" />
                  <path className="pd-map-pin" d="M130 46 C130 46 121 35 121 28.5 A9 9 0 0 1 139 28.5 C139 35 130 46 130 46 Z" />
                  <circle cx="130" cy="28.5" r="3.4" fill="#fff" />
                </svg>
                <span className="pd-site-small">{shared.mapCaption}</span>
              </Block>

              <Block index={5} className="pd-site-chips" {...block}>
                {trade.chips.map((chip) => (
                  <span className="pd-site-chip" key={chip}>
                    {chip}
                  </span>
                ))}
              </Block>

              <Block index={6} className="pd-site-card pd-site-form" {...block}>
                <span className="pd-site-strong">{trade.formTitle}</span>
                <span className="pd-site-input" />
                <span className="pd-site-input pd-site-input--tall" />
                <span className="pd-site-pill pd-site-pill--send">{shared.send}</span>
              </Block>
            </div>

            <m.div className="pd-layer-search" variants={searchLayer}>
              <div className="pd-search">
                <svg viewBox="0 0 20 20" className="pd-search-icon" focusable="false">
                  <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M13 13 L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <m.span
                  key={trade.id}
                  className="pd-search-text"
                  variants={searchText}
                  initial={interacted ? "s1" : false}
                >
                  {trade.search}
                </m.span>
              </div>
              <div className="pd-result">
                <span className="pd-result-logo">{trade.monogram}</span>
                <span className="pd-result-body">
                  <span className="pd-site-strong">{trade.name}</span>
                  <span className="pd-site-small">{trade.meta}</span>
                </span>
                <span className="pd-result-chip">{shared.chip}</span>
              </div>
              <div className="pd-result-map">
                <svg className="pd-map" viewBox="0 0 260 84" preserveAspectRatio="xMidYMid slice" focusable="false">
                  <rect width="260" height="84" className="pd-map-bg" />
                  <path className="pd-map-road" d="M-10 30 L270 70" />
                  <path className="pd-map-road pd-map-road--thin" d="M90 -10 L60 94" />
                  <path className="pd-map-road pd-map-road--thin" d="M190 -10 L215 94" />
                  <circle cx="48" cy="58" r="4" className="pd-map-dot" />
                  <circle cx="200" cy="24" r="4" className="pd-map-dot" />
                  <path className="pd-map-pin" d="M130 52 C130 52 121 41 121 34.5 A9 9 0 0 1 139 34.5 C139 41 130 52 130 52 Z" />
                  <circle cx="130" cy="34.5" r="3.4" fill="#fff" />
                </svg>
              </div>
              {[0, 1, 2, 3].map((row) => (
                <div className="pd-result pd-result--blank" key={row}>
                  <span className="pd-result-logo" />
                  <span className="pd-result-body">
                    <span className="pd-bar" />
                    <span className="pd-bar pd-bar--short" />
                  </span>
                </div>
              ))}
            </m.div>

            <m.div className="pd-notif" variants={notif}>
              <span className="pd-notif-icon">
                <svg viewBox="0 0 20 20" focusable="false">
                  <rect x="2.5" y="4.5" width="15" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M3 5.5 L10 11 L17 5.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="pd-notif-body">
                <span className="pd-notif-head">
                  <span className="pd-notif-title">{shared.notifTitle}</span>
                  <span className="pd-notif-when">{shared.notifWhen}</span>
                </span>
                <span className="pd-notif-text">{trade.notifText}</span>
              </span>
            </m.div>
          </m.div>
        </div>
      </div>
    </div>
  );
}
