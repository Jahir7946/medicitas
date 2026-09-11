import type { Cita } from '../types'
import CitaItem from './CitaItem'

interface Props {
  citas: Cita[]
  onConfirmar: (id: string) => void
  onAtender: (id: string) => void
  onCancelar: (id: string) => void
}

export default function CitaList({ citas, onConfirmar, onAtender, onCancelar }: Props) {
  if (citas.length === 0) {
    return <p className="vacio">No hay citas que mostrar con este filtro.</p>
  }
  return (
    <ul className="lista">
      {citas.map((c) => (
        <CitaItem
          key={c.id}
          cita={c}
          onConfirmar={onConfirmar}
          onAtender={onAtender}
          onCancelar={onCancelar}
        />
      ))}
    </ul>
  )
}
