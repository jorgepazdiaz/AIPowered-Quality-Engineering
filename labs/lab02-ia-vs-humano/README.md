# Lab 2 · Experimento: IA vs humano vs híbrido

**Fecha:** 11/11 · **Duración y modalidad:** 70 min · tríos (experimento) + política individual

## Objetivo
Medir con datos cuánto aporta la IA a una tarea de diseño de pruebas y definir la tu política de uso de IA.

## Pasos
1. Tarea común: diseñar escenarios de prueba para el **registro de usuario** de Toolshop (https://practicesoftwaretesting.com/auth/register).
2. Formar tríos; cada integrante toma una variante: **A** humano sin IA · **B** solo IA con prompt libre · **C** híbrido (humano primero, la IA revisa y completa).
3. Cada variante trabaja 15 minutos en paralelo.
4. Unificar en una tabla: escenario · riesgo cubierto · origen (A/B/C) · ¿válido? · ¿duplicado?
5. Calcular: escenarios válidos, duplicados, alucinaciones, riesgos únicos por variante.
6. Llenar `templates/politica-ia.md`: qué datos se comparten, con qué herramientas, cómo se valida, qué se registra.
7. Conclusión de 5 líneas: en qué tareas de tu área usarás IA y con qué controles.

## Uso de IA (obligatorio documentar)
- Prompt(s) exactos usados y herramienta/modelo.
- Qué aceptaron, qué corrigieron y qué descartaron de la IA.
- Datos compartidos: confirmar que no hay datos reales ni secretos.

## Entregable
`lab02.md` con tabla comparativa, métricas y conclusiones + `politica-ia.md`.
