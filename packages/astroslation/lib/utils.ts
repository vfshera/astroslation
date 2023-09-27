import fs from "fs";
import { fileURLToPath } from "node:url";
import path from "path";

export function getPath(fileUrl: string | URL) {
  const __filename = fileURLToPath(fileUrl);
  const __dirname = path.dirname(__filename);

  return { __dirname, __filename };
}

export function createFile(fileName: string, content: string) {
  console.log(fileName);

  fs.writeFile(fileName, content, (err) => {
    if (err) throw err;
  });
}

export function getLanguage(languages: Record<string, string>) {
  const keys = Object.keys(languages);

  let langs = "";

  for (const key of keys) {
    langs += `\t${key}: "${languages[key]}",\n`;
  }

  return `
export const languages: Record<Language, string> = {
${langs}
};`;
}

export const getTranslationFunctions = (
  languageCodes: string[],
  basePath: string
) => {
  let transFunc = "";
  for (const code of languageCodes) {
    transFunc += `\t${code} : () => import("${basePath}/${code}.json").then((module) => module.default),\n`;
  }

  return `
export const translations = {
${transFunc}
} as const;
  `;
};

export function getCredits() {
  return `
/**
 * package: ${PACKAGE_NAME}
 * 
 * 
 */

`;
}
