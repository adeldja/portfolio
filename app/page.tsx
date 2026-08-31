"use client";

import { useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import type { Locale } from "@/lib/locales";
import { defaultLocale } from "@/lib/locales";
import { SetLocaleContext } from "@/lib/locale-context";
import frMessages from "@/messages/fr.json";
import enMessages from "@/messages/en.json";
import Rail from "@/components/Rail";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import OtherProjects from "@/components/OtherProjects";
import Skills from "@/components/Skills";
import Recommendation from "@/components/Recommendation";
import Contact from "@/components/Contact";

const messagesByLocale: Record<Locale, typeof frMessages> = {
  fr: frMessages,
  en: enMessages,
};

export default function Home() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <SetLocaleContext.Provider value={setLocale}>
      <NextIntlClientProvider
        locale={locale}
        messages={messagesByLocale[locale]}
        timeZone="Europe/Paris"
      >
        <Rail />
        <main className="main">
          <div className="main-inner">
            <Hero />
            <Projects />
            <Experience />
            <OtherProjects />
            <Skills />
            <Recommendation />
            <Contact />
          </div>
        </main>
      </NextIntlClientProvider>
    </SetLocaleContext.Provider>
  );
}
