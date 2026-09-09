import { useState } from 'react'
import type { NuevaCita } from '../types'
import { HORARIOS, MEDICOS } from '../data/medicos'

const VACIO: NuevaCita = {
  paciente: '',
  telefono: '',
  medico: MEDICOS[0].nombre,
  especialidad: MEDICOS[0].especialidad,
  fecha: new Date().toISOString().slice(0, 10),
  hora: HORARIOS[0],
  motivo: '',
}

interface Props {
  onAgendar: (datos: NuevaCita) => boolean
  errores: string[]
}

export default function CitaForm({ onAgendar, errores }: Props) {
  const [datos, setDatos] = useState<NuevaCita>(VACIO)

  const cambiarMedico = (nombre: string) => {
    const medico = MEDICOS.find((m) => m.nombre === nombre)
    setDatos({ ...datos, medico: nombre, especialidad: medico?.especialidad ?? '' })
  }

  return (
    <form
      className="tarjeta form"
      onSubmit={(e) => {
        e.preventDefault()
        if (onAgendar(datos)) setDatos({ ...VACIO, fecha: datos.fecha })
      }}
    >
      <h2>Agendar cita</h2>

      <label>
        Paciente
        <input
          value={datos.paciente}
          onChange={(e) => setDatos({ ...datos, paciente: e.target.value })}
          placeholder="Nombre completo"
        />
      </label>

      <label>
        Telefono
        <input
          value={datos.telefono}
          onChange={(e) => setDatos({ ...datos, telefono: e.target.value })}
          placeholder="10 digitos"
          maxLength={10}
        />
      </label>

      <label>
        Medico
        <select value={datos.medico} onChange={(e) => cambiarMedico(e.target.value)}>
          {MEDICOS.map((m) => (
            <option key={m.id} value={m.nombre}>
              {m.nombre} - {m.especialidad}
            </option>
          ))}
        </select>
      </label>

      <div className="fila">
        <label>
          Fecha
          <input
            type="date"
            value={datos.fecha}
            onChange={(e) => setDatos({ ...datos, fecha: e.target.value })}
          />
        </label>
        <label>
          Hora
          <select value={datos.hora} onChange={(e) => setDatos({ ...datos, hora: e.target.value })}>
            {HORARIOS.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Motivo
        <input
          value={datos.motivo}
          onChange={(e) => setDatos({ ...datos, motivo: e.target.value })}
          placeholder="Consulta, revision, control..."
        />
      </label>

      {errores.length > 0 && (
        <ul className="errores">
          {errores.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}

      <button type="submit">Agendar</button>
    </form>
  )
}
