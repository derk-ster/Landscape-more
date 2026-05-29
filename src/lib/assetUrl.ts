/** Encode path segments so filenames with spaces work in next/image and anchors */
export function assetUrl(src: string): string {
  if (!src.startsWith("/")) return src;
  return src
    .split("/")
    .map((segment, index) => (index === 0 ? segment : encodeURIComponent(segment)))
    .join("/");
}
