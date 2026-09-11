/**
 * Patron Observer.
 * Publica los eventos del dominio (cita creada, confirmada, cancelada) sin que
 * quien los emite conozca a los interesados.
 */
export type EventoCita =
  | 'cita:creada'
  | 'cita:agendada'
  | 'cita:confirmada'
  | 'cita:cancelada'
  | 'cita:atendida'

type Manejador<T> = (payload: T) => void

class EventBus {
  private suscriptores = new Map<EventoCita, Set<Manejador<unknown>>>()

  suscribir<T>(evento: EventoCita, manejador: Manejador<T>): () => void {
    const actuales = this.suscriptores.get(evento) ?? new Set()
    actuales.add(manejador as Manejador<unknown>)
    this.suscriptores.set(evento, actuales)
    return () => actuales.delete(manejador as Manejador<unknown>)
  }

  publicar<T>(evento: EventoCita, payload: T): void {
    const actuales = this.suscriptores.get(evento)
    if (!actuales) return
    for (const manejador of actuales) manejador(payload)
  }

  limpiar(): void {
    this.suscriptores.clear()
  }
}

export const eventBus = new EventBus()
