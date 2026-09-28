/* Will Barbershop — site interactions (vanilla, no dependencies) */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- mobile menu ---------- */
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('mobile-menu');
  function closeMenu(focusBtn) {
    if (!btn || !menu) return;
    btn.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
    document.body.classList.remove('menu-open');
    if (focusBtn) btn.focus();
  }
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      if (open) { closeMenu(false); return; }
      btn.setAttribute('aria-expanded', 'true');
      menu.hidden = false;
      document.body.classList.add('menu-open');
      var first = menu.querySelector('a');
      if (first) first.focus();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') closeMenu(true);
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 900) closeMenu(false); });
  }

  /* ---------- scroll: barber-pole progress, header state, hex ceiling glow ---------- */
  var pole = document.querySelector('.pole');
  var header = document.querySelector('.site-header');
  var fields = Array.prototype.slice.call(document.querySelectorAll('.hexfield'));
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var max = doc.scrollHeight - window.innerHeight;
    if (pole) pole.style.setProperty('--progress', max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (!reduce) {
      var vh = window.innerHeight;
      for (var i = 0; i < fields.length; i++) {
        var host = fields[i].parentElement;
        var r = host.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        /* 0 when the section enters from below, 1 when it leaves at the top */
        var p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        var s = fields[i].style;
        s.setProperty('--gx', (18 + p * 64).toFixed(1) + '%');
        s.setProperty('--gy', (20 + Math.sin(p * Math.PI) * 30).toFixed(1) + '%');
        s.setProperty('--shift', ((p - 0.5) * -80).toFixed(1) + 'px');
      }
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* ---------- reveals: razor-cut headings, rise, blur-to-sharp ---------- */
  var targets = document.querySelectorAll('.razor, .rise, .sharpen');
  if (reduce || !('IntersectionObserver' in window)) {
    for (var t = 0; t < targets.length; t++) targets[t].classList.add('is-in');
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    for (var k = 0; k < targets.length; k++) io.observe(targets[k]);
  }

  /* ---------- hours: highlight today (America/New_York) ---------- */
  var hrs = document.querySelector('.hours');
  if (hrs) {
    try {
      var day = new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: 'America/New_York' }).format(new Date());
      var row = hrs.querySelector('tr[data-day="' + day + '"]');
      if (row) row.classList.add('today');
    } catch (e) { /* no-op */ }
  }

  /* ---------- gallery filter + lightbox ---------- */
  var filterBar = document.querySelector('.filters');
  var items = Array.prototype.slice.call(document.querySelectorAll('.grid-gal .item'));
  var count = document.querySelector('.gal-count');
  if (filterBar && items.length) {
    filterBar.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-filter]');
      if (!b) return;
      var f = b.getAttribute('data-filter');
      filterBar.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      var shown = 0;
      items.forEach(function (it) {
        var ok = f === 'all' || (' ' + it.getAttribute('data-cat') + ' ').indexOf(' ' + f + ' ') > -1;
        it.hidden = !ok;
        if (ok) { shown++; it.classList.add('is-in'); }
      });
      if (count) count.textContent = count.getAttribute('data-tpl').replace('{n}', shown);
    });
  }
  var lb = document.querySelector('.lb');
  if (lb && typeof lb.showModal === 'function' && items.length) {
    var lbInner = lb.querySelector('.lb-inner');
    var lbImg = document.createElement('img');
    lbImg.decoding = 'async';
    lbImg.alt = '';
    lbImg.width = 1440;
    lbImg.height = 1728;
    lbInner.insertBefore(lbImg, lbInner.querySelector('p'));
    var lbCap = lb.querySelector('p');
    var current = 0;
    function visible() { return items.filter(function (it) { return !it.hidden; }); }
    function show(idx) {
      var list = visible();
      if (!list.length) return;
      current = (idx + list.length) % list.length;
      var a = list[current].querySelector('a');
      var im = a.querySelector('img');
      lbImg.width = +im.getAttribute('width');
      lbImg.height = +im.getAttribute('height');
      lbImg.src = a.getAttribute('href');
      lbImg.alt = im.alt;
      lbCap.textContent = im.alt;
    }
    items.forEach(function (it) {
      it.querySelector('a').addEventListener('click', function (e) {
        e.preventDefault();
        show(visible().indexOf(it));
        lb.showModal();
      });
    });
    lb.querySelector('.lb-close').addEventListener('click', function () { lb.close(); });
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-inner')) lb.close(); });
  }
})();
