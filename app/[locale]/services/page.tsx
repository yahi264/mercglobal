import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBand, ServiceCard } from "@/components/Blocks";
import { services, text } from "@/lib/content";
import { getT, type Locale } from "@/lib/i18n";
import { href } from "@/lib/nav";

type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const l = (await params).locale as Locale;
  return { title: getT(l)("navServices"), description: text.servicesIntro[l] };
}

export default async function Services({ params }: P) {
  const l = (await params).locale as Locale;
  const t = getT(l);
  return (
    <>
      <PageHero
        title={t("navServices")}
        eyebrow={text.servicesEyebrow[l]}
        text={text.servicesIntro[l]}
        image="/img/slide/3.webp"
        crumbs={[{ href: href(l), label: t("navHome") }, { label: t("navServices") }]}
      />
      <section className="container-x py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} s={s} l={l} i={i} />
          ))}
        </div>
        <Reveal className="mt-14">
          <div className="card border-s-4 !border-s-brand p-7 sm:p-9">
            <h2 className="mb-3 text-xl font-extrabold text-fg sm:text-2xl">{text.corporateApproachTitle[l]}</h2>
            <p className="text-lg leading-relaxed text-muted">{text.corporateApproach[l]}</p>
          </div>
        </Reveal>
      </section>
      <CtaBand l={l} />
    </>
  );
}
