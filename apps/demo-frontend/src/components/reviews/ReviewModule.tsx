"use client";

import type { ClientReviewConfig } from "@/types";

interface ManualReview {
  reviewerName: string;
  rating: number;
  excerpt: string;
  source: string;
}

interface Props {
  config: ClientReviewConfig;
  reviews?: ManualReview[];
}

const PLACEHOLDER_REVIEWS: ManualReview[] = [
  {
    reviewerName: "Sample Customer",
    rating: 5,
    excerpt: "Fast, professional, and fair pricing. Would recommend to anyone in the area.",
    source: "Yelp",
  },
  {
    reviewerName: "Sample Customer",
    rating: 5,
    excerpt: "Came out same day and had it fixed within two hours. Excellent service.",
    source: "Google",
  },
];

export default function ReviewModule({ config, reviews }: Props) {
  if (!config.enabled) return null;

  const displayReviews = reviews ?? (config.verified ? [] : PLACEHOLDER_REVIEWS);

  return (
    <section style={{ marginTop: "48px" }}>
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            fontSize: "11px",
            fontWeight: 900,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            marginBottom: "6px",
          }}
        >
          Customer Reviews
        </div>
        <h2 style={{ fontSize: "clamp(20px, 3.5vw, 32px)", fontWeight: 900, margin: 0 }}>
          What customers say.
        </h2>
      </div>

      {!config.verified && (
        <p
          style={{
            fontSize: "12px",
            color: "var(--color-muted)",
            marginBottom: "16px",
            padding: "10px 14px",
            background: "var(--color-surface)",
            borderLeft: "3px solid var(--color-accent)",
          }}
        >
          Sample reviews — not yet verified against this business&apos;s listing.
        </p>
      )}

      <div style={{ display: "grid", gap: "14px" }}>
        {displayReviews.map((review, i) => (
          <div
            key={i}
            style={{
              background: "var(--color-surface)",
              padding: "20px",
              borderRadius: "6px",
              border: "1px solid #333",
            }}
          >
            <div style={{ color: "var(--color-accent)", marginBottom: "6px" }}>
              {"★".repeat(review.rating)}
            </div>
            <p style={{ margin: "0 0 10px", lineHeight: 1.6 }}>&ldquo;{review.excerpt}&rdquo;</p>
            <div style={{ fontSize: "12px", color: "var(--color-muted)" }}>
              {review.reviewerName} &middot; {review.source}
            </div>
          </div>
        ))}
      </div>

      {config.yelpUrl && (
        <div style={{ marginTop: "16px" }}>
          <a
            href={config.yelpUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--color-accent)", fontSize: "13px", fontWeight: 700 }}
          >
            See all reviews on Yelp →
          </a>
        </div>
      )}
    </section>
  );
}
