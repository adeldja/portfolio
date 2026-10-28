import Title from "@/components/services/Title";
import { serviceOffers } from "@/lib/services";

function Check() {
  return (
    <svg className="sv-check" viewBox="0 0 18 18" width="18" height="18" aria-hidden="true" focusable="false">
      <circle cx="9" cy="9" r="9" />
      <path d="M5.2 9.3 L7.8 11.8 L12.8 6.6" fill="none" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Offers() {
  return (
    <section id="offres" className="sv-section sv-offers sv-theme-day" aria-labelledby="offres-title">
      <div className="sv-container">
        <Title id="offres-title" parts={[{ em: "Offres" }]} />
        <div className="sv-offer-grid">
          {serviceOffers.map((offer, index) => (
            <article
              className={`sv-offer${index === 1 ? " sv-offer--featured" : ""}`}
              key={offer.name}
            >
              <h3 className="sv-offer-name">{offer.name}</h3>
              <p className="sv-offer-price">{offer.price}</p>
              <p className="sv-offer-desc">{offer.description}</p>
              <ul className="sv-offer-items">
                {offer.items.map((item) => (
                  <li key={item}>
                    <Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                className="sv-btn sv-btn--primary sv-offer-cta"
                href={`/services?besoin=${offer.besoin}#contact`}
                data-besoin={offer.besoin}
              >
                {offer.cta} <span className="sv-arrow" aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
        <p className="sv-offer-note">
          Prix indicatifs. Après notre rendez-vous, vous recevez un devis à prix fixe. Paiement en
          deux fois : 40 % au démarrage, le solde à la livraison.
        </p>
      </div>
    </section>
  );
}
