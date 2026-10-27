import { serviceGuarantees } from "@/lib/services";

export default function Guarantees() {
  return (
    <section id="engagements" className="section">
      <h2 className="section-title">Mes engagements</h2>
      <ul className="guarantee-grid">
        {serviceGuarantees.map((guarantee) => (
          <li className="guarantee-item" key={guarantee.title}>
            <h3 className="guarantee-title">{guarantee.title}</h3>
            <p className="guarantee-text">{guarantee.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
