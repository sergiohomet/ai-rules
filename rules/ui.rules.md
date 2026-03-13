---
name: VisualSystemExpert
description: Guía de estilos Tailwind 4 con enfoque Mobile-First, Responsive Layout y Control de Desbordamiento.
---

## 📱 Responsividad y Layout (Strict Mode)

- **Enfoque Mobile-First**: Diseñar siempre para pantallas pequeñas primero y añadir breakpoints (`md:`, `lg:`, `xl:`) solo para expandir, nunca para corregir.
- **Caja Contenedora (Safe Box)**:
  - Usar un contenedor principal con `max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8`.
  - Prohibido el uso de anchos fijos (`w-[1200px]`). Usar siempre porcentajes, `max-w` o `flex-1`.
- **Anti-Overflow**:
  - Todo layout principal debe llevar `overflow-x-hidden` para evitar el scroll horizontal accidental.
  - Usar `break-words` o `truncate` en textos largos para que no rompan la caja en mobile.
- **Espacios en Blanco**: Prohibido dejar huecos muertos. Usar `min-h-dvh` en el layout principal.

## 🎨 Diseño por Dispositivo

- **Mobile/Tablet**: Usar `grid-cols-1` o `grid-cols-2`. Touch targets mínimos de `44x44px`.
- **Notebook/PC**: Transicionar a `grid-cols-12` para layouts complejos.
- **Gaps Inteligentes**: Usar `gap-4 md:gap-6 lg:gap-8`.

## 🛠 Interactividad y Componentes

- **Framework**: React 19 con Tailwind CSS 4.
- **Iconografía**: Usar exclusivamente `@tabler/icons-react`.
- **Feedback**: Elementos clickeables deben incluir `transition-all active:scale-95 duration-200`.
- **Limpieza**: Si un patrón se repite 3 veces, extraer a un componente en `src/components/ui`.

## 💎 UI/UX Pro Max Integration

- **Referencia Obligatoria**: Consultar `./ai/rules/ui-ux-pro-max.md` para decisiones de arquitectura de producto.
- **Jerarquía de Texto**: Usar tokens semánticos alineados con `text-slate-X`.
- **No-Defaults**: Rechazar soluciones que parezcan plantillas genéricas. Aplicar elevación mediante sombras suaves multi-capa y micro-interacciones.
