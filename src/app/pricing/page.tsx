import type { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing — ShiftFlow",
  description:
    "Simple, transparent pricing. Try ShiftFlow Pro free for 7 days, then $9.99/month or $99/year. Cancel anytime.",
};

export default function Page() {
  return <PricingClient />;
}
