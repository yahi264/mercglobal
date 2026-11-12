import type { Metadata } from "next";
import { Manrope, Tinos } from "next/font/google";
import "../globals.css";
import { themeScript } from "@/lib/head-scripts";

// Separate, simple page for managing job vacancies. Not linked from the site and hidden from search engines.
const manrope = Manrope({ subsets: ["latin", "latin-ext"], weight: ["400", "600", "700", "800"], variable: "--font-manrope" });

const tinos = Tinos({ subsets: ["latin", "latin-ext"], weight: ["700"], variable: "--font-logo" });

export const metadata: Metadata = { title: "Admin · Merc Global", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${tinos.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-page-2">{children}</body>
    </html>
  );
}
