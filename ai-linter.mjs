import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" });

async function lintFile(filePath) {
  const rulesDir = "D:/Proyectos/scriptsAI/rules/";
  const rules = fs
    .readdirSync(rulesDir)
    .map((file) => fs.readFileSync(rulesDir + file, "utf8"))
    .join("\n\n");

  const prompt = `
    Actúa como un Arquitecto Senior Fullstack. Analiza el siguiente código y verifica si cumple con las reglas de arquitectura del proyecto.
    
    REGLAS:
    ${rules}
    
    CÓDIGO A EVALUAR (${filePath}):
    ${code}
    
    Si hay errores de arquitectura (ej: lógica en la UI, falta de tipos, mala ubicación), indícalos brevemente y da la solución. 
    Si todo está perfecto, responde únicamente: "✅ Código impecable".
  `;

  const result = await model.generateContent(prompt);
  console.log(`\n🔍 Reporte para: ${filePath}\n`);
  console.log(result.response.text());
}

const file = process.argv[2];
if (!file) console.log("Usa: npm run lint:ai <ruta-del-archivo>");
else lintFile(file);
