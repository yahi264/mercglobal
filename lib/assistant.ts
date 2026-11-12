import type { Locale } from "./i18n";

// Website assistant: understands questions in any of the 8 languages (keyword stems below, written
// without accents) and answers from the site's own content (see components/Assistant.tsx).

export type Intent =
  | "hello" | "thanks" | "fee" | "permitfees" | "jobs" | "cv" | "apply" | "request" | "services" | "sectors" | "countries"
  | "licence" | "references" | "partners" | "about" | "contact" | "address" | "whatsapp" | "email" | "phone";

// Order matters: the first intent whose keyword appears wins.
export const KEYWORDS: [Intent, string[]][] = [
  ["fee", ["do i pay", "do i have to pay", "is it free", "free of charge", "charge me", "pay you", "para istiyor", "para aliyor", "ucret aliyor", "ucretli mi", "ucretsiz mi", "para odemem", "dois je payer", "est ce gratuit", "c est gratuit", "payant", "هل ادفع", "هل هو مجاني", "مجانا", "رسوم على", "нужно ли платить", "бесплатно", "платно", "muss ich zahlen", "kostenlos", "gebuhr", "tengo que pagar", "es gratis", "gratuito", "cobran", "要付费", "收费吗", "免费吗", "费用吗"]],
  ["permitfees", ["permit fee", "permit cost", "work permit price", "harc", "calisma izni ucret", "calisma izni fiyat", "izin ucreti", "frais de permis", "cout du permis", "رسوم تصريح", "تكلفة تصريح", "пошлин", "стоимость разрешения", "gebuhren", "kosten der arbeitserlaubnis", "tasas", "coste del permiso", "工作许可费", "许可费用", "minimum wage", "asgari ucret", "salaire minimum", "الحد الادنى للاجور", "мрот", "mindestlohn", "salario minimo", "最低工资", "criteria", "kriter", "criteres", "معايير", "критери", "kriterien", "criterios", "标准"]],
  ["cv", ["cv", "resume", "curriculum", "ozgecmis", "السيرة", "سيرة ذاتية", "резюме", "lebenslauf", "hoja de vida", "简历"]],
  ["jobs", ["job", "jobs", "looking for work", "looking for a job", "i am looking for", "vacanc", "opening", "work abroad", "position available", "hiring now", "is ilan", "ilan", "is ariyorum", "is var mi", "pozisyon", "yurt disi is", "offre", "emploi", "poste", "travail a l etranger", "وظيف", "شاغر", "عمل في الخارج", "ابحث عن عمل", "ваканси", "работа", "работу", "stelle", "arbeit", "job im ausland", "empleo", "trabajo", "vacante", "oferta", "工作", "职位", "招聘", "空缺"]],
  ["apply", ["apply", "application", "basvur", "postuler", "candidature", "تقديم", "قدم", "откликнуться", "подать", "bewerb", "postular", "solicitud", "申请"]],
  ["request", ["workers for", "welders for", "staff for", "personnel for", "manpower", "labour supply", "labor supply", "we need", "i need", "need workers", "need welders", "isciye ihtiyac", "personele ihtiyac", "ihtiyacimiz var", "ihtiyac var", "kaynakci", "usta lazim", "eleman ariyoruz", "isci ariyoruz", "personel ariyoruz", "nous avons besoin", "nous cherchons des", "نحتاج", "نبحث عن عمال", "нам нужны", "ищем рабочих", "wir brauchen", "wir suchen arbeiter", "necesitamos", "buscamos trabajadores", "我们需要", "需要人员", "need worker", "need staff", "need personnel", "hire", "recruit for", "workers for my", "personel lazim", "personel ihtiyac", "isci lazim", "eleman", "personel talep", "besoin de personnel", "recruter", "main d oeuvre pour", "احتاج عمال", "عمالة", "طلب عمالة", "توظيف عمال", "нужны рабочие", "нужен персонал", "подбор", "personal benotigt", "arbeitskrafte", "personal anfragen", "necesito trabajadores", "contratar personal", "需要工人", "招工", "用工"]],
  ["permitfees", ["work permit", "calisma izni", "oturum izni", "vize", "visa", "permis de travail", "تصريح عمل", "تأشيرة", "تاشيرة", "разрешение на работу", "виза", "arbeitserlaubnis", "permiso de trabajo", "工作许可", "签证"]],
  ["licence", ["licen", "legal", "iskur", "permit no", "certificate", "authorised", "authorized", "lisans", "belge", "yetki", "sertifika", "agre", "autoris", "certificat", "ترخيص", "رخصة", "مرخص", "شهاد", "лиценз", "сертификат", "lizenz", "zertifikat", "genehmigung", "licencia", "certificado", "许可证", "资质", "证书"]],
  ["partners", ["partner", "is ortag", "partenaire", "شريك", "شركاء", "партн", "socio", "合作伙伴"]],
  ["references", ["reference", "client", "customer", "worked with", "referans", "musteri", "musteriler", "references", "clients", "مراجع", "عملاء", "референц", "клиент", "referenz", "kunden", "referencia", "clientes", "客户", "案例"]],
  ["countries", ["countr", "where do workers come", "nationalit", "source", "ulke", "hangi ulkelerden", "pays", "nationalite", "دول", "بلد", "جنسي", "стран", "откуда", "lander", "herkunft", "paises", "nacionalidad", "国家", "来源"]],
  ["sectors", ["sector", "industr", "field", "sektor", "alan", "secteur", "domaine", "قطاع", "مجال", "отрасл", "branche", "sector", "行业", "领域"]],
  ["services", ["service", "what do you do", "what do you offer", "hizmet", "ne yapiyorsunuz", "neler yapiyorsunuz", "que faites vous", "vos services", "خدمات", "ماذا تقدم", "ماذا تفعل", "услуг", "чем вы занимаетесь", "leistung", "was machen sie", "servicio", "que hacen", "服务", "你们做什么"]],
  ["whatsapp", ["whatsapp", "whats app", "واتساب", "ватсап", "вотсап"]],
  ["email", ["email", "e mail", "mail", "e posta", "eposta", "courriel", "بريد", "ايميل", "почт", "correo", "邮件", "邮箱"]],
  ["phone", ["phone", "call", "number", "telefon", "numara", "ara", "telephone", "appeler", "numero", "هاتف", "رقم", "اتصل", "телефон", "позвонить", "nummer", "anrufen", "telefono", "llamar", "电话", "号码"]],
  ["address", ["address", "where are you", "location", "office", "map", "adres", "nerede", "ofis", "konum", "adresse", "ou etes vous", "bureau", "عنوان", "اين", "مكتب", "موقع", "адрес", "где вы", "офис", "standort", "buro", "wo sind", "direccion", "donde", "oficina", "地址", "在哪", "办公室"]],
  ["contact", ["contact", "reach", "get in touch", "iletisim", "ulas", "contacter", "joindre", "تواصل", "اتصال", "связ", "контакт", "kontakt", "contacto", "联系"]],
  ["about", ["who are you", "about", "company", "since when", "how long", "vision", "mission", "kimsiniz", "hakkinda", "sirket", "firma", "qui etes", "a propos", "entreprise", "من انتم", "عن الشركة", "الشركة", "кто вы", "о компании", "компани", "uber uns", "unternehmen", "quienes son", "empresa", "关于", "公司", "你们是谁"]],
  ["thanks", ["thank", "thx", "tesekkur", "sag ol", "merci", "شكر", "спасибо", "danke", "gracias", "谢谢", "感谢"]],
  ["hello", ["hello", "hi", "hey", "good morning", "merhaba", "selam", "iyi gunler", "bonjour", "salut", "مرحبا", "السلام", "اهلا", "привет", "здравствуйте", "hallo", "guten tag", "hola", "buenos dias", "你好", "您好"]],
];

// Normalise text so "Çalışma İzni" matches "calisma izni", Arabic letter variants match, etc.
export const norm = (s: string) =>
  " " +
  s
    .toLocaleLowerCase()
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[ً-ْـ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ß/g, "ss")
    .replace(/['’]/g, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim() +
  " ";

// Common words that say nothing about the topic (ignored when searching the site's texts).
export const STOP = new Set(
  "have does with your from what which there this that will would could should about into they them their were been being some more most very much many also only just than then when where while here need want like please thank thanks know tell give find help used make made over under each other such these those dont cant isnt arent bir icin olan gibi daha veya ile nasil neden hangi kadar mısınız misiniz varmi pour avec dans vous nous est sont votre quel quelle comment faire tout tous cette mais plus para como esta este estos tiene tienen usted ustedes desde sobre para unser ihre haben sind eine einen einem nicht oder auch mehr wird werden wie welche kann können что как для это есть ваш ваши можно какие какой هل ماذا كيف التي الذي على عن من الى في مع".split(" "),
);

// Keyword stems of one intent (used to ignore e.g. "sectors" itself when looking for a specific sector).
export const intentStems = (intent: Intent) =>
  KEYWORDS.filter(([i]) => i === intent).flatMap(([, w]) => w.map((x) => norm(x).trim()).filter(Boolean));

export function detect(q: string): Intent | null {
  const s = norm(q);
  for (const [intent, words] of KEYWORDS) {
    for (const w of words) {
      const k = norm(w).trim();
      if (!k) continue;
      // short Latin words must match whole words (e.g. "hi", "cv"); longer ones may be word starts
      if (/^[a-z]{1,3}$/.test(k) ? s.includes(` ${k} `) : s.includes(/^[a-z]/.test(k) ? ` ${k}` : k)) return intent;
    }
  }
  return null;
}

export type Phrases = {
  name: string; online: string; teaser: string; greet: string; placeholder: string; send: string; open: string; close: string;
  suggestions: string[]; services: string; sectors: string; countries: string; contact: string; address: string; jobs: string;
  jobsNone: string; jobsSome: string; cv: string; apply: string; request: string; fee: string; permit: string; licence: string;
  references: string; partners: string; about: string; thanks: string; hello: string; fallback: string; found: string; whatsapp: string;
  more: string; typing: string;
};

export const PHRASES: Record<Locale, Phrases> = {
  en: {
    name: "Merç Global Assistant", online: "Online · answers instantly", teaser: "Questions? Ask me!", greet: "Hello! 👋 I'm the Merç Global assistant. Ask me about our services, sectors, job vacancies, work permits or how to reach us.",
    placeholder: "Type your question…", send: "Send", open: "Open the assistant", close: "Close the assistant",
    suggestions: ["What services do you offer?", "Are there job vacancies?", "I need workers for my project", "Work permit fees", "Where is your office?"],
    services: "We offer these services:", sectors: "We supply staff for these sectors:", countries: "We source personnel from these regions:", contact: "You can reach us here:",
    address: "Our office:", jobs: "Here are our job vacancies:", jobsNone: "There are no open vacancies right now — create your CV and send it to us, and we'll contact you when a suitable job opens.",
    jobsSome: "open vacancies right now.", cv: "You can create a professional CV (English or Turkish) online and send it to us in one click:", apply: "To apply: open a vacancy and press “Apply now”, or create your CV and send it to us.",
    request: "Tell us the positions, numbers and timing in our personnel request form — our team usually replies within one working day.", fee: "Job seekers are never charged any fee, under any name. Our services are free for candidates.",
    permit: "Work permits in Türkiye (2026):", licence: "Our licence:", references: "Some of our references:", partners: "Our current partners:", about: "About Merç Global:",
    thanks: "You're welcome! Anything else I can help with?", hello: "Hello! How can I help you today?", fallback: "I'm not sure I understood. Our team can answer you personally on WhatsApp:",
    found: "This may help:", whatsapp: "Write on WhatsApp", more: "Open the page", typing: "Typing…",
  },
  tr: {
    name: "Merç Global Asistan", online: "Çevrimiçi · hemen yanıtlar", teaser: "Sorunuz mu var? Bana sorun!", greet: "Merhaba! 👋 Ben Merç Global asistanıyım. Hizmetlerimiz, sektörler, iş ilanları, çalışma izni veya iletişim hakkında sorabilirsiniz.",
    placeholder: "Sorunuzu yazın…", send: "Gönder", open: "Asistanı aç", close: "Asistanı kapat",
    suggestions: ["Hangi hizmetleri veriyorsunuz?", "İş ilanı var mı?", "Projem için personel lazım", "Çalışma izni harçları", "Ofisiniz nerede?"],
    services: "Sunduğumuz hizmetler:", sectors: "Personel temin ettiğimiz sektörler:", countries: "Personel temin ettiğimiz bölgeler:", contact: "Bize buradan ulaşabilirsiniz:",
    address: "Ofisimiz:", jobs: "İş ilanlarımız:", jobsNone: "Şu anda açık ilan yok — CV'nizi oluşturup bize gönderin, uygun bir iş açıldığında sizinle iletişime geçelim.",
    jobsSome: "açık ilan var.", cv: "İngilizce veya Türkçe profesyonel CV'nizi online oluşturup tek tıkla bize gönderebilirsiniz:", apply: "Başvurmak için: bir ilanı açıp “Hemen başvur”a basın ya da CV'nizi oluşturup bize gönderin.",
    request: "Personel talep formunda pozisyonları, kişi sayısını ve zamanlamayı bize iletin — ekibimiz genellikle bir iş günü içinde dönüş yapar.", fee: "İş arayanlardan hiçbir ad altında menfaat temin edilmez ve ücret alınmaz. Hizmetlerimiz adaylar için ücretsizdir.",
    permit: "Türkiye'de çalışma izni (2026):", licence: "Lisansımız:", references: "Referanslarımızdan bazıları:", partners: "Güncel iş ortaklarımız:", about: "Merç Global hakkında:",
    thanks: "Rica ederim! Başka bir konuda yardımcı olabilir miyim?", hello: "Merhaba! Size nasıl yardımcı olabilirim?", fallback: "Tam anlayamadım. Ekibimiz size WhatsApp'tan bizzat yanıt verebilir:",
    found: "Şu bilgi işinize yarayabilir:", whatsapp: "WhatsApp ile yazın", more: "Sayfayı aç", typing: "Yazıyor…",
  },
  ar: {
    name: "مساعد Merç Global", online: "متصل · يجيب فوراً", teaser: "لديك سؤال؟ اسألني!", greet: "مرحباً! 👋 أنا مساعد Merç Global. اسألني عن خدماتنا والقطاعات والوظائف الشاغرة وتصاريح العمل أو كيفية التواصل معنا.",
    placeholder: "اكتب سؤالك…", send: "إرسال", open: "فتح المساعد", close: "إغلاق المساعد",
    suggestions: ["ما الخدمات التي تقدمونها؟", "هل توجد وظائف شاغرة؟", "أحتاج عمالة لمشروعي", "رسوم تصريح العمل", "أين مكتبكم؟"],
    services: "نقدّم الخدمات التالية:", sectors: "نوفّر العمالة لهذه القطاعات:", countries: "نوفّر العمالة من هذه المناطق:", contact: "يمكنك التواصل معنا عبر:",
    address: "مكتبنا:", jobs: "الوظائف الشاغرة لدينا:", jobsNone: "لا توجد وظائف شاغرة حالياً — أنشئ سيرتك الذاتية وأرسلها إلينا وسنتواصل معك عند توفر وظيفة مناسبة.",
    jobsSome: "وظيفة شاغرة حالياً.", cv: "يمكنك إنشاء سيرة ذاتية احترافية (بالإنجليزية أو التركية) عبر الإنترنت وإرسالها إلينا بنقرة واحدة:", apply: "للتقديم: افتح الوظيفة واضغط «قدّم الآن»، أو أنشئ سيرتك الذاتية وأرسلها إلينا.",
    request: "أرسل لنا الوظائف والأعداد والتوقيت عبر نموذج طلب العمالة — يرد فريقنا عادةً خلال يوم عمل واحد.", fee: "لا يُتقاضى من الباحثين عن عمل أي رسوم تحت أي مسمى. خدماتنا مجانية للمرشحين.",
    permit: "تصاريح العمل في تركيا (2026):", licence: "ترخيصنا:", references: "بعض مراجعنا:", partners: "شركاؤنا الحاليون:", about: "عن Merç Global:",
    thanks: "على الرحب والسعة! هل يمكنني مساعدتك في شيء آخر؟", hello: "مرحباً! كيف يمكنني مساعدتك اليوم؟", fallback: "لست متأكداً أنني فهمت. يمكن لفريقنا الرد عليك شخصياً عبر واتساب:",
    found: "قد تفيدك هذه المعلومة:", whatsapp: "راسلنا عبر واتساب", more: "افتح الصفحة", typing: "يكتب…",
  },
  fr: {
    name: "Assistant Merç Global", online: "En ligne · répond aussitôt", teaser: "Une question ? Demandez-moi !", greet: "Bonjour ! 👋 Je suis l'assistant Merç Global. Posez-moi vos questions sur nos services, secteurs, offres d'emploi, permis de travail ou nos coordonnées.",
    placeholder: "Écrivez votre question…", send: "Envoyer", open: "Ouvrir l'assistant", close: "Fermer l'assistant",
    suggestions: ["Quels services proposez-vous ?", "Y a-t-il des offres d'emploi ?", "J'ai besoin de personnel", "Frais de permis de travail", "Où est votre bureau ?"],
    services: "Nos services :", sectors: "Nous fournissons du personnel pour ces secteurs :", countries: "Nous recrutons dans ces régions :", contact: "Vous pouvez nous joindre ici :",
    address: "Notre bureau :", jobs: "Nos offres d'emploi :", jobsNone: "Aucune offre ouverte pour le moment — créez votre CV et envoyez-le-nous, nous vous contacterons dès qu'un poste adapté s'ouvre.",
    jobsSome: "offres ouvertes actuellement.", cv: "Créez en ligne un CV professionnel (anglais ou turc) et envoyez-le-nous en un clic :", apply: "Pour postuler : ouvrez une offre et cliquez sur « Postuler », ou créez votre CV et envoyez-le-nous.",
    request: "Indiquez-nous postes, effectifs et calendrier dans le formulaire de demande — notre équipe répond généralement sous un jour ouvré.", fee: "Aucuns frais ne sont jamais demandés aux candidats, sous quelque nom que ce soit. Nos services sont gratuits pour eux.",
    permit: "Permis de travail en Turquie (2026) :", licence: "Notre licence :", references: "Quelques références :", partners: "Nos partenaires actuels :", about: "À propos de Merç Global :",
    thanks: "Avec plaisir ! Puis-je vous aider pour autre chose ?", hello: "Bonjour ! Comment puis-je vous aider ?", fallback: "Je ne suis pas sûr d'avoir compris. Notre équipe peut vous répondre personnellement sur WhatsApp :",
    found: "Ceci peut vous aider :", whatsapp: "Écrire sur WhatsApp", more: "Ouvrir la page", typing: "Écrit…",
  },
  ru: {
    name: "Ассистент Merç Global", online: "Онлайн · отвечает сразу", teaser: "Есть вопросы? Спросите меня!", greet: "Здравствуйте! 👋 Я ассистент Merç Global. Спросите об услугах, отраслях, вакансиях, разрешениях на работу или о том, как с нами связаться.",
    placeholder: "Введите вопрос…", send: "Отправить", open: "Открыть ассистента", close: "Закрыть ассистента",
    suggestions: ["Какие услуги вы оказываете?", "Есть ли вакансии?", "Мне нужен персонал", "Пошлины за разрешение на работу", "Где ваш офис?"],
    services: "Наши услуги:", sectors: "Мы подбираем персонал для отраслей:", countries: "Мы подбираем персонал в регионах:", contact: "Связаться с нами можно здесь:",
    address: "Наш офис:", jobs: "Наши вакансии:", jobsNone: "Сейчас открытых вакансий нет — создайте резюме и отправьте нам, мы свяжемся с вами, когда появится подходящая работа.",
    jobsSome: "открытых вакансий сейчас.", cv: "Создайте профессиональное резюме (на английском или турецком) онлайн и отправьте нам одним нажатием:", apply: "Чтобы откликнуться: откройте вакансию и нажмите «Откликнуться» или создайте резюме и отправьте нам.",
    request: "Укажите должности, количество и сроки в форме заявки — обычно мы отвечаем в течение одного рабочего дня.", fee: "С соискателей не взимается никакая плата ни под каким видом. Для кандидатов наши услуги бесплатны.",
    permit: "Разрешения на работу в Турции (2026):", licence: "Наша лицензия:", references: "Некоторые наши клиенты:", partners: "Наши текущие партнёры:", about: "О Merç Global:",
    thanks: "Пожалуйста! Могу ли я помочь чем-то ещё?", hello: "Здравствуйте! Чем могу помочь?", fallback: "Не уверен, что правильно понял. Наша команда ответит вам лично в WhatsApp:",
    found: "Возможно, это поможет:", whatsapp: "Написать в WhatsApp", more: "Открыть страницу", typing: "Печатает…",
  },
  de: {
    name: "Merç Global Assistent", online: "Online · antwortet sofort", teaser: "Fragen? Fragen Sie mich!", greet: "Hallo! 👋 Ich bin der Merç Global Assistent. Fragen Sie mich zu unseren Leistungen, Branchen, Stellenangeboten, Arbeitserlaubnissen oder wie Sie uns erreichen.",
    placeholder: "Ihre Frage…", send: "Senden", open: "Assistent öffnen", close: "Assistent schließen",
    suggestions: ["Welche Leistungen bieten Sie an?", "Gibt es offene Stellen?", "Ich brauche Personal für mein Projekt", "Gebühren für die Arbeitserlaubnis", "Wo ist Ihr Büro?"],
    services: "Unsere Leistungen:", sectors: "Wir stellen Personal für diese Branchen bereit:", countries: "Wir rekrutieren in diesen Regionen:", contact: "So erreichen Sie uns:",
    address: "Unser Büro:", jobs: "Unsere Stellenangebote:", jobsNone: "Derzeit gibt es keine offenen Stellen — erstellen Sie Ihren Lebenslauf und senden Sie ihn uns; wir melden uns, sobald eine passende Stelle frei wird.",
    jobsSome: "offene Stellen derzeit.", cv: "Erstellen Sie online einen professionellen Lebenslauf (Englisch oder Türkisch) und senden Sie ihn mit einem Klick an uns:", apply: "So bewerben Sie sich: Stelle öffnen und „Jetzt bewerben“ drücken – oder Lebenslauf erstellen und senden.",
    request: "Nennen Sie uns Positionen, Anzahl und Zeitplan im Anfrageformular — unser Team antwortet in der Regel innerhalb eines Werktags.", fee: "Von Arbeitsuchenden wird unter keinem Namen eine Gebühr verlangt. Für Bewerber sind unsere Leistungen kostenlos.",
    permit: "Arbeitserlaubnis in der Türkei (2026):", licence: "Unsere Lizenz:", references: "Einige unserer Referenzen:", partners: "Unsere aktuellen Partner:", about: "Über Merç Global:",
    thanks: "Gern geschehen! Kann ich sonst noch helfen?", hello: "Hallo! Wie kann ich Ihnen helfen?", fallback: "Das habe ich leider nicht verstanden. Unser Team antwortet Ihnen gern persönlich auf WhatsApp:",
    found: "Das könnte helfen:", whatsapp: "Per WhatsApp schreiben", more: "Seite öffnen", typing: "Schreibt…",
  },
  es: {
    name: "Asistente de Merç Global", online: "En línea · responde al instante", teaser: "¿Preguntas? ¡Pregúnteme!", greet: "¡Hola! 👋 Soy el asistente de Merç Global. Pregúnteme por nuestros servicios, sectores, ofertas de empleo, permisos de trabajo o cómo contactarnos.",
    placeholder: "Escriba su pregunta…", send: "Enviar", open: "Abrir el asistente", close: "Cerrar el asistente",
    suggestions: ["¿Qué servicios ofrecen?", "¿Hay ofertas de empleo?", "Necesito personal para mi proyecto", "Tasas del permiso de trabajo", "¿Dónde está su oficina?"],
    services: "Nuestros servicios:", sectors: "Suministramos personal para estos sectores:", countries: "Contratamos personal en estas regiones:", contact: "Puede contactarnos aquí:",
    address: "Nuestra oficina:", jobs: "Nuestras ofertas de empleo:", jobsNone: "Ahora mismo no hay vacantes abiertas: cree su CV y envíenoslo, y le contactaremos cuando surja un puesto adecuado.",
    jobsSome: "vacantes abiertas ahora.", cv: "Cree en línea un CV profesional (en inglés o turco) y envíenoslo con un clic:", apply: "Para postular: abra una oferta y pulse «Postular ahora», o cree su CV y envíenoslo.",
    request: "Indíquenos puestos, número de personas y plazos en el formulario de solicitud: solemos responder en un día laborable.", fee: "Nunca se cobra a los candidatos ninguna tarifa, bajo ningún concepto. Nuestros servicios son gratuitos para ellos.",
    permit: "Permisos de trabajo en Turquía (2026):", licence: "Nuestra licencia:", references: "Algunas de nuestras referencias:", partners: "Nuestros socios actuales:", about: "Sobre Merç Global:",
    thanks: "¡De nada! ¿Puedo ayudarle en algo más?", hello: "¡Hola! ¿En qué puedo ayudarle?", fallback: "No estoy seguro de haberle entendido. Nuestro equipo puede responderle personalmente por WhatsApp:",
    found: "Esto puede ayudarle:", whatsapp: "Escribir por WhatsApp", more: "Abrir la página", typing: "Escribiendo…",
  },
  zh: {
    name: "Merç Global 智能助手", online: "在线 · 即时回复", teaser: "有问题？问我吧！", greet: "您好！👋 我是 Merç Global 助手。可以问我关于我们的服务、行业、招聘职位、工作许可或联系方式的问题。",
    placeholder: "请输入您的问题…", send: "发送", open: "打开助手", close: "关闭助手",
    suggestions: ["你们提供哪些服务？", "有招聘职位吗？", "我的项目需要工人", "工作许可费用", "你们的办公室在哪里？"],
    services: "我们提供以下服务：", sectors: "我们为以下行业提供人员：", countries: "我们从以下地区招募人员：", contact: "您可以通过以下方式联系我们：",
    address: "我们的办公室：", jobs: "我们的招聘职位：", jobsNone: "目前没有空缺职位——请创建简历并发送给我们，有合适职位时我们会与您联系。",
    jobsSome: "个职位正在招聘。", cv: "您可以在线创建专业简历（英文或土耳其文），一键发送给我们：", apply: "申请方式：打开职位并点击“立即申请”，或创建简历后发送给我们。",
    request: "请在人员需求表中告诉我们岗位、人数和时间——我们通常在一个工作日内回复。", fee: "我们绝不以任何名义向求职者收取费用。我们的服务对求职者免费。",
    permit: "土耳其工作许可（2026 年）：", licence: "我们的资质：", references: "部分合作客户：", partners: "当前合作伙伴：", about: "关于 Merç Global：",
    thanks: "不客气！还有什么可以帮您？", hello: "您好！有什么可以帮您？", fallback: "抱歉，我没有完全理解。我们的团队可以通过 WhatsApp 为您解答：",
    found: "以下信息或许有帮助：", whatsapp: "通过 WhatsApp 联系", more: "打开页面", typing: "正在输入…",
  },
};
