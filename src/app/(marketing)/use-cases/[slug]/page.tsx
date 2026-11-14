import type { Metadata } from "next";
import { notFound } from "next/navigation";
import UseCasePage from "@/components/marketing/UseCasePage";
import { getUseCase, USE_CASES } from "@/content/use-cases";
import { SITE_URL } from "@/lib/constants";

export const dynamicParams = false;

export function generateStaticParams() {
  return USE_CASES.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const u = getUseCase(slug);
  if (!u) return {};
  const url = `${SITE_URL}/use-cases/${u.slug}`;
  return { title: u.metaTitle, description: u.metaDescription, alternates: { canonical: url }, openGraph: { title: u.metaTitle, description: u.metaDescription, url } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = getUseCase(slug);
  if (!u) notFound();
  return <UseCasePage data={u} />;
}
