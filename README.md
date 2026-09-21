# MediCitas

Plataforma web de gestion de citas para la Clinica Santa Elena. Permite agendar,
confirmar, atender y cancelar citas de tres consultorios, con deteccion de empalmes
por medico y horario.

Caso de estudio de la asignatura Desarrollo Web Integral (UTFV, DGS-901).

## Stack

| Capa | Tecnologia |
|---|---|
| Interfaz | React 19 + TypeScript 6 |
| Empaquetado | Vite 8 |
| Persistencia | localStorage (patron Repository) |
| Pruebas | Vitest |

## Puesta en marcha

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # compila a dist/
npm test         # corre la bateria de pruebas
```

Requiere Node 24.16.0 (ver `.nvmrc`).

## Estructura

```
src/
  components/     Componentes de presentacion
  hooks/          useCitas: estado de la agenda
  patterns/       agenda, eventBus (Observer), filtroStrategies (Strategy),
                  notificadorFactory (Factory Method)
  repositories/   citaRepository (Repository)
  data/           Catalogo de medicos y horarios
  test/           Pruebas unitarias con Vitest
```

## Flujo de trabajo

El repositorio sigue GitFlow. Ver [CONTRIBUTING.md](CONTRIBUTING.md) para la
convencion de ramas, de mensajes de commit y el proceso de pull request.

| Rama | Proposito |
|---|---|
| `main` | Version en produccion. Solo recibe merges de `release/*` y `hotfix/*` |
| `develop` | Integracion del trabajo terminado |
| `feature/*` | Una historia de usuario por rama, sale y regresa a `develop` |
| `release/*` | Estabilizacion antes de publicar |
| `hotfix/*` | Correccion urgente sobre `main` |
