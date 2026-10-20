// Основные настройки сайта. Всё, что помечено [заполнить], нужно получить от заказчика.
export const FILL = '[заполнить]';

export const config = {
  // Домен: rayexpo.ru занят (проверено whois), luchexpo.ru свободен на 16.10.2026.
  baseUrl: 'https://luchexpo.ru',

  brand: { ru: 'ЛучЭкспо', en: 'RayExpo' },

  phones: [
    { display: '+7 (925) 889-83-44', href: '+79258898344' },
    { display: '+7 (916) 082-84-28', href: '+79160828428' },
  ],

  // Почта для сайта и заявок — заказчик ответил «создать». Адрес заявок задаётся в static/mail-config.php.
  email: FILL,

  address: {
    ru: 'Москва, ул. Свободы, д. 35, стр. 3',
    en: '35 Svobody St., bldg. 3, Moscow, Russia',
    street: 'ул. Свободы, д. 35, стр. 3',
    city: 'Москва',
    region: 'Москва',
    postalCode: '',
    mapQuery: 'Москва, улица Свободы, 35с3',
  },

  hours: { ru: 'пн–вс, 8:00–20:00', en: 'Mon–Sun, 8:00–20:00' },
  openingHours: 'Mo-Su 08:00-20:00',

  messengers: [], // [заполнить]: Telegram, WhatsApp, MAX — если будут

  company: {
    legalName: 'ООО «Луч Строй»',
    legalNameFull: 'Общество с ограниченной ответственностью «Луч Строй»',
    legalNameEn: 'Luch Stroy LLC',
    inn: '5800021810',
    kpp: '580001001',
    ogrn: '1265800002192',
    legalAddress: '442060, Пензенская область, м.р-н Башмаковский, г.п. рабочий поселок Башмаково, рп. Башмаково, ул. Шевченко, д. 9А',
    privacyEmail: 'luchstroy2026@yandex.ru',
    director: 'Акимцев Анатолий Викторович',
  },

  // Числовой ID счётчика Яндекс Метрики. Пока пусто — код счётчика не выводится.
  metrikaId: '',
  // Код подтверждения Яндекс Вебмастера (meta yandex-verification).
  yandexVerification: '',

  giftCertificate: { ru: FILL, en: FILL }, // номинал / условия подарочного сертификата
};
