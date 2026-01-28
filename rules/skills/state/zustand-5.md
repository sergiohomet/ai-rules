# 🧠 Skill: Zustand 5 Performance
- **Selectors**: Siempre extraer datos con funciones selectoras para evitar re-renders masivos.
- **Shallow**: Usar `useShallow` de Zustand si se extraen más de 2 propiedades.
- **Middleware**: Todos los stores deben llevar `devtools`.
- **Destructuring**: Siempre que se use destructuring para extraer más de una propiedad, usar `useShallow`.
- **Slices**: Mantener un archivo por Slice y combinarlos en el store principal (`useAppStore.ts`).
- **Organización**: Un archivo por Slice (`src/store/recipeSlice.ts`) unificados en un `useAppStore.ts` central.
- **Consumo**: Utilizar **Destructuring** dentro de los componentes.
- **Performance**: Es OBLIGATORIO envolver el destructuring en `useShallow` para evitar re-renders cuando cambian otras partes del store.

✅ **Así SÍ**
```typescript
// En tu useAppStore.ts
export const useRecipes = () => useAppStore((s) => s.recipes);
export const useFavorites = () => useAppStore((s) => s.favorites);

// En el componente:
const recipes = useRecipes(); // Solo escucha cambios en recipes

✅ **Así SÍ **
// typescript
import { useShallow } from 'zustand/shallow';

const { recipes, fetchRecipes } = useAppStore(
  useShallow((state) => ({
    recipes: state.recipes,
    fetchRecipes: state.fetchRecipes
  }))
);

✅ **Así SÍ:**
// typescript
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createRecipeSlice } from './recipeSlice';

export const useAppStore = create<MyStoreType>()(
  devtools((...a) => ({
    ...createRecipeSlice(...a),
    // ... otros slices
  }))
);