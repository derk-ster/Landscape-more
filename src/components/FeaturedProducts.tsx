"use client";

import { products, resolveProductGallerySrc } from "@/data/products";
import { galleryManifest } from "@/data/images";
import { PRICE_DISCLAIMER } from "@/data/prices";
import { AddToQuoteButton } from "./AddToQuoteButton";
import { StockIndicator } from "./StockIndicator";
import { ItemPrice } from "./ItemPrice";
import { Reveal } from "./ui/Reveal";
import { ScrollRowGrid } from "./ui/ScrollRowGrid";
import { StoreImage } from "./StoreImage";

export function FeaturedProducts() {
  const withPhotos = products.filter(
    (p) => resolveProductGallerySrc(p, galleryManifest.gallery) !== null
  );

  if (withPhotos.length === 0) return null;

  return (
    <section
      id="featured"
      className="section-tight bg-sage-50/40"
      aria-labelledby="featured-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2
            id="featured-heading"
            className="font-serif text-2xl font-semibold text-sage-900 sm:text-3xl"
          >
            Featured supplies
          </h2>
          <p className="mt-1 text-sm text-sage-700">
            Pictured in store with live stock counts — two rows shown, scroll for more.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ScrollRowGrid
            className="mt-6"
            columnMinWidth="11rem"
            ariaLabel="Featured supplies"
            hint="Scroll sideways for more featured items"
          >
            {withPhotos.map((product) => {
              const src = resolveProductGallerySrc(product, galleryManifest.gallery)!;
              return (
                <article
                  key={product.id}
                  className="product-card group flex h-full flex-col overflow-hidden rounded-xl border border-sage-100/80 bg-white shadow-sm"
                >
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <StoreImage
                      src={src}
                      alt={product.name}
                      fill
                      sizes="220px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-3 sm:p-4">
                    <span className="w-fit rounded-full bg-sage-100 px-2 py-0.5 text-[11px] font-medium text-sage-700">
                      {product.badge}
                    </span>
                    <h3 className="mt-2 font-serif text-base text-sage-900 leading-snug">
                      {product.name}
                    </h3>
                    <ItemPrice name={product.name} size="md" className="mt-1 block" />
                    <StockIndicator itemName={product.name} className="mt-1.5" />
                    <p className="mt-1 line-clamp-2 flex-1 text-xs text-sage-600">
                      {product.description}
                    </p>
                    <AddToQuoteButton
                      itemName={product.name}
                      source="Featured"
                      className="mt-3 w-full rounded-lg py-2"
                    />
                  </div>
                </article>
              );
            })}
          </ScrollRowGrid>
        </Reveal>

        <p className="mt-4 text-center text-xs text-sage-500">{PRICE_DISCLAIMER}</p>
      </div>
    </section>
  );
}
