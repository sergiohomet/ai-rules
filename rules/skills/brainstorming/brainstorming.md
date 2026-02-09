# 🧠 Skill: Creative Brainstorming & Architecture Design
Esta skill se activa durante la fase de planificación (`v-plan`) para expandir la visión del proyecto antes de definir el `todo.md`.

## 🚀 Proceso de Pensamiento
1. **Clarificación**: Identificar ambigüedades en la idea inicial.
2. **Expansión**: Sugerir 3 funcionalidades "pro" que el usuario no mencionó pero que añaden valor (ej: filtros avanzados, exportación PDF, persistencia local).
3. **Crítica Técnica**: Evaluar si el stack elegido (Zustand vs Local State) es el óptimo para este tamaño de problema.

## 🛠️ Matriz de Decisión
| Dimensión | Enfoque Sugerido |
| :--- | :--- |
| **Complejidad de Datos** | ¿Necesitamos un Normalizador? ¿Zod es suficiente? |
| **Experiencia de Usuario** | ¿Dónde irían los Skeletons? ¿Qué acciones necesitan useOptimistic? |
| **Escalabilidad** | ¿Este modelo de datos soportará relaciones 1-n en el futuro? |

## ✅ Ejemplo de Salida en v-plan
Antes de generar el TODO, la IA debe incluir una sección:
> **💡 Notas de Brainstorming:**
> - Sugerencia: Añadir un debounced search para no saturar la API.
> - Riesgo: El filtrado por categorías podría ser lento si el array supera los 1000 items; se recomienda memoización en el Service.