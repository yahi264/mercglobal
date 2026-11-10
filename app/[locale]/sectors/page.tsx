import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand, SectorCard } from "@/components/Blocks";
import { sectors, text } from "@/lib/content";
import { getT, type Locale } from "@/lib/i18n";
import { href } from "@/lib/nav";

type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const l = (await params).locale as Locale;
  return { title: getT(l)("navSectors"), description: text.corporateApproach[l] };
}

export default async function Sectors({ params }: P) {
  const l = (await params).locale as Locale;
  const t = getT(l);
  return (
    <>
      <PageHero
        title={t("navSectors")}
        eyebrow={text.corporateApproachTitle[l]}
        text={text.corporateApproach[l]}
        image="/img/slide/2.webp"
        crumbs={[{ href: href(l), label: t("navHome") }, { label: t("navSectors") }]}
      />
      <section className="container-x py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s, i) => (
            <SectorCard key={s.slug} s={s} l={l} i={i} tall />
          ))}
        </div>
      </section>
      <CtaBand l={l} />
    </>
  );
}
