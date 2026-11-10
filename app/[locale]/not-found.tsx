import Link from "next/link";

// Shown for unknown addresses inside a language (the static 404.html redirects to the right home page).
export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-7xl font-extrabold text-brand">404</p>
      <h1 className="mt-4 text-2xl font-extrabold text-fg">Page not found</h1>
      <Link href="/en/" className="btn-brand mt-8">
        Home
      </Link>
    </section>
  );
}
