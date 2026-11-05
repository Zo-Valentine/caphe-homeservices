import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getClientConfig, listSlugs } from "@/data/clients";
import DemoShell from "@/components/layout/DemoShell";
import StepEngine from "@/components/intake/StepEngine";
import ReviewModule from "@/components/reviews/ReviewModule";
import QRDisplay from "@/components/qr/QRDisplay";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ qr?: string }>;
}

// Pre-render all known client slugs at build time
export function generateStaticParams() {
  return listSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = getClientConfig(slug);
  if (!config) return { title: "Demo not found" };
  return {
    title: `${config.branding.businessName} — Demo`,
    robots: { index: false, follow: false },
  };
}

export default async function DemoPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { qr } = await searchParams;

  const clientConfig = getClientConfig(slug);
  if (!clientConfig) return notFound();

  return (
    <DemoShell config={clientConfig} qrEntry={!!qr}>
      <StepEngine config={clientConfig} />
      {clientConfig.reviews.enabled && (
        <ReviewModule config={clientConfig.reviews} />
      )}
      <QRDisplay slug={slug} config={clientConfig} />
    </DemoShell>
  );
}
