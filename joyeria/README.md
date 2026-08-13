# Aurea — landing de catálogo

Landing estática (Bootstrap + Alpine.js + Anime.js) para mostrar productos de oro y plata.
No es tienda: no hay carrito ni pagos, todo el contacto se hace por redes sociales.

## Qué cambiar antes de publicar

1. **Nombre de la marca**: reemplaza "Aurea" en `index.html` (título, `<meta>`, `.wordmark` en nav y footer).

2. **Productos**: edita el arreglo `products` en `assets/js/app.js`.
   Cada producto tiene:
   - `name`, `material` (`'oro'` o `'plata'`, así funciona el filtro), `price`, `desc`
   - `img`: ahora apunta a un placeholder (`placehold.co`). Cámbialo por tu foto real,
     por ejemplo `assets/img/anillo-hilo.jpg` una vez que subas tus fotos a `assets/img/`.

3. **Contacto**: busca `00000000000` en `index.html` (hay 3 lugares: botón del hero,
   botón del modal, y sección de contacto) y ponlo con tu número real, formato
   `52XXXXXXXXXX` sin espacios ni signos. Cambia también `instagram.com/tu_usuario`
   y `facebook.com/tu_pagina` por tus cuentas reales.

4. **Foto "Sobre Aurea"**: reemplaza el placeholder en la sección `#sobre` por una foto
   real (de la marca, del taller, o de la persona detrás del negocio).

5. **Textos**: el hero, "Sobre Aurea" y la cita en cursiva son textos de ejemplo — ajústalos
   a la voz real del negocio.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube esta carpeta completa (`index.html`, `assets/`, este README).
2. Ve a **Settings → Pages** del repositorio.
3. En "Build and deployment", elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
4. Guarda. En un par de minutos tu sitio estará en
   `https://<tu-usuario>.github.io/<nombre-del-repo>/`.
5. Abre la URL en tu teléfono y revisa que los botones de WhatsApp e Instagram abran bien.

## Notas técnicas

- Todo se carga por CDN (Bootstrap, Alpine, Anime.js, Google Fonts) — no necesitas `npm install` ni build step.
- El filtro de Oro/Plata y el modal de producto están hechos con Alpine (`assets/js/app.js`, función `catalog()`).
- Las animaciones de entrada y el scroll-reveal están hechas con Anime.js, y respetan
  `prefers-reduced-motion` (si el usuario lo tiene activado, todo aparece sin animar).
