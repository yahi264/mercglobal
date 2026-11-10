import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { DocumentGallery } from "@/components/Lightbox";
import { CtaBand } from "@/components/Blocks";
import { legal, text } from "@/lib/content";
import { getT, type Locale } from "@/lib/i18n";
import { href } from "@/lib/nav";

type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const l = (await params).locale as Locale;
  return { title: getT(l)("navCertificates"), description: legal.intro[l] };
}

export default async function Certificates({ params }: P) {
  const l = (await params).locale as Locale;
  const t = getT(l);
  return (
    <>
      <PageHero title={t("navCertificates")} eyebrow={t("navCorporate")} text={legal.intro[l]} crumbs={[{ href: href(l), label: t("navHome") }, { label: t("navCertificates") }]} />
      <section className="container-x py-20">
        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <h2 className="mb-5 text-2xl font-extrabold text-fg sm:text-3xl">{legal.compTitle[l]}</h2>
            <p className="leading-relaxed text-muted">{legal.outro[l]}</p>
            <p className="mt-6 rounded-2xl border-s-4 border-brand bg-brand-soft p-5 text-sm leading-relaxed text-fg">
              {text.licence[l]} {t("cFree")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid gap-4 sm:grid-cols-2">
              {legal.comp.map((c) => (
                <li key={c.en} className="card flex items-start gap-3 p-5">
                  <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-brand" strokeWidth={1.75} />
                  <span className="font-semibold text-fg">{c[l]}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <SectionHeading title={t("navCertificates")} />
        <DocumentGallery
          docs={legal.docs.map((d, i) => ({ small: `/img/belge/${i + 1}-sm.webp`, large: `/img/belge/${i + 1}.webp`, caption: d[l] }))}
          labels={{ close: t("close"), enlarge: t("enlarge") }}
        />
      </section>
      <CtaBand l={l} />
    </>
  );
}
