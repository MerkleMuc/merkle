/* Schweißgeräte-Finder — Ablaufsteuerung.
   Die Texte und Gerätekarten stehen fertig als <template> in der Seite.
   Dieses Skript wählt aus, zeigt an und erklärt die Auswahl. */
(function () {
  'use strict';

  var root = document.querySelector('[data-quiz]');
  if (!root) return;

  var form = root.querySelector('[data-quiz-form]');
  var steps = Array.prototype.slice.call(root.querySelectorAll('[data-step]'));
  var fill = root.querySelector('[data-quiz-fill]');
  var count = root.querySelector('[data-quiz-count]');
  var out = root.querySelector('[data-quiz-result]');
  var templates = document.querySelector('[data-quiz-templates]');
  if (!steps.length || !out || !templates) return;

  var answers = {};
  var at = 0;

  /* Klartext für die Zusammenfassung im Ergebnis. */
  var LABEL = {};
  steps.forEach(function (step) {
    Array.prototype.forEach.call(step.querySelectorAll('[data-value]'), function (btn) {
      var t = btn.querySelector('.mk-opt__title');
      var txt = t ? t.childNodes[0].nodeValue : btn.textContent;
      LABEL[btn.getAttribute('data-key') + ':' + btn.getAttribute('data-value')] = String(txt).trim();
    });
  });

  function setProgress() {
    var p = at / steps.length;
    if (fill) fill.style.transform = 'scaleX(' + p.toFixed(3) + ')';
    if (count) {
      count.textContent = at >= steps.length
        ? 'Ergebnis'
        : 'Schritt ' + (at + 1) + ' von ' + steps.length;
    }
  }

  function showStep(i) {
    steps.forEach(function (s, n) { s.hidden = n !== i; });
    at = i;
    setProgress();
    var first = steps[i] && steps[i].querySelector('[data-value]');
    if (first) first.focus();
  }

  /* Die Regel ist bewusst einfach und nachvollziehbar: zuerst der
     Sonderfall Trennen, dann der Werkstoff, dann Einsatz und Ziel. */
  function decide(a) {
    if (a.dicke === 'trennen') return 'plasma';

    var mobil = a.ort === 'montage' && a.ziel === 'mobil';

    if (a.werkstoff === 'alu') {
      if (a.ziel === 'optik' || a.dicke === 'duenn') return 'wig';
      return 'pulse';
    }
    if (a.werkstoff === 'edelstahl') {
      if (a.ziel === 'optik' || a.dicke === 'duenn') return 'wig';
      if (a.einsatz === 'industrie') return 'pulse';
      return 'mig';
    }
    /* Stahl und wechselnde Werkstoffe */
    if (mobil) return 'elektrode';
    if (a.einsatz === 'industrie') return a.ziel === 'optik' ? 'pulse' : 'migIndustrie';
    if (a.ziel === 'optik' && a.dicke === 'duenn') return 'wig';
    if (a.werkstoff === 'gemischt' && a.ziel === 'optik') return 'wig';
    return 'mig';
  }

  function render(key) {
    var tpl = templates.querySelector('[data-result="' + key + '"]');
    if (!tpl) return;
    var node = tpl.content ? tpl.content.cloneNode(true) : null;
    if (!node) return;

    /* Erklärtiefe nach der sechsten Frage. */
    var lang = answers.kenntnis !== 'profi';
    var kurz = node.querySelector('[data-why-kurz]');
    var langEl = node.querySelector('[data-why-lang]');
    if (kurz) kurz.hidden = lang;
    if (langEl) langEl.hidden = !lang;

    /* Die eigenen Angaben als Chips, damit der Vorschlag nachvollziehbar ist. */
    var list = node.querySelector('[data-answers]');
    if (list) {
      var html = '';
      Object.keys(answers).forEach(function (k) {
        var label = LABEL[k + ':' + answers[k]];
        if (label) html += '<span class="mk-chip">' + label + '</span>';
      });
      list.innerHTML = html;
    }

    out.innerHTML = '';
    out.appendChild(node);
    out.hidden = false;
    /* Das Ergebnis nutzt die volle Breite: zwei Gerätekarten nebeneinander. */
    root.classList.add('is-result');
    /* Das Ergebnis kommt nach dem Start der Seite ins Dokument, der
       Scroll-Reveal kennt es also nicht. Deshalb hier direkt sichtbar setzen. */
    Array.prototype.forEach.call(out.querySelectorAll('.mk-devs'), function (el) {
      el.classList.add('is-in');
    });
    form.hidden = true;
    at = steps.length;
    setProgress();

    var reset = out.querySelector('[data-quiz-reset]');
    if (reset) reset.addEventListener('click', restart);

    var head = root.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: head, behavior: 'smooth' });
  }

  function restart() {
    answers = {};
    out.hidden = true;
    out.innerHTML = '';
    form.hidden = false;
    root.classList.remove('is-result');
    Array.prototype.forEach.call(root.querySelectorAll('[aria-pressed="true"]'), function (b) {
      b.setAttribute('aria-pressed', 'false');
    });
    showStep(0);
  }

  Array.prototype.forEach.call(root.querySelectorAll('[data-value]'), function (btn) {
    btn.addEventListener('click', function () {
      var key = btn.getAttribute('data-key');
      var step = btn.closest('[data-step]');
      Array.prototype.forEach.call(step.querySelectorAll('[data-value]'), function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      answers[key] = btn.getAttribute('data-value');

      if (at + 1 < steps.length) {
        window.setTimeout(function () { showStep(at + 1); }, 160);
      } else {
        window.setTimeout(function () { render(decide(answers)); }, 160);
      }
    });
  });

  Array.prototype.forEach.call(root.querySelectorAll('[data-quiz-back]'), function (b) {
    b.addEventListener('click', function () { if (at > 0) showStep(at - 1); });
  });

  setProgress();
})();
