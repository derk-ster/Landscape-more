import { business } from "@/data/business";

export function Footer() {
  return (
    <footer className="border-t border-sage-100 bg-sage-50/80 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-lg font-semibold text-sage-900">
              {business.name}
            </p>
            <p className="text-sm text-sage-600">{business.subtitle}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-sage-800">Location</p>
            <p className="mt-1 text-sm text-sage-600">{business.address}</p>
            <a
              href={business.phoneTel}
              className="mt-2 block text-sm text-sage-700 hover:text-sage-900"
            >
              {business.phone}
            </a>
          </div>
          <div>
            <p className="text-sm font-medium text-sage-800">Hours</p>
            <p className="mt-1 text-sm text-sage-600">
              Mon–Fri: 9 AM–5:30 PM
            </p>
            <p className="text-sm text-sage-600">Sat: 9 AM–2 PM</p>
            <p className="text-sm text-sage-600">Sun: Closed</p>
          </div>
          <div>
            <p className="text-sm font-medium text-sage-800">Store</p>
            <p className="mt-1 text-sm text-sage-600">Delivery Available</p>
            <p className="mt-4 text-xs text-sage-500">
              Website demo concept for {business.name}.
            </p>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-sage-500">
          © {new Date().getFullYear()} {business.name}. Demo site.
        </p>
      </div>
    </footer>
  );
}
