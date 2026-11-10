import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { asset } from "@/lib/asset";
import { Reveal } from "./Reveal";

// Banner at the top of inner pages: photo (optional), title, breadcrumb.
export function PageHero({
  title,
  eyebrow,
  text,
  image,
  crumbs,
}: {
  title: string;
  eyebrow?: string;
  text?: string;
  image?: string;
  crumbs: { href?: string; label: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      {image && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(image)} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/40 rtl:bg-gradient-to-l" />
        </>
      )}
      {!image && (
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(227,20,30,0.28),transparent_45%),radial-gradient(circle_at_10%_90%,rgba(30,58,95,0.9),transparent_55%)]" />
      )}
      <div className="container-x py-16 sm:py-20 lg:py-24">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-white/70">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="flip-rtl h-3.5 w-3.5 opacity-60" />}
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
          {eyebrow && <p className="eyebrow mb-3 !text-[#ff6b72]">{eyebrow}</p>}
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>
          {text && <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{text}</p>}
        </Reveal>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand via-brand/60 to-transparent rtl:bg-gradient-to-l" />
    </section>
  );
}

export function SectionHeading({ eyebrow, title, text, center }: { eyebrow?: string; title: string; text?: string; center?: boolean }) {
  return (
    <Reveal className={`mb-10 sm:mb-12 ${center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{text}</p>}
    </Reveal>
  );
}
