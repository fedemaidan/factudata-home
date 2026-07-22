/* ============================================================
   Sorby · Manuales — comportamiento compartido
   Cada bloque se activa solo si la página tiene ese componente,
   así el mismo archivo sirve para el hub y para cualquier manual.
   ============================================================ */
(function () {
  "use strict";

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  };

  /* ── Índice lateral con scrollspy ───────────────────── */
  (function indice() {
    var links = $$(".toc a[href^='#']");
    if (!links.length || !("IntersectionObserver" in window)) return;
    var secs = links.map(function (a) { return $(a.getAttribute("href")); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var i = secs.indexOf(e.target);
        if (i < 0) return;
        links.forEach(function (l) { l.classList.remove("on"); });
        links[i].classList.add("on");
      });
    }, { rootMargin: "-10% 0px -75% 0px", threshold: 0 });
    secs.forEach(function (s) { if (s) io.observe(s); });
  })();

  /* ── Pestañas ───────────────────────────────────────── */
  (function pestanas() {
    var tabs = $$(".tab");
    if (!tabs.length) return;
    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        tabs.forEach(function (o) {
          var mismo = o === t;
          o.setAttribute("aria-selected", String(mismo));
          var p = document.getElementById(o.dataset.p);
          if (p) p.classList.toggle("on", mismo);
        });
      });
    });
  })();

  /* ── Flujos de estado ───────────────────────────────────
     Los textos viven en la página, en un bloque:
       <script type="application/json" id="flujos">{ "cert": [["Borrador","..."], ...] }</script>
     y el markup usa  <div class="flow" data-flow="cert">  +  <div id="d-cert">
     ─────────────────────────────────────────────────────── */
  (function flujos() {
    var fuente = $("#flujos");
    if (!fuente) return;
    var datos;
    try { datos = JSON.parse(fuente.textContent); } catch (e) { return; }

    Object.keys(datos).forEach(function (clave) {
      var pasos = datos[clave];
      var cont = $('[data-flow="' + clave + '"]');
      var out = document.getElementById("d-" + clave);
      if (!cont || !out) return;
      var steps = $$(".step", cont);

      function pintar(i) {
        steps.forEach(function (s) {
          s.setAttribute("aria-pressed", String(Number(s.dataset.i) === i));
        });
        var p = pasos[i];
        if (p) out.innerHTML = "<b>" + p[0] + "</b>" + p[1];
      }
      steps.forEach(function (s) {
        s.addEventListener("click", function () { pintar(Number(s.dataset.i)); });
      });
      pintar(0);
    });
  })();

  /* ── Calculadora de margen ──────────────────────────── */
  (function calculadora() {
    var c1 = $("#c1"), c2 = $("#c2"), c3 = $("#c3"), c4 = $("#c4");
    if (!c1 || !c2 || !c3 || !c4) return;
    var o1 = $("#o1"), o2 = $("#o2"), o3 = $("#o3"), o4 = $("#o4"), o5 = $("#o5");
    var money = new Intl.NumberFormat("es-AR", {
      style: "currency", currency: "ARS", maximumFractionDigits: 0
    });

    function calcular() {
      var contrato = Number(c1.value) || 0,
          prov = Number(c2.value) || 0,
          directo = Number(c3.value) || 0,
          gastado = Number(c4.value) || 0;
      var ref = prov + directo,
          margen = contrato - ref,
          excedido = gastado > ref;

      o1.textContent = money.format(ref);
      o2.textContent = money.format(gastado);
      o3.textContent = (margen >= 0 ? "+" : "") + money.format(margen);
      o3.style.color = margen >= 0 ? "var(--ok)" : "var(--bad)";
      o4.textContent = excedido ? "Sobrecosto" : "Dentro de lo previsto";
      o4.className = "pill " + (excedido ? "bad" : "ok");

      var dif = Math.abs(gastado - ref);
      o5.textContent = excedido
        ? "Te excediste " + money.format(dif) + " sobre el costo de referencia."
        : "Te queda " + money.format(dif) + " de costo previsto sin gastar.";
    }
    [c1, c2, c3, c4].forEach(function (el) { el.addEventListener("input", calcular); });
    calcular();
  })();

  /* ── Buscador del glosario ──────────────────────────── */
  (function glosario() {
    var q = $("#q");
    if (!q) return;
    var terms = $$("#glos .term");
    var sin = $("#sin");
    q.addEventListener("input", function () {
      var v = q.value.trim().toLowerCase(), vis = 0;
      terms.forEach(function (t) {
        var hit = !v || t.textContent.toLowerCase().indexOf(v) !== -1;
        t.hidden = !hit;
        if (hit) vis++;
      });
      if (sin) sin.hidden = vis !== 0;
    });
  })();

  /* ── Hub: renderiza las tarjetas desde el manifiesto ──
     Necesita  window.MANUALES  (assets/manuales.js) y un
     contenedor  <div id="hub" data-base=".">
     ─────────────────────────────────────────────────────── */
  (function hub() {
    var cont = $("#hub");
    if (!cont || !window.MANUALES) return;
    var base = cont.dataset.base || ".";

    var areas = [];
    window.MANUALES.forEach(function (m) {
      if (areas.indexOf(m.area) === -1) areas.push(m.area);
    });

    var html = areas.map(function (area) {
      var items = window.MANUALES.filter(function (m) { return m.area === area; });
      var cards = items.map(function (m) {
        var pronto = !m.slug;
        var href = pronto ? "#" : base + "/" + m.slug + "/";
        return '' +
          '<a class="manual-card' + (pronto ? " soon" : "") + '" href="' + href + '"' +
          (pronto ? ' aria-disabled="true" tabindex="-1"' : "") + '>' +
            '<span class="ico">' + (m.icono || "") + "</span>" +
            (pronto ? '<span class="badge">En preparación</span>' : "") +
            "<h3>" + m.titulo + "</h3>" +
            "<p>" + m.resumen + "</p>" +
            (pronto ? "" : '<span class="mas">Leer el manual &rarr;</span>') +
          "</a>";
      }).join("");
      return '<div class="hub-area"><h2>' + area + '</h2><div class="hub-grid">' + cards + "</div></div>";
    }).join("");

    cont.innerHTML = html;
  })();
})();
