"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "@/lib/locales";

type SetLocale = (locale: Locale) => void;

const LocaleSwitchContext = createContext<SetLocale | null>(null);

export function LocaleSwitchProvider({
  children,
  setLocale,
}: {
  children: ReactNode;
  setLocale: SetLocale;
}) {
  return (
    <LocaleSwitchContext.Provider value={setLocale}>{children}</LocaleSwitchContext.Provider>
  );
}

export function useSetLocale(): SetLocale {
  const ctx = useContext(LocaleSwitchContext);
  if (!ctx) {
    throw new Error("useSetLocale must be used within a LocaleSwitchProvider");
  }
  return ctx;
}
