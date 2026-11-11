# Lab 13 · Visual testing inteligente

**Fecha:** 16/12 · **Duración y modalidad:** 70 min · individual, sobre tu caso real

## Objetivo
Implementar regresión visual estable y usar IA multimodal para triage de diferencias y accesibilidad.

## Pasos
1. Crear snapshots de 5 pantallas críticas en `tests/visual/` (proyectos `visual` y `visual-mobile`).
2. Estabilizar: `mask`, datos fijos (setup por API o `page.route`) y `animations: 'disabled'`.
3. Provocar 2 cambios visuales (ej. `page.addStyleTag`) y analizar baseline/actual/diff con `prompts/11-visual-diff.md` en un asistente multimodal.
4. Ejecutar `tests/a11y/` (axe-core) y pedir a la IA explicación y fix de cada violación.
5. Definir la política de actualización de baselines (quién aprueba, cuándo, dónde se generan: en CI).
6. Medir falsos positivos antes y después de estabilizar.

## Uso de IA (obligatorio documentar)
- Prompt(s) exactos usados y herramienta/modelo.
- Qué aceptaron, qué corrigieron y qué descartaron de la IA.
- Datos compartidos: confirmar que no hay datos reales ni secretos.

## Entregable
`tests/visual/*` + a11y + `politica-baselines.md` (parte de E3).
