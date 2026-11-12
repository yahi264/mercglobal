"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";
import { dirOf, type Locale } from "@/lib/i18n";

// The company's logo: red Merç mark + serif lettering, as on the original mercglobal.com.tr,
// with the lettering in the visitor's language. The second line is sized so it ends exactly where
// the first line ends (one neat block), whatever the language.
// translate="no" stops browser auto-translation from rewriting it.
const TEXT: Record<Locale, [string, string]> = {
  tr: ["MERÇ GLOBAL İSTİHDAM", "Eğitim ve Danışmanlık Hizmetleri Ltd."],
  en: ["MERÇ GLOBAL EMPLOYMENT", "Education and Consultancy Services Ltd."],
  ar: ["ميرتش جلوبال للتوظيف", "للتعليم والخدمات الاستشارية المحدودة"],
  fr: ["MERÇ GLOBAL EMPLOI", "Services d'Éducation et de Conseil Ltd."],
  ru: ["MERÇ GLOBAL КАДРЫ", "Образовательные и консалтинговые услуги Ltd."],
  de: ["MERÇ GLOBAL PERSONAL", "Bildungs- und Beratungsdienstleistungen Ltd."],
  es: ["MERÇ GLOBAL EMPLEO", "Servicios de Educación y Consultoría Ltd."],
  zh: ["MERÇ GLOBAL 人力资源", "教育与咨询服务有限公司"],
};

export function Logo({ locale, tone = "auto", className = "", fit = false }: { locale: Locale; tone?: "auto" | "light"; className?: string; fit?: boolean }) {
  const root = useRef<HTMLSpanElement>(null);
  const l1 = useRef<HTMLSpanElement>(null);
  const l2 = useRef<HTMLSpanElement>(null);
  const [a, b] = TEXT[locale] ?? TEXT.tr;

  useEffect(() => {
    const one = l1.current, two = l2.current, box = root.current;
    if (!one || !two || !box) return;
    const lines = () => {
      two.style.fontSize = "";
      two.style.letterSpacing = "";
      const w1 = one.getBoundingClientRect().width;
      const w2 = two.getBoundingClientRect().width;
      if (!w1 || !w2) return;
      const base = parseFloat(getComputedStyle(two).fontSize);
      const ratio = Math.min(1.6, Math.max(0.55, w1 / w2));
      two.style.fontSize = `${base * ratio}px`;
      // fine-tune the last pixels with letter spacing so both lines end together
      const diff = w1 - two.getBoundingClientRect().width;
      const chars = Math.max(1, (two.textContent ?? "").length - 1);
      two.style.letterSpacing = `${diff / chars}px`;
    };
    // fit=true: shrink the whole logo when it is wider than the space it is given (small phones, long languages)
    const all = () => {
      box.style.removeProperty("--lh");
      lines();
      const parent = box.parentElement;
      if (!fit || !parent) return;
      const avail = parent.clientWidth, need = box.scrollWidth;
      if (need > avail + 1) {
        const lh = parseFloat(getComputedStyle(box).getPropertyValue("--lh")) || 40;
        box.style.setProperty("--lh", `${Math.max(14, (lh * avail) / need - 0.3)}px`);
        lines();
      }
    };
    all();
    const ro = new ResizeObserver(all);
    ro.observe(one);
    if (fit && box.parentElement) ro.observe(box.parentElement);
    document.fonts?.ready.then(all);
    return () => ro.disconnect();
  }, [a, b, fit]);

  const text = tone === "light" ? "text-white" : "text-black dark:text-white";
  return (
    <span ref={root} className={`logo notranslate flex items-center ${className}`} dir={dirOf(locale)} translate="no" lang={locale}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset("/img/mark-red.png")} alt="" width={160} height={115} className="logo-mark w-auto shrink-0" />
      <span className={`logo-text font-logo inline-flex flex-col font-bold leading-[1.08] ${text}`}>
        <span ref={l1} className="logo-l1 self-start whitespace-nowrap">
          {a}
        </span>
        <span ref={l2} className="logo-l2 self-start whitespace-nowrap">
          {b}
        </span>
      </span>
    </span>
  );
}
