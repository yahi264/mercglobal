"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Building2, ChevronRight, Phone, UserRound, X } from "lucide-react";
import { WhatsAppIcon } from "./Icons";

export type WaLine = { number: string; display: string; title: string; sub: string; kind: "candidates" | "companies" };

type Props = {
  lines: WaLine[];
  phoneHref: string;
  labels: { call: string; write: string; close: string };
  greeting: string;
};

// Floating WhatsApp button (bottom corner). It opens a panel with one card for candidates and one for
// companies, each going to its own WhatsApp line, plus the office phone.
export function FloatingContact({ lines, phoneHref, labels, greeting }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 end-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="card w-[300px] max-w-[calc(100vw-2.5rem)] overflow-hidden shadow-2xl shadow-navy/25"
          >
            <div className="flex items-center gap-3 bg-gradient-to-br from-[#128c7e] to-[#075e54] px-5 py-4 text-white">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                <WhatsAppIcon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-extrabold">Merç Global</p>
                <p className="text-xs text-white/85">{labels.write}</p>
              </div>
            </div>
            <div className="space-y-2.5 p-3">
              {lines.map((w) => {
                const Icon = w.kind === "candidates" ? UserRound : Building2;
                return (
                  <a
                    key={w.number}
                    href={`https://wa.me/${w.number}?text=${encodeURIComponent(greeting)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-2xl border border-line p-3 transition-all hover:-translate-y-0.5 hover:border-whatsapp hover:bg-whatsapp/5 hover:shadow-md"
                  >
                    <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-whatsapp/12 text-[#128c7e] dark:text-whatsapp">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                      <span className="absolute -bottom-1 -end-1 flex h-5 w-5 items-center justify-center rounded-full bg-whatsapp text-white ring-2 ring-card">
                        <WhatsAppIcon className="h-3 w-3" />
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-extrabold text-fg">{w.title}</span>
                      <span className="block truncate text-xs text-muted">{w.sub}</span>
                      <span className="mt-0.5 block text-sm font-bold text-[#128c7e] dark:text-whatsapp" dir="ltr">{w.display}</span>
                    </span>
                    <ChevronRight className="flip-rtl h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-whatsapp" />
                  </a>
                );
              })}
              <a href={phoneHref} className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-fg transition-colors hover:bg-page-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white">
                  <Phone className="h-4 w-4" />
                </span>
                {labels.call}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? labels.close : labels.write}
        aria-expanded={open}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-xl shadow-whatsapp/30 transition-transform hover:scale-105"
      >
        {!open && <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp/40 [animation-duration:2.4s]" />}
        {open ? <X className="relative h-6 w-6" /> : <WhatsAppIcon className="relative h-7 w-7" />}
      </button>
    </div>
  );
}
