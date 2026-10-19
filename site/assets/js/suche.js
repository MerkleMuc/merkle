/* Websuche über einen zur Bauzeit erzeugten Index. Kein Backend nötig. */
(function () {
  'use strict';
  var form = document.querySelector('[data-sitesearch]');
  if (!form) return;
  var input = form.querySelector('input[name="q"]');
  var out = document.getElementById('results');
  var index = null;

  function norm(s) {
    return String(s).toLowerCase()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
  }

  function render(q) {
    if (!index) return;
    var terms = norm(q).split(/\s+/).filter(Boolean);
    if (!terms.length) { out.innerHTML = ''; return; }

    var hits = index.map(function (p) {
      var hayT = norm(p.t + ' ' + p.d);
      var hayK = norm(p.k);
      var score = 0;
      terms.forEach(function (t) {
        if (hayT.indexOf(t) > -1) score += 10;
        if (hayK.indexOf(t) > -1) score += 1;
      });
      return { p: p, score: score };
    }).filter(function (h) { return h.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 20);

    if (!hits.length) {
      out.innerHTML = '<p class="mk-note">Zu „' + escapeHtml(q) + '“ wurde nichts gefunden. '
        + 'Versuchen Sie einen anderen Begriff, sehen Sie in der <a href="/kontakt/sitemap/">Sitemap</a> nach '
        + 'oder rufen Sie uns an: <a href="tel:+498989771700">+49 89 897717-0</a>.</p>';
      return;
    }

    out.innerHTML = '<p class="mk-kicker">' + hits.length + (hits.length === 1 ? ' Treffer' : ' Treffer') + '</p>'
      + '<div class="mk-downloads">' + hits.map(function (h) {
        return '<a class="mk-download" href="' + h.p.u + '">'
          + '<span><strong>' + escapeHtml(h.p.t) + '</strong><br>'
          + '<span class="mk-download__desc">' + escapeHtml(h.p.d) + '</span></span>'
          + '<span>' + escapeHtml(h.p.u) + '</span></a>';
      }).join('') + '</div>';
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = input.value.trim();
    history.replaceState(null, '', q ? '/suche/?q=' + encodeURIComponent(q) : '/suche/');
    render(q);
  });

  fetch('/assets/js/suche-index.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      index = data;
      var q = new URLSearchParams(location.search).get('q');
      if (q) { input.value = q; render(q); }
    })
    .catch(function () {
      out.innerHTML = '<p class="mk-note">Der Suchindex konnte nicht geladen werden. '
        + 'Alle Seiten finden Sie in der <a href="/kontakt/sitemap/">Sitemap</a>.</p>';
    });
})();
