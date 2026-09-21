/**
 * Patron Factory Method.
 * La agenda pide un notificador por canal y no depende de la clase concreta.
 */
import type { Cita } from '../types'

export type Canal = 'sms' | 'correo' | 'ninguno'

export interface Notificador {
  canal: Canal
  enviar(cita: Cita): string
}

class NotificadorSms implements Notificador {
  canal: Canal = 'sms'
  enviar(cita: Cita): string {
    return `SMS a ${cita.telefono}: cita con ${cita.medico} el ${cita.fecha} a las ${cita.hora}.`
  }
}

class NotificadorCorreo implements Notificador {
  canal: Canal = 'correo'
  enviar(cita: Cita): string {
    return `Correo a ${cita.paciente}: cita ${cita.estado} para el ${cita.fecha} ${cita.hora}.`
  }
}

class NotificadorNulo implements Notificador {
  canal: Canal = 'ninguno'
  enviar(): string {
    return ''
  }
}

export function crearNotificador(canal: Canal): Notificador {
  switch (canal) {
    case 'sms':
      return new NotificadorSms()
    case 'correo':
      return new NotificadorCorreo()
    default:
      return new NotificadorNulo()
  }
}
