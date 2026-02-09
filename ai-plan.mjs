import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
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
            content += `\n\n--- CONTEXTO SKILL: ${item} ---\n` + fs.readFileSync(fullPath, "utf8");
        }
    });
    return content;
}

async function createPlan(idea) {
    if (!idea) return console.log("❌ Describe tu idea: v-plan 'una app de...'");

    console.log("Analizando reglas y diseñando arquitectura...");
    const rules = loadAllRules("D:/Proyectos/scriptsAI/rules/");

    const prompt = `
    Eres un Lead Architect experto en React 19, TypeScript y Clean Architecture.
    Basándote en estas reglas de élite:
    ${rules}

    Genera un archivo 'todo.md' para la siguiente idea: "${idea}"
    
    ESTRUCTURA DEL TODO.MD:
    1. Arquitectura de Carpetas (jerarquía).
    2. Definición de Entidades y Schemas (Zod).
    3. Services (Axios Validation Bridge).
    4. State Management (Zustand Slices).
    5. UI & Components (Tailwind 4 + React 19 patterns).
    
    El plan debe ser modular y listo para que un Junior lo siga paso a paso.
    `;

    try {
        const result = await model.generateContent(prompt);
        fs.writeFileSync("todo.md", result.response.text().trim());
        console.log("✅ todo.md generado. ¡A programar!");
    } catch (e) { console.error("❌ Error:", e.message); }
}

createPlan(process.argv.slice(2).join(" "));