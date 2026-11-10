import type { Metadata } from "next";
import { CheckCircle2, Globe2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/Blocks";
import { advantages, advantagesTitle, regions, text } from "@/lib/content";
import { getT, type Locale } from "@/lib/i18n";
import { href } from "@/lib/nav";

type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const l = (await params).locale as Locale;
  return { title: getT(l)("navCountries"), description: regions.map((r) => r.title[l]).join(" · ") };
}

const tints = ["from-[#e3141e] to-[#9d0d14]", "from-[#1e3a5f] to-[#0b1a2e]", "from-[#b80f17] to-[#5e080c]", "from-[#264b78] to-[#12263f]"];

export default async function Countries({ params }: P) {
  const l = (await params).locale as Locale;
  const t = getT(l);
  return (
    <>
      <PageHero
        title={t("navCountries")}
        eyebrow={text.heroEyebrow[l]}
        text={text.corporateApproach[l]}
        image="/img/slide/4.webp"
        crumbs={[{ href: href(l), label: t("navHome") }, { label: t("navCountries") }]}
      />
      <section className="container-x py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {regions.map((r, i) => (
            <Reveal key={r.id} delay={(i % 2) * 0.08} className="h-full">
              <article className="card group relative h-full overflow-hidden p-8">
                <div className={`absolute -end-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${tints[i]} opacity-10 transition-opacity duration-500 group-hover:opacity-20`} />
                <span className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tints[i]} text-white`}>
                  <Globe2 className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <h2 className="mb-3 text-xl font-extrabold text-fg sm:text-2xl">{r.title[l]}</h2>
                <p className="text-lg leading-relaxed text-muted">{r.text[l]}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14">
          <div className="rounded-3xl bg-navy p-8 text-white sm:p-10">
            <h2 className="mb-6 text-2xl font-extrabold">{advantagesTitle[l]}</h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {advantages.map((a) => (
                <li key={a.en} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <span className="font-semibold">{a[l]}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>
      <CtaBand l={l} />
    </>
  );
}
