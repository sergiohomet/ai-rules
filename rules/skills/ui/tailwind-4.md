# 🎨 Skill: Tailwind CSS 4 Mastery
- **Sintaxis**: Usar variables CSS nativas para colores si es necesario.
- **Interactividad**: Aplicar `transition-all` y `active:scale-95` a todo elemento clickeable.
- **Organización**: No usar clases arbitrarias `[]` si existen escalas de Tailwind.
- **Dark Mode**: Usar la variante `dark:` para estilos específicos del modo oscuro.
- **Consistencia**: Evitar el uso de `!important` a toda costa.

✅ **Así SÍ (Dark Mode):**
```tsx
<div className="bg-white text-black dark:bg-gray-900 dark:text-white">
  Contenido
</div>

✅ **Ejemplo (Botón DrinkApi):**
```tsx
<button className="bg-orange-400 hover:bg-orange-500 active:scale-95 transition-all p-3 rounded-lg text-white">
  Ver Receta
</button>