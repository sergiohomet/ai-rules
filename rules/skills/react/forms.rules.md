# 📝 Skill: React Hook Form + Zod
- **Configuración**: Usar siempre `zodResolver` y establecer `mode: "onBlur"` para mejorar la experiencia de usuario sin penalizar el rendimiento.
- **Schema Co-location**: Definir el schema y el tipo inferido en el mismo archivo del componente o en `src/schemas/`.
- **Accesibilidad**: Vincular errores de Zod con atributos `aria-invalid` y `aria-describedby` en los inputs.

✅ **Así SÍ:**
```tsx
const Schema = z.object({
  example1: z.string().email("Correo no válido"),
  example2: z.string().min(8, "Mínimo 8 caracteres")
});

type Form = z.infer<typeof loginSchema>;

const { register, handleSubmit, formState: { errors } } = useForm<Form>({
  resolver: zodResolver(Schema),
  mode: "onBlur"
});