export type EstadoCita = 'agendada' | 'confirmada' | 'atendida' | 'cancelada'

export interface Cita {
  id: string
  paciente: string
  telefono: string
  medico: string
  especialidad: string
  fecha: string
  hora: string
  estado: EstadoCita
  motivo: string
}

export type NuevaCita = Omit<Cita, 'id' | 'estado'>

export interface Medico {
  id: string
  nombre: string
  especialidad: string
  consultorio: number
}

export type Filtro = 'todas' | 'hoy' | 'pendientes' | 'canceladas'
