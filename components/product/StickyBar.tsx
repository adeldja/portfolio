"use client";

import { useEffect, useState } from "react";

/** Mobile quick actions. Slides away (transform only) while the contact section is visible. */
export default function StickyBar({ phoneTel }: { phoneTel: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting));
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Contact rapide"
      className="pd-sticky pd-dark"
      data-hidden={hidden || undefined}
      aria-hidden={hidden || undefined}
    >
      <a className="pd-btn pd-btn--secondary" href={phoneTel} tabIndex={hidden ? -1 : undefined}>
        Appeler
      </a>
      <a className="pd-btn pd-btn--primary" href="#contact" tabIndex={hidden ? -1 : undefined}>
        Devis gratuit
      </a>
    </nav>
  );
}
