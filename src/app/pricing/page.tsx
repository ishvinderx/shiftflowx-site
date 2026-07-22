import type { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing — ShiftFlow",
  description:
    "Simple, transparent pricing. Start free for 7 days. No credit card required. ShiftFlow Pro from $9.99/month or $99/year.",
};

export default function Page() {
  return <PricingClient />;
}
