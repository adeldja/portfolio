import { createContext, useContext } from "react";
import type { Locale } from "@/lib/locales";

export const SetLocaleContext = createContext<((locale: Locale) => void) | null>(null);

export function useSetLocale() {
  const setLocale = useContext(SetLocaleContext);
  if (!setLocale) {
    throw new Error("useSetLocale must be used within Home");
  }
  return setLocale;
}
