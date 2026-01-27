import { GoogleGenerativeAI } from "@google/generative-ai";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generateCommit() {
  const diff = execSync("git diff --cached").toString();
  if (!diff) {
    console.log("❌ No hay cambios en stage.");
    return;
  }

  // 1. Cargar todas las reglas modulares para dar contexto al commit
  const rulesDir = "D:/Proyectos/scriptsAI/rules/";
  let combinedRules = "";
  
  if (fs.existsSync(rulesDir)) {
    combinedRules = fs.readdirSync(rulesDir)
      .filter(file => file.endsWith(".md"))
      .map(file => fs.readFileSync(path.join(rulesDir, file), "utf8"))
      .join("\n\n");
  }

  const prompt = `
    Actúa como un experto en Git y Senior Frontend Developer. 
    Genera un mensaje de commit corto, profesional y descriptivo basado en este diff:
    ${diff}
    
    Usa el contexto de mis reglas de arquitectura para identificar qué se cambió (ej: si es un Store de Zustand, un Schema de Zod, etc):
    ${combinedRules}
    
    INSTRUCCIONES:
    - Responde ÚNICAMENTE con el mensaje del commit.
    -Analiza mis cambios de git y genera una descripción de Pull Request siguiendo la Skill de Gentleman:
    - Título claro
    - Qué se hizo (Summary)
    - Cómo se probó
    - Breaking changes?
  `;

  try {
    const result = await model.generateContent(prompt);
    const message = result.response.text().trim();

    // Ejecuta el commit
    execSync(`git commit -m "${message}"`);

    console.log("\n✅ Commit realizado con éxito:");
    console.log("-----------------------------------------");
    console.log(`💬 "${message}"`);
    console.log("-----------------------------------------\n");

  } catch (error) {
    console.error("❌ Error al generar el commit:", error.message);
  }
}

generateCommit();