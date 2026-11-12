import { asset } from "@/lib/asset";

// The company's original logo (as on the old mercglobal.com.tr): red Merç mark + black serif lettering.
// Rebuilt from a clean copy of the mark and real text, so it stays sharp at any size.
// translate="no" stops browser auto-translation (e.g. Google Translate) from rewriting the company name.
// tone="light" shows the lettering in white (dark backgrounds, footer, intro).
export function Logo({ tone = "auto", className = "" }: { tone?: "auto" | "light"; className?: string }) {
  const text = tone === "light" ? "text-white" : "text-black dark:text-white";
  return (
    <span className={`logo notranslate flex items-center ${className}`} dir="ltr" translate="no">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset("/img/mark-red.png")} alt="" width={160} height={115} className="logo-mark w-auto shrink-0" />
      <span className={`logo-text font-logo font-bold leading-[1.08] ${text}`}>
        <span className="logo-l1 block whitespace-nowrap">MERÇ GLOBAL İSTİHDAM</span>
        <span className="logo-l2 block whitespace-nowrap">Eğitim ve Danışmanlık Hizmetleri Ltd.</span>
      </span>
    </span>
  );
}
