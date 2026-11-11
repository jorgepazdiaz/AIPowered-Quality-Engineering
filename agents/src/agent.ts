/** Bucle genérico de agente con tool calling y guardrails básicos. */
import { chat, Message, ToolSchema } from './llm.js';

export interface Tool {
  schema: ToolSchema;
  run: (args: any) => Promise<string> | string;
}

export async function runAgent(opts: {
  system: string;
  task: string;
  tools: Record<string, Tool>;
  maxSteps?: number;
  verbose?: boolean;
}): Promise<string> {
  const maxSteps = opts.maxSteps ?? Number(process.env.MAX_STEPS ?? 8);
  const messages: Message[] = [
    { role: 'system', content: opts.system },
    { role: 'user', content: opts.task },
  ];
  const schemas = Object.values(opts.tools).map((t) => t.schema);

  for (let step = 1; step <= maxSteps; step++) {
    const msg = await chat({ messages, tools: schemas });
    messages.push(msg);
    if (!msg.tool_calls?.length) return msg.content ?? '';

    for (const call of msg.tool_calls) {
      const tool = opts.tools[call.function.name]; // allowlist: solo herramientas registradas
      let out: string;
      try {
        const args = JSON.parse(call.function.arguments || '{}');
        if (opts.verbose !== false) { const a = JSON.stringify(args); console.log(`  [paso ${step}] ${call.function.name}(${a.length > 110 ? a.slice(0, 110) + '…' : a})`); }
        out = tool ? String(await tool.run(args)) : `ERROR: herramienta no permitida: ${call.function.name}`;
      } catch (e) {
        out = `ERROR: ${(e as Error).message}`;
      }
      // Limitar el tamaño de lo que vuelve al contexto (costo y ruido)
      messages.push({ role: 'tool', tool_call_id: call.id, content: out.slice(0, 12_000) });
    }
  }
  return `Límite de ${maxSteps} pasos alcanzado sin respuesta final.`;
}
