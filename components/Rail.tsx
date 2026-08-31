"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import type { Lang, NavLabels } from "@/lib/content";

interface NavItem {
  key: keyof NavLabels;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { key: "hero", id: "hero" },
  { key: "projets", id: "projets" },
  { key: "experience", id: "experience" },
  { key: "autres", id: "autres-projets" },
  { key: "competences", id: "competences" },
  { key: "recommandation", id: "recommandation" },
  { key: "contact", id: "contact" },
];

interface LangButtonsProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  className: string;
}

function LangButtons({ lang, setLang, className }: LangButtonsProps) {
  return (
    <div className={className}>
      <button
        type="button"
        className="lang-toggle-btn"
        data-active={lang === "fr"}
        aria-pressed={lang === "fr"}
        onClick={() => setLang("fr")}
      >
        FR
      </button>
      <button
        type="button"
        className="lang-toggle-btn"
        data-active={lang === "en"}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  );
}

export default function Rail() {
  const { lang, setLang, t } = useLanguage();
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    if (sections.length === 0) {
      return undefined;
    }

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target.id, entry.intersectionRatio);
        });

        let bestId: string | null = null;
        let bestRatio = 0;
        visibility.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestId) {
          setActiveId(bestId);
        }
      },
      { threshold: [0, 0.25, 0.4, 0.6, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <aside className="rail">
        <div className="rail-inner">
          <p className="rail-name mono">{t.hero.title}</p>
          <ul className="rail-nav">
            {NAV_ITEMS.map((item) => {
              const label = t.nav[item.key];
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="rail-nav-item"
                    aria-label={label}
                    data-active={activeId === item.id}
                  >
                    <span className="rail-dot" />
                    <span className="rail-nav-label">{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="rail-lang">
            <LangButtons lang={lang} setLang={setLang} className="lang-toggle" />
          </div>
        </div>
      </aside>
      <LangButtons lang={lang} setLang={setLang} className="lang-toggle-mobile lang-toggle" />
    </>
  );
}
