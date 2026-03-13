---
name: SeniorReactFusion
description: Usar al construir componentes de React 19 de alto rendimiento y tipado seguro con Tailwind 4 y Zod. Esencial para estados complejos o patrones de UI genéricos.
---

# Fusión Senior: React + TypeScript

Patrones de nivel experto para React 19, combinando inferencia avanzada de TypeScript con arquitectura de componentes de alto rendimiento.

## 🏗️ Núcleo Arquitectónico

- **Un Archivo, Un Componente**: Prohibido exportar múltiples componentes por archivo.
- **Aislamiento de Lógica**: Toda la lógica de dominio, manejadores de eventos y estados complejos deben vivir en hooks personalizados (`src/hooks/`).
- **Desacoplamiento de Datos**: Textos estáticos, URLs de imágenes y listas de prueba deben vivir en `src/data/mockData.ts`.
- **Tailwind 4 Puro**: Prohibición estricta de `cn`, `clsx` o `tailwind-merge`. Usar solo clases semánticas de TW4.

## 🧪 Patrones Avanzados de TypeScript

### 1. Props de Solo Lectura e Inferencia de Genéricos
Cada componente debe definir una interfaz `Readonly` para sus props. Usar genéricos para componentes que manejan datos dinámicos.

```typescript
interface ListProps<T> {
  readonly items: T[];
  readonly renderItem: (item: T) => React.ReactNode;
  readonly keyExtractor: (item: T) => string | number;
}

export function GenericList<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul className="grid gap-4 list-none">
      {items.map((item) => (
        <li key={keyExtractor(item)} className="p-4 bg-surface rounded-xl border border-white/5">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
```

### 2. Puente de Validación (Zod + React 19)
Prohibido procesar datos de API sin validación previa con Zod. Usar `useActionState` para formularios.

```typescript
const UserSchema = zod.object({
  id: zod.string().uuid(),
  email: zod.string().email(),
});

type User = zod.infer<typeof UserSchema>;

export function UserProfile({ data }: { readonly data: unknown }) {
  // Validación estricta en el punto de entrada
  const result = UserSchema.safeParse(data);
  if (!result.success) throw new Error("Datos de usuario inválidos");
  
  const user = result.data;
  // ... renderizado
}
```

## ⚡ Mejores Prácticas de React 19

- **Hook `use()`**: Usar para consumir Promesas y Contextos dentro de bucles o condiciones (donde esté permitido).
- **Actions**: Aprovechar `useActionState` y `useFormStatus` para estados pendientes y actualizaciones optimistas.
- **Listo para React Compiler**: Evitar `useMemo` y `useCallback` a menos que sea estrictamente necesario para cálculos costosos no optimizados por el compilador.

## 🎨 Excelencia Visual (Tailwind 4)

- **Tokens Semánticos**: Evitar códigos hexadecimales. Usar variables de tema.
- **Mobile-First Binario**: Si no es perfectamente responsivo a 375px, es un error.
- **Anti-Slop**: Nada de "Cards" o "Modals" genéricos. Crear diseños personalizados de alta fidelidad con micro-animaciones.
