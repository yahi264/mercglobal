"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// Runs before the page is shown (see layout) so the saved mode never flashes.
export const themeScript = `(function(){try{var t=localStorage.getItem("merc-theme");if(!t){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}if(t==="dark")document.documentElement.classList.add("dark")}catch(e){}})();`;

export function ThemeToggle({ darkLabel, lightLabel }: { darkLabel: string; lightLabel: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);

  const toggle = () => {
    const html = document.documentElement;
    const next = !html.classList.contains("dark");
    html.classList.add("theme-switching");
    html.classList.toggle("dark", next);
    setTimeout(() => html.classList.remove("theme-switching"), 100);
    try {
      localStorage.setItem("merc-theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  };

  const label = dark ? lightLabel : darkLabel;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-brand hover:text-brand"
    >
      <Sun className={`absolute h-[18px] w-[18px] transition-all duration-500 ${dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"}`} />
      <Moon className={`absolute h-[18px] w-[18px] transition-all duration-500 ${dark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
    </button>
  );
}
