"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSetLocale } from "@/lib/locale-context";
import type { Locale } from "@/lib/locales";

interface NavItem {
  key: "hero" | "projets" | "experience" | "autres" | "competences" | "recommandation" | "contact";
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
  locale: Locale;
  setLocale: (locale: Locale) => void;
  className: string;
}

function LangButtons({ locale, setLocale, className }: LangButtonsProps) {
  return (
    <div className={className}>
      <button
        type="button"
        className="lang-toggle-btn"
        data-active={locale === "fr"}
        aria-pressed={locale === "fr"}
        onClick={() => setLocale("fr")}
      >
        FR
      </button>
      <button
        type="button"
        className="lang-toggle-btn"
        data-active={locale === "en"}
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
      >
        EN
      </button>
    </div>
  );
}

export default function Rail() {
  const locale = useLocale() as Locale;
  const setLocale = useSetLocale();
  const t = useTranslations("Nav");
  const tHero = useTranslations("Hero");
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
          <p className="rail-name mono">{tHero("title")}</p>
          <ul className="rail-nav">
            {NAV_ITEMS.map((item) => {
              const label = t(item.key);
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
            <LangButtons locale={locale} setLocale={setLocale} className="lang-toggle" />
          </div>
        </div>
      </aside>
      <LangButtons
        locale={locale}
        setLocale={setLocale}
        className="lang-toggle-mobile lang-toggle"
      />
    </>
  );
}
