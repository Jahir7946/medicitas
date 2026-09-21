interface Props {
  resumen: { total: number; pendientes: number; confirmadas: number; canceladas: number }
}

export default function Resumen({ resumen }: Props) {
  const celdas = [
    { etiqueta: 'Total', valor: resumen.total },
    { etiqueta: 'Pendientes', valor: resumen.pendientes },
    { etiqueta: 'Confirmadas', valor: resumen.confirmadas },
    { etiqueta: 'Canceladas', valor: resumen.canceladas },
  ]
  return (
    <div className="resumen">
      {celdas.map((c) => (
        <div key={c.etiqueta} className="celda">
          <span className="numero">{c.valor}</span>
          <span className="etiqueta">{c.etiqueta}</span>
        </div>
      ))}
    </div>
  )
}
