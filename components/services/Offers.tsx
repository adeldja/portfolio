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
          </article>
        ))}
      </div>
    </section>
  );
}
