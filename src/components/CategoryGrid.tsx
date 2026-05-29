"use client";

import { categories, type Category } from "@/data/categories";
import { resolveCategorySrc } from "@/data/images";
import { useQuote } from "@/context/QuoteContext";
import { useState, type MouseEvent } from "react";
import { CategoryDrawer } from "./CategoryDrawer";
import { ItemPrice } from "./ItemPrice";
import { Reveal } from "./ui/Reveal";
import { ScrollRowGrid } from "./ui/ScrollRowGrid";
import { StoreImage } from "./StoreImage";

function CategoryCard({
  cat,
  onExplore,
  onAddStarter,
}: {
  cat: Category;
  onExplore: () => void;
  onAddStarter: (e: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div className="category-card-border color-border-gradient group h-full">
      <article className="category-card category-card-inner group/card flex h-full flex-col overflow-hidden shadow-sm transition-shadow duration-300 group-hover/card:shadow-card">
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-sage-100/80">
          <StoreImage
            src={resolveCategorySrc(cat.id)}
            alt={`${cat.title} at Landscape and More`}
            fill
            sizes="320px"
            placeholderLabel={cat.title}
            className="transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <span className="w-fit rounded-full bg-sage-100 px-2.5 py-0.5 text-xs font-medium text-sage-700">
            {cat.badge}
          </span>
          <h3 className="mt-3 font-serif text-lg text-sage-900">{cat.title}</h3>
          <p className="mt-2 flex-1 text-sm text-sage-600 line-clamp-3">{cat.description}</p>
          <ul className="mt-3 space-y-1 text-xs text-sage-500" aria-label="Starter pack preview">
            {cat.starterItems.map((item) => (
              <li key={item} className="flex items-baseline justify-between gap-2">
                <span className="truncate">· {item}</span>
                <ItemPrice name={item} />
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={onExplore}
              className="rounded-xl border border-sage-300 bg-white py-2 text-sm font-medium text-sage-700 transition hover:bg-sage-50 hover:border-sage-400"
            >
              Explore and add items
            </button>
            <button
              type="button"
              title={`Adds: ${cat.starterItems.join(", ")}`}
              onClick={onAddStarter}
              className="rounded-xl bg-sage-600 py-2 text-sm font-medium text-white transition hover:bg-sage-700 btn-shine"
            >
              Add all {cat.starterItems.length} starter items
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

export function CategoryGrid() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const { addManyToQuote } = useQuote();

  return (
    <section
      id="products"
      className="section-tight bg-white"
      aria-labelledby="categories-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 id="categories-heading" className="font-serif text-2xl font-semibold text-sage-900 sm:text-3xl">
            Shop by category
          </h2>
          <p className="mt-2 max-w-xl text-sage-700">
            Browse what we carry — two rows visible, scroll sideways for the rest.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ScrollRowGrid
            className="mt-6"
            columnMinWidth="17.5rem"
            ariaLabel="Shop by category"
            hint="Scroll sideways for more categories"
          >
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                cat={cat}
                onExplore={() => setActiveCategory(cat)}
                onAddStarter={(e) =>
                  addManyToQuote(cat.starterItems, cat.title, e.currentTarget)
                }
              />
            ))}
          </ScrollRowGrid>
        </Reveal>
      </div>

      <CategoryDrawer
        category={activeCategory}
        onClose={() => setActiveCategory(null)}
      />
    </section>
  );
}
