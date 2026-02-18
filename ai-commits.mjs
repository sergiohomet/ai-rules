import { GoogleGenerativeAI } from "@google/generative-ai";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

function loadAllRules(dir) {
    let content = "";
    if (!fs.existsSync(dir)) return content;
    const items = fs.readdirSync(dir);
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            content += loadAllRules(fullPath);
        } else if (item.endsWith(".md") && item.includes("github")) {
            content += `\n--- REGLA COMMIT: ${item} ---\n` + fs.readFileSync(fullPath, "utf8");
        }
    });
    return content;
}

async function generateCommit() {
    try {
        const diff = execSync("git diff --cached").toString();
        if (!diff) return console.log("⚠️ No hay cambios en el stage (usa git add).");

        const rules = loadAllRules("D:/Proyectos/scriptsAI/rules/");
        
        const prompt = `
        Actúa como un Senior Developer. Genera un mensaje de commit corto siguiendo estas reglas:
        ${rules}
        
        CAMBIOS REALIZADOS:
        ${diff}

        FORMATO REQUERIDO: <type>(<scope>): <desc>
        No des explicaciones, solo devuelve el mensaje de commit.
        `;

        const result = await model.generateContent(prompt);
        const msg = result.response.text().trim().replace(/`/g, "");
        
        console.log(`\n📝 Sugerencia: ${msg}`);
        execSync(`git commit -m "${msg}"`);
        console.log("✅ Commit realizado con éxito.");
    } catch (e) { console.error("❌ Error:", e.message); }
}

generateCommit();