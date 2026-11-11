/**
 * S20 · Evaluación del agente generador.
 * Compara out/<story>.json contra el dataset de referencia data/reference/<story>.json
 * (casos revisados por el equipo en el lab 7) y usa un LLM juez para puntuar cada caso.
 * Uso: npm run eval:cases -- checkout-cupon
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { chat, parseJson } from './llm.js';
import type { TestCase } from './test-case-agent.js';

const story = process.argv[2] ?? 'checkout-cupon';
const generated: TestCase[] = JSON.parse(readFileSync(`out/${story}.json`, 'utf8')).cases;
const refPath = `data/reference/${story}.json`;
const reference: { title: string }[] = existsSync(refPath) ? JSON.parse(readFileSync(refPath, 'utf8')) : [];
const storyText = readFileSync(`stories/${story}.md`, 'utf8');
const judgeModel = process.env.JUDGE_MODEL || undefined;

// 1) Cobertura del dataset de referencia: el juez decide si algún caso generado cubre cada caso de referencia
let covered = 0;
for (const ref of reference) {
  const r = await chat({
    model: judgeModel, json: true, temperature: 0,
    messages: [{ role: 'user', content: `¿Alguno de estos casos cubre el mismo objetivo que "${ref.title}"? Responde {"covered":true|false}.\n${generated.map((c) => `${c.id}: ${c.title}`).join('\n')}` }],
  });
  if (parseJson<{ covered: boolean }>(r.content).covered) covered++;
}

// 2) Calidad por caso (LLM-as-judge)
type Score = { correct: number; specific: number; traceable: number; why: string };
const scores: (Score & { id: string })[] = [];
for (const c of generated) {
  const r = await chat({
    model: judgeModel, json: true, temperature: 0,
    messages: [{ role: 'user', content: `Eres un evaluador de casos de prueba.\nRequisito:\n${storyText}\nCaso:\n${JSON.stringify(c)}\nCalifica 1-5: correct, specific, traceable. Responde SOLO JSON {"correct":n,"specific":n,"traceable":n,"why":"..."}` }],
  });
  scores.push({ id: c.id, ...parseJson<Score>(r.content) });
}

const avg = (k: keyof Score) => (scores.reduce((s, x) => s + Number(x[k]), 0) / scores.length).toFixed(2);
const report = `# Evaluación del agente · ${story}

| Métrica | Valor |
|---|---|
| Casos generados | ${generated.length} |
| Cobertura del dataset de referencia | ${reference.length ? ((covered / reference.length) * 100).toFixed(0) + '%' : 'sin dataset'} |
| Correctitud (juez, 1-5) | ${avg('correct')} |
| Especificidad (juez, 1-5) | ${avg('specific')} |
| Trazabilidad (juez, 1-5) | ${avg('traceable')} |

> Calibrar el juez: revisar manualmente al menos 10 casos y comparar con estos puntajes.

## Detalle
${scores.map((s) => `- ${s.id}: C${s.correct} E${s.specific} T${s.traceable} — ${s.why}`).join('\n')}
`;
writeFileSync(`out/eval-${story}.md`, report);
console.log(report);
