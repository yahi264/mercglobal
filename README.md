# Merc Global — website

Multilingual website for **Merç Global İstihdam Eğitim ve Danışmanlık Hizmetleri Ltd. Şti.** (Merç Global Group),
rebuilt from the content of www.mercglobal.com.tr.

- Languages: English, Türkçe, العربية (right-to-left), Français, Русский — the home address picks the visitor's browser language.
- Light / dark mode, smooth scrolling (Lenis), animations (Motion), WhatsApp button, staff-request and job-application forms
  (they open WhatsApp or the visitor's email app with the message ready, so no server is needed).
- Built with Next.js 16 as a fully static site.

## Where things are
- `lib/content.ts` — all company texts, services, sectors, countries, references (in 5 languages) and contact details
- `lib/i18n.ts` — menu, button and form texts (5 languages)
- `public/img` — photos, logo and licence documents

## Commands
    npm install
    npm run build:pages     # build into the "out" folder (for https://yahi264.github.io/mercglobal/)
    node scripts/serve.mjs  # preview the built site at http://localhost:5190/mercglobal/
    npm run deploy:pages    # build and publish to GitHub Pages (branch gh-pages)

To host on the company's own domain instead (no "/mercglobal" in the address), build with `PAGES_BASE=""`.
