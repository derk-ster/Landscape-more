"use client";

import { StoreImage } from "@/components/StoreImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useCallback, useEffect, useState } from "react";

export type LightboxSlide = {
  src: string;
  alt: string;
  caption?: string;
};

type Props = {
  slide: LightboxSlide | null;
  onClose: () => void;
};

export function GalleryLightbox({ slide, onClose }: Props) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
    setVisible(false);
    const delay = reducedMotion ? 0 : 300;
    window.setTimeout(() => {
      onClose();
      setClosing(false);
    }, delay);
  }, [onClose, reducedMotion]);

  useEffect(() => {
    if (!slide) {
      setVisible(false);
      return;
    }

    setClosing(false);
    setVisible(false);
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [slide, handleClose]);

  if (!slide) return null;

  const showAnim = visible && !closing;

  return (
    <div
      className={`lightbox-root fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 ${
        showAnim ? "lightbox-open" : "lightbox-closed"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={slide.alt}
    >
      <button
        type="button"
        className="lightbox-backdrop absolute inset-0 bg-sage-900/75 backdrop-blur-md"
        onClick={handleClose}
        aria-label="Close photo"
      />

      <div
        className={`lightbox-panel relative z-10 flex w-full max-w-4xl flex-col items-center ${
          reducedMotion ? "" : "lightbox-panel-motion"
        }`}
      >
        <div
          className={`lightbox-animated-border color-border-gradient w-full ${reducedMotion ? "lightbox-border-static" : ""}`}
        >
          <div className="lightbox-image-shell">
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
              <StoreImage
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 1024px) 95vw, 900px"
                className="rounded-[1.125rem]"
              />
            </div>
          </div>
        </div>

        {slide.caption && (
          <p className="lightbox-caption mt-4 max-w-2xl text-center text-sm text-cream-100 sm:text-base">
            {slide.caption}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleClose}
        className="lightbox-close absolute top-4 right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/95 text-sage-800 shadow-lg transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-400"
        aria-label="Close enlarged photo"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
