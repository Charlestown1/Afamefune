/* Afamefune portfolio — behaviour. No dependencies, no network calls. */
(function () {
  'use strict';

  var root = document.documentElement;
  var WA_NUMBER = '2348143907857';
  var TG_URL = 'https://t.me/Charlesfreebornn';

  /* ---------- Theme ---------- */
  var toggle = document.getElementById('theme-toggle');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (persist) {
      try { localStorage.setItem('theme', theme); } catch (e) {}
    }
    if (toggle) {
      var isDark = theme === 'dark';
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  applyTheme(currentTheme(), false);

  if (toggle) {
    toggle.addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
    });
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    if (!menuBtn || !nav) return;
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuBtn.focus();
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 760) setMenu(false);
    });
  }

  /* ---------- Active navigation ---------- */
  var links = {};
  document.querySelectorAll('[data-link]').forEach(function (a) { links[a.getAttribute('data-link')] = a; });

  var sectionIds = ['home', 'about', 'services', 'projects', 'contact'];
  var sections = sectionIds.map(function (id) { return document.getElementById(id); }).filter(Boolean);

  function setActive(id) {
    Object.keys(links).forEach(function (key) {
      var on = key === id;
      links[key].classList.toggle('active', on);
      if (on) links[key].setAttribute('aria-current', 'page');
      else links[key].removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
  }
  setActive('home');

  /* ---------- Enquiry composer (static: opens WhatsApp or copies for Telegram) ---------- */
  var form = document.getElementById('enquiry');
  var status = document.getElementById('form-status');
  var copyBtn = document.getElementById('copy-telegram');

  function buildMessage() {
    var name = (document.getElementById('f-name').value || '').trim();
    var type = document.getElementById('f-type').value;
    var details = (document.getElementById('f-details').value || '').trim();

    var msg = 'Hello Charles, ' + (name ? 'my name is ' + name + '. ' : '') +
      'I visited your portfolio and would like to discuss a project: ' + type.toLowerCase() + '.';
    if (details) msg += '\n\nAbout the project: ' + details;
    return msg;
  }

  function say(text) { if (status) status.textContent = text; }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(buildMessage());
      say('Opening WhatsApp with your message ready to send.');
      // Same-tab navigation is the most reliable way to open the WhatsApp app on phones
      window.location.href = url;
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var msg = buildMessage();
      var go = function () { window.location.href = TG_URL; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(msg).then(function () {
          say('Message copied. Paste it into the Telegram chat.');
          go();
        }, function () {
          say('Could not copy automatically. Opening Telegram, please type your message there.');
          go();
        });
      } else {
        say('Copying is not supported in this browser. Opening Telegram, please type your message there.');
        go();
      }
    });
  }

  /* ---------- Footer year ---------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
