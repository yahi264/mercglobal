# Italian for the assistant (keywords + phrases), logo text, and root language detection.
import re

KW = {
    "fee": ["devo pagare", "e gratis", "gratuito", "a pagamento", "costa qualcosa"],
    "permitfees": ["costo del permesso", "tariffe", "salario minimo", "criteri"],
    "cv": ["curriculum vitae"],
    "jobs": ["lavoro", "offerte", "posizioni aperte", "cerco lavoro", "lavoro all estero"],
    "apply": ["candidatura", "candidarmi", "candidarsi"],
    "request": ["abbiamo bisogno", "ci servono", "cerchiamo operai", "richiesta di personale", "manodopera"],
    "permitfees#2": ["permesso di lavoro", "visto"],
    "licence": ["licenza", "autorizzazione", "certificato"],
    "partners": ["partner attuali"],
    "references": ["referenze", "clienti"],
    "countries": ["paesi", "nazionalita", "provenienza"],
    "sectors": ["settore", "settori", "industria"],
    "services": ["servizi", "cosa fate", "cosa offrite"],
    "email": ["posta elettronica"],
    "phone": ["telefono", "chiamare", "numero di telefono"],
    "address": ["indirizzo", "dove siete", "ufficio", "sede"],
    "contact": ["contatti", "contattare", "contattarvi"],
    "about": ["chi siete", "azienda", "chi e merc"],
    "thanks": ["grazie"],
    "hello": ["ciao", "buongiorno", "salve"],
}

p = "lib/assistant.ts"
s = open(p, encoding="utf8").read()
seen = {}
def add(m):
    intent = m.group(1)
    seen[intent] = seen.get(intent, 0) + 1
    key = intent if seen[intent] == 1 else f"{intent}#{seen[intent]}"
    extra = KW.get(key, [])
    if not extra or '"' + extra[0] + '"' in m.group(0):
        return m.group(0)
    return m.group(0)[:-2] + ", " + ", ".join('"%s"' % w for w in extra) + "]]"
s = re.sub(r'\["(\w+)", \[[^\n]*?\]\]', add, s)

IT = '''  it: {
    name: "Assistente Merç Global", online: "Online · risponde subito", teaser: "Domande? Chiedimi!", greet: "Ciao! 👋 Sono l'assistente di Merç Global. Chiedimi dei nostri servizi, settori, offerte di lavoro, permessi di lavoro o come contattarci.",
    placeholder: "Scrivi la tua domanda…", send: "Invia", open: "Apri l'assistente", close: "Chiudi l'assistente",
    suggestions: ["Quali servizi offrite?", "Ci sono offerte di lavoro?", "Mi serve personale per il mio progetto", "Costi del permesso di lavoro", "Dov'è il vostro ufficio?"],
    services: "I nostri servizi:", sectors: "Forniamo personale per questi settori:", countries: "Recluti amo personale da queste aree:", contact: "Puoi contattarci qui:",
    address: "Il nostro ufficio:", jobs: "Le nostre offerte di lavoro:", jobsNone: "Al momento non ci sono posizioni aperte: crea il tuo CV e inviacelo, ti contatteremo quando si aprirà un posto adatto.",
    jobsSome: "posizioni aperte al momento.", cv: "Crea online un CV professionale (in inglese o turco) e inviacelo con un clic:", apply: "Per candidarti: apri un'offerta e premi «Candidati ora», oppure crea il tuo CV e inviacelo.",
    request: "Indicaci posizioni, numero di persone e tempistiche nel modulo di richiesta: di solito rispondiamo entro un giorno lavorativo.", fee: "A chi cerca lavoro non viene mai richiesto alcun pagamento, a nessun titolo. I nostri servizi sono gratuiti per i candidati.",
    permit: "Permessi di lavoro in Turchia (2026):", licence: "La nostra licenza:", references: "Alcune delle nostre referenze:", partners: "I nostri partner attuali:", about: "Chi è Merç Global:",
    thanks: "Prego! Posso aiutarti in altro?", hello: "Ciao! Come posso aiutarti?", fallback: "Non sono sicuro di aver capito. Il nostro team può risponderti personalmente su WhatsApp:",
    found: "Questo potrebbe esserti utile:", whatsapp: "Scrivi su WhatsApp", more: "Apri la pagina", typing: "Sta scrivendo…",
  },
'''.replace("Recluti amo", "Recluti" + "amo")
if "\n  it: {" not in s:
    i = s.rindex("\n};")
    s = s[: i + 1] + IT + s[i + 1 :]
open(p, "w", encoding="utf8").write(s)

p = "components/Logo.tsx"
s = open(p, encoding="utf8").read()
if "  it: [" not in s:
    s = s.replace('  zh: ["MERÇ GLOBAL 招聘", "培训与咨询服务有限公司"],', '  zh: ["MERÇ GLOBAL 招聘", "培训与咨询服务有限公司"],\n  it: ["MERÇ GLOBAL RECLUTAMENTO", "Servizi di Formazione e Consulenza Ltd."],')
open(p, "w", encoding="utf8").write(s)

p = "scripts/deploy-pages.mjs"
s = open(p, encoding="utf8").read()
s = s.replace('"es","zh"],p="en"', '"es","zh","it"],p="en"')
open(p, "w", encoding="utf8").write(s)
print("ok")
