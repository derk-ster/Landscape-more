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

const payload = {
  gallery,
  named,
  galleryCount: gallery.length,
  namedCount: Object.keys(named).length,
};

function readExistingManifest() {
  if (!fs.existsSync(manifestPath)) return null;
  try {
    return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch {
    return null;
  }
}

function manifestUnchanged(existing) {
  if (!existing) return false;
  return (
    JSON.stringify(existing.gallery) === JSON.stringify(payload.gallery) &&
    JSON.stringify(existing.named) === JSON.stringify(payload.named)
  );
}

const existing = readExistingManifest();
if (manifestUnchanged(existing)) {
  console.log(
    `Store images unchanged: ${payload.galleryCount} in gallery/, ${payload.namedCount} named slots`
  );
  process.exit(0);
}

const manifest = {
  generatedAt: new Date().toISOString(),
  ...payload,
};

fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(
  `Store images: ${gallery.length} in gallery/, ${Object.keys(named).length} named slots → src/data/gallery-manifest.json`
);
