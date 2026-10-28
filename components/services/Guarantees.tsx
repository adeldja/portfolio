import Title from "@/components/services/Title";
import { serviceGuarantees } from "@/lib/services";

export default function Guarantees() {
  return (
    <section id="engagements" className="sv-band-section" aria-labelledby="engagements-title">
      <div className="sv-band sv-theme-coral">
        <div className="sv-container sv-split">
          <div className="sv-split-aside">
            <Title id="engagements-title" parts={["Mes ", { em: "engagements" }]} />
          </div>
          <ul className="sv-guarantee-list">
            {serviceGuarantees.map((guarantee) => (
              <li className="sv-guarantee" key={guarantee.title} data-reveal="">
                <h3 className="sv-guarantee-title">{guarantee.title}</h3>
                <p className="sv-guarantee-text">{guarantee.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
