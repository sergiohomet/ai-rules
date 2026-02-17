import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// 1. Configuración de la API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });

/**
 * Función recursiva para cargar todas las reglas y skills (.md)
 * No importa qué tan profunda sea la carpeta, la encontrará.
 */
function loadAllRules(dir) {
    let content = "";
    if (!fs.existsSync(dir)) return content;

    const items = fs.readdirSync(dir);
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            content += loadAllRules(fullPath); // Recursión para subcarpetas
        } else if (item.endsWith(".md")) {
            content += `\n\n--- SOURCE: ${item} ---\n`;
            content += fs.readFileSync(fullPath, "utf8") + "\n";
        }
    });
    return content;
}

/**
 * Función principal para generar el plan de acción
 */
async function generatePlan(idea) {
    if (!idea) {
        console.log("❌ Error: Por favor describe la idea del proyecto.");
        console.log("Uso: node v-plan.mjs 'mi idea de app'");
        process.exit(1);
    }

    console.log("🧠 Cargando cerebro de reglas y skills...");
    const rulesPath = "D:/Proyectos/scriptsAI/rules/"; // Tu ruta absoluta
    const rulesContext = loadAllRules(rulesPath);

    console.log("🚀 Iniciando Brainstorming y Planificación técnica...");

    const prompt = `
    Eres un Lead Architect y Product Designer experto en React 19, TypeScript y Clean Architecture.
    
    Tu misión es doble:
    1. **Brainstorming**: Analiza la idea "${idea}" usando tu capacidad crítica. Cuestiona la propuesta, busca casos de borde y sugiere 3 mejoras de UX o arquitectura que el usuario no haya mencionado.
    2. **Planificación Técnica**: Genera un archivo 'todo.md' que sirva como hoja de ruta definitiva.

    CONTEXTO DE REGLAS Y SKILLS (Síguelas estrictamente):
    ${rulesContext}

    ESTRUCTURA DE RESPUESTA REQUERIDA:
    ---
    # 💡 Notas de Brainstorming & Diseño
    (Tus sugerencias críticas aquí)

    # 📋 TODO.MD
    (Pasos técnicos numerados: Arquitectura, Schemas, Services, Store, Components, UI)
    ---

    REQUERIMIENTOS TÉCNICOS:
    - Uso de React 19 (use(), useActionState).
    - Inferencia de tipos desde Zod (Single Source of Truth).
    - Tailwind 4 para estilos.
    - Zustand 5 con Slices y useShallow para el estado.
    - Axios como Validation Bridge.
    `;

    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();

        // Guardamos el resultado en el archivo todo.md del proyecto actual
        fs.writeFileSync("todo.md", responseText);

        console.log("\n✅ Plan generado con éxito en 'todo.md'.");
        console.log("Revisa las notas de diseño antes de empezar a programar.");
    } catch (error) {
        console.error("❌ Error al generar el plan:", error.message);
    }
}

// Ejecución inicial
const userIdea = process.argv.slice(2).join(" ");
generatePlan(userIdea);