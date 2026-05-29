"use client";

import { business } from "@/data/business";
import { storeHours, formatHoursDisplay, getStoreStatus } from "@/data/hours";
import { scrollToId } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

const contactFeatures = [
  "Delivery available",
  "Onsite services",
  "Wheelchair accessible",
  "Card and mobile payments",
];

export function ContactSection() {
  const [status, setStatus] = useState(() => getStoreStatus());
  const todayIndex = new Date().getDay();

  useEffect(() => {
    const interval = setInterval(() => setStatus(getStoreStatus()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="contact"
      className="section-tight bg-white scroll-mt-20"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <h2
              id="contact-heading"
              className="font-serif text-2xl font-semibold text-sage-900 sm:text-3xl"
            >
              Visit or call
            </h2>
            <p className="mt-1 text-sm text-sage-700">
              Bring your idea in. The team can help you find what fits.
            </p>

            <address className="mt-4 not-italic text-sage-800">
              <p className="font-medium">{business.address}</p>
              <a
                href={business.phoneTel}
                className="mt-1 block text-lg font-medium hover:text-sage-600"
              >
                {business.phone}
              </a>
            </address>

            <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
              {contactFeatures.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-sage-700">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sage-500" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button variant="primary" glow href={business.phoneTel}>
                Call Store
              </Button>
              <Button variant="outline" href={business.mapsUrl} external>
                Get Directions
              </Button>
              <Button variant="ghost" onClick={() => scrollToId("project-finder")}>
                Find Supplies
              </Button>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div id="hours" className="scroll-mt-24">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-serif text-lg text-sage-900">Store hours</h3>
                <span
                  className={`rounded-full px-3 py-0.5 text-xs font-medium ${
                    status.isOpen
                      ? "bg-sage-100 text-sage-800 open-badge-glow"
                      : "bg-sage-200/60 text-sage-700"
                  }`}
                >
                  {status.label}
                </span>
              </div>

              <ul className="mt-3 rounded-xl border border-sage-200/60 bg-cream-50 text-sm shadow-sm overflow-hidden">
                {storeHours.map((h) => {
                  const isToday = h.dayIndex === todayIndex;
                  return (
                    <li
                      key={h.day}
                      className={`flex justify-between gap-3 border-b border-sage-100/80 px-4 py-2.5 last:border-0 ${
                        isToday ? "bg-sage-50/90 font-medium" : ""
                      }`}
                    >
                      <span className="text-sage-800">
                        {h.day}
                        {isToday && (
                          <span className="ml-1.5 text-xs font-normal text-sage-500">
                            Today
                          </span>
                        )}
                      </span>
                      <span className="text-sage-600">{formatHoursDisplay(h)}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
