---
name: MemoryKeeper
description: Registro persistente de lecciones aprendidas, correcciones del usuario y prevención de regresiones.
---

# Project Memory: Lessons Learned

## Errores Críticos Evitados (Anti-Pattern Registry)

_Registro de fallos detectados y su solución definitiva para no repetirlos._

- **Error 01**: Generar código complejo sin consulta previa.
  - **Corrección**: Aplicar siempre la "Fase 0: Consultoría" con tabla comparativa.
- **Error 02**: Olvidar la validación de datos de entrada/salida.
  - **Corrección**: Uso obligatorio de **Zod** en el especialista de conectividad.
- [x] **Error 03**: Desincronización entre stores (uso de múltiples stores para la misma entidad).
  - **Corrección**: Centralizar la "Fuente de Verdad" en un único store temático o consolidado.

---

## Preferencias de Implementación (Estilo Diana/Sergio)

_Lecciones sobre decisiones técnicas y gustos específicos del usuario._

- **Tech Stack**: Priorizar Axios para servicios y Zustand para estado global.
- **UI Style**: Enfoque "Anti-Default". Si parece una plantilla genérica, debe refactorizarse.
- **Workflow**: El agente debe presentarse y declarar sus skills antes de actuar.

---

## Reglas de Oro Sintetizadas

_Instrucciones de alto nivel derivadas del aprendizaje del proyecto._

1. **"No Decisions in Isolation"**: Toda decisión de arquitectura debe ser validada por el usuario tras presentar opciones.
2. **"Mobile-First is Binary"**: No existe el "casi responsive"; si falla en 375px, el código es inválido.
3. **"Clean & Atomic"**: Un archivo, un componente. La lógica nunca vive dentro del JSX.
4. **"Modern React 19"**: Priorizar el uso de `use()` para promesas y evitar `useEffect` para cargas de datos.
5. **"Server-Side Stats"**: Nunca calcular métricas en el frontend sobre datos paginados; usar agregación en base de datos.

---

## Bitácora de Aprendizaje Reciente

_Espacio dinámico para que el [Memory Keeper] anote observaciones del chat actual._

- [2026-03-20]: Refactorización integral de Métricas. Se eliminó la dependencia de `useEffect` en favor de `use()`. Se implementó agregación en Supabase para evitar datos truncados por paginación. Se estableció un estándar de "Código Autodocumentado" eliminando comentarios redundantes.
