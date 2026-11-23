# Website backend (Google Apps Script)

`Code.gs` runs on the company Google Workspace account **info@turkishmanpower.com** (free). It provides:

- **Job vacancies**: stored in the Google Sheet **"Merç Global — Website"** (tab *Jobs*), shown on the website's
  Job Vacancies page and managed from the admin page (`/admin/`).
- **Admin login**: username + password, listed in the tab *Admins* of the same sheet (no GitHub key).
- **Applications**: the CV (uploaded, or created with the CV builder) is emailed to the addresses the admin ticked
  for that vacancy (or for general applications), and the candidate receives a branded thank-you email in their
  language. Every application is also logged in the tab *Applications*.

## Install (once)

1. Signed in as info@turkishmanpower.com, open <https://script.google.com> → **New project**, name it
   "Merç Global Website Backend", and paste the contents of `Code.gs`.
2. Choose the function **setup** and press **Run** → **Review permissions** → allow. The log shows the link of the new
   Google Sheet.
3. **Deploy → New deployment → Web app** — Execute as **Me**, Who has access **Anyone** → **Deploy** → copy the Web app
   URL (`https://script.google.com/macros/s/…/exec`).
4. Put that URL in `lib/content.ts` → `company.apiEndpoint`, rebuild and publish the website.
5. Open the Google Sheet → tab **Admins** → type up to 4 usernames (column A) and passwords (column B). Each password is
   replaced by an encrypted version the first time that person signs in. Admins can change their password on the
   admin page.

## Changing the script later

Edit `Code.gs` in the Apps Script editor → **Deploy → Manage deployments → ✏️ → Version: New version → Deploy**.
The URL stays the same, so the website does not need to change.

The list of addresses the admin can tick is `CONFIG.recipients` at the top of `Code.gs`.
