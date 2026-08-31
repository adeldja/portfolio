"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import type { Locale } from "@/lib/locales";
import { defaultLocale } from "@/lib/locales";
import frMessages from "@/messages/fr.json";
import enMessages from "@/messages/en.json";

const messagesByLocale: Record<Locale, typeof frMessages> = {
  fr: frMessages,
  en: enMessages,
};

const SetLocaleContext = createContext<((locale: Locale) => void) | null>(null);

export function useSetLocale() {
  const setLocale = useContext(SetLocaleContext);
  if (!setLocale) {
    throw new Error("useSetLocale must be used within Providers");
  }
  return setLocale;
}

export function Providers({ children }: { children: ReactNode }) {
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
        {children}
      </NextIntlClientProvider>
    </SetLocaleContext.Provider>
  );
}
