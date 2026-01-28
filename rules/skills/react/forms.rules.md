# 📝 Reglas de Formularios y Validación
- **Stack**: React Hook Form + Zod Resolver.
- **Validación**: Cada formulario debe tener su schema definido en `src/schemas/[name].schema.ts`.
- **Tipado**: Extraer tipos usando `z.infer<typeof schema>`.
- **UI de Errores**: Los mensajes de error deben aparecer debajo del input con la clase `text-red-500 text-xs`.