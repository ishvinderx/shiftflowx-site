import type { NextRequest } from "next/server";

// In-memory rate limiter: key = ip:code → timestamp of last click
const rateLimit = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 3_600_000; // 1 hour

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json().catch(() => ({})) as { code?: unknown };
    const code = typeof body.code === "string" ? body.code.trim() : "";

    if (!code) {
      return Response.json({ ok: true });
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const rateLimitKey = `${ip}:${code}`;
    const lastClick = rateLimit.get(rateLimitKey);
    const now = Date.now();

    if (lastClick !== undefined && now - lastClick < RATE_LIMIT_WINDOW_MS) {
      // Rate limited — silently succeed
      return Response.json({ ok: true });
    }

    rateLimit.set(rateLimitKey, now);

    // Forward to backend
    const backendUrl = process.env.BACKEND_URL;
    const secret = process.env.INTERNAL_API_SECRET;

    if (backendUrl && secret) {
      try {
        await fetch(`${backendUrl}/api/v1/referrals/click`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: secret,
          },
          body: JSON.stringify({ code, ip }),
        });
      } catch {
        // Backend unreachable — swallow error, never expose to client
      }
    }
  } catch {
    // Malformed request — swallow, never throw to client
  }

  return Response.json({ ok: true });
}
