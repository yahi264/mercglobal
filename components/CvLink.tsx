"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Link to the CV builder that carries the job chosen in the application form (?position=…).
export function CvLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const [pos, setPos] = useState("");
  useEffect(() => {
    setPos(new URLSearchParams(location.search).get("position") ?? "");
    const on = (e: Event) => setPos((e as CustomEvent<string>).detail ?? "");
    window.addEventListener("mg:position", on);
    return () => window.removeEventListener("mg:position", on);
  }, []);
  return (
    <Link href={pos ? `${href}?position=${encodeURIComponent(pos)}` : href} className={className}>
      {children}
    </Link>
  );
}
