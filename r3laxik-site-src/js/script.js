  (function () {
    var pages = {
      '': 'page-home',
      '#/': 'page-home',
      '#/glowing-lite': 'page-glowing-lite',
      '#/glowing-pro': 'page-glowing-pro',
      '#/graph': 'page-graph'
    };
    var titles = {
      'page-home': 'R3ŁAXIK INC. — плагины для Final Cut Pro',
      'page-glowing-lite': 'Glowing Lite — R3ŁAXIK INC.',
      'page-glowing-pro': 'Glowing Pro — R3ŁAXIK INC.',
      'page-graph': 'Graph — R3ŁAXIK INC.'
    };

    function route() {
      var hash = window.location.hash || '#/';
      var id = pages[hash] || 'page-home';
      document.querySelectorAll('.page').forEach(function (el) {
        el.classList.toggle('active', el.id === id);
      });
      document.title = titles[id];
      window.scrollTo(0, 0);
    }

    window.addEventListener('hashchange', route);
    document.addEventListener('DOMContentLoaded', route);
    route();

    /* ---------- Пасхалка: 5 кликов по лого ---------- */
    var THEME_KEY = 'r3laxik-theme';
    var UNLOCK_KEY = 'r3laxik-unlocked';

    function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
    function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

    var switcher = document.getElementById('theme-switcher');
    var overlay = document.getElementById('easter-overlay');
    var closeBtn = document.getElementById('easter-close');
    var logo = document.getElementById('logo-link');

    function applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      switcher.querySelectorAll('button').forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-theme') === theme);
      });
      safeSet(THEME_KEY, theme);
    }

    function unlockThemes() {
      switcher.classList.add('visible');
      safeSet(UNLOCK_KEY, '1');
    }

    var savedTheme = safeGet(THEME_KEY) || 'aqua';
    if (savedTheme === 'sequoia') savedTheme = 'flat'; /* миграция старого названия темы */
    applyTheme(savedTheme);
    if (safeGet(UNLOCK_KEY) === '1') unlockThemes();

    switcher.querySelectorAll('button').forEach(function (b) {
      b.addEventListener('click', function () { applyTheme(b.getAttribute('data-theme')); });
    });

    var clickCount = 0;
    var clickTimer = null;
    if (logo) {
      logo.addEventListener('click', function () {
        clickCount++;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(function () { clickCount = 0; }, 1500);

        logo.classList.remove('pulse');
        void logo.offsetWidth; /* перезапуск CSS-анимации */
        logo.classList.add('pulse');

        if (clickCount >= 5) {
          clickCount = 0;
          overlay.classList.add('visible');
          unlockThemes();
        }
      });
    }
    function closeEaster() { overlay.classList.remove('visible'); }
    closeBtn.addEventListener('click', closeEaster);
    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeEaster(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeEaster();
    });
  })();
