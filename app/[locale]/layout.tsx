import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Cairo, Manrope, Tinos } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { BackToTop, PageFade, ScrollProgress, SmoothScroll } from "@/components/Motion";
import { Intro } from "@/components/Intro";
import { introScript, themeScript } from "@/lib/head-scripts";
import { company, mainWhatsApp, text } from "@/lib/content";
import { dirOf, getT, isLocale, locales, type Locale } from "@/lib/i18n";
import { href, navItems } from "@/lib/nav";
import { asset } from "@/lib/asset";

const manrope = Manrope({ subsets: ["latin", "latin-ext", "cyrillic"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope" });
const tinos = Tinos({ subsets: ["latin", "latin-ext"], weight: ["700"], variable: "--font-logo" });
const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-cairo" });

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#07111f" },
  ],
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: { default: `Merc Global | Merç Global Group — ${text.heroEyebrow[locale]}`, template: "%s | Merc Global" },
    description: text.aboutShort[locale],
    icons: { icon: asset("/icon.png"), apple: asset("/icon.png") },
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, asset(`/${l}/`)])) },
    openGraph: { siteName: "Merc Global", images: [asset("/img/slide/1.webp")], locale },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = getT(l);

  return (
    <html lang={l} dir={dirOf(l)} className={`${manrope.variable} ${cairo.variable} ${tinos.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript + introScript }} />
      </head>
      <body>
        <Intro tagline={text.heroEyebrow[l]} skip={t("skipIntro")} />
        <SmoothScroll />
        <ScrollProgress />
        <Header
          locale={l}
          items={navItems(l)}
          cta={{ href: href(l, "contact") + "#request", label: t("requestStaff") }}
          labels={{ menuOpen: t("menuOpen"), menuClose: t("menuClose"), language: t("language"), dark: t("darkMode"), light: t("lightMode"), home: t("navHome") }}
          contact={{ phone: company.phoneDisplay, phoneHref: company.phoneHref, email: company.emails[0], city: "Kızılay / Ankara", whatsapp: mainWhatsApp }}
        />
        <main>
          <PageFade>{children}</PageFade>
        </main>
        <Footer locale={l} />
        <FloatingContact
          whatsapp={company.whatsapp}
          phoneHref={company.phoneHref}
          labels={{ call: `${t("callNow")} · 0312 230 31 82`, write: t("writeWhatsApp"), close: t("close") }}
          greeting={`Merç Global — ${t("getInfo")}`}
        />
        <BackToTop label={t("backToTop")} />
      </body>
    </html>
  );
}
