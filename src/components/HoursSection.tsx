"use client";

import { storeHours, formatHoursDisplay, getStoreStatus } from "@/data/hours";
import { useEffect, useState } from "react";
import { Reveal } from "./ui/Reveal";

export function HoursSection() {
  const [status, setStatus] = useState(() => getStoreStatus());
  const todayIndex = new Date().getDay();

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getStoreStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hours"
      className="py-16 sm:py-20 bg-sage-50/60"
      aria-labelledby="hours-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 id="hours-heading" className="font-serif text-2xl font-semibold text-sage-900 sm:text-3xl text-center">
            Store hours
          </h2>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span
              className={`open-badge rounded-full px-4 py-1.5 text-sm font-medium ${
                status.isOpen
                  ? "bg-sage-100 text-sage-800 open-badge-glow"
                  : "bg-sage-200/60 text-sage-700"
              }`}
            >
              {status.label}
            </span>
            <span className="rounded-full border border-sage-200 bg-white px-4 py-1.5 text-sm text-sage-700">
              Quick Visit
            </span>
            <span className="rounded-full border border-sage-200 bg-white px-4 py-1.5 text-sm text-sage-700">
              Delivery Available
            </span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <ul className="mt-8 rounded-2xl border border-sage-200/60 bg-white shadow-soft overflow-hidden">
            {storeHours.map((h) => {
              const isToday = h.dayIndex === todayIndex;
              return (
                <li
                  key={h.day}
                  className={`flex justify-between gap-4 border-b border-sage-50 px-5 py-3.5 last:border-0 ${
                    isToday ? "bg-sage-50/80 font-medium" : ""
                  }`}
                >
                  <span className="text-sage-800">
                    {h.day}
                    {isToday && (
                      <span className="ml-2 text-xs text-sage-600">(Today)</span>
                    )}
                  </span>
                  <span className="text-sage-600 text-sm sm:text-base">
                    {formatHoursDisplay(h)}
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
