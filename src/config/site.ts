/**
 * ============================================================
 *  CONFIGURACIÓN DEL RESTAURANTE — MESA BRAVA
 * ------------------------------------------------------------
 *  Único lugar donde se define la información del local:
 *  identidad, contacto, WhatsApp, horarios y redes.
 *
 *  Todo lo que aparece en el sitio se lee desde este archivo.
 *  Para personalizar el sitio, editá SOLO este archivo
 *  (y `src/data/menu.ts` para productos y precios).
 *
 *  IMPORTANTE: MESA BRAVA es un restaurante FICTICIO.
 *  Todos los datos son de demostración.
 * ============================================================
 */

export interface SocialLink {
  /** Nombre visible, por ejemplo "Instagram". */
  label: string;
  /** URL completa del perfil. En la demo apunta al sitio de la red. */
  url: string;
  /** Marca el enlace como demostración. */
  demo: boolean;
  /** Icono corto usado en el footer (texto alternativo). */
  handle: string;
}

export interface OpeningRow {
  days: string;
  hours: string;
  note?: string;
}

const DEMO_NOTE =
  'Datos ficticios de demostración: no corresponde a un negocio real.';

export const SITE = {
  /* ---------------- Identidad ---------------- */
  name: 'MESA BRAVA',
  descriptor: 'Cocina, café y encuentros',
  tagline: 'Buena comida. Café sin apuro. Mesa compartida',
  /** Título base para SEO. */
  titleSuffix: 'MESA BRAVA · Cocina, café y encuentros',
  /** URL canónica de la demo (dominio ficticio). */
  origin: 'https://mesabrava.demo',
  description:
    'Restaurante y cafetería de demostración: cocina de autor informal, platos para compartir, café de especialidad y pastelería artesanal.',
  demoNotice: DEMO_NOTE,

  /* ---------------- Local (datos ficticios) ---------------- */
  address: {
    street: 'Av. Medrano 1450',
    city: 'Palermo, Ciudad de Buenos Aires',
    country: 'Argentina',
    demo: true,
    note: 'Dirección ficticia, sólo para esta demostración.',
  },

  /* ---------------- Contacto ---------------- */
  phone: {
    display: '+54 11 5555-0199',
    tel: '+541155550199',
    demo: true,
  },
  email: 'hola@mesabrava.demo',

  /**
   * WHATSAPP
   * ---------------------------------------------------------
   * Número configurado en un único lugar.
   * `number` se usa para armar los enlaces wa.me
   * (sólo dígitos, con código de país, sin espacios ni símbolos).
   * Número de DEMOSTRACIÓN: no pertenece a ningún negocio real.
   */
  whatsapp: {
    number: '5491155550199',
    display: '+54 9 11 5555-0199',
    demo: true,
    demoLabel: 'Número de demostración, no corresponde a un negocio real.',
    /** Prefijo usado en los mensajes. */
    businessName: 'MESA BRAVA (demo)',
  },

  /* ---------------- Horarios (editables) ---------------- */
  hours: [
    { days: 'Lunes a viernes', hours: '08:00 – 23:00', note: 'Cafetería desde las 08:00' },
    { days: 'Sábados', hours: '09:00 – 00:30' },
    { days: 'Domingos', hours: '09:00 – 22:00', note: 'Brunch hasta las 16:00' },
    { days: 'Cocina', hours: '12:00 – 15:30 · 19:00 – 23:00' },
  ] satisfies OpeningRow[],

  /** Franjas horarias ofrecidas en el formulario de reserva. */
  reservationSlots: [
    '12:30', '13:00', '13:30', '14:00', '14:30',
    '20:00', '20:30', '21:00', '21:30', '22:00',
  ],

  /** Máximo de personas por solicitud en la demo. */
  maxPartySize: 12,

  /* ---------------- Redes (editables) ---------------- */
  socials: [
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/',
      handle: '@mesabrava',
      demo: true,
    },
    {
      label: 'Facebook',
      url: 'https://www.facebook.com/',
      handle: '/mesabrava',
      demo: true,
    },
  ] satisfies SocialLink[],

  /* ---------------- Créditos ---------------- */
  studio: {
    name: 'ALMATE',
    suffix: 'Digital Studio',
    credit: 'Sitio demo desarrollado por ALMATE · Digital Studio',
    url: 'https://almate.studio',
  },
} as const;

/** Navegación principal (compartida por header y footer). */
export const NAV = [
  { label: 'Inicio', href: '/' },
  { label: 'Carta', href: '/carta' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Reservas y contacto', href: '/reservas', short: 'Reservas' },
] as const;
