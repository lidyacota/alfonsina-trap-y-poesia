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
- `assets/alfonsina-cabecera.gif`: GIF animado original de la portada (aproximadamente 42 MB).
- `assets/alfonsina.png`: imagen fija utilizada en el logotipo de navegación.
- `CNAME`: dominio `alfonsinatrapypoesia.lidyacota.com`.
- `.nojekyll`: permite servir los archivos directamente en GitHub Pages.

No hace falta instalar dependencias ni compilar el sitio. El contenido está incluido en los archivos HTML. YouTube y Google Fonts requieren conexión a Internet.

## Revisarlo en tu computadora

Puedes abrir `index.html` para ver el diseño. Para probar los videos, usa una vista previa con servidor local, ya que YouTube puede bloquear la reproducción desde direcciones `file://`.

Con Python instalado, abre una terminal dentro de esta carpeta y ejecuta:

```sh
python3 -m http.server 8000
```

Abre `http://localhost:8000`. Para cerrar el servidor, pulsa Ctrl+C.

## Subirlo a GitHub Pages cuando quieras

1. Crea el repositorio y sube el contenido de esta carpeta a su raíz, incluido `.nojekyll`.
2. Activa GitHub Pages para publicar la raíz de la rama que uses.
3. Configura el dominio personalizado y su DNS para GitHub Pages.
4. Activa HTTPS cuando GitHub haya verificado el dominio.

El archivo CNAME está preparado, pero no configura por sí mismo el DNS. La redirección de `www` queda a tu cargo, como acordamos.

## Contenido y verificación

Se conservaron los textos de los poemas, prompts, títulos, instrucciones del juego, manifiesto y créditos. El manifiesto está completo en cada página. Los prompts permanecen desplegados. Los saltos originales de los versos se conservan; una línea larga puede ocupar más de un renglón en pantallas pequeñas.

Se comprobó la igualdad de los textos con los bloques originales recuperados del editor. Se revisaron los ocho tracks a 390 y 1280 píxeles de ancho. Los tamaños del prompt y de PREV/NEXT se compararon con el sitio original. Se verificaron los enlaces locales, el menú desplegable y la navegación al track siguiente. En la revisión inicial se comprobó la reproducción de YouTube y el inicio, movimiento y puntuación del juego.

La integración de YouTube conserva los ocho identificadores de video originales. La reproducción de todos los videos depende también de su disponibilidad y de los permisos que mantengan en YouTube.

El código entregado funciona de manera independiente de Google Sites. No se publicó ni se modificó el contenido del sitio original.
