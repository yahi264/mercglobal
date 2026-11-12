# Merc Global — website

Multilingual website for **Merç Global İstihdam Eğitim ve Danışmanlık Hizmetleri Ltd. Şti.** (Merç Global Group),
rebuilt from the content of www.mercglobal.com.tr.

- Languages: English, Türkçe, العربية (right-to-left), Français, Русский, Deutsch, Español, 中文 — the home address picks the visitor's browser language.
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

## Job vacancies (admin)
- Vacancies are stored in `data/jobs.json` (branch `main`) and shown on the "Job Vacancies" page of every language.
- Manage them at **/admin/** (https://yahi264.github.io/mercglobal/admin/): paste a GitHub fine-grained token
  (repository `yahi264/mercglobal`, permission *Contents: Read and write*) once, then add / edit / hide / delete
  vacancies and press **Publish**. They appear on the site within 1–2 minutes — no rebuild needed.
- Because the admin page saves to GitHub, run `git pull` before making code changes on this computer.

## CV builder
- `/<language>/cv/`: candidates fill in a form, choose an English or Turkish CV, download it as PDF (print) and send it
  by email or WhatsApp. Nothing is stored on a server; the draft stays in the visitor's browser.

## Adding / changing a language
- Texts live in `lib/content.ts` and `lib/i18n.ts` (one entry per language). `scripts/i18n/` has the helper used to add
  Chinese, Spanish and German.
