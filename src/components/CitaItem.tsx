import type { Cita } from '../types'

interface Props {
  cita: Cita
  onConfirmar: (id: string) => void
  onAtender: (id: string) => void
  onCancelar: (id: string) => void
}

export default function CitaItem({ cita, onConfirmar, onAtender, onCancelar }: Props) {
  return (
    <li className={`cita estado-${cita.estado}`}>
      <div className="cita-hora">
        <strong>{cita.hora}</strong>
        <span>{cita.fecha}</span>
      </div>
      <div className="cita-datos">
        <strong>{cita.paciente}</strong>
        <span>
          {cita.medico} - {cita.especialidad}
        </span>
        {cita.motivo && <em>{cita.motivo}</em>}
      </div>
      <div className="cita-acciones">
        <span className="badge">{cita.estado}</span>
        {cita.estado === 'agendada' && (
          <button onClick={() => onConfirmar(cita.id)}>Confirmar</button>
        )}
        {cita.estado === 'confirmada' && (
          <button onClick={() => onAtender(cita.id)}>Atender</button>
        )}
        {cita.estado !== 'cancelada' && cita.estado !== 'atendida' && (
          <button className="peligro" onClick={() => onCancelar(cita.id)}>
            Cancelar
          </button>
        )}
      </div>
    </li>
  )
}
