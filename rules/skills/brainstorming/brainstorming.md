---
name: creative-brainstorming
description: Fase de pensamiento crítico y expansión de producto antes de la ejecución técnica.
metadata:
  author: Sergio Homet
  version: "1.0"
---

# Skill: Creative Brainstorming & Architecture Design

Esta skill actúa como un **Senior Product Manager** para expandir la visión del proyecto antes de generar el `todo.md`.

## Proceso de Pensamiento (Divergencia vs. Convergencia)

1. **Clarificación y Datos**: Identificar ambigüedades.
   - ¿Requiere persistencia?
   - ¿Utilizara Base de Datos?
   - ¿Qué tipo de Base de Datos es óptima (SQL, NoSQL, LocalStorage)?
2. **Divergencia (Exploración)**: Sugerir 3 funcionalidades "Pro" que añaden valor real (ej: exportación PDF, Dashboards, Offline Mode).
3. **Convergencia (Crítica Técnica)**: Evaluar el stack.
   - ¿Zustand es necesario o basta con Local State?
   - ¿Es necesario añadir alguna tecnología (TanStack Query, Framer Motion, etc.)?
   - ¿Falta alguna tecnología clave para el proyecto?
4. **Navaja de Ockham**: ¿Cuál es la versión más simple y elegante que resuelve el problema sin sobreingeniería?

---

## Matriz de Decisión de Élite

| Dimensión                 | Enfoque Sugerido                                                    |
| :------------------------ | :------------------------------------------------------------------ |
| **Arquitectura de Datos** | ¿Necesitamos normalizar o Zod es suficiente? ¿Relaciones 1-n o n-n? |
| **UX & Rendimiento**      | ¿Dónde aplicar Skeletons? ¿Qué acciones requieren `useOptimistic`?  |
| **Escalabilidad**         | ¿Cómo se comportará el sistema con x10 veces más datos?             |

---

## Ejemplo de Salida en v-plan

Antes de generar el TODO técnico, la IA DEBE incluir esta sección obligatoriamente:

> **💡 Notas de Brainstorming & Diseño:**
>
> - **Propuesta Pro**: Implementar un sistema de "Mascotas Frecuentes" con LocalStorage para acceso rápido.
> - **Decisión de DB**: Para una veterinaria, se sugiere SQL (PostgreSQL) por la integridad de las relaciones Dueño-Mascota-Visita.
> - **Optimización**: Usar un `debounced search` en el filtro de pacientes para evitar colapsar el Service.
> - **Riesgo**: El historial de visitas puede crecer mucho; se recomienda paginación desde el inicio.
