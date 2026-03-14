---
name: SecurityStandardsExpert
description: Estándares de seguridad para prevención de XSS, inyecciones y manejo seguro de sesiones/env.
globs: ["**/*.ts", "**/*.tsx"]
---

# 🛡️ Skill: Estándares de Seguridad Senior

## 🛑 Prevención de Inyecciones (SQL & Logic)

- **Filtros Dinámicos**:
    - **PROHIBIDO**: Construir filtros concatenando strings o usando templates literales directamente.
    - **OBLIGATORIO**: Usar exclusivamente los métodos del cliente de Supabase: `.eq()`, `.ilike()`, `.contains()`, etc.
- **Saneamiento de Inputs**:
    - Todo input proveniente del usuario debe ser validado por Zod antes de alcanzar la capa de servicios.

## 🌐 Seguridad en el Cliente (Frontend)

- **Prevención de XSS**:
    - Confiar en el auto-escaping nativo de React 19.
    - **PROHIBIDO**: Uso de `dangerouslySetInnerHTML` sin previa desinfección con `DOMPurify`.
- **Variables de Entorno (Vite)**:
    - Las variables con prefijo `VITE_` son públicas. Nunca expongas `SERVICE_ROLE` o llaves secretas en el cliente.
    - Validar la existencia de variables críticas al arrancar la aplicación (`env.ts`).

## 🔑 Sesiones y Persistencia

- **Almacenamiento**:
    - Usar `sessionStorage` para estados de sesión temporal.
    - Asegurar que el manejo de refresco de tokens sea gestionado automáticamente por el cliente de Supabase con persistencia en memoria/Storage seguro.
- **Persistencia**:
    - Re-validar la sesión activamente en el montaje del Root Layout (`useEffect` de alto nivel o `use()` con Suspense).

## ✅ Checklist de Seguridad
- [ ] ¿Los filtros dinámicos usan métodos nativos del SDK?
- [ ] ¿Se ha validado el esquema de Zod para bloquear caracteres de inyección?
- [ ] ¿Las variables de entorno están validadas y no exponen secretos?
- [ ] ¿Se usa `DOMPurify` para cualquier renderizado de HTML dinámico?
- [ ] ¿La sesión se persiste y recupera de forma segura al recargar?

> [!WARNING]
> Cualquier bypass de validación en la capa de servicios se considera deuda técnica crítica de seguridad.
