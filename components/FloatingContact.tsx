"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Phone, X } from "lucide-react";
import { WhatsAppIcon } from "./Icons";

type Props = {
  whatsapp: { display: string; number: string }[];
  phoneHref: string;
  labels: { call: string; write: string; close: string };
  greeting: string;
};

// Floating WhatsApp button (bottom corner) that opens a small panel with both WhatsApp lines and the office phone.
export function FloatingContact({ whatsapp, phoneHref, labels, greeting }: Props) {
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
            className="card w-72 overflow-hidden shadow-2xl shadow-navy/25"
          >
            <div className="bg-[#128c7e] px-5 py-4 text-white">
              <p className="text-sm font-bold">Merç Global</p>
              <p className="text-xs text-white/85">{labels.write}</p>
            </div>
            <div className="space-y-2 p-3">
              {whatsapp.map((w) => (
                <a
                  key={w.number}
                  href={`https://wa.me/${w.number}?text=${encodeURIComponent(greeting)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-fg transition-colors hover:bg-page-2"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-whatsapp text-white">
                    <WhatsAppIcon className="h-5 w-5" />
                  </span>
                  <span dir="ltr">{w.display}</span>
                </a>
              ))}
              <a href={phoneHref} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-fg transition-colors hover:bg-page-2">
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
