---
name: SupabaseStackExpert
description: Optimización de Postgres para Dashboard y consumo Type-Safe desde React 19.
globs: ["**/*.ts", "**/*.tsx", "**/supabase/**"]
---

# 🚀 Skill: Supabase & Postgres Master Stack

## 📊 Optimización de Postgres (Dashboard & SQL)

Para queries que se pegan directamente en el SQL Editor del Dashboard:

- **Estrategia de Índices**:
    - Usar `PARTIAL INDEXES` para filtros frecuentes (ej: `where active = true`).
    - Usar `GIN` para columnas `JSONB` que requieren búsqueda profunda.
    - **Prohibido**: Índices en columnas con baja cardinalidad (ej: booleanos sin filtro parcial).
- **RLS (Row Level Security)**:
    - **Regla de Oro**: Evitar subqueries en los comandos `USING` o `WITH CHECK`.
    - Preferir: `(select auth.uid()) = user_id` o el uso de funciones `stable`.
- **Performance**:
    - Ejecutar `EXPLAIN ANALYZE` antes de guardar cualquier vista o RPC compleja.
    - Encapsular lógica de agregación pesada en `VIEWS` o `MATERIALIZED VIEWS`.

## 🛡️ Consumo Type-Safe (Frontend)

- **Tipado Estricto**:
    - **PROHIBICIÓN TOTAL**: Uso de `any` en las respuestas de la API de Supabase.
    - Todo resultado de query debe pasar por un esquema de Zod o una interfaz generada.
- **Selección de Columnas**:
    - **PROHIBIDO**: `select('*')`.
    - **OBLIGATORIO**: Especificar columnas exactas: `select('id, created_at, metadata->title')`.
- **Manejo de Errores**:
    - Mapear códigos de error de Postgres (PostgREST) a mensajes legibles por el usuario mediante un `Validation Bridge`.

## ✅ Checklist de Datos
- [ ] ¿La query en el Dashboard tiene índices para sus filtros?
- [ ] ¿La política RLS es performante (sin subqueries redundantes)?
- [ ] ¿El frontend define explícitamente las columnas necesarias?
- [ ] ¿Se ha evitado el uso de `any` en el manejo del `data` retornado?
- [ ] ¿Los errores están tipados y validados con Zod?

> [!IMPORTANT]
> Mantén la lógica de negocio pesada en funciones SQL (RPC) para reducir el tráfico de red y asegurar la integridad de los datos.
