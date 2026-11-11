/**
 * Cliente mínimo para cualquier API compatible con OpenAI Chat Completions.
 * Sin SDK a propósito: los alumnos ven exactamente qué se envía y qué vuelve.
 */
import 'dotenv/config';

export type Role = 'system' | 'user' | 'assistant' | 'tool';
export interface ToolCall { id: string; type: 'function'; function: { name: string; arguments: string } }
export interface Message { role: Role; content: string | null; tool_calls?: ToolCall[]; tool_call_id?: string }
export interface ToolSchema {
  type: 'function';
  function: { name: string; description: string; parameters: Record<string, unknown> };
}

const BASE = process.env.LLM_BASE_URL ?? 'https://api.openai.com/v1';
const KEY = process.env.LLM_API_KEY ?? '';
export const MODEL = process.env.LLM_MODEL ?? 'gpt-4o-mini';

export const usage = { calls: 0, promptTokens: 0, completionTokens: 0 };

export async function chat(opts: {
  messages: Message[];
  tools?: ToolSchema[];
  model?: string;
  temperature?: number;
  json?: boolean;
}): Promise<Message> {
  const body: Record<string, unknown> = {
    model: opts.model || MODEL,
    messages: opts.messages,
    temperature: opts.temperature ?? 0.2,
  };
  if (opts.tools?.length) body.tools = opts.tools;
  if (opts.json) body.response_format = { type: 'json_object' };

  const res = await fetch(`${BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`LLM ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as {
    choices: { message: Message }[];
    usage?: { prompt_tokens?: number; completion_tokens?: number };
  };
  usage.calls++;
  usage.promptTokens += data.usage?.prompt_tokens ?? 0;
  usage.completionTokens += data.usage?.completion_tokens ?? 0;
  return data.choices[0].message;
}

/** Extrae JSON aunque el modelo lo envuelva en ```json ... ``` */
export function parseJson<T = unknown>(text: string | null): T {
  const raw = (text ?? '').trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  return JSON.parse(raw) as T;
}
