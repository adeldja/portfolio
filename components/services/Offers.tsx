import { serviceOffers } from "@/lib/services";

export default function Offers() {
  return (
    <section id="offres" className="section">
      <h2 className="section-title">Offres</h2>
      <div className="offer-grid">
        {serviceOffers.map((offer) => (
          <article className="offer-card" key={offer.name}>
            <h3 className="offer-name">{offer.name}</h3>
            <p className="offer-price mono">{offer.price}</p>
            <p className="project-description">{offer.description}</p>
            <ul className="offer-items">
              {offer.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a
              className="btn btn-outline offer-cta"
              href={`/services?besoin=${offer.besoin}#contact`}
            >
              {offer.cta}
            </a>
          </article>
        ))}
      </div>
      <p className="offer-note">
        Prix indicatifs. Après notre rendez-vous, vous recevez un devis à prix fixe. Paiement en
        deux fois : 40 % au démarrage, le solde à la livraison.
      </p>
    </section>
  );
}
