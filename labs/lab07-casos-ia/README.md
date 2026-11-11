# Lab 7 · Suite de casos de prueba generada con IA

**Fecha:** 30/11 · **Duración y modalidad:** 70 min · individual, sobre tu caso real

## Objetivo
Generar casos aplicando técnicas de diseño explícitas, revisarlos con checklist y trazarlos a requisitos y riesgos.

## Pasos
1. Tomar las 3 HU críticas del proyecto.
2. Asignar al menos 2 técnicas por HU (EP, BVA, tabla de decisión, transición de estados, pairwise, escenarios) y generar con `prompts/07-casos-por-tecnica.md`.
3. Generar datos de prueba válidos e inválidos en JSON (`prompts/09-datos-prueba.md`).
4. Aplicar el checklist (correcto, único, trazable, ejecutable, necesario). Registrar % aceptados / corregidos / descartados.
5. Construir la matriz de trazabilidad caso → HU → riesgo.
6. Exportar a `casos.csv` (formato en `templates/casos.csv`) y marcar candidatos a automatizar.
7. Guardar los casos revisados en `agents/data/reference/` — serán el dataset de evaluación del agente (S20).

## Uso de IA (obligatorio documentar)
- Prompt(s) exactos usados y herramienta/modelo.
- Qué aceptaron, qué corrigieron y qué descartaron de la IA.
- Datos compartidos: confirmar que no hay datos reales ni secretos.

## Entregable
`casos.csv` + `datos/` + `trazabilidad.md` (parte de E2).
