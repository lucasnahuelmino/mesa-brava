/**
 * Construcción de mensajes y enlaces de WhatsApp.
 *
 * El sitio NO envía pedidos ni reservas: sólo prepara un mensaje
 * que la persona revisa y envía desde su propio WhatsApp.
 * Abrir WhatsApp no equivale a un pedido o una reserva confirmada.
 */
import { SITE } from '../config/site';
import { formatARS, formatLongDate } from './format';

export interface OrderLine {
  name: string;
  qty: number;
  price: number;
}

/** Enlace wa.me con el mensaje pre-cargado. */
export function waLink(message: string, number: string = SITE.whatsapp.number): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Mensaje del pedido armado en la web. */
export function buildOrderMessage(lines: OrderLine[], subtotal: number): string {
  const items = lines
    .map((line) => `• ${line.qty} × ${line.name} — ${formatARS(line.price * line.qty)}`)
    .join('\n');

  return [
    `Hola ${SITE.whatsapp.businessName}, quiero consultar por este pedido armado en la web:`,
    '',
    items,
    '',
    `Subtotal: ${formatARS(subtotal)}`,
    '',
    '¿Me confirman disponibilidad, tiempo de entrega y total final?',
    '',
    '(Mensaje generado en la demo de la web. Nada fue cobrado ni confirmado aún.)',
  ].join('\n');
}

export interface ReservationRequest {
  nombre: string;
  contacto: string;
  fecha: string;
  hora: string;
  personas: string;
  comentarios?: string;
}

/** Mensaje de solicitud de reserva (requiere confirmación del local). */
export function buildReservationMessage(data: ReservationRequest): string {
  const comentarios = data.comentarios?.trim();
  return [
    `Hola ${SITE.whatsapp.businessName}, quiero solicitar una mesa:`,
    '',
    `Nombre: ${data.nombre.trim()}`,
    `Contacto: ${data.contacto.trim()}`,
    `Fecha: ${formatLongDate(data.fecha)}`,
    `Hora: ${data.hora}`,
    `Personas: ${data.personas}`,
    comentarios ? `Comentarios: ${comentarios}` : 'Comentarios: —',
    '',
    '¿Me confirman si hay disponibilidad? Quedo atento/a.',
    '',
    '(Solicitud enviada desde la demo de la web: la mesa NO está confirmada hasta que el restaurante responda.)',
  ].join('\n');
}

/** Enlace directo al WhatsApp del local (sin mensaje). */
export function waContactLink(): string {
  return waLink(
    `Hola ${SITE.whatsapp.businessName}, vengo del sitio web y quiero hacer una consulta.`,
  );
}
