import { trustBarItems } from "@/data/business";

function TrustIcon({ type }: { type: string }) {
  const className = "h-5 w-5 text-sage-600";
  switch (type) {
    case "accessibility":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4a2 2 0 100-4 2 2 0 000 4zm-1 4v2H8l-1 8h2l.5-4h3l.5 4h2l-1-8h-3v-2h-1z" />
        </svg>
      );
    case "truck":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 17h8m-8 0a2 2 0 11-4 0m12 0a2 2 0 11-4 0M3 11V7h11v4m0 0l3 4m-3-4h5l2 4H3z" />
        </svg>
      );
    case "tools":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1h1a2 2 0 012 2v1a2 2 0 01-2 2h-1v1a2 2 0 11-4 0v-1H9a2 2 0 01-2-2V7a2 2 0 012-2h2V4z" />
        </svg>
      );
    case "shield":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case "card":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    default:
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}

export function TrustBar() {
  return (
    <section className="border-y border-sage-100/80 bg-sage-50/50 py-6" aria-label="Store features">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {trustBarItems.map((item) => (
            <li
              key={item.label}
              className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                <TrustIcon type={item.icon} />
              </span>
              <span className="text-xs font-medium text-sage-700 sm:text-sm">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
