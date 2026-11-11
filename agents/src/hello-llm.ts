import { chat, MODEL } from './llm.js';

const r = await chat({
  messages: [
    { role: 'system', content: 'Eres un QA Engineer senior. Responde en español, breve.' },
    { role: 'user', content: 'Dame 3 riesgos de calidad de un carrito de compras.' },
  ],
});
console.log(`Modelo: ${MODEL}\n\n${r.content}`);
