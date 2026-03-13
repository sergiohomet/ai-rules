---
name: SkillEngineering
description: Usar al crear nuevas skills de IA o actualizar las existentes. Sigue el ciclo RED-GREEN-REFACTOR para la documentación de procesos.
---

# Ingeniería y Desarrollo de Skills

Un enfoque basado en TDD para crear skills de IA de alto rendimiento y activación confiable.

## 🛠️ El Ciclo de Creación de Skills (TDD)

1. **RED (Línea base)**: Observar a un agente fallar o actuar de forma subóptima sin la skill.
2. **GREEN (Implementación)**: Escribir el `SKILL.md` mínimo que resuelva el fallo detectado.
3. **REFACTOR (Brechas)**: Cerrar casos de borde, optimizar la eficiencia de tokens y añadir descripciones "proactivas".

## 📋 Anatomía de un SKILL.md

- **Name**: Seguro para URLs, solo guiones.
- **Description**: En tercera persona. Empezar con "Usar cuando...". Enfocarse en las **condiciones de activación** (síntomas/contextos), NO en lo que hace la skill.
- **Cuerpo**:
  - **Resumen (Overview)**: Principio central en 1-2 frases.
  - **Patrón Principal**: Ejemplos claros de antes/después.
  - **Errores Comunes**: "Antipatrones" y sus soluciones.

## 🚀 Optimización (CSO)

- **Activación Proactiva**: Claude tiende a "infra-activar". Dile explícitamente a Claude que use la skill aunque el usuario no la pida por su nombre.
- **Eficiencia de Tokens**: Mantener `SKILL.md` bajo 500 líneas. Usar referencias anidadas para documentación pesada.
- **Sin Narrativas**: Las skills son para patrones reutilizables, no historias sobre cómo se resolvió un problema una vez.
