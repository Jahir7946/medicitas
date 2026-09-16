import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Cita, Filtro, NuevaCita } from '../types'
import { citaRepository } from '../repositories/citaRepository'
import { agendar, cambiarEstado, hayEmpalme, ordenarPorHorario, validar } from '../patterns/agenda'
import { aplicarFiltro } from '../patterns/filtroStrategies'

const hoyISO = () => new Date().toISOString().slice(0, 10)

export function useCitas() {
  const [citas, setCitas] = useState<Cita[]>(() => citaRepository.listar())
  const [filtro, setFiltro] = useState<Filtro>('todas')
  const [errores, setErrores] = useState<string[]>([])

  useEffect(() => {
    citaRepository.guardar(citas)
  }, [citas])

  const crear = useCallback(
    (datos: NuevaCita): boolean => {
      const fallas = validar(datos)
      if (hayEmpalme(citas, datos.medico, datos.fecha, datos.hora)) {
        fallas.push('Ese medico ya tiene una cita en ese horario.')
      }
      setErrores(fallas)
      if (fallas.length > 0) return false
      setCitas((previas) => agendar(previas, datos))
      return true
    },
    [citas],
  )

  const confirmar = useCallback((id: string) => {
    setCitas((previas) => cambiarEstado(previas, id, 'confirmada'))
  }, [])

  const atender = useCallback((id: string) => {
    setCitas((previas) => cambiarEstado(previas, id, 'atendida'))
  }, [])

  const cancelar = useCallback((id: string) => {
    setCitas((previas) => cambiarEstado(previas, id, 'cancelada'))
  }, [])

  const visibles = useMemo(
    () => ordenarPorHorario(aplicarFiltro(citas, filtro, hoyISO())),
    [citas, filtro],
  )

  const resumen = useMemo(
    () => ({
      total: citas.length,
      pendientes: citas.filter((c) => c.estado === 'agendada').length,
      confirmadas: citas.filter((c) => c.estado === 'confirmada').length,
      canceladas: citas.filter((c) => c.estado === 'cancelada').length,
    }),
    [citas],
  )

  return { citas: visibles, resumen, filtro, setFiltro, errores, crear, confirmar, atender, cancelar }
}
