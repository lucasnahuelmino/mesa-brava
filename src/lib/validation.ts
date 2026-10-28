/**
 * Validación del formulario de reserva (lado cliente).
 * Este demo NO tiene backend: los datos no se guardan en ningún servidor.
 */
import { parseISODate, todayISO } from './format';
import { SITE } from '../config/site';

export interface ReservationInput {
  nombre: string;
  contacto: string;
  fecha: string;
  hora: string;
  personas: string;
  comentarios: string;
}

export type ReservationErrors = Partial<Record<keyof ReservationInput, string>>;

/** Días hacia adelante que acepta la demo. */
const MAX_LEAD_DAYS = 60;
const MAX_COMMENTS = 300;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function digitCount(value: string): number {
  return (value.match(/\d/g) ?? []).length;
}

export function validateReservation(input: ReservationInput): ReservationErrors {
  const errors: ReservationErrors = {};

  /* Nombre */
  const nombre = input.nombre.trim();
  if (!nombre) {
    errors.nombre = 'Ingresá tu nombre y apellido.';
  } else if (nombre.length < 3) {
    errors.nombre = 'Usá al menos 3 caracteres.';
  } else if (nombre.length > 60) {
    errors.nombre = 'Máximo 60 caracteres.';
  }

  /* Teléfono o medio de contacto */
  const contacto = input.contacto.trim();
  if (!contacto) {
    errors.contacto = 'Ingresá un teléfono o un correo electrónico.';
  } else if (EMAIL_RE.test(contacto)) {
    /* válido */
  } else if (digitCount(contacto) >= 8) {
    /* válido: teléfono */
  } else {
    errors.contacto = 'Revisá el dato: debe ser un teléfono (mínimo 8 dígitos) o un correo válido.';
  }

  /* Fecha */
  const fecha = input.fecha.trim();
  if (!fecha) {
    errors.fecha = 'Elegí una fecha para la reserva.';
  } else {
    const date = parseISODate(fecha);
    const today = parseISODate(todayISO()) as Date;
    if (!date) {
      errors.fecha = 'La fecha no es válida.';
    } else if (date < today) {
      errors.fecha = 'La fecha ya pasó. Elegí un día desde hoy en adelante.';
    } else {
      const limit = new Date(today);
      limit.setDate(limit.getDate() + MAX_LEAD_DAYS);
      if (date > limit) {
        errors.fecha = `Sólo tomamos solicitudes hasta ${MAX_LEAD_DAYS} días adelante.`;
      }
    }
  }

  /* Hora */
  const hora = input.hora.trim();
  if (!hora) {
    errors.hora = 'Elegí un horario.';
  } else if (!SITE.reservationSlots.includes(hora as never)) {
    errors.hora = 'Elegí un horario disponible de la lista.';
  }

  /* Personas */
  const personas = input.personas.trim();
  const personasNum = Number(personas);
  if (!personas) {
    errors.personas = 'Indicá cuántas personas son.';
  } else if (!Number.isInteger(personasNum) || personasNum < 1) {
    errors.personas = 'Ingresá un número válido.';
  } else if (personasNum > SITE.maxPartySize) {
    errors.personas = `Para grupos de más de ${SITE.maxPartySize} personas, escribinos por WhatsApp.`;
  }

  /* Comentarios (opcional) */
  if (input.comentarios.length > MAX_COMMENTS) {
    errors.comentarios = `Máximo ${MAX_COMMENTS} caracteres.`;
  }

  return errors;
}

export const FIELD_LABELS: Record<keyof ReservationInput, string> = {
  nombre: 'Nombre y apellido',
  contacto: 'Teléfono o correo',
  fecha: 'Fecha',
  hora: 'Hora',
  personas: 'Cantidad de personas',
  comentarios: 'Comentarios',
};
