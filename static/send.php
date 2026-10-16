<?php
declare(strict_types=1);
date_default_timezone_set('Europe/Moscow');

$cfg = require __DIR__ . '/mail-config.php';
$isAjax = ($_SERVER['HTTP_X_REQUESTED_WITH'] ?? '') === 'fetch';

function respond(bool $ok, string $error = ''): void
{
    global $isAjax;
    if ($isAjax) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'error' => $error], JSON_UNESCAPED_UNICODE);
    } else {
        header('Content-Type: text/html; charset=utf-8');
        $back = htmlspecialchars($_SERVER['HTTP_REFERER'] ?? '/', ENT_QUOTES);
        $text = $ok ? 'Спасибо! Заявка отправлена, мы скоро свяжемся с вами.' : 'Не удалось отправить заявку. Пожалуйста, позвоните нам.';
        echo "<!doctype html><meta charset=utf-8><meta name=robots content=noindex><meta name=viewport content='width=device-width'>"
            . "<body style='font-family:system-ui;padding:40px;text-align:center'><p>{$text}</p><p><a href='{$back}'>Вернуться на сайт</a></p>";
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    respond(false, 'method');
}

function field(string $key, int $max): string
{
    $v = trim((string)($_POST[$key] ?? ''));
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/u', '', $v) ?? '';
    return mb_substr($v, 0, $max);
}

// Антиспам: скрытое поле и слишком быстрая отправка
if (field('website', 100) !== '') respond(true);
$ts = (int)field('ts', 20);
if ($ts > 0 && (int)(microtime(true) * 1000) - $ts < 2500) respond(true);

$name    = field('name', 100);
$phone   = field('phone', 40);
$email   = field('email', 120);
$comment = field('comment', 3000);
$source  = field('source', 100);
$page    = field('page', 300);
$lang    = field('lang', 5);
$consent = isset($_POST['consent']);

if ($name === '' || strlen(preg_replace('/\D/', '', $phone)) < 10 || !$consent) respond(false, 'validation');
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) $email = '';

// Ограничение: не больше 5 заявок с одного IP за 10 минут
$ip = $_SERVER['REMOTE_ADDR'] ?? '';
$rl = sys_get_temp_dir() . '/luchexpo_rl_' . md5($ip);
$hits = array_filter(array_map('intval', @file($rl) ?: []), fn($t) => $t > time() - 600);
if (count($hits) >= 5) respond(false, 'rate');
$hits[] = time();
@file_put_contents($rl, implode("\n", $hits));

if (empty($cfg['to'])) respond(false, 'not_configured');

$subject = 'Заявка с сайта ЛучЭкспо: ' . $name;
$rows = [
    'Имя' => $name,
    'Телефон' => $phone,
    'Почта' => $email ?: '—',
    'Комментарий' => $comment ?: '—',
    'Форма' => $source ?: '—',
    'Страница' => $page ?: ($_SERVER['HTTP_REFERER'] ?? '—'),
    'Язык' => $lang ?: 'ru',
    'Дата' => date('d.m.Y H:i'),
    'Согласие на обработку ПДн' => 'да',
];
$body = '';
foreach ($rows as $k => $v) $body .= $k . ': ' . $v . "\r\n";

$sent = !empty($cfg['smtp_user'])
    ? smtp_send($cfg, $subject, $body, $email)
    : mail_send($cfg, $subject, $body, $email);

respond($sent, $sent ? '' : 'send');

function enc(string $s): string
{
    return '=?UTF-8?B?' . base64_encode($s) . '?=';
}

function mail_send(array $cfg, string $subject, string $body, string $replyTo): bool
{
    $from = $cfg['from'] ?: 'noreply@' . ($_SERVER['HTTP_HOST'] ?? 'localhost');
    $headers = [
        'From: ' . enc($cfg['from_name']) . " <{$from}>",
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        'MIME-Version: 1.0',
    ];
    if ($replyTo) $headers[] = "Reply-To: {$replyTo}";
    return mail($cfg['to'], enc($subject), chunk_split(base64_encode($body)), implode("\r\n", $headers));
}

function smtp_send(array $cfg, string $subject, string $body, string $replyTo): bool
{
    $fp = @stream_socket_client($cfg['smtp_host'] . ':' . $cfg['smtp_port'], $errno, $errstr, 15);
    if (!$fp) return false;
    stream_set_timeout($fp, 15);
    $read = function () use ($fp): string {
        $data = '';
        while (($line = fgets($fp, 515)) !== false) {
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') break;
        }
        return $data;
    };
    $cmd = function (string $c, string $expect) use ($fp, $read): bool {
        fwrite($fp, $c . "\r\n");
        return strpos($read(), $expect) === 0;
    };
    $from = $cfg['from'] ?: $cfg['smtp_user'];
    $to = array_filter(array_map('trim', explode(',', $cfg['to'])));
    $ok = strpos($read(), '220') === 0
        && $cmd('EHLO ' . ($_SERVER['HTTP_HOST'] ?? 'localhost'), '250')
        && $cmd('AUTH LOGIN', '334')
        && $cmd(base64_encode($cfg['smtp_user']), '334')
        && $cmd(base64_encode($cfg['smtp_pass']), '235')
        && $cmd("MAIL FROM:<{$from}>", '250');
    foreach ($to as $rcpt) $ok = $ok && $cmd("RCPT TO:<{$rcpt}>", '250');
    $ok = $ok && $cmd('DATA', '354');
    if ($ok) {
        $headers = [
            'Date: ' . date('r'),
            'From: ' . enc($cfg['from_name']) . " <{$from}>",
            'To: ' . implode(', ', $to),
            'Subject: ' . enc($subject),
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: base64',
        ];
        if ($replyTo) $headers[] = "Reply-To: {$replyTo}";
        $msg = implode("\r\n", $headers) . "\r\n\r\n" . chunk_split(base64_encode($body)) . "\r\n.";
        $ok = $cmd($msg, '250');
    }
    $cmd('QUIT', '221');
    fclose($fp);
    return $ok;
}
