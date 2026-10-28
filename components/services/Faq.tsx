import Title from "@/components/services/Title";
import { SERVICES_PHONE_DISPLAY, SERVICES_PHONE_TEL, serviceFaq } from "@/lib/services";

export default function Faq() {
  return (
    <section id="faq" className="sv-section sv-faq sv-theme-day" aria-labelledby="faq-title">
      <div className="sv-container sv-split">
        <div className="sv-split-aside sv-faq-aside">
          <Title id="faq-title" parts={["Questions ", { em: "fréquentes" }]} />
          <p className="sv-faq-more">
            Une autre question ? <a href="#contact">Écrivez-moi</a> ou appelez le{" "}
            <a href={SERVICES_PHONE_TEL}>{SERVICES_PHONE_DISPLAY}</a>.
          </p>
        </div>
        <div className="sv-faq-list" data-reveal="">
          {serviceFaq.map((item) => (
            <details className="sv-faq-item" key={item.question}>
              <summary className="sv-faq-q">
                <span>{item.question}</span>
                <span className="sv-faq-icon" aria-hidden="true" />
              </summary>
              <p className="sv-faq-a">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
