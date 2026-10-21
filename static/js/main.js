(function () {
  'use strict';
  var html = document.documentElement;
  var ymId = html.getAttribute('data-ym');

  function goal(name) {
    if (ymId && typeof window.ym === 'function') window.ym(+ymId, 'reachGoal', name);
  }

  // Mobile menu
  var burger = document.querySelector('.burger');
  var mnav = document.getElementById('mnav');
  if (burger && mnav) {
    burger.addEventListener('click', function () {
      var open = mnav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open);
      document.body.classList.toggle('menu-open', open);
    });
  }

  // Phone clicks
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="tel:"]');
    if (a) goal('phone_click');
    var m = e.target.closest('a[href^="mailto:"]');
    if (m) goal('email_click');
  });

  // Request modal
  var modal = document.getElementById('modal');
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-open-form]');
    if (!t || !modal) return;
    e.preventDefault();
    var src = modal.querySelector('input[name="source"]');
    if (src) src.value = t.getAttribute('data-open-form') || 'modal';
    if (mnav && mnav.classList.contains('open')) burger.click();
    modal.showModal();
    goal('open_form');
    var first = modal.querySelector('input[name="name"]');
    if (first) setTimeout(function () { first.focus(); }, 50);
  });
  document.querySelectorAll('dialog').forEach(function (d) {
    d.addEventListener('click', function (e) {
      if (e.target === d || e.target.closest('[data-close]')) d.close();
    });
  });

  // Forms
  document.querySelectorAll('form.form').forEach(function (form) {
    var ts = form.querySelector('input[name="ts"]');
    if (ts) ts.value = Date.now();
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('.form-msg');
      var btn = form.querySelector('button[type="submit"]');
      var d = form.dataset;
      var name = form.elements.name.value.trim();
      var phone = form.elements.phone.value.replace(/\D/g, '');
      if (!name || phone.length < 10 || !form.elements.consent.checked) {
        msg.className = 'form-msg err';
        msg.textContent = d.required;
        return;
      }
      btn.disabled = true;
      var label = btn.textContent;
      btn.textContent = d.sending;
      var fd = new FormData(form);
      fd.append('page', location.href);
      var req = html.hasAttribute('data-demo')
        ? fetch('https://formsubmit.co/ajax/rayexpo@mail.ru', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
              name: form.elements.name.value.trim(),
              phone: form.elements.phone.value.trim(),
              email: (form.elements.email.value.trim() || 'rayexpo@mail.ru'),
              message: form.elements.comment.value.trim() || '—',
              _subject: 'Заявка с сайта ЛучЭкспо: ' + form.elements.name.value.trim(),
              _template: 'table',
              _captcha: 'false',
              page: location.href
            })
          }).then(function (r) { return r.json(); }).then(function (r) {
            return { ok: r && (r.success === true || r.success === 'true') };
          })
        : fetch(form.action, { method: 'POST', body: fd, headers: { 'X-Requested-With': 'fetch' } })
          .then(function (r) { return r.json(); });
      req
        .then(function (r) {
          if (!r.ok) throw new Error(r.error || 'error');
          form.classList.add('sent');
          msg.className = 'form-msg ok';
          msg.textContent = d.ok;
          goal('lead_form');
          form.reset();
        })
        .catch(function () {
          msg.className = 'form-msg err';
          msg.innerHTML = d.err + '<a href="tel:' + d.tel + '">' + d.telDisplay + '</a>';
        })
        .finally(function () { btn.disabled = false; btn.textContent = label; });
    });
  });

  // Portfolio filter
  var filters = document.querySelector('.filters');
  if (filters) {
    filters.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      var f = b.getAttribute('data-filter');
      filters.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      document.querySelectorAll('.projects [data-cat]').forEach(function (p) {
        p.hidden = f !== 'all' && p.getAttribute('data-cat').indexOf(f) !== 0;
      });
    });
  }

  // Lightbox: перелистывает все фото видимых проектов текущей сетки
  var lb = document.getElementById('lightbox');
  if (lb) {
    var img = lb.querySelector('img');
    var cap = lb.querySelector('.lb-cap');
    var list = [], idx = 0;
    function show(i) {
      idx = (i + list.length) % list.length;
      var it = list[idx];
      img.src = it.src;
      img.alt = it.title;
      cap.innerHTML = '';
      cap.appendChild(document.createTextNode(it.title));
      var s = document.createElement('small');
      s.textContent = (it.cat ? it.cat + ' · ' : '') + (idx + 1) + ' / ' + list.length;
      cap.appendChild(s);
      var pre = list[(idx + 1) % list.length];
      if (pre) new Image().src = pre.src;
    }
    document.addEventListener('click', function (e) {
      var p = e.target.closest('.project');
      if (!p) return;
      e.preventDefault();
      var grid = p.closest('.projects');
      list = []; var start = 0;
      grid.querySelectorAll('.project').forEach(function (el) {
        if (el.hidden) return;
        if (el === p) start = list.length;
        JSON.parse(el.getAttribute('data-images')).forEach(function (src) {
          list.push({ src: src, title: el.getAttribute('data-title'), cat: el.getAttribute('data-cat-name') });
        });
      });
      lb.showModal();
      show(start);
      goal('portfolio_view');
    });
    lb.querySelector('.lb-prev').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
    var x0 = null;
    lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  // Cookie banner
  var cookie = document.getElementById('cookie');
  try {
    if (cookie && !localStorage.getItem('cookie_ok')) cookie.hidden = false;
  } catch (e) { if (cookie) cookie.hidden = false; }
  if (cookie) cookie.querySelector('button').addEventListener('click', function () {
    try { localStorage.setItem('cookie_ok', '1'); } catch (e) {}
    cookie.hidden = true;
  });
})();
