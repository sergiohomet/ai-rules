---
name: SubagentWorkflow
description: Usar al gestionar tareas complejas que requieren delegación a sub-agentes especializados. Garantiza el cumplimiento de especificaciones y la calidad del código mediante un proceso de revisión en dos etapas.
---

# Desarrollo Guiado por Sub-agentes (SDD)

Ejecuta planes complejos mediante el despliegue de sub-agentes especializados con contexto aislado y puertas de revisión estrictas.

## 🛰️ Protocolo Central

1. **Aislamiento**: Nunca heredar el historial completo de la sesión principal. Construir un contexto preciso y mínimo para el sub-agente.
2. **Especialización**: Definir el rol del sub-agente (ej. [Visual Expert], [Connectivity Spec]) basado en el requerimiento de la tarea.
3. **Revisión en Dos Etapas**:
   - **Puerta 1 (Revisión de Specs)**: Verificar que la implementación coincida exactamente con el requerimiento técnico.
   - **Puerta 2 (Revisión de Calidad)**: Verificar que el código siga las reglas de limpieza, rendimiento y estilo.

## 🔄 El Proceso

- **Despliegue**: Usar `run_command` o herramientas específicas de creación de agentes.
- **Consulta**: Los sub-agentes deben hacer preguntas aclaratorias antes de la implementación.
- **Corrección**: Si una puerta de revisión falla, el sub-agente implementador debe corregir las brechas hasta que ambas puertas estén en verde.
- **Persistencia**: Asegurar que todos los cambios del sub-agente se confirmen (commit) y documenten en el proyecto principal.

## ⚠️ Banderas Rojas (Alertas)

- El sub-agente intenta trabajar sin instrucciones específicas.
- El sub-agente hereda demasiado contexto irrelevante (contaminación de contexto).
- Saltarse la puerta de revisión de calidad para cambios "simples".
