"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Link to the CV builder that carries the job chosen in the application form (?position=…&job=…).
export function CvLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const [pos, setPos] = useState("");
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const p = q.get("position"), id = q.get("job");
    setPos(p ? `?position=${encodeURIComponent(p)}${id ? `&job=${encodeURIComponent(id)}` : ""}` : "");
    const on = (e: Event) => setPos((e as CustomEvent<string>).detail ?? "");
    window.addEventListener("mg:position", on);
    return () => window.removeEventListener("mg:position", on);
  }, []);
  return (
    <Link href={`${href}${pos}`} className={className}>
      {children}
    </Link>
  );
}
