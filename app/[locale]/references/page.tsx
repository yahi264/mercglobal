import type { Metadata } from "next";
import { Building2, HeartPulse, UtensilsCrossed, Landmark } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CtaBand } from "@/components/Blocks";
import { refs } from "@/lib/content";
import { getT, type Locale } from "@/lib/i18n";
import { href } from "@/lib/nav";

type P = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const l = (await params).locale as Locale;
  return { title: getT(l)("navReferences"), description: refs.intlTitle[l] };
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" dir="ltr">
      {items.map((r) => {
        const [name, where] = r.split(" — ");
        return (
          <li key={r} className="card p-4 transition-colors hover:border-brand/40">
            <p className="font-bold text-fg">{name}</p>
            {where && <p className="mt-0.5 text-sm text-muted">{where}</p>}
          </li>
        );
      })}
    </ul>
  );
}

function Heading({ icon: I, title, n }: { icon: typeof Building2; title: string; n: number }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
        <I className="h-6 w-6" strokeWidth={1.75} />
      </span>
      <h2 className="text-xl font-extrabold text-fg sm:text-2xl">
        {title}{" "}
        <span className="text-base font-semibold text-muted" dir="ltr">
          ({n})
        </span>
      </h2>
    </div>
  );
}

export default async function References({ params }: P) {
  const l = (await params).locale as Locale;
  const t = getT(l);
  return (
    <>
      <PageHero title={t("navReferences")} eyebrow={t("navCorporate")} image="/img/slide/1.webp" crumbs={[{ href: href(l), label: t("navHome") }, { label: t("navReferences") }]} />
      <div className="container-x space-y-16 py-20">
        <Reveal>
          <Heading icon={Building2} title={refs.intlTitle[l]} n={refs.intl.length} />
          <List items={refs.intl} />
        </Reveal>
        <Reveal>
          <Heading icon={Landmark} title={refs.trTitle[l]} n={refs.tr.length} />
          <List items={refs.tr} />
        </Reveal>
        <Reveal>
          <Heading icon={HeartPulse} title={refs.medTitle[l]} n={refs.med.length} />
          <div className="grid gap-4 md:grid-cols-2">
            {refs.med.map((m) => (
              <div key={m.name} className="card p-6">
                <p className="font-bold text-fg" dir="ltr">
                  {m.name}
                </p>
                <p className="mt-2 leading-relaxed text-muted">{m.text[l]}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <Heading icon={UtensilsCrossed} title={refs.cateringTitle[l]} n={refs.catering.length} />
          <List items={refs.catering} />
        </Reveal>
      </div>
      <CtaBand l={l} />
    </>
  );
}
