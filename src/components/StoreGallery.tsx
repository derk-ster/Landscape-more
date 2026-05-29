"use client";

import { galleryManifest } from "@/data/images";
import { galleryPhotoMeta } from "@/data/gallery-photos";
import {
  gallerySections,
  getSectionForFile,
  isHeroGalleryFile,
  type GallerySectionId,
} from "@/data/gallery-sections";
import { useMemo, useState } from "react";
import { GalleryLightbox, type LightboxSlide } from "./GalleryLightbox";
import { StoreImage } from "./StoreImage";
import { Reveal } from "./ui/Reveal";

type GalleryItem = LightboxSlide & { id: string };

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="gallery-section-header mb-4 mt-6 first:mt-0">
      <h3 className="w-fit font-serif text-xl font-semibold text-sage-900 sm:text-2xl">
        <span className="block">{title}</span>
        <span className="gallery-section-rule mt-2 block" aria-hidden />
      </h3>
      <p className="mt-3 max-w-2xl text-sm text-sage-600">{description}</p>
    </div>
  );
}

function GalleryThumb({
  item,
  onOpen,
}: {
  item: GalleryItem;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="gallery-thumb group relative h-full min-h-0 w-full overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2"
    >
      <span className="gallery-thumb-border" aria-hidden />
      <span className="gallery-thumb-inner block h-full w-full overflow-hidden rounded-2xl">
        <StoreImage
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-sage-900/0 transition duration-300 group-hover:bg-sage-900/[0.08]" />
      </span>
    </button>
  );
}

export function StoreGallery() {
  const { gallery } = galleryManifest;
  const [lightbox, setLightbox] = useState<LightboxSlide | null>(null);

  const sectionsWithPhotos = useMemo(() => {
    const buckets = new Map<GallerySectionId, GalleryItem[]>();

    for (const section of gallerySections) {
      buckets.set(section.id, []);
    }

    for (const g of gallery) {
      if (isHeroGalleryFile(g.file)) continue;

      const meta = galleryPhotoMeta(g.file);
      const sectionId = getSectionForFile(g.file);
      const list = buckets.get(sectionId) ?? [];
      list.push({
        id: g.file,
        src: g.src,
        alt: meta?.alt ?? "Landscape and More in Madill, Oklahoma",
        caption: meta?.alt,
      });
      buckets.set(sectionId, list);
    }

    return gallerySections
      .map((section) => ({
        ...section,
        photos: buckets.get(section.id) ?? [],
      }))
      .filter((s) => s.photos.length > 0);
  }, [gallery]);

  const totalPhotos = sectionsWithPhotos.reduce((n, s) => n + s.photos.length, 0);

  if (totalPhotos === 0) {
    return null;
  }

  return (
    <section
      id="gallery"
      className="section-tight bg-cream-100/50"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2
            id="gallery-heading"
            className="font-serif text-2xl font-semibold text-sage-900 sm:text-3xl"
          >
            At the store
          </h2>
          <p className="mt-2 max-w-xl text-sage-700">
            Browse by area. Tap a photo to enlarge.
          </p>
        </Reveal>

        <div className="mt-6 space-y-3">
          {sectionsWithPhotos.map((section, sectionIndex) => (
            <Reveal key={section.id} delay={sectionIndex * 50}>
              <div className="gallery-section-block rounded-2xl border border-sage-100/80 bg-white/60 px-3 py-4 sm:px-5 sm:py-5">
                <SectionHeader
                  title={section.title}
                  description={section.description}
                />

                <div className="gallery-grid">
                  {section.photos.map((item) => (
                    <GalleryThumb
                      key={item.id}
                      item={item}
                      onOpen={() =>
                        setLightbox({
                          src: item.src,
                          alt: item.alt,
                          caption: item.caption,
                        })
                      }
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <GalleryLightbox slide={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}
