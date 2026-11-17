import { readdirSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const allowed = {
  domain: ["domain"],
  application: ["application", "domain"],
  infrastructure: ["infrastructure", "application", "domain"],
  presentation: ["presentation", "domain", "application", "infrastructure"],
  server: ["server", "application", "domain", "infrastructure"],
  app: ["app", "server", "presentation"],
};
const atomic = { atoms: 0, molecules: 1, organisms: 2, templates: 3, pages: 4 };

/** Architecture constraints are checked on imports, exports and dynamic imports alike. */
export function checkArchitecture(project = process.cwd()) {
  const src = path.resolve(project, "src");
  const files = [];
  function walk(dir) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(file);
      else if (/\.tsx?$/.test(entry.name)) files.push(file);
    }
  }
  walk(src);
  const errors = [], graph = new Map();
  const relative = (file) => path.relative(src, file).split(path.sep).join("/");
  const issue = (file, text) => errors.push(`${relative(file)}: ${text}`);
  for (const file of files) {
    const name = relative(file), [layer, section] = name.split("/");
    if (!allowed[layer]) { issue(file, "capa no reconocida"); continue; }
    const source = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
    const imports = [];
    const visit = (node) => {
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) imports.push(node.moduleSpecifier.text);
      if (ts.isCallExpression(node) && (node.expression.kind === ts.SyntaxKind.ImportKeyword || node.expression.getText(source) === "require")) {
        if (node.arguments[0] && ts.isStringLiteral(node.arguments[0])) imports.push(node.arguments[0].text);
        else issue(file, "import dinámico no verificable");
      }
      if (["domain", "application"].includes(layer) && ts.isIdentifier(node) && ["window", "document", "localStorage", "fetch", "process", "setTimeout", "setInterval"].includes(node.text)) issue(file, `efecto externo ${node.text} en una capa pura`);
      if (["domain", "application"].includes(layer) && ts.isCallExpression(node) && ["Date.now", "Math.random", "crypto.randomUUID"].includes(node.expression.getText(source))) issue(file, "el reloj y la aleatoriedad deben inyectarse");
      ts.forEachChild(node, visit);
    };
    visit(source);
    const edges = [];
    for (const specifier of imports) {
      if (!(specifier.startsWith("@/") || specifier.startsWith("."))) {
        if (["domain", "application"].includes(layer)) issue(file, `dependencia externa ${specifier}`);
        if (layer === "presentation" && (specifier.startsWith("node:") || specifier === "@upstash/redis" || specifier === "next/server")) issue(file, `dependencia de servidor ${specifier}`);
        continue;
      }
      const target = specifier.startsWith("@/") ? path.resolve(src, specifier.slice(2)) : path.resolve(path.dirname(file), specifier);
      const targetName = relative(target), [targetLayer, targetSection] = targetName.split("/");
      if (!allowed[layer].includes(targetLayer)) issue(file, `dependencia prohibida ${layer} → ${targetLayer} (${specifier})`);
      if (layer === "presentation" && targetLayer === "infrastructure" && (section !== "hooks" || targetSection !== "browser")) issue(file, "solo los hooks pueden conectar adaptadores del navegador");
      if (layer === "presentation" && targetLayer === "presentation" && section in atomic && targetSection in atomic && atomic[section] < atomic[targetSection]) issue(file, `jerarquía atómica invertida ${section} → ${targetSection}`);
      if (layer === "presentation" && section === "atoms" && (targetLayer !== "presentation" || !["atoms", "assets"].includes(targetSection))) issue(file, "los átomos no conocen reglas, casos de uso ni hooks del juego");
      if (layer === "infrastructure" && section === "browser" && targetLayer === "infrastructure" && targetSection !== "browser") issue(file, "el navegador no puede importar adaptadores de servidor");
      const resolved = [target, `${target}.ts`, `${target}.tsx`, path.join(target, "index.ts"), path.join(target, "index.tsx")].find((candidate) => files.includes(candidate));
      if (resolved) edges.push(resolved);
      else if (!target.endsWith(".css") || !existsSync(target)) issue(file, `import local no resuelto ${specifier}`);
    }
    graph.set(file, edges);
  }
  const visited = new Set(), active = new Set();
  function findCycles(file, trail) {
    if (active.has(file)) { issue(file, `ciclo ${[...trail, file].map(relative).join(" → ")}`); return; }
    if (visited.has(file)) return;
    active.add(file);
    for (const target of graph.get(file) ?? []) findCycles(target, [...trail, file]);
    active.delete(file); visited.add(file);
  }
  for (const file of files) findCycles(file, []);
  return { files: files.length, errors: [...new Set(errors)] };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = checkArchitecture();
  if (result.errors.length) { console.error(result.errors.join("\n")); process.exitCode = 1; }
  else console.log(`Arquitectura verificada: ${result.files} módulos, capas y jerarquía atómica sin ciclos.`);
}
