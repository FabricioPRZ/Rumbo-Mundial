import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
const directories = ["src", "tests", "scripts", "docs", "public/art"];
const files = [
  ".env.example",
  ".gitignore",
  ".vercelignore",
  "package-lock.json",
  "package.json",
  "tsconfig.json",
  "next-env.d.ts",
  "next.config.ts",
  "tailwind.config.ts",
  "postcss.config.mjs",
  "eslint.config.mjs",
  "vitest.config.ts",
];
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const file = path.posix.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (entry.isFile()) files.push(file);
  }
}
for (const directory of directories) await walk(directory);
files.push("README.md");
const tree = {};
for (const file of files) {
  let branch = tree;
  for (const part of file.split("/")) branch = branch[part] ??= {};
}
function render(branch, prefix = "") {
  const entries = Object.entries(branch);
  return entries.flatMap(([name, children], i) => {
    const last = i === entries.length - 1;
    return [
      `${prefix}${last ? "└──" : "├──"} ${name}`,
      ...render(children, `${prefix}${last ? "    " : "│   "}`),
    ];
  });
}
let markdown =
  "```text\nrumbo-mundial/\n" + render(tree).join("\n") + "\n```\n";
for (const file of files) {
  const ext = path.extname(file);
  if (ext === ".webp") { markdown += `\n## ${file}\n\nIlustración original incluida en el proyecto y en el ZIP.\n`; continue; }
  const lang =
    {
      ".ts": "typescript",
      ".tsx": "tsx",
      ".mjs": "javascript",
      ".json": "json",
      ".css": "css",
      ".md": "markdown",
    }[ext] ?? "text";
  markdown += `\n## ${file}\n\n\`\`\`\`${lang}\n${await readFile(file, "utf8")}\`\`\`\`\n`;
}
await writeFile("ENTREGA.md", markdown);
console.log(
  `ENTREGA.md: árbol y ${files.length} archivos completos; README al final.`,
);
