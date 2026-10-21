// Тексты сайта (RU / EN). Цифры, цены и условия — только из брифа и прайса «цены 2026.xlsx».

export const ui = {
  ru: {
    lang: 'ru', locale: 'ru_RU', other: 'en', otherLabel: 'EN', otherName: 'English',
    home: 'Главная', menu: 'Меню', close: 'Закрыть',
    request: 'Оставить заявку', call: 'Позвонить', calc: 'Рассчитать стоимость',
    more: 'Подробнее', allProjects: 'Все проекты', allServices: 'Все услуги',
    priceFrom: 'Цена', viewPhotos: 'Смотреть фото',
    emptyCategory: 'Фотографии проектов этого направления скоро появятся. Покажем примеры и визуализации по запросу.',
    reviewsEmpty: 'Раздел отзывов уже открыт. Реальных отзывов пока нет — не публикуем выдуманные. Если вы работали с нами, напишите — разместим ваш отзыв.',
    formTitle: 'Оставьте заявку', formLead: 'Ответим, уточним задачу и подготовим предложение за 2–3 дня.',
    fName: 'Имя', fPhone: 'Телефон', fEmail: 'Почта', fComment: 'Комментарий',
    fCommentPh: 'Выставка, даты, площадь стенда, бюджет — всё, что знаете',
    fConsent: 'Я соглашаюсь на <a href="{privacy}" target="_blank">обработку персональных данных</a>',
    fSubmit: 'Отправить заявку', fSending: 'Отправляем…',
    fOk: 'Спасибо! Заявка отправлена — мы свяжемся с вами в ближайшее время.',
    fErr: 'Не удалось отправить заявку. Позвоните нам: ',
    fRequired: 'Заполните имя, телефон и подтвердите согласие.',
    cookie: 'Мы используем cookie и Яндекс Метрику, чтобы сайт работал удобнее. Продолжая пользоваться сайтом, вы соглашаетесь с <a href="{privacy}">политикой обработки данных</a>.',
    cookieOk: 'Понятно',
    phone: 'Телефон', email: 'Почта', address: 'Адрес', hours: 'Часы работы',
    requisites: 'Реквизиты', privacy: 'Политика конфиденциальности',
    readMore: 'Читать статью', minRead: 'мин чтения',
    stands: 'Выставочные стенды', art: 'Арт-объекты', services: 'Услуги', portfolio: 'Портфолио',
    prices: 'Цены', about: 'О компании', reviews: 'Отзывы', faq: 'Вопросы и ответы', blog: 'Блог', contacts: 'Контакты',
    filterAll: 'Все', photo: 'Фото', prev: 'Назад', next: 'Вперёд',
    rights: 'Все права защищены.',
    offerNote: 'Информация на сайте не является публичной офертой.',
    clientsTitle: 'С кем мы работаем',
    clientLogo: 'Логотип клиента',
  },
  en: {
    lang: 'en', locale: 'en_US', other: 'ru', otherLabel: 'RU', otherName: 'Русский',
    home: 'Home', menu: 'Menu', close: 'Close',
    request: 'Send a request', call: 'Call us', calc: 'Get a quote',
    more: 'Learn more', allProjects: 'All projects', allServices: 'All services',
    priceFrom: 'Price', viewPhotos: 'View photos',
    emptyCategory: 'Project photos for this category are coming soon. We will share examples and renders on request.',
    reviewsEmpty: 'The reviews section is live. We do not publish made-up testimonials. If you have worked with us, send a message — we will publish your review.',
    formTitle: 'Send a request', formLead: 'We will get back to you, clarify the brief and prepare a proposal within 2–3 days.',
    fName: 'Name', fPhone: 'Phone', fEmail: 'Email', fComment: 'Comment',
    fCommentPh: 'Exhibition, dates, stand area, budget — anything you know',
    fConsent: 'I agree to the <a href="{privacy}" target="_blank">processing of personal data</a>',
    fSubmit: 'Send request', fSending: 'Sending…',
    fOk: 'Thank you! Your request has been sent — we will contact you shortly.',
    fErr: 'The request could not be sent. Please call us: ',
    fRequired: 'Please enter your name and phone and confirm your consent.',
    cookie: 'We use cookies and Yandex Metrica to make the website more convenient. By continuing to use the site you accept our <a href="{privacy}">privacy policy</a>.',
    cookieOk: 'OK',
    phone: 'Phone', email: 'Email', address: 'Address', hours: 'Opening hours',
    requisites: 'Company details', privacy: 'Privacy policy',
    readMore: 'Read article', minRead: 'min read',
    stands: 'Exhibition stands', art: 'Art objects', services: 'Services', portfolio: 'Portfolio',
    prices: 'Prices', about: 'About', reviews: 'Reviews', faq: 'FAQ', blog: 'Blog', contacts: 'Contacts',
    filterAll: 'All', photo: 'Photo', prev: 'Previous', next: 'Next',
    rights: 'All rights reserved.',
    offerNote: 'The information on this website is not a public offer.',
    clientsTitle: 'Who we work with',
    clientLogo: 'Client logo',
  },
};

export const numbers = [
  { value: '5+', ru: 'лет работает компания', en: 'years in business' },
  { value: '20+', ru: 'лет опыта команды в выставочной сфере', en: 'years of team experience in exhibitions' },
  { value: '100+', ru: 'клиентов', en: 'clients' },
  { value: '100%', ru: 'гарантия соблюдения сроков и качества', en: 'guarantee on deadlines and quality' },
];

export const advantages = [
  { icon: 'exp', ru: ['Большой опыт', 'Команда работает в выставочной сфере больше 20 лет и знает, как довести стенд от идеи до открытия выставки без сюрпризов.'],
    en: ['Solid experience', 'Our team has worked in the exhibition industry for over 20 years and knows how to take a stand from idea to opening day without surprises.'] },
  { icon: 'fast', ru: ['Оперативная работа', 'Предложение — за 2–3 дня, подготовка стенда — за 1–2 недели. Берём проекты с короткими сроками.'],
    en: ['Fast turnaround', 'A proposal in 2–3 days and stand preparation in 1–2 weeks. We take on projects with tight deadlines.'] },
  { icon: 'factory', ru: ['Собственное производство', 'Изготавливаем конструкции сами — так мы контролируем сроки, качество и стоимость.'],
    en: ['In-house production', 'We build the structures ourselves, so we control deadlines, quality and cost.'] },
  { icon: 'price', ru: ['Выгодные цены', 'Работаем под бюджет клиента и предлагаем решения, которые выглядят дорого, но не выходят за рамки сметы.'],
    en: ['Competitive prices', 'We work to your budget and offer solutions that look premium without exceeding the estimate.'] },
  { icon: 'heart', ru: ['Лояльность к клиентам', 'Скидка 5% на первый проект, +2% на каждый следующий и подарочный сертификат после завершения договора.'],
    en: ['Loyalty to clients', '5% off your first project, +2% on each next one and a gift certificate when the contract is completed.'] },
  { icon: 'eye', ru: ['Визуализация до договора', 'Сначала показываем дизайн и расчёт — договор подписываем, когда вы видите будущий стенд и понимаете цену.'],
    en: ['Visualisation before the contract', 'We show the design and estimate first — the contract is signed once you can see the stand and know the price.'] },
];

export const steps = [
  { ru: ['Заявка', 'Оставляете заявку на сайте или звоните. Уточняем выставку, площадь, сроки и бюджет.'],
    en: ['Request', 'Send a request or call us. We clarify the exhibition, area, timing and budget.'] },
  { ru: ['Дизайн', 'Разрабатываем концепцию и визуализацию стенда под ваши задачи.'],
    en: ['Design', 'We develop the concept and visualisation of the stand for your goals.'] },
  { ru: ['Расчёт', 'Готовим смету. Предложение — за 2–3 дня, подстраиваемся под бюджет.'],
    en: ['Estimate', 'We prepare the estimate. Proposal in 2–3 days, adapted to your budget.'] },
  { ru: ['Договор', 'Фиксируем состав работ, сроки и стоимость. До подписания — скидка 5%.'],
    en: ['Contract', 'We fix the scope, timing and price. 5% discount before signing.'] },
  { ru: ['Подготовка', 'Производим конструкции, печать и оборудование. Обычно 1–2 недели.'],
    en: ['Preparation', 'We produce structures, print and equipment. Usually 1–2 weeks.'] },
  { ru: ['Монтаж и демонтаж', 'Собираем стенд на площадке, сдаём его вам, а после выставки демонтируем.'],
    en: ['Installation & dismantling', 'We assemble the stand on site, hand it over and dismantle it after the show.'] },
];

export const faq = [
  { ru: ['Сколько стоит выставочный стенд?', 'Делаем под бюджет клиента. Стоимость зависит от площади, конструкции, оборудования и сроков. Ориентир — от 30 000 ₽, точную цену рассчитаем после брифа.'],
    en: ['How much does an exhibition stand cost?', 'We work to the client’s budget. The price depends on the area, structure, equipment and timing. Stands start from 30,000 RUB; we will calculate the exact price after a brief.'] },
  { ru: ['У вас есть своё производство?', 'Да, у нас собственное производство. Поэтому мы сами отвечаем за сроки и качество.'],
    en: ['Do you have your own production?', 'Yes, we have in-house production, so we are fully responsible for deadlines and quality.'] },
  { ru: ['За сколько вы подготовите предложение?', 'За 2–3 дня. В предложение входят дизайн и расчёт стоимости.'],
    en: ['How fast will you prepare a proposal?', 'Within 2–3 days. It includes the design and the cost estimate.'] },
  { ru: ['Сколько времени нужно на подготовку стенда?', '1–2 недели — от утверждения проекта до готовности к монтажу.'],
    en: ['How long does it take to prepare a stand?', '1–2 weeks from project approval to readiness for installation.'] },
  { ru: ['Покажете, как будет выглядеть стенд?', 'Да. Сначала делаем дизайн и визуализацию, затем расчёт — договор подписываем, когда проект вас устраивает.'],
    en: ['Will you show what the stand will look like?', 'Yes. We start with the design and visualisation, then the estimate — the contract is signed once you are happy with the project.'] },
  { ru: ['Есть ли скидки?', 'Да. На первый проект — скидка 5% при подписании договора, на каждый следующий скидка растёт на 2%. После завершения договора дарим подарочный сертификат.'],
    en: ['Do you offer discounts?', 'Yes. 5% off your first project when you sign the contract, and the discount grows by 2% with each next project. When the contract is completed, you get a gift certificate.'] },
  { ru: ['Где вы работаете?', 'Офис — в Москве, работаем в Москве и Московской области и делаем выставочные стенды под ключ по России.'],
    en: ['Where do you work?', 'Our office is in Moscow. We work in Moscow and the Moscow region and build turnkey exhibition stands across Russia.'] },
  { ru: ['Вы занимаетесь демонтажем?', 'Да, монтаж и демонтаж входят в работу под ключ.'],
    en: ['Do you handle dismantling?', 'Yes, installation and dismantling are part of our turnkey service.'] },
];

// Направления портфолио. dir — папка в content/photos.
export const standCats = [
  {
    id: 'poluostrov', dir: 'stendy/poluostrov', slug: { ru: 'poluostrov', en: 'peninsula' },
    name: { ru: 'Стенд-полуостров', en: 'Peninsula stand' },
    title: { ru: 'Стенд-полуостров: 3 стороны открыты — ЛучЭкспо', en: 'Peninsula stand: 3 sides open — RayExpo' },
    desc: { ru: 'Стенд-полуостров — это стенд, у которого открыты три стороны. Дизайн, производство и монтаж под ключ. От 30 000 ₽.',
      en: 'A peninsula stand is a stand with three sides open. Design, production and turnkey installation. From 30,000 RUB.' },
    h1: { ru: 'Стенд-полуостров: 3 стороны открыты', en: 'Peninsula stand: 3 sides open' },
    intro: {
      ru: 'Стенд-полуостров — это стенд, у которого открыты три стороны. Четвёртая сторона примыкает к соседней экспозиции. Формат собирает посетителей сразу из нескольких проходов и даёт место для продукта, переговорной и складской зоны.',
      en: 'A peninsula stand is a stand with three sides open. The fourth side borders a neighbouring display. The format draws visitors from several aisles at once and leaves room for products, a meeting area and storage.' },
    features: {
      ru: ['Обзор с трёх проходов', 'Зонирование: экспозиция, переговорная, подсобка', 'Задняя стена — под брендинг или LED-экран', 'Подвесные конструкции и подсветка'],
      en: ['Visible from three aisles', 'Zoning: display, meeting area, storage', 'Back wall for branding or an LED screen', 'Suspended structures and lighting'] },
  },
  {
    id: 'dvuhetazhnye', dir: 'stendy/dvuhetazhnye', slug: { ru: 'dvuhetazhnye', en: 'double-deck' },
    name: { ru: 'Двухэтажный стенд', en: 'Double-deck stand' },
    title: { ru: 'Двухэтажный выставочный стенд под ключ — ЛучЭкспо', en: 'Double-deck exhibition stand, turnkey — RayExpo' },
    desc: { ru: 'Двухэтажные выставочные стенды: экспозиция внизу, переговорные наверху. Проектирование, производство, монтаж и демонтаж под ключ.',
      en: 'Double-deck exhibition stands: display on the ground floor, meeting rooms upstairs. Design, production, installation and dismantling.' },
    h1: { ru: 'Двухэтажный выставочный стенд', en: 'Double-deck exhibition stand' },
    intro: {
      ru: 'Второй этаж удваивает полезную площадь без доплаты за метры в павильоне. Внизу — открытая экспозиция и приём гостей, наверху — тихие переговорные или VIP-зона. Стенд виден издалека и работает на статус компании.',
      en: 'A second floor doubles the usable area without paying for extra hall space. The ground floor hosts the open display and reception, while the upper level holds quiet meeting rooms or a VIP area. The stand is visible from afar and boosts your company’s image.' },
    features: {
      ru: ['Удвоенная полезная площадь', 'Переговорные и VIP-зона на втором ярусе', 'Расчёт конструкции и согласование с площадкой', 'Лестницы, ограждения, освещение'],
      en: ['Double the usable area', 'Meeting rooms and VIP area upstairs', 'Structural design and venue approval', 'Stairs, railings, lighting'] },
  },
  {
    id: 'eksklyuzivnye', dir: 'stendy/eksklyuzivnye', slug: { ru: 'eksklyuzivnye', en: 'custom' },
    name: { ru: 'Эксклюзивный стенд', en: 'Custom stand' },
    title: { ru: 'Эксклюзивные выставочные стенды на заказ — ЛучЭкспо', en: 'Custom exhibition stands to order — RayExpo' },
    desc: { ru: 'Эксклюзивные выставочные стенды по индивидуальному дизайну: нестандартные формы, материалы и свет. Собственное производство, монтаж под ключ.',
      en: 'Custom exhibition stands with bespoke design: unusual shapes, materials and lighting. In-house production and turnkey installation.' },
    h1: { ru: 'Эксклюзивные выставочные стенды', en: 'Custom exhibition stands' },
    intro: {
      ru: 'Эксклюзивный стенд создаётся с нуля под бренд и задачу: нестандартная архитектура, живое озеленение, сложный свет, презентационные зоны. Мы разрабатываем дизайн, показываем визуализацию и изготавливаем всё на своём производстве.',
      en: 'A custom stand is built from scratch around your brand and goal: unusual architecture, live greenery, complex lighting, presentation zones. We develop the design, show you the visualisation and manufacture everything in-house.' },
    features: {
      ru: ['Индивидуальная архитектура', 'Натуральные и сложные материалы', 'Сценический и декоративный свет', 'Зоны для презентаций и пресс-подходов'],
      en: ['Bespoke architecture', 'Natural and complex materials', 'Stage and decorative lighting', 'Areas for presentations and press'] },
  },
  {
    id: 'uglovye', dir: 'stendy/uglovye', slug: { ru: 'uglovye', en: 'corner' },
    name: { ru: 'Угловой стенд', en: 'Corner stand' },
    title: { ru: 'Угловой выставочный стенд: дизайн и застройка — ЛучЭкспо', en: 'Corner exhibition stand: design and build — RayExpo' },
    desc: { ru: 'Угловые выставочные стенды с обзором с двух проходов. Дизайн, изготовление на своём производстве, монтаж и демонтаж. Москва, МО и вся Россия.',
      en: 'Corner exhibition stands visible from two aisles. Design, in-house production, installation and dismantling. Moscow, Moscow region and all of Russia.' },
    h1: { ru: 'Угловой выставочный стенд', en: 'Corner exhibition stand' },
    intro: {
      ru: 'Угловой стенд открыт с двух сторон и стоит на пересечении проходов — посетители видят его с двух направлений. Это хороший баланс между заметностью и бюджетом: две стены остаются под брендинг, хранение и экраны.',
      en: 'A corner stand is open on two sides at the intersection of aisles, so visitors see it from two directions. It balances visibility and budget: two walls remain for branding, storage and screens.' },
    features: {
      ru: ['Обзор с двух проходов', 'Две стены под брендинг и экраны', 'Стойка-ресепшн на углу', 'Оптимальный бюджет'],
      en: ['Visible from two aisles', 'Two walls for branding and screens', 'Reception desk on the corner', 'Reasonable budget'] },
  },
  {
    id: 'ulichnye', dir: 'stendy/ulichnye', slug: { ru: 'ulichnye', en: 'outdoor' },
    name: { ru: 'Уличный стенд', en: 'Outdoor stand' },
    title: { ru: 'Уличные выставочные стенды и павильоны — ЛучЭкспо', en: 'Outdoor exhibition stands and pavilions — RayExpo' },
    desc: { ru: 'Уличные выставочные стенды и павильоны для ярмарок, фестивалей и промо: устойчивые конструкции, защита от погоды, брендинг. Под ключ.',
      en: 'Outdoor exhibition stands and pavilions for fairs, festivals and promotions: stable structures, weather protection, branding. Turnkey.' },
    h1: { ru: 'Уличный выставочный стенд', en: 'Outdoor exhibition stand' },
    intro: {
      ru: 'Уличные стенды и павильоны работают на ярмарках, городских фестивалях и промо-акциях. Конструкция должна быть устойчивой к ветру и осадкам, а брендинг — читаться издалека. Делаем павильоны с крышей, подсветкой, торговым оборудованием и зонами отдыха.',
      en: 'Outdoor stands and pavilions are used at fairs, city festivals and promotions. The structure must withstand wind and rain, and the branding must be readable from a distance. We build pavilions with roofs, lighting, retail fixtures and lounge areas.' },
    features: {
      ru: ['Устойчивые к погоде конструкции', 'Крыша, пол и подсветка', 'Торговое оборудование и выкладка', 'Быстрый монтаж на площадке'],
      en: ['Weather-resistant structures', 'Roof, floor and lighting', 'Retail fixtures and display', 'Fast on-site installation'] },
  },
  {
    id: 's-ekranom', dir: 'stendy/s-ekranom', slug: { ru: 's-ekranom', en: 'with-led-screen' },
    name: { ru: 'Стенд с экраном', en: 'Stand with LED screen' },
    title: { ru: 'Выставочный стенд с LED-экраном под ключ — ЛучЭкспо', en: 'Exhibition stand with an LED screen — RayExpo' },
    desc: { ru: 'Выставочные стенды с LED-экранами и медиастенами: видео, презентации и динамичный контент привлекают внимание. Дизайн, производство, монтаж.',
      en: 'Exhibition stands with LED screens and media walls: video, presentations and dynamic content attract attention. Design, production, installation.' },
    h1: { ru: 'Выставочный стенд с экраном', en: 'Exhibition stand with an LED screen' },
    intro: {
      ru: 'LED-экран превращает стенд в медиаплощадку: видео о продукте, презентации и анимация удерживают внимание посетителей дольше, чем статичная печать. Встраиваем экраны в стены, подвесы и стойки-ресепшн и продумываем контент под формат.',
      en: 'An LED screen turns the stand into a media venue: product videos, presentations and animation keep visitors’ attention longer than static print. We build screens into walls, ceilings and reception desks and plan the content for the format.' },
    features: {
      ru: ['LED-экраны и медиастены', 'Круглые и нестандартные экраны', 'Световые линии и подсветка', 'Интеграция в конструкцию стенда'],
      en: ['LED screens and media walls', 'Round and non-standard screens', 'Light lines and illumination', 'Built into the stand structure'] },
  },
];

export const artCats = [
  {
    id: 'obemnye-figury', dir: 'art/obemnye-figury', slug: { ru: 'obemnye-figury', en: '3d-figures' },
    price: 10000,
    name: { ru: 'Объёмные фигуры', en: '3D figures' },
    title: { ru: 'Объёмные фигуры на заказ для выставок и ТЦ — ЛучЭкспо', en: '3D figures to order for events and malls — RayExpo' },
    desc: { ru: 'Изготовим объёмные фигуры для выставок, торговых центров, фотозон и мероприятий. Дизайн и производство под ключ. От 10 000 ₽.',
      en: '3D figures for exhibitions, shopping malls, photo zones and events. Turnkey design and production. From 10,000 RUB.' },
    h1: { ru: 'Объёмные фигуры', en: '3D figures' },
    intro: {
      ru: 'Объёмные фигуры становятся центром внимания на стенде, в торговом центре или на мероприятии: персонажи, символы года, макеты продукции. Делаем в том числе из пенопласта: разрабатываем форму, красим и монтируем.',
      en: '3D figures become the centre of attention at a stand, in a mall or at an event: characters, year symbols, product models. We also make them from foam: we develop the shape, paint and install.' },
    features: {
      ru: ['Фигуры из пенопласта', 'Персонажи и символы года', 'Макеты продукции', 'Подсветка и покраска'],
      en: ['Foam figures', 'Characters and year symbols', 'Product models', 'Lighting and painting'] },
  },
  {
    id: 'oformlenie-vitrin', dir: 'art/oformlenie-vitrin', slug: { ru: 'oformlenie-vitrin', en: 'shop-windows' },
    price: 20000,
    name: { ru: 'Изготовление и оформление витрин', en: 'Shop window design & production' },
    title: { ru: 'Изготовление и оформление витрин на заказ — ЛучЭкспо', en: 'Shop window design and production — RayExpo' },
    desc: { ru: 'Изготовление и оформление витрин для магазинов и шоурумов: витрины, подиумы, стеллажи и свет. Дизайн, производство и монтаж. От 20 000 ₽.',
      en: 'Shop window production and styling for stores and showrooms: cases, podiums, shelving and lighting. Design, production and installation.' },
    h1: { ru: 'Изготовление и оформление витрин', en: 'Shop window design and production' },
    intro: {
      ru: 'Проектируем и изготавливаем витрины для магазинов, шоурумов и торговых галерей: корпуса, стекло, подиумы, стеллажи и подсветку. Подбираем решение под товар, бренд и регламент торговой точки.',
      en: 'We design and build shop windows for stores, showrooms and retail galleries: cases, glass, podiums, shelving and lighting. The solution is tailored to the product, the brand and the venue rules.' },
    features: {
      ru: ['Витрины и стеклянные кубы', 'Подиумы и стеллажи', 'Подсветка и брендинг', 'Изготовление и монтаж'],
      en: ['Display cases and glass cubes', 'Podiums and shelving', 'Lighting and branding', 'Production and installation'] },
  },
  {
    id: 'arhitekturnye-formy', dir: 'art/arhitekturnye-formy', slug: { ru: 'arhitekturnye-formy', en: 'architectural-forms' },
    price: 30000,
    name: { ru: 'Архитектурные формы', en: 'Architectural forms' },
    title: { ru: 'Малые архитектурные формы на заказ — ЛучЭкспо', en: 'Small architectural forms to order — RayExpo' },
    desc: { ru: 'Архитектурные формы для общественных пространств, мероприятий и брендинга: арки, павильоны, инсталляции. Изготовление и монтаж. От 30 000 ₽.',
      en: 'Architectural forms for public spaces, events and branding: arches, pavilions, installations. Production and installation. From 30,000 RUB.' },
    h1: { ru: 'Архитектурные формы', en: 'Architectural forms' },
    intro: {
      ru: 'Арки, павильоны, инсталляции и объёмные уличные буквы для мероприятий, торговых и общественных пространств. Проектируем с учётом нагрузки и погоды, изготавливаем и монтируем.',
      en: 'Arches, pavilions, installations and 3D outdoor letters for events, retail and public spaces. We design for loads and weather, manufacture and install.' },
    features: {
      ru: ['Объёмные уличные буквы', 'Арки и входные группы', 'Павильоны и инсталляции', 'Изготовление и монтаж'],
      en: ['3D outdoor letters', 'Arches and entrance groups', 'Pavilions and installations', 'Production and installation'] },
  },
  {
    id: 'novogodnee-oformlenie', dir: 'art/novogodnee-oformlenie', slug: { ru: 'novogodnee-oformlenie', en: 'new-year-decor' },
    price: 10000,
    name: { ru: 'Новогоднее оформление', en: 'New Year decor' },
    title: { ru: 'Новогоднее оформление ТЦ, офисов и витрин — ЛучЭкспо', en: 'New Year decor for malls, offices and shops — RayExpo' },
    desc: { ru: 'Новогоднее оформление торговых центров, витрин, входных групп и офисов: ели, арки, фотозоны, пресс-воллы. Дизайн и монтаж. От 10 000 ₽.',
      en: 'New Year decor for shopping malls, shop windows, entrances and offices: trees, arches, photo zones, press walls. Design and installation.' },
    h1: { ru: 'Новогоднее оформление', en: 'New Year decor' },
    intro: {
      ru: 'Создаём праздничное настроение в торговых центрах, магазинах и офисах: большие ели, оформление входных групп и витрин, фотозоны и брендированные пресс-воллы. Монтируем в удобное время, после праздников — демонтируем.',
      en: 'We create a festive mood in shopping malls, shops and offices: large trees, entrance and window decoration, photo zones and branded press walls. We install at a convenient time and dismantle after the holidays.' },
    features: {
      ru: ['Большие ели и композиции', 'Входные группы и витрины', 'Фотозоны и пресс-воллы', 'Монтаж и демонтаж'],
      en: ['Large trees and compositions', 'Entrances and shop windows', 'Photo zones and press walls', 'Installation and dismantling'] },
  },
  {
    id: 'oformlenie-tc', dir: 'art/oformlenie-tc', slug: { ru: 'oformlenie-tc', en: 'mall-decor' },
    price: 30000,
    name: { ru: 'Оформление ТЦ', en: 'Mall decor' },
    title: { ru: 'Оформление ТЦ: островки, киоски, промо-зоны — ЛучЭкспо', en: 'Mall decor: islands, kiosks, promo zones — RayExpo' },
    desc: { ru: 'Островные модули, киоски, промо-зоны и оформление торговых центров под ключ: дизайн, производство и монтаж. От 30 000 ₽.',
      en: 'Island modules, kiosks, promo zones and turnkey mall decor: design, production and installation. From 30,000 RUB.' },
    h1: { ru: 'Оформление торговых центров', en: 'Shopping mall decor' },
    intro: {
      ru: 'Проектируем и изготавливаем островные торговые модули, киоски, промо-стойки и сезонное оформление для торговых центров. Учитываем требования ТЦ к материалам, электрике и монтажу в ночное время.',
      en: 'We design and build retail island modules, kiosks, promo counters and seasonal decor for shopping malls. We take into account the mall’s requirements for materials, electrics and night-time installation.' },
    features: {
      ru: ['Островные модули и киоски', 'Промо-зоны брендов', 'Витрины и подсветка', 'Монтаж по регламенту ТЦ'],
      en: ['Island modules and kiosks', 'Brand promo zones', 'Showcases and lighting', 'Installation per mall rules'] },
  },
];

export const services = [
  {
    id: 'dizajn', slug: { ru: 'dizajn-vystavochnyh-stendov', en: 'stand-design' },
    name: { ru: 'Дизайн выставочных стендов', en: 'Exhibition stand design' },
    title: { ru: 'Дизайн выставочных стендов и 3D-визуализация — ЛучЭкспо', en: 'Exhibition stand design and 3D visualisation — RayExpo' },
    desc: { ru: 'Разработаем дизайн выставочного стенда и визуализацию до подписания договора. Концепция под бренд, задачи и бюджет. Предложение за 2–3 дня.',
      en: 'We will develop your exhibition stand design and visualisation before the contract is signed. Concept for your brand, goals and budget.' },
    short: { ru: 'Концепция и визуализация стенда под бренд, задачи и бюджет.', en: 'Stand concept and visualisation for your brand, goals and budget.' },
    intro: {
      ru: 'Хороший стенд начинается с понятной идеи: что увидит посетитель из прохода, куда он пойдёт и с кем будет говорить. Мы разрабатываем концепцию, планировку и визуализацию — вы видите будущий стенд ещё до договора и можете внести правки.',
      en: 'A good stand starts with a clear idea: what visitors see from the aisle, where they go and who they talk to. We develop the concept, layout and visualisation, so you see the stand before the contract and can request changes.' },
    includes: {
      ru: ['Бриф: цели участия, продукт, бюджет', 'Концепция и планировка зон', 'Визуализация стенда', 'Подбор материалов, света и оборудования', 'Расчёт стоимости'],
      en: ['Brief: goals, product, budget', 'Concept and zone layout', 'Stand visualisation', 'Materials, lighting and equipment', 'Cost estimate'] },
  },
  {
    id: 'izgotovlenie', slug: { ru: 'izgotovlenie-vystavochnyh-stendov', en: 'stand-production' },
    name: { ru: 'Изготовление выставочных стендов', en: 'Exhibition stand production' },
    title: { ru: 'Изготовление выставочных стендов на своём производстве', en: 'Exhibition stand production in-house — RayExpo' },
    desc: { ru: 'Производим выставочные стенды, арт-объекты и декорации на собственном производстве. Контроль сроков и качества. Подготовка за 1–2 недели.',
      en: 'We produce exhibition stands, art objects and sets in-house. Full control of deadlines and quality. Preparation in 1–2 weeks.' },
    short: { ru: 'Собственное производство конструкций, мебели и декора.', en: 'In-house production of structures, furniture and decor.' },
    intro: {
      ru: 'Всё, что вы видите на визуализации, мы изготавливаем сами: конструкции, подиумы, стойки, витрины, декоративные элементы. Собственное производство позволяет держать сроки, контролировать качество и не переплачивать посредникам.',
      en: 'Everything you see in the visualisation we make ourselves: structures, podiums, counters, showcases, decorative elements. In-house production lets us keep deadlines, control quality and avoid paying middlemen.' },
    includes: {
      ru: ['Каркасы и конструкции стенда', 'Подиумы, стойки, витрины', 'Печать и брендинг', 'Свет и LED-экраны', 'Подготовка за 1–2 недели'],
      en: ['Stand frames and structures', 'Podiums, counters, showcases', 'Print and branding', 'Lighting and LED screens', 'Preparation in 1–2 weeks'] },
  },
  {
    id: 'montazh', slug: { ru: 'montazh-i-demontazh-stendov', en: 'installation-and-dismantling' },
    name: { ru: 'Монтаж и демонтаж стендов', en: 'Stand installation & dismantling' },
    title: { ru: 'Монтаж и демонтаж выставочных стендов — ЛучЭкспо', en: 'Exhibition stand installation and dismantling — RayExpo' },
    desc: { ru: 'Монтаж и демонтаж выставочных стендов в Москве, МО и на площадках по России. Сдаём стенд к открытию, после выставки вывозим конструкции.',
      en: 'Installation and dismantling of exhibition stands in Moscow, the Moscow region and venues across Russia. Ready by opening day.' },
    short: { ru: 'Сборка на площадке к открытию и демонтаж после выставки.', en: 'On-site assembly before opening and dismantling after the show.' },
    intro: {
      ru: 'Наша монтажная команда собирает стенд на площадке в отведённое время, подключает свет и оборудование и передаёт готовый стенд вам. После закрытия выставки демонтируем конструкции и вывозим их с площадки.',
      en: 'Our installation crew assembles the stand on site within the allotted time, connects lighting and equipment and hands the finished stand over to you. When the show closes, we dismantle and remove the structures.' },
    includes: {
      ru: ['Доставка конструкций на площадку', 'Монтаж в отведённое время', 'Подключение света и экранов', 'Передача стенда', 'Демонтаж и вывоз'],
      en: ['Delivery to the venue', 'Installation within the allotted time', 'Lighting and screen connection', 'Stand handover', 'Dismantling and removal'] },
  },
  {
    id: 'dekoracii', slug: { ru: 'dekoracii', en: 'sets-and-decorations' },
    name: { ru: 'Декорации и арт-объекты', en: 'Sets and art objects' },
    title: { ru: 'Декорации и арт-объекты для мероприятий — ЛучЭкспо', en: 'Sets and art objects for events — RayExpo' },
    desc: { ru: 'Декорации для мероприятий, съёмок и сцены, объёмные фигуры, фотозоны и новогоднее оформление. Дизайн, производство и монтаж под ключ.',
      en: 'Sets for events, shoots and stages, 3D figures, photo zones and New Year decor. Turnkey design, production and installation.' },
    short: { ru: 'Декорации, фотозоны, объёмные фигуры и сезонное оформление.', en: 'Sets, photo zones, 3D figures and seasonal decor.' },
    intro: {
      ru: 'Кроме стендов, мы делаем оформление витрин, объёмные фигуры, фотозоны, пресс-воллы, оформление торговых центров и новогодний декор. Подход тот же: дизайн, расчёт, производство и монтаж силами одной команды.',
      en: 'Besides stands, we make shop windows, 3D figures, photo zones, press walls, mall decor and New Year decorations. The approach is the same: design, estimate, production and installation by one team.' },
    includes: {
      ru: ['Оформление витрин', 'Фотозоны и пресс-воллы', 'Объёмные фигуры', 'Оформление ТЦ', 'Новогоднее оформление'],
      en: ['Shop window styling', 'Photo zones and press walls', '3D figures', 'Mall decor', 'New Year decor'] },
  },
];

// Строки прайса «цены 2026.xlsx». link — id направления.
export const priceList = [
  { ru: 'Выставочные стенды', en: 'Exhibition stands', from: 30000, link: 'stands' },
  { ru: 'Объёмные фигуры', en: '3D figures', from: 10000, link: 'obemnye-figury' },
  { ru: 'Изготовление и оформление витрин', en: 'Shop window design & production', from: 20000, link: 'oformlenie-vitrin' },
  { ru: 'Архитектурные формы', en: 'Architectural forms', from: 30000, link: 'arhitekturnye-formy' },
  { ru: 'Новогоднее оформление', en: 'New Year decor', from: 10000, link: 'novogodnee-oformlenie' },
  { ru: 'Оформление ТЦ', en: 'Mall decor', from: 30000, link: 'oformlenie-tc' },
];

// Реальных отзывов нет — раздел на сайте есть, карточки появятся после текстов от заказчика.
export const reviews = [];

// Проекты только для общего портфолио, без отдельной страницы вида стенда.
export const extraCats = [
  { id: 'prochie', dir: 'stendy/prochie', name: { ru: 'Проекты', en: 'Projects' } },
];

// Логотипы площадок. dark — знак светлый, карточка с тёмным фоном.
export const clients = [
  { name: 'Крокус Экспо', file: 'crocus.svg', url: 'https://www.crocus-expo.ru/' },
  { name: 'Тимирязев Центр', file: 'timiryazev.svg', url: 'https://texpo.ru/' },
  { name: 'ВДНХ Экспо', file: 'vdnh.svg', url: 'https://expo-vdnh.ru/' },
  { name: 'Национальный центр «Россия»', file: 'russia.svg', url: 'https://russia.ru/', dark: true },
  { name: 'Гостиный двор', file: 'gostiny-dvor.png', url: 'https://xn--b1abdpfxffsdl4i.xn--80adxhks/' },
  { name: 'Центр международной торговли', file: 'wtc.svg', url: 'https://wtcmoscow.ru/' },
];
