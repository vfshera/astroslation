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
    console.log(`${fileName} is created successfully.`);
  });
}
