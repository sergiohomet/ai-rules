# ⚛️ Skill: React 19 & Vercel Best Practices
- **Acciones**: Reemplazar `useState(loading)` por `useActionState` para manejar estados de carga y errores de servidor de forma nativa.
- **Hook `use`**: Utilizar `use(promise)` para leer datos de servicios directamente en el renderizado, envolviendo el componente en `<Suspense>`.
- **Formularios**: Pasar la función del service directamente al atributo `action` del `<form>`.

✅ **Así SÍ (Uso de `use` y Actions):**
```tsx
// 1. Service devuelve la promesa
const recipesPromise = RecipeService.getAll();

function RecipeList() {
  // Suspend hasta que la data llegue
  const recipes = use(recipesPromise); 
  return <div>{recipes.map(r => <Card key={r.id} data={r} />)}</div>;
}

// 2. Formulario con useActionState
const [state, action, isPending] = useActionState(RecipeService.create, null);
<form action={action}>
  <button disabled={isPending}>Enviar</button>
</form>