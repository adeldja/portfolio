import WordMask from "@/components/product/WordMask";
import { RevealGroup } from "@/components/product/motion/reveal";
import { pricingNote } from "@/lib/product";
import { serviceOffers, serviceSteps } from "@/lib/services";

/** "à partir de 25 € / mois" → { from: "à partir de", amount: "25 €", unit: "/ mois" } */
function splitPrice(price: string) {
  const prefix = price.match(/^à partir de\s*/);
  const rest = prefix ? price.slice(prefix[0].length) : price;
  const slash = rest.indexOf(" / ");
  return {
    from: prefix ? prefix[0].trim() : null,
    amount: slash === -1 ? rest : rest.slice(0, slash),
    unit: slash === -1 ? null : rest.slice(slash + 1),
  };
}

export default function Pricing() {
  return (
    <>
      <section id="tarifs" className="pd-section pd-dark pd-pricing" aria-labelledby="tarifs-title">
        <div className="pd-wrap">
          <WordMask id="tarifs-title" text="Ce que ça coûte" />
          <RevealGroup as="ul" preset="mask" stagger={0.09} amount={0.4} className="pd-offers">
            {serviceOffers.map((offer) => {
              const price = splitPrice(offer.price);
              return (
                <li className="pd-offer" key={offer.name}>
                  <h3 className="pd-offer-name">{offer.name}</h3>
                  <div className="pd-offer-price">
                    <p className="pd-price">
                      {price.from ? <span className="pd-price-from">{price.from} </span> : null}
                      <span className="pd-mask">
                        <span
                          className={`pd-mask-in pd-price-amount${
                            /\d/.test(price.amount) ? "" : " pd-price-amount--text"
                          }`}
                        >
                          {price.amount}
                        </span>
                      </span>
                      {price.unit ? <span className="pd-price-unit"> {price.unit}</span> : null}
                    </p>
                  </div>
                  <div className="pd-offer-body">
                    <p className="pd-offer-desc">{offer.description}</p>
                    <ul className="pd-offer-items">
                      {offer.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <a
                    className={`pd-btn ${
                      offer.besoin === "site" ? "pd-btn--primary" : "pd-btn--secondary"
                    } pd-offer-cta`}
                    href={`/product?besoin=${offer.besoin}#contact`}
                    data-besoin={offer.besoin}
                  >
                    {offer.cta}
                  </a>
                </li>
              );
            })}
          </RevealGroup>
          <p className="pd-note">{pricingNote}</p>
        </div>
      </section>

      <section
        id="deroulement"
        className="pd-section pd-dark pd-steps-section"
        aria-labelledby="deroulement-title"
      >
        <div className="pd-wrap">
          <WordMask id="deroulement-title" text="Comment ça se passe" />
          <div className="pd-steps">
            <span className="pd-steps-track" aria-hidden="true">
              <span className="pd-steps-fill" />
            </span>
            <RevealGroup as="ol" preset="mask" stagger={0.09} amount={0.3} className="pd-steps-list">
              {serviceSteps.map((step, index) => (
                <li className="pd-step" key={step.title}>
                  <span className="pd-step-num pd-mask" aria-hidden="true">
                    <span className="pd-mask-in">{index + 1}</span>
                  </span>
                  <h3 className="pd-step-title">{step.title}</h3>
                  <p className="pd-step-text">{step.text}</p>
                </li>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>
    </>
  );
}
