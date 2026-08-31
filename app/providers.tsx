"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import type { Locale } from "@/lib/locales";
import { defaultLocale } from "@/lib/locales";
import { LocaleSwitchProvider } from "@/lib/locale-switch-context";
import frMessages from "@/messages/fr.json";
import enMessages from "@/messages/en.json";

const messagesByLocale: Record<Locale, typeof frMessages> = {
  fr: frMessages,
  en: enMessages,
};

export function Providers({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleSwitchProvider setLocale={setLocale}>
      <NextIntlClientProvider
        locale={locale}
        messages={messagesByLocale[locale]}
        timeZone="Europe/Paris"
      >
        {children}
      </NextIntlClientProvider>
    </LocaleSwitchProvider>
  );
}
