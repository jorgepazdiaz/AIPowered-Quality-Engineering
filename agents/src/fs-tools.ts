/** Herramientas de solo lectura sobre el repo, restringidas a una carpeta raíz (guardrail). */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve, relative } from 'node:path';
import type { Tool } from './agent.js';

export const ROOT = resolve(process.env.REPO_ROOT ?? '..');

function safe(p: string): string {
  const full = resolve(ROOT, p);
  if (relative(ROOT, full).startsWith('..')) throw new Error('Ruta fuera del repositorio');
  if (/\.env|secret|node_modules/i.test(full)) throw new Error('Ruta no permitida');
  return full;
}

function walk(dir: string, out: string[] = []): string[] {
  for (const f of readdirSync(dir)) {
    if (f === 'node_modules' || f.startsWith('.')) continue;
    const p = join(dir, f);
    statSync(p).isDirectory() ? walk(p, out) : out.push(relative(ROOT, p));
  }
  return out;
}

export const fsTools: Record<string, Tool> = {
  listFiles: {
    schema: {
      type: 'function',
      function: {
        name: 'listFiles',
        description: 'Lista archivos del repositorio bajo una carpeta (ej. playwright/tests).',
        parameters: { type: 'object', properties: { dir: { type: 'string' } }, required: ['dir'] },
      },
    },
    run: ({ dir }: { dir: string }) => walk(safe(dir)).join('\n'),
  },
  readFile: {
    schema: {
      type: 'function',
      function: {
        name: 'readFile',
        description: 'Lee un archivo de texto del repositorio.',
        parameters: { type: 'object', properties: { path: { type: 'string' } }, required: ['path'] },
      },
    },
    run: ({ path }: { path: string }) => {
      const p = safe(path);
      return existsSync(p) ? readFileSync(p, 'utf8') : `No existe: ${path}`;
    },
  },
  // Lab 18: agregar aquí la herramienta searchInSpecs (buscar texto en playwright/tests)
};
