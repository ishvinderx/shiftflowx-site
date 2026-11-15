import type { Metadata } from "next";
import ReferralLandingClient from "./ReferralLandingClient";
import { SITE_URL } from "@/lib/constants";

interface Props {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;

  return {
    title: "You've Been Invited to HoursFlow",
    description:
      "Your friend wants you to take control of your shifts, earnings, and payday. Try HoursFlow Pro free for 7 days.",
    openGraph: {
      title: "You've Been Invited to HoursFlow",
      description:
        "Your friend wants you to take control of your shifts, earnings, and payday. Try HoursFlow Pro free for 7 days.",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "HoursFlow — Shift Tracker & Payday App",
        },
      ],
      type: "website",
      url: `${SITE_URL}/ref/${code}`,
      siteName: "HoursFlow",
    },
    twitter: {
      card: "summary_large_image",
      title: "You've Been Invited to HoursFlow",
      description:
        "Take control of your shifts, earnings, and payday — free for 7 days.",
      images: ["/opengraph-image"],
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ReferralPage({ params }: Props) {
  const { code } = await params;
  return <ReferralLandingClient code={code} />;
}
