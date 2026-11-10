import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, Target, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/Blocks";
import { advantages, text } from "@/lib/content";
import { getT, type Locale } from "@/lib/i18n";
import { href } from "@/lib/nav";
import { asset } from "@/lib/asset";

type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const l = (await params).locale as Locale;
  return { title: getT(l)("navAbout"), description: text.aboutShort[l] };
}

export default async function About({ params }: P) {
  const l = (await params).locale as Locale;
  const t = getT(l);
  return (
    <>
      <PageHero title={t("navAbout")} eyebrow={t("navCorporate")} image="/img/about.webp" crumbs={[{ href: href(l), label: t("navHome") }, { label: t("navAbout") }]} />
      <section className="container-x grid gap-12 py-20 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="space-y-6 text-lg leading-relaxed text-muted">
          {text.about.map((p, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className={i === 0 ? "text-xl font-semibold leading-relaxed text-fg" : ""}>{p[l]}</p>
            </Reveal>
          ))}
        </div>
        <div className="space-y-5">
          {[
            { icon: Eye, title: text.visionTitle[l], body: text.vision[l] },
            { icon: Target, title: text.missionTitle[l], body: text.mission[l] },
          ].map((b, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="card p-7">
                <b.icon className="mb-4 h-8 w-8 text-brand" strokeWidth={1.5} />
                <h2 className="mb-2 text-xl font-bold text-fg">{b.title}</h2>
                <p className="leading-relaxed text-muted">{b.body}</p>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <div className="card flex items-center gap-4 p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/img/logo1.png")} alt="İŞKUR" width={64} height={64} className="h-16 w-16 shrink-0" />
              <div>
                <p className="font-bold text-fg">{text.licenceShort[l]}</p>
                <p className="text-sm text-muted" dir="ltr">No. 494 · 22/09/2011</p>
                <Link href={href(l, "certificates")} className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-brand">
                  {t("navCertificates")} <ArrowRight className="flip-rtl h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="bg-page-2 py-16">
        <div className="container-x">
          <Reveal>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {advantages.map((a) => (
                <li key={a.en} className="card flex items-center gap-3 p-5 font-semibold text-fg">
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-brand" /> {a[l]}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      <CtaBand l={l} />
    </>
  );
}
