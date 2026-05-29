# Store photos (Google Maps and your own shots)

Drop images here so the website can show the real store and stay accurate about what you sell.

## Quick start

1. Save photos from Google Maps (or take your own) as `.jpg`, `.jpeg`, `.png`, or `.webp`.
2. Put them in **`gallery/`** (any filenames are fine).
3. Run from the project root:

   ```bash
   npm run sync-images
   ```

4. Restart the dev server if it is already running.
5. Optional: ask Cursor to review the new photos and update `src/data/categories.ts` and `src/data/products.ts`.

## Named photos (optional, for key spots)

These filenames map to specific sections. If a file is missing, the site uses a soft placeholder until you add one.

| Filename | Used for |
|----------|----------|
| `storefront.jpg` | Hero and contact |
| `plants.jpg` | Plants category, hero collage |
| `flowers.jpg` | Plants & flowers |
| `shrubs-trees.jpg` | Shrubs & trees (Bailey Nurseries partner) |
| `herbs.jpg` | Herbs & garden starts |
| `pots-planters.jpg` | Pots & planters |
| `yard-art.jpg` | Yard art & metal sculptures |
| `signs-decor.jpg` | Outdoor decor & signs |
| `mulch-soil.jpg` | Mulch, soil & rock |
| `seasonal.jpg` | Seasonal finds |
| `patio-porch.jpg` | Patio & porch |
| `garden-supplies.jpg` | Garden supplies |
| `interior.jpg` | Gallery and “inside the store” |

You can use `.png` or `.webp` instead of `.jpg`; update paths in `src/data/images.ts` if needed.

## Folder layout

```
public/assets/store/
  README.md          (this file)
  gallery/           ← dump bulk Google Maps photos here
  storefront.jpg     ← optional named slots (root of store/)
  plants.jpg
  ...
```

## Tips for accurate inventory

When you add photos, note what is clearly visible (plants, pots, mulch piles, metal art, signs, etc.). The site data in `src/data/` should match what customers actually see on the shelves.

After a big batch of new photos, run `npm run sync-images` and refresh the site.
