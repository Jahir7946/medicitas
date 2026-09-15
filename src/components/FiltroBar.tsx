import type { Filtro } from '../types'

const OPCIONES: { valor: Filtro; texto: string }[] = [
  { valor: 'todas', texto: 'Todas' },
  { valor: 'hoy', texto: 'Hoy' },
  { valor: 'pendientes', texto: 'Pendientes' },
  { valor: 'canceladas', texto: 'Canceladas' },
]

interface Props {
  filtro: Filtro
  onCambiar: (f: Filtro) => void
}

export default function FiltroBar({ filtro, onCambiar }: Props) {
  return (
    <div className="filtros">
      {OPCIONES.map((o) => (
        <button
          key={o.valor}
          className={o.valor === filtro ? 'chip activo' : 'chip'}
          onClick={() => onCambiar(o.valor)}
        >
          {o.texto}
        </button>
      ))}
    </div>
  )
}
