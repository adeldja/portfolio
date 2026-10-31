import { RevealGroup } from "@/components/product/motion/reveal";

/** Server-safe heading: full text for assistive tech, masked words for the eye. */
export default function WordMask({
  text,
  id,
  className,
  as = "h2",
  tabIndex,
}: {
  text: string;
  id?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  tabIndex?: number;
}) {
  const words = text.split(" ");
  return (
    <RevealGroup
      preset="mask"
      stagger={0.06}
      amount={0.5}
      as={as}
      id={id}
      tabIndex={tabIndex}
      className={className ? `pd-h2 ${className}` : "pd-h2"}
    >
      <span className="pd-sr">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={index}>
            <span className="pd-mask">
              <span className="pd-mask-in">{word}</span>
            </span>
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </RevealGroup>
  );
}
