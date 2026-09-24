# Registro de cambios

El formato sigue Keep a Changelog y el versionado semantico.

## [1.0.1] - 2026-09-28

### Corregido
- El telefono del paciente ya acepta el formato con espacios o guiones que llega
  de la recepcion sin rechazar la cita.

## [1.0.0] - 2026-09-28

### Agregado
- Alta de citas con validacion de paciente, telefono, medico, fecha y hora.
- Deteccion de empalmes: un medico no puede tener dos citas activas a la misma hora.
- Cambio de estado de la cita: confirmada, atendida y cancelada.
- Filtros de agenda (todas, hoy, pendientes, canceladas) y tablero de resumen.
- Persistencia local de la agenda entre recargas del navegador.
- Avisos al paciente por SMS y correo simulados.

## [0.1.0] - 2026-09-28

### Agregado
- Estructura inicial del proyecto con Vite, React 19 y TypeScript.
- Configuracion de integracion continua y plantillas del repositorio.
