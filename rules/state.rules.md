# 🧠 Reglas de Gestión de Estado (Zustand)
- **Estructura**: Crear stores pequeños y atómicos en `src/store/`.
- **Persistencia**: Usar el middleware `persist` solo para datos de sesión o configuraciones de usuario.
- **Slices**: Para entidades complejas, usar el patrón de "slices" y combinarlos en un store principal.
- **Naming**: Los archivos deben llamarse `use[Name]Store.ts`.