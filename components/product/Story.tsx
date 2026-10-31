"use client";

import { useEffect, useRef, useState } from "react";
import MotionProvider from "@/components/product/MotionProvider";
import Phone from "@/components/product/Phone";
import WordMask from "@/components/product/WordMask";
import type { StoryShared, StoryTrade } from "@/lib/product";

export interface StoryChapter {
  title: string;
  text: string;
}

// Without JS: no pinning, every chapter visible, the phone in its final state.
const NO_JS_CSS = `<style>
.pd .pd-triggers,.pd .pd-picker{display:none}
.pd .pd-track{display:block}
.pd .pd-stage{position:static;height:auto}
.pd .pd-chapters,.pd .pd-chapter-box{height:auto}
.pd .pd-chapter{position:static;grid-area:auto;opacity:1;transform:none;margin-bottom:2rem}
.pd .pd-site-item{opacity:1!important;transform:none!important}
.pd .pd-layer-search{opacity:0!important}
.pd .pd-notif{opacity:1!important;transform:none!important}
</style>`;

export default function Story({
  chapters,
  trades,
  shared,
}: {
  chapters: StoryChapter[];
  trades: StoryTrade[];
  shared: StoryShared;
}) {
  const [active, setActive] = useState(0);
  const [tradeIndex, setTradeIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const triggersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = triggersRef.current;
    if (!root) return;
    const triggers = Array.from(root.querySelectorAll<HTMLElement>("[data-chapter]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.chapter));
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    triggers.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const trade = trades[tradeIndex];

  return (
    <section id="vitrine" className="pd-section pd-story" aria-labelledby="story-title">
      <noscript dangerouslySetInnerHTML={{ __html: NO_JS_CSS }} />
      <div className="pd-wrap">
        <WordMask id="story-title" text="Votre vitrine se construit sous vos yeux." />
      </div>

      <div className="pd-track">
        <div className="pd-triggers" ref={triggersRef} aria-hidden="true">
          {chapters.map((chapter, index) => (
            <div key={chapter.title} data-chapter={index} />
          ))}
        </div>

        <div className="pd-stage" data-active={active}>
          <div className="pd-wrap pd-stage-grid">
            <fieldset className="pd-picker">
              <legend className="pd-sr">{shared.legend}</legend>
              <div className="pd-picker-row">
                {trades.map((item, index) => (
                  <label className="pd-pill" key={item.id}>
                    <input
                      className="pd-pill-input"
                      type="radio"
                      name="pd-trade"
                      value={item.id}
                      checked={index === tradeIndex}
                      onChange={() => {
                        setTradeIndex(index);
                        setInteracted(true);
                      }}
                    />
                    <span className="pd-pill-face">{item.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="pd-device">
              <MotionProvider>
                <Phone trade={trade} shared={shared} state={active} interacted={interacted} />
              </MotionProvider>
              <p className="pd-caption">{shared.caption}</p>
            </div>

            <div className="pd-chapter-box">
              <ol className="pd-chapters">
                {chapters.map((chapter) => (
                  <li className="pd-chapter" key={chapter.title}>
                    <h3 className="pd-chapter-title">{chapter.title}</h3>
                    <p className="pd-chapter-text">{chapter.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
