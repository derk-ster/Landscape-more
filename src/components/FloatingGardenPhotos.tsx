"use client";

import { floatingPhotos } from "@/data/floating-photos";
import { resolveNamedSrc } from "@/data/images";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { assetUrl } from "@/lib/assetUrl";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

type PhotoState = {
  opacity: number;
  parallaxY: number;
};

function getSectionVisibility(sectionId: string): number {
  const section = document.getElementById(sectionId);
  if (!section) return 0;

  const rect = section.getBoundingClientRect();
  const viewH = window.innerHeight;
  const sectionMid = rect.top + rect.height * 0.35;
  const viewMid = viewH * 0.45;
  const distance = Math.abs(sectionMid - viewMid);
  const falloff = viewH * 0.72;

  return Math.max(0, 1 - distance / falloff);
}

export function FloatingGardenPhotos() {
  const reducedMotion = useReducedMotion();
  const [photoState, setPhotoState] = useState<Record<string, PhotoState>>({});

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const scrollY = window.scrollY;
      const next: Record<string, PhotoState> = {};

      for (const photo of floatingPhotos) {
        const visibility = getSectionVisibility(photo.sectionId);
        const baseOpacity = reducedMotion ? visibility * 0.28 : visibility * 0.52;
        next[photo.id] = {
          opacity: baseOpacity,
          parallaxY: reducedMotion ? 0 : scrollY * photo.parallax * -0.015,
        };
      }

      setPhotoState(next);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  return (
    <div
      className="floating-garden-layer pointer-events-none fixed inset-0 z-[1] hidden 2xl:block"
      aria-hidden
    >
      {floatingPhotos.map((photo) => {
        const src = resolveNamedSrc(photo.slot);
        if (!src) return null;

        const state = photoState[photo.id] ?? { opacity: 0, parallaxY: 0 };

        return (
          <div
            key={photo.id}
            className={cn(
              "floating-garden-photo absolute will-change-transform",
              photo.side === "left" ? "floating-garden-photo--left" : "floating-garden-photo--right"
            )}
            style={{
              top: `calc(${photo.anchorVh}vh + ${state.parallaxY}px)`,
              opacity: state.opacity,
              ["--float-delay" as string]: `${photo.floatDelay}s`,
              ["--float-duration" as string]: `${photo.floatDuration}s`,
              ["--photo-rotate" as string]: `${photo.rotate}deg`,
            }}
          >
            <div
              className={cn(
                "floating-garden-photo__frame relative overflow-hidden rounded-2xl border border-sage-200/70 bg-cream-50/90 shadow-soft backdrop-blur-[2px]",
                !reducedMotion && "floating-garden-photo__frame--animate"
              )}
              style={{ width: photo.size, height: photo.size }}
            >
              <Image
                src={assetUrl(src)}
                alt=""
                width={photo.size}
                height={photo.size}
                className="h-full w-full object-cover saturate-[0.92] contrast-[0.97]"
                sizes={`${photo.size}px`}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-cream-50/20 via-transparent to-sage-900/10" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
