---
name: SeniorReactFusion
description: Use when building high-performance, type-safe React 19 components with Tailwind 4 and Zod. Essential for complex state or generic UI patterns.
---

# Senior React + TypeScript Fusion

Expert-level patterns for React 19, combining advanced TypeScript inference with high-performance component architecture.

## 🏗️ Architectural Core

- **One File, One Component**: No multi-component exports.
- **Logic Isolation**: All domain logic, event handlers, and complex state must live in custom hooks (`src/hooks/`).
- **Data Decoupling**: Static text, image URLs, and mock lists must live in `src/data/mockData.ts`.
- **Pure Tailwind 4**: Strict prohibition of `cn`, `clsx`, or `tailwind-merge`. Use semantic TW4 classes only.

## 🧪 TypeScript Advanced Patterns

### 1. Readonly Props & Inferred Generics
Every component must define a `Readonly` interface for its props. Use generics for components that handle dynamic data.

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

### 2. Validation Bridge (Zod + React 19)
Prohibit processing API data without Zod validation. Use `useActionState` for form handling.

```typescript
const UserSchema = zod.object({
  id: zod.string().uuid(),
  email: zod.string().email(),
});

type User = zod.infer<typeof UserSchema>;

export function UserProfile({ data }: { readonly data: unknown }) {
  // Strict Validation at the entry point
  const result = UserSchema.safeParse(data);
  if (!result.success) throw new Error("Invalid User Data");
  
  const user = result.data;
  // ... render
}
```

## ⚡ React 19 Best Practices

- **The `use()` Hook**: Use for consuming Promises and Contexts inside loops or conditions (where permitted).
- **Actions**: Leverage `useActionState` and `useFormStatus` for pending states and optimistic updates.
- **React Compiler ready**: Avoid `useMemo` and `useCallback` unless specifically required for expensive computations not yet optimized by the compiler.

## 🎨 Visual Excellence (Tailwind 4)

- **Semantic Tokens**: Avoid hex codes. Use theme variables.
- **Mobile-First Binary**: If it's not perfectly responsive at 375px, it's a bug.
- **Anti-Slop**: No generic "Card" or "Modal". Use custom, high-fidelity designs with micro-animations.
