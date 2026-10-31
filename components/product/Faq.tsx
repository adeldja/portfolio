import WordMask from "@/components/product/WordMask";
import { SERVICES_PHONE_DISPLAY, SERVICES_PHONE_TEL, serviceFaq } from "@/lib/services";

export default function Faq() {
  return (
    <section id="faq" className="pd-section pd-faq" aria-labelledby="faq-title">
      <div className="pd-wrap pd-faq-grid">
        <div className="pd-faq-aside">
          <WordMask id="faq-title" text="Questions fréquentes" />
          <p className="pd-body">
            Une autre question ? <a href="#contact">Écrivez-moi</a> ou appelez le{" "}
            <a href={SERVICES_PHONE_TEL}>{SERVICES_PHONE_DISPLAY}</a>.
          </p>
        </div>
        <div className="pd-faq-list">
          {serviceFaq.map((item) => (
            <details className="pd-faq-item" key={item.question}>
              <summary className="pd-faq-q">
                <span>{item.question}</span>
                <span className="pd-faq-icon" aria-hidden="true" />
              </summary>
              <p className="pd-faq-a">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
