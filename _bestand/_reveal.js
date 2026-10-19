  /* -------------------------------------------------- Scroll-Reveal */
  /* Markiert bestehende Elemente, ohne das Markup zu verändern.
     Der versteckte Ausgangszustand hängt an .mk-js und existiert
     deshalb nur, wenn dieses Skript läuft. */
  (function reveal() {
    if (!('IntersectionObserver' in window)) return;

    var SINGLE = [
      '.mk-section .mk-container > .mk-grid',
      '.mk-statement__body',
      '.mk-register__intro',
      '.mk-register__media',
      '.mk-section .mk-prose',
      '.mk-timeline__item',
      '.mk-tablewrap',
      '.mk-embed',
      '.mk-form',
      '.mk-alt__media',
      '.mk-alt__body',
      '.mk-contactband__grid > *',
      '.mk-legal'
    ];
    var GROUPS = [
      '.mk-figures__list', '.mk-cards', '.mk-services__grid', '.mk-locations',
      '.mk-people', '.mk-news', '.mk-features', '.mk-series', '.mk-downloads',
      '.mk-siblings__list', '.mk-disclosures', '.mk-faq', '.mk-proofs',
      '.mk-sitemap', '.mk-mega__teasers'
    ];
    var IMAGES = ['.mk-caesura', '.mk-alt__media'];

    function mark(selectors, attr) {
      selectors.forEach(function (sel) {
        Array.prototype.forEach.call(document.querySelectorAll(sel), function (el) {
          if (el.closest('.mk-hero') || el.closest('.mk-phero')) return;
          el.setAttribute(attr, '');
        });
      });
    }
    mark(SINGLE, 'data-reveal');
    mark(GROUPS, 'data-reveal-group');
    mark(IMAGES, 'data-reveal-img');

    var targets = document.querySelectorAll('[data-reveal],[data-reveal-group],[data-reveal-img]');
    if (!targets.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    Array.prototype.forEach.call(targets, function (t) { io.observe(t); });
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

