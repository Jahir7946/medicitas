import { describe, expect, it } from 'vitest'
import { agendar, cambiarEstado, hayEmpalme, ordenarPorHorario, validar } from '../patterns/agenda'
import type { Cita, NuevaCita } from '../types'

const base: NuevaCita = {
  paciente: 'Ana Ruiz',
  telefono: '5512345678',
  medico: 'Dra. Laura Mendoza',
  especialidad: 'Medicina general',
  fecha: '2026-10-05',
  hora: '09:00',
  motivo: 'Control',
}

describe('validar', () => {
  it('acepta una cita bien formada', () => {
    expect(validar(base)).toEqual([])
  })

  it('rechaza el telefono que no tiene diez digitos', () => {
    expect(validar({ ...base, telefono: '551234' })).toContain('El telefono debe tener 10 digitos.')
  })

  it('acepta el telefono capturado con espacios o guiones', () => {
    expect(validar({ ...base, telefono: '55 1234 5678' })).toEqual([])
    expect(validar({ ...base, telefono: '55-1234-5678' })).toEqual([])
  })

  it('rechaza el nombre demasiado corto', () => {
    expect(validar({ ...base, paciente: 'Ab' })).toContain('El nombre del paciente es obligatorio.')
  })
})

describe('hayEmpalme', () => {
  const citas = agendar([], base)

  it('detecta dos citas del mismo medico a la misma hora', () => {
    expect(hayEmpalme(citas, base.medico, base.fecha, base.hora)).toBe(true)
  })

  it('permite la misma hora con otro medico', () => {
    expect(hayEmpalme(citas, 'Dr. Ernesto Salas', base.fecha, base.hora)).toBe(false)
  })

  it('libera el horario cuando la cita fue cancelada', () => {
    const canceladas = cambiarEstado(citas, citas[0].id, 'cancelada')
    expect(hayEmpalme(canceladas, base.medico, base.fecha, base.hora)).toBe(false)
  })
})

describe('agendar y cambiarEstado', () => {
  it('crea la cita en estado agendada y con identificador', () => {
    const [cita] = agendar([], base)
    expect(cita.estado).toBe('agendada')
    expect(cita.id).toMatch(/^c-/)
  })

  it('no altera el arreglo original', () => {
    const previas: Cita[] = []
    agendar(previas, base)
    expect(previas).toHaveLength(0)
  })

  it('confirma la cita indicada y deja las demas intactas', () => {
    const citas = agendar(agendar([], base), { ...base, hora: '10:00' })
    const resultado = cambiarEstado(citas, citas[0].id, 'confirmada')
    expect(resultado[0].estado).toBe('confirmada')
    expect(resultado[1].estado).toBe('agendada')
  })
})

describe('ordenarPorHorario', () => {
  it('ordena por fecha y hora ascendente', () => {
    const citas = ordenarPorHorario([
      { ...base, id: 'b', estado: 'agendada', hora: '12:00' },
      { ...base, id: 'a', estado: 'agendada', hora: '09:00' },
    ])
    expect(citas.map((c) => c.id)).toEqual(['a', 'b'])
  })
})
