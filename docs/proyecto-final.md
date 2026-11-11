# Proyecto final · AI Powered Quality Engineering

## Objetivo
Construir, **con IA y con criterio de QA**, la práctica de Quality Engineering completa de una aplicación: estrategia basada en riesgo, casos de prueba diseñados con técnicas, automatización UI/API/visual con Playwright, pipeline CI/CD con quality gates y un agente de IA propio, cerrando con un informe de calidad y una defensa.

## Caso: real y aplicado a tu área
El proyecto es **individual** y se aplica a un **caso real**:

- **Opción A (preferida) · Tu área:** una app web o API de tu empresa, en ambiente de pruebas, con autorización de tu líder y datos anonimizados o sintéticos. Si el código o los datos no pueden salir de la empresa, usar IA local (Ollama).
- **Opción B · Caso real público:** si tu empresa no lo permite, una aplicación pública con web y/o API de un dominio que conozcas (e-commerce, banca demo, reservas…), aprobada por el docente.
- **Plan B · App de práctica:** Toolshop (https://practicesoftwaretesting.com + API) solo si A y B no son viables; igual debe conectarse con un problema de calidad de tu área.

Toolshop es además la app que se usa en las demos y en los labs cuando tu sistema no es accesible desde la clase.

**Propuesta del caso (16/11):** `templates/propuesta-caso.md`, 1 página. El docente da feedback el 18/11. Criterios: relevancia, testabilidad (web o API), acceso durante todo el programa, permisos y datos resueltos, alcance realista (2-3 flujos críticos).

## Modalidad

| | Individual (regla general) | En pareja (excepción) |
|---|---|---|
| Cuándo | Siempre | Solo si ambos trabajan en la misma empresa/sistema, con aprobación del docente |
| Alcance | 2-3 flujos críticos de tu sistema | Alcance mayor |
| Automatización | UI **o** API + visual + CI | UI **y** API + visual + CI |
| Agente IA | 1 agente que resuelva un problema de tu área, evaluado | 2 agentes |
| Defensa | Individual | Cada integrante defiende todo el proyecto |

Los laboratorios se trabajan individualmente sobre tu caso; en clase hay revisión entre pares (parejas o tríos), pero cada entrega es personal.

## Hitos

| Hito | Fecha | Entregables | Sesiones |
|---|---|---|---|
| **Propuesta** | 16/11 | `propuesta-caso.md` validado por el docente | S01–S03 |
| **E1 · Plan** | 23/11 | `plan.md` (one-page test plan), matriz de riesgos, tablero GitHub Projects, `metrics.md` | S03–S05 |
| **E2 · Estrategia y casos** | 04/12 (asesoría) | `estrategia.md`, `casos.csv`, datos de prueba, trazabilidad, 3 tests Playwright | S06–S08 |
| **E3 · Suite automatizada** | 18/12 (asesoría) | Tests UI (POM) + API + visual + a11y; escenarios BDD | S10–S13 |
| **E4 · CI + agente** | 22/01 (asesoría) | `qa.yml` con gates, resultados de performance, diseño del agente (`agente-diseno.md`) | S15–S18 |
| **Final** | 13/02 | Agente funcionando y evaluado, informe de calidad, presentación y demo | S20–S23 |

### Rúbricas por hito (cada hito: 0-4 por criterio)
- **Propuesta:** caso real relevante, testable, con acceso y permisos.
- **E1:** riesgos priorizados y justificados · plan realista para las horas disponibles · tablero con hitos · métricas útiles (no de vanidad) · prompts registrados.
- **E2:** estrategia coherente con riesgos · sección de IA con controles · técnicas explícitas en los casos · % de casos IA aceptados/descartados documentado · trazabilidad.
- **E3:** locators robustos y POM · casos negativos y de autorización en API · visual estable (sin falsos positivos) · tests independientes y repetibles · uso de IA documentado.
- **E4:** pipeline en verde con artefactos · gates justificados por riesgo · manejo de flaky · diseño del agente con herramientas, guardrails y plan de evaluación.

## Formato de las asesorías (04/12, 18/12, 22/01)

| Hora | Actividad |
|---|---|
| 7:00 | Stand-up: cada alumno cuenta avance, bloqueos y plan (1 min) |
| 7:20 | Revisión 1:1 con el docente (8-10 min por alumno, rúbrica del hito); el resto trabaja en su backlog o en revisión entre pares |
| 8:20 | Break |
| 8:30 | Clínica técnica: problemas comunes resueltos en vivo |
| 9:15 | Trabajo guiado para cerrar observaciones |
| 9:45 | Compromisos: qué se entrega y cuándo |

El feedback se deja por escrito en un issue del repo de cada alumno.

## Rúbrica final (100 puntos)

| Criterio | Qué se espera | Pts |
|---|---|---|
| Estrategia QE | Basada en riesgo, coherente y realista | 15 |
| Diseño de casos con IA | Técnicas, revisión humana, trazabilidad | 15 |
| Automatización | UI + API + visual robustos y mantenibles | 20 |
| CI/CD y quality gates | Pipeline estable, gates justificados | 15 |
| Agente IA | Funciona, tiene guardrails y está evaluado | 20 |
| Comunicación y defensa | Informe claro, demo, respuestas | 15 |

## Presentación final · 13/02 (9:00 a.m. – 1:00 p.m.)
10 min por alumno: 7 de presentación + 3 de preguntas (caben ~20 alumnos; si hay más, dos salas o video previo de la demo). Estructura sugerida:
1. Tu área, el problema de calidad y los riesgos (1.5 min)
2. Casos diseñados con IA y trazabilidad (1 min)
3. Pipeline en vivo y quality gates (2 min)
4. Demo del agente y su evaluación (1.5 min)
5. Métricas, valor para tu área y lecciones (1 min)

## Checklist de entrega
- [ ] README con setup en 5 minutos y badge del pipeline en verde
- [ ] `/prompts` documentado (qué se generó con IA, con qué herramienta, qué se corrigió)
- [ ] `estrategia.md` y `plan.md` actualizados
- [ ] Informe de calidad final y `eval-report` del agente
- [ ] Slides en la plantilla de UTEC Posgrado, demo ensayada con plan B grabado
