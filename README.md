# Merc Global — website

Multilingual website for **Merç Global İstihdam Eğitim ve Danışmanlık Hizmetleri Ltd. Şti.** (Merç Global Group).

- **Live preview:** https://yahi264.github.io/mercglobal/
- **Admin (job vacancies):** https://yahi264.github.io/mercglobal/admin/
- **Source code:** https://github.com/yahi264/mercglobal (branch `main`; the published site is on branch `gh-pages`)

## What the site does
- 9 languages: English, Türkçe, العربية (right-to-left), Français, Русский, Deutsch, Español, 中文, Italiano.
  The home address opens the visitor's browser language.
- Light / dark mode, animated intro and globe, smooth scrolling, WhatsApp / LinkedIn / social links.
- **Job vacancies** page, managed from the admin page (see below).
- **Job application** form: the candidate uploads a CV (PDF / Word / photo) and it is emailed to the company mailboxes.
  A "Send your CV" button on the home page opens the same form as a general application.
- **CV builder** (`/<language>/cv/`): candidates create an English or Turkish CV online, download it as PDF and send it
  with their application. The chosen vacancy follows the candidate between the form and the CV builder.
- Staff-request form for employers, site assistant, licence and certificate pages.

It is a fully **static** site (Next.js 16 static export, folder `out`). Any web hosting that serves plain files works
(cPanel / Apache / Nginx / IIS, GitHub Pages, Cloudflare Pages, Netlify). No database and no PHP are needed.

## Where things are
| Path | Content |
|---|---|
| `lib/content.ts` | company texts, services, sectors, countries, references, contact details, emails, phone / WhatsApp |
| `lib/i18n.ts` | menu, button and form texts for all languages |
| `data/jobs.json` | job vacancies (written by the admin page) |
| `public/img` | photos, logo, licence documents |
| `public/templates` | Word templates for job offers (blank + example, EN / TR) |
| `lib/send.ts` | how applications are emailed |
| `scripts/apps-script` | optional Google Apps Script mailer (branded emails) + install guide |

## Commands (Node.js 20+)
    npm install
    npm run build:pages                     # build into "out" for https://yahi264.github.io/mercglobal/
    node scripts/serve.mjs                  # preview the built site at http://localhost:5190/mercglobal/
    npm run deploy:pages                    # build and publish to GitHub Pages (branch gh-pages)

**For the company's own domain** (site at the root, e.g. https://www.mercglobal.com.tr/), build without the
`/mercglobal` prefix and upload the contents of `out` to the web root:

    # PowerShell
    $env:PAGES_BASE=""; npm run build:pages
    # bash
    PAGES_BASE="" npm run build:pages

## Job vacancies (admin page)
- Vacancies are stored in `data/jobs.json` on branch `main` of the GitHub repository and are read live by the site,
  so **publishing a vacancy needs no rebuild or upload**: it appears within 1–2 minutes on every copy of the site.
- Open `/admin/`, paste a GitHub **fine-grained token** once (repository `yahi264/mercglobal`, permission
  *Contents: Read and write*); it is kept only in that browser. Then add / edit / hide / delete vacancies
  (or import them from the Word templates) and press **Publish**.
- If the repository is moved to a company GitHub account, change `REPO` in `lib/jobs.ts` and rebuild.
- Because the admin page commits to GitHub, run `git pull` before making code changes.

## Application emails
- Default: applications are sent through **FormSubmit** to `info@mercglobal.com.tr` with copies to the addresses in
  `company.applyCc` (`lib/content.ts`). The first submission sends an activation email to info@; click it once.
- Optional, nicer: install the Google Apps Script mailer in `scripts/apps-script` (branded team email + confirmation
  to the candidate, CV attached), then put its Web app URL in `company.applyEndpoint` and rebuild.

## Adding / changing a language
Texts live in `lib/content.ts` and `lib/i18n.ts` (one entry per language); `scripts/i18n/` has the helpers used to add
languages. Add the code to `locales` in `lib/i18n.ts` and to the list in `scripts/deploy-pages.mjs`.
