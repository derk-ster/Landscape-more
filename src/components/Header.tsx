"use client";

import { business } from "@/data/business";
import { useQuote } from "@/context/QuoteContext";
import { cn, scrollToId } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "./ui/Button";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "Products", id: "products" },
  { label: "Find & Calculate", id: "project-finder" },
  { label: "Reviews", id: "reviews" },
  { label: "Contact & Hours", id: "contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, toggleDrawer } = useQuote();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/75 backdrop-blur-md shadow-soft border-b border-sage-100/80"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <p className="hidden max-w-[7.5rem] text-[10px] leading-snug text-sage-500 xl:block xl:max-w-none xl:whitespace-nowrap xl:border-r xl:border-sage-200/80 xl:pr-3 xl:text-xs">
            Demo website by Derek Ray
          </p>
          <button
            type="button"
            onClick={() => handleNav("home")}
            className="group shrink-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 rounded-lg"
            aria-label="Landscape and More home"
          >
            <span className="block text-[10px] font-medium text-sage-500 xl:hidden">
              Demo website by Derek Ray
            </span>
            <span className="block font-serif text-lg font-semibold text-sage-800 sm:text-xl">
              {business.name}
            </span>
            <span className="hidden text-xs text-sage-600/80 sm:block">{business.subtitle}</span>
          </button>
        </div>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNav(link.id)}
              className="nav-link relative px-3 py-2 text-sm text-sage-700 hover:text-sage-900"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            data-quote-target
            onClick={toggleDrawer}
            className="quote-list-target relative hidden rounded-xl border border-sage-200 bg-cream-50 px-3 py-2 text-sm text-sage-700 transition hover:bg-sage-50 sm:block"
            aria-label={`Quote list, ${count} items`}
          >
            Quote List
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-sage-600 text-xs text-white">
                {count}
              </span>
            )}
          </button>

          <Button
            variant="primary"
            glow
            className="hidden sm:inline-flex text-sm px-4"
            onClick={() => handleNav("project-finder")}
          >
            Find Supplies
          </Button>

          <button
            type="button"
            className="quote-list-target relative rounded-xl border border-sage-200 bg-cream-50 p-2.5 text-sage-700 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-sage-600 text-[10px] text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-out border-t border-sage-100",
          menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
          scrolled || menuOpen ? "bg-white/95 backdrop-blur-md" : "bg-white/90 backdrop-blur-md"
        )}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNav(link.id)}
              className="rounded-lg px-3 py-3 text-left text-sage-800 hover:bg-sage-50"
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              toggleDrawer();
            }}
            className="rounded-lg px-3 py-3 text-left text-sage-800 hover:bg-sage-50"
          >
            Quote List ({count})
          </button>
          <Button
            variant="primary"
            glow
            className="mt-2 w-full"
            onClick={() => handleNav("project-finder")}
          >
            Find Supplies
          </Button>
        </nav>
      </div>
    </header>
  );
}
