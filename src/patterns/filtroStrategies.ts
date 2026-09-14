/**
 * Patron Strategy.
 * Cada filtro de la agenda es una funcion intercambiable; agregar uno nuevo no
 * obliga a tocar la lista ni el hook.
 */
import type { Cita, Filtro } from '../types'

export type EstrategiaFiltro = (citas: Cita[], hoy: string) => Cita[]

export const ESTRATEGIAS: Record<Filtro, EstrategiaFiltro> = {
  todas: (citas) => citas,
  hoy: (citas, hoy) => citas.filter((c) => c.fecha === hoy && c.estado !== 'cancelada'),
  pendientes: (citas) => citas.filter((c) => c.estado === 'agendada' || c.estado === 'confirmada'),
  canceladas: (citas) => citas.filter((c) => c.estado === 'cancelada'),
}

export function aplicarFiltro(citas: Cita[], filtro: Filtro, hoy: string): Cita[] {
  return ESTRATEGIAS[filtro](citas, hoy)
}
