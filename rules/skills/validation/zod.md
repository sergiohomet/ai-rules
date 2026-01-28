# 💎 Skill: Zod & Type Inversion
- **Validation Bridge**: Todo Service debe validar la respuesta con `.parse()` antes de entregarla al Store.
- **Single Source of Truth**: Los Types se derivan de los Schemas.

✅ **Ejemplo **
```typescript

✅ **Así SÍ**
import { RecipesSchema } from '../schemas/recipes-schemas';

export async function fetchRecipes(search: SearchRecipe) {
  const { data } = await api.get('/filter.php', { params: search });
  // Gentleman Skill: El service es el guardián de los datos
  return RecipesSchema.parse(data); 
}