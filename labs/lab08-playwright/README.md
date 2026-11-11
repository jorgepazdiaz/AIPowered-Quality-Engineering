# Lab 8 · Primeros tests E2E con Playwright + IA

**Fecha:** 02/12 · **Duración y modalidad:** 70 min · individual (apoyo en parejas)

## Objetivo
Crear tests E2E robustos de Toolshop usando tres enfoques asistidos por IA y depurarlos con Trace Viewer.

## Pasos
1. `cd playwright && npx playwright test --project=ui --ui` y abrir el trace de un test.
2. Automatizar 3 casos de `casos.csv` (login, búsqueda, agregar al carrito), cada uno con un enfoque:
   - a) **Codegen:** `npm run codegen`, grabar y limpiar el código.
   - b) **Copilot:** escribir el caso como comentario en el spec y dejar que complete; revisar locators.
   - c) **MCP / Test Agents:** `npx playwright init-agents --loop=vscode` y pedir al agente *generator* el test desde el plan.
3. Refactorizar a Page Object Model (ver `pages/`) con ayuda de IA: «refactoriza a POM sin cambiar el comportamiento».
4. Romper un locator a propósito y diagnosticarlo con Trace Viewer.
5. Registrar qué generó la IA, qué se corrigió y cuánto tiempo tomó cada enfoque.

## Uso de IA (obligatorio documentar)
- Prompt(s) exactos usados y herramienta/modelo.
- Qué aceptaron, qué corrigieron y qué descartaron de la IA.
- Datos compartidos: confirmar que no hay datos reales ni secretos.

## Entregable
3 specs + POM en `playwright/` y `lab08.md` con la comparación.
