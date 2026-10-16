// Статьи блога. cover — путь к фото из content/photos (без расширения).
export const posts = [
  {
    id: 'checklist',
    date: '2026-10-16',
    cover: 'stendy/s-ekranom/03 Стенд с LED-экраном и деревянным подвесом',
    slug: { ru: 'kak-podgotovitsya-k-vystavke', en: 'how-to-prepare-for-an-exhibition' },
    title: { ru: 'Как подготовиться к выставке: чек-лист участника', en: 'How to prepare for an exhibition: an exhibitor checklist' },
    seoTitle: { ru: 'Как подготовиться к выставке: чек-лист участника — ЛучЭкспо', en: 'How to prepare for an exhibition: checklist — RayExpo' },
    desc: { ru: 'Пошаговый чек-лист подготовки к выставке: цели, бюджет, стенд, персонал, материалы и работа с контактами после мероприятия.',
      en: 'A step-by-step checklist for exhibition preparation: goals, budget, stand, staff, materials and follow-up after the event.' },
    minutes: 5,
    body: {
      ru: `
<p>Выставка — это несколько дней, ради которых компания вкладывает заметные деньги: участие, стенд, командировки, материалы. Чтобы вложения окупились, подготовку стоит начинать заранее и вести по плану. Ниже — чек-лист, по которому удобно двигаться.</p>
<h2>1. Определите цель участия</h2>
<p>От цели зависит всё остальное: формат стенда, состав команды и материалы. Типичные цели — найти новых клиентов и дилеров, представить новый продукт, укрепить отношения с текущими партнёрами, поддержать имидж бренда. Сформулируйте цель в цифрах: например, сколько контактов вы хотите собрать.</p>
<h2>2. Посчитайте бюджет</h2>
<p>В бюджет входят регистрационный взнос и аренда площади, застройка стенда, логистика, командировки персонала, печатные материалы и сувениры, реклама до и во время выставки. Заложите резерв на непредвиденные расходы.</p>
<h2>3. Выберите место и формат стенда</h2>
<p>Чем раньше вы забронируете площадь, тем больше выбор. Место у входа, на пересечении проходов или рядом с крупными участниками даёт больше трафика. Формат — линейный, угловой, полуостров или остров — зависит от места и бюджета. Подробнее о форматах мы рассказали в отдельной статье.</p>
<h2>4. Закажите дизайн и застройку</h2>
<p>Обратитесь к застройщику с брифом: название выставки, даты, номер и площадь стенда, технические требования организатора, задачи и бюджет. Хороший подрядчик покажет визуализацию и смету до подписания договора, а сам стенд подготовит за 1–2 недели.</p>
<ul>
  <li>Запросите технические требования у организатора выставки.</li>
  <li>Согласуйте с застройщиком сроки монтажа и демонтажа.</li>
  <li>Продумайте зоны: экспозиция, переговоры, хранение.</li>
</ul>
<h2>5. Подготовьте команду и материалы</h2>
<p>На стенде должны работать люди, которые знают продукт и умеют начинать разговор. Распределите смены, подготовьте скрипт короткой презентации и форму для записи контактов. Каталоги, визитки и сувениры заказывайте заранее — типография тоже работает со сроками.</p>
<h2>6. Пригласите гостей</h2>
<p>Сообщите клиентам и партнёрам, где вас найти: рассылка, соцсети, звонки ключевым клиентам. Назначьте встречи на стенде заранее — так выставка начнёт работать с первого дня.</p>
<h2>7. Работайте с контактами после выставки</h2>
<p>Главная ошибка — отложить собранные контакты «на потом». В первую неделю после выставки отправьте письма, договоритесь о встречах и внесите контакты в CRM. Посчитайте результат и сравните его с целью — это поможет спланировать следующее участие.</p>
`,
      en: `
<p>An exhibition lasts only a few days, yet a company invests significant money in it: participation fees, the stand, travel and materials. To make the investment pay off, start preparing early and follow a plan. Here is a convenient checklist.</p>
<h2>1. Define your goal</h2>
<p>Everything else depends on the goal: stand format, team and materials. Typical goals are finding new clients and dealers, launching a product, strengthening relationships with partners and supporting the brand image. Put the goal in numbers — for example, how many leads you want to collect.</p>
<h2>2. Calculate the budget</h2>
<p>The budget includes the registration fee and space rental, stand construction, logistics, staff travel, printed materials and giveaways, and advertising before and during the show. Keep a reserve for unexpected costs.</p>
<h2>3. Choose the location and stand format</h2>
<p>The earlier you book, the wider the choice. A spot near the entrance, at an aisle intersection or next to major exhibitors gets more traffic. The format — inline, corner, peninsula or island — depends on the location and budget. We cover formats in a separate article.</p>
<h2>4. Order design and construction</h2>
<p>Send the stand builder a brief: exhibition name, dates, stand number and area, the organiser’s technical requirements, goals and budget. A good contractor will show a visualisation and an estimate before the contract and prepare the stand in 1–2 weeks.</p>
<ul>
  <li>Request the technical requirements from the organiser.</li>
  <li>Agree installation and dismantling times with the builder.</li>
  <li>Plan the zones: display, meetings, storage.</li>
</ul>
<h2>5. Prepare the team and materials</h2>
<p>The stand needs people who know the product and can start a conversation. Plan shifts, prepare a short pitch and a lead form. Order catalogues, business cards and giveaways early — printers have deadlines too.</p>
<h2>6. Invite guests</h2>
<p>Tell clients and partners where to find you: email, social media, calls to key accounts. Schedule meetings at the stand in advance so the show works from day one.</p>
<h2>7. Follow up after the show</h2>
<p>The biggest mistake is putting leads off “for later”. In the first week after the show, send emails, arrange meetings and add contacts to your CRM. Measure the result against your goal — it will help plan the next exhibition.</p>
`,
    },
  },
  {
    id: 'types',
    date: '2026-10-14',
    cover: 'stendy/poluostrov/01 Стенд-полуостров для промышленного оборудования',
    slug: { ru: 'vidy-vystavochnyh-stendov', en: 'types-of-exhibition-stands' },
    title: { ru: 'Виды выставочных стендов: какой формат выбрать', en: 'Types of exhibition stands: which format to choose' },
    seoTitle: { ru: 'Виды выставочных стендов: какой выбрать — ЛучЭкспо', en: 'Types of exhibition stands: how to choose — RayExpo' },
    desc: { ru: 'Линейный, угловой, полуостров, остров, двухэтажный и уличный стенд: чем отличаются форматы и как выбрать подходящий под цели и бюджет.',
      en: 'Inline, corner, peninsula, island, double-deck and outdoor stands: how the formats differ and how to choose one for your goals and budget.' },
    minutes: 4,
    body: {
      ru: `
<p>Формат стенда определяется тем, сколько его сторон открыто для посетителей. От этого зависят заметность, планировка и стоимость. Разберём основные варианты.</p>
<h2>Линейный стенд</h2>
<p>Открыт с одной стороны и стоит в ряду других участников. Самый бюджетный вариант: подходит для первого участия или компактной экспозиции. Главная задача дизайна — сделать фронтальную стену максимально выразительной.</p>
<h2>Угловой стенд</h2>
<p>Открыт с двух сторон и стоит на пересечении проходов. Посетители видят его с двух направлений, а две глухие стены остаются под брендинг, экраны и подсобку. Хороший баланс между заметностью и бюджетом.</p>
<h2>Стенд-полуостров</h2>
<p>Открыт с трёх сторон и примыкает к соседям одной стеной. Собирает поток из нескольких проходов, позволяет выделить переговорную и экспозицию. Подходит компаниям с крупным оборудованием или широкой линейкой продукции.</p>
<h2>Островной стенд</h2>
<p>Открыт со всех четырёх сторон. Максимальная заметность и свобода архитектуры — можно строить подвесные конструкции, второй этаж, сложный свет. Требует продуманной планировки, чтобы стенд «работал» с каждой стороны.</p>
<h2>Двухэтажный стенд</h2>
<p>Второй ярус удваивает полезную площадь: внизу — экспозиция, наверху — переговорные или VIP-зона. Требует расчёта конструкции и согласования с организатором, поэтому начинать работу стоит заранее.</p>
<h2>Уличный стенд и павильон</h2>
<p>Для ярмарок, фестивалей и открытых площадок. Главное — устойчивость к ветру и осадкам, крыша, пол и яркий брендинг, который читается издалека.</p>
<h2>Как выбрать</h2>
<ul>
  <li>Отталкивайтесь от места в павильоне: формат часто задан планом выставки.</li>
  <li>Учитывайте цель: имидж, продажи, переговоры или демонстрация продукта.</li>
  <li>Добавьте LED-экран, если продукт лучше показать в динамике.</li>
</ul>
<p>Если сомневаетесь, отправьте нам план выставки и номер стенда — подскажем, как лучше использовать площадь.</p>
`,
      en: `
<p>A stand’s format is defined by how many of its sides are open to visitors. This affects visibility, layout and cost. Let’s look at the main options.</p>
<h2>Inline stand</h2>
<p>Open on one side and placed in a row with other exhibitors. The most budget-friendly option, suitable for a first show or a compact display. The design’s main job is to make the front wall as expressive as possible.</p>
<h2>Corner stand</h2>
<p>Open on two sides at an aisle intersection. Visitors see it from two directions, while two closed walls remain for branding, screens and storage. A good balance between visibility and budget.</p>
<h2>Peninsula stand</h2>
<p>Open on three sides and joined to neighbours by one wall. It draws traffic from several aisles and leaves room for a meeting area and display. Suitable for companies with large equipment or a wide product range.</p>
<h2>Island stand</h2>
<p>Open on all four sides. Maximum visibility and architectural freedom — suspended structures, a second floor, complex lighting. It needs a well-planned layout so the stand works from every side.</p>
<h2>Double-deck stand</h2>
<p>A second level doubles the usable area: display below, meeting rooms or VIP area above. It requires structural calculations and organiser approval, so start early.</p>
<h2>Outdoor stand and pavilion</h2>
<p>For fairs, festivals and open-air venues. The key is resistance to wind and rain, a roof, a floor and bright branding that reads from a distance.</p>
<h2>How to choose</h2>
<ul>
  <li>Start from your location in the hall: the format is often set by the floor plan.</li>
  <li>Consider your goal: image, sales, meetings or product demonstration.</li>
  <li>Add an LED screen if your product is better shown in motion.</li>
</ul>
<p>Not sure? Send us the floor plan and your stand number — we’ll suggest how to make the most of the space.</p>
`,
    },
  },
  {
    id: 'cost',
    date: '2026-10-12',
    cover: 'stendy/eksklyuzivnye/01 Эко-стенд с живым озеленением',
    slug: { ru: 'stoimost-vystavochnogo-stenda', en: 'exhibition-stand-cost' },
    title: { ru: 'Из чего складывается стоимость выставочного стенда', en: 'What makes up the cost of an exhibition stand' },
    seoTitle: { ru: 'Стоимость выставочного стенда: из чего складывается', en: 'Exhibition stand cost: what it consists of — RayExpo' },
    desc: { ru: 'Площадь, конструкция, материалы, свет и экраны, сроки и монтаж: что влияет на цену выставочного стенда и как уложиться в бюджет.',
      en: 'Area, structure, materials, lighting and screens, timing and installation: what affects the price of a stand and how to stay within budget.' },
    minutes: 4,
    body: {
      ru: `
<p>Цена выставочного стенда может отличаться в разы даже при одинаковой площади. Разберёмся, из чего она складывается и на чём можно сэкономить без потери впечатления.</p>
<h2>Площадь и формат</h2>
<p>Чем больше площадь, тем больше конструкций, покрытия и отделки. Формат тоже влияет: открытым сторонам острова или полуострова нужна отделка со всех сторон, а двухэтажному стенду — расчёт и усиленный каркас.</p>
<h2>Конструкция и материалы</h2>
<p>Каркасные системы, деревянные конструкции, металл, стекло, натуральные материалы — у каждого своя стоимость и скорость монтажа. Нестандартные формы и сложная отделка требуют больше производственного времени.</p>
<h2>Свет, экраны и мультимедиа</h2>
<p>LED-экраны, медиастены, световые линии и подсвеченные логотипы делают стенд заметнее, но заметно влияют на бюджет. Часто достаточно одного акцентного экрана в правильном месте.</p>
<h2>Мебель, печать и оборудование</h2>
<p>Стойка-ресепшн, витрины, переговорная мебель, полиграфия и брендинг — отдельные статьи сметы. Часть элементов можно использовать повторно на следующих выставках.</p>
<h2>Сроки</h2>
<p>Срочный проект почти всегда дороже: производство работает с перегрузкой. Если обратиться заранее, подрядчик спокойно подберёт оптимальные решения.</p>
<h2>Монтаж, демонтаж и логистика</h2>
<p>Доставка на площадку, сборка в отведённое время, подключение и вывоз после выставки — обязательная часть работ под ключ. Уточняйте, включены ли они в смету.</p>
<h2>Как уложиться в бюджет</h2>
<ul>
  <li>Назовите подрядчику бюджет сразу — так дизайн будет реалистичным.</li>
  <li>Сделайте один яркий акцент вместо множества мелких.</li>
  <li>Используйте элементы повторно на нескольких выставках.</li>
  <li>Начинайте подготовку заранее.</li>
</ul>
<p>Мы делаем стенды под бюджет клиента: подготовим дизайн и расчёт за 2–3 дня, а на первый проект дадим скидку 5%.</p>
`,
      en: `
<p>The price of an exhibition stand can vary several times even for the same area. Let’s see what it consists of and where you can save without losing impact.</p>
<h2>Area and format</h2>
<p>The larger the area, the more structures, flooring and finishing are needed. The format matters too: open sides of an island or peninsula need finishing all around, and a double-deck stand needs calculations and a reinforced frame.</p>
<h2>Structure and materials</h2>
<p>Modular systems, timber, metal, glass, natural materials — each has its own cost and installation speed. Unusual shapes and complex finishes require more production time.</p>
<h2>Lighting, screens and multimedia</h2>
<p>LED screens, media walls, light lines and illuminated logos make a stand more visible but noticeably affect the budget. Often one accent screen in the right place is enough.</p>
<h2>Furniture, print and equipment</h2>
<p>Reception desk, showcases, meeting furniture, print and branding are separate estimate items. Some elements can be reused at future shows.</p>
<h2>Timing</h2>
<p>A rush job almost always costs more because production is overloaded. If you come early, the contractor can calmly choose the best solutions.</p>
<h2>Installation, dismantling and logistics</h2>
<p>Delivery to the venue, assembly within the allotted time, connection and removal after the show are an essential part of turnkey work. Check whether they are included in the estimate.</p>
<h2>How to stay within budget</h2>
<ul>
  <li>Tell the contractor your budget right away so the design is realistic.</li>
  <li>Make one bold accent instead of many small ones.</li>
  <li>Reuse elements across several exhibitions.</li>
  <li>Start preparing early.</li>
</ul>
<p>We build stands to the client’s budget: we’ll prepare the design and estimate in 2–3 days and give you 5% off your first project.</p>
`,
    },
  },
];
