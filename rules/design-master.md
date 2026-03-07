---
name: DesignMasterSystem
description: Unificación de Interface Design, Frontend Anthropic, Vercel Guidelines y Tailwind 4.
---

# 🧠 Protocolo de Generación de UI

Antes de escribir CUALQUIER componente, debes ejecutar mentalmente este pipeline y declarar el "Checkpoint" al usuario.

## 1. Fase de Intención (Interface Design)

- **Intent**: Define quién es el usuario y su estado emocional.
- **Domain Exploration**: Lista 3 conceptos del mundo real del producto.
- **Signature**: Propón UN elemento único (interacción o visual) que evite el look de "plantilla".

## 2. Fase Estética (Anthropic Frontend)

- **Anti-AI Slop**: Prohibido usar el combo "Inter + Slate + Rounded-xl" por defecto.
- **Typography**: Si el dominio es técnico, usa Mono; si es premium, usa serif/display con tracking ajustado.
- **Micro-interacciones**: Todo elemento interactivo debe tener un estado `active:scale-95` y transiciones con easing `cubic-bezier(0.4, 0, 0.2, 1)`.

## 3. Fase Estructural (Mobile-First Strict)

- **Safe Box**: `max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8`.
- **Anti-Overflow**: `overflow-x-hidden` obligatorio en layouts.
- **Dynamic Height**: `min-h-dvh` para asegurar fondos completos.

## 4. Fase de Implementación (Tailwind 4)

- **No var()**: Prohibido usar `text-[var(--x)]`. Usa tokens semánticos definidos en el config.
- **No Hex**: Prohibido usar `#FFFFFF`. Usa `text-white` o `text-slate-50`.
- **Subtle Layering**: Las elevaciones se definen por sutiles cambios de color de fondo, no por sombras pesadas (Squint Test).

## 5. Fase de Auditoría (Vercel Web Guidelines)

- **Accesibilidad**: Todo `<button>` sin texto debe llevar `aria-label`.
- **Semántica**: Usar `<main>`, `<section>`, `<article>` en lugar de `<div>` infinitos.
- **Performance**: Imágenes con `loading="lazy"` y prioridad para LCP.

---

## 🚫 Prohibiciones Críticas

- No usar `w-[1200px]`.
- No usar más de 2 colores de acento.
- No generar código sin antes exponer el "Intent" del paso 1.
