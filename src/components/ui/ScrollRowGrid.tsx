"use client";

import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Visible row count before content extends horizontally */
  rows?: number;
  /** CSS min width for each column (e.g. "11rem", "280px") */
  columnMinWidth?: string;
  /** Keep columns fixed width instead of stretching to fill the row */
  fixedColumns?: boolean;
  ariaLabel?: string;
  hint?: string;
  style?: CSSProperties;
};

export function ScrollRowGrid({
  children,
  className,
  rows = 2,
  columnMinWidth = "11rem",
  fixedColumns = false,
  ariaLabel = "Scroll horizontally for more items",
  hint = "Scroll sideways for more",
  style,
}: Props) {
  const rowTrack = fixedColumns
    ? `calc(${columnMinWidth} * 3 / 4)`
    : "auto";

  return (
    <div className={cn("scroll-row-grid-wrap", className)}>
      <div
        className={cn("scroll-row-grid", fixedColumns && "scroll-row-grid--fixed")}
        style={{
          gridTemplateRows: `repeat(${rows}, ${rowTrack})`,
          gridAutoColumns: fixedColumns
            ? columnMinWidth
            : `minmax(${columnMinWidth}, 1fr)`,
          ...style,
        }}
        role="region"
        aria-label={ariaLabel}
      >
        {children}
      </div>
      {hint && (
        <p className="scroll-row-grid-hint" aria-hidden>
          {hint}
        </p>
      )}
    </div>
  );
}
