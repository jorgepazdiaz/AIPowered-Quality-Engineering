# Lab 18 · Tu primer agente de QA

**Fecha:** 20/01 · **Duración y modalidad:** 70 min · individual (apoyo en parejas)

## Objetivo
Entender el bucle de un agente con tool calling, extenderlo con una herramienta y guardrails, y diseñar el agente del proyecto.

## Pasos
1. `cd agents && cp .env.example .env` y configurar un proveedor (Gemini/Groq gratis u Ollama local). `npm run hello`.
2. Ejecutar `npm run agent:explain -- tests/ui/login.spec.ts` y leer la traza de pasos.
3. En `src/fs-tools.ts` agregar la herramienta `searchInSpecs({ text })` que busque texto en `playwright/tests`.
4. Agregar guardrails: límite de pasos (`MAX_STEPS`), allowlist de rutas, tamaño máximo de salida.
5. Preguntar al agente «¿qué funcionalidades de la app no tienen tests?» y validar la respuesta manualmente.
6. Completar `templates/agente-diseno.md` con el agente del proyecto final.

## Uso de IA (obligatorio documentar)
- Prompt(s) exactos usados y herramienta/modelo.
- Qué aceptaron, qué corrigieron y qué descartaron de la IA.
- Datos compartidos: confirmar que no hay datos reales ni secretos.

## Entregable
`agents/` con la herramienta nueva + `agente-diseno.md` (parte de E4).
