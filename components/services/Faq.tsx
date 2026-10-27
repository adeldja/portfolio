import { serviceFaq } from "@/lib/services";

export default function Faq() {
  return (
    <section id="faq" className="section">
      <h2 className="section-title">Questions fréquentes</h2>
      <div className="faq-list">
        {serviceFaq.map((item) => (
          <details className="faq-item" key={item.question}>
            <summary className="faq-question">{item.question}</summary>
            <p className="faq-answer">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
