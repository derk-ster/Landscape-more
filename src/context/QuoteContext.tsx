"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { QuoteFeedbackLayer } from "@/components/QuoteFeedbackLayer";

export type QuoteItem = {
  id: string;
  name: string;
  source?: string;
};

export type QuoteToast = {
  id: string;
  added: string[];
  skipped: string[];
};

export type QuoteFlyParticle = {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

type AddBatchResult = {
  added: string[];
  skipped: string[];
};

type QuoteContextValue = {
  items: QuoteItem[];
  count: number;
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addToQuote: (
    name: string,
    source?: string,
    fromEl?: HTMLElement | null
  ) => AddBatchResult;
  addManyToQuote: (
    names: string[],
    source?: string,
    fromEl?: HTMLElement | null
  ) => AddBatchResult;
  isInQuote: (name: string) => boolean;
  removeItem: (id: string) => void;
  clearItems: () => void;
  pulseQuoteTarget: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

function makeId(name: string): string {
  return `${name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function splitAdd(names: string[], items: QuoteItem[]): AddBatchResult {
  const existing = new Set(items.map((i) => i.name.toLowerCase()));
  const added: string[] = [];
  const skipped: string[] = [];

  for (const name of names) {
    const key = name.toLowerCase();
    if (existing.has(key)) {
      skipped.push(name);
    } else {
      added.push(name);
      existing.add(key);
    }
  }

  return { added, skipped };
}

function getQuoteTargetCenter(): { x: number; y: number } | null {
  if (typeof document === "undefined") return null;
  const targets = document.querySelectorAll<HTMLElement>("[data-quote-target]");
  let fallback: { x: number; y: number } | null = null;
  for (const el of targets) {
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) continue;
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    if (el.closest("[data-quote-target-priority]")) return center;
    fallback ??= center;
  }
  return fallback;
}

function getOriginCenter(fromEl?: HTMLElement | null): { x: number; y: number } {
  if (fromEl) {
    const rect = fromEl.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }
  return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toasts, setToasts] = useState<QuoteToast[]>([]);
  const [flyParticles, setFlyParticles] = useState<QuoteFlyParticle[]>([]);
  const [targetPulse, setTargetPulse] = useState(false);
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pulseQuoteTarget = useCallback(() => {
    setTargetPulse(true);
    window.setTimeout(() => setTargetPulse(false), 650);
  }, []);

  const showFeedback = useCallback(
    (
      result: AddBatchResult,
      fromEl?: HTMLElement | null
    ) => {
      if (result.added.length === 0 && result.skipped.length === 0) return;

      const toastId = `toast-${Date.now()}`;
      setToasts((prev) => [...prev, { id: toastId, ...result }]);
      window.setTimeout(() => dismissToast(toastId), 4500);

      if (result.added.length > 0) {
        const target = getQuoteTargetCenter();
        const origin = getOriginCenter(fromEl);
        const end = target ?? { x: window.innerWidth - 48, y: 28 };

        const flyId = `fly-${Date.now()}`;
        setFlyParticles((prev) => [
          ...prev,
          {
            id: flyId,
            startX: origin.x,
            startY: origin.y,
            endX: end.x,
            endY: end.y,
          },
        ]);
        window.setTimeout(() => {
          setFlyParticles((prev) => prev.filter((p) => p.id !== flyId));
          pulseQuoteTarget();
        }, 2000);
      }
    },
    [dismissToast, pulseQuoteTarget]
  );

  const addToQuote = useCallback(
    (name: string, source?: string, fromEl?: HTMLElement | null) => {
      const result = splitAdd([name], itemsRef.current);
      if (result.added.length > 0) {
        setItems((prev) => [
          ...prev,
          { id: makeId(name), name, source },
        ]);
      }
      showFeedback(result, fromEl);
      return result;
    },
    [showFeedback]
  );

  const addManyToQuote = useCallback(
    (names: string[], source?: string, fromEl?: HTMLElement | null) => {
      const result = splitAdd(names, itemsRef.current);
      if (result.added.length > 0) {
        setItems((prev) => [
          ...prev,
          ...result.added.map((name) => ({
            id: makeId(name),
            name,
            source,
          })),
        ]);
      }
      showFeedback(result, fromEl);
      return result;
    },
    [showFeedback]
  );

  const isInQuote = useCallback(
    (name: string) =>
      items.some((i) => i.name.toLowerCase() === name.toLowerCase()),
    [items]
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearItems = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      isOpen,
      openDrawer: () => setIsOpen(true),
      closeDrawer: () => setIsOpen(false),
      toggleDrawer: () => setIsOpen((o) => !o),
      addToQuote,
      addManyToQuote,
      isInQuote,
      removeItem,
      clearItems,
      pulseQuoteTarget,
    }),
    [
      items,
      isOpen,
      addToQuote,
      addManyToQuote,
      isInQuote,
      removeItem,
      clearItems,
      pulseQuoteTarget,
    ]
  );

  return (
    <QuoteContext.Provider value={value}>
      {children}
      <QuoteFeedbackLayer
        toasts={toasts}
        flyParticles={flyParticles}
        targetPulse={targetPulse}
        onDismissToast={dismissToast}
      />
    </QuoteContext.Provider>
  );
}

export function useQuote(): QuoteContextValue {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within QuoteProvider");
  return ctx;
}
