import type { CSSProperties } from "react";
import Title from "@/components/services/Title";
import { serviceSteps } from "@/lib/services";

export default function Steps() {
  return (
    <section
      id="deroulement"
      className="sv-section sv-steps-section sv-theme-day"
      aria-labelledby="deroulement-title"
    >
      <div className="sv-container">
        <Title id="deroulement-title" parts={["Comment ça ", { em: "se passe" }]} />
        <ol className="sv-steps">
          {serviceSteps.map((step, index) => (
            <li
              className="sv-step"
              key={step.title}
              style={{ "--i": index } as CSSProperties}
            >
              <span className="sv-step-num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="sv-step-body">
                <h3 className="sv-step-title">{step.title}</h3>
                <p className="sv-step-text">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
