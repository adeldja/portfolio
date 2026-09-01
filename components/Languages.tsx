"use client";

import { useTranslations } from "next-intl";
import type { LanguageItem } from "@/lib/types";

export default function Languages() {
  const tTitle = useTranslations("SectionTitles");
  const t = useTranslations("Languages");
  const items = t.raw("items") as LanguageItem[];

  return (
    <section id="langues" className="section">
      <h2 className="section-title">{tTitle("langues")}</h2>
      <div className="languages-grid">
        {items.map((language) => (
          <div className="language-item" key={language.name}>
            <h3 className="language-name">{language.name}</h3>
            <p className="language-level">{language.level}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
