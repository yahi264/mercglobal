export const locales = ["en", "tr", "ar", "fr", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
  ar: "العربية",
  fr: "Français",
  ru: "Русский",
};

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
export const dirOf = (l: Locale) => (l === "ar" ? "rtl" : "ltr");

export type L = Record<Locale, string>;

// Interface text (menus, buttons, form labels). Company content is in lib/content.ts.
const dict = {
  // navigation
  navHome: { en: "Home", tr: "Anasayfa", ar: "الرئيسية", fr: "Accueil", ru: "Главная" },
  navCorporate: { en: "Company", tr: "Kurumsal", ar: "الشركة", fr: "Entreprise", ru: "О компании" },
  navAbout: { en: "About Us", tr: "Hakkımızda", ar: "من نحن", fr: "À propos", ru: "О нас" },
  navCertificates: { en: "Licences & Certificates", tr: "Sertifikalarımız", ar: "التراخيص والشهادات", fr: "Licences et certificats", ru: "Лицензии и сертификаты" },
  navReferences: { en: "References", tr: "Referanslarımız", ar: "مراجعنا", fr: "Références", ru: "Референции" },
  navCareers: { en: "Careers", tr: "İnsan Kaynakları", ar: "الوظائف", fr: "Carrières", ru: "Вакансии" },
  navServices: { en: "Services", tr: "Hizmetlerimiz", ar: "خدماتنا", fr: "Services", ru: "Услуги" },
  navSectors: { en: "Sectors", tr: "Sektörler", ar: "القطاعات", fr: "Secteurs", ru: "Отрасли" },
  navCountries: { en: "Sourcing Countries", tr: "Personel Temin Edilen Ülkeler", ar: "دول توفير العمالة", fr: "Pays de recrutement", ru: "Страны подбора" },
  navContact: { en: "Contact", tr: "İletişim", ar: "اتصل بنا", fr: "Contact", ru: "Контакты" },
  requestStaff: { en: "Request Staff", tr: "Personel Talebi", ar: "اطلب عمالة", fr: "Demander du personnel", ru: "Запросить персонал" },
  menuOpen: { en: "Open menu", tr: "Menüyü aç", ar: "فتح القائمة", fr: "Ouvrir le menu", ru: "Открыть меню" },
  menuClose: { en: "Close menu", tr: "Menüyü kapat", ar: "إغلاق القائمة", fr: "Fermer le menu", ru: "Закрыть меню" },
  language: { en: "Language", tr: "Dil", ar: "اللغة", fr: "Langue", ru: "Язык" },
  darkMode: { en: "Dark mode", tr: "Koyu mod", ar: "الوضع الداكن", fr: "Mode sombre", ru: "Тёмная тема" },
  lightMode: { en: "Light mode", tr: "Açık mod", ar: "الوضع الفاتح", fr: "Mode clair", ru: "Светлая тема" },
  dragGlobe: { en: "Drag to rotate", tr: "Döndürmek için sürükleyin", ar: "اسحب للتدوير", fr: "Faites glisser pour tourner", ru: "Потяните, чтобы вращать" },
  skipIntro: { en: "Skip", tr: "Geç", ar: "تخطٍّ", fr: "Passer", ru: "Пропустить" },
  backToTop: { en: "Back to top", tr: "Yukarı çık", ar: "العودة إلى الأعلى", fr: "Retour en haut", ru: "Наверх" },
  phone: { en: "Phone", tr: "Telefon", ar: "الهاتف", fr: "Téléphone", ru: "Телефон" },
  email: { en: "Email", tr: "E-posta", ar: "البريد الإلكتروني", fr: "E-mail", ru: "Эл. почта" },
  address: { en: "Address", tr: "Adres", ar: "العنوان", fr: "Adresse", ru: "Адрес" },
  web: { en: "Websites", tr: "Web", ar: "المواقع", fr: "Sites web", ru: "Сайты" },
  callNow: { en: "Call now", tr: "Hemen Ara", ar: "اتصل الآن", fr: "Appeler", ru: "Позвонить" },
  writeWhatsApp: { en: "Write on WhatsApp", tr: "WhatsApp ile yazın", ar: "راسلنا عبر واتساب", fr: "Écrire sur WhatsApp", ru: "Написать в WhatsApp" },
  learnMore: { en: "View details", tr: "Detayları İncele", ar: "عرض التفاصيل", fr: "Voir les détails", ru: "Подробнее" },
  getInfo: { en: "Get information", tr: "Bilgi Al", ar: "احصل على معلومات", fr: "Se renseigner", ru: "Получить информацию" },
  contactUs: { en: "Contact Merc Global", tr: "Merc Global'e Ulaşın", ar: "تواصل مع Merc Global", fr: "Contacter Merc Global", ru: "Связаться с Merc Global" },
  continue: { en: "Read more", tr: "Devam", ar: "اقرأ المزيد", fr: "Lire la suite", ru: "Читать далее" },
  allServices: { en: "All services", tr: "Tüm hizmetler", ar: "جميع الخدمات", fr: "Tous les services", ru: "Все услуги" },
  allSectors: { en: "All sectors", tr: "Tüm sektörler", ar: "جميع القطاعات", fr: "Tous les secteurs", ru: "Все отрасли" },
  serviceDetail: { en: "Service detail", tr: "Hizmet Detayı", ar: "تفاصيل الخدمة", fr: "Détail du service", ru: "Об услуге" },
  sectorDetail: { en: "Sector detail", tr: "Sektör Detayı", ar: "تفاصيل القطاع", fr: "Détail du secteur", ru: "Об отрасли" },
  otherServices: { en: "Other services", tr: "Diğer hizmetler", ar: "خدمات أخرى", fr: "Autres services", ru: "Другие услуги" },
  otherSectors: { en: "Other sectors", tr: "Diğer sektörler", ar: "قطاعات أخرى", fr: "Autres secteurs", ru: "Другие отрасли" },
  prev: { en: "Previous", tr: "Önceki", ar: "السابق", fr: "Précédent", ru: "Назад" },
  next: { en: "Next", tr: "Sonraki", ar: "التالي", fr: "Suivant", ru: "Далее" },
  scroll: { en: "Scroll", tr: "Kaydır", ar: "مرّر", fr: "Défiler", ru: "Листайте" },
  quickLinks: { en: "Quick links", tr: "Hızlı Erişim", ar: "روابط سريعة", fr: "Accès rapide", ru: "Быстрые ссылки" },
  rights: { en: "All rights reserved.", tr: "Tüm hakları saklıdır.", ar: "جميع الحقوق محفوظة.", fr: "Tous droits réservés.", ru: "Все права защищены." },
  close: { en: "Close", tr: "Kapat", ar: "إغلاق", fr: "Fermer", ru: "Закрыть" },
  enlarge: { en: "Enlarge", tr: "Büyüt", ar: "تكبير", fr: "Agrandir", ru: "Увеличить" },
  notFoundTitle: { en: "Page not found", tr: "Sayfa bulunamadı", ar: "الصفحة غير موجودة", fr: "Page introuvable", ru: "Страница не найдена" },
  notFoundText: { en: "The page you are looking for does not exist or has moved.", tr: "Aradığınız sayfa mevcut değil veya taşınmış.", ar: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.", fr: "La page que vous cherchez n'existe pas ou a été déplacée.", ru: "Страница, которую вы ищете, не существует или была перемещена." },
  backHome: { en: "Back to home", tr: "Anasayfaya dön", ar: "العودة إلى الرئيسية", fr: "Retour à l'accueil", ru: "На главную" },

  // personnel request form
  formTitle: { en: "Personnel request", tr: "Personel talep formu", ar: "نموذج طلب العمالة", fr: "Demande de personnel", ru: "Заявка на персонал" },
  formIntro: {
    en: "Tell us which positions you need. Your request is sent straight to our team by WhatsApp or email — we usually reply within one working day.",
    tr: "İhtiyaç duyduğunuz pozisyonları bize iletin. Talebiniz WhatsApp veya e-posta ile doğrudan ekibimize ulaşır; genellikle bir iş günü içinde dönüş yaparız.",
    ar: "أخبرنا بالوظائف التي تحتاجها. يصل طلبك مباشرة إلى فريقنا عبر واتساب أو البريد الإلكتروني، ونرد عادةً خلال يوم عمل واحد.",
    fr: "Indiquez-nous les postes dont vous avez besoin. Votre demande parvient directement à notre équipe par WhatsApp ou e-mail — nous répondons généralement sous un jour ouvré.",
    ru: "Сообщите нам, какие специалисты вам нужны. Заявка поступает напрямую нашей команде через WhatsApp или по электронной почте — обычно мы отвечаем в течение одного рабочего дня.",
  },
  fCompany: { en: "Company", tr: "Firma adı", ar: "اسم الشركة", fr: "Société", ru: "Компания" },
  fName: { en: "Full name", tr: "Ad Soyad", ar: "الاسم الكامل", fr: "Nom complet", ru: "Имя и фамилия" },
  fEmail: { en: "Email", tr: "E-posta", ar: "البريد الإلكتروني", fr: "E-mail", ru: "Эл. почта" },
  fPhone: { en: "Phone / WhatsApp", tr: "Telefon / WhatsApp", ar: "الهاتف / واتساب", fr: "Téléphone / WhatsApp", ru: "Телефон / WhatsApp" },
  fCountry: { en: "Country of the project", tr: "Projenin ülkesi", ar: "بلد المشروع", fr: "Pays du projet", ru: "Страна проекта" },
  fSector: { en: "Sector", tr: "Sektör", ar: "القطاع", fr: "Secteur", ru: "Отрасль" },
  fSelect: { en: "Select…", tr: "Seçiniz…", ar: "اختر…", fr: "Sélectionnez…", ru: "Выберите…" },
  fOther: { en: "Other", tr: "Diğer", ar: "أخرى", fr: "Autre", ru: "Другое" },
  fPositions: { en: "Positions and number of staff", tr: "Pozisyonlar ve personel sayısı", ar: "الوظائف وعدد العمالة", fr: "Postes et nombre de personnes", ru: "Должности и количество персонала" },
  fPositionsHint: { en: "e.g. 10 welders, 2 site engineers", tr: "ör. 10 kaynakçı, 2 saha mühendisi", ar: "مثال: 10 لحامين، 2 مهندس موقع", fr: "ex. 10 soudeurs, 2 ingénieurs de chantier", ru: "напр. 10 сварщиков, 2 инженера на объект" },
  fStart: { en: "Expected start date", tr: "Planlanan başlangıç tarihi", ar: "تاريخ البدء المتوقع", fr: "Date de début prévue", ru: "Планируемая дата начала" },
  fMessage: { en: "Message", tr: "Mesaj", ar: "الرسالة", fr: "Message", ru: "Сообщение" },
  fSendWhatsApp: { en: "Send by WhatsApp", tr: "WhatsApp ile gönder", ar: "إرسال عبر واتساب", fr: "Envoyer par WhatsApp", ru: "Отправить в WhatsApp" },
  fSendEmail: { en: "Send by email", tr: "E-posta ile gönder", ar: "إرسال بالبريد الإلكتروني", fr: "Envoyer par e-mail", ru: "Отправить по эл. почте" },
  fRequired: { en: "Please fill in the required fields (marked *).", tr: "Lütfen zorunlu alanları (*) doldurun.", ar: "يرجى ملء الحقول المطلوبة (المعلّمة بـ *).", fr: "Veuillez remplir les champs obligatoires (*).", ru: "Пожалуйста, заполните обязательные поля (*)." },
  fBadEmail: { en: "Please enter a valid email address.", tr: "Lütfen geçerli bir e-posta adresi girin.", ar: "يرجى إدخال بريد إلكتروني صحيح.", fr: "Veuillez saisir une adresse e-mail valide.", ru: "Пожалуйста, введите корректный адрес эл. почты." },
  fOpened: {
    en: "Your message is ready in WhatsApp / your email app — just press send there.",
    tr: "Mesajınız WhatsApp'ta / e-posta uygulamanızda hazır — oradan gönder tuşuna basmanız yeterli.",
    ar: "رسالتك جاهزة في واتساب / تطبيق البريد — ما عليك سوى الضغط على إرسال هناك.",
    fr: "Votre message est prêt dans WhatsApp / votre messagerie — il suffit d'appuyer sur Envoyer.",
    ru: "Сообщение подготовлено в WhatsApp / почтовом приложении — осталось нажать «Отправить».",
  },
  fSubject: { en: "Personnel request", tr: "Personel talebi", ar: "طلب عمالة", fr: "Demande de personnel", ru: "Заявка на персонал" },

  // careers form
  cTitle: { en: "Apply for a job", tr: "İş başvurusu", ar: "التقدم لوظيفة", fr: "Postuler", ru: "Подать заявку на работу" },
  cIntro: {
    en: "Send us your details and the position you are interested in. When the email opens, please attach your CV (PDF, DOC or DOCX).",
    tr: "Bilgilerinizi ve ilgilendiğiniz pozisyonu bize gönderin. E-posta açıldığında lütfen CV'nizi (PDF, DOC veya DOCX) ekleyin.",
    ar: "أرسل لنا بياناتك والوظيفة التي تهمك. عند فتح البريد الإلكتروني، يرجى إرفاق سيرتك الذاتية (PDF أو DOC أو DOCX).",
    fr: "Envoyez-nous vos coordonnées et le poste qui vous intéresse. Lorsque l'e-mail s'ouvre, joignez votre CV (PDF, DOC ou DOCX).",
    ru: "Отправьте нам свои данные и интересующую должность. Когда откроется письмо, приложите резюме (PDF, DOC или DOCX).",
  },
  cPosition: { en: "Position applied for", tr: "Başvurulan pozisyon", ar: "الوظيفة المطلوبة", fr: "Poste souhaité", ru: "Желаемая должность" },
  cLetter: { en: "Cover letter", tr: "Ön yazı", ar: "خطاب التقديم", fr: "Lettre de motivation", ru: "Сопроводительное письмо" },
  cCvNote: {
    en: "Remember to attach your CV to the email before sending.",
    tr: "Göndermeden önce CV'nizi e-postaya eklemeyi unutmayın.",
    ar: "لا تنسَ إرفاق سيرتك الذاتية بالبريد قبل الإرسال.",
    fr: "N'oubliez pas de joindre votre CV à l'e-mail avant l'envoi.",
    ru: "Не забудьте приложить резюме к письму перед отправкой.",
  },
  cSubject: { en: "Job application", tr: "İş başvurusu", ar: "طلب توظيف", fr: "Candidature", ru: "Заявка на работу" },
  cFree: {
    en: "Job seekers are never charged any fee, under any name.",
    tr: "İş arayanlardan hiçbir ad altında menfaat temin edilmez ve ücret alınmaz.",
    ar: "لا يُتقاضى من الباحثين عن عمل أي رسوم أو منفعة تحت أي مسمى.",
    fr: "Aucun frais ni avantage n'est demandé aux candidats, sous quelque nom que ce soit.",
    ru: "С соискателей не взимается никакая плата ни под каким видом.",
  },
} satisfies Record<string, L>;

export type Key = keyof typeof dict;
export const getT = (l: Locale) => (k: Key) => dict[k][l];
export const pick = (v: L, l: Locale) => v[l];
