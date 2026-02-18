import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// LA FUNCIÓN DE RUTA VA AQUÍ (Igual que en v-plan y v-crud)
function loadAllRules(dir) {
    let content = "";
    if (!fs.existsSync(dir)) return content;

    const items = fs.readdirSync(dir);
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            content += loadAllRules(fullPath); // Entra en subcarpetas de skills
        } else if (item.endsWith(".md")) {
            content += `\n\n--- REGLA DE REFERENCIA: ${item} ---\n`;
            content += fs.readFileSync(fullPath, "utf8");
        }
    });
    return content;
}

async function lintFile(filePath) {
    if (!filePath || !fs.existsSync(filePath)) {
        console.error("❌ Indica un archivo válido para revisar.");
        return;
    }

    // 1. Cargamos el cerebro (todas las skills)
    const rulesContent = loadAllRules("D:/Proyectos/scriptsAI/rules/");
    
    // 2. Leemos el archivo que queremos auditar
    const codeToReview = fs.readFileSync(filePath, "utf8");

    const prompt = `
    Actúa como un Arquitecto de Software Senior y revisor de código.
    Tu misión es auditar el siguiente archivo basándote ESTRICTAMENTE en las reglas y skills proporcionadas.

    REGLAS Y SKILLS DE ÉLITE:
    ${rulesContent}

    CÓDIGO A REVISAR (${filePath}):
    ${codeToReview}

    INSTRUCCIONES DE AUDITORÍA:
    1. Identifica violaciones a las reglas (ej: usar useEffect en lugar de useActionState, no usar useShallow en Zustand, etc.).
    2. Si hay errores, muestra el código corregido siguiendo los patrones de Gentleman Programming.
    3. Si el archivo está perfecto, felicita al desarrollador.
    
    Responde de forma concisa y técnica.
    `;

    try {
        console.log(`Auditando ${filePath}...`);
        const result = await model.generateContent(prompt);
        console.log("\n--- RESULTADO DE LA AUDITORÍA ---");
        console.log(result.response.text());
    } catch (error) {
        console.error("❌ Error en el linter:", error.message);
    }
}

lintFile(process.argv[2]);