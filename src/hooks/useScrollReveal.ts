"use client";

import { useEffect, useRef, useState } from "react";

function isInViewport(el: HTMLElement, threshold = 0.12): boolean {
  const rect = el.getBoundingClientRect();
  const visibleHeight =
    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
  return visibleHeight >= rect.height * threshold || rect.top < window.innerHeight * 0.9;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.12
) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => setVisible(true);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      show();
      return;
    }

    const revealIfVisible = () => {
      if (isInViewport(el, threshold)) {
        show();
        return true;
      }
      return false;
    };

    if (revealIfVisible()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);

    const fallback = window.setTimeout(show, 1500);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [threshold]);

  return { ref, visible };
}
