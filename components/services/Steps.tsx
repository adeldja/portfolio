import { serviceSteps } from "@/lib/services";

export default function Steps() {
  return (
    <section id="deroulement" className="section">
      <h2 className="section-title">Comment ça se passe</h2>
      <ol className="steps">
        {serviceSteps.map((step, index) => (
          <li className="step" key={step.title}>
            <span className="step-number mono">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="step-title">{step.title}</h3>
              <p className="project-description">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
