# HU-05 Recordatorio 24 horas antes

Como paciente quiero recibir un recordatorio un dia antes de mi cita para no olvidarla.

## Criterios de aceptacion

- [ ] Dado que tengo una cita confirmada, cuando faltan 24 horas, entonces el sistema
      emite el aviso por el canal registrado.
- [ ] Dado que la cita fue cancelada, cuando llega el momento del recordatorio,
      entonces no se emite ningun aviso.

## Notas tecnicas

El bus de eventos ya publica `cita:confirmada`; el recordatorio se suscribe ahi y
programa el aviso. No requiere tocar los componentes.

## Estado

En progreso. Sprint 4.
