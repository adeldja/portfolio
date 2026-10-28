import { Fragment } from "react";
import MotionToggle from "@/components/services/MotionToggle";
import { SERVICES_TOWNS, SERVICES_TOWNS_SENTENCE, SERVICES_TRADES } from "@/lib/services";

function Row({ items, variant }: { items: string[]; variant: 1 | 2 }) {
  const run = (copy: number) => (
    <span className="sv-marquee-run" key={copy}>
      {items.map((item) => (
        <Fragment key={item}>
          <span className="sv-marquee-item">{item}</span>
          <span className="sv-marquee-sep">✦</span>
        </Fragment>
      ))}
    </span>
  );

  return (
    <div className={`sv-marquee-row sv-marquee-row--${variant}`} aria-hidden="true">
      <div className="sv-marquee-track">
        {run(0)}
        {run(1)}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="sv-marquee sv-theme-night" data-loop="">
      <p className="sv-sr-only">{SERVICES_TOWNS_SENTENCE}</p>
      <Row items={SERVICES_TRADES} variant={1} />
      <Row items={SERVICES_TOWNS} variant={2} />
      <MotionToggle iconOnly className="sv-marquee-toggle" />
    </section>
  );
}
