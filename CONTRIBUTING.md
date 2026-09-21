# Guia de contribucion

## Ramas

```
main                 produccion, protegida
develop              integracion
feature/<clave>-<descripcion>
release/<version>
hotfix/<version>
```

`<clave>` es el identificador de la historia de usuario (`HU-04`). Ejemplos:

```
feature/HU-04-cancelar-cita
release/1.0.0
hotfix/1.0.1-validacion-telefono
```

## Mensajes de commit

Se usa Conventional Commits:

```
<tipo>(<alcance>): <resumen en minusculas, modo imperativo, sin punto final>
```

Tipos admitidos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`.

```
feat(agenda): detectar empalmes de horario por medico
fix(form): aceptar telefonos con espacios
test(filtros): cubrir el filtro de citas canceladas
```

El resumen no pasa de 72 caracteres. Si hace falta explicar el porque, va en el
cuerpo separado por una linea en blanco.

## Pull request

1. La rama sale siempre de `develop` actualizada.
2. Antes de abrir el PR: `npm run build` y `npm test` en verde.
3. El PR apunta a `develop`, usa la plantilla y referencia la historia de usuario.
4. Requiere una aprobacion y que la verificacion de integracion continua pase.
5. Se integra con merge commit para conservar la traza de la rama.

## Versionado

Versionado semantico `MAYOR.MENOR.PARCHE`. Cada publicacion se marca con una
etiqueta anotada (`git tag -a v1.0.0 -m "..."`) y se registra en `CHANGELOG.md`.
