"use client";

/**
 * TestimonialsGated
 *
 * Renders NOTHING until real, verified user reviews are available.
 *
 * How to activate:
 * 1. Add a `reviews` table to the database.
 * 2. Fetch verified reviews from the API in a parent Server Component.
 * 3. Pass them via the `reviews` prop.
 * 4. This component will render the review grid automatically.
 *
 * Until then: this component returns null — no fake social proof,
 * no placeholder stars, no invented quotes.
 */

interface Review {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  verifiedAt: string; // ISO date from DB
  rating: number; // 1-5
}

interface TestimonialsGatedProps {
  /** Pass real verified reviews from your DB. Leave empty to render nothing. */
  reviews?: Review[];
}

export default function TestimonialsGated({ reviews }: TestimonialsGatedProps) {
  // If no verified reviews exist yet, render nothing.
  // We don't show fake reviews, placeholder stars, or marketing copy.
  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <section className="relative py-24 md:py-32 bg-[#080810] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(214,60,107,0.04)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-14">
          <p className="text-[#D63C6B] text-xs font-semibold uppercase tracking-widest mb-3">
            Reviews
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            What workers say.
          </h2>
          <p className="text-white/45 text-base max-w-xl mx-auto leading-relaxed">
            Verified reviews from real ShiftFlow users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-white/75 text-base leading-relaxed flex-1 mb-6">
                &ldquo;{review.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.07]">
                <div className="w-10 h-10 rounded-full bg-white/[0.08] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {review.authorName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white font-semibold text-sm">
                      {review.authorName}
                    </p>
                    <span className="px-1.5 py-0.5 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded text-[#22C55E] text-[9px] font-semibold">
                      Verified ✓
                    </span>
                  </div>
                  <p className="text-white/40 text-xs mt-0.5">{review.authorRole}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
