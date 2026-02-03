# 📝 Skill: React Hook Form + Zod
- **Configuración**: Usar siempre `zodResolver` y establecer `mode: "onBlur"` para mejorar la experiencia de usuario sin penalizar el rendimiento.
- **Schema Co-location**: Definir el schema y el tipo inferido en el mismo archivo del componente o en `src/schemas/`.
- **Accesibilidad**: Vincular errores de Zod con atributos `aria-invalid` y `aria-describedby` en los inputs.

✅ **Así SÍ:**
```tsx
const loginSchema = z.object({
  email: z.string().email("Correo no válido"),
  password: z.string().min(8, "Mínimo 8 caracteres")
});

type LoginForm = z.infer<typeof loginSchema>;

const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
  resolver: zodResolver(loginSchema),
  mode: "onBlur"
});