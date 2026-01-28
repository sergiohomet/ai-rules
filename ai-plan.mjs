import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });

function loadAllRules(dir) {
    let content = "";
    if (!fs.existsSync(dir)) return content;
    const items = fs.readdirSync(dir);
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            content += loadAllRules(fullPath); // Recursión
        } else if (item.endsWith(".md")) {
            content += `\n\n--- SOURCE: ${item} ---\n` + fs.readFileSync(fullPath, "utf8");
        }
    });
    return content;
}

async function generatePlan(userIdea) {
    const rulesPath = "D:/Proyectos/scriptsAI/rules/";
    const rulesContent = loadAllRules(rulesPath);

    const prompt = `
    Actúa como un Lead Developer Senior. Convierte la siguiente idea en un plan técnico detallado (todo.md).
    
    IDEA: "${userIdea}"
    
    CONTEXTO DE REGLAS Y SKILLS:
    ${rulesContent}
    
    INSTRUCCIONES:
    - Diseña la arquitectura basándote en las skills de React 19, Zustand 5, Tailwind 4 y Axios.
    - El plan debe ser modular y seguir la jerarquía de carpetas del proyecto.
    - Responde solo con el markdown del todo.md.
    `;

    try {
        const result = await model.generateContent(prompt);
        fs.writeFileSync("todo.md", result.response.text().trim());
        console.log("✅ todo.md generado con éxito.");
    } catch (e) { console.error("❌ Error:", e.message); }
}

generatePlan(process.argv.slice(2).join(" "));