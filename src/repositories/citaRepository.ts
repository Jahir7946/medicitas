/**
 * Patron Repository.
 * Aisla la persistencia: hoy es localStorage, manana puede ser una API REST sin
 * que cambie una sola linea de los componentes.
 */
import type { Cita } from '../types'

const CLAVE = 'medicitas.citas.v1'

export interface CitaRepository {
  listar(): Cita[]
  guardar(citas: Cita[]): void
  limpiar(): void
}

export class LocalStorageCitaRepository implements CitaRepository {
  private readonly clave: string

  constructor(clave: string = CLAVE) {
    this.clave = clave
  }

  listar(): Cita[] {
    try {
      const crudo = localStorage.getItem(this.clave)
      return crudo ? (JSON.parse(crudo) as Cita[]) : []
    } catch {
      return []
    }
  }

  guardar(citas: Cita[]): void {
    try {
      localStorage.setItem(this.clave, JSON.stringify(citas))
    } catch {
      /* cuota agotada o modo privado: la agenda sigue en memoria */
    }
  }

  limpiar(): void {
    localStorage.removeItem(this.clave)
  }
}

export class MemoriaCitaRepository implements CitaRepository {
  private datos: Cita[] = []
  listar(): Cita[] {
    return [...this.datos]
  }
  guardar(citas: Cita[]): void {
    this.datos = [...citas]
  }
  limpiar(): void {
    this.datos = []
  }
}

export const citaRepository: CitaRepository = new LocalStorageCitaRepository()
