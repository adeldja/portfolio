import type { ReactNode } from "react";
import { Bricolage_Grotesque, Instrument_Serif, Inter_Tight } from "next/font/google";
import "lenis/dist/lenis.css";
import "./services.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--sv-font-display",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--sv-font-serif",
  display: "swap",
});

const body = Inter_Tight({
  subsets: ["latin"],
  variable: "--sv-font-body",
  display: "swap",
});

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`svc ${display.variable} ${serif.variable} ${body.variable}`}>{children}</div>
  );
}
