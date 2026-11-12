import { getT, type Locale } from "./i18n";
import { sectors, services } from "./content";
import type { NavItem } from "@/components/Header";

export const href = (l: Locale, path = "") => `/${l}/${path ? `${path.replace(/^\/|\/$/g, "")}/` : ""}`;

export function navItems(l: Locale): NavItem[] {
  const t = getT(l);
  return [
    { href: href(l), label: t("navHome") },
    {
      href: href(l, "about"),
      label: t("navCorporate"),
      children: [
        { href: href(l, "about"), label: t("navAbout") },
        { href: href(l, "certificates"), label: t("navCertificates") },
        { href: href(l, "references"), label: t("navReferences") },
        { href: href(l, "jobs"), label: t("navJobs") },
        { href: href(l, "cv"), label: t("navCv") },
        { href: href(l, "careers"), label: t("navCareers") },
      ],
    },
    { href: href(l, "services"), label: t("navServices"), children: services.map((s) => ({ href: href(l, `services/${s.slug}`), label: s.title[l] })) },
    { href: href(l, "sectors"), label: t("navSectors"), children: sectors.map((s) => ({ href: href(l, `sectors/${s.slug}`), label: s.title[l] })) },
    { href: href(l, "countries"), label: t("navCountries") },
    { href: href(l, "contact"), label: t("navContact") },
  ];
}
