import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storeDir = path.join(__dirname, "..", "public", "assets", "store");
const galleryDir = path.join(storeDir, "gallery");

/** Map named slot → source screenshot in gallery/ */
const assignments = {
  "storefront.jpg": "Screenshot 2026-05-28 172610.png",
  "plants.jpg": "Screenshot 2026-05-28 172151.png",
  "flowers.jpg": "Screenshot 2026-05-28 172155.png",
  "shrubs-trees.jpg": "Screenshot 2026-05-28 172423.png",
  "herbs.jpg": "Screenshot 2026-05-28 172112.png",
  "pots-planters.jpg": "Screenshot 2026-05-28 172123.png",
  "yard-art.jpg": "Screenshot 2026-05-28 172118.png",
  "signs-decor.jpg": "Screenshot 2026-05-28 172244.png",
  "mulch-soil.jpg": "Screenshot 2026-05-28 172315.png",
  "seasonal.jpg": "Screenshot 2026-05-28 172101.png",
  "patio-porch.jpg": "Screenshot 2026-05-28 172423.png",
  "garden-supplies.jpg": "Screenshot 2026-05-28 172211.png",
  "interior.jpg": "Screenshot 2026-05-28 172145.png",
};

for (const [dest, src] of Object.entries(assignments)) {
  const srcPath = path.join(galleryDir, src);
  const destPath = path.join(storeDir, dest);
  if (!fs.existsSync(srcPath)) {
    console.warn(`Skip ${dest}: missing ${src}`);
    continue;
  }
  fs.copyFileSync(srcPath, destPath);
  console.log(`→ ${dest}`);
}
