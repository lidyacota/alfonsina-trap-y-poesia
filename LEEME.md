# Alfonsina: Trap y Poesía

Sitio completo en HTML, CSS y JavaScript, preparado para GitHub Pages.

Esta versión restaura la distribución vertical original: video, prompt y poema. Recupera los estilos y tamaños tipográficos originales, los enlaces verdes <<PREV y NEXT>>, el menú desplegable TRACKS y la lista de canciones de la portada. El título animado vuelve a estar debajo del GIF. La única modificación de presentación es la adaptación de alturas y desbordamientos para usar el desplazamiento de la página, sin ventanas internas con scroll.

## Archivos

- `index.html`: portada.
- `inicio/index.html`: índice de tracks y portada, compatible con la ruta anterior.
- `inicio/<track>/index.html`: las ocho páginas de los tracks.
- `assets/site.css`: estructura general, navegación, portada y manifiesto.
- `assets/layout.css`: ajustes de altura y desbordamientos, sin reducción de tamaños de letra.
- `assets/<track>.css`: estilos y animaciones originales, limitados a su pieza.
- `assets/*.js`: animaciones interactivas y juego.
- `assets/nav.js`: menú TRACKS (desplegable en escritorio, menú ☰ lateral en tablet y celular).
- `assets/alfonsina-cabecera.mp4` y `.webm`: la animación de Alfonsina convertida a video (3.4 MB), con `alfonsina-cabecera.jpg` como imagen inicial. Sustituye al GIF original de 42 MB, que ya no se usa y puede borrarse.
- `assets/og-alfonsina-trap-y-poesia.jpg`: imagen que aparece al compartir el enlace en redes.
- `en/index.html`: versión en inglés de la portada (presentación y manifiesto traducido).
- `sitemap.xml` y `robots.txt`: para buscadores.
- `llms.txt`: resumen del proyecto y del manifiesto para inteligencias artificiales (ChatGPT, Claude, Perplexity, etc.), en español e inglés.
- `assets/alfonsina.png`: imagen fija utilizada en el logotipo de navegación.
- `.nojekyll`: permite servir los archivos directamente en GitHub Pages.

No hace falta instalar dependencias ni compilar el sitio. El contenido está incluido en los archivos HTML. YouTube y Google Fonts requieren conexión a Internet.

## Revisarlo en tu computadora

Puedes abrir `index.html` para ver el diseño. Para probar los videos, usa una vista previa con servidor local, ya que YouTube puede bloquear la reproducción desde direcciones `file://`.

Con Python instalado, abre una terminal dentro de esta carpeta y ejecuta:

```sh
python3 -m http.server 8000
```

Abre `http://localhost:8000`. Para cerrar el servidor, pulsa Ctrl+C.

## Publicación en GitHub Pages

Dirección principal: https://lidyacota.github.io/alfonsina-trap-y-poesia/

1. Publica el contenido en la raíz del repositorio `lidyacota/alfonsina-trap-y-poesia`, incluido `.nojekyll`.
2. En Settings → Pages, usa la raíz de la rama `main` como fuente de publicación.
3. Deja vacío el campo Custom domain y no agregues un archivo `CNAME`: el proyecto debe conservar su dirección `github.io` y funcionar sin el dominio personal.
4. Activa Enforce HTTPS.
5. En Google Search Console, verifica la propiedad de prefijo de URL `https://lidyacota.github.io/alfonsina-trap-y-poesia/` y envía `https://lidyacota.github.io/alfonsina-trap-y-poesia/sitemap.xml`.

Las rutas de navegación y recursos son relativas para funcionar dentro de `/alfonsina-trap-y-poesia/`. Los enlaces al portafolio de la autora se conservan como referencias externas; no son necesarios para cargar la obra.

Los buscadores consultan el archivo `robots.txt` de la raíz del servidor (`https://lidyacota.github.io/robots.txt`), no el archivo de esta subcarpeta. El mapa del sitio puede enviarse directamente en Search Console.

## Contenido y verificación

Se conservaron los textos de los poemas, prompts, títulos, instrucciones del juego, manifiesto y créditos. El manifiesto está completo en cada página. Los prompts permanecen desplegados. Los saltos originales de los versos se conservan; una línea larga puede ocupar más de un renglón en pantallas pequeñas.

Se comprobó la igualdad de los textos con los bloques originales recuperados del editor. Se revisaron los ocho tracks a 390 y 1280 píxeles de ancho. Los tamaños del prompt y de PREV/NEXT se compararon con el sitio original. Se verificaron los enlaces locales, el menú desplegable y la navegación al track siguiente. En la revisión inicial se comprobó la reproducción de YouTube y el inicio, movimiento y puntuación del juego.

La integración de YouTube conserva los ocho identificadores de video originales. La reproducción de todos los videos depende también de su disponibilidad y de los permisos que mantengan en YouTube.

El código entregado funciona de manera independiente de Google Sites. No se publicó ni se modificó el contenido del sitio original.

## Ajustes de octubre 2026

Se igualaron al sitio original de Google Sites: la barra superior (tipografía Share Tech Mono, logo de 87×56, título y TRACKS), el menú desplegable, el menú ☰ en pantallas de menos de 768 px, la franja negra de <<PREV NEXT>> (128 / 106.67 / 80 px), los párrafos del manifiesto en Share Tech Mono, la foto antes de los créditos y el pie de página. La lista de tracks, el menú y PREV/NEXT tienen brillo neón y temblor al pasar el mouse. Los textos no se modificaron.

## SEO y metadatos (octubre 2026)

Cada página tiene título y descripción propios, metadatos para redes (Open Graph y X) y datos estructurados schema.org: autoría de Lidya Cota, obra basada en "El dulce daño" (1918) de Alfonsina Storni, herramientas usadas (Suno, Canva, Gemini, ChatGPT, Claude), licencia CC BY-NC-SA 4.0, los ocho tracks con sus videos de YouTube y cada poema atribuido a Storni. La portada en español y la versión en inglés están vinculadas con etiquetas hreflang. La dirección /inicio/ apunta a la portada principal como canónica.
