# Lab 21 · Agente analizador de defectos

**Fecha:** 27/01 · **Duración y modalidad:** 70 min · individual, sobre tu caso real

## Objetivo
Automatizar el triage de fallos (bug, flaky, ambiente, datos, cambio intencional) con evidencia y aprobación humana.

## Pasos
1. Generar un `results.json` con fallos de 3 tipos (bug real o simulado, flaky, API caída).
2. Ejecutar `npm run agent:triage -- ../playwright/test-results/results.json` (sin reporte usa `data/sample-results.json`).
3. Etiquetar manualmente cada fallo y medir la exactitud de clasificación del agente.
4. Alimentar `data/history.json` con resultados de los últimos runs del CI y observar si cambia la clasificación.
5. Activar el job `triage` del workflow (`vars.ENABLE_AI_TRIAGE=true`, secreto `LLM_API_KEY`) para comentar en el PR.
6. Documentar guardrails: el agente solo crea **borradores**; un humano aprueba los issues.

## Uso de IA (obligatorio documentar)
- Prompt(s) exactos usados y herramienta/modelo.
- Qué aceptaron, qué corrigieron y qué descartaron de la IA.
- Datos compartidos: confirmar que no hay datos reales ni secretos.

## Entregable
Agente + job de CI + `triage-eval.md`.
