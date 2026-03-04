---
name: GlobalPatterns
description: Biblioteca de patrones globales como Zustand 5 (Gentleman Programming) y Selectors.
---

# 📚 BIBLIOTECA DE SKILLS GLOBALES

## 🧠 ZUSTAND 5 (Pattern: Gentleman Programming)

- Usar siempre `devtools` y `persist` si es necesario.
- **Selector Pattern**: No extraer todo el store, extraer solo lo necesario.

✅ **EJEMPLO (Así SÍ):**

```typescript
export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }, false, "auth/setUser"),
  })),
);
// Selector para componentes:
export const useUser = () => useAuthStore((s) => s.user);
```
