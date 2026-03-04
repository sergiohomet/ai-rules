---
name: AuthSecurityExpert
description: Blindaje de autenticación, prevención de inyecciones y saneamiento de inputs con Zod.
---

# 🔐 Skill: Seguridad en Autenticación

## 🛡️ Prevención de Inyecciones y Ataques

- **No trust policy**: Todo input del usuario debe ser saneado antes de enviarse al servicio de Axios.
- **SQL Injection Prevention (Frontend Level)**:
  - Prohibido concatenar strings para construir queries o payloads.
  - Bloquear caracteres sospechosos como `;`, `--`, `/*`, `*/`, `xp_` mediante Regex en el esquema de Zod.
- **XSS Prevention**: Validar que los inputs no contengan etiquetas `<script>` o atributos `onmouseover/onclick`.

## 📝 Validación Estricta (Zod + Regex)

Usar el siguiente patrón para el esquema de Login:

✅ **Así SÍ:**

```tsx
const loginSchema = z.object({
  // Validación de Email con Regex anti-inyección
  email: z
    .string()
    .email("Correo no válido")
    .min(5)
    .max(255)
    .regex(/^[^;'"--]*$/, "Caracteres no permitidos"),

  // Validación de Password: Min 8, Letra, Número y Saneamiento
  password: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .max(100)
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      "Debe contener letras y números",
    )
    .transform((val) => val.trim()), // Saneamiento básico
});
```
