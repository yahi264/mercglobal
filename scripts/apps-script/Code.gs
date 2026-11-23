/**
 * Merç Global — website backend (Google Apps Script)
 * ---------------------------------------------------
 * Runs on the company Google Workspace account (info@turkishmanpower.com), free of charge.
 * It does everything the static website cannot do by itself:
 *   • Job vacancies: stored in the Google Sheet "Merç Global — Website" (tab "Jobs") and served to the
 *     website; managed from the website's admin page (/admin/).
 *   • Admin login: username + password (tab "Admins" of the same sheet). No GitHub key.
 *   • Applications: the CV (uploaded or created on the website) is emailed to the addresses chosen
 *     for that vacancy (or for general applications), plus a branded confirmation to the candidate.
 *
 * Install (once) — see README.md in this folder:
 *   script.google.com → New project → paste this file → run "setup" once (allow access) →
 *   Deploy → New deployment → Web app, Execute as "Me", Who has access "Anyone" → copy the URL →
 *   put it in lib/content.ts (company.apiEndpoint) and rebuild the website.
 *   Then open the sheet (link in the "setup" log), tab "Admins", and type the 4 usernames + passwords.
 */

var CONFIG = {
  // Addresses the admin can choose from (per vacancy and for general applications).
  recipients: [
    "info@turkishmanpower.com",
    "ali@turkishmanpower.com",
    "cv@turkishmanpower.com",
    "umut@turkishmanpower.com",
    "merc_ltd@hotmail.com",
  ],
  senderName: "Merç Global",
  replyTo: "info@turkishmanpower.com",
  logo: "https://www.mercglobal.com.tr/img/mark-red.png",
  site: "https://www.mercglobal.com.tr/",
  whatsapp: "905313424801",
  phone: "+90 312 230 31 82",
  timezone: "Europe/Istanbul",
  maxFileMb: 8,
  sessionHours: 12,
  // Super admins can add, rename and delete admin users and reset their passwords from the admin page.
  superAdmins: ["yahia_yahia"],
  sheetName: "Merç Global — Website",
};

var JOB_COLS = ["id", "title", "country", "city", "sector", "type", "positions", "salary", "description", "requirements", "deadline", "posted", "language", "active", "recipients"];

// ───────────────────────── entry points ─────────────────────────
function doGet(e) {
  try {
    var action = (e && e.parameter && e.parameter.action) || "";
    if (action === "jobs") return json({ ok: true, updated: today(), jobs: readJobs().filter(function (j) { return j.active; }).map(publicJob) });
    return json({ ok: true, service: "Merç Global website backend" });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doPost(e) {
  try {
    var d = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    var action = d.action || "apply";
    if (action === "apply") return json(apply(d));
    if (action === "login") return json(login(d.username, d.password));

    // everything below needs a valid admin session
    var user = checkToken(d.token);
    if (!user) return json({ ok: false, error: "auth" });
    if (action === "admin_get") return json(adminData(user));
    if (action === "admin_save_job") return json(withLock(function () { return saveJob(d.job); }));
    if (action === "admin_delete_job") return json(withLock(function () { return deleteJob(d.id); }));
    if (action === "admin_save_settings") return json(withLock(function () { return saveSettings(d.generalRecipients); }));
    if (action === "admin_change_password") return json(withLock(function () { return changePassword(user, d.oldPassword, d.newPassword); }));
    if (action === "admin_users" || action === "admin_save_user" || action === "admin_delete_user") {
      if (!isSuper(user)) return json({ ok: false, error: "forbidden" });
      if (action === "admin_users") return json({ ok: true, users: listUsers() });
      if (action === "admin_save_user") return json(withLock(function () { return saveUser(d.oldUsername, d.username, d.password, d.note); }));
      return json(withLock(function () { return deleteUser(d.username, user); }));
    }
    return json({ ok: false, error: "unknown action" });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/** Run once from the editor: creates the Google Sheet with its tabs and prints its link. */
function setup() {
  var ss = book();
  Logger.log("Sheet ready: " + ss.getUrl());
  Logger.log("Now open the sheet, tab 'Admins', and type the usernames and passwords (column A and B).");
}

// ───────────────────────── Google Sheet storage ─────────────────────────
function book() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty("SHEET_ID");
  var ss = null;
  if (id) {
    try { ss = SpreadsheetApp.openById(id); } catch (err) { ss = null; }
  }
  if (!ss) {
    ss = SpreadsheetApp.create(CONFIG.sheetName);
    props.setProperty("SHEET_ID", ss.getId());
  }
  ensureTab(ss, "Jobs", JOB_COLS);
  ensureTab(ss, "Settings", ["key", "value"], function (sh) {
    sh.appendRow(["generalRecipients", CONFIG.recipients.join(",")]);
  });
  ensureTab(ss, "Admins", ["Username", "Password (type it here; it is encrypted after the first login)", "Name / note"], function (sh) {
    sh.setColumnWidth(1, 160);
    sh.setColumnWidth(2, 380);
    sh.setColumnWidth(3, 220);
  });
  ensureTab(ss, "Applications", ["Date", "Reference", "Position", "Name", "Email", "Phone", "Country", "Sent to", "CV"]);
  var first = ss.getSheetByName("Sheet1") || ss.getSheetByName("Sayfa1");
  if (first && ss.getSheets().length > 1) ss.deleteSheet(first);
  return ss;
}

function ensureTab(ss, name, headers, init) {
  var sh = ss.getSheetByName(name);
  if (sh) return sh;
  sh = ss.insertSheet(name);
  sh.getRange("A:Z").setNumberFormat("@"); // keep dates / numbers exactly as typed
  sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground("#0b1a2e").setFontColor("#ffffff");
  sh.setFrozenRows(1);
  if (init) init(sh);
  return sh;
}

function cell(v) {
  if (v instanceof Date) return Utilities.formatDate(v, CONFIG.timezone, "yyyy-MM-dd");
  return v == null ? "" : String(v);
}

function readJobs() {
  var sh = book().getSheetByName("Jobs");
  var rows = sh.getDataRange().getValues();
  var out = [];
  for (var r = 1; r < rows.length; r++) {
    if (!rows[r][0]) continue;
    var j = {};
    JOB_COLS.forEach(function (k, c) { j[k] = cell(rows[r][c]); });
    j.active = j.active === "true" || j.active === "TRUE" || j.active === "1";
    j.recipients = cleanRecipients(j.recipients ? j.recipients.split(",") : []);
    out.push(j);
  }
  return out;
}

function publicJob(j) {
  var p = {};
  JOB_COLS.forEach(function (k) { if (k !== "recipients") p[k] = j[k]; });
  return p;
}

function saveJob(job) {
  if (!job || !job.id || !job.title) return { ok: false, error: "missing" };
  var sh = book().getSheetByName("Jobs");
  var rows = sh.getDataRange().getValues();
  var values = JOB_COLS.map(function (k) {
    if (k === "active") return job.active ? "true" : "false";
    if (k === "recipients") return cleanRecipients(job.recipients || []).join(",");
    return job[k] == null ? "" : String(job[k]);
  });
  for (var r = 1; r < rows.length; r++) {
    if (String(rows[r][0]) === String(job.id)) {
      sh.getRange(r + 1, 1, 1, JOB_COLS.length).setValues([values]);
      return { ok: true };
    }
  }
  sh.appendRow(values);
  return { ok: true };
}

function deleteJob(id) {
  var sh = book().getSheetByName("Jobs");
  var rows = sh.getDataRange().getValues();
  for (var r = rows.length - 1; r >= 1; r--) if (String(rows[r][0]) === String(id)) sh.deleteRow(r + 1);
  return { ok: true };
}

function getSetting(key) {
  var rows = book().getSheetByName("Settings").getDataRange().getValues();
  for (var r = 1; r < rows.length; r++) if (rows[r][0] === key) return cell(rows[r][1]);
  return "";
}

function setSetting(key, value) {
  var sh = book().getSheetByName("Settings");
  var rows = sh.getDataRange().getValues();
  for (var r = 1; r < rows.length; r++) {
    if (rows[r][0] === key) {
      sh.getRange(r + 1, 2).setValue(value);
      return;
    }
  }
  sh.appendRow([key, value]);
}

function generalRecipients() {
  var list = cleanRecipients(getSetting("generalRecipients").split(","));
  return list.length ? list : CONFIG.recipients.slice();
}

function saveSettings(list) {
  var clean = cleanRecipients(list || []);
  if (!clean.length) return { ok: false, error: "Choose at least one address." };
  setSetting("generalRecipients", clean.join(","));
  return { ok: true };
}

// only addresses from CONFIG.recipients are ever used
function cleanRecipients(list) {
  var allowed = CONFIG.recipients.map(function (x) { return x.toLowerCase(); });
  var seen = {};
  return list
    .map(function (x) { return String(x).trim().toLowerCase(); })
    .filter(function (x) { return x && allowed.indexOf(x) > -1 && !seen[x] && (seen[x] = true); });
}

function adminData(user) {
  return { ok: true, user: user, isSuper: isSuper(user), jobs: readJobs(), generalRecipients: generalRecipients(), options: CONFIG.recipients, sheetUrl: book().getUrl() };
}

function withLock(fn) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try { return fn(); } finally { lock.releaseLock(); }
}

// ───────────────────────── admin login ─────────────────────────
function secret() {
  var props = PropertiesService.getScriptProperties();
  var s = props.getProperty("TOKEN_SECRET");
  if (!s) {
    s = Utilities.getUuid() + Utilities.getUuid();
    props.setProperty("TOKEN_SECRET", s);
  }
  return s;
}
function hex(bytes) {
  return bytes.map(function (b) { return ("0" + (b & 0xff).toString(16)).slice(-2); }).join("");
}
function hashPw(salt, pw) {
  return hex(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, salt + "|" + pw, Utilities.Charset.UTF_8));
}
function sign(payload) {
  return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(payload, secret()));
}

function login(username, password) {
  username = String(username || "").trim().toLowerCase();
  password = String(password || "");
  if (!username || !password) return { ok: false, error: "missing" };
  var cache = CacheService.getScriptCache();
  var failKey = "fail:" + username;
  var fails = Number(cache.get(failKey) || 0);
  if (fails >= 8) return { ok: false, error: "locked" };

  var sh = book().getSheetByName("Admins");
  var rows = sh.getDataRange().getValues();
  for (var r = 1; r < rows.length; r++) {
    if (String(rows[r][0]).trim().toLowerCase() !== username) continue;
    var stored = String(rows[r][1] || "");
    var good = false;
    if (stored.indexOf("sha256$") === 0) {
      var parts = stored.split("$");
      good = hashPw(parts[1], password) === parts[2];
    } else if (stored && stored === password) {
      good = true;
      var salt = Utilities.getUuid();
      sh.getRange(r + 1, 2).setValue("sha256$" + salt + "$" + hashPw(salt, password)); // encrypt the typed password
    }
    if (good) {
      cache.remove(failKey);
      var payload = username + "|" + (Date.now() + CONFIG.sessionHours * 3600 * 1000);
      return { ok: true, user: username, token: Utilities.base64EncodeWebSafe(payload) + "." + sign(payload) };
    }
    break;
  }
  cache.put(failKey, String(fails + 1), 900);
  return { ok: false, error: "wrong" };
}

function checkToken(token) {
  if (!token || String(token).indexOf(".") < 0) return null;
  var p = String(token).split(".");
  var payload = Utilities.newBlob(Utilities.base64DecodeWebSafe(p[0])).getDataAsString();
  if (sign(payload) !== p[1]) return null;
  var parts = payload.split("|");
  if (Number(parts[1]) < Date.now()) return null;
  return parts[0];
}

function changePassword(user, oldPw, newPw) {
  if (!newPw || String(newPw).length < 8) return { ok: false, error: "The new password must have at least 8 characters." };
  if (!login(user, oldPw).ok) return { ok: false, error: "The current password is not correct." };
  var sh = book().getSheetByName("Admins");
  var rows = sh.getDataRange().getValues();
  for (var r = 1; r < rows.length; r++) {
    if (String(rows[r][0]).trim().toLowerCase() === user) {
      var salt = Utilities.getUuid();
      sh.getRange(r + 1, 2).setValue("sha256$" + salt + "$" + hashPw(salt, String(newPw)));
      return { ok: true };
    }
  }
  return { ok: false, error: "user" };
}

// ───────────────────────── admin users (super admins only) ─────────────────────────
function isSuper(user) {
  return CONFIG.superAdmins.indexOf(String(user).toLowerCase()) > -1;
}
function listUsers() {
  var rows = book().getSheetByName("Admins").getDataRange().getValues();
  var out = [];
  for (var r = 1; r < rows.length; r++) {
    var u = String(rows[r][0]).trim();
    if (u) out.push({ username: u, note: cell(rows[r][2]), super: isSuper(u.toLowerCase()) });
  }
  return out;
}
// create a user, rename one (oldUsername) and/or set a new password
function saveUser(oldUsername, username, password, note) {
  username = String(username || "").trim().toLowerCase();
  oldUsername = String(oldUsername || "").trim().toLowerCase();
  if (!/^[a-z0-9._-]{3,30}$/.test(username)) return { ok: false, error: "Username: 3–30 letters, numbers, dot, dash or underscore." };
  if (password && String(password).length < 8) return { ok: false, error: "The password must have at least 8 characters." };
  var sh = book().getSheetByName("Admins");
  var rows = sh.getDataRange().getValues();
  var row = -1;
  for (var r = 1; r < rows.length; r++) {
    var u = String(rows[r][0]).trim().toLowerCase();
    if (u === username && u !== oldUsername) return { ok: false, error: "This username already exists." };
    if (oldUsername && u === oldUsername) row = r + 1;
  }
  if (row < 0) {
    if (!password) return { ok: false, error: "A password is required for a new user." };
    sh.appendRow([username, "", note || ""]);
    row = sh.getLastRow();
  }
  sh.getRange(row, 1).setValue(username);
  if (note != null) sh.getRange(row, 3).setValue(note);
  if (password) {
    var salt = Utilities.getUuid();
    sh.getRange(row, 2).setValue("sha256$" + salt + "$" + hashPw(salt, String(password)));
  }
  return { ok: true };
}
function deleteUser(username, me) {
  username = String(username || "").trim().toLowerCase();
  if (username === String(me).toLowerCase()) return { ok: false, error: "You cannot delete your own account." };
  var sh = book().getSheetByName("Admins");
  var rows = sh.getDataRange().getValues();
  for (var r = rows.length - 1; r >= 1; r--) if (String(rows[r][0]).trim().toLowerCase() === username) sh.deleteRow(r + 1);
  return { ok: true };
}

// ───────────────────────── applications ─────────────────────────
function apply(d) {
  if (d.website) return { ok: true }; // honeypot field filled by bots
  if (!d.name || !d.email) return { ok: false, error: "missing" };

  // who receives it: the addresses chosen for this vacancy, otherwise the general-application list
  var to = [];
  var role = d.role || "General application";
  if (d.jobId) {
    var jobs = readJobs();
    for (var i = 0; i < jobs.length; i++) {
      if (jobs[i].id === String(d.jobId)) {
        to = jobs[i].recipients;
        role = d.role || jobs[i].title;
        break;
      }
    }
  }
  if (!to.length) to = generalRecipients();

  var ref = "MG-" + Utilities.formatDate(new Date(), CONFIG.timezone, "yyMMdd") + "-" + Math.floor(1000 + Math.random() * 9000);
  var when = Utilities.formatDate(new Date(), CONFIG.timezone, "dd.MM.yyyy HH:mm");
  var attachments = [];
  if (d.file && d.file.data) {
    var bytes = Utilities.base64Decode(d.file.data);
    if (bytes.length <= CONFIG.maxFileMb * 1024 * 1024) {
      attachments.push(Utilities.newBlob(bytes, d.file.type || "application/octet-stream", safeName(d.file.name || "CV.pdf")));
    }
  }
  d.role = role;

  GmailApp.sendEmail(to.join(","), "New application · " + role + " · " + d.name + " (" + ref + ")", teamText(d, ref, when), {
    htmlBody: teamHtml(d, ref, when),
    replyTo: d.email,
    name: String(d.name).replace(/[<>"]/g, "").slice(0, 60) + " via Merç Global Website", // shows the candidate; Reply goes to the candidate
    attachments: attachments,
  });

  try {
    var c = confirmCopy(d.lang, d.name, role, ref);
    GmailApp.sendEmail(d.email, c.subject, c.text, { htmlBody: confirmHtml(c, d.lang), name: CONFIG.senderName, replyTo: CONFIG.replyTo });
  } catch (err) {}

  try {
    book().getSheetByName("Applications").appendRow([when, ref, role, d.name, d.email, d.phone || "", d.country || "", to.join(", "), d.cv ? "Created on the website" : d.file ? d.file.name : "—"]);
  } catch (err) {}

  return { ok: true, ref: ref };
}

// ───────────────────────── helpers ─────────────────────────
function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
function today() {
  return Utilities.formatDate(new Date(), CONFIG.timezone, "yyyy-MM-dd");
}
function h(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function nl(s) {
  return h(s).replace(/\n/g, "<br>");
}
function safeName(n) {
  return String(n).replace(/[^\w.\- ()]/g, "_").slice(0, 120);
}
function digits(s) {
  return String(s || "").replace(/[^\d]/g, "");
}

// ───────────────────────── team email ─────────────────────────
function teamHtml(d, ref, when) {
  var role = d.role || "General application";
  var source = d.cv ? "CV created on the website" : d.file ? "CV uploaded by the candidate" : "No CV attached";
  var rows = [
    ["Full name", d.name],
    ["Email", '<a href="mailto:' + h(d.email) + '" style="color:#e3141e;text-decoration:none">' + h(d.email) + "</a>", true],
    ["Phone / WhatsApp", d.phone],
    ["Country of residence", d.country],
    ["Nationality", d.nationality],
    ["Website language", d.lang ? String(d.lang).toUpperCase() : ""],
    ["CV", source + (d.file ? " · " + h(d.file.name) : ""), true],
  ];
  var details = rows
    .filter(function (r) { return r[1]; })
    .map(function (r) {
      return '<tr><td style="padding:9px 0;color:#6b7a8f;width:170px;vertical-align:top;font-size:13px">' + r[0] + '</td><td style="padding:9px 0;font-weight:600;color:#0b1a2e;font-size:14px">' + (r[2] ? r[1] : h(r[1])) + "</td></tr>";
    })
    .join("");
  var wa = digits(d.phone);
  var buttons =
    btn("mailto:" + h(d.email) + "?subject=" + encodeURIComponent("Your application · " + role + " (" + ref + ")"), "Reply by email", "#e3141e") +
    (wa ? btn("https://wa.me/" + wa, "WhatsApp", "#25d366") + btn("tel:+" + wa, "Call", "#0b1a2e") : "");

  return (
    '<!doctype html><html><body style="margin:0;background:#eef2f7;font-family:Segoe UI,Arial,Helvetica,sans-serif;color:#1b2533">' +
    '<div style="max-width:680px;margin:0 auto;padding:24px 14px">' +
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0b1a2e;border-radius:14px 14px 0 0;border-bottom:4px solid #e3141e"><tr>' +
    '<td style="padding:22px 26px"><img src="' + CONFIG.logo + '" width="44" height="32" alt="Merç Global" style="vertical-align:middle;background:#fff;border-radius:8px;padding:4px"> ' +
    '<span style="color:#fff;font-weight:800;font-size:17px;vertical-align:middle;margin-left:8px;white-space:nowrap">MERÇ GLOBAL</span></td>' +
    '<td style="padding:22px 26px;text-align:right;color:#ff8a90;font-size:11px;letter-spacing:3px;font-weight:700">NEW JOB APPLICATION</td></tr></table>' +
    '<div style="background:#fff;padding:28px 26px 8px">' +
    '<p style="margin:0;color:#e3141e;font-size:11px;letter-spacing:2px;font-weight:700">POSITION</p>' +
    '<h1 style="margin:6px 0 4px;font-size:24px;line-height:1.25;color:#0b1a2e">' + h(role) + "</h1>" +
    '<p style="margin:0;color:#6b7a8f;font-size:13px">Reference <b style="color:#0b1a2e">' + ref + "</b> · " + when + " (Türkiye)</p>" +
    '<div style="margin:20px 0 6px">' + buttons + "</div></div>" +
    '<div style="background:#fff;padding:8px 26px 18px">' + section("Candidate") + '<table role="presentation" width="100%" style="border-collapse:collapse">' + details + "</table>" +
    (d.message ? section("Message from the candidate") + '<div style="background:#f6f8fb;border-left:4px solid #e3141e;border-radius:8px;padding:14px 16px;font-size:14px;line-height:1.6">' + nl(d.message) + "</div>" : "") +
    (d.cv ? cvSummary(d.cv) : "") +
    (d.file ? '<div style="margin-top:22px;background:#fdf2f2;border:1px dashed #e3141e;border-radius:10px;padding:14px 16px;font-size:13px">📎 <b>' + h(d.file.name) + "</b> is attached to this email.</div>" : "") +
    "</div>" +
    '<div style="background:#0b1a2e;color:#9aabc0;border-radius:0 0 14px 14px;padding:16px 26px;font-size:12px;line-height:1.6">' +
    "Sent from the Merç Global website · " + (d.page ? h(d.page) : CONFIG.site) + "<br>Reply to this email to answer the candidate directly.</div>" +
    "</div></body></html>"
  );
}
function btn(href, label, color) {
  return '<a href="' + href + '" style="display:inline-block;background:' + color + ';color:#fff;text-decoration:none;font-weight:700;font-size:13px;padding:10px 16px;border-radius:999px;margin:0 6px 8px 0">' + label + "</a>";
}
function section(t) {
  return '<p style="margin:22px 0 8px;padding-bottom:6px;border-bottom:1px solid #e4e9f0;color:#e3141e;font-size:11px;letter-spacing:2px;font-weight:700">' + h(t).toUpperCase() + "</p>";
}
function cvSummary(cv) {
  var out = section("CV summary (created on the website)");
  if (cv.summary) out += '<p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#3b4a5e">' + nl(cv.summary) + "</p>";
  var exp = (cv.experience || []).filter(function (e) { return e.role || e.company; });
  if (exp.length) {
    out += '<p style="margin:14px 0 6px;font-weight:700;color:#0b1a2e;font-size:14px">Work experience</p>';
    exp.forEach(function (e) {
      out +=
        '<div style="padding:10px 12px;margin-bottom:8px;background:#f6f8fb;border-radius:8px;font-size:13px"><b style="color:#0b1a2e">' + h(e.role) + "</b>" +
        (e.period ? '<span style="float:right;color:#6b7a8f">' + h(e.period) + "</span>" : "") +
        '<br><span style="color:#6b7a8f">' + h([e.company, e.place].filter(Boolean).join(" · ")) + "</span>" +
        (e.duties ? '<div style="margin-top:6px;color:#3b4a5e">' + nl(e.duties) + "</div>" : "") + "</div>";
    });
  }
  var lines = [
    ["Education", (cv.education || []).filter(function (x) { return x.school; }).map(function (x) { return h(x.school) + (x.degree ? " — " + h(x.degree) : "") + (x.period ? " (" + h(x.period) + ")" : ""); }).join("<br>")],
    ["Languages", (cv.languages || []).filter(function (x) { return x.name; }).map(function (x) { return h(x.name) + (x.level ? " — " + h(x.level) : ""); }).join(", ")],
    ["Certificates", (cv.certificates || []).filter(function (x) { return x.name; }).map(function (x) { return h(x.name) + (x.year ? " (" + h(x.year) + ")" : ""); }).join("<br>")],
    ["Skills", h(cv.skills || "")],
    ["Date of birth", h(cv.birth || "")],
    ["Driving licence", h(cv.licence || "")],
  ].filter(function (r) { return r[1]; });
  if (lines.length) {
    out += '<table role="presentation" width="100%" style="border-collapse:collapse;margin-top:6px">' + lines.map(function (r) {
      return '<tr><td style="padding:8px 0;color:#6b7a8f;width:170px;vertical-align:top;font-size:13px">' + r[0] + '</td><td style="padding:8px 0;font-size:13px;color:#0b1a2e">' + r[1] + "</td></tr>";
    }).join("") + "</table>";
  }
  return out;
}
function teamText(d, ref, when) {
  return [
    "NEW JOB APPLICATION — " + (d.role || "General application"),
    "Reference: " + ref + " · " + when,
    "",
    "Name: " + d.name,
    "Email: " + d.email,
    "Phone: " + (d.phone || "-"),
    "Country: " + (d.country || "-"),
    "Nationality: " + (d.nationality || "-"),
    "",
    "Message:",
    d.message || "-",
    "",
    d.cvText ? "CV:\n" + d.cvText : "",
  ].join("\n");
}

// ───────────────────────── candidate confirmation ─────────────────────────
function confirmCopy(lang, name, role, ref) {
  var T = {
    en: ["Thank you for your application", "Dear {name},", "Thank you for reaching out to Merç Global. We have received your application for the position: {role}.", "Our recruitment team will carefully review your CV and contact you if your profile matches this or a future opening. Please keep your reference number:", "Job seekers are never charged any fee, under any name.", "Best regards,\nMerç Global Recruitment Team"],
    tr: ["Başvurunuz için teşekkür ederiz", "Sayın {name},", "Merç Global'e ulaştığınız için teşekkür ederiz. Şu pozisyon için yaptığınız başvuruyu aldık: {role}.", "İşe alım ekibimiz CV'nizi dikkatle inceleyecek ve profiliniz bu veya ileride açılacak bir pozisyona uygun olduğunda sizinle iletişime geçecektir. Referans numaranızı saklayınız:", "İş arayanlardan hiçbir ad altında ücret alınmaz.", "Saygılarımızla,\nMerç Global İşe Alım Ekibi"],
    ar: ["شكراً لتقديم طلبك", "عزيزي/عزيزتي {name}،", "شكراً لتواصلك مع Merç Global. لقد استلمنا طلبك لوظيفة: {role}.", "سيراجع فريق التوظيف سيرتك الذاتية بعناية وسيتواصل معك إذا كان ملفك مناسباً لهذه الوظيفة أو لوظيفة مستقبلية. يرجى الاحتفاظ برقمك المرجعي:", "لا يُتقاضى من الباحثين عن عمل أي رسوم تحت أي مسمى.", "مع أطيب التحيات،\nفريق التوظيف في Merç Global"],
    fr: ["Merci pour votre candidature", "Bonjour {name},", "Merci d'avoir contacté Merç Global. Nous avons bien reçu votre candidature pour le poste : {role}.", "Notre équipe de recrutement étudiera attentivement votre CV et vous contactera si votre profil correspond à ce poste ou à une future offre. Conservez votre numéro de référence :", "Aucuns frais ne sont jamais demandés aux candidats.", "Cordialement,\nL'équipe recrutement Merç Global"],
    ru: ["Спасибо за вашу заявку", "Здравствуйте, {name}!", "Спасибо, что обратились в Merç Global. Мы получили вашу заявку на должность: {role}.", "Наша команда внимательно рассмотрит ваше резюме и свяжется с вами, если ваш профиль подойдёт для этой или будущей вакансии. Сохраните номер заявки:", "С соискателей никогда не взимается никакая плата.", "С уважением,\nКоманда подбора Merç Global"],
    de: ["Vielen Dank für Ihre Bewerbung", "Guten Tag {name},", "vielen Dank für Ihre Kontaktaufnahme mit Merç Global. Wir haben Ihre Bewerbung für folgende Position erhalten: {role}.", "Unser Recruiting-Team prüft Ihren Lebenslauf sorgfältig und meldet sich, wenn Ihr Profil zu dieser oder einer künftigen Stelle passt. Bitte bewahren Sie Ihre Referenznummer auf:", "Von Bewerbern wird niemals eine Gebühr verlangt.", "Mit freundlichen Grüßen\nIhr Merç Global Recruiting-Team"],
    es: ["Gracias por su solicitud", "Estimado/a {name}:", "Gracias por contactar con Merç Global. Hemos recibido su solicitud para el puesto: {role}.", "Nuestro equipo de selección revisará su CV con atención y le contactará si su perfil encaja con este u otro puesto futuro. Conserve su número de referencia:", "Nunca se cobra ninguna tarifa a los candidatos.", "Saludos cordiales,\nEquipo de selección de Merç Global"],
    zh: ["感谢您的申请", "{name}，您好：", "感谢您联系 Merç Global。我们已收到您对以下职位的申请：{role}。", "我们的招聘团队将认真审核您的简历，如果您的资历符合该职位或今后的职位，我们会与您联系。请保存您的申请编号：", "我们绝不以任何名义向求职者收费。", "此致\nMerç Global 招聘团队"],
    it: ["Grazie per la tua candidatura", "Gentile {name},", "grazie per aver contattato Merç Global. Abbiamo ricevuto la tua candidatura per la posizione: {role}.", "Il nostro team di selezione esaminerà con attenzione il tuo CV e ti contatterà se il tuo profilo è adatto a questa o a una futura posizione. Conserva il tuo numero di riferimento:", "A chi cerca lavoro non viene mai richiesto alcun pagamento.", "Cordiali saluti,\nIl team di selezione Merç Global"],
  };
  var t = T[lang] || T.en;
  var f = function (s) { return s.replace("{name}", name).replace("{role}", role); };
  return { subject: t[0] + " · " + ref, title: t[0], hello: f(t[1]), p1: f(t[2]), p2: t[3], ref: ref, free: t[4], bye: t[5], text: [f(t[1]), "", f(t[2]), t[3] + " " + ref, "", t[4], "", t[5]].join("\n") };
}
function confirmHtml(c, lang) {
  var rtl = lang === "ar";
  return (
    '<!doctype html><html><body style="margin:0;background:#eef2f7;font-family:Segoe UI,Arial,Helvetica,sans-serif;color:#1b2533">' +
    '<div style="max-width:560px;margin:0 auto;padding:24px 14px" dir="' + (rtl ? "rtl" : "ltr") + '">' +
    '<div style="background:#0b1a2e;border-radius:14px 14px 0 0;border-bottom:4px solid #e3141e;padding:20px 24px"><img src="' + CONFIG.logo + '" width="40" height="29" alt="" style="vertical-align:middle;background:#fff;border-radius:8px;padding:4px"> <span style="color:#fff;font-weight:800;font-size:16px;vertical-align:middle;margin:0 8px;white-space:nowrap">MERÇ GLOBAL</span></div>' +
    '<div style="background:#fff;padding:28px 24px;line-height:1.7;font-size:15px">' +
    '<h2 style="margin:0 0 14px;color:#0b1a2e;font-size:20px">✓ ' + h(c.title) + "</h2>" +
    "<p style=\"margin:0 0 10px\">" + h(c.hello) + "</p><p style=\"margin:0 0 10px\">" + h(c.p1) + "</p><p style=\"margin:0 0 6px\">" + h(c.p2) + "</p>" +
    '<p style="margin:0 0 18px"><span style="display:inline-block;background:#fdf2f2;color:#e3141e;font-weight:800;padding:8px 14px;border-radius:8px;letter-spacing:1px">' + c.ref + "</span></p>" +
    '<p style="margin:0 0 18px;color:#6b7a8f;font-size:13px">' + h(c.free) + "</p>" +
    '<p style="margin:0 0 22px;white-space:pre-line">' + h(c.bye) + "</p>" +
    '<a href="' + CONFIG.site + '" style="display:inline-block;background:#e3141e;color:#fff;text-decoration:none;font-weight:700;font-size:13px;padding:10px 18px;border-radius:999px">www.mercglobal.com.tr</a></div>' +
    '<div style="background:#0b1a2e;color:#9aabc0;border-radius:0 0 14px 14px;padding:14px 24px;font-size:12px">' + CONFIG.phone + " · WhatsApp +90 531 342 48 01 · " + CONFIG.replyTo + "</div>" +
    "</div></body></html>"
  );
}
