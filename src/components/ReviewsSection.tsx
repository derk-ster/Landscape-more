import { business } from "@/data/business";
import { reviews, reviewTags } from "@/data/reviews";
import { Reveal } from "./ui/Reveal";

export function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="section-tight bg-white"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 id="reviews-heading" className="font-serif text-2xl font-semibold text-sage-900 sm:text-3xl">
                Loved by local customers
              </h2>
              <p className="mt-2 text-sage-700">Real reviews from Madill and nearby.</p>
            </div>
            <div className="mt-6 sm:mt-0 text-center sm:text-right">
              <p className="font-serif text-5xl font-semibold text-sage-800">{business.rating}</p>
              <div className="mt-1 flex justify-center gap-0.5 sm:justify-end" aria-label="4.5 out of 5 stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-5 w-5 ${star <= 4 ? "text-gold-400" : "text-sage-200"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
            {reviewTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-sage-200 bg-cream-50 px-3 py-1 text-xs text-sage-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 6).map((review, i) => (
            <Reveal key={review.id} delay={i * 40}>
              <blockquote className="h-full rounded-2xl border border-sage-100 bg-cream-50 p-5 shadow-sm">
                <p className="text-sm text-sage-800 leading-relaxed">&ldquo;{review.quote}&rdquo;</p>
                <footer className="mt-3 flex flex-wrap gap-1.5">
                  {review.tags.map((tag) => (
                    <span key={tag} className="text-xs text-sage-500">
                      {tag}
                    </span>
                  ))}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
