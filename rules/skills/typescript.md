# 📘 Skill: TypeScript Senior Patterns
- **Tipado Estricto**: Prohibido el uso de `any`.
- **Inferencia**: Dejar que TS infiera tipos simples, pero definir explícitamente los retornos de las funciones de los Services.
- **Utility Types**: Usar `ReturnType`, `Pick` y `Omit` para no repetir interfaces.

✅ **Así SÍ:**
export const getDrink = async (id: Recipe['idDrink']): Promise<RecipeDetail> => { ... }