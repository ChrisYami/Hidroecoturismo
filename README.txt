SITIO WEB DEL LAGO MOA (versión 2, basada en el modelo base)
============================================================

PÁGINAS
-------
index.html            Portada: cifras, "Así tu visita protege el Lago Moa", urgencia ecológica
pueblo-tacana.html    Cultura viva, 13 comunidades beneficiarias y su población
fauna.html            48 especies con filtros (mamíferos, aves, peces, reptiles)
experiencias.html     6 experiencias
paquetes.html         Paquetes Jochi (3D), Capibara (4D) y Jaguar (5D), con itinerario
apoya.html            Cómo apoyar al pueblo Tacana
como-llegar.html      Ruta en 4 pasos, ficha del lago y mapa
ciencia.html          Investigación e hidrología, equipo e instituciones
faq.html              Preguntas frecuentes
reservas.html         Formulario de reserva / consulta
style.css, main.js    Estilos y comportamiento (compartidos por todas las páginas)
img/                  Fotos, logos y dibujos del tejido

Para verlo en tu computadora, abre index.html con doble clic.
(Las tipografías se cargan desde Google Fonts: hace falta internet.)


PENDIENTES (CAMPOS EN BLANCO, A PROPÓSITO)
------------------------------------------
1) Contacto: en reservas.html busca "Datos de contacto por definir" y escribe
   el correo y el número de referencia dentro de <dd class="blank"></dd>.
2) Pie de página (se repite en las 10 páginas): busca "Dirección y contacto
   por definir" y escribe dentro de los <span class="blank"></span>.
3) Nombre del sitio: en el menú y el pie solo aparece el rombo.
4) main.js, al inicio, tiene un bloque CONFIG:
      CORREO_DESTINO          correo que recibe las solicitudes
      WHATSAPP                número con código de país (ej. 59170000000); al
                              completarlo aparece el botón "Enviar por WhatsApp"
      GOOGLE_SHEETS_ENDPOINT  dirección del Apps Script que guarda las
                              reservas en una hoja de Google (ver
                              GOOGLE_SHEETS_SETUP.md del modelo base)
   Mientras estén vacíos, el formulario solo prepara un mensaje que el
   visitante copia o abre en su correo.


A VALIDAR ANTES DE PUBLICAR
---------------------------
- Fauna: el modelo base indica que el equipo de ecología debe validar los
  estados de conservación (UICN) antes de publicar. 5 especies no tienen estado.
  Las fotos de fauna vienen de las fuentes indicadas en cada ficha.
- Paquetes: los precios (Bs. 1,250 / 1,850 / 2,450) son referenciales del modelo
  base y deben confirmarse. Itinerarios y servicios incluidos también.
- "Fondo comunitario de conservación", "época seca de mayo a octubre" y las
  recomendaciones de salud de las preguntas frecuentes vienen del modelo base:
  confirmar con el equipo.
- CIMTA: el PDF original lo nombra "Consejo Indígena de Mujeres Tacanas";
  este sitio usa ese nombre.
- Idioma: esta versión está solo en español (el modelo base tiene español e inglés).


CÓMO PUBLICARLO
---------------
Es un sitio estático: se sube la carpeta completa.
Netlify (app.netlify.com/drop), GitHub Pages, Cloudflare Pages o el servidor
de la universidad.


CAMBIAR COLORES Y FOTOS
-----------------------
Colores: bloque :root al inicio de style.css.
Fotos: pon la nueva en img/ y cambia el nombre en el HTML. No dejes vacío el
texto "alt" (describe la foto para lectores de pantalla).
