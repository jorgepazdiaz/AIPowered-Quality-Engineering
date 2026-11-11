/**
 * S20 · Agente generador de casos de prueba (workflow agéntico).
 * HU (markdown) + contexto → análisis → generación por técnica (JSON validado con Zod)
 * → auto-revisión → casos.csv, .feature y supuestos.md
 * Uso: npm run agent:cases -- stories/checkout-cupon.md
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { basename, join } from 'node:path';
import { z } from 'zod';
import { chat, parseJson, usage, Message } from './llm.js';

export const TestCase = z.object({
  id: z.string().regex(/^TC-\d{3}$/),
  title: z.string().min(10),
  technique: z.enum(['EP', 'BVA', 'DECISION_TABLE', 'STATE', 'PAIRWISE', 'SCENARIO']),
  preconditions: z.array(z.string()),
  steps: z.array(z.string()).min(1),
  data: z.record(z.any()),
  expected: z.string().min(5),
  priority: z.enum(['P1', 'P2', 'P3']),
  traceTo: z.object({ story: z.string(), risk: z.string().optional() }),
});
export type TestCase = z.infer<typeof TestCase>;
const Output = z.object({ cases: z.array(TestCase).min(1), assumptions: z.array(z.string()) });

const SYSTEM = `Eres un QA Engineer senior experto en diseño de pruebas.
Reglas:
- Aplica explícitamente las técnicas indicadas (EP, BVA, DECISION_TABLE, STATE, PAIRWISE, SCENARIO).
- No inventes reglas de negocio: si falta información, regístrala en "assumptions".
- Sin duplicados. Datos concretos. Resultado esperado verificable.
- Responde SOLO JSON con la forma {"cases":[...],"assumptions":[...]}.
Cada caso: id (TC-001...), title, technique, preconditions[], steps[], data{}, expected, priority (P1|P2|P3), traceTo{story, risk?}.`;

/** RAG simple: incluir documentos de contexto de agents/context/*.md (glosario, reglas, OpenAPI). */
function loadContext(): string {
  const dir = 'context';
  if (!existsSync(dir)) return '';
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => `--- ${f} ---\n${readFileSync(join(dir, f), 'utf8')}`)
    .join('\n\n');
}

async function askJson(messages: Message[], attempts = 2) {
  for (let i = 0; i <= attempts; i++) {
    const msg = await chat({ messages, json: true, temperature: 0.2 });
    try {
      return Output.parse(parseJson(msg.content));
    } catch (e) {
      // Guardrail: si la salida no cumple el contrato, se reintenta mostrando el error al modelo
      messages.push(msg, { role: 'user', content: `Tu salida no cumple el esquema: ${(e as Error).message.slice(0, 1500)}. Corrígela y responde solo JSON.` });
    }
  }
  throw new Error('El modelo no produjo una salida válida');
}

export async function generateCases(storyPath: string) {
  const story = readFileSync(storyPath, 'utf8');
  const storyId = basename(storyPath, '.md');
  const context = loadContext();

  // Paso 1 · análisis
  const analysis = await chat({
    messages: [
      { role: 'system', content: 'Eres un QA Lead. Analiza requisitos con espíritu crítico.' },
      { role: 'user', content: `Contexto:\n${context}\n\nHU (${storyId}):\n${story}\n\nLista: reglas de negocio, particiones/estados relevantes, riesgos y ambigüedades. Sugiere qué técnicas aplicar.` },
    ],
  });

  // Paso 2 · generación con contrato JSON
  const messages: Message[] = [
    { role: 'system', content: SYSTEM },
    { role: 'user', content: `HU (${storyId}):\n${story}\n\nAnálisis previo:\n${analysis.content}\n\nGenera entre 10 y 20 casos. traceTo.story = "${storyId}".` },
  ];
  const draft = await askJson(messages);

  // Paso 3 · auto-revisión
  const reviewed = await askJson([
    { role: 'system', content: SYSTEM },
    { role: 'user', content: `Revisa estos casos como auditor QA: elimina duplicados, corrige resultados esperados que sean suposiciones, agrega particiones o límites faltantes y conserva el formato.\nHU:\n${story}\n\nCasos:\n${JSON.stringify(draft)}` },
  ]);

  // Validación adicional en código: IDs únicos
  const ids = new Set(reviewed.cases.map((c) => c.id));
  if (ids.size !== reviewed.cases.length) console.warn('⚠ IDs duplicados en la salida');
  return { storyId, ...reviewed };
}

function toCsv(cases: TestCase[]) {
  const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const head = 'id,title,technique,priority,preconditions,steps,data,expected,story,risk';
  const rows = cases.map((c) =>
    [c.id, c.title, c.technique, c.priority, c.preconditions.join(' | '), c.steps.join(' | '),
      JSON.stringify(c.data), c.expected, c.traceTo.story, c.traceTo.risk ?? ''].map(String).map(esc).join(','));
  return [head, ...rows].join('\n');
}

function toGherkin(storyId: string, cases: TestCase[]) {
  const lines = [`Feature: ${storyId}`, ''];
  for (const c of cases) {
    lines.push(`  @${c.priority} @${c.technique} @${c.id}`, `  Scenario: ${c.title}`);
    c.preconditions.forEach((p, i) => lines.push(`    ${i === 0 ? 'Given' : 'And'} ${p}`));
    c.steps.forEach((s, i) => lines.push(`    ${i === 0 ? 'When' : 'And'} ${s}`));
    lines.push(`    Then ${c.expected}`, '');
  }
  return lines.join('\n');
}

if (process.argv[1]?.includes('test-case-agent')) {
  const path = process.argv[2] ?? 'stories/checkout-cupon.md';
  const res = await generateCases(path);
  mkdirSync('out', { recursive: true });
  writeFileSync(`out/${res.storyId}.json`, JSON.stringify(res, null, 2));
  writeFileSync(`out/${res.storyId}.csv`, toCsv(res.cases));
  writeFileSync(`out/${res.storyId}.feature`, toGherkin(res.storyId, res.cases));
  writeFileSync(`out/${res.storyId}-supuestos.md`, res.assumptions.map((a) => `- ${a}`).join('\n'));
  console.log(`✔ ${res.cases.length} casos · ${res.assumptions.length} supuestos → out/${res.storyId}.*`);
  console.log(`Llamadas: ${usage.calls} · tokens: ${usage.promptTokens}+${usage.completionTokens}`);
}
