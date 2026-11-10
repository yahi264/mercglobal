import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBand, SectorCard } from "@/components/Blocks";
import { advantages, advantagesTitle, sectors, services } from "@/lib/content";
import { getT, locales, type Locale } from "@/lib/i18n";
import { href } from "@/lib/nav";
import { asset } from "@/lib/asset";
import { ServiceIcon } from "@/components/Icons";

type P = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) => sectors.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params;
  const s = sectors.find((x) => x.slug === slug);
  if (!s) return {};
  const l = locale as Locale;
  return { title: s.title[l], description: s.text[l] };
}

export default async function SectorPage({ params }: P) {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const t = getT(l);
  const idx = sectors.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const s = sectors[idx];
  const others = [1, 2, 3].map((n) => sectors[(idx + n) % sectors.length]);

  return (
    <>
      <PageHero
        title={s.title[l]}
        eyebrow={t("sectorDetail")}
        image={`/img/slide/${s.image}.webp`}
        crumbs={[{ href: href(l), label: t("navHome") }, { href: href(l, "sectors"), label: t("navSectors") }, { label: s.title[l] }]}
      />
      <section className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
        <Reveal>
          <p className="text-2xl font-semibold leading-relaxed text-fg sm:text-[1.7rem]">{s.text[l]}</p>
          <h2 className="mb-4 mt-10 text-lg font-extrabold text-fg">{advantagesTitle[l]}</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {advantages.map((a) => (
              <li key={a.en} className="flex items-start gap-3 text-muted">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" /> {a[l]}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={href(l, "contact") + "#request"} className="btn-brand">
              {t("requestStaff")} <ArrowRight className="flip-rtl h-4 w-4" />
            </Link>
            <Link href={href(l, "services/international-recruitment")} className="btn-outline">
              <ServiceIcon name="users" className="h-4 w-4" /> {services[0].title[l]}
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(`/img/slide/${s.image}.webp`)} alt={s.title[l]} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl shadow-navy/20" />
        </Reveal>
      </section>
      <section className="bg-page-2 py-20">
        <div className="container-x">
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold text-fg sm:text-3xl">{t("otherSectors")}</h2>
            <Link href={href(l, "sectors")} className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-brand">
              {t("allSectors")} <ArrowRight className="flip-rtl h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o, i) => (
              <SectorCard key={o.slug} s={o} l={l} i={i} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand l={l} />
    </>
  );
}
