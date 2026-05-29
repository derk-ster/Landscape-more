"use client";

import { business } from "@/data/business";
import { useMemo, useState } from "react";
import { Reveal } from "./ui/Reveal";

type Props = {
  sideBySide?: boolean;
};

type MaterialType = "mulch" | "soil" | "rock";

const materials: { id: MaterialType; label: string }[] = [
  { id: "mulch", label: "Mulch" },
  { id: "soil", label: "Soil" },
  { id: "rock", label: "Decorative Rock" },
];

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function MaterialCalculator({ sideBySide = false }: Props) {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [material, setMaterial] = useState<MaterialType>("mulch");

  const result = useMemo(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const d = parseFloat(depth);

    if (!length || !width || !depth) {
      return { error: "Enter length, width, and depth to calculate." };
    }
    if (isNaN(l) || isNaN(w) || isNaN(d)) {
      return { error: "Please enter valid numbers." };
    }
    if (l < 0 || w < 0 || d < 0) {
      return { error: "Measurements cannot be negative." };
    }
    if (l === 0 || w === 0 || d === 0) {
      return { error: "All measurements must be greater than zero." };
    }

    const sqFt = l * w;
    const cubicFt = sqFt * (d / 12);
    const cubicYards = cubicFt / 27;

    const materialLabel =
      materials.find((m) => m.id === material)?.label.toLowerCase() ?? "material";

    return {
      sqFt: round2(sqFt),
      cubicFt: round2(cubicFt),
      cubicYards: round2(cubicYards),
      message: `You may need about ${round2(cubicYards)} cubic yards of ${materialLabel}. Call to check pricing, stock, and delivery.`,
    };
  }, [length, width, depth, material]);

  const hasResult = !("error" in result);

  const content = (
    <div
      id={sideBySide ? "calculator" : undefined}
      className={sideBySide ? "w-full" : "mx-auto max-w-2xl px-4 sm:px-6 lg:px-8"}
    >
      <Reveal>
        <h2
          id="calculator-heading"
          className={`font-serif text-2xl font-semibold text-sage-900 sm:text-3xl ${sideBySide ? "text-left" : "text-center"}`}
        >
          Material calculator
        </h2>
        <p className={`mt-2 text-sage-700 ${sideBySide ? "text-left" : "text-center"}`}>
          Estimate mulch, soil, or rock for your project area.
        </p>
      </Reveal>

        <Reveal delay={100}>
          <div className="calculator-card mt-6 rounded-2xl border border-sage-200/60 bg-cream-50 p-5 shadow-card sm:p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block">
                <span className="text-sm font-medium text-sage-800">Length (ft)</span>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-sage-200 bg-white px-4 py-2.5 text-sage-900 focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-400/30"
                  placeholder="10"
                  aria-label="Length in feet"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-sage-800">Width (ft)</span>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-sage-200 bg-white px-4 py-2.5 text-sage-900 focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-400/30"
                  placeholder="8"
                  aria-label="Width in feet"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-sage-800">Depth (in)</span>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={depth}
                  onChange={(e) => setDepth(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-sage-200 bg-white px-4 py-2.5 text-sage-900 focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-400/30"
                  placeholder="3"
                  aria-label="Depth in inches"
                />
              </label>
            </div>

            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-sage-800">Material type</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {materials.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMaterial(m.id)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      material === m.id
                        ? "bg-sage-600 text-white"
                        : "bg-white border border-sage-200 text-sage-700 hover:border-sage-300"
                    }`}
                    aria-pressed={material === m.id}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div
              className={`mt-8 rounded-2xl border p-5 transition-all duration-500 ${
                hasResult
                  ? "border-sage-300 bg-white calculator-result-glow"
                  : "border-sage-100 bg-white/60"
              }`}
              aria-live="polite"
            >
              {"error" in result ? (
                <p className="text-sm text-sage-600">{result.error}</p>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xs text-sage-500 uppercase tracking-wide">Sq Ft</p>
                      <p className="mt-1 text-xl font-semibold text-sage-900">{result.sqFt}</p>
                    </div>
                    <div>
                      <p className="text-xs text-sage-500 uppercase tracking-wide">Cu Ft</p>
                      <p className="mt-1 text-xl font-semibold text-sage-900">{result.cubicFt}</p>
                    </div>
                    <div>
                      <p className="text-xs text-sage-500 uppercase tracking-wide">Cu Yd</p>
                      <p className="mt-1 text-xl font-semibold text-sage-900">{result.cubicYards}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-sage-700">{result.message}</p>
                  <a
                    href={business.phoneTel}
                    className="mt-4 inline-block text-sm font-medium text-sage-700 underline hover:text-sage-900"
                  >
                    Call {business.phone}
                  </a>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
  );

  if (sideBySide) return content;

  return (
    <section
      id="calculator"
      className="section-tight bg-white"
      aria-labelledby="calculator-heading"
    >
      {content}
    </section>
  );
}
