# Lab 20 · Agente generador de casos de prueba

**Fecha:** 25/01 · **Duración y modalidad:** 70 min · individual, sobre tu caso real

## Objetivo
Adaptar, ejecutar y evaluar un agente que convierte HU en casos trazables (CSV + Gherkin).

## Pasos
1. Revisar `agents/src/test-case-agent.ts`: análisis → generación con esquema Zod → auto-revisión.
2. Adaptar las instrucciones al dominio de su app y agregar 2 documentos en `agents/context/` (glosario, reglas, fragmento OpenAPI).
3. Escribir 3 HU del proyecto en `agents/stories/` y ejecutar `npm run agent:cases -- stories/<hu>.md`.
4. Armar `data/reference/<hu>.json` con los casos revisados en la sesión 7.
5. Ejecutar `npm run eval:cases -- <hu>` (cobertura + LLM-as-judge). Calibrar el juez revisando 10 casos a mano.
6. Mejorar prompt o flujo (v2) y comparar métricas v1 vs v2, incluyendo costo en tokens.

## Uso de IA (obligatorio documentar)
- Prompt(s) exactos usados y herramienta/modelo.
- Qué aceptaron, qué corrigieron y qué descartaron de la IA.
- Datos compartidos: confirmar que no hay datos reales ni secretos.

## Entregable
Agente adaptado + `eval-report.md` con v1 vs v2.
