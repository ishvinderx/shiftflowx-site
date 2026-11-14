"use client";

import { useEffect } from "react";
import { AppStoreButton, Container, Heading, Label, Lede } from "@/components/ui";
import { APP_STORE_URL, PRICING } from "@/lib/constants";

interface Props {
  code: string;
}

const POINTS = [
  { title: "Track shifts and pay", description: "Log every shift in seconds and know what you earned." },
  { title: "Payday and budget", description: "Know when you get paid, with budget and bill reminders." },
  { title: "Tax, invoices and scanning", description: "Tax reports, invoices, and receipt and payslip scanning with Pro." },
];

async function fireClickEvent(referralCode: string) {
  try {
    await fetch("/api/ref/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: referralCode }),
    });
  } catch {
    // silently ignore: never throw to the visitor
  }
}

export default function ReferralLandingClient({ code }: Props) {
  useEffect(() => {
    // Persist the referral code so the app install can be attributed.
    try {
      localStorage.setItem("sf_ref_code", code);
    } catch {
      // storage unavailable: ignore
    }
    fireClickEvent(code);
  }, [code]);

  return (
    <Container className="py-16 sm:py-24">
      <div className="grid max-w-[40rem] gap-6">
        <Label>You have been invited</Label>
        <Heading level="display" as="h1">A friend sent you to HoursFlow</Heading>
        <Lede>
          Take control of your shifts, earnings and payday. Pro includes a {PRICING.trialDays}-day free trial.
        </Lede>
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <AppStoreButton href={APP_STORE_URL} />
        </div>
        <p className="text-[0.9375rem] text-ink-2">Free to download. {PRICING.trialDays}-day Pro trial. Cancel anytime.</p>
      </div>

      <ul className="mt-16 grid border-b border-rule md:grid-cols-3 md:gap-10 md:border-b-0">
        {POINTS.map((p) => (
          <li key={p.title} className="border-t border-rule py-6">
            <Heading level="h3" as="h2">{p.title}</Heading>
            <p className="t-body mt-2 text-ink-2">{p.description}</p>
          </li>
        ))}
      </ul>

      <p className="num mt-10 text-[0.875rem] text-ink-2">Referral code: {code}</p>
    </Container>
  );
}
