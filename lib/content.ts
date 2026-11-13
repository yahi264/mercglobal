import type { L } from "./i18n";

// ─── Company details (from mercglobal.com.tr) ────────────────────────────────
export const company = {
  legalName: "Merç Global İstihdam Eğitim ve Danışmanlık Hizmetleri Ltd. Şti.",
  brand: "Merc Global",
  group: "Merç Global Group",
  phoneDisplay: "+90 312 230 31 82 – 85",
  phoneHref: "tel:+903122303182",
  mobileDisplay: "+90 531 342 48 01",
  whatsapp: [
    { display: "+90 531 342 48 01", number: "905313424801" },
    { display: "+90 545 792 02 68", number: "905457920268" },
  ],
  emails: ["info@mercglobal.com.tr", "ali.merc@mercglobal.com.tr", "merc_ltd@hotmail.com"],
  websites: ["www.mercglobal.com.tr", "www.turkishmanpower.com", "www.balkanmanpower.com", "www.turkische-arbeitskrafte.com", "www.yurtdisiisler.com", "www.yabancieleman.com.tr"],
  addressLines: ["Kızılay Mahallesi, Fevzi Çakmak 1 Sokak", "No: 17/4, Kızılay / Ankara — Türkiye"],
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3059.8077600382876!2d32.84815607529081!3d39.92331808552354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34efe2d12f54b%3A0x9c81a6be6cf040ca!2sMer%C3%A7%20Global%20Group!5e0!3m2!1sen!2str!4v1672994862498!5m2!1sen!2str",
  // CV builder "Send": FormSubmit (formsubmit.co) forwards submissions to this mailbox. The very first
  // submission makes FormSubmit email an activation link to the address — click it once.
  cvEndpoint: "https://formsubmit.co/ajax/info@mercglobal.com.tr",
  // Branded mailer on the company Google account (scripts/apps-script/Code.gs). Empty = FormSubmit only.
  applyEndpoint: "",
  // Every application / CV is also copied to these company addresses.
  applyCc: ["ali.merc@mercglobal.com.tr", "merc_ltd@hotmail.com", "cv@turkishmanpower.com"],
  mapLink: "https://www.google.com/maps/search/?api=1&query=Mer%C3%A7+Global+Group+Ankara",
  licenceNo: "494",
  licenceDate: "22/09/2011",
};

export const mainWhatsApp = company.whatsapp[0].number;

// ─── Home / about texts ──────────────────────────────────────────────────────
export const text = {
  heroEyebrow: { en: "International workforce & consultancy", tr: "Uluslararası iş gücü ve danışmanlık", ar: "توفير العمالة الدولية والاستشارات", fr: "Main-d'œuvre internationale et conseil", ru: "Международный персонал и консалтинг", zh: "国际劳务与咨询", es: "Personal internacional y consultoría", de: "Internationale Arbeitskräfte & Beratung" },
  tagline: {
    en: "International recruitment and consultancy, backed by Merç Global Group.",
    tr: "Merç Global Group güvencesiyle uluslararası personel istihdamı ve danışmanlık.",
    ar: "توظيف دولي واستشارات بضمان مجموعة Merç Global Group.",
    fr: "Recrutement international et conseil, avec la garantie de Merç Global Group.",
    ru: "Международный подбор персонала и консалтинг под гарантией Merç Global Group.", zh: "国际招聘与咨询，由 Merç Global Group 提供保障。", es: "Contratación internacional y consultoría, con el respaldo de Merç Global Group.", de: "Internationale Personalvermittlung und Beratung – mit der Sicherheit der Merç Global Group.",
  },
  servicesEyebrow: { en: "Professional solutions", tr: "Profesyonel çözümler", ar: "حلول احترافية", fr: "Solutions professionnelles", ru: "Профессиональные решения", zh: "专业解决方案", es: "Soluciones profesionales", de: "Professionelle Lösungen" },
  servicesIntro: {
    en: "At Merc Global we stand beside your business throughout international recruitment — offering end-to-end services from legal compliance to workforce planning.",
    tr: "Merc Global olarak uluslararası personel istihdamı süreçlerinde işletmenizin yanında; yasal uyumdan iş gücü planlamasına kadar uçtan uca hizmet sunuyoruz.",
    ar: "في Merc Global نقف إلى جانب منشأتك طوال مراحل التوظيف الدولي، ونقدّم خدمات متكاملة من الامتثال القانوني إلى تخطيط القوى العاملة.",
    fr: "Chez Merc Global, nous accompagnons votre entreprise tout au long du recrutement international — de la conformité juridique à la planification des effectifs.",
    ru: "Merc Global сопровождает ваш бизнес на всех этапах международного найма — от соблюдения законодательства до планирования персонала.", zh: "Merc Global 在国际招聘的全过程中与您的企业并肩同行——从法律合规到劳动力规划，提供一站式服务。", es: "En Merc Global acompañamos a su empresa durante todo el proceso de contratación internacional, con servicios integrales que van desde el cumplimiento legal hasta la planificación de la plantilla.", de: "Merc Global begleitet Ihr Unternehmen durch den gesamten internationalen Rekrutierungsprozess – mit Komplettleistungen von der rechtlichen Compliance bis zur Personalplanung.",
  },
  corporateApproach: {
    en: "Thanks to the international experience we have gained across many sectors, we provide qualified and fast human-resource solutions tailored to the needs of every project.",
    tr: "Farklı sektörlerde edindiğimiz uluslararası tecrübe sayesinde, her projenin ihtiyaçlarına özel nitelikli ve hızlı insan kaynağı çözümleri sunmaktayız.",
    ar: "بفضل الخبرة الدولية التي اكتسبناها في قطاعات مختلفة، نقدّم حلول موارد بشرية مؤهلة وسريعة مصمّمة وفق احتياجات كل مشروع.",
    fr: "Grâce à l'expérience internationale acquise dans de nombreux secteurs, nous proposons des solutions RH qualifiées et rapides, adaptées aux besoins de chaque projet.",
    ru: "Благодаря международному опыту в самых разных отраслях мы предлагаем быстрые решения по квалифицированному персоналу, адаптированные к задачам каждого проекта.", zh: "凭借在众多行业积累的国际经验，我们根据每个项目的需求，提供专业、快速的人力资源解决方案。", es: "Gracias a la experiencia internacional adquirida en numerosos sectores, ofrecemos soluciones de recursos humanos cualificadas y rápidas, adaptadas a las necesidades de cada proyecto.", de: "Dank unserer internationalen Erfahrung in zahlreichen Branchen bieten wir qualifizierte und schnelle Personallösungen, die auf die Anforderungen jedes Projekts zugeschnitten sind.",
  },
  corporateApproachTitle: { en: "Our corporate approach", tr: "Kurumsal yaklaşım", ar: "نهجنا المؤسسي", fr: "Notre approche", ru: "Наш подход", zh: "我们的企业理念", es: "Nuestro enfoque corporativo", de: "Unser Unternehmensansatz" },
  aboutShort: {
    en: "Merç Global provides international workforce supply and consultancy in the oil, natural gas, energy, construction, agriculture, logistics, manufacturing, industry, tourism and service sectors. With our global candidate pool, we connect qualified personnel with the right projects quickly and reliably.",
    tr: "Merç Global, petrol, doğal gaz, enerji, inşaat, tarım, lojistik, imalat, sanayi, turizm ve hizmet sektörlerinde uluslararası iş gücü temini ve danışmanlık sunar. Global aday havuzumuzla nitelikli personeli doğru projelerle hızlı ve güvenilir şekilde buluştururuz.",
    ar: "تقدّم Merç Global خدمات توفير العمالة الدولية والاستشارات في قطاعات النفط والغاز الطبيعي والطاقة والبناء والزراعة والخدمات اللوجستية والتصنيع والصناعة والسياحة والخدمات. ومن خلال قاعدة مرشحينا العالمية، نربط الكفاءات المؤهلة بالمشاريع المناسبة بسرعة وموثوقية.",
    fr: "Merç Global fournit de la main-d'œuvre internationale et du conseil dans les secteurs du pétrole, du gaz naturel, de l'énergie, de la construction, de l'agriculture, de la logistique, de la fabrication, de l'industrie, du tourisme et des services. Grâce à notre vivier mondial de candidats, nous mettons en relation du personnel qualifié avec les bons projets, rapidement et en toute fiabilité.",
    ru: "Merç Global обеспечивает международный подбор персонала и консалтинг в нефтяной, газовой, энергетической, строительной, сельскохозяйственной, логистической, производственной, промышленной, туристической и сервисной отраслях. Благодаря глобальной базе кандидатов мы быстро и надёжно соединяем квалифицированных специалистов с подходящими проектами.", zh: "Merç Global 在石油、天然气、能源、建筑、农业、物流、制造、工业、旅游及服务等行业提供国际劳务输出与咨询服务。依托全球人才库，我们快速、可靠地将合格人员与合适的项目对接。", es: "Merç Global ofrece suministro de personal internacional y consultoría en los sectores del petróleo, gas natural, energía, construcción, agricultura, logística, fabricación, industria, turismo y servicios. Con nuestra cartera global de candidatos, conectamos personal cualificado con los proyectos adecuados de forma rápida y fiable.", de: "Merç Global bietet internationale Personalbereitstellung und Beratung in den Bereichen Öl, Erdgas, Energie, Bau, Landwirtschaft, Logistik, Fertigung, Industrie, Tourismus und Dienstleistungen. Mit unserem globalen Kandidatenpool bringen wir qualifiziertes Personal schnell und zuverlässig mit den richtigen Projekten zusammen.",
  },
  about: [
    {
      en: "Merç Global İstihdam Eğitim ve Danışmanlık Hizmetleri Ltd. Şti. is an organisation specialised in international workforce supply and consultancy, operating in the Oil, Natural Gas, Energy, Construction, Agriculture & Livestock, Logistics, Manufacturing, Industry, Tourism & Service sectors.",
      tr: "Merç Global İstihdam Eğitim ve Danışmanlık Hizmetleri Ltd. Şti., Petrol, Doğal Gaz, Enerji, İnşaat, Tarım ve Hayvancılık, Lojistik, İmalat, Sanayii, Turizm & Hizmet sektörlerinde faaliyet gösteren, uluslararası iş gücü temini ve danışmanlık alanında uzmanlaşmış bir kuruluştur.",
      ar: "شركة Merç Global İstihdam Eğitim ve Danışmanlık Hizmetleri Ltd. Şti. مؤسسة متخصصة في توفير العمالة الدولية والاستشارات، وتعمل في قطاعات النفط والغاز الطبيعي والطاقة والبناء والزراعة وتربية المواشي والخدمات اللوجستية والتصنيع والصناعة والسياحة والخدمات.",
      fr: "Merç Global İstihdam Eğitim ve Danışmanlık Hizmetleri Ltd. Şti. est une société spécialisée dans la fourniture de main-d'œuvre internationale et le conseil, active dans les secteurs du pétrole, du gaz naturel, de l'énergie, de la construction, de l'agriculture et de l'élevage, de la logistique, de la fabrication, de l'industrie, du tourisme et des services.",
      ru: "Merç Global İstihdam Eğitim ve Danışmanlık Hizmetleri Ltd. Şti. — компания, специализирующаяся на международном подборе персонала и консалтинге в нефтяной и газовой отраслях, энергетике, строительстве, сельском хозяйстве и животноводстве, логистике, производстве, промышленности, туризме и сфере услуг.", zh: "Merç Global İstihdam Eğitim ve Danışmanlık Hizmetleri Ltd. Şti. 是一家专注于国际劳务输出与咨询的机构，业务覆盖石油、天然气、能源、建筑、农业与畜牧业、物流、制造、工业、旅游及服务等行业。", es: "Merç Global İstihdam Eğitim ve Danışmanlık Hizmetleri Ltd. Şti. es una organización especializada en el suministro de personal internacional y consultoría, que opera en los sectores de petróleo, gas natural, energía, construcción, agricultura y ganadería, logística, fabricación, industria, turismo y servicios.", de: "Die Merç Global İstihdam Eğitim ve Danışmanlık Hizmetleri Ltd. Şti. ist auf internationale Personalbereitstellung und Beratung spezialisiert und in den Bereichen Öl, Erdgas, Energie, Bau, Landwirtschaft & Viehzucht, Logistik, Fertigung, Industrie, Tourismus & Dienstleistungen tätig.",
    },
    {
      en: "By bringing local and foreign workforces together with the right projects, we offer our clients not only personnel but also strategic human-resource solutions. Thanks to the field experience we have gained especially in the oil, natural gas and energy sectors, we supply qualified workforces for high-standard projects quickly and reliably.",
      tr: "Şirketimiz; yerli ve yabancı iş gücünü doğru projelerle buluşturarak, müşterilerine yalnızca personel değil, aynı zamanda stratejik insan kaynakları çözümleri sunmaktadır. Özellikle petrol, doğal gaz ve enerji sektörlerinde edindiğimiz saha tecrübesi sayesinde, yüksek standartlı projeler için nitelikli iş gücünü hızlı ve güvenilir şekilde temin etmekteyiz.",
      ar: "من خلال ربط العمالة المحلية والأجنبية بالمشاريع المناسبة، لا نقدّم لعملائنا الموظفين فحسب، بل حلول موارد بشرية استراتيجية أيضاً. وبفضل الخبرة الميدانية التي اكتسبناها خصوصاً في قطاعات النفط والغاز الطبيعي والطاقة، نوفّر العمالة المؤهلة للمشاريع ذات المعايير العالية بسرعة وموثوقية.",
      fr: "En associant main-d'œuvre locale et étrangère aux bons projets, nous offrons à nos clients non seulement du personnel, mais aussi des solutions RH stratégiques. Grâce à l'expérience de terrain acquise notamment dans le pétrole, le gaz naturel et l'énergie, nous fournissons rapidement et de manière fiable une main-d'œuvre qualifiée pour des projets exigeants.",
      ru: "Соединяя местный и иностранный персонал с подходящими проектами, мы предлагаем клиентам не просто сотрудников, а стратегические HR-решения. Благодаря полевому опыту, накопленному прежде всего в нефтяной, газовой и энергетической отраслях, мы быстро и надёжно обеспечиваем квалифицированным персоналом проекты высокого уровня.", zh: "我们将本地与外籍劳动力与合适的项目相匹配，为客户提供的不仅是人员，更是战略性的人力资源解决方案。凭借在石油、天然气和能源领域积累的现场经验，我们能够为高标准项目快速、可靠地提供合格劳动力。", es: "Al unir personal local y extranjero con los proyectos adecuados, ofrecemos a nuestros clientes no solo personal, sino también soluciones estratégicas de recursos humanos. Gracias a la experiencia de campo adquirida sobre todo en los sectores del petróleo, el gas natural y la energía, suministramos personal cualificado para proyectos de alto nivel de forma rápida y fiable.", de: "Indem wir lokale und ausländische Arbeitskräfte mit den richtigen Projekten zusammenbringen, bieten wir unseren Kunden nicht nur Personal, sondern auch strategische HR-Lösungen. Dank unserer Praxiserfahrung insbesondere in den Bereichen Öl, Erdgas und Energie stellen wir qualifizierte Arbeitskräfte für anspruchsvolle Projekte schnell und zuverlässig bereit.",
    },
    {
      en: "With the wide candidate pool we have built on a global scale, we reach engineers, technicians, foremen, workers and field personnel from many countries — speeding up our clients' hiring processes and saving them time and cost.",
      tr: "Merç Global olarak, global ölçekte oluşturduğumuz geniş aday havuzu ile farklı ülkelerden mühendis, teknisyen, usta, işçi ve saha personeline erişim sağlıyor; müşterilerimizin işe alım süreçlerini hızlandırarak zaman ve maliyet avantajı yaratıyoruz.",
      ar: "بفضل قاعدة المرشحين الواسعة التي بنيناها على نطاق عالمي، نصل إلى المهندسين والفنيين والحرفيين والعمال وموظفي المواقع من دول مختلفة، ونسرّع عمليات التوظيف لدى عملائنا بما يوفّر الوقت والتكلفة.",
      fr: "Grâce au vaste vivier de candidats que nous avons constitué à l'échelle mondiale, nous accédons à des ingénieurs, techniciens, chefs d'équipe, ouvriers et personnels de terrain de nombreux pays — en accélérant les recrutements de nos clients et en leur faisant gagner du temps et de l'argent.",
      ru: "Обширная международная база кандидатов даёт нам доступ к инженерам, техникам, мастерам, рабочим и полевому персоналу из многих стран — это ускоряет найм у наших клиентов и экономит их время и средства.", zh: "依托我们在全球范围内建立的庞大人才库，我们能够招募来自多个国家的工程师、技术人员、工长、工人和现场人员，加快客户的招聘流程，为其节省时间和成本。", es: "Con la amplia cartera de candidatos que hemos creado a escala global, llegamos a ingenieros, técnicos, capataces, operarios y personal de campo de muchos países, agilizando los procesos de contratación de nuestros clientes y ahorrándoles tiempo y costes.", de: "Mit unserem weltweit aufgebauten Kandidatenpool erreichen wir Ingenieure, Techniker, Vorarbeiter, Arbeiter und Feldpersonal aus vielen Ländern – das beschleunigt die Einstellungsprozesse unserer Kunden und spart Zeit und Kosten.",
    },
    {
      en: "Beyond recruitment, we take an active role at every stage of a project with workforce planning, training, legal process management and operational support services.",
      tr: "Sadece işe alım değil; aynı zamanda iş gücü planlama, eğitim, yasal süreç yönetimi ve operasyonel destek hizmetleri ile projelerin her aşamasında aktif rol alıyoruz.",
      ar: "ولا يقتصر دورنا على التوظيف، بل نشارك بفاعلية في كل مراحل المشروع من خلال تخطيط القوى العاملة والتدريب وإدارة الإجراءات القانونية وخدمات الدعم التشغيلي.",
      fr: "Au-delà du recrutement, nous intervenons à chaque étape des projets : planification des effectifs, formation, gestion des démarches légales et soutien opérationnel.",
      ru: "Помимо найма, мы активно участвуем на каждом этапе проекта: планирование персонала, обучение, сопровождение юридических процедур и операционная поддержка.", zh: "除招聘外，我们还通过劳动力规划、培训、法律流程管理和运营支持服务，积极参与项目的每一个阶段。", es: "Más allá de la contratación, participamos activamente en cada etapa del proyecto con planificación de personal, formación, gestión de trámites legales y servicios de apoyo operativo.", de: "Über die Rekrutierung hinaus sind wir mit Personalplanung, Schulungen, der Abwicklung rechtlicher Verfahren und operativer Unterstützung in jeder Projektphase aktiv beteiligt.",
    },
  ] as L[],
  visionTitle: { en: "Vision", tr: "Vizyonumuz", ar: "رؤيتنا", fr: "Vision", ru: "Видение", zh: "愿景", es: "Visión", de: "Vision" },
  vision: {
    en: "To be a trusted, leading brand in international workforce supply and consultancy.",
    tr: "Uluslararası iş gücü temini ve danışmanlık alanında güvenilir ve lider bir marka olmak.",
    ar: "أن نكون علامة رائدة وموثوقة في مجال توفير العمالة الدولية والاستشارات.",
    fr: "Être une marque de confiance et de référence dans la fourniture de main-d'œuvre internationale et le conseil.",
    ru: "Быть надёжным и ведущим брендом в сфере международного подбора персонала и консалтинга.", zh: "成为国际劳务输出与咨询领域值得信赖的领先品牌。", es: "Ser una marca líder y de confianza en el suministro de personal internacional y la consultoría.", de: "Eine vertrauenswürdige, führende Marke in der internationalen Personalbereitstellung und Beratung zu sein.",
  },
  missionTitle: { en: "Mission", tr: "Misyonumuz", ar: "رسالتنا", fr: "Mission", ru: "Миссия", zh: "使命", es: "Misión", de: "Mission" },
  mission: {
    en: "To provide our clients with sustainable, fast and accurate human-resource solutions.",
    tr: "Müşterilerimize sürdürülebilir, hızlı ve doğru insan kaynağı çözümleri sunmak.",
    ar: "أن نقدّم لعملائنا حلول موارد بشرية مستدامة وسريعة ودقيقة.",
    fr: "Offrir à nos clients des solutions RH durables, rapides et précises.",
    ru: "Предоставлять клиентам устойчивые, быстрые и точные решения в области персонала.", zh: "为客户提供可持续、快速且精准的人力资源解决方案。", es: "Ofrecer a nuestros clientes soluciones de recursos humanos sostenibles, rápidas y precisas.", de: "Unseren Kunden nachhaltige, schnelle und präzise Personallösungen zu bieten.",
  },
  licence: {
    en: "MERÇ GLOBAL İSTİHDAM, Eğitim ve Danışmanlık Ltd. holds a Private Employment Agency Permit from the Turkish Employment Agency (İŞKUR). Document date: 22/09/2011 · Document number: 494.",
    tr: "MERÇ GLOBAL İSTİHDAM, Eğitim ve Danışmanlık Ltd. Türkiye İş Kurumundan Özel İstihdam Bürosu İzin Belgesi Sahibidir. Belge Tarihi: 22/09/2011 · Belge Numarası: 494.",
    ar: "تحمل شركة MERÇ GLOBAL İSTİHDAM, Eğitim ve Danışmanlık Ltd. ترخيص مكتب توظيف خاص صادراً عن مؤسسة التوظيف التركية (İŞKUR). تاريخ الوثيقة: 22/09/2011 · رقم الوثيقة: 494.",
    fr: "MERÇ GLOBAL İSTİHDAM, Eğitim ve Danışmanlık Ltd. est titulaire d'une autorisation d'agence privée de placement délivrée par l'Agence turque pour l'emploi (İŞKUR). Date du document : 22/09/2011 · Numéro : 494.",
    ru: "MERÇ GLOBAL İSTİHDAM, Eğitim ve Danışmanlık Ltd. имеет разрешение частного агентства занятости от Турецкого агентства занятости (İŞKUR). Дата документа: 22/09/2011 · Номер документа: 494.", zh: "MERÇ GLOBAL İSTİHDAM, Eğitim ve Danışmanlık Ltd. 持有土耳其就业局（İŞKUR）颁发的私营职业介绍机构许可证。文件日期：22/09/2011 · 文件编号：494。", es: "MERÇ GLOBAL İSTİHDAM, Eğitim ve Danışmanlık Ltd. cuenta con la autorización de agencia privada de empleo de la Agencia de Empleo de Turquía (İŞKUR). Fecha del documento: 22/09/2011 · Número de documento: 494.", de: "Die MERÇ GLOBAL İSTİHDAM, Eğitim ve Danışmanlık Ltd. besitzt eine Genehmigung als private Arbeitsvermittlung der türkischen Arbeitsagentur (İŞKUR). Dokumentdatum: 22/09/2011 · Dokumentnummer: 494.",
  },
  licenceShort: { en: "İŞKUR-licensed private employment agency", tr: "İŞKUR lisanslı özel istihdam bürosu", ar: "مكتب توظيف خاص مرخّص من İŞKUR", fr: "Agence privée de placement agréée İŞKUR", ru: "Частное агентство занятости с лицензией İŞKUR", zh: "İŞKUR 许可的私营职业介绍机构", es: "Agencia privada de empleo autorizada por İŞKUR", de: "Von İŞKUR lizenzierte private Arbeitsvermittlung" },
  ctaTitle: { en: "Need qualified staff for your project?", tr: "Projeniz için nitelikli personele mi ihtiyacınız var?", ar: "هل تحتاج إلى كوادر مؤهلة لمشروعك؟", fr: "Besoin de personnel qualifié pour votre projet ?", ru: "Нужен квалифицированный персонал для проекта?", zh: "您的项目需要合格的人员吗？", es: "¿Necesita personal cualificado para su proyecto?", de: "Sie brauchen qualifiziertes Personal für Ihr Projekt?" },
  ctaText: {
    en: "Tell us the positions, numbers and timing — our team will plan the right workforce solution for you.",
    tr: "Pozisyonları, kişi sayısını ve zamanlamayı bize iletin; ekibimiz sizin için doğru iş gücü çözümünü planlasın.",
    ar: "أخبرنا بالوظائف والأعداد والتوقيت، وسيخطط فريقنا لحل العمالة المناسب لك.",
    fr: "Indiquez-nous les postes, les effectifs et le calendrier — notre équipe planifiera la solution adaptée.",
    ru: "Сообщите должности, количество и сроки — наша команда подберёт подходящее решение.", zh: "告诉我们岗位、人数和时间安排——我们的团队将为您规划合适的劳务方案。", es: "Indíquenos los puestos, el número de personas y los plazos: nuestro equipo planificará la solución de personal adecuada para usted.", de: "Nennen Sie uns Positionen, Anzahl und Zeitplan – unser Team plant die passende Personallösung für Sie.",
  },
  stat1: { en: "İŞKUR licence since", tr: "İŞKUR lisansı", ar: "مرخّصون من İŞKUR منذ", fr: "Agréés İŞKUR depuis", ru: "Лицензия İŞKUR с", zh: "İŞKUR 许可始于", es: "Licencia İŞKUR desde", de: "İŞKUR-Lizenz seit" },
  stat2: { en: "Sectors served", tr: "Hizmet verilen sektör", ar: "قطاعات نخدمها", fr: "Secteurs servis", ru: "Отраслей", zh: "服务行业", es: "Sectores atendidos", de: "Betreute Branchen" },
  stat3: { en: "Sourcing regions", tr: "Personel temin bölgesi", ar: "مناطق توفير العمالة", fr: "Régions de recrutement", ru: "Регионов подбора", zh: "人员来源地区", es: "Regiones de contratación", de: "Herkunftsregionen" },
  stat4: { en: "Reference clients", tr: "Referans firma", ar: "عملاء مرجعيون", fr: "Clients de référence", ru: "Клиентов-референций", zh: "合作客户", es: "Clientes de referencia", de: "Referenzkunden" },
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
    title: { en: "International Recruitment", tr: "Uluslararası Personel Temini", ar: "التوظيف الدولي", fr: "Recrutement international", ru: "Международный подбор персонала", zh: "国际招聘", es: "Contratación internacional", de: "Internationale Personalvermittlung" },
    short: {
      en: "With our global candidate network we supply engineers, technicians and field personnel quickly, accurately and with a project focus.",
      tr: "Global aday ağımızla mühendis, teknisyen ve saha personelini hızlı, doğru ve proje odaklı şekilde temin ediyoruz.",
      ar: "عبر شبكة مرشحينا العالمية نوفّر المهندسين والفنيين وموظفي المواقع بسرعة ودقة وبتركيز على احتياجات المشروع.",
      fr: "Grâce à notre réseau mondial de candidats, nous fournissons ingénieurs, techniciens et personnel de terrain rapidement, avec précision et selon les besoins du projet.",
      ru: "Через глобальную сеть кандидатов мы быстро и точно подбираем инженеров, техников и полевой персонал под задачи проекта.", zh: "依托全球人才网络，我们以项目为导向，快速、精准地提供工程师、技术人员和现场人员。", es: "Con nuestra red global de candidatos suministramos ingenieros, técnicos y personal de campo de forma rápida, precisa y orientada al proyecto.", de: "Mit unserem globalen Kandidatennetzwerk stellen wir Ingenieure, Techniker und Feldpersonal schnell, präzise und projektorientiert bereit.",
    },
    long: {
      en: "With our wide candidate network around the world, we supply engineers, technicians and blue-collar and white-collar field personnel quickly and accurately.",
      tr: "Dünya genelindeki geniş aday ağımız ile mühendis, teknisyen ve mavi yaka-beyaz yaka saha personelini hızlı ve doğru şekilde temin ediyoruz.",
      ar: "من خلال شبكة مرشحينا الواسعة حول العالم، نوفّر المهندسين والفنيين وموظفي المواقع من ذوي الياقات الزرقاء والبيضاء بسرعة ودقة.",
      fr: "Grâce à notre large réseau de candidats dans le monde entier, nous fournissons rapidement et avec précision des ingénieurs, des techniciens ainsi que du personnel de terrain, cols bleus comme cols blancs.",
      ru: "Благодаря широкой сети кандидатов по всему миру мы быстро и точно подбираем инженеров, техников, а также рабочий и офисный полевой персонал.", zh: "依托遍布全球的广泛人才网络，我们快速、精准地提供工程师、技术人员以及蓝领和白领现场人员。", es: "Con nuestra amplia red de candidatos en todo el mundo, suministramos de forma rápida y precisa ingenieros, técnicos y personal de campo tanto operario como administrativo.", de: "Mit unserem weltweiten Kandidatennetzwerk stellen wir schnell und präzise Ingenieure, Techniker sowie gewerbliches und kaufmännisches Feldpersonal bereit.",
    },
    listTitle: { en: "Main areas we serve", tr: "Hizmet verdiğimiz başlıca alanlar", ar: "أبرز المجالات التي نخدمها", fr: "Principaux domaines", ru: "Основные направления", zh: "主要服务领域", es: "Principales áreas que atendemos", de: "Unsere Haupteinsatzbereiche" },
    list: [
      { en: "Oil & Gas", tr: "Oil & Gas", ar: "النفط والغاز", fr: "Pétrole et gaz", ru: "Нефть и газ", zh: "石油与天然气", es: "Petróleo y gas", de: "Öl & Gas" },
      { en: "Construction & Infrastructure", tr: "İnşaat & Altyapı", ar: "البناء والبنية التحتية", fr: "Construction et infrastructures", ru: "Строительство и инфраструктура", zh: "建筑与基础设施", es: "Construcción e infraestructuras", de: "Bau & Infrastruktur" },
      { en: "Offshore & Marine", tr: "Offshore & Marine", ar: "الأعمال البحرية والأوفشور", fr: "Offshore et maritime", ru: "Офшор и морские работы", zh: "海上与船舶工程", es: "Offshore y marítimo", de: "Offshore & Marine" },
      { en: "Energy and industrial projects", tr: "Enerji ve sanayi projeleri", ar: "مشاريع الطاقة والصناعة", fr: "Projets énergétiques et industriels", ru: "Энергетические и промышленные проекты", zh: "能源与工业项目", es: "Proyectos energéticos e industriales", de: "Energie- und Industrieprojekte" },
      { en: "Logistics and warehousing", tr: "Lojistik ve depolama", ar: "الخدمات اللوجستية والتخزين", fr: "Logistique et entreposage", ru: "Логистика и складирование", zh: "物流与仓储", es: "Logística y almacenamiento", de: "Logistik und Lagerhaltung" },
      { en: "Tourism and services", tr: "Turizm ve hizmet sektörü", ar: "السياحة وقطاع الخدمات", fr: "Tourisme et services", ru: "Туризм и сфера услуг", zh: "旅游与服务业", es: "Turismo y servicios", de: "Tourismus und Dienstleistungen" },
      { en: "Agriculture and livestock", tr: "Tarım ve hayvancılık", ar: "الزراعة وتربية المواشي", fr: "Agriculture et élevage", ru: "Сельское хозяйство и животноводство", zh: "农业与畜牧业", es: "Agricultura y ganadería", de: "Landwirtschaft und Viehzucht" },
      { en: "Defence industry and aviation", tr: "Savunma sanayi ve havacılık", ar: "الصناعات الدفاعية والطيران", fr: "Défense et aéronautique", ru: "Оборонная промышленность и авиация", zh: "国防工业与航空", es: "Industria de defensa y aviación", de: "Verteidigungsindustrie und Luftfahrt" },
    ],
  },
  {
    slug: "work-permit-visa",
    icon: "file",
    image: 0,
    title: { en: "Work Permit & Visa Consultancy", tr: "Çalışma İzni ve Vize Danışmanlığı", ar: "استشارات تصاريح العمل والتأشيرات", fr: "Permis de travail et visas", ru: "Разрешения на работу и визы", zh: "工作许可与签证咨询", es: "Asesoría en permisos de trabajo y visados", de: "Arbeitserlaubnis- & Visaberatung" },
    short: {
      en: "We manage work permits, residence permits and visa processes for foreign staff end-to-end, within the legal framework.",
      tr: "Yabancı personelin çalışma izni, oturum izni ve vize süreçlerini yasal çerçevede uçtan uca yönetiyoruz.",
      ar: "ندير إجراءات تصاريح العمل والإقامة والتأشيرات للموظفين الأجانب من البداية إلى النهاية ضمن الإطار القانوني.",
      fr: "Nous gérons de bout en bout, dans le cadre légal, les permis de travail, titres de séjour et visas du personnel étranger.",
      ru: "Мы полностью ведём оформление разрешений на работу, видов на жительство и виз для иностранного персонала в рамках закона.", zh: "我们在法律框架内，全程办理外籍员工的工作许可、居留许可和签证手续。", es: "Gestionamos de principio a fin, dentro del marco legal, los permisos de trabajo, permisos de residencia y visados del personal extranjero.", de: "Wir übernehmen Arbeitserlaubnis-, Aufenthaltserlaubnis- und Visaverfahren für ausländisches Personal vollständig und im gesetzlichen Rahmen.",
    },
    long: {
      en: "We manage the legal processes required for foreign staff to work in Türkiye or abroad, in full compliance with the legislation.",
      tr: "Yabancı personelin Türkiye'de veya yurtdışında çalışabilmesi için gerekli yasal süreçleri mevzuata uygun şekilde yönetiyoruz.",
      ar: "ندير الإجراءات القانونية اللازمة لعمل الموظفين الأجانب في تركيا أو خارجها، بما يتوافق تماماً مع التشريعات.",
      fr: "Nous gérons, conformément à la législation, les démarches légales nécessaires pour que le personnel étranger puisse travailler en Turquie ou à l'étranger.",
      ru: "Мы ведём все юридические процедуры, необходимые для работы иностранного персонала в Турции или за рубежом, в полном соответствии с законодательством.", zh: "我们完全依法办理外籍员工在土耳其或海外工作所需的各项法律手续。", es: "Gestionamos, en pleno cumplimiento de la legislación, los trámites legales necesarios para que el personal extranjero pueda trabajar en Turquía o en el extranjero.", de: "Wir wickeln die rechtlichen Verfahren, die ausländisches Personal für die Arbeit in der Türkei oder im Ausland benötigt, gesetzeskonform ab.",
    },
    listTitle: { en: "Scope", tr: "Kapsam", ar: "نطاق الخدمة", fr: "Périmètre", ru: "Что входит", zh: "服务范围", es: "Alcance", de: "Leistungsumfang" },
    list: [
      { en: "First applications and extensions", tr: "İlk başvuru ve uzatma işlemleri", ar: "الطلبات الأولى والتمديدات", fr: "Premières demandes et renouvellements", ru: "Первичные заявки и продления", zh: "首次申请与续签", es: "Primeras solicitudes y prórrogas", de: "Erstanträge und Verlängerungen" },
      { en: "Social security (SGK) and regulatory procedures", tr: "SGK ve mevzuat süreçleri", ar: "إجراءات الضمان الاجتماعي (SGK) واللوائح", fr: "Sécurité sociale (SGK) et procédures réglementaires", ru: "Соцстрахование (SGK) и нормативные процедуры", zh: "社会保险（SGK）及法规手续", es: "Seguridad social (SGK) y trámites normativos", de: "Sozialversicherung (SGK) und behördliche Verfahren" },
      { en: "Coordination with official institutions", tr: "Resmi kurum koordinasyonu", ar: "التنسيق مع الجهات الرسمية", fr: "Coordination avec les institutions officielles", ru: "Взаимодействие с госучреждениями", zh: "与官方机构的协调", es: "Coordinación con instituciones oficiales", de: "Abstimmung mit Behörden" },
      { en: "Residence permit consultancy", tr: "Oturum izni danışmanlığı", ar: "استشارات تصاريح الإقامة", fr: "Conseil en titre de séjour", ru: "Консультации по ВНЖ", zh: "居留许可咨询", es: "Asesoría sobre permisos de residencia", de: "Beratung zur Aufenthaltserlaubnis" },
      { en: "Visa consultancy", tr: "Vize danışmanlığı", ar: "استشارات التأشيرات", fr: "Conseil en visas", ru: "Визовые консультации", zh: "签证咨询", es: "Asesoría sobre visados", de: "Visaberatung" },
    ],
  },
  {
    slug: "payroll-office",
    icon: "wallet",
    image: 0,
    title: { en: "Payroll & Office Services", tr: "Bordrolama ve Ofis Hizmetleri", ar: "خدمات الرواتب والمكاتب", fr: "Paie et services de bureau", ru: "Расчёт зарплаты и офисные услуги", zh: "薪资与办公服务", es: "Nóminas y servicios de oficina", de: "Lohnabrechnung & Bürodienste" },
    short: {
      en: "We provide orderly and transparent support to foreign companies in payroll, financial operations and office processes.",
      tr: "Yabancı şirketler için bordrolama, mali operasyonlar ve ofis süreçlerinde düzenli ve şeffaf destek sağlıyoruz.",
      ar: "نقدّم للشركات الأجنبية دعماً منظماً وشفافاً في إعداد الرواتب والعمليات المالية والأعمال المكتبية.",
      fr: "Nous accompagnons les entreprises étrangères de façon rigoureuse et transparente pour la paie, les opérations financières et les tâches administratives.",
      ru: "Мы оказываем иностранным компаниям чёткую и прозрачную поддержку по расчёту зарплаты, финансовым операциям и офисным процессам.", zh: "我们为外国公司在薪资核算、财务运营和办公流程方面提供有序、透明的支持。", es: "Ofrecemos a empresas extranjeras un apoyo ordenado y transparente en nóminas, operaciones financieras y procesos de oficina.", de: "Wir unterstützen ausländische Unternehmen geordnet und transparent bei Lohnabrechnung, Finanzprozessen und Büroabläufen.",
    },
    long: {
      en: "For foreign companies in Türkiye, we manage payroll, financial processes and office operations from a single point.",
      tr: "Yabancı şirketler için Türkiye'de bordrolama, mali süreçler ve ofis operasyonlarını tek noktadan yönetiyoruz.",
      ar: "ندير للشركات الأجنبية في تركيا إعداد الرواتب والعمليات المالية والأعمال المكتبية من نقطة واحدة.",
      fr: "Pour les entreprises étrangères en Turquie, nous gérons la paie, les processus financiers et les opérations de bureau depuis un point unique.",
      ru: "Для иностранных компаний в Турции мы ведём расчёт зарплаты, финансовые процессы и офисные операции из одного окна.", zh: "我们为在土耳其的外国公司一站式管理薪资、财务流程和办公运营。", es: "Para empresas extranjeras en Turquía, gestionamos desde un único punto las nóminas, los procesos financieros y las operaciones de oficina.", de: "Für ausländische Unternehmen in der Türkei steuern wir Lohnabrechnung, Finanzprozesse und Büroabläufe aus einer Hand.",
    },
    listTitle: { en: "Service scope", tr: "Hizmet kapsamı", ar: "نطاق الخدمة", fr: "Périmètre du service", ru: "Состав услуги", zh: "服务内容", es: "Alcance del servicio", de: "Leistungsumfang" },
    list: [
      { en: "Regular running of payroll", tr: "Bordrolama süreçlerinin düzenli yürütülmesi", ar: "إدارة الرواتب بانتظام", fr: "Gestion régulière de la paie", ru: "Регулярный расчёт заработной платы", zh: "定期办理薪资核算", es: "Gestión regular de nóminas", de: "Regelmäßige Lohnabrechnung" },
      { en: "Operational and administrative office coordination", tr: "Operasyonel ve idari ofis koordinasyonu", ar: "التنسيق التشغيلي والإداري للمكتب", fr: "Coordination opérationnelle et administrative du bureau", ru: "Операционная и административная координация офиса", zh: "运营与行政办公协调", es: "Coordinación operativa y administrativa de la oficina", de: "Operative und administrative Bürokoordination" },
      { en: "Regulation-focused tracking of financial processes", tr: "Mevzuat odaklı mali süreç takibi", ar: "متابعة العمليات المالية وفق اللوائح", fr: "Suivi financier axé sur la réglementation", ru: "Контроль финансовых процессов с учётом законодательства", zh: "以法规为导向的财务流程跟踪", es: "Seguimiento de procesos financieros conforme a la normativa", de: "Vorschriftenorientierte Überwachung der Finanzprozesse" },
      { en: "Reporting and transparency through a single contact", tr: "Tek muhatap ile raporlama ve süreç şeffaflığı", ar: "تقارير وشفافية عبر جهة اتصال واحدة", fr: "Reporting et transparence via un interlocuteur unique", ru: "Отчётность и прозрачность через единое контактное лицо", zh: "单一联系人负责报告，流程透明", es: "Informes y transparencia a través de un único interlocutor", de: "Berichtswesen und Transparenz über einen festen Ansprechpartner" },
    ],
  },
  {
    slug: "mobilisation-logistics",
    icon: "plane",
    image: 6,
    title: { en: "Mobilisation & Logistics", tr: "Mobilizasyon ve Lojistik", ar: "التعبئة والخدمات اللوجستية", fr: "Mobilisation et logistique", ru: "Мобилизация и логистика", zh: "人员调遣与后勤", es: "Movilización y logística", de: "Mobilisierung & Logistik" },
    short: {
      en: "For site mobilisation we plan flights, accommodation, transfers and camp management from a single centre.",
      tr: "Saha mobilizasyonunda uçuş, konaklama, transfer ve kamp yönetimini tek merkezden planlıyoruz.",
      ar: "نخطط لتعبئة المواقع من مركز واحد، بما يشمل الرحلات الجوية والإقامة والتنقلات وإدارة المعسكرات.",
      fr: "Pour la mobilisation sur site, nous planifions vols, hébergement, transferts et gestion des camps depuis un point central.",
      ru: "При мобилизации на объект мы из одного центра планируем перелёты, проживание, трансферы и управление вахтовым лагерем.", zh: "在现场人员调遣方面，我们统一规划航班、住宿、接送和营地管理。", es: "Para la movilización a obra planificamos vuelos, alojamiento, traslados y gestión de campamentos desde un único centro.", de: "Für die Mobilisierung zur Baustelle planen wir Flüge, Unterkunft, Transfers und Camp-Management aus einer Hand.",
    },
    long: {
      en: "We run mobilisation and logistics planning in an integrated way so that personnel reach the site quickly and smoothly.",
      tr: "Personelin sahaya hızlı ve sorunsuz ulaşması için mobilizasyon ve lojistik planlamayı entegre şekilde yürütüyoruz.",
      ar: "ندير تخطيط التعبئة والخدمات اللوجستية بشكل متكامل لضمان وصول الموظفين إلى الموقع بسرعة ودون عوائق.",
      fr: "Nous menons de façon intégrée la planification de la mobilisation et de la logistique pour que le personnel arrive sur site rapidement et sans encombre.",
      ru: "Мы комплексно планируем мобилизацию и логистику, чтобы персонал прибывал на объект быстро и без проблем.", zh: "我们统筹开展人员调遣与后勤规划，确保人员快速、顺利抵达现场。", es: "Gestionamos de forma integrada la planificación de la movilización y la logística para que el personal llegue a la obra con rapidez y sin contratiempos.", de: "Wir planen Mobilisierung und Logistik integriert, damit das Personal schnell und reibungslos auf der Baustelle ankommt.",
    },
    listTitle: { en: "Operation scope", tr: "Operasyon kapsamı", ar: "نطاق العمليات", fr: "Périmètre opérationnel", ru: "Состав работ", zh: "业务范围", es: "Alcance operativo", de: "Leistungsumfang" },
    list: [
      { en: "Flight arrangements", tr: "Uçuş organizasyonları", ar: "ترتيبات الرحلات الجوية", fr: "Organisation des vols", ru: "Организация перелётов", zh: "航班安排", es: "Organización de vuelos", de: "Flugorganisation" },
      { en: "Accommodation, catering and camp management", tr: "Konaklama, catering ve kamp yönetimi", ar: "الإقامة والإعاشة وإدارة المعسكرات", fr: "Hébergement, restauration et gestion des camps", ru: "Проживание, питание и управление лагерем", zh: "住宿、餐饮与营地管理", es: "Alojamiento, catering y gestión de campamentos", de: "Unterkunft, Verpflegung und Camp-Management" },
      { en: "Transfers and site logistics", tr: "Transfer ve saha lojistiği", ar: "التنقلات والخدمات اللوجستية للموقع", fr: "Transferts et logistique de site", ru: "Трансферы и логистика на объекте", zh: "接送与现场后勤", es: "Traslados y logística en obra", de: "Transfers und Baustellenlogistik" },
    ],
  },
  {
    slug: "training-certification",
    icon: "graduation",
    image: 1,
    title: { en: "Training & Certification", tr: "Eğitim ve Sertifikasyon", ar: "التدريب والاعتماد", fr: "Formation et certification", ru: "Обучение и сертификация", zh: "培训与认证", es: "Formación y certificación", de: "Schulung & Zertifizierung" },
    short: {
      en: "We offer vocational training and certification services for the oil, natural gas, energy and industrial fields.",
      tr: "Petrol, doğal gaz, enerji ve endüstriyel alanlar için mesleki eğitim ve sertifikasyon hizmetleri sunuyoruz.",
      ar: "نقدّم خدمات التدريب المهني والاعتماد لقطاعات النفط والغاز الطبيعي والطاقة والمجالات الصناعية.",
      fr: "Nous proposons des formations professionnelles et des certifications pour le pétrole, le gaz naturel, l'énergie et l'industrie.",
      ru: "Мы проводим профессиональное обучение и сертификацию для нефтяной, газовой, энергетической и промышленной сфер.", zh: "我们为石油、天然气、能源及工业领域提供职业培训与认证服务。", es: "Ofrecemos formación profesional y certificación para los sectores del petróleo, gas natural, energía e industria.", de: "Wir bieten Berufsschulungen und Zertifizierungen für die Bereiche Öl, Erdgas, Energie und Industrie.",
    },
    long: {
      en: "We provide vocational training and certification services for the oil, natural gas, energy and other industrial sectors.",
      tr: "Petrol, doğal gaz, enerji ve diğer endüstriyel sektörlere yönelik mesleki eğitim ve sertifikalandırma hizmetleri sunuyoruz.",
      ar: "نقدّم خدمات التدريب المهني ومنح الشهادات لقطاعات النفط والغاز الطبيعي والطاقة وغيرها من القطاعات الصناعية.",
      fr: "Nous proposons des services de formation professionnelle et de certification pour les secteurs du pétrole, du gaz naturel, de l'énergie et d'autres industries.",
      ru: "Мы оказываем услуги профессионального обучения и сертификации для нефтяной, газовой, энергетической и других промышленных отраслей.", zh: "我们为石油、天然气、能源及其他工业领域提供职业培训与认证服务。", es: "Prestamos servicios de formación profesional y certificación para los sectores del petróleo, gas natural, energía y otras industrias.", de: "Wir erbringen Berufsschulungs- und Zertifizierungsleistungen für Öl, Erdgas, Energie und weitere Industriebereiche.",
    },
    listTitle: { en: "Training approach", tr: "Eğitim yaklaşımı", ar: "منهجية التدريب", fr: "Approche de formation", ru: "Подход к обучению", zh: "培训方式", es: "Enfoque formativo", de: "Schulungsansatz" },
    list: [
      { en: "Position-based technical training plan", tr: "Pozisyon bazlı teknik eğitim planı", ar: "خطة تدريب فني حسب الوظيفة", fr: "Plan de formation technique par poste", ru: "План технического обучения по должностям", zh: "按岗位制定的技术培训计划", es: "Plan de formación técnica por puesto", de: "Positionsbezogener technischer Schulungsplan" },
      { en: "Site safety and process compliance training", tr: "Saha güvenliği ve süreç uyum eğitimleri", ar: "تدريب على سلامة المواقع والامتثال للإجراءات", fr: "Formations sécurité sur site et conformité des procédures", ru: "Обучение технике безопасности и соблюдению процедур", zh: "现场安全与流程合规培训", es: "Formación en seguridad en obra y cumplimiento de procesos", de: "Schulungen zu Arbeitssicherheit und Prozesskonformität" },
      { en: "Vocational competence and certification support", tr: "Mesleki yeterlilik ve sertifikasyon desteği", ar: "دعم الكفاءة المهنية والحصول على الشهادات", fr: "Accompagnement aux qualifications et certifications professionnelles", ru: "Поддержка в подтверждении квалификации и сертификации", zh: "职业能力与认证支持", es: "Apoyo en competencia profesional y certificación", de: "Unterstützung bei Berufsqualifikation und Zertifizierung" },
      { en: "Competence development aligned with project goals", tr: "Proje hedeflerine uygun yetkinlik geliştirme", ar: "تطوير الكفاءات بما يتوافق مع أهداف المشروع", fr: "Développement des compétences selon les objectifs du projet", ru: "Развитие компетенций под цели проекта", zh: "契合项目目标的能力提升", es: "Desarrollo de competencias alineado con los objetivos del proyecto", de: "Kompetenzentwicklung passend zu den Projektzielen" },
    ],
  },
  {
    slug: "consulting-project-management",
    icon: "briefcase",
    image: 7,
    title: { en: "Consulting & Project Management", tr: "Danışmanlık ve Proje Yönetimi", ar: "الاستشارات وإدارة المشاريع", fr: "Conseil et gestion de projet", ru: "Консалтинг и управление проектами", zh: "咨询与项目管理", es: "Consultoría y gestión de proyectos", de: "Beratung & Projektmanagement" },
    short: {
      en: "We provide decision-support corporate consultancy in workforce planning and project management.",
      tr: "İnsan kaynağı planlaması ve proje yönetimi süreçlerinde karar destekli kurumsal danışmanlık veriyoruz.",
      ar: "نقدّم استشارات مؤسسية داعمة لاتخاذ القرار في تخطيط الموارد البشرية وإدارة المشاريع.",
      fr: "Nous apportons un conseil d'entreprise d'aide à la décision en planification des effectifs et en gestion de projet.",
      ru: "Мы оказываем корпоративные консультации для принятия решений по планированию персонала и управлению проектами.", zh: "我们在劳动力规划和项目管理方面提供辅助决策的企业咨询。", es: "Ofrecemos consultoría corporativa de apoyo a la toma de decisiones en planificación de personal y gestión de proyectos.", de: "Wir bieten entscheidungsunterstützende Unternehmensberatung in Personalplanung und Projektmanagement.",
    },
    long: {
      en: "We provide professional consultancy on human-resource planning, organisational structure and project management.",
      tr: "İnsan kaynakları planlaması, organizasyon yapısı ve proje yönetimi konularında profesyonel danışmanlık sağlıyoruz.",
      ar: "نقدّم استشارات احترافية في تخطيط الموارد البشرية والهيكل التنظيمي وإدارة المشاريع.",
      fr: "Nous offrons un conseil professionnel en planification des ressources humaines, structure organisationnelle et gestion de projet.",
      ru: "Мы оказываем профессиональные консультации по планированию персонала, организационной структуре и управлению проектами.", zh: "我们在人力资源规划、组织架构和项目管理方面提供专业咨询。", es: "Ofrecemos consultoría profesional en planificación de recursos humanos, estructura organizativa y gestión de proyectos.", de: "Wir beraten professionell zu Personalplanung, Organisationsstruktur und Projektmanagement.",
    },
    listTitle: { en: "Corporate support topics", tr: "Kurumsal destek başlıkları", ar: "مجالات الدعم المؤسسي", fr: "Domaines d'accompagnement", ru: "Направления поддержки", zh: "企业支持内容", es: "Áreas de apoyo corporativo", de: "Unterstützungsbereiche" },
    list: [
      { en: "Workforce planning and capacity modelling", tr: "İnsan kaynağı planlama ve kapasite modelleme", ar: "تخطيط القوى العاملة ونمذجة القدرات", fr: "Planification des effectifs et modélisation des capacités", ru: "Планирование персонала и моделирование мощностей", zh: "劳动力规划与产能建模", es: "Planificación de personal y modelización de capacidad", de: "Personalplanung und Kapazitätsmodellierung" },
      { en: "Organisational structure and job descriptions", tr: "Organizasyon yapısı ve görev tanımı kurgusu", ar: "الهيكل التنظيمي والأوصاف الوظيفية", fr: "Structure organisationnelle et fiches de poste", ru: "Оргструктура и должностные инструкции", zh: "组织架构与岗位说明", es: "Estructura organizativa y descripciones de puestos", de: "Organisationsstruktur und Stellenbeschreibungen" },
      { en: "On-schedule coordination of project processes", tr: "Proje süreçlerinin takvime uygun koordinasyonu", ar: "تنسيق مراحل المشروع وفق الجدول الزمني", fr: "Coordination des processus du projet dans les délais", ru: "Координация процессов проекта в срок", zh: "按计划协调项目流程", es: "Coordinación de los procesos del proyecto en plazo", de: "Termingerechte Koordination der Projektprozesse" },
      { en: "Decision support focused on risk, cost and efficiency", tr: "Risk, maliyet ve verimlilik odaklı karar desteği", ar: "دعم القرار مع التركيز على المخاطر والتكلفة والكفاءة", fr: "Aide à la décision axée sur les risques, les coûts et l'efficacité", ru: "Поддержка решений с учётом рисков, затрат и эффективности", zh: "以风险、成本和效率为重点的决策支持", es: "Apoyo a la decisión centrado en riesgo, coste y eficiencia", de: "Entscheidungsunterstützung mit Fokus auf Risiko, Kosten und Effizienz" },
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
    ru: "Пошлины за разрешение на работу в 2026 году и критерии найма иностранцев", zh: "2026 年工作许可费用及外籍人员雇佣标准", es: "Tasas de permisos de trabajo 2026 y criterios de empleo de extranjeros", de: "Arbeitserlaubnisgebühren 2026 und Kriterien für die Beschäftigung von Ausländern",
  },
  intro: {
    en: "Fee items valid as of 2026 in Türkiye, and the main criteria employers should consider.",
    tr: "2026 yılı itibarıyla geçerli harç kalemleri ve işverenlerin dikkat etmesi gereken temel kriterler.",
    ar: "بنود الرسوم السارية في تركيا اعتباراً من عام 2026، والمعايير الأساسية التي ينبغي لأصحاب العمل مراعاتها.",
    fr: "Frais en vigueur en Turquie à partir de 2026 et principaux critères à respecter par les employeurs.",
    ru: "Пошлины, действующие в Турции с 2026 года, и основные критерии для работодателей.", zh: "土耳其自 2026 年起适用的收费项目，以及雇主应注意的主要标准。", es: "Tasas vigentes en Turquía a partir de 2026 y los principales criterios que deben tener en cuenta los empleadores.", de: "In der Türkei ab 2026 geltende Gebühren und die wichtigsten Kriterien für Arbeitgeber.",
  },
  feesTitle: { en: "2026 work permit fees", tr: "2026 Çalışma İzni Harçları", ar: "رسوم تصاريح العمل 2026", fr: "Frais de permis de travail 2026", ru: "Пошлины 2026 года", zh: "2026 年工作许可费用", es: "Tasas de permisos de trabajo 2026", de: "Arbeitserlaubnisgebühren 2026" },
  fees: [
    [{ en: "Fixed-term work permit (up to 1 year)", tr: "Süreli çalışma izni (1 yıla kadar)", ar: "تصريح عمل محدد المدة (حتى سنة)", fr: "Permis de travail à durée déterminée (jusqu'à 1 an)", ru: "Срочное разрешение (до 1 года)", zh: "定期工作许可（最长 1 年）", es: "Permiso de trabajo temporal (hasta 1 año)", de: "Befristete Arbeitserlaubnis (bis 1 Jahr)" }, "12.574,90 TL"],
    [{ en: "Indefinite work permit", tr: "Süresiz çalışma izni", ar: "تصريح عمل غير محدد المدة", fr: "Permis de travail à durée indéterminée", ru: "Бессрочное разрешение", zh: "无限期工作许可", es: "Permiso de trabajo indefinido", de: "Unbefristete Arbeitserlaubnis" }, "125.802,20 TL"],
    [{ en: "Independent work permit", tr: "Bağımsız çalışma izni", ar: "تصريح عمل مستقل", fr: "Permis de travail indépendant", ru: "Разрешение для самозанятых", zh: "独立工作许可", es: "Permiso de trabajo por cuenta propia", de: "Selbstständige Arbeitserlaubnis" }, "125.802,20 TL"],
    [{ en: "Work permit card fee", tr: "Çalışma izni kart bedeli", ar: "رسوم بطاقة تصريح العمل", fr: "Frais de carte de permis", ru: "Стоимость карты разрешения", zh: "工作许可卡费用", es: "Tasa de la tarjeta de permiso de trabajo", de: "Gebühr für die Arbeitserlaubniskarte" }, "964 TL"],
  ] as [L, string][],
  feesNote: {
    en: "Stamp duty and related notification costs may be calculated separately depending on the application type.",
    tr: "Damga vergisi ve ilgili bildirim giderleri başvuru türüne göre ayrıca hesaplanabilir.",
    ar: "قد تُحتسب ضريبة الدمغة ومصاريف الإشعارات ذات الصلة بشكل منفصل حسب نوع الطلب.",
    fr: "Le droit de timbre et les frais de notification peuvent être calculés séparément selon le type de demande.",
    ru: "Гербовый сбор и сопутствующие расходы могут рассчитываться отдельно в зависимости от типа заявки.", zh: "印花税及相关通知费用可能根据申请类型另行计算。", es: "El impuesto de timbre y los gastos de notificación pueden calcularse aparte según el tipo de solicitud.", de: "Stempelsteuer und zugehörige Meldekosten können je nach Antragsart gesondert berechnet werden.",
  },
  criteriaTitle: { en: "Foreign employment criteria", tr: "Yabancı İstihdamı Kriterleri", ar: "معايير توظيف الأجانب", fr: "Critères d'emploi des étrangers", ru: "Критерии найма иностранцев", zh: "外籍人员雇佣标准", es: "Criterios de empleo de extranjeros", de: "Kriterien für die Beschäftigung von Ausländern" },
  criteria: [
    {
      en: "As a general rule, at least 5 Turkish employees are expected for each foreign employee: 1 foreigner : 5 Turkish employees, 2 : 10, 3 : 15.",
      tr: "Genel uygulamada 1 yabancı çalışan için en az 5 Türk çalışan istihdamı beklenir. 1 yabancı: 5 Türk çalışan, 2 yabancı: 10 Türk çalışan, 3 yabancı: 15 Türk çalışan.",
      ar: "كقاعدة عامة، يُشترط توظيف 5 موظفين أتراك على الأقل مقابل كل موظف أجنبي: أجنبي واحد : 5 أتراك، 2 : 10، 3 : 15.",
      fr: "En règle générale, au moins 5 salariés turcs sont attendus pour chaque salarié étranger : 1 étranger : 5 Turcs, 2 : 10, 3 : 15.",
      ru: "Как правило, на каждого иностранного сотрудника требуется не менее 5 турецких: 1 иностранец : 5 граждан Турции, 2 : 10, 3 : 15.", zh: "一般规定，每雇用 1 名外籍员工，需至少雇用 5 名土耳其员工：1 名外籍 : 5 名土耳其员工，2 : 10，3 : 15。", es: "Como norma general, se exigen al menos 5 empleados turcos por cada empleado extranjero: 1 extranjero : 5 empleados turcos, 2 : 10, 3 : 15.", de: "Grundsätzlich werden pro ausländischem Mitarbeiter mindestens 5 türkische Mitarbeiter erwartet: 1 Ausländer : 5 türkische Mitarbeiter, 2 : 10, 3 : 15.",
    },
    {
      en: "The company must be active and operating, with financial adequacy and a suitable position.",
      tr: "Şirketin aktif ve faal olması, mali yeterlilik ve pozisyon uyumu aranır.",
      ar: "يجب أن تكون الشركة نشطة وعاملة، مع ملاءة مالية ومواءمة الوظيفة.",
      fr: "L'entreprise doit être active, financièrement solide et le poste doit être adapté.",
      ru: "Компания должна быть действующей, финансово состоятельной, а должность — соответствующей.", zh: "公司须处于正常经营状态，具备财务能力，且岗位合适。", es: "La empresa debe estar activa y operativa, con solvencia financiera y un puesto adecuado.", de: "Das Unternehmen muss aktiv und tätig sein, finanziell leistungsfähig und über eine passende Stelle verfügen.",
    },
    {
      en: "The foreign employee's qualifications must match the job description.",
      tr: "Yabancı çalışanın niteliği ile görev tanımının örtüşmesi gerekir.",
      ar: "يجب أن تتطابق مؤهلات الموظف الأجنبي مع الوصف الوظيفي.",
      fr: "Les qualifications du salarié étranger doivent correspondre à la fiche de poste.",
      ru: "Квалификация иностранного сотрудника должна соответствовать должностным обязанностям.", zh: "外籍员工的资质必须与岗位说明相符。", es: "La cualificación del empleado extranjero debe corresponder a la descripción del puesto.", de: "Die Qualifikation des ausländischen Mitarbeiters muss zur Stellenbeschreibung passen.",
    },
  ] as L[],
  wageTitle: { en: "Wage criteria", tr: "Ücret Kriteri", ar: "معايير الأجور", fr: "Critères de salaire", ru: "Требования к зарплате", zh: "薪资标准", es: "Criterios salariales", de: "Lohnkriterien" },
  wages: [
    [{ en: "Senior executives", tr: "Üst düzey yöneticiler", ar: "كبار المديرين", fr: "Cadres dirigeants", ru: "Топ-менеджеры", zh: "高级管理人员", es: "Altos directivos", de: "Führungskräfte der obersten Ebene" }, { en: "5× minimum wage", tr: "Asgari ücretin 5 katı", ar: "5 أضعاف الحد الأدنى للأجور", fr: "5 × le salaire minimum", ru: "5 МРОТ", zh: "最低工资的 5 倍", es: "5 × el salario mínimo", de: "5 × Mindestlohn" }],
    [{ en: "Engineers and architects", tr: "Mühendis ve mimarlar", ar: "المهندسون والمعماريون", fr: "Ingénieurs et architectes", ru: "Инженеры и архитекторы", zh: "工程师和建筑师", es: "Ingenieros y arquitectos", de: "Ingenieure und Architekten" }, { en: "4× minimum wage", tr: "Asgari ücretin 4 katı", ar: "4 أضعاف الحد الأدنى للأجور", fr: "4 × le salaire minimum", ru: "4 МРОТ", zh: "最低工资的 4 倍", es: "4 × el salario mínimo", de: "4 × Mindestlohn" }],
    [{ en: "Specialist and managerial positions", tr: "Uzmanlık ve yönetici pozisyonları", ar: "الوظائف التخصصية والإدارية", fr: "Postes spécialisés et d'encadrement", ru: "Специалисты и руководители", zh: "专业与管理岗位", es: "Puestos especializados y de gestión", de: "Fach- und Führungspositionen" }, { en: "3× minimum wage", tr: "Asgari ücretin 3 katı", ar: "3 أضعاف الحد الأدنى للأجور", fr: "3 × le salaire minimum", ru: "3 МРОТ", zh: "最低工资的 3 倍", es: "3 × el salario mínimo", de: "3 × Mindestlohn" }],
    [{ en: "Certain other positions", tr: "Diğer bazı pozisyonlar", ar: "بعض الوظائف الأخرى", fr: "Certains autres postes", ru: "Некоторые другие должности", zh: "其他部分岗位", es: "Otros puestos determinados", de: "Bestimmte andere Positionen" }, { en: "At least the minimum wage", tr: "En az asgari ücret düzeyi", ar: "الحد الأدنى للأجور على الأقل", fr: "Au moins le salaire minimum", ru: "Не ниже МРОТ", zh: "不低于最低工资", es: "Como mínimo el salario mínimo", de: "Mindestens der Mindestlohn" }],
  ] as [L, L][],
};

// ─── Sectors (each matches one of the original site's slider photos) ─────────
export type Sector = { slug: string; image: number; title: L; text: L };

export const sectors: Sector[] = [
  {
    slug: "oil-gas",
    image: 1,
    title: { en: "Oil & Natural Gas", tr: "Petrol & Doğal Gaz", ar: "النفط والغاز الطبيعي", fr: "Pétrole et gaz naturel", ru: "Нефть и природный газ", zh: "石油与天然气", es: "Petróleo y gas natural", de: "Öl & Erdgas" },
    text: {
      en: "Experienced engineers, technical specialists and field crews who can work on upstream, downstream and offshore projects.",
      tr: "Upstream, downstream ve offshore projelerde görev alabilecek deneyimli mühendisler, teknik uzmanlar ve saha ekipleri temin edilmektedir.",
      ar: "نوفّر مهندسين ذوي خبرة وأخصائيين فنيين وفرق ميدانية قادرة على العمل في مشاريع المنبع والمصب والمشاريع البحرية.",
      fr: "Des ingénieurs expérimentés, des spécialistes techniques et des équipes de terrain pour les projets amont, aval et offshore.",
      ru: "Опытные инженеры, технические специалисты и полевые бригады для проектов апстрим, даунстрим и офшор.", zh: "能够参与上游、下游及海上项目的资深工程师、技术专家和现场团队。", es: "Ingenieros experimentados, especialistas técnicos y equipos de campo capaces de trabajar en proyectos upstream, downstream y offshore.", de: "Erfahrene Ingenieure, technische Spezialisten und Feldteams für Upstream-, Downstream- und Offshore-Projekte.",
    },
  },
  {
    slug: "energy-power",
    image: 2,
    title: { en: "Energy & Power", tr: "Enerji ve Güç", ar: "الطاقة والكهرباء", fr: "Énergie et électricité", ru: "Энергетика", zh: "能源与电力", es: "Energía y electricidad", de: "Energie & Strom" },
    text: {
      en: "Expert technical teams for electricity generation facilities, power plants and renewable energy projects.",
      tr: "Elektrik üretim tesisleri, enerji santralleri ve yenilenebilir enerji projeleri için uzman teknik kadrolar sağlanmaktadır.",
      ar: "كوادر فنية متخصصة لمنشآت توليد الكهرباء ومحطات الطاقة ومشاريع الطاقة المتجددة.",
      fr: "Des équipes techniques expertes pour les installations de production d'électricité, les centrales et les projets d'énergies renouvelables.",
      ru: "Опытные технические кадры для объектов генерации, электростанций и проектов возобновляемой энергетики.", zh: "为发电设施、电厂和可再生能源项目提供专业技术团队。", es: "Equipos técnicos expertos para instalaciones de generación eléctrica, centrales y proyectos de energías renovables.", de: "Fachkundige technische Teams für Stromerzeugungsanlagen, Kraftwerke und Projekte erneuerbarer Energien.",
    },
  },
  {
    slug: "construction-infrastructure",
    image: 3,
    title: { en: "Construction & Infrastructure", tr: "İnşaat ve Altyapı", ar: "البناء والبنية التحتية", fr: "Construction et infrastructures", ru: "Строительство и инфраструктура", zh: "建筑与基础设施", es: "Construcción e infraestructuras", de: "Bau & Infrastruktur" },
    text: {
      en: "Engineering staff, technical office teams, foremen, craftsmen and blue-collar site personnel for large-scale building and infrastructure projects.",
      tr: "Büyük ölçekli üstyapı ve altyapı projeleri için mühendislik kadroları, teknik ofis ekipleri, formen, usta ve mavi yaka saha personeli temini gerçekleştirilmektedir.",
      ar: "كوادر هندسية وفرق مكاتب فنية ومشرفون وحرفيون وعمالة ميدانية لمشاريع البناء والبنية التحتية الكبرى.",
      fr: "Ingénieurs, équipes de bureau technique, contremaîtres, artisans et ouvriers de chantier pour les grands projets de bâtiment et d'infrastructures.",
      ru: "Инженеры, сотрудники технического отдела, прорабы, мастера и рабочие для крупных строительных и инфраструктурных проектов.", zh: "为大型建筑和基础设施项目提供工程人员、技术办公团队、工长、技工及蓝领现场人员。", es: "Personal de ingeniería, equipos de oficina técnica, capataces, oficiales y operarios de obra para grandes proyectos de edificación e infraestructuras.", de: "Ingenieurpersonal, technische Büroteams, Vorarbeiter, Facharbeiter und gewerbliches Baustellenpersonal für große Hoch- und Infrastrukturprojekte.",
    },
  },
  {
    slug: "offshore-marine-dredging",
    image: 4,
    title: { en: "Offshore, Marine & Dredging", tr: "Offshore, Marine ve Dredging", ar: "الأعمال البحرية والأوفشور والتجريف", fr: "Offshore, maritime et dragage", ru: "Офшор, морские работы и дноуглубление", zh: "海上、船舶与疏浚", es: "Offshore, marítimo y dragado", de: "Offshore, Marine & Baggerarbeiten" },
    text: {
      en: "Highly experienced specialist teams for marine structures, port projects, dredging operations and offshore projects.",
      tr: "Deniz yapıları, liman projeleri, dredging operasyonları ve offshore projeler için yüksek tecrübeli uzman ekipler sağlanmaktadır.",
      ar: "فرق متخصصة عالية الخبرة للمنشآت البحرية ومشاريع الموانئ وعمليات التجريف والمشاريع البحرية.",
      fr: "Des équipes spécialisées très expérimentées pour les ouvrages maritimes, les projets portuaires, le dragage et l'offshore.",
      ru: "Высокоопытные специалисты для морских сооружений, портовых проектов, дноуглубительных работ и офшорных проектов.", zh: "为海洋结构、港口项目、疏浚作业和海上项目提供经验丰富的专业团队。", es: "Equipos especializados de gran experiencia para estructuras marítimas, proyectos portuarios, operaciones de dragado y proyectos offshore.", de: "Hocherfahrene Spezialteams für Meeresbauwerke, Hafenprojekte, Baggerarbeiten und Offshore-Projekte.",
    },
  },
  {
    slug: "agriculture-livestock",
    image: 5,
    title: { en: "Agriculture & Livestock", tr: "Tarım ve Hayvancılık", ar: "الزراعة وتربية المواشي", fr: "Agriculture et élevage", ru: "Сельское хозяйство и животноводство", zh: "农业与畜牧业", es: "Agricultura y ganadería", de: "Landwirtschaft & Viehzucht" },
    text: {
      en: "Experienced shepherds, animal caretakers, other labour and farm personnel for agricultural and livestock businesses.",
      tr: "Tarım ve hayvancılık işletmeleri için; deneyimli çoban, hayvan bakıcısı, diğer iş gücü ve arazi personeli temini gerçekleştirilmektedir.",
      ar: "رعاة ذوو خبرة ومربّو حيوانات وعمالة أخرى وموظفو أراضٍ لمنشآت الزراعة وتربية المواشي.",
      fr: "Bergers expérimentés, soigneurs d'animaux, main-d'œuvre et personnel agricole pour les exploitations agricoles et d'élevage.",
      ru: "Опытные пастухи, работники по уходу за животными, разнорабочие и полевой персонал для аграрных и животноводческих хозяйств.", zh: "为农业和畜牧企业提供经验丰富的牧羊人、动物饲养员及其他劳动力和农场人员。", es: "Pastores con experiencia, cuidadores de animales y otro personal agrícola y de campo para explotaciones agrícolas y ganaderas.", de: "Erfahrene Hirten, Tierpfleger sowie weitere Arbeits- und Feldkräfte für Landwirtschafts- und Viehzuchtbetriebe.",
    },
  },
  {
    slug: "logistics-transport",
    image: 6,
    title: { en: "Logistics & Transport", tr: "Lojistik ve Taşımacılık", ar: "الخدمات اللوجستية والنقل", fr: "Logistique et transport", ru: "Логистика и транспорт", zh: "物流与运输", es: "Logística y transporte", de: "Logistik & Transport" },
    text: {
      en: "All the operational staff needed for warehousing, transport and site-support operations.",
      tr: "Depolama, taşıma ve saha destek operasyonları için gerekli tüm operasyonel personel sağlanmaktadır.",
      ar: "جميع الكوادر التشغيلية اللازمة لعمليات التخزين والنقل ودعم المواقع.",
      fr: "Tout le personnel opérationnel nécessaire à l'entreposage, au transport et au soutien sur site.",
      ru: "Весь операционный персонал для складских, транспортных и вспомогательных работ на объектах.", zh: "为仓储、运输和现场支持作业提供所需的全部运营人员。", es: "Todo el personal operativo necesario para almacenamiento, transporte y apoyo en obra.", de: "Das gesamte operative Personal für Lager, Transport und Baustellenunterstützung.",
    },
  },
  {
    slug: "manufacturing-industry",
    image: 7,
    title: { en: "Manufacturing & Industry", tr: "İmalat ve Sanayi", ar: "التصنيع والصناعة", fr: "Fabrication et industrie", ru: "Производство и промышленность", zh: "制造与工业", es: "Fabricación e industria", de: "Fertigung & Industrie" },
    text: {
      en: "Qualified technical and production staff for organised industrial zones, factories and production plants.",
      tr: "OSB'ler, fabrikalar ve üretim tesisleri için nitelikli teknik ve üretim personeli temin edilmektedir.",
      ar: "كوادر فنية وإنتاجية مؤهلة للمناطق الصناعية المنظمة والمصانع ومنشآت الإنتاج.",
      fr: "Personnel technique et de production qualifié pour les zones industrielles, usines et sites de production.",
      ru: "Квалифицированный технический и производственный персонал для промзон, заводов и производственных площадок.", zh: "为工业园区、工厂和生产设施提供合格的技术与生产人员。", es: "Personal técnico y de producción cualificado para polígonos industriales, fábricas y plantas de producción.", de: "Qualifiziertes Technik- und Produktionspersonal für Industriegebiete, Fabriken und Produktionsanlagen.",
    },
  },
  {
    slug: "tourism-hospitality",
    image: 8,
    title: { en: "Tourism & Hospitality", tr: "Turizm ve Hizmet Sektörü", ar: "السياحة وقطاع الخدمات", fr: "Tourisme et services", ru: "Туризм и сфера услуг", zh: "旅游与酒店服务", es: "Turismo y hostelería", de: "Tourismus & Gastgewerbe" },
    text: {
      en: "Operational support staff for hotels, restaurants and service businesses.",
      tr: "Otel, restoran ve hizmet işletmeleri için operasyonel destek personeli sağlanmaktadır.",
      ar: "كوادر دعم تشغيلي للفنادق والمطاعم ومنشآت الخدمات.",
      fr: "Personnel de soutien opérationnel pour les hôtels, restaurants et entreprises de services.",
      ru: "Операционный персонал для отелей, ресторанов и предприятий сферы услуг.", zh: "为酒店、餐厅和服务企业提供运营支持人员。", es: "Personal de apoyo operativo para hoteles, restaurantes y empresas de servicios.", de: "Operatives Unterstützungspersonal für Hotels, Restaurants und Dienstleistungsbetriebe.",
    },
  },
  {
    slug: "aviation-defence",
    image: 9,
    title: { en: "Aviation & Defence Industry", tr: "Havacılık ve Savunma Sanayii", ar: "الطيران والصناعات الدفاعية", fr: "Aéronautique et défense", ru: "Авиация и оборонная промышленность", zh: "航空与国防工业", es: "Aviación e industria de defensa", de: "Luftfahrt & Verteidigungsindustrie" },
    text: {
      en: "Technical and engineering staff who can work on aviation and defence projects.",
      tr: "Havacılık ve savunma projelerinde görev alabilecek teknik ve mühendislik kadroları temin edilmektedir.",
      ar: "كوادر فنية وهندسية قادرة على العمل في مشاريع الطيران والدفاع.",
      fr: "Personnel technique et d'ingénierie pour les projets aéronautiques et de défense.",
      ru: "Технические и инженерные кадры для авиационных и оборонных проектов.", zh: "能够参与航空和国防项目的技术与工程人员。", es: "Personal técnico y de ingeniería capaz de trabajar en proyectos de aviación y defensa.", de: "Technisches und Ingenieurpersonal für Luftfahrt- und Verteidigungsprojekte.",
    },
  },
];

// ─── Sourcing regions ────────────────────────────────────────────────────────
export type Region = { id: string; title: L; text: L };

export const regions: Region[] = [
  {
    id: "turkic-cis",
    title: { en: "Türkiye, Turkic Republics & CIS", tr: "Türkiye, Türk Cumhuriyetleri ve CIS Ülkeleri", ar: "تركيا والجمهوريات التركية ودول رابطة الدول المستقلة", fr: "Turquie, républiques turciques et CEI", ru: "Турция, тюркские республики и СНГ", zh: "土耳其、突厥语国家及独联体", es: "Turquía, repúblicas túrquicas y CEI", de: "Türkei, Turkrepubliken & GUS" },
    text: {
      en: "A strong, experienced candidate pool, led by Türkiye, Azerbaijan, Kazakhstan, Uzbekistan, Turkmenistan and Ukraine.",
      tr: "Türkiye, Azerbaycan, Kazakistan, Özbekistan, Türkmenistan ve Ukrayna başta olmak üzere güçlü ve deneyimli aday havuzu.",
      ar: "قاعدة مرشحين قوية وذات خبرة، في مقدمتها تركيا وأذربيجان وكازاخستان وأوزبكستان وتركمانستان وأوكرانيا.",
      fr: "Un vivier de candidats solide et expérimenté, notamment en Turquie, Azerbaïdjan, Kazakhstan, Ouzbékistan, Turkménistan et Ukraine.",
      ru: "Сильная база опытных кандидатов — прежде всего из Турции, Азербайджана, Казахстана, Узбекистана, Туркменистана и Украины.", zh: "以土耳其、阿塞拜疆、哈萨克斯坦、乌兹别克斯坦、土库曼斯坦和乌克兰为主的强大且经验丰富的人才库。", es: "Una cartera de candidatos sólida y experimentada, encabezada por Turquía, Azerbaiyán, Kazajistán, Uzbekistán, Turkmenistán y Ucrania.", de: "Ein starker, erfahrener Kandidatenpool, allen voran aus der Türkei, Aserbaidschan, Kasachstan, Usbekistan, Turkmenistan und der Ukraine.",
    },
  },
  {
    id: "africa",
    title: { en: "African Countries", tr: "Afrika Ülkeleri", ar: "الدول الأفريقية", fr: "Pays d'Afrique", ru: "Страны Африки", zh: "非洲国家", es: "Países africanos", de: "Afrikanische Länder" },
    text: {
      en: "Wide workforce supply from Algeria, Egypt, Tunisia, Nigeria, Kenya, Uganda, Zambia, Ghana and other African countries.",
      tr: "Cezayir, Mısır, Tunus, Nijerya, Kenya, Uganda, Zambiya, Gana ve diğer Afrika ülkelerinden geniş iş gücü temini.",
      ar: "توفير واسع للعمالة من الجزائر ومصر وتونس ونيجيريا وكينيا وأوغندا وزامبيا وغانا وغيرها من الدول الأفريقية.",
      fr: "Large fourniture de main-d'œuvre depuis l'Algérie, l'Égypte, la Tunisie, le Nigeria, le Kenya, l'Ouganda, la Zambie, le Ghana et d'autres pays africains.",
      ru: "Широкий подбор персонала из Алжира, Египта, Туниса, Нигерии, Кении, Уганды, Замбии, Ганы и других стран Африки.", zh: "来自阿尔及利亚、埃及、突尼斯、尼日利亚、肯尼亚、乌干达、赞比亚、加纳及其他非洲国家的广泛劳动力资源。", es: "Amplio suministro de personal de Argelia, Egipto, Túnez, Nigeria, Kenia, Uganda, Zambia, Ghana y otros países africanos.", de: "Umfangreiche Personalbereitstellung aus Algerien, Ägypten, Tunesien, Nigeria, Kenia, Uganda, Sambia, Ghana und weiteren afrikanischen Ländern.",
    },
  },
  {
    id: "asia",
    title: { en: "Asian Countries", tr: "Asya Ülkeleri", ar: "الدول الآسيوية", fr: "Pays d'Asie", ru: "Страны Азии", zh: "亚洲国家", es: "Países asiáticos", de: "Asiatische Länder" },
    text: {
      en: "Qualified workforce from Afghanistan, India, Pakistan, Bangladesh, Nepal, Vietnam, the Philippines and Indonesia.",
      tr: "Afganistan, Hindistan, Pakistan, Bangladeş, Nepal, Vietnam, Filipinler ve Endonezya kaynaklı nitelikli iş gücü.",
      ar: "عمالة مؤهلة من أفغانستان والهند وباكستان وبنغلاديش ونيبال وفيتنام والفلبين وإندونيسيا.",
      fr: "Main-d'œuvre qualifiée d'Afghanistan, d'Inde, du Pakistan, du Bangladesh, du Népal, du Vietnam, des Philippines et d'Indonésie.",
      ru: "Квалифицированный персонал из Афганистана, Индии, Пакистана, Бангладеш, Непала, Вьетнама, Филиппин и Индонезии.", zh: "来自阿富汗、印度、巴基斯坦、孟加拉国、尼泊尔、越南、菲律宾和印度尼西亚的合格劳动力。", es: "Personal cualificado de Afganistán, India, Pakistán, Bangladés, Nepal, Vietnam, Filipinas e Indonesia.", de: "Qualifizierte Arbeitskräfte aus Afghanistan, Indien, Pakistan, Bangladesch, Nepal, Vietnam, den Philippinen und Indonesien.",
    },
  },
  {
    id: "europe-balkans",
    title: { en: "Europe & the Balkans", tr: "Avrupa ve Balkan Ülkeleri", ar: "أوروبا ودول البلقان", fr: "Europe et Balkans", ru: "Европа и Балканы", zh: "欧洲与巴尔干地区", es: "Europa y los Balcanes", de: "Europa & Balkan" },
    text: {
      en: "Technical teams from the UK, Italy, Romania, Bulgaria, Serbia, Bosnia and Herzegovina, Albania and North Macedonia.",
      tr: "UK, İtalya, Romanya, Bulgaristan, Sırbistan, Bosna Hersek, Arnavutluk ve Kuzey Makedonya'dan teknik kadrolar.",
      ar: "كوادر فنية من المملكة المتحدة وإيطاليا ورومانيا وبلغاريا وصربيا والبوسنة والهرسك وألبانيا ومقدونيا الشمالية.",
      fr: "Des équipes techniques du Royaume-Uni, d'Italie, de Roumanie, de Bulgarie, de Serbie, de Bosnie-Herzégovine, d'Albanie et de Macédoine du Nord.",
      ru: "Технические кадры из Великобритании, Италии, Румынии, Болгарии, Сербии, Боснии и Герцеговины, Албании и Северной Македонии.", zh: "来自英国、意大利、罗马尼亚、保加利亚、塞尔维亚、波斯尼亚和黑塞哥维那、阿尔巴尼亚和北马其顿的技术团队。", es: "Equipos técnicos del Reino Unido, Italia, Rumanía, Bulgaria, Serbia, Bosnia y Herzegovina, Albania y Macedonia del Norte.", de: "Technische Teams aus Großbritannien, Italien, Rumänien, Bulgarien, Serbien, Bosnien und Herzegowina, Albanien und Nordmazedonien.",
    },
  },
];

export const advantagesTitle: L = { en: "Our advantages", tr: "Avantajlarımız", ar: "مزايانا", fr: "Nos atouts", ru: "Наши преимущества", zh: "我们的优势", es: "Nuestras ventajas", de: "Unsere Vorteile" };
export const advantages: L[] = [
  { en: "Wide, verified candidate portfolio", tr: "Geniş ve doğrulanmış aday portföyü", ar: "قاعدة مرشحين واسعة وموثّقة", fr: "Vivier de candidats large et vérifié", ru: "Широкая проверенная база кандидатов", zh: "广泛且经过核实的人才库", es: "Amplia cartera de candidatos verificados", de: "Breites, geprüftes Kandidatenportfolio" },
  { en: "Fast mobilisation", tr: "Hızlı mobilizasyon", ar: "تعبئة سريعة", fr: "Mobilisation rapide", ru: "Быстрая мобилизация", zh: "快速调遣", es: "Movilización rápida", de: "Schnelle Mobilisierung" },
  { en: "Solutions for different budgets", tr: "Farklı bütçelere uygun çözümler", ar: "حلول تناسب مختلف الميزانيات", fr: "Solutions adaptées à chaque budget", ru: "Решения под разный бюджет", zh: "适合不同预算的方案", es: "Soluciones para distintos presupuestos", de: "Lösungen für unterschiedliche Budgets" },
  { en: "International recruitment experience", tr: "Uluslararası işe alım deneyimi", ar: "خبرة في التوظيف الدولي", fr: "Expérience du recrutement international", ru: "Опыт международного найма", zh: "丰富的国际招聘经验", es: "Experiencia en contratación internacional", de: "Erfahrung in internationaler Rekrutierung" },
];

// ─── Licences & certificates ─────────────────────────────────────────────────
export const legal = {
  intro: {
    en: "Merç Global carries out its activities in accordance with the legislation of the Republic of Türkiye and holds the approvals of the competent authorities. Our company is authorised by the Turkish Employment Agency (İŞKUR) and operates as a private employment agency.",
    tr: "Merç Global, faaliyetlerini Türkiye Cumhuriyeti mevzuatına uygun şekilde yürütmekte olup, yetkili kurumlar tarafından onaylı bir yapıya sahiptir. Şirketimiz, Türkiye İş Kurumu (İŞKUR) tarafından yetkilendirilmiş olup, özel istihdam bürosu kapsamında hizmet vermektedir.",
    ar: "تمارس Merç Global أنشطتها وفقاً لتشريعات الجمهورية التركية، وتحظى بموافقة الجهات المختصة. وشركتنا مفوّضة من مؤسسة التوظيف التركية (İŞKUR) وتعمل بصفة مكتب توظيف خاص.",
    fr: "Merç Global exerce ses activités conformément à la législation de la République de Turquie et dispose des agréments des autorités compétentes. Notre société est autorisée par l'Agence turque pour l'emploi (İŞKUR) et opère en tant qu'agence privée de placement.",
    ru: "Merç Global ведёт деятельность в соответствии с законодательством Турецкой Республики и имеет одобрение уполномоченных органов. Компания авторизована Турецким агентством занятости (İŞKUR) и работает как частное агентство занятости.", zh: "Merç Global 依照土耳其共和国法律开展业务，并已获得主管部门的批准。本公司经土耳其就业局（İŞKUR）授权，作为私营职业介绍机构提供服务。", es: "Merç Global desarrolla sus actividades conforme a la legislación de la República de Turquía y cuenta con la aprobación de las autoridades competentes. Nuestra empresa está autorizada por la Agencia de Empleo de Turquía (İŞKUR) y opera como agencia privada de empleo.", de: "Merç Global arbeitet im Einklang mit den Gesetzen der Republik Türkei und verfügt über die Genehmigungen der zuständigen Behörden. Unser Unternehmen ist von der türkischen Arbeitsagentur (İŞKUR) zugelassen und als private Arbeitsvermittlung tätig.",
  },
  compTitle: { en: "Our legal competences", tr: "Yasal Yetkinliklerimiz", ar: "صلاحياتنا القانونية", fr: "Nos habilitations légales", ru: "Наши правовые полномочия", zh: "我们的法定资质", es: "Nuestras competencias legales", de: "Unsere rechtlichen Befugnisse" },
  comp: [
    { en: "İŞKUR-licensed private employment agency", tr: "İŞKUR lisanslı özel istihdam bürosu", ar: "مكتب توظيف خاص مرخّص من İŞKUR", fr: "Agence privée de placement agréée İŞKUR", ru: "Частное агентство занятости с лицензией İŞKUR", zh: "İŞKUR 许可的私营职业介绍机构", es: "Agencia privada de empleo autorizada por İŞKUR", de: "Von İŞKUR lizenzierte private Arbeitsvermittlung" },
    { en: "Authorised for international workforce supply", tr: "Uluslararası iş gücü temini yetkinliği", ar: "مخوّلون لتوفير العمالة الدولية", fr: "Habilitée à la fourniture de main-d'œuvre internationale", ru: "Право на международный подбор персонала", zh: "获准从事国际劳务输出", es: "Autorizados para el suministro de personal internacional", de: "Befugt zur internationalen Personalbereitstellung" },
    { en: "Full compliance with legislation in work-permit processes", tr: "Çalışma izni süreçlerinde mevzuata tam uyum", ar: "امتثال كامل للتشريعات في إجراءات تصاريح العمل", fr: "Pleine conformité légale dans les démarches de permis de travail", ru: "Полное соблюдение закона при оформлении разрешений на работу", zh: "工作许可办理完全合规", es: "Pleno cumplimiento legal en los trámites de permisos de trabajo", de: "Volle Gesetzeskonformität bei Arbeitserlaubnisverfahren" },
    { en: "Process management integrated with SGK and other official bodies", tr: "SGK ve ilgili resmi kurumlarla bütünleşmiş süreç yönetimi", ar: "إدارة إجراءات متكاملة مع SGK والجهات الرسمية المعنية", fr: "Gestion des démarches intégrée avec la SGK et les organismes officiels", ru: "Процессы, интегрированные с SGK и другими госорганами", zh: "与 SGK 及其他官方机构一体化的流程管理", es: "Gestión de trámites integrada con la SGK y otros organismos oficiales", de: "Mit SGK und weiteren Behörden verzahntes Prozessmanagement" },
  ] as L[],
  outro: {
    en: "All our services are carried out in line with current legal regulations, offering our clients a safe and transparent service.",
    tr: "Tüm hizmetlerimiz, güncel yasal düzenlemelere uygun olarak yürütülmekte olup, müşterilerimize güvenli ve şeffaf bir hizmet sunulmaktadır.",
    ar: "تُنفَّذ جميع خدماتنا وفقاً للأنظمة القانونية السارية، بما يوفّر لعملائنا خدمة آمنة وشفافة.",
    fr: "Tous nos services sont réalisés conformément à la réglementation en vigueur, pour un service sûr et transparent.",
    ru: "Все услуги оказываются в соответствии с действующим законодательством, что гарантирует клиентам безопасность и прозрачность.", zh: "我们的所有服务均依照现行法规开展，为客户提供安全、透明的服务。", es: "Todos nuestros servicios se realizan conforme a la normativa vigente, ofreciendo a nuestros clientes un servicio seguro y transparente.", de: "Alle Leistungen erbringen wir gemäß den geltenden Vorschriften – für einen sicheren und transparenten Service.",
  },
  docs: [
    { en: "İŞKUR Private Employment Agency Permit (2024–2027)", tr: "İŞKUR Özel İstihdam Bürosu İzin Belgesi (2024–2027)", ar: "ترخيص مكتب التوظيف الخاص من İŞKUR (2024–2027)", fr: "Autorisation d'agence privée de placement İŞKUR (2024–2027)", ru: "Разрешение İŞKUR для частного агентства занятости (2024–2027)", zh: "İŞKUR 私营职业介绍机构许可证（2024–2027）", es: "Autorización de agencia privada de empleo İŞKUR (2024–2027)", de: "İŞKUR-Genehmigung als private Arbeitsvermittlung (2024–2027)" },
    { en: "İŞKUR Private Employment Agency Permit (2021–2024)", tr: "İŞKUR Özel İstihdam Bürosu İzin Belgesi (2021–2024)", ar: "ترخيص مكتب التوظيف الخاص من İŞKUR (2021–2024)", fr: "Autorisation d'agence privée de placement İŞKUR (2021–2024)", ru: "Разрешение İŞKUR для частного агентства занятости (2021–2024)", zh: "İŞKUR 私营职业介绍机构许可证（2021–2024）", es: "Autorización de agencia privada de empleo İŞKUR (2021–2024)", de: "İŞKUR-Genehmigung als private Arbeitsvermittlung (2021–2024)" },
    { en: "Private Employment Agency Permission Certificate — English (2021–2024)", tr: "Özel İstihdam Bürosu İzin Belgesi — İngilizce (2021–2024)", ar: "شهادة ترخيص مكتب التوظيف الخاص — بالإنجليزية (2021–2024)", fr: "Certificat d'autorisation — version anglaise (2021–2024)", ru: "Разрешение частного агентства — на английском (2021–2024)", zh: "私营职业介绍机构许可证——英文版（2021–2024）", es: "Certificado de autorización de agencia privada de empleo — inglés (2021–2024)", de: "Genehmigungsurkunde private Arbeitsvermittlung — Englisch (2021–2024)" },
    { en: "İŞKUR Private Employment Agency Permit (2011–2014)", tr: "İŞKUR Özel İstihdam Bürosu İzin Belgesi (2011–2014)", ar: "ترخيص مكتب التوظيف الخاص من İŞKUR (2011–2014)", fr: "Autorisation d'agence privée de placement İŞKUR (2011–2014)", ru: "Разрешение İŞKUR для частного агентства занятости (2011–2014)", zh: "İŞKUR 私营职业介绍机构许可证（2011–2014）", es: "Autorización de agencia privada de empleo İŞKUR (2011–2014)", de: "İŞKUR-Genehmigung als private Arbeitsvermittlung (2011–2014)" },
    { en: "İŞKUR Private Employment Agency Permit (2021–2024, copy)", tr: "İŞKUR Özel İstihdam Bürosu İzin Belgesi (2021–2024, suret)", ar: "ترخيص مكتب التوظيف الخاص من İŞKUR (2021–2024، نسخة)", fr: "Autorisation İŞKUR (2021–2024, copie)", ru: "Разрешение İŞKUR (2021–2024, копия)", zh: "İŞKUR 私营职业介绍机构许可证（2021–2024，副本）", es: "Autorización de agencia privada de empleo İŞKUR (2021–2024, copia)", de: "İŞKUR-Genehmigung als private Arbeitsvermittlung (2021–2024, Kopie)" },
    { en: "Ankara Chamber of Commerce registration", tr: "Ankara Ticaret Odası kayıt belgesi", ar: "شهادة القيد في غرفة تجارة أنقرة", fr: "Inscription à la Chambre de commerce d'Ankara", ru: "Регистрация в Торговой палате Анкары", zh: "安卡拉商会注册证明", es: "Inscripción en la Cámara de Comercio de Ankara", de: "Eintragung bei der Handelskammer Ankara" },
  ] as L[],
};

// ─── References ──────────────────────────────────────────────────────────────
export const refs = {
  // Current long-term partners (added Nov 2026 at the company's request)
  partnersTitle: { en: "Current partners", tr: "Güncel iş ortaklarımız", ar: "شركاؤنا الحاليون", fr: "Partenaires actuels", ru: "Текущие партнёры", zh: "当前合作伙伴", es: "Socios actuales", de: "Aktuelle Partner" },
  partnersIntro: {
    en: "Companies we are currently working with on an ongoing basis.",
    tr: "Halihazırda düzenli olarak birlikte çalıştığımız firmalar.",
    ar: "شركات نعمل معها حالياً بشكل مستمر.",
    fr: "Entreprises avec lesquelles nous travaillons actuellement de manière continue.",
    ru: "Компании, с которыми мы сейчас работаем на постоянной основе.", zh: "我们目前长期合作的公司。", es: "Empresas con las que trabajamos actualmente de forma continuada.", de: "Unternehmen, mit denen wir derzeit fortlaufend zusammenarbeiten.",
  },
  partnerSince: { en: "Working together since {y}", tr: "{y}'ten beri birlikte çalışıyoruz", ar: "نعمل معاً منذ {y}", fr: "Partenaires depuis {y}", ru: "Работаем вместе с {y} года", zh: "自 {y} 年起合作", es: "Trabajamos juntos desde {y}", de: "Zusammenarbeit seit {y}" },
  partners: [
    { name: "Elbros Construction Limited", country: { en: "Malta", tr: "Malta", ar: "مالطا", fr: "Malte", ru: "Мальта", zh: "马耳他", es: "Malta", de: "Malta" }, since: 2024, sector: { en: "Construction", tr: "İnşaat", ar: "البناء", fr: "Construction", ru: "Строительство", zh: "建筑", es: "Construcción", de: "Bau" } },
    { name: "EOS (Energy Outsourcing Services)", country: { en: "Serbia", tr: "Sırbistan", ar: "صربيا", fr: "Serbie", ru: "Сербия", zh: "塞尔维亚", es: "Serbia", de: "Serbien" }, since: 2023, sector: { en: "Energy", tr: "Enerji", ar: "الطاقة", fr: "Énergie", ru: "Энергетика", zh: "能源", es: "Energía", de: "Energie" } },
  ] as { name: string; country: L; since: number; sector: L }[],
  intlTitle: { en: "International clients — Oil & Gas and Construction", tr: "Uluslararası müşterilerimiz — Petrol & Gaz ve İnşaat", ar: "عملاؤنا الدوليون — النفط والغاز والبناء", fr: "Clients internationaux — Pétrole, gaz et construction", ru: "Международные клиенты — нефть, газ и строительство", zh: "国际客户——石油天然气与建筑", es: "Clientes internacionales — Petróleo, gas y construcción", de: "Internationale Kunden — Öl, Gas & Bau" },
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
  trTitle: { en: "Projects in Türkiye and Turkish companies", tr: "Türkiye projeleri ve Türk firmaları", ar: "مشاريع في تركيا وشركات تركية", fr: "Projets en Turquie et entreprises turques", ru: "Проекты в Турции и турецкие компании", zh: "土耳其项目及土耳其企业", es: "Proyectos en Turquía y empresas turcas", de: "Projekte in der Türkei und türkische Unternehmen" },
  tr: [
    "Geolog International — Netherlands / Turkey offshore project", "ESB International — Ireland & Turkey", "Aslan International Group — Iraq / Turkey", "Uruk Engineering — Iraq / UAE / Turkey",
    "Efor Endüstri — Malıköy, Ankara", "Tosyalı & Toyo Steel — Osmaniye", "Mitsubishi HI — Tosyalı Toyo Steel Plant, Osmaniye", "Hitachi Heavy Industries — Tosyalı Toyo Steel Plant, Osmaniye",
    "GAMA Power — Kabat Power Plant, Iraq / Turkey", "Alarko — Kazakhstan / Morocco / Turkey", "Samsung C&T — Kırıkkale CCPP project", "Trans Globe Energy USA — inspection services in Turkey",
  ],
  medTitle: { en: "Medical recruitment clients", tr: "Medikal personel temini müşterilerimiz", ar: "عملاء التوظيف الطبي", fr: "Clients du recrutement médical", ru: "Клиенты по подбору медперсонала", zh: "医疗人员招聘客户", es: "Clientes de contratación sanitaria", de: "Kunden der Medizinpersonal-Vermittlung" },
  med: [
    {
      name: "Iraq Ministry of Health (2013–2015)",
      text: {
        en: "We recruited 110 medical staff from Pakistan and Türkiye: doctors, nurses, hospital managers, biologists and physiotherapists.",
        tr: "Pakistan ve Türkiye'den 110 sağlık personeli temin ettik: doktor, hemşire, hastane müdürü, biyolog ve fizyoterapist.",
        ar: "وفّرنا 110 من الكوادر الطبية من باكستان وتركيا: أطباء وممرضون ومديرو مستشفيات وأخصائيو أحياء ومعالجون فيزيائيون.",
        fr: "Nous avons recruté 110 professionnels de santé au Pakistan et en Turquie : médecins, infirmiers, directeurs d'hôpital, biologistes et kinésithérapeutes.",
        ru: "Мы подобрали 110 медработников из Пакистана и Турции: врачей, медсестёр, руководителей больниц, биологов и физиотерапевтов.", zh: "我们从巴基斯坦和土耳其招聘了 110 名医务人员：医生、护士、医院管理人员、生物学家和物理治疗师。", es: "Contratamos a 110 profesionales sanitarios de Pakistán y Turquía: médicos, enfermeros, gerentes hospitalarios, biólogos y fisioterapeutas.", de: "Wir vermittelten 110 medizinische Fachkräfte aus Pakistan und der Türkei: Ärzte, Pflegekräfte, Klinikmanager, Biologen und Physiotherapeuten.",
      },
    },
    {
      name: "Ankara Private Bilgi Hospital (2012–2014)",
      text: {
        en: "We recruited 45 staff from Türkiye: doctors, nurses, hospital managers, administrative staff, medical secretaries and IT technicians.",
        tr: "Türkiye'den 45 personel temin ettik: doktor, hemşire, hastane müdürü, idari personel, tıbbi sekreter ve IT teknisyeni.",
        ar: "وفّرنا 45 موظفاً من تركيا: أطباء وممرضون ومديرو مستشفيات وموظفون إداريون وسكرتارية طبية وفنيو تقنية معلومات.",
        fr: "Nous avons recruté 45 personnes en Turquie : médecins, infirmiers, directeurs d'hôpital, personnel administratif, secrétaires médicaux et techniciens informatiques.",
        ru: "Мы подобрали 45 сотрудников из Турции: врачей, медсестёр, руководителей больниц, административный персонал, медсекретарей и IT-специалистов.", zh: "我们从土耳其招聘了 45 名员工：医生、护士、医院管理人员、行政人员、医疗秘书和 IT 技术人员。", es: "Contratamos a 45 personas de Turquía: médicos, enfermeros, gerentes hospitalarios, personal administrativo, secretarios médicos y técnicos informáticos.", de: "Wir vermittelten 45 Mitarbeitende aus der Türkei: Ärzte, Pflegekräfte, Klinikmanager, Verwaltungspersonal, medizinische Sekretäre und IT-Techniker.",
      },
    },
    {
      name: "Adept Hunters Recruiting Co JV (2012–2013)",
      text: {
        en: "Orthopaedic & sports medicine hospital in Qatar, Al Tawasul Specialized Centre and Elite International Medical Centre — 19 physiotherapists, 19 nurses, 3 massage therapists and 10 doctors.",
        tr: "Katar'da ortopedi ve spor hekimliği hastanesi, Al Tawasul Specialized Centre ve Elite International Medical Centre — 19 fizyoterapist, 19 hemşire, 3 masaj terapisti ve 10 doktor.",
        ar: "مستشفى العظام والطب الرياضي في قطر، ومركز التواصل التخصصي، ومركز النخبة الطبي الدولي — 19 معالجاً فيزيائياً و19 ممرضاً و3 معالجين بالتدليك و10 أطباء.",
        fr: "Hôpital d'orthopédie et de médecine du sport au Qatar, Al Tawasul Specialized Centre et Elite International Medical Centre — 19 kinésithérapeutes, 19 infirmiers, 3 masseurs et 10 médecins.",
        ru: "Больница ортопедии и спортивной медицины в Катаре, Al Tawasul Specialized Centre и Elite International Medical Centre — 19 физиотерапевтов, 19 медсестёр, 3 массажиста и 10 врачей.", zh: "卡塔尔骨科与运动医学医院、Al Tawasul 专科中心及 Elite 国际医疗中心——19 名物理治疗师、19 名护士、3 名按摩治疗师和 10 名医生。", es: "Hospital de ortopedia y medicina deportiva en Catar, Al Tawasul Specialized Centre y Elite International Medical Centre — 19 fisioterapeutas, 19 enfermeros, 3 masajistas y 10 médicos.", de: "Klinik für Orthopädie & Sportmedizin in Katar, Al Tawasul Specialized Centre und Elite International Medical Centre — 19 Physiotherapeuten, 19 Pflegekräfte, 3 Masseure und 10 Ärzte.",
      },
    },
    {
      name: "Whitaker Mawarid Hospital Management Services, Riyadh K.S.A. (1986–89)",
      text: {
        en: "We recruited medical and administrative staff — 165 people in total.",
        tr: "Toplam 165 kişilik tıbbi ve idari personel temin ettik.",
        ar: "وفّرنا كوادر طبية وإدارية بلغ مجموعها 165 شخصاً.",
        fr: "Nous avons recruté du personnel médical et administratif — 165 personnes au total.",
        ru: "Мы подобрали медицинский и административный персонал — всего 165 человек.", zh: "我们招聘了医疗和行政人员，共计 165 人。", es: "Contratamos personal sanitario y administrativo: 165 personas en total.", de: "Wir vermittelten medizinisches und administratives Personal — insgesamt 165 Personen.",
      },
    },
  ] as { name: string; text: L }[],
  cateringTitle: { en: "Catering and hospitality clients", tr: "Catering ve konaklama sektörü müşterilerimiz", ar: "عملاء قطاع الإعاشة والضيافة", fr: "Clients restauration et hôtellerie", ru: "Клиенты в общепите и гостеприимстве", zh: "餐饮与酒店服务客户", es: "Clientes de catering y hostelería", de: "Kunden aus Catering und Gastgewerbe" },
  catering: [
    "Azizia Panda Hypermarkets — Riyadh, K.S.A.", "Danube Hypermarkets — K.S.A.", "Sanabel Hypermarkets — K.S.A.", "Flynas Airways — K.S.A.",
    "Alsiddiqi Holding — Qatar", "Shaqab Abela Catering Service Co. W.L.L — Qatar", "Saed Istikdam — K.S.A.", "Takween Arabian",
    "Big Chefs Café & Brasserie — K.S.A.", "ETE Housing & Catering — K.S.A.", "Al Naba Holding LLC — Oman", "Kuwait Resources House — Kuwait",
  ],
};

export const referenceCount = refs.partners.length + refs.intl.length + refs.tr.length + refs.med.length + refs.catering.length;
