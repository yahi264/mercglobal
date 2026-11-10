import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import type { Sector, Service } from "@/lib/content";
import { company, mainWhatsApp, text } from "@/lib/content";
import { getT, type Locale } from "@/lib/i18n";
import { href } from "@/lib/nav";
import { asset } from "@/lib/asset";
import { ServiceIcon, WhatsAppIcon } from "./Icons";
import { Reveal } from "./Reveal";

export function ServiceCard({ s, l, i = 0 }: { s: Service; l: Locale; i?: number }) {
  const t = getT(l);
  return (
    <Reveal delay={(i % 3) * 0.08} className="h-full">
      <Link
        href={href(l, `services/${s.slug}`)}
        className="card group relative flex h-full flex-col overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-2xl hover:shadow-navy/10"
      >
        <span className="absolute end-6 top-6 font-mono text-sm text-muted/60" dir="ltr">
          {String(i + 1).padStart(2, "0")}
        </span>
        <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
          <ServiceIcon name={s.icon} />
        </span>
        <h3 className="mb-3 text-xl font-bold text-fg">{s.title[l]}</h3>
        <p className="flex-1 leading-relaxed text-muted">{s.short[l]}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand">
          {t("learnMore")} <ArrowRight className="flip-rtl h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}

export function SectorCard({ s, l, i = 0, tall }: { s: Sector; l: Locale; i?: number; tall?: boolean }) {
  const t = getT(l);
  return (
    <Reveal delay={(i % 3) * 0.08} className="h-full">
      <Link
        href={href(l, `sectors/${s.slug}`)}
        className={`group relative isolate flex h-full flex-col justify-end overflow-hidden rounded-2xl bg-navy p-6 text-white ${tall ? "min-h-[380px]" : "min-h-[300px]"}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset(`/img/slide/${s.image}-sm.webp`)}
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/70 to-navy/5 transition-colors duration-500 group-hover:via-navy/80" />
        <h3 className="text-xl font-bold">{s.title[l]}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/80">{s.text[l]}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white">
          {t("learnMore")} <ArrowRight className="flip-rtl h-4 w-4 text-brand transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}

// Red call-to-action band used at the bottom of most pages.
export function CtaBand({ l }: { l: Locale }) {
  const t = getT(l);
  return (
    <section className="container-x py-16 sm:py-20">
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-dark px-6 py-12 text-white sm:px-12 sm:py-14">
          <div className="absolute -end-20 -top-20 -z-10 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-24 start-1/3 -z-10 h-72 w-72 rounded-full bg-navy/30 blur-3xl" />
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">{text.ctaTitle[l]}</h2>
              <p className="mt-3 text-white/85 sm:text-lg">{text.ctaText[l]}</p>
            </div>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link href={href(l, "contact") + "#request"} className="btn bg-white text-brand shadow-lg hover:-translate-y-0.5 hover:bg-white/90">
                {t("requestStaff")} <ArrowRight className="flip-rtl h-4 w-4" />
              </Link>
              <a href={`https://wa.me/${mainWhatsApp}`} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp
              </a>
              <a href={company.phoneHref} className="btn-ghost">
                <Phone className="h-4 w-4" /> {t("callNow")}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
