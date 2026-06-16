import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = resolve(root, "dist");
const htmlPath = resolve(distDir, "index.html");

let html = await readFile(htmlPath, "utf8");

html = await inlineStylesheet(html);
html = await inlineScript(html);

await writeFile(htmlPath, html);

async function inlineStylesheet(source) {
  const stylesheetMatch = source.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/);

  if (!stylesheetMatch) {
    return source;
  }

  const cssPath = resolveAssetPath(stylesheetMatch[1]);
  const css = await readFile(cssPath, "utf8");

  return source.replace(stylesheetMatch[0], `<style>\n${css}\n</style>`);
}

async function inlineScript(source) {
  const scriptMatch = source.match(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/);

  if (!scriptMatch) {
    return source;
  }

  const jsPath = resolveAssetPath(scriptMatch[1]);
  const js = await readFile(jsPath, "utf8");

  return source.replace(scriptMatch[0], `<script type="module">\n${js}\n</script>`);
}

function resolveAssetPath(path) {
  return resolve(distDir, path.replace(/^\.\//, ""));
}
