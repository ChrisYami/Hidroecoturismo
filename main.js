/* Lago Moa: comportamiento común a todas las páginas */
(function () {
  /* ------------------------------------------------------------------
     CONFIGURACIÓN (completar cuando se defina; vacío = no se usa)
     ------------------------------------------------------------------ */
  var CONFIG = {
    CORREO_DESTINO: '',          // Ej.: 'contacto@ejemplo.bo'
    WHATSAPP: '',                // Solo números con código de país. Ej.: '59170000000'
    GOOGLE_SHEETS_ENDPOINT: ''   // URL del Web App de Google Apps Script (ver guía del modelo base)
  };

  /* Menú móvil */
  var nav = document.getElementById('nav');
  var tg = document.getElementById('navToggle');
  if (nav && tg) {
    tg.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      tg.setAttribute('aria-expanded', open);
      tg.textContent = open ? 'Cerrar' : 'Menú';
    });
  }

  /* Submenú "Más" (escritorio) */
  var more = document.querySelector('.has-sub');
  if (more) {
    var btn = more.querySelector('.sub-btn');
    var setOpen = function (v) { more.classList.toggle('open', v); btn.setAttribute('aria-expanded', v); };
    btn.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!more.classList.contains('open')); });
    document.addEventListener('click', function (e) { if (!more.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setOpen(false); btn.focus(); } });
  }

  /* Filtros de fauna */
  var grid = document.getElementById('spGrid');
  if (grid) {
    var cards = [].slice.call(grid.querySelectorAll('.sp'));
    var buttons = [].slice.call(document.querySelectorAll('.filters button'));
    var count = document.getElementById('spCount');
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-f'), n = 0;
        buttons.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        cards.forEach(function (c) {
          var show = f === 'todos' || c.getAttribute('data-cat') === f;
          c.hidden = !show; if (show) n++;
        });
        count.textContent = 'Mostrando ' + n + ' de ' + cards.length + ' especies';
      });
    });
  }

  /* Formulario de reservas */
  var f = document.getElementById('visitForm');
  if (f) {
    var t0 = Date.now();
    var res = document.getElementById('resultado');
    var msg = document.getElementById('resultadoMsg');
    var txt = document.getElementById('resultadoTexto');
    var acc = document.querySelector('#resultado .acciones');
    var wa = document.getElementById('abrirWA');

    /* Paquete preseleccionado desde la URL: reservas.html?paquete=paquete-jaguar */
    var q = new URLSearchParams(location.search).get('paquete');
    if (q && f.paquete.querySelector('option[value="' + q + '"]')) f.paquete.value = q;

    function error(text, field) {
      res.hidden = false; msg.textContent = text;
      txt.style.display = 'none'; acc.style.display = 'none';
      if (field) field.focus();
    }

    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var nombre = f.nombre.value.trim(), correo = f.correo.value.trim(), tel = f.telefono.value.trim();
      if (!nombre) return error('Escribe tu nombre para continuar.', f.nombre);
      if (!correo || f.correo.validity.typeMismatch) return error('Escribe un correo válido para que podamos responderte.', f.correo);
      if (!tel) return error('Escribe un teléfono o WhatsApp de contacto.', f.telefono);

      /* Protección contra envíos automáticos */
      if (f.empresa.value.trim()) { error('Gracias. Tu solicitud fue recibida.'); return; }
      if (Date.now() - t0 < 2200) return error('Espera un momento y vuelve a pulsar el botón.');

      txt.style.display = ''; acc.style.display = '';
      var paq = f.paquete.options[f.paquete.selectedIndex].text;
      var lineas = ['Hola, quiero información para visitar el Lago Moa.', '',
        'Paquete de interés: ' + paq,
        'Nombre: ' + nombre, 'Correo: ' + correo, 'Teléfono / WhatsApp: ' + tel,
        'Personas: ' + (f.personas.value || 'sin definir'),
        'Fecha tentativa: ' + (f.fecha.value || 'por coordinar')];
      if (f.mensaje.value.trim()) lineas.push('', 'Comentarios: ' + f.mensaje.value.trim());
      var texto = lineas.join('\n');
      txt.value = texto;

      document.getElementById('abrirCorreo').href = 'mailto:' + CONFIG.CORREO_DESTINO +
        '?subject=' + encodeURIComponent('Reserva Lago Moa: ' + paq) + '&body=' + encodeURIComponent(texto);
      if (CONFIG.WHATSAPP) {
        wa.href = 'https://wa.me/' + CONFIG.WHATSAPP + '?text=' + encodeURIComponent(texto);
        wa.hidden = false;
      }

      if (CONFIG.GOOGLE_SHEETS_ENDPOINT) {
        var p = new URLSearchParams();
        p.append('nombre', nombre); p.append('email', correo); p.append('telefono', tel);
        p.append('paquete', paq); p.append('personas', f.personas.value);
        p.append('fecha', f.fecha.value); p.append('comentarios', f.mensaje.value.trim());
        fetch(CONFIG.GOOGLE_SHEETS_ENDPOINT, { method: 'POST', mode: 'no-cors', body: p }).catch(function () {});
        msg.textContent = 'Solicitud enviada. El equipo del proyecto te contactará pronto. También puedes copiar tu mensaje abajo.';
      } else {
        msg.textContent = 'Tu mensaje está listo. Ábrelo en tu correo' + (CONFIG.WHATSAPP ? ', envíalo por WhatsApp' : '') + ' o cópialo para enviarlo.';
      }
      res.hidden = false;
      res.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    document.getElementById('copiar').addEventListener('click', function () {
      var b = this;
      function ok() { b.textContent = 'Copiado'; setTimeout(function () { b.textContent = 'Copiar mensaje'; }, 2000); }
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(txt.value).then(ok, function () { txt.select(); document.execCommand('copy'); ok(); });
        } else { txt.select(); document.execCommand('copy'); ok(); }
      } catch (err) { txt.select(); }
    });
  }
})();
