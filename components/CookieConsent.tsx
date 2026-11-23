"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import type { Locale } from "@/lib/i18n";

// Cookie notice (KVKK / GDPR). Google Analytics is loaded only after the visitor accepts;
// the choice is remembered in this browser and can be changed from the footer link.
const KEY = "merc-cookies";
const T: Record<Locale, [string, string, string]> = {
  en: ["We use analytics cookies (Google Analytics) to understand which countries our visitors come from and to improve the website. No personal data is sold.", "Accept", "Decline"],
  tr: ["Ziyaretçilerimizin hangi ülkelerden geldiğini anlamak ve siteyi geliştirmek için analitik çerezler (Google Analytics) kullanıyoruz. Kişisel veriler satılmaz.", "Kabul et", "Reddet"],
  ar: ["نستخدم ملفات تعريف الارتباط التحليلية (Google Analytics) لمعرفة الدول التي يأتي منها زوارنا ولتحسين الموقع. لا يتم بيع أي بيانات شخصية.", "موافق", "رفض"],
  fr: ["Nous utilisons des cookies analytiques (Google Analytics) pour savoir de quels pays viennent nos visiteurs et améliorer le site. Aucune donnée personnelle n'est vendue.", "Accepter", "Refuser"],
  ru: ["Мы используем аналитические cookie (Google Analytics), чтобы понимать, из каких стран приходят посетители, и улучшать сайт. Личные данные не продаются.", "Принять", "Отклонить"],
  de: ["Wir verwenden Analyse-Cookies (Google Analytics), um zu verstehen, aus welchen Ländern unsere Besucher kommen, und die Website zu verbessern. Es werden keine persönlichen Daten verkauft.", "Akzeptieren", "Ablehnen"],
  es: ["Usamos cookies analíticas (Google Analytics) para saber de qué países vienen nuestros visitantes y mejorar el sitio. No se venden datos personales.", "Aceptar", "Rechazar"],
  zh: ["我们使用分析 Cookie（Google Analytics）来了解访客来自哪些国家并改进网站。我们不会出售任何个人数据。", "接受", "拒绝"],
  it: ["Utilizziamo cookie analitici (Google Analytics) per capire da quali paesi provengono i visitatori e migliorare il sito. Nessun dato personale viene venduto.", "Accetta", "Rifiuta"],
};

type W = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };

function loadAnalytics(id: string) {
  const w = window as W;
  if (!id || w.gtag) return;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", id, { anonymize_ip: true });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

export function CookieConsent({ locale, analyticsId }: { locale: Locale; analyticsId: string }) {
  const [show, setShow] = useState(false);
  const [text, ok, no] = T[locale] ?? T.en;

  useEffect(() => {
    let choice: string | null = null;
    try {
      choice = localStorage.getItem(KEY);
    } catch {}
    if (choice === "granted") loadAnalytics(analyticsId);
    else if (choice !== "denied") setShow(true);
    const reopen = () => setShow(true);
    window.addEventListener("mg:cookies", reopen);
    return () => window.removeEventListener("mg:cookies", reopen);
  }, [analyticsId]);

  const choose = (granted: boolean) => {
    try {
      localStorage.setItem(KEY, granted ? "granted" : "denied");
    } catch {}
    if (granted) loadAnalytics(analyticsId);
    setShow(false);
  };

  if (!show) return null;
  return (
    <div className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-3xl sm:bottom-5" role="dialog" aria-live="polite" aria-label="Cookies">
      <div className="card flex flex-col gap-4 p-4 shadow-2xl shadow-navy/25 sm:flex-row sm:items-center sm:p-5">
        <Cookie className="hidden h-8 w-8 shrink-0 text-brand sm:block" strokeWidth={1.6} />
        <p className="flex-1 text-sm leading-relaxed text-fg">{text}</p>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => choose(false)} className="btn-outline flex-1 !px-4 !py-2.5 text-sm sm:flex-none">{no}</button>
          <button type="button" onClick={() => choose(true)} className="btn-brand flex-1 !px-5 !py-2.5 text-sm sm:flex-none">{ok}</button>
        </div>
      </div>
    </div>
  );
}

// Footer link that opens the cookie notice again
export function CookieSettings({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("mg:cookies"))} className="hover:text-white">
      {label}
    </button>
  );
}
