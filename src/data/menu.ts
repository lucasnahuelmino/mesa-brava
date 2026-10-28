/**
 * ============================================================
 *  CARTA — FUENTE ÚNICA DE DATOS DEL MENÚ
 * ------------------------------------------------------------
 *  Todos los productos, precios, imágenes y disponibilidad se
 *  definen ACÁ. Ningún componente tiene datos duplicados.
 *
 *  Para editar la carta: agregá, modificá o quitá entradas de
 *  `PRODUCTS` y listo: se actualiza en todo el sitio.
 *
 *  - price: número entero en pesos argentinos (sin símbolo).
 *  - available: false marca el producto como "No disponible".
 *  - tags: etiquetas opcionales mostradas como distintivos.
 *  - featured: true lo incluye en destacados.
 * ============================================================
 */
import type { ImageMetadata } from 'astro';

import empanadas from '../assets/images/empanadas.jpg';
import papaBrava from '../assets/images/papa-brava.jpg';
import croquetas from '../assets/images/croquetas.jpg';
import picada from '../assets/images/picada.jpg';
import ensaladaCasa from '../assets/images/ensalada-casa.jpg';

import bifeChorizo from '../assets/images/bife-chorizo.jpg';
import entrana from '../assets/images/entrana-parrilla.jpg';
import salmon from '../assets/images/salmon-limon.jpg';
import pollo from '../assets/images/pollo-crocante.jpg';
import arroz from '../assets/images/arroz-mariscos.jpg';
import fideos from '../assets/images/fideos-langostinos.jpg';

import bravaDoble from '../assets/images/brava-doble.jpg';
import clasica from '../assets/images/clasica-cheddar.jpg';
import bravaHuevo from '../assets/images/brava-huevo.jpg';
import milanesa from '../assets/images/sandwich-milanesa.jpg';
import triple from '../assets/images/triple-pollo.jpg';

import bowlQuinoa from '../assets/images/bowl-quinoa.jpg';
import pizza from '../assets/images/pizza-margarita.jpg';
import tacos from '../assets/images/tacos-coliflor.jpg';
import pastaVeg from '../assets/images/pasta-vegetal.jpg';
import hamburguesaLentejas from '../assets/images/hamburguesa-lentejas.jpg';
import toast from '../assets/images/toast-palta-huevo.jpg';

import espresso from '../assets/images/espresso.jpg';
import flatWhite from '../assets/images/flat-white.jpg';
import cappuccino from '../assets/images/cappuccino.jpg';
import coldBrew from '../assets/images/cold-brew.jpg';
import latte from '../assets/images/latte-casa.jpg';
import vermut from '../assets/images/vermut-casa.jpg';

import croissant from '../assets/images/croissant.jpg';
import torta from '../assets/images/torta-chocolate.jpg';
import cheesecake from '../assets/images/cheesecake-frutos-rojos.jpg';
import mousse from '../assets/images/mousse-chocolate.jpg';
import flan from '../assets/images/flan-dulce-de-leche.jpg';
import cookies from '../assets/images/cookies-chocolate.jpg';

export type CategoryId =
  | 'entradas'
  | 'principales'
  | 'hamburguesas'
  | 'vegetarianas'
  | 'cafe'
  | 'pasteleria';

export type ProductTag = 'vegetariano' | 'recomendado' | 'nuevo' | 'picante' | 'de la casa';

export interface Category {
  id: CategoryId;
  /** Número de orden impreso en la carta. */
  index: string;
  label: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  /** Precio en pesos argentinos (entero). */
  price: number;
  category: CategoryId;
  image: ImageMetadata;
  /** Alt text de la fotografía. */
  alt: string;
  /** Disponibilidad del producto. */
  available: boolean;
  tags: ProductTag[];
  featured?: boolean;
}

export const CATEGORIES: Category[] = [
  {
    id: 'entradas',
    index: '01',
    label: 'Entradas y para compartir',
    description: 'Para abrir la mesa: porciones chicas, frituras, parrilla y cosas del día.',
  },
  {
    id: 'principales',
    index: '02',
    label: 'Platos principales',
    description: 'Parrilla, horno y olla. Porciones pensadas para comer tranquilo.',
  },
  {
    id: 'hamburguesas',
    index: '03',
    label: 'Hamburguesas y sándwiches',
    description: 'Pan de la casa, carne a la parrilla y papas crocantes del día.',
  },
  {
    id: 'vegetarianas',
    index: '04',
    label: 'Opciones vegetarianas',
    description: 'Vegetales protagonistas, sin sustitutos raros ni platos de relleno.',
  },
  {
    id: 'cafe',
    index: '05',
    label: 'Café y bebidas',
    description: 'Grano de especialidad tostado en semana, métodos de filtrado y barra fría.',
  },
  {
    id: 'pasteleria',
    index: '06',
    label: 'Pastelería y postres',
    description: 'Horneado propio todos los días. Lo que falta, falta hasta mañana.',
  },
];

export const PRODUCTS: Product[] = [
  /* ---------------- 01 · Entradas y para compartir ---------------- */
  {
    id: 'empanadas-carne',
    name: 'Empanadas de carne a la parrilla',
    description: 'Carne cortada a cuchillo, cebolla asada y ají molido. Cuatro unidades, recién abiertas.',
    price: 6500,
    category: 'entradas',
    image: empanadas,
    alt: 'Empanadas doradas recién horneadas sobre una tabla',
    available: true,
    tags: ['recomendado'],
    featured: true,
  },
  {
    id: 'papa-brava',
    name: 'Papa brava con salsa de ahumado',
    description: 'Papas fritas dos veces, salsa brava de la casa y alioli de ajo asado.',
    price: 7900,
    category: 'entradas',
    image: papaBrava,
    alt: 'Papas fritas servidas en papel dentro de una canasta',
    available: true,
    tags: ['vegetariano', 'picante'],
  },
  {
    id: 'croquetas-alioli',
    name: 'Croquetas de jamón con alioli',
    description: 'Seis croquetas crujientes por fuera, cremosas por dentro, con alioli de limón.',
    price: 8400,
    category: 'entradas',
    image: croquetas,
    alt: 'Croquetas doradas con salsas para acompañar',
    available: true,
    tags: ['de la casa'],
  },
  {
    id: 'picada-casa',
    name: 'Tabla de picada para dos',
    description: 'Quesos curados, fiambres de la casa, pan de campo, aceitunas y dulce de membrillo.',
    price: 18900,
    category: 'entradas',
    image: picada,
    alt: 'Tabla abundante con quesos, fiambres, frutos secos y frutas',
    available: true,
    tags: ['recomendado'],
    featured: true,
  },
  {
    id: 'ensalada-casa',
    name: 'Ensalada de la casa',
    description: 'Hojas verdes, tomate, semillas tostadas y vinagreta de miel y mostaza.',
    price: 8900,
    category: 'entradas',
    image: ensaladaCasa,
    alt: 'Ensalada colorida servida en un plato hondo',
    available: true,
    tags: ['vegetariano'],
  },

  /* ---------------- 02 · Platos principales ---------------- */
  {
    id: 'bife-chorizo',
    name: 'Bife de chorizo con papas rústicas',
    description: 'Corte de 400 g, punto a elección, mantequilla de pimiento y papas al horno.',
    price: 26500,
    category: 'principales',
    image: bifeChorizo,
    alt: 'Bife de chorizo a la parrilla acompañado de papas',
    available: true,
    tags: ['recomendado'],
    featured: true,
  },
  {
    id: 'entrana-parrilla',
    name: 'Entraña a la parrilla con chimichurri',
    description: 'Entraña marinada un día, cortada en tiras y con chimichurri de la casa.',
    price: 22900,
    category: 'principales',
    image: entrana,
    alt: 'Carne a la parrilla cortada en tiras con acompañamientos',
    available: true,
    tags: [],
  },
  {
    id: 'salmon-limon',
    name: 'Salmón rosado al limón',
    description: 'Salmón sellado, puré de papa ahumada y vegetales de estación.',
    price: 24500,
    category: 'principales',
    image: salmon,
    alt: 'Salmón rosado emplatado con guarnición',
    available: true,
    tags: ['nuevo'],
  },
  {
    id: 'pollo-crocante',
    name: 'Pollo crocante con papas',
    description: 'Muslos de pollo marinados 24 horas, rebozados livianos y salsa barbacoa ahumada.',
    price: 19800,
    category: 'principales',
    image: pollo,
    alt: 'Piezas de pollo frito dorado y crujiente',
    available: true,
    tags: [],
  },
  {
    id: 'arroz-mariscos',
    name: 'Arroz de mariscos para la mesa',
    description: 'Arroz meloso, camarones, calamares y alioli. Se sirve para compartir entre dos.',
    price: 23400,
    category: 'principales',
    image: arroz,
    alt: 'Arroz con mariscos cocinado en una sartén grande',
    available: true,
    tags: ['recomendado'],
  },
  {
    id: 'fideos-langostinos',
    name: 'Fideos con langostinos',
    description: 'Pasta fresca, langostinos, tomate confitado y ralladura de limón.',
    price: 21600,
    category: 'principales',
    image: fideos,
    alt: 'Pasta con langostinos servida en una sartén',
    available: false,
    tags: [],
  },

  /* ---------------- 03 · Hamburguesas y sándwiches ---------------- */
  {
    id: 'brava-doble',
    name: 'Brava doble',
    description: 'Doble medallón de 90 g, cheddar fundido, cebolla caramelizada y salsa brava.',
    price: 13900,
    category: 'hamburguesas',
    image: bravaDoble,
    alt: 'Hamburguesa doble con cheddar fundido y vegetales',
    available: true,
    tags: ['recomendado'],
    featured: true,
  },
  {
    id: 'clasica-cheddar',
    name: 'Clásica con cheddar',
    description: 'Medallón de 150 g, cheddar, lechuga, tomate y pepinillos en pan brioche.',
    price: 12400,
    category: 'hamburguesas',
    image: clasica,
    alt: 'Hamburguesa clásica con pan de sésamo y vegetales frescos',
    available: true,
    tags: [],
  },
  {
    id: 'brava-huevo',
    name: 'Brava con huevo frito',
    description: 'La Brava doble más huevo frito de yema jugosa y panceta crocante.',
    price: 14900,
    category: 'hamburguesas',
    image: bravaHuevo,
    alt: 'Hamburguesa alta con huevo frito y panceta',
    available: true,
    tags: ['nuevo'],
  },
  {
    id: 'sandwich-milanesa',
    name: 'Sándwich de milanesa',
    description: 'Milanesa de ternera, mozzarella, tomate asado y rúcula en pan de masa madre.',
    price: 12900,
    category: 'hamburguesas',
    image: milanesa,
    alt: 'Sándwich tostado abierto con hojas verdes',
    available: true,
    tags: [],
  },
  {
    id: 'triple-pollo',
    name: 'Triple de pollo a la plancha',
    description: 'Tres pisos de pan de campo, pollo a la plancha, queso y mayonesa de hierbas.',
    price: 11900,
    category: 'hamburguesas',
    image: triple,
    alt: 'Sándwich triple cortado por la mitad sobre una tabla',
    available: true,
    tags: [],
  },

  /* ---------------- 04 · Opciones vegetarianas ---------------- */
  {
    id: 'bowl-quinoa',
    name: 'Bowl de quinoa y vegetales',
    description: 'Quinoa, zapallo asado, hojas, garbanzos crocantes y tahini de limón.',
    price: 12900,
    category: 'vegetarianas',
    image: bowlQuinoa,
    alt: 'Bowl de quinoa con vegetales de colores vistos desde arriba',
    available: true,
    tags: ['vegetariano', 'recomendado'],
    featured: true,
  },
  {
    id: 'pizza-margarita',
    name: 'Pizza de tomate y mozzarella',
    description: 'Masa de 48 horas de fermentación, tomate San Marzano y albahaca fresca.',
    price: 14500,
    category: 'vegetarianas',
    image: pizza,
    alt: 'Pizza margarita recién horneada vista desde arriba',
    available: true,
    tags: ['vegetariano'],
  },
  {
    id: 'tacos-coliflor',
    name: 'Tacos de coliflor al carbón',
    description: 'Tres tacos de maíz, coliflor dorada, crema de palta y pico de gallo.',
    price: 12400,
    category: 'vegetarianas',
    image: tacos,
    alt: 'Tacos con vegetales, limón y salsa',
    available: false,
    tags: ['vegetariano'],
  },
  {
    id: 'pasta-vegetal',
    name: 'Pasta de la huerta',
    description: 'Pasta corta, crema de calabaza, verduras salteadas y semillas tostadas.',
    price: 11800,
    category: 'vegetarianas',
    image: pastaVeg,
    alt: 'Plato de pasta con verduras salteadas',
    available: true,
    tags: ['vegetariano'],
  },
  {
    id: 'hamburguesa-lentejas',
    name: 'Hamburguesa de lentejas',
    description: 'Medallón de lentejas y remolacha, cheddar vegetal y pepinos encurtidos.',
    price: 12600,
    category: 'vegetarianas',
    image: hamburguesaLentejas,
    alt: 'Hamburguesa vegetariana con queso y vegetales',
    available: true,
    tags: ['vegetariano'],
  },
  {
    id: 'toast-palta-huevo',
    name: 'Toast de palta y huevo',
    description: 'Pan de campo tostado, palta pisada, huevo poché y semillas.',
    price: 9900,
    category: 'vegetarianas',
    image: toast,
    alt: 'Tostada con palta, huevo poché y hojas verdes',
    available: true,
    tags: ['vegetariano'],
  },

  /* ---------------- 05 · Café y bebidas ---------------- */
  {
    id: 'espresso',
    name: 'Espresso doble',
    description: 'Blend de la casa con notas de cacao y nuez. Servido en taza precalentada.',
    price: 3200,
    category: 'cafe',
    image: espresso,
    alt: 'Taza de espresso sobre un plato de cerámica',
    available: true,
    tags: ['de la casa'],
  },
  {
    id: 'flat-white',
    name: 'Flat white',
    description: 'Espresso doble y leche microespumada, textura sedosa y crema fina.',
    price: 4600,
    category: 'cafe',
    image: flatWhite,
    alt: 'Café con leche mientras se vierte la leche para hacer arte latte',
    available: true,
    tags: ['recomendado'],
    featured: true,
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Igual proporción de espresso, leche y espuma. Clásico de la barra.',
    price: 4400,
    category: 'cafe',
    image: cappuccino,
    alt: 'Dos cappuccinos con dibujo de espuma sobre una mesa de madera',
    available: true,
    tags: [],
  },
  {
    id: 'cold-brew',
    name: 'Cold brew de 18 horas',
    description: 'Extracción en frío, servido con hielo y un toque de naranja.',
    price: 4900,
    category: 'cafe',
    image: coldBrew,
    alt: 'Vaso alto de café frío con hielo',
    available: true,
    tags: ['nuevo'],
  },
  {
    id: 'latte-casa',
    name: 'Latte de la casa',
    description: 'Espresso y leche al punto, con la posibilidad de endulzar con miel.',
    price: 4500,
    category: 'cafe',
    image: latte,
    alt: 'Dos tazas de latte con arte en la espuma vistas desde arriba',
    available: true,
    tags: ['vegetariano'],
  },
  {
    id: 'vermut-casa',
    name: 'Vermut de la hora',
    description: 'Vermut rosado, hielo grande, aceitunas y twist de naranja.',
    price: 6800,
    category: 'cafe',
    image: vermut,
    alt: 'Vaso bajo con bebida sobre hielo y twist de cítricos',
    available: true,
    tags: [],
  },

  /* ---------------- 06 · Pastelería y postres ---------------- */
  {
    id: 'croissant',
    name: 'Croissant de manteca',
    description: 'Hojaldre de 27 capas, horneado todas las mañanas desde las 7:00.',
    price: 3600,
    category: 'pasteleria',
    image: croissant,
    alt: 'Croissants dorados recién horneados',
    available: true,
    tags: ['vegetariano', 'recomendado'],
    featured: true,
  },
  {
    id: 'torta-chocolate',
    name: 'Torta de chocolate de la casa',
    description: 'Bizcocho húmedo de cacao, ganache oscuro y sal en escamas.',
    price: 6900,
    category: 'pasteleria',
    image: torta,
    alt: 'Torta de chocolate con cobertura brillante',
    available: true,
    tags: ['vegetariano'],
  },
  {
    id: 'cheesecake-frutos-rojos',
    name: 'Cheesecake de frutos rojos',
    description: 'Crema de queso al horno, base de galleta y frambuesa fresca.',
    price: 7200,
    category: 'pasteleria',
    image: cheesecake,
    alt: 'Porción de cheesecake con frutos rojos',
    available: true,
    tags: ['recomendado'],
  },
  {
    id: 'mousse-chocolate',
    name: 'Mousse de chocolate con café',
    description: 'Chocolate 70% y espresso, terminado con crocante de cacao.',
    price: 6400,
    category: 'pasteleria',
    image: mousse,
    alt: 'Postre de mousse de chocolate en copa con crema',
    available: true,
    tags: ['vegetariano'],
  },
  {
    id: 'flan-dulce-de-leche',
    name: 'Flan napolitano',
    description: 'Flan casero, dulce de leche y crema chantilly. Porción generosa.',
    price: 6200,
    category: 'pasteleria',
    image: flan,
    alt: 'Postre blanco con cobertura de caramelo',
    available: false,
    tags: ['vegetariano'],
  },
  {
    id: 'cookies-chocolate',
    name: 'Cookie de chocolate y nuez',
    description: 'Interior suave, borde crocante y pepitas de chocolate negro.',
    price: 3900,
    category: 'pasteleria',
    image: cookies,
    alt: 'Cookies de chocolate recién horneadas en un bol de papel',
    available: true,
    tags: ['vegetariano'],
  },
];

/* ----------------- Selectores de datos ----------------- */

export const getProduct = (id: string): Product | undefined =>
  PRODUCTS.find((product) => product.id === id);

export const getProductsByCategory = (category: CategoryId): Product[] =>
  PRODUCTS.filter((product) => product.category === category);

export const getFeatured = (limit = 4): Product[] =>
  PRODUCTS.filter((product) => product.featured && product.available).slice(0, limit);

export const getCategory = (id: CategoryId): Category =>
  CATEGORIES.find((category) => category.id === id) as Category;

/**
 * Versión liviana para consumo en el cliente (carrito).
 * Se serializa como JSON en el layout: un único origen de verdad.
 */
export interface CatalogItem {
  id: string;
  name: string;
  price: number;
  category: CategoryId;
  image: string;
  available: boolean;
}

export const CATALOG: CatalogItem[] = PRODUCTS.map((product) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  category: product.category,
  image: product.image.src,
  available: product.available,
}));
