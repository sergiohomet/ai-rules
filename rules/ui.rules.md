# 🎨 Reglas de UI y Estilo (Tailwind 4)
- **Framework**: React con Tailwind CSS 4.
- **Iconografía**: Usar exclusivamente `@tabler/icons-react` con importaciones explícitas.
- **Interactividad**: Todos los elementos clickeables deben incluir `transition-all` y el efecto `active:scale-95`.
- **Accesibilidad**: Es obligatorio el uso de HTML semántico y roles ARIA básicos.
- **Limpieza**: No duplicar clases de Tailwind; si un patrón se repite 3 veces, extraer a un componente en `ui/`.