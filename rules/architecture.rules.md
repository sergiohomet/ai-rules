---
name: ArchitectureDirector
description: Reglas de estructura de carpetas, jerarquía estricta y separación de capas (Clean Architecture).
---

# 🏛 Reglas de Arquitectura y Estructura

- **Jerarquía Estricta**:
  - `src/components/ui`: Componentes atómicos (botones, inputs). No deben tener lógica de negocio.
  - `src/components/features`: Componentes con lógica (formularios, listas de datos).
  - `src/services`: Único lugar permitido para instancias de Axios y llamadas API.
  - `src/store`: Slices de Zustand.
  - `src/schemas`: Validaciones de Zod.
- **Separación de Capas**: Prohibido usar `axios` o `fetch` directamente en componentes de la UI.
- **Importaciones**: Usar siempre rutas relativas limpias y evitar "barrel files" (index.ts) si causan dependencias circulares.
  **Regla de Oro**: Prohibido el uso de useEffect para llamadas a la API. Usar siempre el patrón de servicios y, si es posible, integrar con use() de React 19 para el manejo de promesas.

## 🔒 Seguridad de Datos (Global)

- **Sanitization Bridge**: El `src/services/` es responsable de la última limpieza de datos antes de la salida.
- **Secure Storage**: Prohibido guardar el JWT en `localStorage`. Usar `sessionStorage` o, preferiblemente, manejarlo vía Cookies `HttpOnly` desde el backend.
- **Rate Limit Frontend**: Implementar un pequeño debounce o deshabilitar el botón de Login tras el primer click para evitar fuerza bruta simple.
