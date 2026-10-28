/**
 * Estado del pedido (carrito) — se guarda en localStorage.
 * Sólo se ejecuta en el navegador; nunca en el build.
 */
import type { CatalogItem } from '../data/menu';

export interface CartLine {
  id: string;
  qty: number;
}

export interface ResolvedLine extends CartLine {
  name: string;
  price: number;
  image: string;
  available: boolean;
  lineTotal: number;
}

const STORAGE_KEY = 'mesa-brava:pedido:v1';
const MAX_PER_LINE = 20;

const hasStorage = (): boolean => typeof window !== 'undefined' && 'localStorage' in window;

export function readCart(): CartLine[] {
  if (!hasStorage()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (line): line is CartLine =>
          !!line &&
          typeof line === 'object' &&
          typeof (line as CartLine).id === 'string' &&
          typeof (line as CartLine).qty === 'number',
      )
      .map((line) => ({ id: line.id, qty: clampQty(line.qty) }))
      .filter((line) => line.qty > 0);
  } catch {
    return [];
  }
}

function clampQty(qty: number): number {
  if (!Number.isFinite(qty)) return 0;
  return Math.max(0, Math.min(MAX_PER_LINE, Math.round(qty)));
}

export function writeCart(lines: CartLine[]): CartLine[] {
  if (!hasStorage()) return lines;
  const clean = lines.filter((line) => line.qty > 0);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
  } catch {
    /* modo privado / cuota llena: el carrito vive sólo en memoria */
  }
  window.dispatchEvent(new CustomEvent('mb:cartchange'));
  return clean;
}

export function addToCart(id: string, qty = 1): CartLine[] {
  const lines = readCart();
  const existing = lines.find((line) => line.id === id);
  if (existing) {
    existing.qty = clampQty(existing.qty + qty);
  } else {
    lines.push({ id, qty: clampQty(qty) });
  }
  return writeCart(lines);
}

export function setQty(id: string, qty: number): CartLine[] {
  const lines = readCart();
  const next = lines
    .map((line) => (line.id === id ? { ...line, qty: clampQty(qty) } : line))
    .filter((line) => line.qty > 0);
  return writeCart(next);
}

export function removeFromCart(id: string): CartLine[] {
  return writeCart(readCart().filter((line) => line.id !== id));
}

export function clearCart(): CartLine[] {
  return writeCart([]);
}

export function cartCount(lines: CartLine[] = readCart()): number {
  return lines.reduce((total, line) => total + line.qty, 0);
}

/** Une el carrito con el catálogo central (nombre, precio e imagen). */
export function resolveCart(lines: CartLine[], catalog: CatalogItem[]): ResolvedLine[] {
  const byId = new Map(catalog.map((item) => [item.id, item]));
  return lines.flatMap((line) => {
    const item = byId.get(line.id);
    if (!item) return [];
    return [
      {
        ...line,
        name: item.name,
        price: item.price,
        image: item.image,
        available: item.available,
        lineTotal: item.price * line.qty,
      },
    ];
  });
}

export function cartSubtotal(lines: ResolvedLine[]): number {
  return lines.reduce((total, line) => total + line.lineTotal, 0);
}
