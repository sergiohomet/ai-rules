import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
// Usamos Pro para la planificación arquitectónica
const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });

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

async function generatePlan(userIdea) {
    const rulesContent = loadAllRules("D:/Proyectos/scriptsAI/rules/");

    const prompt = `
    Actúa como un Lead Developer Senior. Convierte la siguiente idea en un plan técnico detallado (todo.md).
    
    IDEA DEL USUARIO:
    "${userIdea}"
    
    REGLAS Y SKILLS DE ÉLITE (Síguelas estrictamente):
    ${rulesContent}
    
    INSTRUCCIONES PARA EL TODO.MD:
    1. Divide en: Schemas (Zod), Stores (Zustand + Selectors), Services (Axios + Validation) y UI (React 19 Actions).
    2. Usa casillas de verificación [ ].
    3. Define las rutas de archivos exactas según la arquitectura.
    4. Responde SOLO con el contenido del markdown.
    5. Asegúrate de planificar un archivo independiente por cada Slice en src/store/ y un archivo useAppStore.ts que los unifique mediante el patrón de composición { ...createSlice(...a) }. No planifiques selectores externos"
    `;

    try {
        const result = await model.generateContent(prompt);
        const plan = result.response.text().trim();
        fs.writeFileSync("todo.md", plan);
        console.log("\n✅ Plan maestro generado en todo.md");
    } catch (error) {
        console.error("❌ Error en v-plan:", error.message);
    }
}

generatePlan(process.argv.slice(2).join(" "));