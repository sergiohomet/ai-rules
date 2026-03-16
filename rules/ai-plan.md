# 🚀 Workflow: Lead Architect Strategic Planner

**Descripción:** Auditoría de contexto, brainstorming crítico y hoja de ruta técnica comparativa.
**Disparador:** `/update-plan [idea]` o cuando se proponga una nueva funcionalidad.

---

## 🔍 FASE 1: Auditoría de Contexto & Código

Antes de proponer nada, el Agent debe realizar un "Code Audit":

1.  **Inventario de Lo Existente:** Identificar qué componentes, stores (Zustand) y esquemas (Zod) ya están implementados en `src/`.
2.  **Sincronización `todo.md`:** Leer el progreso actual para no duplicar tareas y enfocarse solo en el delta de la nueva idea.

## 🧠 FASE 2: Brainstorming Crítico (Skill Integration)

> **Ejecutar lógica de:** `./ai/skills/brainstorming/`

Aplica una capacidad crítica extrema sobre la idea `${idea}`:

1.  **Cuestionamiento:** ¿Por qué esta propuesta podría fallar o ser ineficiente?
2.  **Casos de Borde:** Escenarios que rompen la lógica (ej. pérdida de persistencia, inputs maliciosos, fallos en renders de React 19).
3.  **Mejoras de Producto:** Sugerir 3 mejoras de UX/Arquitectura no mencionadas por el usuario.

## ⚖️ FASE 3: Evaluación de Implementación (El Dilema del Stack)

Para cada funcionalidad compleja, el Agent **DEBE** presentar una comparativa antes de escribir código:

1.  **Stack Actual vs. Librería:** ¿Vale la pena hacerlo con el stack base (Zustand + React Hooks) o una librería externa facilitaría el mantenimiento?
2.  **Top 3 Librerías:** Proponer las 3 mejores opciones que se acoplen perfectamente a **React 19, Tailwind 4 y TypeScript**.
3.  **Tabla Comparativa:**
    - **Hacerlo desde cero:** (Seguridad, Mantenibilidad, Tiempo).
    - **Librería X:** (Pros/Contras y facilidad de integración).

## 📋 FASE 4: Refactor de TODO.MD

Generar la hoja de ruta definitiva incluyendo:

- **[DONE]:** Lo ya detectado en la auditoría.
- **[TODO]:** Pasos numerados (Schemas Zod -> Services Axios -> Store Zustand -> UI Mobile-First).
- **Security Check:** Puntos clave para evitar SQLi y fugas de estado.

---

## 🛠️ Reglas de Oro

- **Senior Tone:** Directo, sin rodeos, enfocado en performance.
- **No Code Policy:** Prohibido escribir lógica compleja de la funcionalidad hasta que el usuario elija una de las 3 opciones de la comparativa.
- **Mobile-First:** Cada componente propuesto debe estar optimizado para uso en territorio desde el smartphone.
