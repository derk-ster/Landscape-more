import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const storeDir = path.join(root, "public", "assets", "store");
const galleryDir = path.join(storeDir, "gallery");
const manifestPath = path.join(root, "src", "data", "gallery-manifest.json");

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

function listImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

const gallery = listImages(galleryDir).map((file) => ({
  file,
  src: `/assets/store/gallery/${file}`,
}));

const namedSlots = [
  "storefront",
  "plants",
  "flowers",
  "shrubs-trees",
  "herbs",
  "pots-planters",
  "yard-art",
  "signs-decor",
  "mulch-soil",
  "seasonal",
  "patio-porch",
  "garden-supplies",
  "interior",
];

const named = {};
for (const slot of namedSlots) {
  for (const ext of [".jpg", ".jpeg", ".png", ".webp"]) {
    const filename = slot + ext;
    if (fs.existsSync(path.join(storeDir, filename))) {
      named[slot] = `/assets/store/${filename}`;
      break;
    }
  }
}

const manifest = {
  generatedAt: new Date().toISOString(),
  gallery,
  named,
  galleryCount: gallery.length,
  namedCount: Object.keys(named).length,
};

fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(
  `Store images: ${gallery.length} in gallery/, ${Object.keys(named).length} named slots → src/data/gallery-manifest.json`
);
