# MESA BRAVA — sitio demo (Astro)

Demo multipágina de un restaurante/cafetería ficticio, **MESA BRAVA**, construida como pieza
comercial de **ALMATE · Digital Studio**. No es un negocio real: la dirección, el teléfono, el
número de WhatsApp, las redes y toda la carta son datos de demostración.

Sitio estático (SSG) con Astro 7 + TypeScript, sin frameworks de UI: la interactividad
(filtros de la carta, carrito, formulario de reserva, menú móvil) vive en scripts nativos
empaquetados por Astro.

## Rutas

| Ruta | Página | Qué hace |
| --- | --- | --- |
| `/` | Inicio | Hero, destacados, café y pastelería, historia corta, horarios y CTA de reserva |
| `/carta` | Carta | 34 productos en 6 categorías con búsqueda, filtros, estados vacíos y alta al pedido |
| `/nosotros` | Nosotros | Historia, línea de tiempo, pilares y galería |
| `/reservas` | Reservas y contacto | Formulario validado + datos del local + croquis ilustrativo |

## Requisitos

- Node.js `>= 22.23.4` (ver `engines` en `package.json`)
- npm 11+

## Instalar y correr

```sh
npm install          # dependencias
npm run dev          # servidor de desarrollo → http://localhost:4321
npm run build        # build de producción en ./dist
npm run preview      # sirve ./dist localmente
npm run check        # astro check (TypeScript + Astro, debe dar 0 errores)
npm run qa           # QA visual/responsive con Playwright (requiere `npm run dev` en otra terminal)
```

> El QA necesita el navegador de Playwright una sola vez:
> `npx playwright install chromium`

En este repo se usa el servidor de desarrollo en segundo plano:

```sh
npx astro dev --background
npx astro dev status
npx astro dev logs
npx astro dev stop
```

## Estructura del proyecto

```text
/
├── public/
│   ├── fonts/               # Fraunces + Inter (woff2 auto-alojados)
│   ├── favicon.svg
│   ├── og-mesabrava.png     # imagen compartida para Open Graph
│   └── images/fallback.svg  # respaldo si falta una foto
├── scripts/
│   └── qa.mjs               # QA responsive: capturas + chequeos en 3 viewports
├── src/
│   ├── assets/images/       # 45 fotos (se optimizan con astro:assets → webp)
│   ├── components/
│   │   ├── cart/            # CartDrawer.astro (carrito + lógica cliente)
│   │   ├── home/            # Hero, Featured, CoffeeAndPastry, Local, HoursAndReserve
│   │   ├── menu/            # ProductCard, MenuToolbar (filtros y búsqueda)
│   │   ├── reserve/         # ReservationForm.astro (validación + preview WhatsApp)
│   │   └── site/            # Header, Footer, Ticker, Seo
│   ├── config/site.ts       # ← identidad, contacto, WhatsApp, horarios, redes
│   ├── data/menu.ts         # ← carta: productos, precios, categorías, imágenes
│   ├── lib/                 # cart.ts, whatsapp.ts, validation.ts, format.ts
│   ├── layouts/BaseLayout.astro
│   ├── pages/               # index, carta, nosotros, reservas
│   └── styles/global.css    # tokens de diseño, botones, formularios, accesibilidad
└── package.json
```

## Cómo personalizarlo

### 1. Local, contacto y horarios — `src/config/site.ts`

Es la **única** fuente de verdad de la identidad. Todo lo que cambies ahí se refleja en header,
footer, hero, página de reservas, mensajes de WhatsApp y SEO.

| Campo | Qué controla |
| --- | --- |
| `name`, `descriptor`, `tagline`, `titleSuffix` | Nombre y textos de marca |
| `description` | Meta description por defecto |
| `origin` | URL canónica (dominio ficticio de la demo) |
| `address` | Dirección mostrada en header, footer y reservas |
| `phone`, `email` | Enlaces `tel:` y `mailto:` |
| `whatsapp.number` | **Número único** usado para todos los enlaces `wa.me` (solo dígitos, con código de país) |
| `whatsapp.display`, `whatsapp.businessName` | Cómo se muestra el número y cómo se firma el mensaje |
| `hours` | Filas de horarios (días + horario + nota opcional) |
| `reservationSlots` | Franjas horarias del formulario de reserva |
| `maxPartySize` | Tope de personas por solicitud |
| `socials` | Enlaces de redes (`label`, `url`, `handle`) |
| `studio` | Crédito de ALMATE |

La navegación compartida entre header y footer también vive en este archivo (`NAV`).

### 2. Carta — `src/data/menu.ts`

```ts
export const PRODUCTS: Product[] = [
  {
    id: 'brava-doble',                 // único; se usa en el carrito y en localStorage
    name: 'Brava doble',
    description: 'Doble medallón de 90 g, cheddar fundido…',
    price: 13900,                      // pesos enteros, sin símbolo ni puntos
    category: 'hamburguesas',          // CategoryId
    image: bravaDoble,                 // import de src/assets/images/*.jpg
    alt: 'Hamburguesa Brava doble con papas',
    available: true,                   // false → muestra "No disponible" y se puede ocultar
    tags: ['recomendado'],             // 'vegetariano' | 'recomendado' | 'nuevo' | 'picante' | 'de la casa'
    featured: true,                    // aparece en "Platos destacados" del inicio
  },
];
```

- **Precio**: entero en ARS. El formato `$ 13.900` lo genera `src/lib/format.ts`.
- **Categorías**: `CATEGORIES` define el orden, el número impreso (`index`) y el rótulo.
- **Imágenes**: agregá el archivo en `src/assets/images/`, importalo arriba y usalo en `image`.
  Astro los convierte a WebP en el build y genera `srcset`; el `alt` es obligatorio.
- **Disponibilidad**: `available: false` marca agotado sin borrar el producto; en `/carta` hay un
  toggle "Ocultar no disponibles" que lo filtra.
- El carrito serializa el catálogo al DOM (`data-catalog`) desde `CATALOG`, así que un producto
  nuevo aparece en el carrito sin tocar nada más.

### 3. Colores y tipografía — `src/styles/global.css`

Los tokens están al principio, en `:root`:

```css
--burgundy: #54252c;   /* bordó */
--cream: #f5f0e6;      /* crema */
--ink: #242322;        /* negro */
--olive: #777a50;      /* oliva */
--white: #ffffff;
--olive-on-dark: #a8ab74;  /* oliva legible sobre fondos oscuros (contraste AA) */
```

Las fuentes se auto-alojan en `public/fonts/` (Fraunces para títulos, Inter para texto).

## Qué está implementado

- **Carta funcional**: búsqueda (ignora mayúsculas/acentos), filtros por categoría y por
  destacados, deep-links con hash (`/carta#cafe`), estado vacío con "limpiar filtros", contador
  de resultados y aviso de productos no disponibles.
- **Pedido por WhatsApp**: agregar/cantidad/quitar, subtotal persistido en `localStorage`,
  mensaje armado y abierto en `wa.me`. Deja claro que **no es un pedido confirmado ni cobrado**.
- **Reservas**: nombre, contacto (teléfono o correo), fecha, hora, cantidad de personas y
  comentarios opcionales. Validación en cliente (campos obligatorios, formato de contacto, fecha
  no pasada y hasta 60 días adelante, tope de personas, máximo 300 caracteres), resumen con
  posibilidad de editar y mensaje de WhatsApp que aclara que **la mesa NO está confirmada**.
- **Diseño**: mobile-first, menú móvil con `aria-expanded`/Escape, layout con una sola columna en
  móvil, targets táctiles, `prefers-reduced-motion` respetado (ticker y transiciones).
- **Accesibilidad**: un `h1` por página, landmarks, skip-link, labels asociados, errores de
  formulario enlazados con `aria-describedby` y foco al resumen, availability con texto (no sólo
  color), imágenes con `alt`.
- **SEO**: título y description por página, Open Graph con imagen propia, favicon, canonical
  desde `SITE.origin`, sin enlaces rotos.
- **Performance**: imágenes con `astro:assets` (WebP + `srcset` + `loading="lazy"` salvo el hero),
  fuentes WOFF2 auto-alojadas sin `font-display` bloqueante.

## QA y verificación

```sh
npm run check                 # astro check → 0 errores / 0 warnings
npm run build                 # build limpio
npm run dev                   # en una terminal
npm run qa                    # en otra
```

`scripts/qa.mjs` recorre las 4 páginas en 3 viewports (390, 768 y 1440 px) y falla (exit 1) si:

- alguna página no responde 200,
- hay scroll horizontal,
- hay imágenes rotas o sin cargar,
- hay errores de consola, errores de página o requests fallidos,
- no hay exactamente un `h1`,
- el menú móvil no abre/cierra correctamente,
- el cajón del pedido no abre o el subtotal es inválido.

Además guarda capturas full-page en `qa-output/` (ignorado por git).

Auditoría Lighthouse sobre las 4 páginas: **Accesibilidad 100 · SEO 100 · Best Practices 100**.

## Limitaciones de esta demo

- **No hay backend.** Nada se guarda en un servidor: ni el pedido ni la reserva.
- **El pedido y la reserva terminan en WhatsApp.** El sitio sólo arma el texto y abre `wa.me`;
  la confirmación depende de que el restaurante responda. No se emite ningún comprobante.
- **Número de WhatsApp ficticio** (`5491155550199`) configurado en `src/config/site.ts`; no
  pertenece a ningún negocio real.
- **Dirección, teléfono, correo y redes son inventados** y están marcados como demo en la
  interfaz. No hay mapa: se muestra un croquis SVG ilustrativo porque no corresponde mapear una
  dirección inexistente.
- **No hay reseñas, certificaciones ni premios.** Tampoco pasarela de pago, stock en tiempo real
  ni disponibilidad real de mesas.
- **La disponibilidad de productos es estática** (`available` en `menu.ts`), se edita a mano.
- **Carrito en `localStorage`**: se pierde si el usuario limpia los datos del navegador y no se
  sincroniza entre dispositivos.
- **Sin dominio real**: el canonical apunta a `https://mesabrava.demo`.

## Qué haría falta para ponerlo en producción

1. **Endpoint de reservas** (`POST /api/reservas`): validar otra vez en servidor, persistir en
   base de datos y enviar un mail/WhatsApp al local; responder con un id de solicitud.
2. **Disponibilidad real de mesas**: cupos por franja horaria, capacidad por turno, feriados y
   días de cierre, y bloqueo de horarios llenos en el formulario.
3. **Confirmación de reserva**: segundo paso (mail o WhatsApp con link firmado) para que el estado
   pase de `pendiente` a `confirmada`; en la demo sólo existe el mensaje generado.
4. **Prevención de duplicados**: dedupe por contacto + fecha + franja (y rate limiting) antes de
   persistir.
5. **Pedido online**: convertir el carrito en un `POST /api/pedidos` con estado, horario de
   retiro/entrega y —si aplica— pago; hoy sólo genera el texto para WhatsApp.
6. **Carta dinámica**: mover `menu.ts` a un CMS o API y cachearlo, para que precios y
   disponibilidad se actualicen sin redeploy.
7. **Analítica y consentimiento**, test de Lighthouse en CI, y reemplazar fotos de demo por
   fotografía propia con licencia.

## Créditos

Sitio demo desarrollado por **ALMATE · Digital Studio**.
Tipografías Fraunces (Undercase Type) e Inter (Rasmus Andersson), licencias OFL.
Fotografías de demostración provenientes de Unsplash, usadas sólo con fines ilustrativos.
MESA BRAVA es una marca ficticia creada para esta demostración.
