import { useEffect, useState } from 'react'
import CitaForm from './components/CitaForm'
import CitaList from './components/CitaList'
import FiltroBar from './components/FiltroBar'
import Resumen from './components/Resumen'
import { useCitas } from './hooks/useCitas'
import { eventBus } from './patterns/eventBus'
import { crearNotificador } from './patterns/notificadorFactory'
import type { Cita } from './types'
import './App.css'

export default function App() {
  const { citas, resumen, filtro, setFiltro, errores, crear, confirmar, atender, cancelar } =
    useCitas()
  const [aviso, setAviso] = useState('')

  useEffect(() => {
    const sms = crearNotificador('sms')
    const correo = crearNotificador('correo')
    const cancelarCreada = eventBus.suscribir<Cita>('cita:creada', (c) => setAviso(sms.enviar(c)))
    const cancelarConf = eventBus.suscribir<Cita>('cita:confirmada', (c) =>
      setAviso(correo.enviar(c)),
    )
    return () => {
      cancelarCreada()
      cancelarConf()
    }
  }, [])

  return (
    <div className="app">
      <header>
        <h1>MediCitas</h1>
        <p>Clinica Santa Elena - agenda de consultorios</p>
      </header>

      <Resumen resumen={resumen} />
      {aviso && <div className="aviso">{aviso}</div>}

      <main>
        <CitaForm onAgendar={crear} errores={errores} />
        <section className="tarjeta">
          <h2>Agenda</h2>
          <FiltroBar filtro={filtro} onCambiar={setFiltro} />
          <CitaList
            citas={citas}
            onConfirmar={confirmar}
            onAtender={atender}
            onCancelar={cancelar}
          />
        </section>
      </main>
    </div>
  )
}
