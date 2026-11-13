/**
 * Merç Global — job application mailer (Google Apps Script)
 * ----------------------------------------------------------
 * Receives applications from the website (CV uploaded or created on the site) and sends:
 *   1. a branded email to the team (info@ + copies) with the CV attached and a summary;
 *   2. a branded confirmation email to the candidate, in their language.
 * Runs on the company's own Google Workspace account (info@mercglobal.com.tr), free of charge.
 *
 * Install (once): script.google.com → New project → paste this file → Deploy → New deployment →
 * type "Web app", Execute as "Me", Who has access "Anyone" → Deploy → authorise → copy the web-app URL
 * and put it in lib/content.ts (company.applyEndpoint) on the website.
 */

var CONFIG = {
  to: "info@mercglobal.com.tr",
  cc: "ali.merc@mercglobal.com.tr,merc_ltd@hotmail.com,cv@turkishmanpower.com",
  senderName: "Merç Global — Website",
  logo: "https://yahi264.github.io/mercglobal/img/mark-red.png",
  site: "https://yahi264.github.io/mercglobal/",
  whatsapp: "905313424801",
  phone: "+90 312 230 31 82",
  timezone: "Europe/Istanbul",
  maxFileMb: 8,
};

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents || "{}");
    if (d.website) return json({ ok: true }); // honeypot field filled by bots
    if (!d.name || !d.email) return json({ ok: false, error: "missing" });

    var ref = "MG-" + Utilities.formatDate(new Date(), CONFIG.timezone, "yyMMdd") + "-" + Math.floor(1000 + Math.random() * 9000);
    var when = Utilities.formatDate(new Date(), CONFIG.timezone, "dd.MM.yyyy HH:mm");
    var attachments = [];
    if (d.file && d.file.data) {
      var bytes = Utilities.base64Decode(d.file.data);
      if (bytes.length <= CONFIG.maxFileMb * 1024 * 1024) {
        attachments.push(Utilities.newBlob(bytes, d.file.type || "application/octet-stream", safeName(d.file.name || "CV.pdf")));
      }
    }

    var role = d.role || "General application";
    GmailApp.sendEmail(CONFIG.to, "New application · " + role + " · " + d.name + " (" + ref + ")", teamText(d, ref, when), {
      htmlBody: teamHtml(d, ref, when),
      cc: CONFIG.cc,
      replyTo: d.email,
      name: CONFIG.senderName,
      attachments: attachments,
    });

    try {
      var c = confirmCopy(d.lang, d.name, role, ref);
      GmailApp.sendEmail(d.email, c.subject, c.text, { htmlBody: confirmHtml(c, d.lang), name: "Merç Global", replyTo: CONFIG.to });
    } catch (err) {}

    return json({ ok: true, ref: ref });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json({ ok: true, service: "Merç Global application mailer" });
}

// ───────────────────────── helpers ─────────────────────────
function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
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
    // header
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0b1a2e;border-radius:14px 14px 0 0;border-bottom:4px solid #e3141e"><tr>' +
    '<td style="padding:22px 26px"><img src="' + CONFIG.logo + '" width="44" height="32" alt="Merç Global" style="vertical-align:middle;background:#fff;border-radius:8px;padding:4px"> ' +
    '<span style="color:#fff;font-weight:800;font-size:17px;vertical-align:middle;margin-left:8px;white-space:nowrap">MERÇ GLOBAL</span></td>' +
    '<td style="padding:22px 26px;text-align:right;color:#ff8a90;font-size:11px;letter-spacing:3px;font-weight:700">NEW JOB APPLICATION</td></tr></table>' +
    // role card
    '<div style="background:#fff;padding:28px 26px 8px">' +
    '<p style="margin:0;color:#e3141e;font-size:11px;letter-spacing:2px;font-weight:700">POSITION</p>' +
    '<h1 style="margin:6px 0 4px;font-size:24px;line-height:1.25;color:#0b1a2e">' + h(role) + "</h1>" +
    '<p style="margin:0;color:#6b7a8f;font-size:13px">Reference <b style="color:#0b1a2e">' + ref + "</b> · " + when + " (Türkiye)</p>" +
    '<div style="margin:20px 0 6px">' + buttons + "</div></div>" +
    // candidate
    '<div style="background:#fff;padding:8px 26px 18px">' + section("Candidate") + '<table role="presentation" width="100%" style="border-collapse:collapse">' + details + "</table>" +
    (d.message ? section("Message from the candidate") + '<div style="background:#f6f8fb;border-left:4px solid #e3141e;border-radius:8px;padding:14px 16px;font-size:14px;line-height:1.6">' + nl(d.message) + "</div>" : "") +
    (d.cv ? cvSummary(d.cv) : "") +
    (d.file ? '<div style="margin-top:22px;background:#fdf2f2;border:1px dashed #e3141e;border-radius:10px;padding:14px 16px;font-size:13px">📎 <b>' + h(d.file.name) + "</b> is attached to this email.</div>" : "") +
    "</div>" +
    // footer
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
    ["Education", (cv.education || []).filter(function (x) { return x.school; }).map(function (x) { return x.school + (x.degree ? " — " + x.degree : "") + (x.period ? " (" + x.period + ")" : ""); }).join("<br>")],
    ["Languages", (cv.languages || []).filter(function (x) { return x.name; }).map(function (x) { return x.name + (x.level ? " — " + x.level : ""); }).join(", ")],
    ["Certificates", (cv.certificates || []).filter(function (x) { return x.name; }).map(function (x) { return x.name + (x.year ? " (" + x.year + ")" : ""); }).join("<br>")],
    ["Skills", cv.skills || ""],
    ["Date of birth", cv.birth || ""],
    ["Driving licence", cv.licence || ""],
  ].filter(function (r) { return r[1]; });
  if (lines.length) {
    out += '<table role="presentation" width="100%" style="border-collapse:collapse;margin-top:6px">' + lines.map(function (r) {
      return '<tr><td style="padding:8px 0;color:#6b7a8f;width:170px;vertical-align:top;font-size:13px">' + r[0] + '</td><td style="padding:8px 0;font-size:13px;color:#0b1a2e">' + (r[0] === "Skills" ? h(r[1]) : r[1].replace(/<br>/g, "§").replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }).replace(/§/g, "<br>")) + "</td></tr>";
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
    en: ["Your application has been received", "Dear {name},", "Thank you for applying to Merç Global for the position: {role}.", "Our team will review your CV and contact you if your profile matches. Please keep your reference number:", "Job seekers are never charged any fee, under any name.", "Best regards,\nMerç Global Recruitment"],
    tr: ["Başvurunuz alındı", "Sayın {name},", "Merç Global'e şu pozisyon için başvurduğunuz için teşekkür ederiz: {role}.", "Ekibimiz CV'nizi inceleyecek ve profiliniz uygun olduğunda sizinle iletişime geçecektir. Referans numaranızı saklayınız:", "İş arayanlardan hiçbir ad altında ücret alınmaz.", "Saygılarımızla,\nMerç Global İstihdam"],
    ar: ["تم استلام طلبك", "عزيزي/عزيزتي {name}،", "شكراً لتقدمك إلى Merç Global لوظيفة: {role}.", "سيراجع فريقنا سيرتك الذاتية وسيتواصل معك إذا كان ملفك مناسباً. يرجى الاحتفاظ برقمك المرجعي:", "لا يُتقاضى من الباحثين عن عمل أي رسوم تحت أي مسمى.", "مع أطيب التحيات،\nMerç Global"],
    fr: ["Votre candidature a bien été reçue", "Bonjour {name},", "Merci d'avoir postulé chez Merç Global pour le poste : {role}.", "Notre équipe étudiera votre CV et vous contactera si votre profil correspond. Conservez votre numéro de référence :", "Aucuns frais ne sont jamais demandés aux candidats.", "Cordialement,\nMerç Global Recrutement"],
    ru: ["Ваша заявка получена", "Здравствуйте, {name}!", "Спасибо за отклик в Merç Global на должность: {role}.", "Наша команда рассмотрит ваше резюме и свяжется с вами, если ваш профиль подойдёт. Сохраните номер заявки:", "С соискателей никогда не взимается никакая плата.", "С уважением,\nMerç Global"],
    de: ["Ihre Bewerbung ist eingegangen", "Guten Tag {name},", "vielen Dank für Ihre Bewerbung bei Merç Global für die Position: {role}.", "Unser Team prüft Ihren Lebenslauf und meldet sich, wenn Ihr Profil passt. Bitte bewahren Sie Ihre Referenznummer auf:", "Von Bewerbern wird niemals eine Gebühr verlangt.", "Mit freundlichen Grüßen\nMerç Global"],
    es: ["Hemos recibido su solicitud", "Estimado/a {name}:", "Gracias por postularse en Merç Global para el puesto: {role}.", "Nuestro equipo revisará su CV y le contactará si su perfil encaja. Conserve su número de referencia:", "Nunca se cobra ninguna tarifa a los candidatos.", "Saludos cordiales,\nMerç Global"],
    zh: ["我们已收到您的申请", "{name}，您好：", "感谢您向 Merç Global 申请以下职位：{role}。", "我们的团队将审核您的简历，如资历符合会与您联系。请保存您的申请编号：", "我们绝不以任何名义向求职者收费。", "此致\nMerç Global"],
    it: ["Abbiamo ricevuto la tua candidatura", "Gentile {name},", "grazie per esserti candidato/a presso Merç Global per la posizione: {role}.", "Il nostro team esaminerà il tuo CV e ti contatterà se il tuo profilo è adatto. Conserva il tuo numero di riferimento:", "A chi cerca lavoro non viene mai richiesto alcun pagamento.", "Cordiali saluti,\nMerç Global"],
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
    '<p style="margin:0;white-space:pre-line">' + h(c.bye) + "</p></div>" +
    '<div style="background:#0b1a2e;color:#9aabc0;border-radius:0 0 14px 14px;padding:14px 24px;font-size:12px">' + CONFIG.phone + " · WhatsApp +90 531 342 48 01 · info@mercglobal.com.tr</div>" +
    "</div></body></html>"
  );
}
