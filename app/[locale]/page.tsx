import Link from "next/link";
import { ArrowRight, BadgeCheck, CheckCircle2, Globe2 } from "lucide-react";
import { HeroSlider } from "@/components/HeroSlider";
import { CtaBand, SectorCard, ServiceCard } from "@/components/Blocks";
import { SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/Motion";
import { advantages, referenceCount, refs, regions, sectors, services, text } from "@/lib/content";
import { getT, type Locale } from "@/lib/i18n";
import { href } from "@/lib/nav";
import { asset } from "@/lib/asset";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const l = (await params).locale as Locale;
  const t = getT(l);
  const marquee = [...refs.partners.map((p) => p.name), ...refs.intl, ...refs.tr.slice(0, 8), ...refs.catering.slice(0, 6)].map((r) => r.split(" — ")[0]);

  return (
    <>
      <HeroSlider
        slides={sectors.map((s) => ({ image: s.image, title: s.title[l], text: s.text[l], href: href(l, `sectors/${s.slug}`) }))}
        eyebrow={t("navSectors")}
        ctaHref={href(l, "contact") + "#request"}
        labels={{ request: t("requestStaff"), details: t("learnMore"), prev: t("prev"), next: t("next"), drag: t("dragGlobe") }}
        badges={[
          { value: String(regions.length), label: text.stat3[l] },
          { value: String(sectors.length), label: text.stat2[l] },
          { value: "No. 494", label: text.licenceShort[l] },
        ]}
      />

      {/* Stats */}
      <section className="relative z-10 -mt-px border-b border-line bg-card">
        <div className="container-x grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x rtl:lg:divide-x-reverse">
          {[
            { n: 2011, label: text.stat1[l], plain: true },
            { n: sectors.length, label: text.stat2[l] },
            { n: regions.length, label: text.stat3[l] },
            { n: referenceCount, label: text.stat4[l], plus: true },
          ].map((s, i) => (
            <div key={i} className="px-4 py-8 text-center sm:py-10">
              <p className="text-3xl font-extrabold text-brand sm:text-4xl" dir="ltr">
                {s.plain ? s.n : <CountUp to={s.n} />}
                {s.plus && "+"}
              </p>
              <p className="mt-2 text-sm font-medium text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="container-x py-20 sm:py-24">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={text.servicesEyebrow[l]} title={t("navServices")} text={text.servicesIntro[l]} />
          <Reveal className="mb-10 shrink-0 sm:mb-12">
            <Link href={href(l, "services")} className="btn-outline">
              {t("allServices")} <ArrowRight className="flip-rtl h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} s={s} l={l} i={i} />
          ))}
        </div>
      </section>

      {/* About */}
      <section className="bg-page-2 py-20 sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-navy/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/img/about.webp")} alt="" loading="lazy" className="aspect-[900/550] w-full object-cover" />
            </div>
            <div className="card absolute -bottom-8 end-4 flex max-w-[280px] items-center gap-4 p-4 shadow-xl shadow-navy/15 sm:end-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/img/logo1.png")} alt="İŞKUR" width={56} height={56} className="h-14 w-14 shrink-0" loading="lazy" />
              <div>
                <p className="text-sm font-bold text-fg">{text.licenceShort[l]}</p>
                <p className="text-xs text-muted" dir="ltr">No. 494 · 22/09/2011</p>
              </div>
            </div>
          </Reveal>
          <div className="pt-6 lg:pt-0">
            <SectionHeading eyebrow={t("navCorporate")} title={t("navAbout")} text={text.aboutShort[l]} />
            <Reveal>
              <ul className="grid gap-3 sm:grid-cols-2">
                {advantages.map((a) => (
                  <li key={a.en} className="flex items-start gap-3 text-fg">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                    <span className="font-medium">{a[l]}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={href(l, "about")} className="btn-brand">
                  {t("continue")} <ArrowRight className="flip-rtl h-4 w-4" />
                </Link>
                <Link href={href(l, "certificates")} className="btn-outline">
                  <BadgeCheck className="h-4 w-4" /> {t("navCertificates")}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="container-x py-20 sm:py-24">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={t("navSectors")} title={text.corporateApproachTitle[l]} text={text.corporateApproach[l]} />
          <Reveal className="mb-10 shrink-0 sm:mb-12">
            <Link href={href(l, "sectors")} className="btn-outline">
              {t("allSectors")} <ArrowRight className="flip-rtl h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s, i) => (
            <SectorCard key={s.slug} s={s} l={l} i={i} />
          ))}
        </div>
      </section>

      {/* Sourcing regions */}
      <section className="relative isolate overflow-hidden bg-navy py-20 text-white sm:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_15%,rgba(227,20,30,0.25),transparent_40%)]" />
        <div className="container-x">
          <Reveal className="mb-12 max-w-3xl">
            <p className="eyebrow mb-3 !text-[#ff6b72]">{t("navCountries")}</p>
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">{text.heroEyebrow[l]}</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {regions.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.08} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-colors hover:border-brand/60 hover:bg-white/10">
                  <Globe2 className="mb-5 h-8 w-8 text-brand" strokeWidth={1.5} />
                  <h3 className="mb-3 text-lg font-bold">{r.title[l]}</h3>
                  <p className="text-sm leading-relaxed text-white/75">{r.text[l]}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Link href={href(l, "countries")} className="btn-ghost">
              {t("learnMore")} <ArrowRight className="flip-rtl h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* References marquee */}
      <section className="overflow-hidden border-b border-line py-16">
        <div className="container-x mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <h2 className="text-2xl font-extrabold text-fg">{t("navReferences")}</h2>
          <Link href={href(l, "references")} className="inline-flex items-center gap-2 text-sm font-bold text-brand">
            {t("learnMore")} <ArrowRight className="flip-rtl h-4 w-4" />
          </Link>
        </div>
        <div className="relative" dir="ltr">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-page to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-page to-transparent" />
          <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
            {[...marquee, ...marquee].map((name, i) => (
              <span key={i} className="card whitespace-nowrap px-6 py-3.5 text-sm font-semibold text-fg" aria-hidden={i >= marquee.length || undefined}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand l={l} />
    </>
  );
}
