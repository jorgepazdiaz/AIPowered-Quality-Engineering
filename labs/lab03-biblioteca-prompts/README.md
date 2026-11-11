# Lab 3 · Biblioteca de prompts de testing

**Fecha:** 16/11 · **Duración y modalidad:** 70 min · individual, sobre tu caso real

## Objetivo
Diseñar, iterar y evaluar prompts para tareas de QA, y construir la tu biblioteca reutilizable aplicada a tu caso.

## Pasos
1. Elegir 3 funcionalidades de tu caso real (ej. login, búsqueda, pago).
2. Para cada una escribir un prompt **v1 ingenuo** y medirlo con la rúbrica (abajo).
3. Mejorarlo a **v2** con la estructura R-C-T-R-F (rol, contexto, tarea, restricciones, formato).
4. Mejorarlo a **v3** con few-shot (2 ejemplos propios) + auto-revisión + supuestos explícitos.
5. Ejecutar cada versión **3 veces** y registrar puntajes (consistencia).
6. Guardar las plantillas ganadoras en `/prompts` con variables `{…}` y un ejemplo de uso.
7. Bonus: prompt que convierte notas sueltas en un bug report (`prompts/08-bug-report.md`).

## Referencia
| Criterio | Pregunta | Escala |
|---|---|---|
| Exactitud | ¿Correcta respecto al sistema? | 1-5 |
| Cobertura | ¿Cubre particiones y riesgos? | 1-5 |
| Formato | ¿Usable sin reescribir? | 1-5 |
| Consistencia | ¿Similar en 3 ejecuciones? | 1-5 |
| Alucinaciones | ¿Cuántas reglas/datos inventó? | conteo |

## Uso de IA (obligatorio documentar)
- Prompt(s) exactos usados y herramienta/modelo.
- Qué aceptaron, qué corrigieron y qué descartaron de la IA.
- Datos compartidos: confirmar que no hay datos reales ni secretos.

## Entregable
`/prompts` con 3+ plantillas y `lab03.md` con la evaluación v1/v2/v3.
