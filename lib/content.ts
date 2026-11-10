import type { L } from "./i18n";

// ─── Company details (from mercglobal.com.tr) ────────────────────────────────
export const company = {
  legalName: "Merç Global İstihdam Eğitim ve Danışmanlık Hizmetleri Ltd. Şti.",
  brand: "Merc Global",
  group: "Merç Global Group",
  phoneDisplay: "0312 230 31 82 – 85",
  phoneHref: "tel:+903122303182",
  mobileDisplay: "0531 342 48 01",
  whatsapp: [
    { display: "0531 342 48 01", number: "905313424801" },
    { display: "0545 792 02 68", number: "905457920268" },
  ],
  emails: ["info@mercglobal.com.tr", "ali.merc@mercglobal.com.tr", "merc_ltd@hotmail.com"],
  websites: ["www.mercglobal.com.tr", "www.turkishmanpower.com", "www.yurtdisiisler.com", "www.yabancieleman.com.tr"],
  addressLines: ["Kızılay Mahallesi, Fevzi Çakmak 1 Sokak", "No: 17/4, Kızılay / Ankara — Türkiye"],
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.8077600382876!2d32.84815607529081!3d39.92331808552354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34efe2d12f54b%3A0x9c81a6be6cf040ca!2sMer%C3%A7%20Global%20Group!5e0!3m2!1sen!2str!4v1672994862498!5m2!1sen!2str",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Mer%C3%A7+Global+Group+Ankara",
  licenceNo: "494",
  licenceDate: "22/09/2011",
};

export const mainWhatsApp = company.whatsapp[0].number;

// ─── Home / about texts ──────────────────────────────────────────────────────
export const text = {
  heroEyebrow: { en: "International workforce & consultancy", tr: "Uluslararası iş gücü ve danışmanlık", ar: "توفير العمالة الدولية والاستشارات", fr: "Main-d'œuvre internationale et conseil", ru: "Международный персонал и консалтинг" },
  tagline: {
    en: "International recruitment and consultancy, backed by Merç Global Group.",
    tr: "Merç Global Group güvencesiyle uluslararası personel istihdamı ve danışmanlık.",
    ar: "توظيف دولي واستشارات بضمان مجموعة Merç Global Group.",
    fr: "Recrutement international et conseil, avec la garantie de Merç Global Group.",
    ru: "Международный подбор персонала и консалтинг под гарантией Merç Global Group.",
  },
  servicesEyebrow: { en: "Professional solutions", tr: "Profesyonel çözümler", ar: "حلول احترافية", fr: "Solutions professionnelles", ru: "Профессиональные решения" },
  servicesIntro: {
    en: "At Merc Global we stand beside your business throughout international recruitment — offering end-to-end services from legal compliance to workforce planning.",
    tr: "Merc Global olarak uluslararası personel istihdamı süreçlerinde işletmenizin yanında; yasal uyumdan iş gücü planlamasına kadar uçtan uca hizmet sunuyoruz.",
    ar: "في Merc Global نقف إلى جانب منشأتك طوال مراحل التوظيف الدولي، ونقدّم خدمات متكاملة من الامتثال القانوني إلى تخطيط القوى العاملة.",
    fr: "Chez Merc Global, nous accompagnons votre entreprise tout au long du recrutement international — de la conformité juridique à la planification des effectifs.",
    ru: "Merc Global сопровождает ваш бизнес на всех этапах международного найма — от соблюдения законодательства до планирования персонала.",
  },
  corporateApproach: {
    en: "Thanks to the international experience we have gained across many sectors, we provide qualified and fast human-resource solutions tailored to the needs of every project.",
    tr: "Farklı sektörlerde edindiğimiz uluslararası tecrübe sayesinde, her projenin ihtiyaçlarına özel nitelikli ve hızlı insan kaynağı çözümleri sunmaktayız.",
    ar: "بفضل الخبرة الدولية التي اكتسبناها في قطاعات مختلفة، نقدّم حلول موارد بشرية مؤهلة وسريعة مصمّمة وفق احتياجات كل مشروع.",
    fr: "Grâce à l'expérience internationale acquise dans de nombreux secteurs, nous proposons des solutions RH qualifiées et rapides, adaptées aux besoins de chaque projet.",
    ru: "Благодаря международному опыту в самых разных отраслях мы предлагаем быстрые решения по квалифицированному персоналу, адаптированные к задачам каждого проекта.",
  },
  corporateApproachTitle: { en: "Our corporate approach", tr: "Kurumsal yaklaşım", ar: "نهجنا المؤسسي", fr: "Notre approche", ru: "Наш подход" },
  aboutShort: {
    en: "Merç Global provides international workforce supply and consultancy in the oil, natural gas, energy, construction, agriculture, logistics, manufacturing, industry, tourism and service sectors. With our global candidate pool, we connect qualified personnel with the right projects quickly and reliably.",
    tr: "Merç Global, petrol, doğal gaz, enerji, inşaat, tarım, lojistik, imalat, sanayi, turizm ve hizmet sektörlerinde uluslararası iş gücü temini ve danışmanlık sunar. Global aday havuzumuzla nitelikli personeli doğru projelerle hızlı ve güvenilir şekilde buluştururuz.",
    ar: "تقدّم Merç Global خدمات توفير العمالة الدولية والاستشارات في قطاعات النفط والغاز الطبيعي والطاقة والبناء والزراعة والخدمات اللوجستية والتصنيع والصناعة والسياحة والخدمات. ومن خلال قاعدة مرشحينا العالمية، نربط الكفاءات المؤهلة بالمشاريع المناسبة بسرعة وموثوقية.",
    fr: "Merç Global fournit de la main-d'œuvre internationale et du conseil dans les secteurs du pétrole, du gaz naturel, de l'énergie, de la construction, de l'agriculture, de la logistique, de la fabrication, de l'industrie, du tourisme et des services. Grâce à notre vivier mondial de candidats, nous mettons en relation du personnel qualifié avec les bons projets, rapidement et en toute fiabilité.",
    ru: "Merç Global обеспечивает международный подбор персонала и консалтинг в нефтяной, газовой, энергетической, строительной, сельскохозяйственной, логистической, производственной, промышленной, туристической и сервисной отраслях. Благодаря глобальной базе кандидатов мы быстро и надёжно соединяем квалифицированных специалистов с подходящими проектами.",
  },
  about: [
    {
      en: "Merç Global İstihdam Eğitim ve Danışmanlık Hizmetleri Ltd. Şti. is an organisation specialised in international workforce supply and consultancy, operating in the Oil, Natural Gas, Energy, Construction, Agriculture & Livestock, Logistics, Manufacturing, Industry, Tourism & Service sectors.",
      tr: "Merç Global İstihdam Eğitim ve Danışmanlık Hizmetleri Ltd. Şti., Petrol, Doğal Gaz, Enerji, İnşaat, Tarım ve Hayvancılık, Lojistik, İmalat, Sanayii, Turizm & Hizmet sektörlerinde faaliyet gösteren, uluslararası iş gücü temini ve danışmanlık alanında uzmanlaşmış bir kuruluştur.",
      ar: "شركة Merç Global İstihdam Eğitim ve Danışmanlık Hizmetleri Ltd. Şti. مؤسسة متخصصة في توفير العمالة الدولية والاستشارات، وتعمل في قطاعات النفط والغاز الطبيعي والطاقة والبناء والزراعة وتربية المواشي والخدمات اللوجستية والتصنيع والصناعة والسياحة والخدمات.",
      fr: "Merç Global İstihdam Eğitim ve Danışmanlık Hizmetleri Ltd. Şti. est une société spécialisée dans la fourniture de main-d'œuvre internationale et le conseil, active dans les secteurs du pétrole, du gaz naturel, de l'énergie, de la construction, de l'agriculture et de l'élevage, de la logistique, de la fabrication, de l'industrie, du tourisme et des services.",
      ru: "Merç Global İstihdam Eğitim ve Danışmanlık Hizmetleri Ltd. Şti. — компания, специализирующаяся на международном подборе персонала и консалтинге в нефтяной и газовой отраслях, энергетике, строительстве, сельском хозяйстве и животноводстве, логистике, производстве, промышленности, туризме и сфере услуг.",
    },
    {
      en: "By bringing local and foreign workforces together with the right projects, we offer our clients not only personnel but also strategic human-resource solutions. Thanks to the field experience we have gained especially in the oil, natural gas and energy sectors, we supply qualified workforces for high-standard projects quickly and reliably.",
      tr: "Şirketimiz; yerli ve yabancı iş gücünü doğru projelerle buluşturarak, müşterilerine yalnızca personel değil, aynı zamanda stratejik insan kaynakları çözümleri sunmaktadır. Özellikle petrol, doğal gaz ve enerji sektörlerinde edindiğimiz saha tecrübesi sayesinde, yüksek standartlı projeler için nitelikli iş gücünü hızlı ve güvenilir şekilde temin etmekteyiz.",
      ar: "من خلال ربط العمالة المحلية والأجنبية بالمشاريع المناسبة، لا نقدّم لعملائنا الموظفين فحسب، بل حلول موارد بشرية استراتيجية أيضاً. وبفضل الخبرة الميدانية التي اكتسبناها خصوصاً في قطاعات النفط والغاز الطبيعي والطاقة، نوفّر العمالة المؤهلة للمشاريع ذات المعايير العالية بسرعة وموثوقية.",
      fr: "En associant main-d'œuvre locale et étrangère aux bons projets, nous offrons à nos clients non seulement du personnel, mais aussi des solutions RH stratégiques. Grâce à l'expérience de terrain acquise notamment dans le pétrole, le gaz naturel et l'énergie, nous fournissons rapidement et de manière fiable une main-d'œuvre qualifiée pour des projets exigeants.",
      ru: "Соединяя местный и иностранный персонал с подходящими проектами, мы предлагаем клиентам не просто сотрудников, а стратегические HR-решения. Благодаря полевому опыту, накопленному прежде всего в нефтяной, газовой и энергетической отраслях, мы быстро и надёжно обеспечиваем квалифицированным персоналом проекты высокого уровня.",
    },
    {
      en: "With the wide candidate pool we have built on a global scale, we reach engineers, technicians, foremen, workers and field personnel from many countries — speeding up our clients' hiring processes and saving them time and cost.",
      tr: "Merç Global olarak, global ölçekte oluşturduğumuz geniş aday havuzu ile farklı ülkelerden mühendis, teknisyen, usta, işçi ve saha personeline erişim sağlıyor; müşterilerimizin işe alım süreçlerini hızlandırarak zaman ve maliyet avantajı yaratıyoruz.",
      ar: "بفضل قاعدة المرشحين الواسعة التي بنيناها على نطاق عالمي، نصل إلى المهندسين والفنيين والحرفيين والعمال وموظفي المواقع من دول مختلفة، ونسرّع عمليات التوظيف لدى عملائنا بما يوفّر الوقت والتكلفة.",
      fr: "Grâce au vaste vivier de candidats que nous avons constitué à l'échelle mondiale, nous accédons à des ingénieurs, techniciens, chefs d'équipe, ouvriers et personnels de terrain de nombreux pays — en accélérant les recrutements de nos clients et en leur faisant gagner du temps et de l'argent.",
      ru: "Обширная международная база кандидатов даёт нам доступ к инженерам, техникам, мастерам, рабочим и полевому персоналу из многих стран — это ускоряет найм у наших клиентов и экономит их время и средства.",
    },
    {
      en: "Beyond recruitment, we take an active role at every stage of a project with workforce planning, training, legal process management and operational support services.",
      tr: "Sadece işe alım değil; aynı zamanda iş gücü planlama, eğitim, yasal süreç yönetimi ve operasyonel destek hizmetleri ile projelerin her aşamasında aktif rol alıyoruz.",
      ar: "ولا يقتصر دورنا على التوظيف، بل نشارك بفاعلية في كل مراحل المشروع من خلال تخطيط القوى العاملة والتدريب وإدارة الإجراءات القانونية وخدمات الدعم التشغيلي.",
      fr: "Au-delà du recrutement, nous intervenons à chaque étape des projets : planification des effectifs, formation, gestion des démarches légales et soutien opérationnel.",
      ru: "Помимо найма, мы активно участвуем на каждом этапе проекта: планирование персонала, обучение, сопровождение юридических процедур и операционная поддержка.",
    },
  ] as L[],
  visionTitle: { en: "Vision", tr: "Vizyonumuz", ar: "رؤيتنا", fr: "Vision", ru: "Видение" },
  vision: {
    en: "To be a trusted, leading brand in international workforce supply and consultancy.",
    tr: "Uluslararası iş gücü temini ve danışmanlık alanında güvenilir ve lider bir marka olmak.",
    ar: "أن نكون علامة رائدة وموثوقة في مجال توفير العمالة الدولية والاستشارات.",
    fr: "Être une marque de confiance et de référence dans la fourniture de main-d'œuvre internationale et le conseil.",
    ru: "Быть надёжным и ведущим брендом в сфере международного подбора персонала и консалтинга.",
  },
  missionTitle: { en: "Mission", tr: "Misyonumuz", ar: "رسالتنا", fr: "Mission", ru: "Миссия" },
  mission: {
    en: "To provide our clients with sustainable, fast and accurate human-resource solutions.",
    tr: "Müşterilerimize sürdürülebilir, hızlı ve doğru insan kaynağı çözümleri sunmak.",
    ar: "أن نقدّم لعملائنا حلول موارد بشرية مستدامة وسريعة ودقيقة.",
    fr: "Offrir à nos clients des solutions RH durables, rapides et précises.",
    ru: "Предоставлять клиентам устойчивые, быстрые и точные решения в области персонала.",
  },
  licence: {
    en: "MERÇ GLOBAL İSTİHDAM, Eğitim ve Danışmanlık Ltd. holds a Private Employment Agency Permit from the Turkish Employment Agency (İŞKUR). Document date: 22/09/2011 · Document number: 494.",
    tr: "MERÇ GLOBAL İSTİHDAM, Eğitim ve Danışmanlık Ltd. Türkiye İş Kurumundan Özel İstihdam Bürosu İzin Belgesi Sahibidir. Belge Tarihi: 22/09/2011 · Belge Numarası: 494.",
    ar: "تحمل شركة MERÇ GLOBAL İSTİHDAM, Eğitim ve Danışmanlık Ltd. ترخيص مكتب توظيف خاص صادراً عن مؤسسة التوظيف التركية (İŞKUR). تاريخ الوثيقة: 22/09/2011 · رقم الوثيقة: 494.",
    fr: "MERÇ GLOBAL İSTİHDAM, Eğitim ve Danışmanlık Ltd. est titulaire d'une autorisation d'agence privée de placement délivrée par l'Agence turque pour l'emploi (İŞKUR). Date du document : 22/09/2011 · Numéro : 494.",
    ru: "MERÇ GLOBAL İSTİHDAM, Eğitim ve Danışmanlık Ltd. имеет разрешение частного агентства занятости от Турецкого агентства занятости (İŞKUR). Дата документа: 22/09/2011 · Номер документа: 494.",
  },
  licenceShort: { en: "İŞKUR-licensed private employment agency", tr: "İŞKUR lisanslı özel istihdam bürosu", ar: "مكتب توظيف خاص مرخّص من İŞKUR", fr: "Agence privée de placement agréée İŞKUR", ru: "Частное агентство занятости с лицензией İŞKUR" },
  ctaTitle: { en: "Need qualified staff for your project?", tr: "Projeniz için nitelikli personele mi ihtiyacınız var?", ar: "هل تحتاج إلى كوادر مؤهلة لمشروعك؟", fr: "Besoin de personnel qualifié pour votre projet ?", ru: "Нужен квалифицированный персонал для проекта?" },
  ctaText: {
    en: "Tell us the positions, numbers and timing — our team will plan the right workforce solution for you.",
    tr: "Pozisyonları, kişi sayısını ve zamanlamayı bize iletin; ekibimiz sizin için doğru iş gücü çözümünü planlasın.",
    ar: "أخبرنا بالوظائف والأعداد والتوقيت، وسيخطط فريقنا لحل العمالة المناسب لك.",
    fr: "Indiquez-nous les postes, les effectifs et le calendrier — notre équipe planifiera la solution adaptée.",
    ru: "Сообщите должности, количество и сроки — наша команда подберёт подходящее решение.",
  },
  stat1: { en: "İŞKUR licence since", tr: "İŞKUR lisansı", ar: "مرخّصون من İŞKUR منذ", fr: "Agréés İŞKUR depuis", ru: "Лицензия İŞKUR с" },
  stat2: { en: "Sectors served", tr: "Hizmet verilen sektör", ar: "قطاعات نخدمها", fr: "Secteurs servis", ru: "Отраслей" },
  stat3: { en: "Sourcing regions", tr: "Personel temin bölgesi", ar: "مناطق توفير العمالة", fr: "Régions de recrutement", ru: "Регионов подбора" },
  stat4: { en: "Reference clients", tr: "Referans firma", ar: "عملاء مرجعيون", fr: "Clients de référence", ru: "Клиентов-референций" },
};

// ─── Services ────────────────────────────────────────────────────────────────
export type Service = {
  slug: string;
  icon: "users" | "file" | "wallet" | "plane" | "graduation" | "briefcase";
  image: number;
  title: L;
  short: L;
  long: L;
  listTitle: L;
  list: L[];
};

export const services: Service[] = [
  {
    slug: "international-recruitment",
    icon: "users",
    image: 3,
    title: { en: "International Recruitment", tr: "Uluslararası Personel Temini", ar: "التوظيف الدولي", fr: "Recrutement international", ru: "Международный подбор персонала" },
    short: {
      en: "With our global candidate network we supply engineers, technicians and field personnel quickly, accurately and with a project focus.",
      tr: "Global aday ağımızla mühendis, teknisyen ve saha personelini hızlı, doğru ve proje odaklı şekilde temin ediyoruz.",
      ar: "عبر شبكة مرشحينا العالمية نوفّر المهندسين والفنيين وموظفي المواقع بسرعة ودقة وبتركيز على احتياجات المشروع.",
      fr: "Grâce à notre réseau mondial de candidats, nous fournissons ingénieurs, techniciens et personnel de terrain rapidement, avec précision et selon les besoins du projet.",
      ru: "Через глобальную сеть кандидатов мы быстро и точно подбираем инженеров, техников и полевой персонал под задачи проекта.",
    },
    long: {
      en: "With our wide candidate network around the world, we supply engineers, technicians and blue-collar and white-collar field personnel quickly and accurately.",
      tr: "Dünya genelindeki geniş aday ağımız ile mühendis, teknisyen ve mavi yaka-beyaz yaka saha personelini hızlı ve doğru şekilde temin ediyoruz.",
      ar: "من خلال شبكة مرشحينا الواسعة حول العالم، نوفّر المهندسين والفنيين وموظفي المواقع من ذوي الياقات الزرقاء والبيضاء بسرعة ودقة.",
      fr: "Grâce à notre large réseau de candidats dans le monde entier, nous fournissons rapidement et avec précision des ingénieurs, des techniciens ainsi que du personnel de terrain, cols bleus comme cols blancs.",
      ru: "Благодаря широкой сети кандидатов по всему миру мы быстро и точно подбираем инженеров, техников, а также рабочий и офисный полевой персонал.",
    },
    listTitle: { en: "Main areas we serve", tr: "Hizmet verdiğimiz başlıca alanlar", ar: "أبرز المجالات التي نخدمها", fr: "Principaux domaines", ru: "Основные направления" },
    list: [
      { en: "Oil & Gas", tr: "Oil & Gas", ar: "النفط والغاز", fr: "Pétrole et gaz", ru: "Нефть и газ" },
      { en: "Construction & Infrastructure", tr: "İnşaat & Altyapı", ar: "البناء والبنية التحتية", fr: "Construction et infrastructures", ru: "Строительство и инфраструктура" },
      { en: "Offshore & Marine", tr: "Offshore & Marine", ar: "الأعمال البحرية والأوفشور", fr: "Offshore et maritime", ru: "Офшор и морские работы" },
      { en: "Energy and industrial projects", tr: "Enerji ve sanayi projeleri", ar: "مشاريع الطاقة والصناعة", fr: "Projets énergétiques et industriels", ru: "Энергетические и промышленные проекты" },
      { en: "Logistics and warehousing", tr: "Lojistik ve depolama", ar: "الخدمات اللوجستية والتخزين", fr: "Logistique et entreposage", ru: "Логистика и складирование" },
      { en: "Tourism and services", tr: "Turizm ve hizmet sektörü", ar: "السياحة وقطاع الخدمات", fr: "Tourisme et services", ru: "Туризм и сфера услуг" },
      { en: "Agriculture and livestock", tr: "Tarım ve hayvancılık", ar: "الزراعة وتربية المواشي", fr: "Agriculture et élevage", ru: "Сельское хозяйство и животноводство" },
      { en: "Defence industry and aviation", tr: "Savunma sanayi ve havacılık", ar: "الصناعات الدفاعية والطيران", fr: "Défense et aéronautique", ru: "Оборонная промышленность и авиация" },
    ],
  },
  {
    slug: "work-permit-visa",
    icon: "file",
    image: 0,
    title: { en: "Work Permit & Visa Consultancy", tr: "Çalışma İzni ve Vize Danışmanlığı", ar: "استشارات تصاريح العمل والتأشيرات", fr: "Permis de travail et visas", ru: "Разрешения на работу и визы" },
    short: {
      en: "We manage work permits, residence permits and visa processes for foreign staff end-to-end, within the legal framework.",
      tr: "Yabancı personelin çalışma izni, oturum izni ve vize süreçlerini yasal çerçevede uçtan uca yönetiyoruz.",
      ar: "ندير إجراءات تصاريح العمل والإقامة والتأشيرات للموظفين الأجانب من البداية إلى النهاية ضمن الإطار القانوني.",
      fr: "Nous gérons de bout en bout, dans le cadre légal, les permis de travail, titres de séjour et visas du personnel étranger.",
      ru: "Мы полностью ведём оформление разрешений на работу, видов на жительство и виз для иностранного персонала в рамках закона.",
    },
    long: {
      en: "We manage the legal processes required for foreign staff to work in Türkiye or abroad, in full compliance with the legislation.",
      tr: "Yabancı personelin Türkiye'de veya yurtdışında çalışabilmesi için gerekli yasal süreçleri mevzuata uygun şekilde yönetiyoruz.",
      ar: "ندير الإجراءات القانونية اللازمة لعمل الموظفين الأجانب في تركيا أو خارجها، بما يتوافق تماماً مع التشريعات.",
      fr: "Nous gérons, conformément à la législation, les démarches légales nécessaires pour que le personnel étranger puisse travailler en Turquie ou à l'étranger.",
      ru: "Мы ведём все юридические процедуры, необходимые для работы иностранного персонала в Турции или за рубежом, в полном соответствии с законодательством.",
    },
    listTitle: { en: "Scope", tr: "Kapsam", ar: "نطاق الخدمة", fr: "Périmètre", ru: "Что входит" },
    list: [
      { en: "First applications and extensions", tr: "İlk başvuru ve uzatma işlemleri", ar: "الطلبات الأولى والتمديدات", fr: "Premières demandes et renouvellements", ru: "Первичные заявки и продления" },
      { en: "Social security (SGK) and regulatory procedures", tr: "SGK ve mevzuat süreçleri", ar: "إجراءات الضمان الاجتماعي (SGK) واللوائح", fr: "Sécurité sociale (SGK) et procédures réglementaires", ru: "Соцстрахование (SGK) и нормативные процедуры" },
      { en: "Coordination with official institutions", tr: "Resmi kurum koordinasyonu", ar: "التنسيق مع الجهات الرسمية", fr: "Coordination avec les institutions officielles", ru: "Взаимодействие с госучреждениями" },
      { en: "Residence permit consultancy", tr: "Oturum izni danışmanlığı", ar: "استشارات تصاريح الإقامة", fr: "Conseil en titre de séjour", ru: "Консультации по ВНЖ" },
      { en: "Visa consultancy", tr: "Vize danışmanlığı", ar: "استشارات التأشيرات", fr: "Conseil en visas", ru: "Визовые консультации" },
    ],
  },
  {
    slug: "payroll-office",
    icon: "wallet",
    image: 0,
    title: { en: "Payroll & Office Services", tr: "Bordrolama ve Ofis Hizmetleri", ar: "خدمات الرواتب والمكاتب", fr: "Paie et services de bureau", ru: "Расчёт зарплаты и офисные услуги" },
    short: {
      en: "We provide orderly and transparent support to foreign companies in payroll, financial operations and office processes.",
      tr: "Yabancı şirketler için bordrolama, mali operasyonlar ve ofis süreçlerinde düzenli ve şeffaf destek sağlıyoruz.",
      ar: "نقدّم للشركات الأجنبية دعماً منظماً وشفافاً في إعداد الرواتب والعمليات المالية والأعمال المكتبية.",
      fr: "Nous accompagnons les entreprises étrangères de façon rigoureuse et transparente pour la paie, les opérations financières et les tâches administratives.",
      ru: "Мы оказываем иностранным компаниям чёткую и прозрачную поддержку по расчёту зарплаты, финансовым операциям и офисным процессам.",
    },
    long: {
      en: "For foreign companies in Türkiye, we manage payroll, financial processes and office operations from a single point.",
      tr: "Yabancı şirketler için Türkiye'de bordrolama, mali süreçler ve ofis operasyonlarını tek noktadan yönetiyoruz.",
      ar: "ندير للشركات الأجنبية في تركيا إعداد الرواتب والعمليات المالية والأعمال المكتبية من نقطة واحدة.",
      fr: "Pour les entreprises étrangères en Turquie, nous gérons la paie, les processus financiers et les opérations de bureau depuis un point unique.",
      ru: "Для иностранных компаний в Турции мы ведём расчёт зарплаты, финансовые процессы и офисные операции из одного окна.",
    },
    listTitle: { en: "Service scope", tr: "Hizmet kapsamı", ar: "نطاق الخدمة", fr: "Périmètre du service", ru: "Состав услуги" },
    list: [
      { en: "Regular running of payroll", tr: "Bordrolama süreçlerinin düzenli yürütülmesi", ar: "إدارة الرواتب بانتظام", fr: "Gestion régulière de la paie", ru: "Регулярный расчёт заработной платы" },
      { en: "Operational and administrative office coordination", tr: "Operasyonel ve idari ofis koordinasyonu", ar: "التنسيق التشغيلي والإداري للمكتب", fr: "Coordination opérationnelle et administrative du bureau", ru: "Операционная и административная координация офиса" },
      { en: "Regulation-focused tracking of financial processes", tr: "Mevzuat odaklı mali süreç takibi", ar: "متابعة العمليات المالية وفق اللوائح", fr: "Suivi financier axé sur la réglementation", ru: "Контроль финансовых процессов с учётом законодательства" },
      { en: "Reporting and transparency through a single contact", tr: "Tek muhatap ile raporlama ve süreç şeffaflığı", ar: "تقارير وشفافية عبر جهة اتصال واحدة", fr: "Reporting et transparence via un interlocuteur unique", ru: "Отчётность и прозрачность через единое контактное лицо" },
    ],
  },
  {
    slug: "mobilisation-logistics",
    icon: "plane",
    image: 6,
    title: { en: "Mobilisation & Logistics", tr: "Mobilizasyon ve Lojistik", ar: "التعبئة والخدمات اللوجستية", fr: "Mobilisation et logistique", ru: "Мобилизация и логистика" },
    short: {
      en: "For site mobilisation we plan flights, accommodation, transfers and camp management from a single centre.",
      tr: "Saha mobilizasyonunda uçuş, konaklama, transfer ve kamp yönetimini tek merkezden planlıyoruz.",
      ar: "نخطط لتعبئة المواقع من مركز واحد، بما يشمل الرحلات الجوية والإقامة والتنقلات وإدارة المعسكرات.",
      fr: "Pour la mobilisation sur site, nous planifions vols, hébergement, transferts et gestion des camps depuis un point central.",
      ru: "При мобилизации на объект мы из одного центра планируем перелёты, проживание, трансферы и управление вахтовым лагерем.",
    },
    long: {
      en: "We run mobilisation and logistics planning in an integrated way so that personnel reach the site quickly and smoothly.",
      tr: "Personelin sahaya hızlı ve sorunsuz ulaşması için mobilizasyon ve lojistik planlamayı entegre şekilde yürütüyoruz.",
      ar: "ندير تخطيط التعبئة والخدمات اللوجستية بشكل متكامل لضمان وصول الموظفين إلى الموقع بسرعة ودون عوائق.",
      fr: "Nous menons de façon intégrée la planification de la mobilisation et de la logistique pour que le personnel arrive sur site rapidement et sans encombre.",
      ru: "Мы комплексно планируем мобилизацию и логистику, чтобы персонал прибывал на объект быстро и без проблем.",
    },
    listTitle: { en: "Operation scope", tr: "Operasyon kapsamı", ar: "نطاق العمليات", fr: "Périmètre opérationnel", ru: "Состав работ" },
    list: [
      { en: "Flight arrangements", tr: "Uçuş organizasyonları", ar: "ترتيبات الرحلات الجوية", fr: "Organisation des vols", ru: "Организация перелётов" },
      { en: "Accommodation, catering and camp management", tr: "Konaklama, catering ve kamp yönetimi", ar: "الإقامة والإعاشة وإدارة المعسكرات", fr: "Hébergement, restauration et gestion des camps", ru: "Проживание, питание и управление лагерем" },
      { en: "Transfers and site logistics", tr: "Transfer ve saha lojistiği", ar: "التنقلات والخدمات اللوجستية للموقع", fr: "Transferts et logistique de site", ru: "Трансферы и логистика на объекте" },
    ],
  },
  {
    slug: "training-certification",
    icon: "graduation",
    image: 1,
    title: { en: "Training & Certification", tr: "Eğitim ve Sertifikasyon", ar: "التدريب والاعتماد", fr: "Formation et certification", ru: "Обучение и сертификация" },
    short: {
      en: "We offer vocational training and certification services for the oil, natural gas, energy and industrial fields.",
      tr: "Petrol, doğal gaz, enerji ve endüstriyel alanlar için mesleki eğitim ve sertifikasyon hizmetleri sunuyoruz.",
      ar: "نقدّم خدمات التدريب المهني والاعتماد لقطاعات النفط والغاز الطبيعي والطاقة والمجالات الصناعية.",
      fr: "Nous proposons des formations professionnelles et des certifications pour le pétrole, le gaz naturel, l'énergie et l'industrie.",
      ru: "Мы проводим профессиональное обучение и сертификацию для нефтяной, газовой, энергетической и промышленной сфер.",
    },
    long: {
      en: "We provide vocational training and certification services for the oil, natural gas, energy and other industrial sectors.",
      tr: "Petrol, doğal gaz, enerji ve diğer endüstriyel sektörlere yönelik mesleki eğitim ve sertifikalandırma hizmetleri sunuyoruz.",
      ar: "نقدّم خدمات التدريب المهني ومنح الشهادات لقطاعات النفط والغاز الطبيعي والطاقة وغيرها من القطاعات الصناعية.",
      fr: "Nous proposons des services de formation professionnelle et de certification pour les secteurs du pétrole, du gaz naturel, de l'énergie et d'autres industries.",
      ru: "Мы оказываем услуги профессионального обучения и сертификации для нефтяной, газовой, энергетической и других промышленных отраслей.",
    },
    listTitle: { en: "Training approach", tr: "Eğitim yaklaşımı", ar: "منهجية التدريب", fr: "Approche de formation", ru: "Подход к обучению" },
    list: [
      { en: "Position-based technical training plan", tr: "Pozisyon bazlı teknik eğitim planı", ar: "خطة تدريب فني حسب الوظيفة", fr: "Plan de formation technique par poste", ru: "План технического обучения по должностям" },
      { en: "Site safety and process compliance training", tr: "Saha güvenliği ve süreç uyum eğitimleri", ar: "تدريب على سلامة المواقع والامتثال للإجراءات", fr: "Formations sécurité sur site et conformité des procédures", ru: "Обучение технике безопасности и соблюдению процедур" },
      { en: "Vocational competence and certification support", tr: "Mesleki yeterlilik ve sertifikasyon desteği", ar: "دعم الكفاءة المهنية والحصول على الشهادات", fr: "Accompagnement aux qualifications et certifications professionnelles", ru: "Поддержка в подтверждении квалификации и сертификации" },
      { en: "Competence development aligned with project goals", tr: "Proje hedeflerine uygun yetkinlik geliştirme", ar: "تطوير الكفاءات بما يتوافق مع أهداف المشروع", fr: "Développement des compétences selon les objectifs du projet", ru: "Развитие компетенций под цели проекта" },
    ],
  },
  {
    slug: "consulting-project-management",
    icon: "briefcase",
    image: 7,
    title: { en: "Consulting & Project Management", tr: "Danışmanlık ve Proje Yönetimi", ar: "الاستشارات وإدارة المشاريع", fr: "Conseil et gestion de projet", ru: "Консалтинг и управление проектами" },
    short: {
      en: "We provide decision-support corporate consultancy in workforce planning and project management.",
      tr: "İnsan kaynağı planlaması ve proje yönetimi süreçlerinde karar destekli kurumsal danışmanlık veriyoruz.",
      ar: "نقدّم استشارات مؤسسية داعمة لاتخاذ القرار في تخطيط الموارد البشرية وإدارة المشاريع.",
      fr: "Nous apportons un conseil d'entreprise d'aide à la décision en planification des effectifs et en gestion de projet.",
      ru: "Мы оказываем корпоративные консультации для принятия решений по планированию персонала и управлению проектами.",
    },
    long: {
      en: "We provide professional consultancy on human-resource planning, organisational structure and project management.",
      tr: "İnsan kaynakları planlaması, organizasyon yapısı ve proje yönetimi konularında profesyonel danışmanlık sağlıyoruz.",
      ar: "نقدّم استشارات احترافية في تخطيط الموارد البشرية والهيكل التنظيمي وإدارة المشاريع.",
      fr: "Nous offrons un conseil professionnel en planification des ressources humaines, structure organisationnelle et gestion de projet.",
      ru: "Мы оказываем профессиональные консультации по планированию персонала, организационной структуре и управлению проектами.",
    },
    listTitle: { en: "Corporate support topics", tr: "Kurumsal destek başlıkları", ar: "مجالات الدعم المؤسسي", fr: "Domaines d'accompagnement", ru: "Направления поддержки" },
    list: [
      { en: "Workforce planning and capacity modelling", tr: "İnsan kaynağı planlama ve kapasite modelleme", ar: "تخطيط القوى العاملة ونمذجة القدرات", fr: "Planification des effectifs et modélisation des capacités", ru: "Планирование персонала и моделирование мощностей" },
      { en: "Organisational structure and job descriptions", tr: "Organizasyon yapısı ve görev tanımı kurgusu", ar: "الهيكل التنظيمي والأوصاف الوظيفية", fr: "Structure organisationnelle et fiches de poste", ru: "Оргструктура и должностные инструкции" },
      { en: "On-schedule coordination of project processes", tr: "Proje süreçlerinin takvime uygun koordinasyonu", ar: "تنسيق مراحل المشروع وفق الجدول الزمني", fr: "Coordination des processus du projet dans les délais", ru: "Координация процессов проекта в срок" },
      { en: "Decision support focused on risk, cost and efficiency", tr: "Risk, maliyet ve verimlilik odaklı karar desteği", ar: "دعم القرار مع التركيز على المخاطر والتكلفة والكفاءة", fr: "Aide à la décision axée sur les risques, les coûts et l'efficacité", ru: "Поддержка решений с учётом рисков, затрат и эффективности" },
    ],
  },
];

// Work-permit page extra: 2026 fees and criteria (as published on the original site).
export const permitInfo = {
  title: {
    en: "2026 work permit fees and foreign employment criteria",
    tr: "2026 Güncel Çalışma İzni Harçları ve Yabancı İstihdam Kriterleri",
    ar: "رسوم تصاريح العمل لعام 2026 ومعايير توظيف الأجانب",
    fr: "Frais de permis de travail 2026 et critères d'emploi des étrangers",
    ru: "Пошлины за разрешение на работу в 2026 году и критерии найма иностранцев",
  },
  intro: {
    en: "Fee items valid as of 2026 in Türkiye, and the main criteria employers should consider.",
    tr: "2026 yılı itibarıyla geçerli harç kalemleri ve işverenlerin dikkat etmesi gereken temel kriterler.",
    ar: "بنود الرسوم السارية في تركيا اعتباراً من عام 2026، والمعايير الأساسية التي ينبغي لأصحاب العمل مراعاتها.",
    fr: "Frais en vigueur en Turquie à partir de 2026 et principaux critères à respecter par les employeurs.",
    ru: "Пошлины, действующие в Турции с 2026 года, и основные критерии для работодателей.",
  },
  feesTitle: { en: "2026 work permit fees", tr: "2026 Çalışma İzni Harçları", ar: "رسوم تصاريح العمل 2026", fr: "Frais de permis de travail 2026", ru: "Пошлины 2026 года" },
  fees: [
    [{ en: "Fixed-term work permit (up to 1 year)", tr: "Süreli çalışma izni (1 yıla kadar)", ar: "تصريح عمل محدد المدة (حتى سنة)", fr: "Permis de travail à durée déterminée (jusqu'à 1 an)", ru: "Срочное разрешение (до 1 года)" }, "12.574,90 TL"],
    [{ en: "Indefinite work permit", tr: "Süresiz çalışma izni", ar: "تصريح عمل غير محدد المدة", fr: "Permis de travail à durée indéterminée", ru: "Бессрочное разрешение" }, "125.802,20 TL"],
    [{ en: "Independent work permit", tr: "Bağımsız çalışma izni", ar: "تصريح عمل مستقل", fr: "Permis de travail indépendant", ru: "Разрешение для самозанятых" }, "125.802,20 TL"],
    [{ en: "Work permit card fee", tr: "Çalışma izni kart bedeli", ar: "رسوم بطاقة تصريح العمل", fr: "Frais de carte de permis", ru: "Стоимость карты разрешения" }, "964 TL"],
  ] as [L, string][],
  feesNote: {
    en: "Stamp duty and related notification costs may be calculated separately depending on the application type.",
    tr: "Damga vergisi ve ilgili bildirim giderleri başvuru türüne göre ayrıca hesaplanabilir.",
    ar: "قد تُحتسب ضريبة الدمغة ومصاريف الإشعارات ذات الصلة بشكل منفصل حسب نوع الطلب.",
    fr: "Le droit de timbre et les frais de notification peuvent être calculés séparément selon le type de demande.",
    ru: "Гербовый сбор и сопутствующие расходы могут рассчитываться отдельно в зависимости от типа заявки.",
  },
  criteriaTitle: { en: "Foreign employment criteria", tr: "Yabancı İstihdamı Kriterleri", ar: "معايير توظيف الأجانب", fr: "Critères d'emploi des étrangers", ru: "Критерии найма иностранцев" },
  criteria: [
    {
      en: "As a general rule, at least 5 Turkish employees are expected for each foreign employee: 1 foreigner : 5 Turkish employees, 2 : 10, 3 : 15.",
      tr: "Genel uygulamada 1 yabancı çalışan için en az 5 Türk çalışan istihdamı beklenir. 1 yabancı: 5 Türk çalışan, 2 yabancı: 10 Türk çalışan, 3 yabancı: 15 Türk çalışan.",
      ar: "كقاعدة عامة، يُشترط توظيف 5 موظفين أتراك على الأقل مقابل كل موظف أجنبي: أجنبي واحد : 5 أتراك، 2 : 10، 3 : 15.",
      fr: "En règle générale, au moins 5 salariés turcs sont attendus pour chaque salarié étranger : 1 étranger : 5 Turcs, 2 : 10, 3 : 15.",
      ru: "Как правило, на каждого иностранного сотрудника требуется не менее 5 турецких: 1 иностранец : 5 граждан Турции, 2 : 10, 3 : 15.",
    },
    {
      en: "The company must be active and operating, with financial adequacy and a suitable position.",
      tr: "Şirketin aktif ve faal olması, mali yeterlilik ve pozisyon uyumu aranır.",
      ar: "يجب أن تكون الشركة نشطة وعاملة، مع ملاءة مالية ومواءمة الوظيفة.",
      fr: "L'entreprise doit être active, financièrement solide et le poste doit être adapté.",
      ru: "Компания должна быть действующей, финансово состоятельной, а должность — соответствующей.",
    },
    {
      en: "The foreign employee's qualifications must match the job description.",
      tr: "Yabancı çalışanın niteliği ile görev tanımının örtüşmesi gerekir.",
      ar: "يجب أن تتطابق مؤهلات الموظف الأجنبي مع الوصف الوظيفي.",
      fr: "Les qualifications du salarié étranger doivent correspondre à la fiche de poste.",
      ru: "Квалификация иностранного сотрудника должна соответствовать должностным обязанностям.",
    },
  ] as L[],
  wageTitle: { en: "Wage criteria", tr: "Ücret Kriteri", ar: "معايير الأجور", fr: "Critères de salaire", ru: "Требования к зарплате" },
  wages: [
    [{ en: "Senior executives", tr: "Üst düzey yöneticiler", ar: "كبار المديرين", fr: "Cadres dirigeants", ru: "Топ-менеджеры" }, { en: "5× minimum wage", tr: "Asgari ücretin 5 katı", ar: "5 أضعاف الحد الأدنى للأجور", fr: "5 × le salaire minimum", ru: "5 МРОТ" }],
    [{ en: "Engineers and architects", tr: "Mühendis ve mimarlar", ar: "المهندسون والمعماريون", fr: "Ingénieurs et architectes", ru: "Инженеры и архитекторы" }, { en: "4× minimum wage", tr: "Asgari ücretin 4 katı", ar: "4 أضعاف الحد الأدنى للأجور", fr: "4 × le salaire minimum", ru: "4 МРОТ" }],
    [{ en: "Specialist and managerial positions", tr: "Uzmanlık ve yönetici pozisyonları", ar: "الوظائف التخصصية والإدارية", fr: "Postes spécialisés et d'encadrement", ru: "Специалисты и руководители" }, { en: "3× minimum wage", tr: "Asgari ücretin 3 katı", ar: "3 أضعاف الحد الأدنى للأجور", fr: "3 × le salaire minimum", ru: "3 МРОТ" }],
    [{ en: "Certain other positions", tr: "Diğer bazı pozisyonlar", ar: "بعض الوظائف الأخرى", fr: "Certains autres postes", ru: "Некоторые другие должности" }, { en: "At least the minimum wage", tr: "En az asgari ücret düzeyi", ar: "الحد الأدنى للأجور على الأقل", fr: "Au moins le salaire minimum", ru: "Не ниже МРОТ" }],
  ] as [L, L][],
};

// ─── Sectors (each matches one of the original site's slider photos) ─────────
export type Sector = { slug: string; image: number; title: L; text: L };

export const sectors: Sector[] = [
  {
    slug: "oil-gas",
    image: 1,
    title: { en: "Oil & Natural Gas", tr: "Petrol & Doğal Gaz", ar: "النفط والغاز الطبيعي", fr: "Pétrole et gaz naturel", ru: "Нефть и природный газ" },
    text: {
      en: "Experienced engineers, technical specialists and field crews who can work on upstream, downstream and offshore projects.",
      tr: "Upstream, downstream ve offshore projelerde görev alabilecek deneyimli mühendisler, teknik uzmanlar ve saha ekipleri temin edilmektedir.",
      ar: "نوفّر مهندسين ذوي خبرة وأخصائيين فنيين وفرق ميدانية قادرة على العمل في مشاريع المنبع والمصب والمشاريع البحرية.",
      fr: "Des ingénieurs expérimentés, des spécialistes techniques et des équipes de terrain pour les projets amont, aval et offshore.",
      ru: "Опытные инженеры, технические специалисты и полевые бригады для проектов апстрим, даунстрим и офшор.",
    },
  },
  {
    slug: "energy-power",
    image: 2,
    title: { en: "Energy & Power", tr: "Enerji ve Güç", ar: "الطاقة والكهرباء", fr: "Énergie et électricité", ru: "Энергетика" },
    text: {
      en: "Expert technical teams for electricity generation facilities, power plants and renewable energy projects.",
      tr: "Elektrik üretim tesisleri, enerji santralleri ve yenilenebilir enerji projeleri için uzman teknik kadrolar sağlanmaktadır.",
      ar: "كوادر فنية متخصصة لمنشآت توليد الكهرباء ومحطات الطاقة ومشاريع الطاقة المتجددة.",
      fr: "Des équipes techniques expertes pour les installations de production d'électricité, les centrales et les projets d'énergies renouvelables.",
      ru: "Опытные технические кадры для объектов генерации, электростанций и проектов возобновляемой энергетики.",
    },
  },
  {
    slug: "construction-infrastructure",
    image: 3,
    title: { en: "Construction & Infrastructure", tr: "İnşaat ve Altyapı", ar: "البناء والبنية التحتية", fr: "Construction et infrastructures", ru: "Строительство и инфраструктура" },
    text: {
      en: "Engineering staff, technical office teams, foremen, craftsmen and blue-collar site personnel for large-scale building and infrastructure projects.",
      tr: "Büyük ölçekli üstyapı ve altyapı projeleri için mühendislik kadroları, teknik ofis ekipleri, formen, usta ve mavi yaka saha personeli temini gerçekleştirilmektedir.",
      ar: "كوادر هندسية وفرق مكاتب فنية ومشرفون وحرفيون وعمالة ميدانية لمشاريع البناء والبنية التحتية الكبرى.",
      fr: "Ingénieurs, équipes de bureau technique, contremaîtres, artisans et ouvriers de chantier pour les grands projets de bâtiment et d'infrastructures.",
      ru: "Инженеры, сотрудники технического отдела, прорабы, мастера и рабочие для крупных строительных и инфраструктурных проектов.",
    },
  },
  {
    slug: "offshore-marine-dredging",
    image: 4,
    title: { en: "Offshore, Marine & Dredging", tr: "Offshore, Marine ve Dredging", ar: "الأعمال البحرية والأوفشور والتجريف", fr: "Offshore, maritime et dragage", ru: "Офшор, морские работы и дноуглубление" },
    text: {
      en: "Highly experienced specialist teams for marine structures, port projects, dredging operations and offshore projects.",
      tr: "Deniz yapıları, liman projeleri, dredging operasyonları ve offshore projeler için yüksek tecrübeli uzman ekipler sağlanmaktadır.",
      ar: "فرق متخصصة عالية الخبرة للمنشآت البحرية ومشاريع الموانئ وعمليات التجريف والمشاريع البحرية.",
      fr: "Des équipes spécialisées très expérimentées pour les ouvrages maritimes, les projets portuaires, le dragage et l'offshore.",
      ru: "Высокоопытные специалисты для морских сооружений, портовых проектов, дноуглубительных работ и офшорных проектов.",
    },
  },
  {
    slug: "agriculture-livestock",
    image: 5,
    title: { en: "Agriculture & Livestock", tr: "Tarım ve Hayvancılık", ar: "الزراعة وتربية المواشي", fr: "Agriculture et élevage", ru: "Сельское хозяйство и животноводство" },
    text: {
      en: "Experienced shepherds, animal caretakers, other labour and farm personnel for agricultural and livestock businesses.",
      tr: "Tarım ve hayvancılık işletmeleri için; deneyimli çoban, hayvan bakıcısı, diğer iş gücü ve arazi personeli temini gerçekleştirilmektedir.",
      ar: "رعاة ذوو خبرة ومربّو حيوانات وعمالة أخرى وموظفو أراضٍ لمنشآت الزراعة وتربية المواشي.",
      fr: "Bergers expérimentés, soigneurs d'animaux, main-d'œuvre et personnel agricole pour les exploitations agricoles et d'élevage.",
      ru: "Опытные пастухи, работники по уходу за животными, разнорабочие и полевой персонал для аграрных и животноводческих хозяйств.",
    },
  },
  {
    slug: "logistics-transport",
    image: 6,
    title: { en: "Logistics & Transport", tr: "Lojistik ve Taşımacılık", ar: "الخدمات اللوجستية والنقل", fr: "Logistique et transport", ru: "Логистика и транспорт" },
    text: {
      en: "All the operational staff needed for warehousing, transport and site-support operations.",
      tr: "Depolama, taşıma ve saha destek operasyonları için gerekli tüm operasyonel personel sağlanmaktadır.",
      ar: "جميع الكوادر التشغيلية اللازمة لعمليات التخزين والنقل ودعم المواقع.",
      fr: "Tout le personnel opérationnel nécessaire à l'entreposage, au transport et au soutien sur site.",
      ru: "Весь операционный персонал для складских, транспортных и вспомогательных работ на объектах.",
    },
  },
  {
    slug: "manufacturing-industry",
    image: 7,
    title: { en: "Manufacturing & Industry", tr: "İmalat ve Sanayi", ar: "التصنيع والصناعة", fr: "Fabrication et industrie", ru: "Производство и промышленность" },
    text: {
      en: "Qualified technical and production staff for organised industrial zones, factories and production plants.",
      tr: "OSB'ler, fabrikalar ve üretim tesisleri için nitelikli teknik ve üretim personeli temin edilmektedir.",
      ar: "كوادر فنية وإنتاجية مؤهلة للمناطق الصناعية المنظمة والمصانع ومنشآت الإنتاج.",
      fr: "Personnel technique et de production qualifié pour les zones industrielles, usines et sites de production.",
      ru: "Квалифицированный технический и производственный персонал для промзон, заводов и производственных площадок.",
    },
  },
  {
    slug: "tourism-hospitality",
    image: 8,
    title: { en: "Tourism & Hospitality", tr: "Turizm ve Hizmet Sektörü", ar: "السياحة وقطاع الخدمات", fr: "Tourisme et services", ru: "Туризм и сфера услуг" },
    text: {
      en: "Operational support staff for hotels, restaurants and service businesses.",
      tr: "Otel, restoran ve hizmet işletmeleri için operasyonel destek personeli sağlanmaktadır.",
      ar: "كوادر دعم تشغيلي للفنادق والمطاعم ومنشآت الخدمات.",
      fr: "Personnel de soutien opérationnel pour les hôtels, restaurants et entreprises de services.",
      ru: "Операционный персонал для отелей, ресторанов и предприятий сферы услуг.",
    },
  },
  {
    slug: "aviation-defence",
    image: 9,
    title: { en: "Aviation & Defence Industry", tr: "Havacılık ve Savunma Sanayii", ar: "الطيران والصناعات الدفاعية", fr: "Aéronautique et défense", ru: "Авиация и оборонная промышленность" },
    text: {
      en: "Technical and engineering staff who can work on aviation and defence projects.",
      tr: "Havacılık ve savunma projelerinde görev alabilecek teknik ve mühendislik kadroları temin edilmektedir.",
      ar: "كوادر فنية وهندسية قادرة على العمل في مشاريع الطيران والدفاع.",
      fr: "Personnel technique et d'ingénierie pour les projets aéronautiques et de défense.",
      ru: "Технические и инженерные кадры для авиационных и оборонных проектов.",
    },
  },
];

// ─── Sourcing regions ────────────────────────────────────────────────────────
export type Region = { id: string; title: L; text: L };

export const regions: Region[] = [
  {
    id: "turkic-cis",
    title: { en: "Türkiye, Turkic Republics & CIS", tr: "Türkiye, Türk Cumhuriyetleri ve CIS Ülkeleri", ar: "تركيا والجمهوريات التركية ودول رابطة الدول المستقلة", fr: "Turquie, républiques turciques et CEI", ru: "Турция, тюркские республики и СНГ" },
    text: {
      en: "A strong, experienced candidate pool, led by Türkiye, Azerbaijan, Kazakhstan, Uzbekistan, Turkmenistan and Ukraine.",
      tr: "Türkiye, Azerbaycan, Kazakistan, Özbekistan, Türkmenistan ve Ukrayna başta olmak üzere güçlü ve deneyimli aday havuzu.",
      ar: "قاعدة مرشحين قوية وذات خبرة، في مقدمتها تركيا وأذربيجان وكازاخستان وأوزبكستان وتركمانستان وأوكرانيا.",
      fr: "Un vivier de candidats solide et expérimenté, notamment en Turquie, Azerbaïdjan, Kazakhstan, Ouzbékistan, Turkménistan et Ukraine.",
      ru: "Сильная база опытных кандидатов — прежде всего из Турции, Азербайджана, Казахстана, Узбекистана, Туркменистана и Украины.",
    },
  },
  {
    id: "africa",
    title: { en: "African Countries", tr: "Afrika Ülkeleri", ar: "الدول الأفريقية", fr: "Pays d'Afrique", ru: "Страны Африки" },
    text: {
      en: "Wide workforce supply from Algeria, Egypt, Tunisia, Nigeria, Kenya, Uganda, Zambia, Ghana and other African countries.",
      tr: "Cezayir, Mısır, Tunus, Nijerya, Kenya, Uganda, Zambiya, Gana ve diğer Afrika ülkelerinden geniş iş gücü temini.",
      ar: "توفير واسع للعمالة من الجزائر ومصر وتونس ونيجيريا وكينيا وأوغندا وزامبيا وغانا وغيرها من الدول الأفريقية.",
      fr: "Large fourniture de main-d'œuvre depuis l'Algérie, l'Égypte, la Tunisie, le Nigeria, le Kenya, l'Ouganda, la Zambie, le Ghana et d'autres pays africains.",
      ru: "Широкий подбор персонала из Алжира, Египта, Туниса, Нигерии, Кении, Уганды, Замбии, Ганы и других стран Африки.",
    },
  },
  {
    id: "asia",
    title: { en: "Asian Countries", tr: "Asya Ülkeleri", ar: "الدول الآسيوية", fr: "Pays d'Asie", ru: "Страны Азии" },
    text: {
      en: "Qualified workforce from Afghanistan, India, Pakistan, Bangladesh, Nepal, Vietnam, the Philippines and Indonesia.",
      tr: "Afganistan, Hindistan, Pakistan, Bangladeş, Nepal, Vietnam, Filipinler ve Endonezya kaynaklı nitelikli iş gücü.",
      ar: "عمالة مؤهلة من أفغانستان والهند وباكستان وبنغلاديش ونيبال وفيتنام والفلبين وإندونيسيا.",
      fr: "Main-d'œuvre qualifiée d'Afghanistan, d'Inde, du Pakistan, du Bangladesh, du Népal, du Vietnam, des Philippines et d'Indonésie.",
      ru: "Квалифицированный персонал из Афганистана, Индии, Пакистана, Бангладеш, Непала, Вьетнама, Филиппин и Индонезии.",
    },
  },
  {
    id: "europe-balkans",
    title: { en: "Europe & the Balkans", tr: "Avrupa ve Balkan Ülkeleri", ar: "أوروبا ودول البلقان", fr: "Europe et Balkans", ru: "Европа и Балканы" },
    text: {
      en: "Technical teams from the UK, Italy, Romania, Bulgaria, Serbia, Bosnia and Herzegovina, Albania and North Macedonia.",
      tr: "UK, İtalya, Romanya, Bulgaristan, Sırbistan, Bosna Hersek, Arnavutluk ve Kuzey Makedonya'dan teknik kadrolar.",
      ar: "كوادر فنية من المملكة المتحدة وإيطاليا ورومانيا وبلغاريا وصربيا والبوسنة والهرسك وألبانيا ومقدونيا الشمالية.",
      fr: "Des équipes techniques du Royaume-Uni, d'Italie, de Roumanie, de Bulgarie, de Serbie, de Bosnie-Herzégovine, d'Albanie et de Macédoine du Nord.",
      ru: "Технические кадры из Великобритании, Италии, Румынии, Болгарии, Сербии, Боснии и Герцеговины, Албании и Северной Македонии.",
    },
  },
];

export const advantagesTitle: L = { en: "Our advantages", tr: "Avantajlarımız", ar: "مزايانا", fr: "Nos atouts", ru: "Наши преимущества" };
export const advantages: L[] = [
  { en: "Wide, verified candidate portfolio", tr: "Geniş ve doğrulanmış aday portföyü", ar: "قاعدة مرشحين واسعة وموثّقة", fr: "Vivier de candidats large et vérifié", ru: "Широкая проверенная база кандидатов" },
  { en: "Fast mobilisation", tr: "Hızlı mobilizasyon", ar: "تعبئة سريعة", fr: "Mobilisation rapide", ru: "Быстрая мобилизация" },
  { en: "Solutions for different budgets", tr: "Farklı bütçelere uygun çözümler", ar: "حلول تناسب مختلف الميزانيات", fr: "Solutions adaptées à chaque budget", ru: "Решения под разный бюджет" },
  { en: "International recruitment experience", tr: "Uluslararası işe alım deneyimi", ar: "خبرة في التوظيف الدولي", fr: "Expérience du recrutement international", ru: "Опыт международного найма" },
];

// ─── Licences & certificates ─────────────────────────────────────────────────
export const legal = {
  intro: {
    en: "Merç Global carries out its activities in accordance with the legislation of the Republic of Türkiye and holds the approvals of the competent authorities. Our company is authorised by the Turkish Employment Agency (İŞKUR) and operates as a private employment agency.",
    tr: "Merç Global, faaliyetlerini Türkiye Cumhuriyeti mevzuatına uygun şekilde yürütmekte olup, yetkili kurumlar tarafından onaylı bir yapıya sahiptir. Şirketimiz, Türkiye İş Kurumu (İŞKUR) tarafından yetkilendirilmiş olup, özel istihdam bürosu kapsamında hizmet vermektedir.",
    ar: "تمارس Merç Global أنشطتها وفقاً لتشريعات الجمهورية التركية، وتحظى بموافقة الجهات المختصة. وشركتنا مفوّضة من مؤسسة التوظيف التركية (İŞKUR) وتعمل بصفة مكتب توظيف خاص.",
    fr: "Merç Global exerce ses activités conformément à la législation de la République de Turquie et dispose des agréments des autorités compétentes. Notre société est autorisée par l'Agence turque pour l'emploi (İŞKUR) et opère en tant qu'agence privée de placement.",
    ru: "Merç Global ведёт деятельность в соответствии с законодательством Турецкой Республики и имеет одобрение уполномоченных органов. Компания авторизована Турецким агентством занятости (İŞKUR) и работает как частное агентство занятости.",
  },
  compTitle: { en: "Our legal competences", tr: "Yasal Yetkinliklerimiz", ar: "صلاحياتنا القانونية", fr: "Nos habilitations légales", ru: "Наши правовые полномочия" },
  comp: [
    { en: "İŞKUR-licensed private employment agency", tr: "İŞKUR lisanslı özel istihdam bürosu", ar: "مكتب توظيف خاص مرخّص من İŞKUR", fr: "Agence privée de placement agréée İŞKUR", ru: "Частное агентство занятости с лицензией İŞKUR" },
    { en: "Authorised for international workforce supply", tr: "Uluslararası iş gücü temini yetkinliği", ar: "مخوّلون لتوفير العمالة الدولية", fr: "Habilitée à la fourniture de main-d'œuvre internationale", ru: "Право на международный подбор персонала" },
    { en: "Full compliance with legislation in work-permit processes", tr: "Çalışma izni süreçlerinde mevzuata tam uyum", ar: "امتثال كامل للتشريعات في إجراءات تصاريح العمل", fr: "Pleine conformité légale dans les démarches de permis de travail", ru: "Полное соблюдение закона при оформлении разрешений на работу" },
    { en: "Process management integrated with SGK and other official bodies", tr: "SGK ve ilgili resmi kurumlarla bütünleşmiş süreç yönetimi", ar: "إدارة إجراءات متكاملة مع SGK والجهات الرسمية المعنية", fr: "Gestion des démarches intégrée avec la SGK et les organismes officiels", ru: "Процессы, интегрированные с SGK и другими госорганами" },
  ] as L[],
  outro: {
    en: "All our services are carried out in line with current legal regulations, offering our clients a safe and transparent service.",
    tr: "Tüm hizmetlerimiz, güncel yasal düzenlemelere uygun olarak yürütülmekte olup, müşterilerimize güvenli ve şeffaf bir hizmet sunulmaktadır.",
    ar: "تُنفَّذ جميع خدماتنا وفقاً للأنظمة القانونية السارية، بما يوفّر لعملائنا خدمة آمنة وشفافة.",
    fr: "Tous nos services sont réalisés conformément à la réglementation en vigueur, pour un service sûr et transparent.",
    ru: "Все услуги оказываются в соответствии с действующим законодательством, что гарантирует клиентам безопасность и прозрачность.",
  },
  docs: [
    { en: "İŞKUR Private Employment Agency Permit (2024–2027)", tr: "İŞKUR Özel İstihdam Bürosu İzin Belgesi (2024–2027)", ar: "ترخيص مكتب التوظيف الخاص من İŞKUR (2024–2027)", fr: "Autorisation d'agence privée de placement İŞKUR (2024–2027)", ru: "Разрешение İŞKUR для частного агентства занятости (2024–2027)" },
    { en: "İŞKUR Private Employment Agency Permit (2021–2024)", tr: "İŞKUR Özel İstihdam Bürosu İzin Belgesi (2021–2024)", ar: "ترخيص مكتب التوظيف الخاص من İŞKUR (2021–2024)", fr: "Autorisation d'agence privée de placement İŞKUR (2021–2024)", ru: "Разрешение İŞKUR для частного агентства занятости (2021–2024)" },
    { en: "Private Employment Agency Permission Certificate — English (2021–2024)", tr: "Özel İstihdam Bürosu İzin Belgesi — İngilizce (2021–2024)", ar: "شهادة ترخيص مكتب التوظيف الخاص — بالإنجليزية (2021–2024)", fr: "Certificat d'autorisation — version anglaise (2021–2024)", ru: "Разрешение частного агентства — на английском (2021–2024)" },
    { en: "İŞKUR Private Employment Agency Permit (2011–2014)", tr: "İŞKUR Özel İstihdam Bürosu İzin Belgesi (2011–2014)", ar: "ترخيص مكتب التوظيف الخاص من İŞKUR (2011–2014)", fr: "Autorisation d'agence privée de placement İŞKUR (2011–2014)", ru: "Разрешение İŞKUR для частного агентства занятости (2011–2014)" },
    { en: "İŞKUR Private Employment Agency Permit (2021–2024, copy)", tr: "İŞKUR Özel İstihdam Bürosu İzin Belgesi (2021–2024, suret)", ar: "ترخيص مكتب التوظيف الخاص من İŞKUR (2021–2024، نسخة)", fr: "Autorisation İŞKUR (2021–2024, copie)", ru: "Разрешение İŞKUR (2021–2024, копия)" },
    { en: "Ankara Chamber of Commerce registration", tr: "Ankara Ticaret Odası kayıt belgesi", ar: "شهادة القيد في غرفة تجارة أنقرة", fr: "Inscription à la Chambre de commerce d'Ankara", ru: "Регистрация в Торговой палате Анкары" },
  ] as L[],
};

// ─── References ──────────────────────────────────────────────────────────────
export const refs = {
  intlTitle: { en: "International clients — Oil & Gas and Construction", tr: "Uluslararası müşterilerimiz — Petrol & Gaz ve İnşaat", ar: "عملاؤنا الدوليون — النفط والغاز والبناء", fr: "Clients internationaux — Pétrole, gaz et construction", ru: "Международные клиенты — нефть, газ и строительство" },
  intl: [
    "Al-Mawarid Group — K.S.A.", "Al-Mabani Group — K.S.A.", "Al-Mansouriyah Construction Co — K.S.A.", "Saudi Freysinet Construction Co — K.S.A.",
    "Yamama Saudi Cement Factory — K.S.A.", "Riyadh Furniture Industries — K.S.A.", "Saipem Saudi Arabia Co — K.S.A.", "Techint Saudi Arabia Co — K.S.A.",
    "Solel Boneh Group — Africa", "Cementcal Construction — Russia", "Drucker Zakaria Construction — Russia", "Solomon Construction — Caribbean",
    "F.K. Construction Co — Togo, Benin, Nigeria", "Saudi Oger Group — K.S.A.", "Saudi Elevator-Schindler Co — K.S.A.", "Al-Redwan Group — K.S.A.",
    "HCS Industrial — U.S.A., Jordan", "OHL Andalucía — Spain", "FCC La Línea Andalucía — Spain", "ETOS Oilfield Services Co — Libya",
    "TIGI Oil Field Services Co — Libya", "Jabel Oil Services Co — Libya", "Al Tayiba Investment — K.S.A.", "Ferretti International — Libya",
    "Tabuk Military City — Tabuk, K.S.A.", "Foster Wheeler Turkey — Aruba", "SARPI (ABB + Sonatrach) Co — Algeria", "Chiyoda Corporation — Japan, Middle East projects",
    "Maskan Arabia Co — Riyadh, K.S.A.", "Petrobras — Brazil", "Bonatti — Italy, Iraq oil exploration project", "QAFCO — Qatar Fertiliser Company",
    "Gulf Catering Services — Iraq, Basra BP project", "ATA Defence Recruitment — Afghanistan army projects", "GS E&C (Korea) — Middle East projects", "Hyundai E&C — Zubair oilfield project, Basra, Iraq",
    "STX Heavy Industries — Iraq power plant projects", "GASCO — Gas plant projects in the UAE", "Shanahan Engineering Co — Ireland / Turkey", "Rebyana Oil Services — Libya",
    "Stateco Construction Co — Nigeria", "Nas Airways Co — Saudi Arabia", "Dorsch Holding GmbH — UAE and Qatar", "CCE — Saudi Arabia",
    "BB Saraf & Al Saraf Co — Lebanon and Iraq", "Trillium Holding — Lebanon",
  ],
  trTitle: { en: "Projects in Türkiye and Turkish companies", tr: "Türkiye projeleri ve Türk firmaları", ar: "مشاريع في تركيا وشركات تركية", fr: "Projets en Turquie et entreprises turques", ru: "Проекты в Турции и турецкие компании" },
  tr: [
    "Geolog International — Netherlands / Turkey offshore project", "ESB International — Ireland & Turkey", "Aslan International Group — Iraq / Turkey", "Uruk Engineering — Iraq / UAE / Turkey",
    "Efor Endüstri — Malıköy, Ankara", "Tosyalı & Toyo Steel — Osmaniye", "Mitsubishi HI — Tosyalı Toyo Steel Plant, Osmaniye", "Hitachi Heavy Industries — Tosyalı Toyo Steel Plant, Osmaniye",
    "GAMA Power — Kabat Power Plant, Iraq / Turkey", "Alarko — Kazakhstan / Morocco / Turkey", "Samsung C&T — Kırıkkale CCPP project", "Trans Globe Energy USA — inspection services in Turkey",
  ],
  medTitle: { en: "Medical recruitment clients", tr: "Medikal personel temini müşterilerimiz", ar: "عملاء التوظيف الطبي", fr: "Clients du recrutement médical", ru: "Клиенты по подбору медперсонала" },
  med: [
    {
      name: "Iraq Ministry of Health (2013–2015)",
      text: {
        en: "We recruited 110 medical staff from Pakistan and Türkiye: doctors, nurses, hospital managers, biologists and physiotherapists.",
        tr: "Pakistan ve Türkiye'den 110 sağlık personeli temin ettik: doktor, hemşire, hastane müdürü, biyolog ve fizyoterapist.",
        ar: "وفّرنا 110 من الكوادر الطبية من باكستان وتركيا: أطباء وممرضون ومديرو مستشفيات وأخصائيو أحياء ومعالجون فيزيائيون.",
        fr: "Nous avons recruté 110 professionnels de santé au Pakistan et en Turquie : médecins, infirmiers, directeurs d'hôpital, biologistes et kinésithérapeutes.",
        ru: "Мы подобрали 110 медработников из Пакистана и Турции: врачей, медсестёр, руководителей больниц, биологов и физиотерапевтов.",
      },
    },
    {
      name: "Ankara Private Bilgi Hospital (2012–2014)",
      text: {
        en: "We recruited 45 staff from Türkiye: doctors, nurses, hospital managers, administrative staff, medical secretaries and IT technicians.",
        tr: "Türkiye'den 45 personel temin ettik: doktor, hemşire, hastane müdürü, idari personel, tıbbi sekreter ve IT teknisyeni.",
        ar: "وفّرنا 45 موظفاً من تركيا: أطباء وممرضون ومديرو مستشفيات وموظفون إداريون وسكرتارية طبية وفنيو تقنية معلومات.",
        fr: "Nous avons recruté 45 personnes en Turquie : médecins, infirmiers, directeurs d'hôpital, personnel administratif, secrétaires médicaux et techniciens informatiques.",
        ru: "Мы подобрали 45 сотрудников из Турции: врачей, медсестёр, руководителей больниц, административный персонал, медсекретарей и IT-специалистов.",
      },
    },
    {
      name: "Adept Hunters Recruiting Co JV (2012–2013)",
      text: {
        en: "Orthopaedic & sports medicine hospital in Qatar, Al Tawasul Specialized Centre and Elite International Medical Centre — 19 physiotherapists, 19 nurses, 3 massage therapists and 10 doctors.",
        tr: "Katar'da ortopedi ve spor hekimliği hastanesi, Al Tawasul Specialized Centre ve Elite International Medical Centre — 19 fizyoterapist, 19 hemşire, 3 masaj terapisti ve 10 doktor.",
        ar: "مستشفى العظام والطب الرياضي في قطر، ومركز التواصل التخصصي، ومركز النخبة الطبي الدولي — 19 معالجاً فيزيائياً و19 ممرضاً و3 معالجين بالتدليك و10 أطباء.",
        fr: "Hôpital d'orthopédie et de médecine du sport au Qatar, Al Tawasul Specialized Centre et Elite International Medical Centre — 19 kinésithérapeutes, 19 infirmiers, 3 masseurs et 10 médecins.",
        ru: "Больница ортопедии и спортивной медицины в Катаре, Al Tawasul Specialized Centre и Elite International Medical Centre — 19 физиотерапевтов, 19 медсестёр, 3 массажиста и 10 врачей.",
      },
    },
    {
      name: "Whitaker Mawarid Hospital Management Services, Riyadh K.S.A. (1986–89)",
      text: {
        en: "We recruited medical and administrative staff — 165 people in total.",
        tr: "Toplam 165 kişilik tıbbi ve idari personel temin ettik.",
        ar: "وفّرنا كوادر طبية وإدارية بلغ مجموعها 165 شخصاً.",
        fr: "Nous avons recruté du personnel médical et administratif — 165 personnes au total.",
        ru: "Мы подобрали медицинский и административный персонал — всего 165 человек.",
      },
    },
  ] as { name: string; text: L }[],
  cateringTitle: { en: "Catering and hospitality clients", tr: "Catering ve konaklama sektörü müşterilerimiz", ar: "عملاء قطاع الإعاشة والضيافة", fr: "Clients restauration et hôtellerie", ru: "Клиенты в общепите и гостеприимстве" },
  catering: [
    "Azizia Panda Hypermarkets — Riyadh, K.S.A.", "Danube Hypermarkets — K.S.A.", "Sanabel Hypermarkets — K.S.A.", "Flynas Airways — K.S.A.",
    "Alsiddiqi Holding — Qatar", "Shaqab Abela Catering Service Co. W.L.L — Qatar", "Saed Istikdam — K.S.A.", "Takween Arabian",
    "Big Chefs Café & Brasserie — K.S.A.", "ETE Housing & Catering — K.S.A.", "Al Naba Holding LLC — Oman", "Kuwait Resources House — Kuwait",
  ],
};

export const referenceCount = refs.intl.length + refs.tr.length + refs.med.length + refs.catering.length;
