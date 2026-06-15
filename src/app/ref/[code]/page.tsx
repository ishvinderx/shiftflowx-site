import type { Metadata } from "next";
import ReferralLandingClient from "./ReferralLandingClient";

interface Props {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;

  return {
    title: "You've Been Invited to ShiftFlow",
    description:
      "Your friend wants you to take control of your shifts, earnings, and career. Download ShiftFlow free for 30 days — no credit card required.",
    openGraph: {
      title: "You've Been Invited to ShiftFlow",
      description:
        "Your friend wants you to take control of your shifts, earnings, and career. Download ShiftFlow free for 30 days — no credit card required.",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "ShiftFlow — AI Shift Tracker & Payday Forecasting App",
        },
      ],
      type: "website",
      url: `https://shiftflowx.net/ref/${code}`,
      siteName: "ShiftFlow",
    },
    twitter: {
      card: "summary_large_image",
      title: "You've Been Invited to ShiftFlow",
      description:
        "Take control of your shifts, earnings, and career — free for 30 days.",
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
