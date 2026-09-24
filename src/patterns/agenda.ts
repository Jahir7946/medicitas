/**
 * Reglas de negocio de la agenda. No sabe nada de React ni de localStorage.
 */
import type { Cita, EstadoCita, NuevaCita } from '../types'
import { eventBus, type EventoCita } from './eventBus'

export function hayEmpalme(citas: Cita[], medico: string, fecha: string, hora: string): boolean {
  return citas.some(
    (c) => c.medico === medico && c.fecha === fecha && c.hora === hora && c.estado !== 'cancelada',
  )
}

export function validar(datos: NuevaCita): string[] {
  const errores: string[] = []
  if (datos.paciente.trim().length < 3) errores.push('El nombre del paciente es obligatorio.')
  const telefono = datos.telefono.replace(/[\s-]/g, '')
  if (!/^\d{10}$/.test(telefono)) errores.push('El telefono debe tener 10 digitos.')
  if (!datos.fecha) errores.push('Falta la fecha de la cita.')
  if (!datos.hora) errores.push('Falta la hora de la cita.')
  if (!datos.medico) errores.push('Falta seleccionar al medico.')
  return errores
}

export function agendar(citas: Cita[], datos: NuevaCita): Cita[] {
  const cita: Cita = {
    ...datos,
    id: `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    estado: 'agendada',
  }
  eventBus.publicar('cita:creada', cita)
  return [...citas, cita]
}

export function cambiarEstado(citas: Cita[], id: string, estado: EstadoCita): Cita[] {
  const siguiente = citas.map((c) => (c.id === id ? { ...c, estado } : c))
  const cita = siguiente.find((c) => c.id === id)
  if (cita) eventBus.publicar(`cita:${estado}` as EventoCita, cita)
  return siguiente
}

export function ordenarPorHorario(citas: Cita[]): Cita[] {
  return [...citas].sort((a, b) => `${a.fecha}${a.hora}`.localeCompare(`${b.fecha}${b.hora}`))
}
