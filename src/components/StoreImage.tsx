"use client";

import Image from "next/image";
import { assetUrl } from "@/lib/assetUrl";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
  src: string | null;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  placeholderLabel?: string;
};

export function StoreImage({
  src,
  alt,
  className,
  fill,
  width,
  height,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
  placeholderLabel,
}: Props) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  if (showPlaceholder) {
    return (
      <div
        className={cn(
          "image-placeholder flex flex-col items-center justify-center bg-gradient-to-br from-sage-100 via-cream-100 to-sage-50 text-sage-600",
          fill && "absolute inset-0",
          className
        )}
        aria-hidden={!placeholderLabel || alt === ""}
      >
        <svg
          className="h-8 w-8 opacity-40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {placeholderLabel && (
          <span className="mt-2 max-w-[80%] text-center text-xs font-medium opacity-70">
            {placeholderLabel}
          </span>
        )}
      </div>
    );
  }

  const resolved = assetUrl(src);

  return (
    <Image
      src={resolved}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      priority={priority}
      sizes={sizes}
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}
