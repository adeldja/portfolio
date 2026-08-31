"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import type { RecommendationItem } from "@/lib/content";

const DOCUMENT_WIDTH = 1488;
const DOCUMENT_HEIGHT = 2104;

const LETTER_IMAGE_SRC = "/recommendation-letter.jpg";
const LETTER_PDF_SRC = "/recommendation-letter.pdf";
const DIPLOMA_IMAGE_SRC = "/diploma.jpg";
const DIPLOMA_PDF_SRC = "/diploma.pdf";

function RecommendationCard({
  item,
  imageSrc,
  pdfSrc,
}: {
  item: RecommendationItem;
  imageSrc: string;
  pdfSrc: string;
}) {
  return (
    <div className="recommendation-item">
      <p className="recommendation-label mono">{item.label}</p>
      <div className="recommendation-frame">
        <Image
          className="recommendation-image"
          src={imageSrc}
          alt={item.imageAlt}
          width={DOCUMENT_WIDTH}
          height={DOCUMENT_HEIGHT}
          sizes="(max-width: 480px) 100vw, 340px"
        />
      </div>
      <a
        className="recommendation-download"
        href={pdfSrc}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.downloadLabel}
      </a>
    </div>
  );
}

export default function Recommendation() {
  const { t } = useLanguage();

  return (
    <section id="recommandation" className="section">
      <h2 className="section-title">{t.sectionTitles.recommandation}</h2>
      <div className="recommendation-grid">
        <RecommendationCard
          item={t.recommendation.letter}
          imageSrc={LETTER_IMAGE_SRC}
          pdfSrc={LETTER_PDF_SRC}
        />
        <RecommendationCard
          item={t.recommendation.diploma}
          imageSrc={DIPLOMA_IMAGE_SRC}
          pdfSrc={DIPLOMA_PDF_SRC}
        />
      </div>
    </section>
  );
}
