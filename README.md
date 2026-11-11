# AI Powered Quality Engineering · UTEC Posgrado

Repositorio base del programa (nov 2026 – feb 2027). Contiene las guías de laboratorio, la biblioteca de prompts, plantillas, el proyecto Playwright + TypeScript y los agentes de IA que se construyen durante el curso.

> **Formato:** 24 sesiones de 3 horas (7:00–10:00 p.m.). Cada sesión: ~40 min de conceptos, ~25 min de demo, ~70 min de laboratorio y ~20 min de plenaria. **Todos los temas incluyen uso y aplicación de IA.**

## Cronograma

| # | Fecha | Módulo | Enfoque | Expositor | Lab |
|---|---|---|---|---|---|
| 0 | 02/11 | Onboarding UTEC | Bienvenida, herramientas y networking | UTEC | — |
| 1 | 09/11 | Fundamentos QA + IA | Introducción al Quality Engineering moderno | Jorge Paz | [lab01](labs/lab01-diagnostico-qe) |
| 2 | 11/11 | Fundamentos QA + IA | El rol de la IA en el ciclo de pruebas | Jorge Paz | [lab02](labs/lab02-ia-vs-humano) |
| 3 | 16/11 | Fundamentos QA + IA | Prompt Engineering aplicado a testing | Jorge Paz | [lab03](labs/lab03-biblioteca-prompts) |
| 4 | 18/11 | Gestión de proyectos 1 | Planificación, estimación y riesgos con IA | Jorge Paz | [lab04](labs/lab04-plan-proyecto) |
| 5 | 23/11 | Gestión de proyectos 2 | Métricas, seguimiento y reporting con IA · **E1** | Jorge Paz | [lab05](labs/lab05-metricas-reporte) |
| 6 | 25/11 | Gestión QA + IA | Diseño de estrategia QA impulsada por IA | Jorge Paz | [lab06](labs/lab06-estrategia) |
| 7 | 30/11 | Gestión QA + IA | Generación inteligente de casos de prueba | Jorge Paz | [lab07](labs/lab07-casos-ia) |
| 8 | 02/12 | Automatización + IA | Introducción a Playwright + IA | Jorge Paz | [lab08](labs/lab08-playwright) |
| 9 | 04/12 | Asesoría | Trabajo del proyecto · **E2** | Jorge Paz | [asesorías](docs/proyecto-final.md) |
| 10 | 07/12 | Automatización + IA | Generación automática de scripts de prueba | York Correa | — |
| 11 | 10/12 | Automatización + IA | BDD + Gherkin generados por IA | York Correa | — |
| 12 | 14/12 | Testing avanzado + IA | API testing impulsado por IA | Jorge Paz | [lab12](labs/lab12-api) |
| 13 | 16/12 | Testing avanzado + IA | Visual testing inteligente | Jorge Paz | [lab13](labs/lab13-visual) |
| 14 | 18/12 | Asesoría | Trabajo del proyecto · **E3** | Jorge Paz | [asesorías](docs/proyecto-final.md) |
| 15 | 11/01 | Performance + IA | Introducción a Performance Engineering | Delvis E. | — |
| 16 | 13/01 | Performance + IA | Performance Engineering (parte 2) | Delvis E. | — |
| 17 | 18/01 | DevOps QA + IA | QA integrado en CI/CD y quality gates | Jorge Paz | [lab17](labs/lab17-cicd) |
| 18 | 20/01 | Agentes IA | Introducción a agentes inteligentes para QA | Jorge Paz | [lab18](labs/lab18-primer-agente) |
| 19 | 22/01 | Asesoría | Trabajo del proyecto · **E4** | Jorge Paz | [asesorías](docs/proyecto-final.md) |
| 20 | 25/01 | Agentes IA | Agente generador de casos de prueba | Jorge Paz | [lab20](labs/lab20-agente-casos) |
| 21 | 27/01 | Agentes IA | Agente analizador de defectos | Jorge Paz | [lab21](labs/lab21-agente-defectos) |
| 22 | 01/02 | Comunicación | *Por confirmar* | — | — |
| 23 | 03/02 | Comunicación | *Por confirmar* | — | — |
| 24 | 13/02 | Proyecto final | Desarrollo, presentación y evaluación (9:00 a.m. – 1:00 p.m.) | Jorge Paz | [proyecto](docs/proyecto-final.md) |

## Material complementario

- [Del fundamento al agente · ejemplo guiado](labs/lab-fundamento-agente/README.md): valores límite en 6 escalones, agente paso a paso en VS Code (`npm run agent:boundary`) y ejercicio resuelto.

## Herramientas

| Categoría | Herramienta | Uso |
|---|---|---|
| Lenguaje y editor | TypeScript, Node.js LTS, VS Code | Automatización y agentes |
| Versionado y gestión | Git, GitHub, GitHub Projects | Repo del equipo, tablero, entregas |
| Automatización | Playwright Test (Codegen, UI Mode, Trace Viewer) | UI, API, visual, accesibilidad |
| API | Playwright APIRequest, Swagger/Postman | Explorar y automatizar la API |
| BDD | Gherkin + playwright-bdd | Escenarios ejecutables |
| Performance | k6 | Carga y estrés (sesiones 15-16) |
| CI/CD | GitHub Actions | Pipeline y quality gates |
| App bajo prueba | Tu caso real · [Toolshop](https://practicesoftwaretesting.com) + [API](https://api.practicesoftwaretesting.com) para demos y práctica | Proyecto final · labs |

## IA que usaremos (hay opción gratuita en cada categoría)

| Categoría | Opciones | Para qué |
|---|---|---|
| Asistentes de chat | ChatGPT, Claude, Gemini | Análisis, diseño, prompts, reportes |
| IA en el IDE | GitHub Copilot (gratis para estudiantes verificados), Cursor | Generar, explicar y refactorizar código |
| IA + navegador | Playwright MCP, Playwright Test Agents (planner, generator, healer) | Explorar la app y generar/reparar tests |
| LLM vía API | Cualquier API compatible con OpenAI: Gemini, Groq, OpenAI u **Ollama local** | Construir los agentes propios |

**Reglas de uso:** nunca pegar datos reales de clientes ni secretos; toda salida de IA se revisa antes de entrar al repo; registrar en `/prompts` qué se generó con IA.

## Setup (15 min)

```bash
# Requisitos: Node.js LTS, Git, VS Code (+ extensión "Playwright Test for VS Code")
git clone <url-de-tu-repo-personal>
cd ai-powered-qe-utec/playwright
npm install
npx playwright install
npx playwright test --ui           # debe abrir UI Mode con tests de ejemplo

cd ../agents
npm install
cp .env.example .env               # configurar proveedor LLM
npm run hello                      # prueba de conexión con el LLM
```

> Los selectores `data-test` y endpoints se basan en la versión pública de Toolshop. **Docente: ejecutar la suite una vez antes de la sesión 8** y, si la app cambió, actualizarlos con `npx playwright codegen` (también es un buen ejercicio en clase).

## Estructura

```
labs/          Guías paso a paso de cada laboratorio
prompts/       Biblioteca de prompts de testing (plantillas con variables {…})
templates/     Propuesta del caso, plan, estrategia, política de IA, bug report, diseño de agente, casos.csv
playwright/    Proyecto Playwright + TS: pages/ (POM), tests/{ui,api,visual,a11y}, utils/
agents/        Agentes en TypeScript: cliente LLM, bucle de agente, generador de casos, triage
docs/          Proyecto final, rúbricas y formato de asesorías
.github/       Pipeline de CI con quality gates y job de triage con IA
```

## Proyecto final (resumen)

Proyecto **individual** aplicado a un **caso real de tu área de trabajo** (o un caso real público si tu empresa no lo permite; Toolshop solo como plan B). Construyes, con IA, la práctica de Quality Engineering de ese sistema: estrategia → casos → automatización UI/API/visual → CI/CD con quality gates → agente IA → informe y defensa. Excepción: en pareja si trabajan en el mismo sistema, con aprobación. Hitos: Propuesta 16/11 · E1 23/11 · E2 04/12 · E3 18/12 · E4 22/01 · Final 13/02. Detalle en [docs/proyecto-final.md](docs/proyecto-final.md).
