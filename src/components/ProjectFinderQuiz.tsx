"use client";

import { business } from "@/data/business";
import {
  quizQuestions,
  generateQuizResult,
  type QuizAnswers,
  type QuizResult,
} from "@/data/quiz";
import { useQuote } from "@/context/QuoteContext";
import { cn } from "@/lib/utils";
import { useState, type MouseEvent } from "react";
import { AddToQuoteButton } from "./AddToQuoteButton";
import { Button } from "./ui/Button";
import { Reveal } from "./ui/Reveal";

export function ProjectFinderQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const { addManyToQuote, openDrawer } = useQuote();

  const totalSteps = quizQuestions.length;
  const progress = result ? 100 : ((step + 1) / totalSteps) * 100;
  const currentQ = quizQuestions[step];

  const selectOption = (questionId: string, optionId: string) => {
    const next = { ...answers, [questionId]: optionId };
    setAnswers(next);

    if (step < totalSteps - 1) {
      setTransitioning(true);
      setTimeout(() => {
        setStep((s) => s + 1);
        setTransitioning(false);
      }, 280);
    } else {
      setTransitioning(true);
      setTimeout(() => {
        setResult(generateQuizResult(next));
        setTransitioning(false);
      }, 320);
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  const handleAddToQuote = (e: MouseEvent<HTMLButtonElement>) => {
    if (!result) return;
    addManyToQuote(result.starterList, "Project Finder", e.currentTarget);
    window.setTimeout(() => openDrawer(), 800);
  };

  return (
    <section
      id="project-finder"
      className="section-tight bg-sage-50/60"
      aria-labelledby="quiz-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 id="quiz-heading" className="font-serif text-2xl font-semibold text-sage-900 sm:text-3xl text-center">
            Find the right supplies
          </h2>
          <p className="mt-2 text-center text-sage-700">
            A few quick questions — we&apos;ll put together a starter list you can adjust.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="quiz-card mt-6 rounded-2xl border border-sage-200/60 bg-white p-5 shadow-card sm:p-6">
            <div className="mb-6">
              <div className="flex justify-between text-xs font-medium text-sage-600 mb-2">
                <span>{result ? "Complete" : `Question ${step + 1} of ${totalSteps}`}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-sage-100">
                <div
                  className="quiz-progress h-full rounded-full bg-gradient-to-r from-sage-400 to-sage-600 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Quiz progress"
                />
              </div>
            </div>

            <div
              className={cn(
                "quiz-content transition-all duration-300",
                transitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
              )}
            >
              {!result && currentQ && (
                <fieldset>
                  <legend className="font-serif text-xl text-sage-900 sm:text-2xl">
                    {currentQ.question}
                  </legend>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {currentQ.options.map((opt) => {
                      const selected = answers[currentQ.id] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => selectOption(currentQ.id, opt.id)}
                          className={cn(
                            "quiz-option rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all duration-300",
                            selected
                              ? "border-sage-500 bg-sage-50 text-sage-900 ring-2 ring-sage-400/50 quiz-option-active"
                              : "border-sage-200 bg-cream-50 text-sage-700 hover:border-sage-300 hover:bg-white"
                          )}
                          aria-pressed={selected}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              )}

              {result && (
                <div className="quiz-result animate-fade-up">
                  <p className="text-sm font-medium text-sage-600">{result.projectName}</p>
                  <p className="mt-1 font-serif text-xl text-sage-900">{result.summary}</p>

                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-sage-800">Recommended categories</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {result.categories.map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-sage-100 px-3 py-1 text-xs text-sage-700"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-sage-800">Starter supply list</h3>
                    <p className="mt-1 text-xs text-sage-600">
                      Add individual items, or use the button below to add them all at once.
                    </p>
                    <ul className="mt-3 space-y-2">
                      {result.starterList.map((item) => (
                        <li
                          key={item}
                          className="flex items-center justify-between gap-3 rounded-xl border border-sage-100 bg-cream-50 px-3 py-2.5"
                        >
                          <span className="min-w-0 flex-1 text-sm text-sage-700">{item}</span>
                          <AddToQuoteButton
                            itemName={item}
                            source="Project Finder"
                            variant="secondary"
                            className="shrink-0 py-2"
                          >
                            Add
                          </AddToQuoteButton>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-4 text-sm text-sage-600">{result.visitNote}</p>
                  {result.deliveryNote && (
                    <p className="mt-2 text-sm text-sage-600">{result.deliveryNote}</p>
                  )}
                  {result.onsiteNote && (
                    <p className="mt-2 text-sm text-sage-600">{result.onsiteNote}</p>
                  )}
                  <p className="mt-3 text-xs text-sage-500">
                    Service guarantee on eligible purchases. Ask in store for details.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Button variant="primary" glow onClick={handleAddToQuote}>
                      Add {result.starterList.length} items to quote list
                    </Button>
                    <Button variant="outline" href={business.phoneTel}>
                      Call Store
                    </Button>
                    <Button variant="ghost" onClick={restart}>
                      Restart
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {!result && step > 0 && (
              <button
                type="button"
                onClick={() => {
                  setTransitioning(true);
                  setTimeout(() => {
                    setStep((s) => s - 1);
                    setTransitioning(false);
                  }, 200);
                }}
                className="mt-6 text-sm text-sage-600 hover:text-sage-800"
              >
                Back
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
