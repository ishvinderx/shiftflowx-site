import type { NextRequest } from "next/server";
import { API_BASE_URL } from "@/lib/constants";

// Thin same-origin proxy for referral-link clicks. The backend endpoint
// (POST /api/v1/referrals/click) is public: it takes only { code }, needs no
// secret, and does its own rate limiting and hourly dedupe.
//
// KNOWN LIMIT: the backend dedupes on the TCP peer address, which for calls made
// from here is this server's egress IP, not the visitor's. Clicks on one code are
// therefore collapsed to at most one per hour per egress IP. Accurate per-visitor
// dedupe needs an API change (e.g. a trusted, signed client-IP header).
export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json().catch(() => ({})) as { code?: unknown };
    const code = typeof body.code === "string" ? body.code.trim() : "";

    if (!code) {
      return Response.json({ ok: true });
    }

    const backendUrl = (process.env.BACKEND_URL || API_BASE_URL).replace(/\/+$/, "");

    try {
      await fetch(`${backendUrl}/api/v1/referrals/click`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
    } catch {
      // Backend unreachable — swallow error, never expose to client
    }
  } catch {
    // Malformed request — swallow, never throw to client
  }

  return Response.json({ ok: true });
}
