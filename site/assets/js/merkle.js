/* Merkle Schweißtechnik — Interaktionen
   Vanilla JS, kein Framework, keine Abhängigkeiten.
   Kerninhalte funktionieren ohne dieses Skript und ohne localStorage. */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- Header */
  (function header() {
    var head = document.querySelector('[data-head]');
    if (!head) return;
    var ticking = false;
    function update() {
      head.classList.toggle('is-scrolled', window.scrollY > 40);
      ticking = false;
    }
    update();
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
  })();

  /* ------------------------------------------------------------ Mega-Menü */
  (function mega() {
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-mega-item]'));
    if (!items.length) return;
    var openItem = null;
    var closeTimer = null;

    function panelOf(item) {
      return document.getElementById(item.querySelector('[data-mega-toggle]').getAttribute('aria-controls'));
    }

    function open(item) {
      if (openItem && openItem !== item) close(openItem);
      window.clearTimeout(closeTimer);
      item.classList.add('is-open');
      item.querySelector('[data-mega-toggle]').setAttribute('aria-expanded', 'true');
      panelOf(item).hidden = false;
      openItem = item;
    }

    function close(item) {
      if (!item) return;
      item.classList.remove('is-open');
      item.querySelector('[data-mega-toggle]').setAttribute('aria-expanded', 'false');
      panelOf(item).hidden = true;
      if (openItem === item) openItem = null;
    }

    function closeAll() { items.forEach(close); }

    items.forEach(function (item) {
      var toggle = item.querySelector('[data-mega-toggle]');
      var panel = panelOf(item);

      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        if (item.classList.contains('is-open')) { close(item); } else { open(item); }
      });

      // Öffnen per Hover und per Fokus
      item.addEventListener('mouseenter', function () {
        if (window.matchMedia('(min-width:1024px)').matches) open(item);
      });
      item.addEventListener('mouseleave', function () {
        if (!window.matchMedia('(min-width:1024px)').matches) return;
        closeTimer = window.setTimeout(function () { close(item); }, 140);
      });
      panel.addEventListener('mouseenter', function () { window.clearTimeout(closeTimer); });
      panel.addEventListener('mouseleave', function () {
        if (!window.matchMedia('(min-width:1024px)').matches) return;
        closeTimer = window.setTimeout(function () { close(item); }, 140);
      });

      toggle.addEventListener('focus', function () { open(item); });

      // Fokusfalle: verlässt der Fokus Trigger+Panel, schließt das Panel.
      function onFocusOut(e) {
        var next = e.relatedTarget;
        if (!next) return;
        if (item.contains(next) || panel.contains(next)) return;
        close(item);
      }
      item.addEventListener('focusout', onFocusOut);
      panel.addEventListener('focusout', onFocusOut);

      // Tastatur im Panel
      panel.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { e.preventDefault(); close(item); toggle.focus(); }
      });
      toggle.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { close(item); return; }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          open(item);
          var first = panel.querySelector('a,button');
          if (first) first.focus();
        }
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && openItem) {
        var t = openItem.querySelector('[data-mega-toggle]');
        closeAll();
        if (t) t.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!openItem) return;
      if (openItem.contains(e.target)) return;
      if (panelOf(openItem).contains(e.target)) return;
      closeAll();
    });
  })();

  /* ------------------------------------------------------ Mobile-Navigation */
  (function mobileNav() {
    var burger = document.querySelector('[data-burger]');
    var overlay = document.querySelector('[data-mobile]');
    if (!burger || !overlay) return;
    var lastFocus = null;

    function focusables() {
      return Array.prototype.slice.call(
        overlay.querySelectorAll('a[href],button:not([disabled]),input,summary')
      ).filter(function (el) { return el.offsetParent !== null; });
    }

    function open() {
      lastFocus = document.activeElement;
      overlay.hidden = false;
      burger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('mk-noscroll');
      var f = focusables();
      if (f.length) f[0].focus();
    }

    function close() {
      overlay.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('mk-noscroll');
      if (lastFocus) lastFocus.focus();
    }

    burger.addEventListener('click', function () {
      if (overlay.hidden) { open(); } else { close(); }
    });

    var closeBtn = overlay.querySelector('[data-mobile-close]');
    if (closeBtn) closeBtn.addEventListener('click', close);

    overlay.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      var f = focusables();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    // Akkordeon im Overlay
    Array.prototype.forEach.call(overlay.querySelectorAll('[data-mobile-toggle]'), function (btn) {
      btn.addEventListener('click', function () {
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        var isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!isOpen));
        panel.hidden = isOpen;
      });
    });

    window.addEventListener('resize', function () {
      if (!overlay.hidden && window.matchMedia('(min-width:1024px)').matches) close();
    });
  })();

  /* ------------------------------------------------------------ Suchfeld */
  (function search() {
    var toggle = document.querySelector('[data-search-toggle]');
    var panel = document.querySelector('[data-search-panel]');
    if (!toggle || !panel) return;
    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      panel.hidden = isOpen;
      if (!isOpen) {
        var input = panel.querySelector('input');
        if (input) input.focus();
      }
    });
    panel.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { toggle.setAttribute('aria-expanded', 'false'); panel.hidden = true; toggle.focus(); }
    });
  })();

  /* ----------------------------------------------------- Register-Modul */
  (function register() {
    var roots = document.querySelectorAll('[data-register]');
    Array.prototype.forEach.call(roots, function (root) {
      var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
      if (!tabs.length) return;
      var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
      var images = Array.prototype.slice.call(root.querySelectorAll('[data-register-img]'));

      var current = -1;
      function select(index, setFocus) {
        var changed = current !== -1 && current !== index;
        tabs.forEach(function (tab, i) {
          var on = i === index;
          tab.setAttribute('aria-selected', String(on));
          tab.setAttribute('tabindex', on ? '0' : '-1');
          if (panels[i]) {
            panels[i].hidden = !on;
            panels[i].classList.remove('is-entering');
          }
        });
        /* Einblendung nur bei einem echten Reiterwechsel, nicht beim Laden. */
        if (changed && panels[index]) {
          void panels[index].offsetWidth;
          panels[index].classList.add('is-entering');
        }
        images.forEach(function (img, i) { img.classList.toggle('is-active', i === index); });
        current = index;
        if (setFocus) tabs[index].focus();
      }

      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { select(i, false); });
        tab.addEventListener('keydown', function (e) {
          var next = null;
          if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % tabs.length;
          else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
          else if (e.key === 'Home') next = 0;
          else if (e.key === 'End') next = tabs.length - 1;
          if (next === null) return;
          e.preventDefault();
          select(next, true);
        });
      });

      select(0, false);
    });
  })();

  /* ---------------------------------------------------- Kennzahlen-Zähler */
  (function counters() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-count-to]'));
    if (!nodes.length) return;

    if (reduce || !('IntersectionObserver' in window)) return; // Endwert steht bereits im DOM

    function run(el) {
      var target = parseFloat(el.getAttribute('data-count-to'));
      if (isNaN(target)) return;
      var prefix = el.getAttribute('data-count-prefix') || '';
      var suffix = el.getAttribute('data-count-suffix') || '';
      var duration = 900;
      var start = null;
      function frame(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(target * eased).toLocaleString('de-DE') + suffix;
        if (p < 1) window.requestAnimationFrame(frame);
        else el.textContent = prefix + Math.round(target).toLocaleString('de-DE') + suffix;
      }
      window.requestAnimationFrame(frame);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);   // genau einmal, danach nie wieder
        run(entry.target);
      });
    }, { threshold: 0.4 });

    nodes.forEach(function (n) { io.observe(n); });
  })();

  /* ------------------------------------- Consent-Blocker für Drittinhalte */
  /* Blockiert ausschließlich eingebettete Drittinhalte, niemals Fließtext.  */
  (function embeds() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-embed]'), function (box) {
      var btn = box.querySelector('[data-embed-load]');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var src = box.getAttribute('data-embed-src');
        var title = box.getAttribute('data-embed-title') || 'Eingebetteter Inhalt';
        var frame = document.createElement('iframe');
        frame.className = 'mk-embed__frame';
        frame.setAttribute('src', src);
        frame.setAttribute('title', title);
        frame.setAttribute('loading', 'lazy');
        frame.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
        frame.setAttribute('allowfullscreen', '');
        box.innerHTML = '';
        box.appendChild(frame);
      });
    });
  })();

  /* -------------------------------------------------- Scroll-Reveal */
  /* Der Ausgangszustand steht in der CSS. Dieses Modul schaltet nur noch
     Klassen um und verändert das DOM-Layout nicht. */
  (function reveal() {
    /* Signal an das Sicherheitsnetz im <head>: der Reveal ist aktiv. */
    window.__mkReveal = true;

    var SINGLE = [
      '.mk-section .mk-container > .mk-grid', '.mk-statement__body',
      '.mk-register__intro', '.mk-register__media', '.mk-section .mk-prose',
      '.mk-timeline__item', '.mk-tablewrap', '.mk-embed', '.mk-form',
      '.mk-alt__media', '.mk-alt__body', '.mk-contactband__grid > *', '.mk-legal',
      '.mk-timeline', '.mk-quiz'
    ];
    var GROUPS = [
      '.mk-figures__list', '.mk-cards', '.mk-services__grid', '.mk-locations',
      '.mk-people', '.mk-news', '.mk-features', '.mk-series', '.mk-downloads',
      '.mk-siblings__list', '.mk-disclosures', '.mk-faq', '.mk-proofs', '.mk-sitemap',
      '.mk-slider__track', '.mk-devs'
    ];
    var IMAGES = ['.mk-caesura', '.mk-alt__media'];

    var targets = [];
    SINGLE.concat(GROUPS, IMAGES).forEach(function (sel) {
      Array.prototype.forEach.call(document.querySelectorAll(sel), function (el) {
        if (targets.indexOf(el) === -1) targets.push(el);
      });
    });
    if (!targets.length) return;

    function revealAll() {
      targets.forEach(function (t) { t.classList.add('is-in'); });
    }

    /* Ohne IntersectionObserver wird sofort alles gezeigt. */
    if (!('IntersectionObserver' in window)) { revealAll(); return; }

    /* Druck zeigt immer den vollständigen Inhalt. */
    window.addEventListener('beforeprint', revealAll);

    var pending = targets.slice();

    function show(el) {
      el.classList.add('is-in');
      io.unobserve(el);
      var i = pending.indexOf(el);
      if (i > -1) pending.splice(i, 1);
      if (!pending.length) window.removeEventListener('scroll', onScroll);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        /* Auch Elemente, die schon oberhalb des Viewports liegen, werden
           gezeigt, etwa nach einem Ankersprung in die Seitenmitte. */
        var above = entry.boundingClientRect.bottom < 0;
        if (entry.isIntersecting || above) show(entry.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });

    /* Absicherung für schnelles Scrollen: springt ein Element zwischen zwei
       Messungen von unterhalb direkt nach oberhalb des Viewports, meldet der
       Observer keinen Wechsel. Diese Prüfung läuft nur, solange noch etwas
       verborgen ist, und meldet sich danach selbst ab. */
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var limit = window.innerHeight * 0.94;
        pending.slice().forEach(function (el) {
          if (el.getBoundingClientRect().top < limit) show(el);
        });
        ticking = false;
      });
    }

    targets.forEach(function (t) { io.observe(t); });
    window.addEventListener('scroll', onScroll, { passive: true });

    /* Zweites Standbein: eine reine Geometrieprüfung. Sie deckt den Fall ab,
       dass es einen IntersectionObserver gibt, er aber keine Meldung liefert
       — etwa in eingebetteten Ansichten. Ohne sie bliebe der Inhalt verborgen. */
    function sweep() {
      if (!pending.length) return;
      var limit = window.innerHeight * 0.96;
      pending.slice().forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < limit && r.bottom > -1) show(el);
      });
    }
    window.requestAnimationFrame(sweep);
    window.addEventListener('load', sweep);
    window.setTimeout(sweep, 900);
    window.setTimeout(sweep, 2500);
  })();

  /* ------------------------------------------------------------ Parallax */
  /* Nur dekorative Bildbewegung, maximal 18 px, ausschließlich Transform.
     Die Bilder sind leicht überskaliert, damit keine Kanten frei werden. */
  (function parallax() {
    if (reduce) return;
    if (!window.matchMedia('(min-width:768px)').matches) return;

    var nodes = Array.prototype.slice.call(
      document.querySelectorAll('.mk-caesura img, .mk-phero__media img')
    );
    if (!nodes.length) return;

    nodes.forEach(function (n) {
      n.setAttribute('data-parallax', '');
      n.style.transform = 'scale(1.08)';
    });

    var ticking = false;
    function update() {
      var vh = window.innerHeight;
      nodes.forEach(function (n) {
        var r = n.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        var progress = (r.top + r.height / 2 - vh / 2) / vh;   // -1 … 1
        var shift = Math.max(-18, Math.min(18, progress * -18));
        n.style.transform = 'translate3d(0,' + shift.toFixed(2) + 'px,0) scale(1.08)';
      });
      ticking = false;
    }
    update();
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener('resize', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
  })();

  /* --------------------------------------------------------- Suchseite */
  (function siteSearch() {
    var form = document.querySelector('[data-search-form]');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      var input = form.querySelector('input[name="q"]');
      if (!input || !input.value.trim()) { e.preventDefault(); input.focus(); }
    });
  })();

  /* ------------------------------------------------- Fortschrittslinie */
  /* Zeigt im gescrollten Header, wie weit die Seite gelesen ist.
     Nur transform, deshalb kein Layout-Neuberechnen. */
  (function progress() {
    var bar = document.querySelector('[data-progress]');
    if (!bar) return;
    var ticking = false;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      ticking = false;
    }
    update();
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
  })();

  /* ------------------------------------------------ Schwebende Leisten */
  (function floats() {
    var dock = document.querySelector('[data-dock]');
    var rating = document.querySelector('[data-ratingbar]');

    /* Die Bewertung ist ein Beleg und bleibt die ganze Sitzung stehen.
       Auf kleinen Bildschirmen schrumpft sie per CSS auf einen Punkt. */

    var ready = [];
    if (dock) ready.push(dock);
    if (rating) ready.push(rating);
    if (!ready.length) return;

    /* Erst einblenden, wenn die Seite wirklich benutzt wird — sonst
       verdecken die Leisten den ersten Eindruck. */
    function show() {
      ready.forEach(function (el) { el.classList.add('is-ready'); });
      window.removeEventListener('scroll', onScroll);
    }
    /* Erst nach dem ersten Bildschirm, damit die Leisten die Schaltflächen
       im Hero nicht verdecken. Die Zeitgrenze ist nur ein Rückfall. */
    function onScroll() { if (window.scrollY > 260) show(); }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.setTimeout(show, 9000);
  })();

  /* ------------------------------------------------- Film auf der Bühne */
  /* Das Standbild lädt zuerst und bleibt die Grundlage. Der Film kommt nur
     dazu, wenn er niemandem schadet: großer Bildschirm, kein Sparmodus,
     keine langsame Leitung, keine reduzierte Bewegung. Gespielt wird nur ein
     kurzes Fenster am Anfang — so lädt der Browser über Bereichsanfragen
     auch nur dieses Stück und nicht die ganze Datei. Schlägt etwas fehl,
     verschwindet das Element und das Standbild steht weiter. */
  (function buehnenfilm() {
    var filme = document.querySelectorAll('[data-herovideo]');
    if (!filme.length) return;

    function verwerfen(video) {
      if (video.parentNode) video.parentNode.removeChild(video);
    }
    function alleVerwerfen() {
      for (var i = 0; i < filme.length; i++) verwerfen(filme[i]);
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { alleVerwerfen(); return; }
    if (!window.matchMedia('(min-width: 1024px)').matches) { alleVerwerfen(); return; }

    var netz = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (netz) {
      if (netz.saveData) { alleVerwerfen(); return; }
      var art = netz.effectiveType || '';
      if (art === 'slow-2g' || art === '2g' || art === '3g') { alleVerwerfen(); return; }
    }

    function einrichten(video) {
      /* 0 heißt: ganz durchlaufen lassen. Sonst wird nur das Fenster am
         Anfang gespielt, damit der Browser über Bereichsanfragen nicht die
         ganze Datei zieht. */
      var fenster = parseFloat(video.getAttribute('data-loop'));
      if (isNaN(fenster)) fenster = 12;

      video.addEventListener('error', function () { verwerfen(video); });
      video.addEventListener('canplay', function () { video.classList.add('is-ready'); });
      if (fenster > 0) {
        video.addEventListener('timeupdate', function () {
          if (video.currentTime > fenster) video.currentTime = 0;
        });
      }

      video.src = video.getAttribute('data-src');
      var p = video.play();
      if (p && p.catch) p.catch(function () { verwerfen(video); });
    }

    function starten() {
      for (var i = 0; i < filme.length; i++) einrichten(filme[i]);
    }

    /* Erst wenn die Seite steht, damit der Film dem Standbild nicht die
       Leitung wegnimmt. */
    if (document.readyState === 'complete') window.setTimeout(starten, 400);
    else window.addEventListener('load', function () { window.setTimeout(starten, 400); });
  })();

  /* --------------------------------------------------- Beraterhinweis */
  /* Erscheint nur innerhalb der Öffnungszeiten des Ladens in München und
     nur einmal je Sitzung. Ohne sessionStorage erscheint er trotzdem —
     die Karte ist jederzeit schließbar. */
  (function berater() {
    var card = document.querySelector('[data-berater]');
    if (!card) return;

    var DAYS = { Su: 0, Mo: 1, Tu: 2, We: 3, Th: 4, Fr: 5, Sa: 6 };
    var slots;
    try { slots = JSON.parse(card.getAttribute('data-hours')); }
    catch (e) { return; }

    function minutes(hhmm) {
      var p = String(hhmm).split(':');
      return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
    }
    function isOpen() {
      var now = new Date();
      var day = now.getDay();
      var m = now.getHours() * 60 + now.getMinutes();
      for (var i = 0; i < slots.length; i++) {
        var s = slots[i];
        var hit = false;
        for (var d = 0; d < s.d.length; d++) if (DAYS[s.d[d]] === day) hit = true;
        if (!hit) continue;
        if (m >= minutes(s.o) && m < minutes(s.c)) return true;
        if (s.o2 && m >= minutes(s.o2) && m < minutes(s.c2)) return true;
      }
      return false;
    }

    function closed() {
      try { return window.sessionStorage.getItem('mk-berater') === 'klein'; }
      catch (e) { return false; }
    }

    /* Die Karte bleibt immer da. Außerhalb der Öffnungszeiten wechselt sie
       in einen Offline-Zustand und nennt die nächste Öffnung — WhatsApp und
       E-Mail funktionieren ja trotzdem. */
    var offen = isOpen();
    var TAGNAME = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

    function naechsteOeffnung() {
      var jetzt = new Date();
      var heute = jetzt.getDay();
      var m = jetzt.getHours() * 60 + jetzt.getMinutes();
      for (var plus = 0; plus < 8; plus++) {
        var tag = (heute + plus) % 7;
        for (var i = 0; i < slots.length; i++) {
          var s = slots[i];
          var trifft = false;
          for (var d = 0; d < s.d.length; d++) if (DAYS[s.d[d]] === tag) trifft = true;
          if (!trifft) continue;
          var auf = [s.o, s.o2].filter(Boolean);
          for (var k = 0; k < auf.length; k++) {
            if (plus === 0 && minutes(auf[k]) <= m) continue;
            var zeit = String(auf[k]).replace(/^0/, '');
            var wann = plus === 0 ? 'heute' : (plus === 1 ? 'morgen' : TAGNAME[tag]);
            return wann + ' ' + zeit + ' Uhr';
          }
        }
      }
      return '';
    }

    if (!offen) {
      card.classList.add('is-offline');
      var status = card.querySelector('[data-berater-status]');
      if (status) status.textContent = status.getAttribute('data-offline-text') + ' ' + naechsteOeffnung();
    }

    var mini = document.querySelector('[data-berater-mini]');

    /* Öffnungszeit des laufenden Tages im Klartext, für die Miniaturansicht. */
    function todayText() {
      var now = new Date();
      var day = now.getDay();
      for (var i = 0; i < slots.length; i++) {
        var s = slots[i];
        for (var d = 0; d < s.d.length; d++) {
          if (DAYS[s.d[d]] !== day) continue;
          /* Führende Null weg: 6:30 statt 06:30, wie überall auf der Seite. */
          var hm = function (t) { return String(t).replace(/^0/, ''); };
          var txt = hm(s.o) + '–' + hm(s.c);
          if (s.o2) txt += ' und ' + hm(s.o2) + '–' + hm(s.c2);
          return txt + ' Uhr';
        }
      }
      return '';
    }

    function showMini() {
      if (!mini) return;
      var slot = mini.querySelector('[data-mini-hours]');
      if (slot) slot.textContent = offen ? todayText() : naechsteOeffnung();
      if (!offen) {
        mini.classList.add('is-offline');
        var st = mini.querySelector('[data-mini-status]');
        if (st) st.textContent = st.getAttribute('data-offline-text');
      }
      mini.hidden = false;
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () { mini.classList.add('is-ready'); });
      });
    }

    function openCard() {
      if (mini) { mini.hidden = true; mini.classList.remove('is-ready'); }
      card.hidden = false;
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () { card.classList.add('is-ready'); });
      });
    }

    /* Themenschalter: ein Klick tauscht das Thema. Gibt es dazu mehrere
       Ansprechpersonen, blättert ein Pfeilpaar durch sie. Ohne JavaScript
       bleibt die erste Person des ersten Themas sichtbar. */
    var tabs = card.querySelectorAll('[data-berater-tab]');
    var gruppen = card.querySelectorAll('[data-berater-person]');

    function zeige(gruppe, i) {
      var einzel = gruppe.querySelectorAll('[data-berater-one]');
      var n = einzel.length;
      var pos = ((i % n) + n) % n;
      for (var a = 0; a < n; a++) einzel[a].hidden = a !== pos;
      gruppe.setAttribute('data-aktiv', pos);
      var zaehler = gruppe.querySelector('[data-berater-count]');
      if (zaehler) zaehler.textContent = (pos + 1) + '/' + n;
    }

    function waehle(key) {
      for (var i = 0; i < gruppen.length; i++) {
        gruppen[i].hidden = gruppen[i].getAttribute('data-berater-person') !== key;
      }
      for (var j = 0; j < tabs.length; j++) {
        var an = tabs[j].getAttribute('data-berater-tab') === key;
        tabs[j].classList.toggle('is-active', an);
        tabs[j].setAttribute('aria-pressed', an ? 'true' : 'false');
      }
    }

    for (var k = 0; k < tabs.length; k++) {
      tabs[k].addEventListener('click', function () {
        waehle(this.getAttribute('data-berater-tab'));
      });
    }

    var pfeile = card.querySelectorAll('[data-berater-arrow]');
    for (var m = 0; m < pfeile.length; m++) {
      pfeile[m].addEventListener('click', function () {
        var gruppe = this.closest('[data-berater-person]');
        var jetzt = parseInt(gruppe.getAttribute('data-aktiv') || '0', 10);
        zeige(gruppe, jetzt + parseInt(this.getAttribute('data-berater-arrow'), 10));
      });
    }

    /* Der Schließer verkleinert die Karte auf die Miniaturansicht; sie
       bleibt die ganze Sitzung über erreichbar. */
    var zu = card.querySelector('[data-berater-close]');
    if (zu) zu.addEventListener('click', function () {
      card.hidden = true;
      card.classList.remove('is-ready');
      try { window.sessionStorage.setItem('mk-berater', 'klein'); } catch (e) {}
      showMini();
    });
    if (mini) mini.addEventListener('click', openCard);

    /* Wer die Karte schon weggeklickt hat, bekommt sofort nur die Miniatur. */
    if (closed()) { showMini(); return; }

    /* Dieselbe Regel wie für die Leisten: erst nach dem ersten Bildschirm. */
    var gezeigt = false;
    function auftauchen() {
      if (gezeigt) return;
      gezeigt = true;
      window.removeEventListener('scroll', beiScroll);
      /* Im Standard erscheint nur die Miniatur; die volle Karte kommt erst
         auf Klick. */
      showMini();
    }
    function beiScroll() { if (window.scrollY > 260) window.setTimeout(auftauchen, 1200); }
    window.addEventListener('scroll', beiScroll, { passive: true });
    window.setTimeout(auftauchen, 12000);
  })();

  /* --------------------------------------------------------- Slider */
  (function sliders() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-slider]'), function (root) {
      var track = root.querySelector('.mk-slider__track');
      var prev = root.querySelector('[data-slider-prev]');
      var next = root.querySelector('[data-slider-next]');
      var thumb = root.querySelector('[data-slider-thumb]');
      if (!track) return;

      function step() {
        var first = track.firstElementChild;
        var w = first ? first.getBoundingClientRect().width + 14 : 300;
        return Math.max(w, Math.round(track.clientWidth * 0.8));
      }
      function maxScroll() { return track.scrollWidth - track.clientWidth; }

      function update() {
        var max = maxScroll();
        var p = max > 2 ? track.scrollLeft / max : 0;
        if (thumb) {
          var ratio = max > 2 ? Math.max(0.12, track.clientWidth / track.scrollWidth) : 1;
          thumb.style.transform = 'translateX(' + (p * (100 / ratio - 100)).toFixed(2) + '%) scaleX(' + ratio.toFixed(3) + ')';
        }
        if (prev) prev.disabled = track.scrollLeft < 4;
        if (next) next.disabled = track.scrollLeft > max - 4;
      }

      if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }); });
      if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }); });

      var ticking = false;
      track.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () { update(); ticking = false; });
      }, { passive: true });
      window.addEventListener('resize', update, { passive: true });
      update();
    });
  })();

  /* -------------------------------------------- Bayern-Karte, Kontakte */
  /* Dekorative Bewegtgrafik. Läuft nur, solange sie sichtbar ist und das
     Fenster im Vordergrund steht. Bei reduzierter Bewegung bleiben drei
     Punkte ruhig stehen, es wird nichts bewegt. */
  (function bayern() {
    var map = document.querySelector('[data-bayern]');
    if (!map) return;
    var events = Array.prototype.slice.call(map.querySelectorAll('[data-ev]'));
    if (!events.length) return;

    if (reduce) {
      events.slice(0, 3).forEach(function (ev) { ev.classList.add('is-on'); });
      return;
    }

    var i = -1, timer = null, raf = null, running = false;

    function clearAll() {
      window.clearTimeout(timer);
      if (raf) window.cancelAnimationFrame(raf);
      events.forEach(function (ev) { ev.classList.remove('is-on', 'is-driving'); });
    }

    function drive(ev, done) {
      var route = ev.querySelector('[data-route]');
      var van = ev.querySelector('[data-van]');
      if (!route || !van || !route.getTotalLength) { window.setTimeout(done, 1600); return; }
      var len = route.getTotalLength();
      var dur = 2400;
      var start = null;
      ev.classList.add('is-driving');
      function frame(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        /* weich anfahren und ausrollen */
        var eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        var pt = route.getPointAtLength(len * eased);
        van.setAttribute('transform', 'translate(' + pt.x.toFixed(2) + ' ' + pt.y.toFixed(2) + ')');
        if (p < 1) { raf = window.requestAnimationFrame(frame); }
        else { ev.classList.remove('is-driving'); done(); }
      }
      raf = window.requestAnimationFrame(frame);
    }

    function nextEvent() {
      if (!running) return;
      i = (i + 1) % events.length;
      var ev = events[i];
      ev.classList.add('is-on');
      var kind = ev.getAttribute('data-kind');

      function finish() {
        timer = window.setTimeout(function () {
          ev.classList.remove('is-on');
          timer = window.setTimeout(nextEvent, 700);
        }, 900);
      }

      /* Lieferungen fahren hinaus, Anfahrten herein — beide bewegen sich. */
      if (kind === 'liefer' || kind === 'anfahrt') {
        timer = window.setTimeout(function () { drive(ev, finish); }, 900);
      } else {
        timer = window.setTimeout(finish, 2200);
      }
    }

    function start() {
      if (running) return;
      running = true;
      timer = window.setTimeout(nextEvent, 600);
    }
    function stop() {
      running = false;
      clearAll();
    }

    /* Sichtbarkeit über die Geometrie statt über einen Observer: die Karte
       läuft nur, wenn sie wirklich im Bild ist, und hält sonst an. */
    function visible() {
      var r = map.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight && !document.hidden;
    }
    function check() { if (visible()) start(); else stop(); }
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { check(); ticking = false; });
    }, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    window.setTimeout(check, 400);

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop();
    });
  })();


  /* ------------------------------------------------ Karte bewegen */
  /* Die Karte folgt dem Zeiger ein kleines Stück — gezogen wird nicht.
     Beim Verlassen geht sie zurück. Nur Transform, gedrosselt auf ein Bild
     je Bildwiederholung, und bei reduzierter Bewegung gar nicht. */
  (function globe() {
    var inner = document.querySelector('[data-globe]');
    if (!inner || reduce) return;
    var feld = inner.closest('.mk-bayernwrap') || inner.parentNode;
    if (!window.matchMedia || !window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;

    var zx = 0, zy = 0, laeuft = false;
    function male() {
      laeuft = false;
      inner.style.setProperty('--gry', (zx * 1.5).toFixed(2) + 'deg');
      inner.style.setProperty('--grx', (-zy * 1).toFixed(2) + 'deg');
      inner.style.setProperty('--gtx', (zx * 4.5).toFixed(1) + 'px');
      inner.style.setProperty('--gty', (zy * 3).toFixed(1) + 'px');
    }
    function bewege(e) {
      var r = feld.getBoundingClientRect();
      if (!r.width || !r.height) return;
      zx = (e.clientX - r.left) / r.width * 2 - 1;
      zy = (e.clientY - r.top) / r.height * 2 - 1;
      inner.classList.add('is-live');
      if (!laeuft) { laeuft = true; window.requestAnimationFrame(male); }
    }
    function zurueck() {
      zx = 0; zy = 0;
      inner.classList.remove('is-live');
      male();
    }
    feld.addEventListener('pointermove', bewege, { passive: true });
    feld.addEventListener('pointerleave', zurueck, { passive: true });
  })();

  /* ------------------------------------------- Gasflaschen-Slider */
  /* Die Flasche, die der Mitte am nächsten steht, wird hervorgehoben.
     Gerechnet wird nur beim Scrollen, gedrosselt auf ein Bild. */
  (function bottles() {
    var rail = document.querySelector('[data-bottles]');
    if (!rail) return;
    var items = [].slice.call(rail.querySelectorAll('.mk-bottle'));
    if (!items.length) return;

    var aktiv = null;
    function pruefe() {
      var r = rail.getBoundingClientRect();
      var mitte = r.left + r.width / 2;
      var beste = null, kleinst = Infinity;
      for (var i = 0; i < items.length; i++) {
        var b = items[i].getBoundingClientRect();
        var d = Math.abs(b.left + b.width / 2 - mitte);
        if (d < kleinst) { kleinst = d; beste = items[i]; }
      }
      if (beste && beste !== aktiv) {
        if (aktiv) aktiv.classList.remove('is-center');
        beste.classList.add('is-center');
        aktiv = beste;
      }
    }
    /* Gedrosselt über die Uhr, nicht über requestAnimationFrame: in einem
       Hintergrund-Tab laufen keine Bilder, der Zustand bliebe sonst hängen. */
    var zuletzt = 0, warte = null;
    function an() {
      var t = Date.now();
      window.clearTimeout(warte);
      if (t - zuletzt > 60) { zuletzt = t; pruefe(); }
      else warte = window.setTimeout(function () { zuletzt = Date.now(); pruefe(); }, 70);
    }
    rail.addEventListener('scroll', an, { passive: true });
    window.addEventListener('resize', an, { passive: true });
    pruefe();

    /* Mit den Pfeiltasten lässt sich das Band ebenfalls bewegen. */
    rail.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      var schritt = items[0].getBoundingClientRect().width;
      rail.scrollBy({ left: e.key === 'ArrowRight' ? schritt : -schritt, behavior: 'smooth' });
    });
  })();

})();
