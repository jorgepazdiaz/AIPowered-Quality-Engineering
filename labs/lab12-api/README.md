# Lab 12 · Suite de API testing con IA

**Fecha:** 14/12 · **Duración y modalidad:** 70 min · individual, sobre tu caso real

## Objetivo
Generar y automatizar pruebas de API desde la especificación OpenAPI, incluyendo negativos, autorización y contrato.

## Pasos
1. Abrir el Swagger de https://api.practicesoftwaretesting.com y elegir 3 endpoints.
2. Generar con IA la matriz campo × partición → payload → status esperado (`prompts/10-api-openapi.md`). Marcar status **supuestos**.
3. Automatizar ≥ 12 casos en `tests/api/` (data-driven), incluyendo un caso de **autorización** (usuario A no ve datos de B).
4. Agregar validación de esquema de respuesta para 1 endpoint (Zod o Ajv, generado con IA).
5. Refactorizar 1 test E2E para hacer el setup por API (crear usuario + login por API).
6. Documentar diferencias entre spec y comportamiento real en `hallazgos.md`.

## Uso de IA (obligatorio documentar)
- Prompt(s) exactos usados y herramienta/modelo.
- Qué aceptaron, qué corrigieron y qué descartaron de la IA.
- Datos compartidos: confirmar que no hay datos reales ni secretos.

## Entregable
`tests/api/*` + `hallazgos.md` (parte de E3).
