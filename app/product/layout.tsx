import type { ReactNode } from "react";
import { Schibsted_Grotesk } from "next/font/google";
import "./product.css";

const font = Schibsted_Grotesk({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  variable: "--pd-font",
  display: "swap",
});

export default function ProductLayout({ children }: { children: ReactNode }) {
  return <div className={`pd ${font.variable}`}>{children}</div>;
}
