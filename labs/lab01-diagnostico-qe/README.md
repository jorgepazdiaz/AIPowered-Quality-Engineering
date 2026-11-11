# Lab 1 · Diagnóstico QE y primer uso de IA

**Fecha:** 09/11 · **Duración y modalidad:** 70 min · individual + revisión en parejas

## Objetivo
Evaluar la madurez de Quality Engineering de una organización real y usar IA por primera vez para analizar una historia de usuario con criterio de QA.

## Pasos
1. Crear tu repositorio personal desde este repositorio base.
2. **Parte A (30 min):** evaluar tu propia área u organización con `Lab01_Matriz_Madurez_QE.xlsx` (en esta carpeta) o con la tabla de abajo. Justificar cada nivel con una evidencia concreta.
3. Pedir a la IA un roadmap de 3 mejoras priorizadas usando `prompts/01-roadmap-madurez.md`. Revisarlo con tu criterio: ¿es realista? ¿qué cambiarías?
4. **Parte B (30 min):** escribir 1 historia de usuario real de tu trabajo (anonimizada) y analizarla con `prompts/02-analisis-hu.md` en **dos** asistentes de IA distintos.
5. Marcar en una tabla qué aportes de la IA fueron útiles, cuáles incorrectos (alucinaciones) y por qué.
6. En parejas: intercambiar resultados y comentar el análisis del compañero (10 min).
7. Subir todo a `/lab01/lab01.md` incluyendo los prompts exactos usados.

## Referencia
| Dimensión | 1 Inicial | 2 Gestionado | 3 Definido | 4 Optimizado |
|---|---|---|---|---|
| Requisitos | Sin revisión | Revisión ad hoc | Criterios de aceptación | Ejemplos + revisión de riesgo |
| Automatización | Ninguna | Scripts sueltos | Suite en CI | Pirámide balanceada + gates |
| Ambientes y datos | Manuales | Documentados | Bajo demanda | Efímeros y versionados |
| Métricas | Ninguna | Conteo de bugs | Tendencias por release | DORA + calidad + negocio |
| Uso de IA | Ninguno | Uso individual | Prompts compartidos | Agentes integrados al flujo |

## Uso de IA (obligatorio documentar)
- Prompt(s) exactos usados y herramienta/modelo.
- Qué aceptaron, qué corrigieron y qué descartaron de la IA.
- Datos compartidos: confirmar que no hay datos reales ni secretos.

## Entregable
`lab01.md` con matriz + roadmap revisado + análisis de HU + tabla de aciertos/errores de la IA.
