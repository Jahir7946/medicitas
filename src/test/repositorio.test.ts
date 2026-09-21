import { beforeEach, describe, expect, it } from 'vitest'
import { MemoriaCitaRepository } from '../repositories/citaRepository'
import { eventBus } from '../patterns/eventBus'
import { crearNotificador } from '../patterns/notificadorFactory'
import type { Cita } from '../types'

const CITA: Cita = {
  id: 'c-1',
  paciente: 'Luis Garza',
  telefono: '5599887766',
  medico: 'Dr. Ernesto Salas',
  especialidad: 'Pediatria',
  fecha: '2026-10-07',
  hora: '16:00',
  estado: 'agendada',
  motivo: 'Revision',
}

describe('MemoriaCitaRepository', () => {
  const repo = new MemoriaCitaRepository()

  beforeEach(() => repo.limpiar())

  it('arranca vacio', () => {
    expect(repo.listar()).toEqual([])
  })

  it('guarda y recupera la agenda', () => {
    repo.guardar([CITA])
    expect(repo.listar()).toHaveLength(1)
  })

  it('entrega una copia y no la referencia interna', () => {
    repo.guardar([CITA])
    repo.listar().push({ ...CITA, id: 'c-2' })
    expect(repo.listar()).toHaveLength(1)
  })
})

describe('eventBus', () => {
  beforeEach(() => eventBus.limpiar())

  it('avisa a los suscriptores del evento publicado', () => {
    const recibidas: string[] = []
    eventBus.suscribir<Cita>('cita:creada', (c) => recibidas.push(c.id))
    eventBus.publicar('cita:creada', CITA)
    expect(recibidas).toEqual(['c-1'])
  })

  it('deja de avisar despues de cancelar la suscripcion', () => {
    let veces = 0
    const cancelar = eventBus.suscribir<Cita>('cita:creada', () => veces++)
    eventBus.publicar('cita:creada', CITA)
    cancelar()
    eventBus.publicar('cita:creada', CITA)
    expect(veces).toBe(1)
  })
})

describe('crearNotificador', () => {
  it('devuelve el notificador del canal pedido', () => {
    expect(crearNotificador('sms').canal).toBe('sms')
    expect(crearNotificador('correo').canal).toBe('correo')
  })

  it('el canal ninguno no emite mensaje', () => {
    expect(crearNotificador('ninguno').enviar(CITA)).toBe('')
  })

  it('el mensaje de SMS lleva el telefono del paciente', () => {
    expect(crearNotificador('sms').enviar(CITA)).toContain('5599887766')
  })
})
