"use client";

import { business } from "@/data/business";
import { HERO_GALLERY_FILE } from "@/data/gallery-sections";
import { galleryManifest } from "@/data/images";
import { scrollToId } from "@/lib/utils";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { StoreImage } from "./StoreImage";

const badges = ["4.5 Stars", "Delivery Available"];

function getHeroBackgroundSrc(): string | null {
  const fromGallery = galleryManifest.gallery.find(
    (g) => g.file === HERO_GALLERY_FILE
  );
  return fromGallery?.src ?? null;
}

export function Hero() {
  const heroBg = getHeroBackgroundSrc();

  return (
    <section
      id="home"
      className="relative min-h-[min(72vh,520px)] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {heroBg ? (
        <div className="absolute inset-0" aria-hidden>
          <StoreImage
            src={heroBg}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream-50/92 via-cream-50/88 to-cream-50/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-cream-50/90 via-cream-50/75 to-cream-50/40" />
        </div>
      ) : (
        <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />
      )}

      <div className="relative z-10 mx-auto flex min-h-[min(72vh,520px)] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
        <Reveal className="max-w-2xl">
          <h1
            id="hero-heading"
            className="font-serif text-3xl font-semibold leading-tight text-sage-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight"
          >
            Plants, pots, yard art, and supplies for{" "}
            <span className="hero-highlight">your next project</span>.
          </h1>
          <p className="mt-4 max-w-lg text-base text-sage-800/90 sm:text-lg">
            Greenhouse plants, metal yard art, pottery, topsoil, river rock, and more on US-70 in Madill, a neighborhood shop worth the stop.
          </p>

            <div className="mt-4 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-sage-200/80 bg-white/80 px-3 py-1 text-xs font-medium text-sage-700 shadow-sm backdrop-blur-sm"
              >
                {badge}
              </span>
            ))}
          </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Button
              variant="primary"
              glow
              onClick={() => scrollToId("project-finder")}
            >
              Find Supplies
            </Button>
            <Button variant="outline" href={business.phoneTel}>
              Call Store
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
