# Branded application emails (Google Apps Script)

`Code.gs` runs on the company's Google Workspace account and sends:
- the team a designed email (role, candidate details, message, CV summary, CV attached, Reply/WhatsApp/Call buttons) to info@ with copies to ali.merc@, merc_ltd@hotmail.com, cv@turkishmanpower.com;
- the candidate a confirmation in their language with a reference number.

## Install (once, ~5 minutes, signed in as info@mercglobal.com.tr)
1. Open https://script.google.com → **New project**, name it "Merc Global applications".
2. Delete the sample code, paste all of `Code.gs`, save.
3. **Deploy → New deployment** → type **Web app** → Execute as **Me** → Who has access **Anyone** → **Deploy**.
4. Authorise (Advanced → Go to project → Allow).
5. Copy the **Web app URL** (ends in `/exec`) and put it in `lib/content.ts` → `applyEndpoint`, then redeploy the website.

If the mailer is ever unavailable the website automatically falls back to FormSubmit.
To change the script later: edit, then **Deploy → Manage deployments → Edit → New version** (the URL stays the same).
