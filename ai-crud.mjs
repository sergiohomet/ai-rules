import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import readline from "readline";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

function loadAllRules(dir) {
    let content = "";
    if (!fs.existsSync(dir)) return content;
    const items = fs.readdirSync(dir);
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            content += loadAllRules(fullPath);
        } else if (item.endsWith(".md")) {
            content += `\n\n--- SKILL SOURCE: ${item} ---\n` + fs.readFileSync(fullPath, "utf8");
        }
    });
    return content;
}

async function start() {
    const entity = process.argv[2];
    if (!entity) return console.log("❌ Indica la entidad.");

    const useApi = (await ask("¿Usar API externa? (s/n): ")).toLowerCase() === 's';
    const useZustand = (await ask("¿Usar Zustand global? (s/n): ")).toLowerCase() === 's';
    rl.close();

    const rulesContent = loadAllRules("D:/Proyectos/scriptsAI/rules/");
    const todoContext = fs.existsSync("todo.md") ? fs.readFileSync("todo.md", "utf8") : "";

    const prompt = `
    Genera el código para: "${entity}".
    - API: ${useApi ? 'SÍ' : 'NO (Mocks)'}
    - Zustand: ${useZustand ? 'SÍ' : 'NO (State nativo)'}
    
    PLAN: ${todoContext}
    REGLAS: ${rulesContent}

    FORMATO: ---FILE:ruta/del/archivo--- [Código]
    `;

    try {
        const result = await model.generateContent(prompt);
        const files = result.response.text().split("---FILE:");
        files.forEach(block => {
            if (!block.trim() || !block.includes("---")) return;
            const [filePath, ...content] = block.split("---");
            const cleanPath = filePath.trim();
            const code = content.join("---").trim().replace(/```typescript|```tsx|```/g, "");
            fs.mkdirSync(path.dirname(cleanPath), { recursive: true });
            fs.writeFileSync(cleanPath, code);
            console.log(`✅ Generado: ${cleanPath}`);
        });
    } catch (e) { console.error("❌ Error:", e.message); }
}

start();