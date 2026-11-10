// Files in /public need the site's base path in front (e.g. /mercglobal on GitHub Pages).
export const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${p}`;
