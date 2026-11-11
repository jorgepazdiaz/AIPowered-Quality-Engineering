/**
 * Evaluación DETERMINISTA del agente de valores límite (sin LLM).
 * Compara out/<HU>.boundary.json con data/reference/<HU>.boundary.json.
 * Uso: npm run eval:boundary -- HU-CART-03
 */
import { readFileSync } from 'node:fs';

const id = process.argv[2] ?? 'HU-CART-03';
const got: { field: string; value: number; valid: boolean }[] = JSON.parse(readFileSync(`out/${id}.boundary.json`, 'utf8')).cases;
const ref: { field: string; value: number; valid: boolean }[] = JSON.parse(readFileSync(`data/reference/${id}.boundary.json`, 'utf8')).expected;

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '');
const same = (a: { field: string; value: number }, b: { field: string; value: number }) =>
  Math.abs(a.value - b.value) < 1e-9 && (norm(a.field).includes(norm(b.field)) || norm(b.field).includes(norm(a.field)));

const found = ref.filter(r => got.some(g => same(g, r)));
const missing = ref.filter(r => !got.some(g => same(g, r)));
const wrongValidity = ref.filter(r => got.some(g => same(g, r) && g.valid !== r.valid));
const extra = got.filter(g => !ref.some(r => same(g, r)));
const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0) + '%';

console.log(`Evaluación · ${id}
  Cobertura de límites esperados : ${found.length}/${ref.length} (${pct(found.length, ref.length)})
  Validez incorrecta             : ${wrongValidity.length}
  Casos extra (no esperados)     : ${extra.length}
${missing.length ? '  Faltan: ' + missing.map(m => `${m.field}=${m.value}`).join(', ') : '  No falta ningún límite.'}
${extra.length ? '  Extra (revisar si son útiles o redundantes): ' + extra.map(m => `${m.field}=${m.value}`).join(', ') : ''}`);
process.exitCode = missing.length || wrongValidity.length ? 1 : 0; // útil como quality gate en CI
