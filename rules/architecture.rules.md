# 🏛 Reglas de Arquitectura y Estructura
- **Jerarquía Estricta**:
  - `src/components/ui`: Componentes atómicos (botones, inputs). No deben tener lógica de negocio.
  - `src/components/features`: Componentes con lógica (formularios, listas de datos).
  - `src/services`: Único lugar permitido para instancias de Axios y llamadas API.
  - `src/store`: Slices de Zustand.
  - `src/schemas`: Validaciones de Zod.
- **Separación de Capas**: Prohibido usar `axios` o `fetch` directamente en componentes de la UI.
- **Importaciones**: Usar siempre rutas relativas limpias y evitar "barrel files" (index.ts) si causan dependencias circulares.