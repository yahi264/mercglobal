"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { LanguageRow, LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { WhatsAppIcon } from "./Icons";
import { Logo } from "./Logo";

export type NavLink = { href: string; label: string };
export type NavItem = NavLink & { children?: NavLink[] };

type Props = {
  locale: Locale;
  items: NavItem[];
  cta: NavLink;
  labels: { menuOpen: string; menuClose: string; language: string; dark: string; light: string; home: string };
  contact: { phone: string; phoneHref: string; email: string; city: string; whatsapp: string };
};

export function Header({ locale, items, cta, labels, contact }: Props) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sub, setSub] = useState<string | null>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSub(null);
  }, [pathname]);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    const lenis = (window as Window & { __lenis?: { stop(): void; start(): void } }).__lenis;
    if (open) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
  }, [open]);

  const isActive = (href: string) => {
    const base = `/${locale}`;
    if (href === `${base}/`) return pathname === base || pathname === `${base}/`;
    return pathname.startsWith(href.replace(/\/$/, ""));
  };

  return (
    <>
      {/* Top bar with contact details (desktop) */}
      <div className="hidden bg-navy text-[13px] text-white/80 md:block">
        <div className="container-x flex h-10 items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a href={contact.phoneHref} className="flex items-center gap-2 transition-colors hover:text-white">
              <Phone className="h-3.5 w-3.5 text-brand" /> <span dir="ltr">{contact.phone}</span>
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-2 transition-colors hover:text-white">
              <Mail className="h-3.5 w-3.5 text-brand" /> {contact.email}
            </a>
            <span className="hidden items-center gap-2 lg:flex">
              <MapPin className="h-3.5 w-3.5 text-brand" /> {contact.city}
            </span>
          </div>
          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-colors hover:text-white"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="h-4 w-4 text-whatsapp" /> WhatsApp
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled ? "border-line bg-card/85 shadow-lg shadow-navy/5 backdrop-blur-xl" : "border-transparent bg-card"
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-2 sm:gap-4">
          <Link href={`/${locale}/`} className="flex min-w-0 shrink items-center" aria-label={`Merç Global — ${labels.home}`}>
            <Logo className="[--lh:27px] min-[400px]:[--lh:30px] sm:[--lh:38px] lg:[--lh:40px]" />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center xl:flex 2xl:gap-1">
            {items.map((it) =>
              it.children ? (
                <div key={it.href} className="group relative">
                  <Link
                    href={it.href}
                    className={`flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-[13.5px] font-semibold 2xl:px-3.5 2xl:text-[14px] transition-colors hover:text-brand ${isActive(it.href) ? "text-brand" : "text-fg"}`}
                  >
                    {it.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute start-0 top-full z-50 pt-2 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="card w-72 overflow-hidden py-2 shadow-2xl shadow-navy/15">
                      {it.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className={`block px-5 py-2.5 text-sm transition-colors hover:bg-page-2 hover:text-brand ${isActive(c.href) ? "text-brand" : "text-fg"}`}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  key={it.href}
                  href={it.href}
                  className={`whitespace-nowrap rounded-full px-2.5 py-2 text-[13.5px] font-semibold 2xl:px-3.5 2xl:text-[14px] transition-colors hover:text-brand ${isActive(it.href) ? "text-brand" : "text-fg"}`}
                >
                  {it.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <LanguageSwitcher locale={locale} label={labels.language} />
            <ThemeToggle darkLabel={labels.dark} lightLabel={labels.light} />
            <Link href={cta.href} className="btn-brand hidden whitespace-nowrap !px-5 !py-2.5 lg:inline-flex xl:hidden 2xl:inline-flex">
              {cta.label}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg xl:hidden"
              aria-label={labels.menuOpen}
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[70] bg-navy/60 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 end-0 z-[80] flex w-[88%] max-w-sm flex-col bg-card text-fg shadow-2xl xl:hidden"
              initial={{ x: locale === "ar" ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: locale === "ar" ? "-100%" : "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              data-lenis-prevent
            >
              <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
                <Logo className="[--lh:30px]" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line"
                  aria-label={labels.menuClose}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-4">
                {items.map((it) => (
                  <div key={it.href} className="border-b border-line/70 last:border-0">
                    <div className="flex items-center">
                      <Link href={it.href} className={`flex-1 px-3 py-3.5 text-[15px] font-semibold ${isActive(it.href) ? "text-brand" : ""}`}>
                        {it.label}
                      </Link>
                      {it.children && (
                        <button
                          type="button"
                          onClick={() => setSub((s) => (s === it.href ? null : it.href))}
                          className="flex h-11 w-11 items-center justify-center text-muted"
                          aria-expanded={sub === it.href}
                          aria-label={it.label}
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform ${sub === it.href ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>
                    <AnimatePresence initial={false}>
                      {it.children && sub === it.href && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden ps-4"
                        >
                          {it.children.map((c) => (
                            <li key={c.href}>
                              <Link href={c.href} className="block px-3 py-2.5 text-sm text-muted hover:text-brand">
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
              <div className="space-y-4 border-t border-line p-5">
                <LanguageRow locale={locale} onPick={() => setOpen(false)} />
                <div className="grid grid-cols-2 gap-2">
                  <a href={contact.phoneHref} className="btn-outline whitespace-nowrap !px-2 !text-[13px]">
                    <Phone className="h-4 w-4" /> <span dir="ltr">0312 230 31 82</span>
                  </a>
                  <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-wa whitespace-nowrap !px-2 !text-[13px]">
                    <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
                <Link href={cta.href} className="btn-brand w-full">
                  {cta.label}
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
