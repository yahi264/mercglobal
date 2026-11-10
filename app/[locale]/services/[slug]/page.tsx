import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Info } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/Blocks";
import { ServiceIcon } from "@/components/Icons";
import { permitInfo, services } from "@/lib/content";
import { getT, locales, type Locale } from "@/lib/i18n";
import { href } from "@/lib/nav";

type P = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  const l = locale as Locale;
  return { title: s.title[l], description: s.long[l] };
}

export default async function ServicePage({ params }: P) {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const t = getT(l);
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = services.filter((x) => x.slug !== slug);

  return (
    <>
      <PageHero
        title={s.title[l]}
        eyebrow={t("serviceDetail")}
        text={s.long[l]}
        image={s.image ? `/img/slide/${s.image}.webp` : "/img/about.webp"}
        crumbs={[{ href: href(l), label: t("navHome") }, { href: href(l, "services"), label: t("navServices") }, { label: s.title[l] }]}
      />
      <section className="container-x grid gap-12 py-20 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <Reveal>
            <div className="mb-8 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white">
                <ServiceIcon name={s.icon} />
              </span>
              <h2 className="text-2xl font-extrabold text-fg sm:text-3xl">{s.listTitle[l]}</h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {s.list.map((it) => (
                <li key={it.en} className="card flex items-start gap-3 p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <span className="font-semibold text-fg">{it[l]}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {s.slug === "work-permit-visa" && (
            <Reveal className="mt-14">
              <h2 className="text-2xl font-extrabold text-fg sm:text-3xl">{permitInfo.title[l]}</h2>
              <p className="mt-3 text-muted">{permitInfo.intro[l]}</p>
              <div className="mt-8 grid gap-6 xl:grid-cols-2">
                <div className="card overflow-hidden">
                  <h3 className="bg-navy px-6 py-4 font-bold text-white">{permitInfo.feesTitle[l]}</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      {permitInfo.fees.map(([k, v]) => (
                        <tr key={v + k.en} className="border-b border-line last:border-0">
                          <td className="px-6 py-3.5 text-fg">{k[l]}</td>
                          <td className="whitespace-nowrap px-6 py-3.5 text-end font-bold text-brand" dir="ltr">
                            {v}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="flex gap-2 border-t border-line bg-page-2 px-6 py-4 text-xs text-muted">
                    <Info className="h-4 w-4 shrink-0" /> {permitInfo.feesNote[l]}
                  </p>
                </div>
                <div className="card overflow-hidden">
                  <h3 className="bg-navy px-6 py-4 font-bold text-white">{permitInfo.wageTitle[l]}</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      {permitInfo.wages.map(([k, v]) => (
                        <tr key={k.en} className="border-b border-line last:border-0">
                          <td className="px-6 py-3.5 text-fg">{k[l]}</td>
                          <td className="px-6 py-3.5 text-end font-bold text-brand">{v[l]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card mt-6 p-6">
                <h3 className="mb-4 font-bold text-fg">{permitInfo.criteriaTitle[l]}</h3>
                <ul className="space-y-3">
                  {permitInfo.criteria.map((c) => (
                    <li key={c.en} className="flex gap-3 text-muted">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" /> {c[l]}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="card overflow-hidden">
            <p className="border-b border-line px-6 py-4 font-bold text-fg">{t("otherServices")}</p>
            <ul>
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={href(l, `services/${o.slug}`)} className="group flex items-center gap-3 border-b border-line px-6 py-3.5 text-sm font-medium text-fg transition-colors last:border-0 hover:bg-page-2 hover:text-brand">
                    <ServiceIcon name={o.icon} className="h-5 w-5 text-brand" />
                    <span className="flex-1">{o.title[l]}</span>
                    <ArrowRight className="flip-rtl h-4 w-4 opacity-40 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-navy p-7 text-white">
            <p className="mb-2 text-lg font-bold">{t("getInfo")}</p>
            <p className="mb-5 text-sm text-white/75">{t("formIntro")}</p>
            <Link href={href(l, "contact") + "#request"} className="btn-brand w-full">
              {t("requestStaff")}
            </Link>
          </div>
        </aside>
      </section>
      <CtaBand l={l} />
    </>
  );
}
