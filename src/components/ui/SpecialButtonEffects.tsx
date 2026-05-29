"use client";

import { cn } from "@/lib/utils";
import {
  useCallback,
  useEffect,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type Props = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

export function SpecialButtonEffects({
  children,
  className,
  disabled,
  onMouseMove,
  onMouseLeave,
  ...props
}: Props) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const stateRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, active: false });
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const tick = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const s = stateRef.current;
    s.x += (s.tx - s.x) * 0.18;
    s.y += (s.ty - s.y) * 0.18;
    wrap.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;

    if (s.active || Math.hypot(s.x, s.y) > 0.05) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = undefined;
      wrap.style.transform = "";
    }
  }, []);

  const startLoop = useCallback(() => {
    if (reducedRef.current || disabled) return;
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [disabled, tick]);

  const updateSpotlight = (clientX: number, clientY: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const inner = wrap.querySelector<HTMLElement>("[data-special-inner]");
    if (!inner) return;

    inner.style.setProperty(
      "--spot-x",
      `${((clientX - rect.left) / rect.width) * 100}%`
    );
    inner.style.setProperty(
      "--spot-y",
      `${((clientY - rect.top) / rect.height) * 100}%`
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    onMouseMove?.(e);
    if (disabled || reducedRef.current) return;

    const wrap = wrapRef.current;
    if (!wrap) return;

    const rect = wrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const strength = Math.min(rect.width, rect.height) * 0.14;

    stateRef.current.tx = ((e.clientX - cx) / rect.width) * strength * 2.2;
    stateRef.current.ty = ((e.clientY - cy) / rect.height) * strength * 2.2;
    stateRef.current.active = true;

    updateSpotlight(e.clientX, e.clientY);
    startLoop();
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    onMouseLeave?.(e);
    stateRef.current.tx = 0;
    stateRef.current.ty = 0;
    stateRef.current.active = false;
    startLoop();

    const inner = wrapRef.current?.querySelector<HTMLElement>(
      "[data-special-inner]"
    );
    inner?.style.removeProperty("--spot-x");
    inner?.style.removeProperty("--spot-y");
  };

  return (
    <span
      ref={wrapRef}
      className={cn("btn-special-wrap inline-flex", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </span>
  );
}

export function SpecialButtonDecor() {
  return (
    <>
      <span className="btn-special-spotlight" aria-hidden />
      <span className="btn-special-ring" aria-hidden />
    </>
  );
}
