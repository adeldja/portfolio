import Title from "@/components/services/Title";
import PhoneMockup from "@/components/services/PhoneMockup";
import { serviceStory } from "@/lib/services";

export default function Story() {
  return (
    <section id="vitrine" className="sv-story sv-theme-night" aria-labelledby="story-title">
      <div className="sv-container sv-story-grid">
        <div className="sv-story-head">
          <p className="sv-kicker sv-mono">Exemple fictif</p>
          <Title
            id="story-title"
            parts={["Votre vitrine se construit ", { em: "sous vos yeux" }, "."]}
          />
        </div>

        <div className="sv-story-stage">
          <PhoneMockup />
        </div>

        <ol className="sv-story-steps">
          {serviceStory.map((step, index) => (
            <li className="sv-story-step" key={step.title}>
              <div className="sv-story-card">
                <span className="sv-story-num sv-mono">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="sv-story-card-title">{step.title}</h3>
                <p className="sv-story-card-text">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
