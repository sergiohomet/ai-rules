import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// Usamos Flash para que sea rápido y económico
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function loadAllRules(dir) {
    let content = "";
    if (!fs.existsSync(dir)) return content;
    const items = fs.readdirSync(dir);
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            content += loadAllRules(fullPath);
        } else if (item.endsWith(".md")) {
            content += fs.readFileSync(fullPath, "utf8") + "\n\n";
        }
    });
    return content;
}

async function generateCRUD(entityName) {
    if (!entityName) return console.log("❌ Indica el nombre de la entidad.");

    const rulesContent = loadAllRules("D:/Proyectos/scriptsAI/rules/");
    let todoContext = fs.existsSync("todo.md") ? fs.readFileSync("todo.md", "utf8") : "";

    const prompt = `
    Eres un clon de programación de Gentleman Programming y Vercel Labs.
    Genera un CRUD modular para: "${entityName}".
    
    PLAN DE TRABAJO (todo.md):
    ${todoContext}
    
    BIBLIOTECA DE REGLAS Y SKILLS:
    ${rulesContent}
    
    REQUERIMIENTOS TÉCNICOS:
    - ZOD: Inferencia de tipos y validación en services.
    - ZUSTAND 5: Slices con Selectors exportados.
    - REACT 19: Usar useActionState para el formulario.
    - TAILWIND 4: Estilos modernos y feedback activo.

    REGLAS DE GENERACIÓN DE SLICES:
    1. Crea la entidad en un archivo de Slice independiente: src/store/${entityName}Slice.ts.
    2. Importa y combina este Slice en src/store/useAppStore.ts usando el patrón:
     export const useAppStore = create<MyState>()((...a) => ({
        ...createEntitySlice(...a),
     }));
    3. Genera el código del módulo separando la lógica en un Slice independiente. En los ejemplos de uso en componentes, utiliza siempre useShallow para el destructuring de propiedades del store

    RESPONDE CON ESTE FORMATO:
    ---FILE:ruta/del/archivo---
    [Código]
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response.text();
        const files = response.split("---FILE:");

        files.forEach(block => {
            if (!block.trim()) return;
            const [filePath, ...contentParts] = block.split("---");
            const cleanPath = filePath.trim();
            const code = contentParts.join("---").trim().replace(/```typescript|```tsx|```/g, "");

            fs.mkdirSync(path.dirname(cleanPath), { recursive: true });
            fs.writeFileSync(cleanPath, code);
            console.log(`✅ Generado: ${cleanPath}`);
        });
    } catch (error) {
        console.error("❌ Error en v-crud:", error.message);
    }
}

generateCRUD(process.argv[2]);