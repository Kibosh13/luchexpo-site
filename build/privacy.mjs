// Типовая политика обработки ПДн (152-ФЗ). Перед публикацией — согласовать с юристом заказчика.
export function privacyBody(lang, config) {
  const c = config.company;
  const site = config.baseUrl.replace('https://', '');
  if (lang === 'en') {
    return `
<p>This policy describes how ${c.legalNameEn} (TIN ${c.inn}, PSRN ${c.ogrn}, legal address: ${c.legalAddress}), hereinafter the “Operator”, processes personal data of users of the website ${site} in accordance with Federal Law of the Russian Federation No. 152-FZ “On Personal Data”.</p>
<h2>1. What data we process</h2>
<ul><li>name;</li><li>phone number;</li><li>email address;</li><li>the text of your comment;</li><li>technical data: cookies, IP address, browser information, pages visited (collected by Yandex Metrica).</li></ul>
<h2>2. Purposes of processing</h2>
<p>We process data to respond to your request, prepare a commercial proposal, conclude and perform a contract, and to analyse and improve the website.</p>
<h2>3. Legal basis</h2>
<p>The consent you give by ticking the box in the form, as well as the conclusion and performance of a contract to which you are a party.</p>
<h2>4. Storage and protection</h2>
<p>Data is stored no longer than required by the purposes of processing, or until consent is withdrawn. The Operator takes legal, organisational and technical measures to protect personal data. Personal data of Russian citizens is recorded and stored using databases located in the Russian Federation.</p>
<h2>5. Transfer to third parties</h2>
<p>We do not transfer data to third parties except where required by law. Website statistics are processed by Yandex LLC (Yandex Metrica).</p>
<h2>6. Cookies</h2>
<p>The website uses cookies for correct operation and analytics. You can disable cookies in your browser settings; some features may become unavailable.</p>
<h2>7. Your rights</h2>
<p>You may request information about the processing of your data, demand its clarification, blocking or deletion, and withdraw your consent by sending a request to <a href="mailto:${c.privacyEmail}">${c.privacyEmail}</a>.</p>
<h2>8. Changes</h2>
<p>The Operator may update this policy. The current version is always available on this page.</p>`;
  }
  return `
<p>Настоящая политика определяет порядок обработки персональных данных пользователей сайта ${site} и меры по их защите. Оператор персональных данных — ${c.legalNameFull} (${c.legalName}), ИНН ${c.inn}, ОГРН ${c.ogrn}, юридический адрес: ${c.legalAddress} (далее — Оператор). Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».</p>
<h2>1. Какие данные мы обрабатываем</h2>
<ul><li>имя;</li><li>номер телефона;</li><li>адрес электронной почты;</li><li>текст комментария, который вы оставляете в форме;</li><li>технические данные: файлы cookie, IP-адрес, сведения о браузере и устройстве, просмотренные страницы (собираются сервисом Яндекс Метрика).</li></ul>
<h2>2. Цели обработки</h2>
<ul><li>обработка заявки и обратная связь с пользователем;</li><li>подготовка коммерческого предложения;</li><li>заключение и исполнение договора;</li><li>анализ посещаемости и улучшение работы сайта.</li></ul>
<h2>3. Правовые основания</h2>
<p>Согласие пользователя на обработку персональных данных, которое он даёт, отмечая соответствующий пункт в форме на сайте, а также заключение и исполнение договора, стороной которого является пользователь.</p>
<h2>4. Порядок обработки и хранения</h2>
<p>Оператор осуществляет сбор, запись, систематизацию, накопление, хранение, уточнение, использование, удаление и уничтожение персональных данных с использованием средств автоматизации и без них. Данные хранятся не дольше, чем этого требуют цели обработки, либо до отзыва согласия. При сборе персональных данных граждан РФ Оператор обеспечивает их запись и хранение с использованием баз данных, находящихся на территории Российской Федерации.</p>
<h2>5. Защита данных</h2>
<p>Оператор принимает правовые, организационные и технические меры для защиты персональных данных от неправомерного доступа, уничтожения, изменения, блокирования, копирования и распространения.</p>
<h2>6. Передача третьим лицам</h2>
<p>Оператор не передаёт персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством РФ. Статистика посещений обрабатывается ООО «Яндекс» (сервис Яндекс Метрика).</p>
<h2>7. Файлы cookie</h2>
<p>Сайт использует файлы cookie для корректной работы и сбора обезличенной статистики. Вы можете отключить cookie в настройках браузера, при этом часть функций сайта может стать недоступной.</p>
<h2>8. Права пользователя</h2>
<p>Пользователь вправе получить сведения об обработке своих персональных данных, потребовать их уточнения, блокирования или уничтожения, а также отозвать согласие на обработку, направив запрос на адрес <a href="mailto:${c.privacyEmail}">${c.privacyEmail}</a>. Оператор рассматривает обращение в срок, установленный законом.</p>
<h2>9. Изменение политики</h2>
<p>Оператор вправе вносить изменения в настоящую политику. Актуальная редакция всегда доступна на этой странице.</p>`;
}
