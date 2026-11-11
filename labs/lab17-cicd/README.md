# Lab 17 · Pipeline CI/CD con quality gates

**Fecha:** 18/01 · **Duración y modalidad:** 70 min · individual, sobre tu caso real

## Objetivo
Integrar la suite en GitHub Actions con sharding, artefactos, quality gates y triage de fallos asistido por IA.

## Pasos
1. Partir de `.github/workflows/qa.yml`; pedir a la IA que lo adapte a su proyecto y **revisar** permisos y secretos.
2. Etiquetar tests críticos con `@critical`; configurar retries y sharding.
3. Publicar reporte HTML, traces y `results.json` como artefactos.
4. Implementar 3 quality gates (ej. críticos 100%, flaky < 2%, a11y sin críticas) con branch protection.
5. Forzar un fallo y hacer el triage con `prompts/12-triage-ci.md` usando log + error-context.
6. Agregar badge del pipeline y sección CI/CD al README.

## Uso de IA (obligatorio documentar)
- Prompt(s) exactos usados y herramienta/modelo.
- Qué aceptaron, qué corrigieron y qué descartaron de la IA.
- Datos compartidos: confirmar que no hay datos reales ni secretos.

## Entregable
`qa.yml` + `gates.md` (parte de E4).
