import { readFile } from "fs/promises";
import path from "path";

export async function getData<T>(filename: string): Promise<T> {
  const safeFilename = filename.endsWith(".json") ? filename : `${filename}.json`;
  const filePath = path.join(process.cwd(), "data", safeFilename);
  const fileContent = await readFile(filePath, "utf-8");

  return JSON.parse(fileContent) as T;
}
