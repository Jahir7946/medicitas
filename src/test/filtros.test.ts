import { describe, expect, it } from 'vitest'
import { aplicarFiltro } from '../patterns/filtroStrategies'
import type { Cita } from '../types'

const cita = (id: string, fecha: string, estado: Cita['estado']): Cita => ({
  id,
  paciente: 'Paciente ' + id,
  telefono: '5500000000',
  medico: 'Dra. Paola Rivas',
  especialidad: 'Odontologia',
  fecha,
  hora: '09:00',
  estado,
  motivo: '',
})

const HOY = '2026-10-05'
const CITAS: Cita[] = [
  cita('1', HOY, 'agendada'),
  cita('2', HOY, 'cancelada'),
  cita('3', '2026-10-09', 'confirmada'),
  cita('4', '2026-10-10', 'atendida'),
]

describe('aplicarFiltro', () => {
  it('todas devuelve la agenda completa', () => {
    expect(aplicarFiltro(CITAS, 'todas', HOY)).toHaveLength(4)
  })

  it('hoy deja fuera las canceladas del dia', () => {
    expect(aplicarFiltro(CITAS, 'hoy', HOY).map((c) => c.id)).toEqual(['1'])
  })

  it('pendientes incluye agendadas y confirmadas', () => {
    expect(aplicarFiltro(CITAS, 'pendientes', HOY).map((c) => c.id)).toEqual(['1', '3'])
  })

  it('canceladas solo trae las canceladas', () => {
    expect(aplicarFiltro(CITAS, 'canceladas', HOY).map((c) => c.id)).toEqual(['2'])
  })
})
