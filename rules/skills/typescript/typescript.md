### 2. `rules/skills/typescript/typescript-senior.md`
Este archivo asegura que la IA no use `any` y que aproveche la inferencia de Zod que definimos en las otras skills.

# 📘 Skill: TypeScript Senior Patterns
- **Inferencia**: Dejar que TS infiera tipos simples, pero definir explícitamente los retornos de los Services y Hooks.
- **Single Source of Truth**: Los tipos de datos de las entidades SIEMPRE deben venir de `z.infer<typeof Schema>`.
- **Modularidad**: Exportar tipos en `src/types/index.ts` o cerca del slice correspondiente.
- **Tipado Estricto**: Prohibido el uso de `any`.
- **Inferencia**: Dejar que TS infiera tipos simples, pero definir explícitamente los retornos de las funciones de los Services.
- **Utility Types**: Usar `ReturnType`, `Pick` y `Omit` para no repetir interfaces.

✅ **Así SÍ (Inferencia de Gentleman):**
```typescript
import { z } from 'zod';
import { BeverageSchema } from '../schemas';

// No creas una interface manual, ínfiérela
export type Beverage = z.infer<typeof BeverageSchema>;

// Tipado de funciones de acción
export const updateBeverage = (id: Beverage['id'], data: Partial<Beverage>) => { ... }