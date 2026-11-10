"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ZoomIn } from "lucide-react";
import { asset } from "@/lib/asset";

// Grid of documents; click one to see it full size.
export function DocumentGallery({ docs, labels }: { docs: { small: string; large: string; caption: string }[]; labels: { close: string; enlarge: string } }) {
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, []);
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((d, i) => (
          <button
            key={d.small}
            type="button"
            onClick={() => setOpen(i)}
            className="card group overflow-hidden text-start transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10"
            aria-label={`${labels.enlarge}: ${d.caption}`}
          >
            <div className="relative aspect-[1000/707] overflow-hidden bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(d.small)} alt={d.caption} loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 flex items-center justify-center bg-navy/0 opacity-0 transition-all group-hover:bg-navy/40 group-hover:opacity-100">
                <ZoomIn className="h-8 w-8 text-white" />
              </span>
            </div>
            <p className="p-4 text-sm font-semibold text-fg">{d.caption}</p>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-navy/90 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={docs[open].caption}
          >
            <button type="button" className="absolute end-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label={labels.close}>
              <X className="h-6 w-6" />
            </button>
            <motion.figure initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(docs[open].large)} alt={docs[open].caption} className="max-h-[80vh] w-auto rounded-lg bg-white" />
              <figcaption className="mt-3 text-center text-sm text-white/85">{docs[open].caption}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
