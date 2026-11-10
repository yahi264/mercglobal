"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { Flag } from "./Flag";
import { localeNames, locales, type Locale } from "@/lib/i18n";

// Remembered so the home address (which picks a language automatically) respects the visitor's choice.
const remember = (l: Locale) => {
  try {
    localStorage.setItem("merc-lang", l);
  } catch {}
};

export function useHrefFor() {
  const pathname = usePathname() || "/";
  // Same page, other language: swap the first part of the address.
  return (l: Locale) => `/${l}${pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "")}`.replace(/\/?$/, "/");
}

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hrefFor = useHrefFor();

  useEffect(() => {
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 items-center gap-1.5 rounded-full border border-line px-2.5 sm:gap-2 sm:px-3 text-xs font-bold uppercase text-fg transition-colors hover:border-brand"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={label}
      >
        <Flag locale={locale} />
        <span className="hidden sm:inline">{locale}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="card absolute end-0 top-full z-50 mt-2 w-48 overflow-hidden py-1.5 shadow-2xl shadow-navy/20"
          >
            {locales.map((l) => (
              <li key={l}>
                <Link
                  href={hrefFor(l)}
                  onClick={() => {
                    remember(l);
                    setOpen(false);
                  }}
                  lang={l}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-fg transition-colors hover:bg-page-2"
                >
                  <Flag locale={l} />
                  <span className="flex-1">{localeNames[l]}</span>
                  {l === locale && <Check className="h-4 w-4 text-brand" />}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// Row of flags for the mobile menu and footer.
export function LanguageRow({ locale, onPick }: { locale: Locale; onPick?: () => void }) {
  const hrefFor = useHrefFor();
  return (
    <div className="flex flex-wrap gap-2">
      {locales.map((l) => (
        <Link
          key={l}
          href={hrefFor(l)}
          lang={l}
          onClick={() => {
            remember(l);
            onPick?.();
          }}
          className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
            l === locale ? "border-brand text-brand" : "border-current/20 opacity-80 hover:opacity-100"
          }`}
        >
          <Flag locale={l} />
          {localeNames[l]}
        </Link>
      ))}
    </div>
  );
}
