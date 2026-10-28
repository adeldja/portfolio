import type { CSSProperties, ReactNode } from "react";

export type TitlePart = string | { em: string };

interface Segment {
  text: string;
  em: boolean;
}

/**
 * Splits title parts into words. A part that starts without whitespace is glued
 * to the previous word (e.g. the final "." after an italic part).
 */
function toWords(parts: TitlePart[]): Segment[][] {
  const words: Segment[][] = [];
  let glue = false;

  for (const part of parts) {
    const em = typeof part !== "string";
    const text = typeof part === "string" ? part : part.em;
    const tokens = text.split(/(\s+)/);

    tokens.forEach((token, index) => {
      if (token === "") {
        return;
      }
      if (/^\s+$/.test(token)) {
        glue = false;
        return;
      }
      if (index === 0 && glue && words.length > 0) {
        words[words.length - 1].push({ text: token, em });
      } else {
        words.push([{ text: token, em }]);
      }
      glue = true;
    });

    if (/\s$/.test(text)) {
      glue = false;
    }
  }

  return words;
}

export function plainText(parts: TitlePart[]): string {
  return parts.map((part) => (typeof part === "string" ? part : part.em)).join("");
}

export default function Title({
  as: Tag = "h2",
  id,
  parts,
  variant,
  className,
  tabIndex,
}: {
  as?: "h1" | "h2";
  id?: string;
  parts: TitlePart[];
  variant?: "hero";
  className?: string;
  tabIndex?: number;
}) {
  const words = toWords(parts);
  const hero = variant === "hero";
  const classes = ["sv-title", hero ? "sv-title--hero" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  const nodes: ReactNode[] = [];
  words.forEach((word, index) => {
    if (index > 0) {
      nodes.push(" ");
    }
    const isEm = word.every((segment) => segment.em);
    nodes.push(
      <span
        className={isEm ? "sv-w sv-w--em" : "sv-w"}
        aria-hidden="true"
        key={index}
        style={{ "--i": index } as CSSProperties}
      >
        <span className="sv-wi">
          {word.map((segment, segmentIndex) =>
            segment.em ? (
              <span className="sv-em" key={segmentIndex}>
                {segment.text}
              </span>
            ) : (
              <span key={segmentIndex}>{segment.text}</span>
            )
          )}
        </span>
        {hero && isEm ? (
          <svg
            className="sv-underline"
            viewBox="0 0 240 24"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M4 18 C60 6 140 4 236 14" />
          </svg>
        ) : null}
      </span>
    );
  });

  return (
    <Tag
      id={id}
      className={classes}
      aria-label={plainText(parts)}
      tabIndex={tabIndex}
      data-reveal-title={hero ? undefined : ""}
    >
      {nodes}
    </Tag>
  );
}
