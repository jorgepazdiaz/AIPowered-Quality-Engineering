# Del fundamento al agente · ejemplo guiado

Este laboratorio recorre los 6 escalones de adopción de IA con **un mismo caso**: diseñar casos de prueba con la técnica de **valores límite** para la historia de usuario `HU-CART-03`. Después construyes y ejecutas el agente en VS Code. Al final hay un **ejercicio resuelto** para que veas cómo se entrega el tuyo.

> La HU es didáctica: sus reglas no son las de Toolshop. Sirve para practicar la técnica.

---

## 1. El caso base: HU-CART-03

```text
Como cliente de Toolshop quiero elegir la cantidad de cada producto y aplicar un cupón
para comprar lo que necesito pagando menos.

Reglas:
1. Cantidad por producto entre 1 y 99 unidades (enteros).
2. El cupón solo se aplica si el subtotal es de al menos 50.00 USD (2 decimales).
3. El código de cupón tiene entre 6 y 12 caracteres.
```

**Límites esperados (2 valores):** cantidad 0 · 1 · 99 · 100 — subtotal 49.99 · 50.00 — longitud del cupón 5 · 6 · 12 · 13. Son 10 casos.

---

## 2. Los 6 escalones con el mismo caso

### Escalón 1 · Prompt suelto
```text
Dame casos de prueba para el carrito de compras.
```
**Respuesta típica:** agregar un producto, eliminar un producto, aplicar cupón válido, aplicar cupón inválido, vaciar el carrito.
**Problema:** casos genéricos, sin valores límite, sin datos concretos ni trazabilidad. Cubre 0 de 10 límites.

### Escalón 2 · Plantilla con técnica explícita
```text
# ROL      Eres un QA experto en diseño de pruebas.
# CONTEXTO [pegar HU-CART-03]
# TAREA    Aplica VALORES LÍMITE (2 valores) a cada campo con rango.
# RESTRICCIONES  No inventes reglas; si falta información, pregunta.
# FORMATO  Tabla: ID | Campo | Valor | ¿Válido? | Resultado esperado | Regla
```
**Respuesta típica:** una tabla con los límites de cantidad y del cupón, pero el subtotal suele salir como **49 / 50** (paso de 1 en vez de 0.01).
**Mejora:** aparece la técnica y el formato. **Problema:** errores de precisión que hay que revisar a mano.

### Escalón 3 · Encadenamiento con autocrítica
```text
Paso A: Lista los campos con rango: mínimo, máximo y paso (entero o 0.01). No generes casos todavía.
Paso B: Con esa lista, aplica valores límite de 2 valores. Tabla: ID | Campo | Valor | ¿Válido? | Esperado | Regla
Paso C: Revisa como auditor: ¿falta algún límite? ¿algún paso incorrecto? ¿algún esperado inventado?
        Entrega la versión corregida y las dudas para el PO.
```
**Qué corrige el Paso C:** el subtotal pasa a **49.99 / 50.00** y aparece una duda para el PO: *¿hay un subtotal máximo?*
**Resultado:** 10 de 10 límites, pero todavía copias y pegas a mano.

### Escalón 4 · Herramientas (Copilot / Playwright MCP)
En VS Code, con los casos ya en `agents/out/HU-CART-03.boundary.json`, escribe el comentario y deja que Copilot complete:
```ts
// Test data-driven: un test por cada caso de cantidad en HU-CART-03.boundary.json
import data from '../../../agents/out/HU-CART-03.boundary.json';

for (const c of data.cases.filter((x) => x.field === 'cantidad')) {
  test(`${c.id} cantidad=${c.value}`, async ({ page }) => {
    await page.goto('/product/1');                       // ajustar a tu app
    await page.getByTestId('quantity').fill(String(c.value));
    await page.getByTestId('add-to-cart').click();
    if (c.valid) await expect(page.getByTestId('cart-quantity')).toHaveText(String(c.value));
    else await expect(page.getByText('Cantidad no válida')).toBeVisible();
  });
}
```
Con **Playwright MCP** puedes pedirle a un agente que abra la app y verifique en la pantalla real si el campo acepta 99 y rechaza 100.
**Qué cambia:** la IA ya no solo escribe texto: genera código y usa el navegador.

### Escalón 5 · Agente propio
`agents/src/boundary-agent.ts` hace todo el flujo solo: lee la HU y el contexto, identifica los campos, **calcula los límites con código** (herramienta `calcBoundaries`), valida la salida con un esquema y guarda JSON y CSV. Ver la sección 3.

### Escalón 6 · Agente en CI
`.github/workflows/agent-boundary.yml` ejecuta el agente cada vez que cambia una HU en `agents/stories/` y usa `eval:boundary` como **quality gate**: si falta un límite, el pipeline falla.

### Resumen (resultado típico, ilustrativo)
| Escalón | Límites cubiertos | Errores típicos | Esfuerzo humano |
|---|---|---|---|
| 1 · Prompt suelto | 0 / 10 | Casos genéricos | Reescribir todo |
| 2 · Plantilla | 8 / 10 | Paso 1 en vez de 0.01 | Revisar cada valor |
| 3 · Encadenamiento | 10 / 10 | Pocos | Revisar y copiar |
| 4 · Herramientas | — (automatiza la ejecución) | Locators a ajustar | Supervisar |
| 5 · Agente propio | 10 / 10, validado por código | Lo detecta la validación | Definir y aprobar |
| 6 · Agente en CI | 10 / 10 en cada cambio | Lo bloquea el gate | Revisar excepciones |

---

## 3. Paso a paso: el agente en tu VS Code

### Herramientas necesarias
| Herramienta | Para qué | Cómo obtenerla |
|---|---|---|
| Visual Studio Code | Editor | code.visualstudio.com |
| Node.js LTS (v20 o superior) | Ejecutar TypeScript | nodejs.org · comprobar con `node -v` |
| Git | Clonar el repositorio | git-scm.com |
| Extensión GitHub Copilot (opcional) | Escalón 4 | Marketplace de VS Code |
| Un modelo de IA vía API | El cerebro del agente | Gemini o Groq (gratis), OpenAI, o **Ollama local** |

> El modelo debe soportar **tool calling** (llamado a herramientas). Los modelos actuales de Gemini (Flash), GPT y Claude lo soportan, igual que Llama 3.3 70B en Groq y Qwen 2.5 en Ollama. Copia el nombre exacto del modelo desde la página de tu proveedor.

### Paso 1 · Abrir el proyecto
```bash
git clone <url-de-tu-repo>
code ai-powered-qe-utec/agents        # abre la carpeta del agente en VS Code
```
En VS Code: **Terminal → New Terminal**.

### Paso 2 · Instalar dependencias
```bash
npm install
```

### Paso 3 · Configurar el modelo
```bash
cp .env.example .env        # en Windows: copy .env.example .env
```
Edita `.env` con **una** de estas opciones:
```ini
# Gemini (gratis, crear clave en Google AI Studio)
LLM_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai
LLM_API_KEY=tu_clave
LLM_MODEL=gemini-3.5-flash      # modelo alternativo disponible para esta clave

# Ollama local (sin enviar datos a la nube): instalar Ollama y ejecutar `ollama pull qwen2.5:7b`
# LLM_BASE_URL=http://localhost:11434/v1
# LLM_API_KEY=ollama
# LLM_MODEL=qwen2.5:7b
```
**Nunca subas `.env` al repositorio** (ya está en `.gitignore`).

### Paso 4 · Probar la conexión
```bash
npm run hello
```
Debe responder con 3 riesgos de un carrito de compras.

### Paso 5 · Leer el código (5 minutos)
Abre `src/boundary-agent.ts`. Tiene 5 partes:
1. **Contrato** (`BoundaryCase`): qué debe tener cada caso. Es el criterio QA hecho código.
2. **Herramientas**: `readStory`, `readContext`, `calcBoundaries` (el código calcula los límites, no la IA) y `saveCases` (valida con Zod y rechaza lo incorrecto).
3. **Instrucciones**: la técnica de valores límite escrita como prompt de sistema.
4. **Bucle**: `runAgent` (en `src/agent.ts`) llama al modelo, ejecuta las herramientas y repite hasta terminar o llegar a 12 pasos.
5. **Resultados**: guarda JSON y CSV en `out/`.

### Paso 6 · Ejecutar el agente
```bash
npm run agent:boundary -- stories/HU-CART-03.md
```
Verás una traza parecida a esta:
```text
Agente de valores límite · modelo: gemini-3.5-flash · HU: HU-CART-03
  [paso 1] readStory({})
  [paso 2] readContext({})
  [paso 3] calcBoundaries({"field":"cantidad","min":1,"max":99,"step":1})
  [paso 4] calcBoundaries({"field":"subtotal","min":50,"step":0.01})
  [paso 5] calcBoundaries({"field":"longitud_cupon","min":6,"max":12,"step":1})
  [paso 6] saveCases({"cases":[{"id":"BV-1",…        ← la validación lo rechaza (ID mal formado)
  [paso 7] saveCases({"cases":[{"id":"BV-01",…       ← el agente corrige y guarda
=== Resumen del agente ===
Campos: cantidad (1-99), subtotal (mín. 50.00, sin máximo), longitud del cupón (6-12).
10 casos guardados. Duda para el PO: ¿existe un subtotal máximo?
```
Cada modelo decide sus pasos: tu traza puede variar.

### Paso 7 · Revisar y evaluar
Abre `out/HU-CART-03.boundary.csv` en VS Code o Excel. Luego:
```bash
npm run eval:boundary -- HU-CART-03
```
```text
Evaluación · HU-CART-03
  Cobertura de límites esperados : 10/10 (100%)
  Validez incorrecta             : 0
  Casos extra (no esperados)     : 0
```
La evaluación es determinista (no usa IA): compara contra `data/reference/HU-CART-03.boundary.json`.

### Paso 8 · Retos
1. Crea `stories/HU-REG-01.md` con un formulario de registro (edad 18-65, contraseña 8-20 caracteres) y su archivo de referencia. Ejecuta y evalúa.
2. Cambia de modelo (por ejemplo, a uno local) y compara pasos, tokens y cobertura.
3. Agrega a `calcBoundaries` la variante de **3 valores** (mín-1, mín, mín+1…) y un parámetro para elegirla.

### Problemas comunes
| Síntoma | Causa | Solución |
|---|---|---|
| `LLM 401` | Clave incorrecta | Revisar `LLM_API_KEY` en `.env` |
| `LLM 429` | Límite del plan gratuito | Esperar un minuto o cambiar de proveedor |
| `LLM 404` o modelo no encontrado | Nombre de modelo o URL mal escritos | Copiar el nombre exacto del proveedor |
| El agente responde sin usar herramientas | El modelo no soporta tool calling | Usar un modelo con soporte de herramientas |
| “Límite de 12 pasos alcanzado” | El modelo se repite | Revisar instrucciones o usar un modelo más capaz |
| `ECONNREFUSED localhost:11434` | Ollama no está corriendo | Abrir Ollama o ejecutar `ollama serve` |

---

## 4. Ejercicio resuelto: «Del fundamento al agente»

> Ejemplo ilustrativo de una alumna ficticia. Úsalo como modelo de entrega.

**Alumna:** Ana, analista QA en una fintech (app de transferencias).
**Fundamento elegido:** pruebas estáticas, en concreto la **revisión de historias de usuario** antes del refinamiento.

**HU usada (anonimizada):**
> Como cliente quiero transferir dinero a otra cuenta para pagar a terceros. La transferencia debe ser rápida y segura. El monto máximo depende del perfil del cliente.

### Escalón 1 · Prompt suelto
```text
Revisa esta historia de usuario: [HU]
```
Respuesta (resumen): "La historia está bien planteada. Se recomienda agregar criterios de aceptación, considerar aspectos de seguridad, validar montos y mejorar la redacción." → 4 observaciones generales.

### Escalones 2-3 · Plantilla con técnica y autocrítica
```text
# ROL     Eres un QA senior revisor de requisitos (pruebas estáticas).
# CONTEXTO App de transferencias. HU: [HU]
# TAREA   Revisa la HU con este checklist: términos ambiguos o no medibles, reglas de negocio
          faltantes, criterios de aceptación ausentes, riesgos y testabilidad.
# RESTRICCIONES  Cada hallazgo debe citar el texto exacto de la HU. No inventes reglas ni valores.
# FORMATO Tabla: ID | Tipo | Texto citado | Problema | Pregunta al PO | Severidad
# AUTOCRÍTICA  Al final elimina los hallazgos que no se basen en el texto y los duplicados.
```
Hallazgos válidos (extracto):
| ID | Tipo | Texto citado | Pregunta al PO |
|---|---|---|---|
| H1 | Ambiguo | "rápida" | ¿En cuántos segundos debe confirmarse? |
| H2 | Ambiguo | "segura" | ¿Se exige OTP o biometría? ¿Desde qué monto? |
| H3 | Regla faltante | "monto máximo depende del perfil" | ¿Cuáles son los perfiles y sus montos? |
| H4 | Regla faltante | "otra cuenta" | ¿Incluye cuentas de otros bancos? ¿Cuentas propias? |
| H5 | Regla faltante | — (no menciona saldo) | ¿Qué pasa con saldo insuficiente? |
| H6 | Riesgo | — (doble clic) | ¿Cómo se evita una transferencia duplicada? |
| H7 | Criterio ausente | toda la HU | ¿Qué ve el cliente al confirmar o fallar? |
| H8 | Regla faltante | — (comisiones/horario) | ¿Hay comisión u horario de corte? |

Descartado en la revisión: un hallazgo que asumía "límite de S/ 5,000", valor que **no está en la HU** (la IA lo inventó).

### Comparación de salidas
| Métrica | Prompt suelto | Plantilla + autocrítica |
|---|---|---|
| Hallazgos totales | 4 | 10 |
| Hallazgos válidos | 2 | 8 |
| Duplicados | 1 | 0 (tras autocrítica) |
| Inventados | 1 | 1 (detectado y descartado) |
| Preguntas concretas al PO | 0 | 8 |
| Tiempo | 1 min | 6 min |

**Conclusión de Ana:** la plantilla con checklist cuadruplica los hallazgos útiles. La regla de citar el texto de la HU hizo fácil detectar el valor inventado.

### Ficha del agente: «Revisor de historias de usuario»
| Aspecto | Definición |
|---|---|
| Objetivo | Revisar cada HU nueva antes del refinamiento y entregar hallazgos y preguntas al PO |
| Entrada / salida | HU en Markdown (exportada de Jira) → JSON `{id, tipo, texto_citado, problema, pregunta, severidad}` + resumen |
| Herramientas | `readStory`, `readGlossary`, `findVagueTerms` (código: busca "rápido", "seguro", "fácil", "etc.", "depende"), `saveFindings` (valida con Zod: exige texto citado) |
| Límites | Máximo 6 pasos · no inventar reglas ni valores · datos anonimizados · IA local si la HU tiene datos sensibles · solo deja un borrador de comentario, no publica en Jira |
| Evaluación | 15 HU revisadas por un QA senior como referencia · hallazgos válidos ≥ 80% · inventados = 0 · costo < USD 0.01 por HU |
| Integración | Fase 1: script manual · Fase 2: job que corre al crear la HU y deja el borrador para aprobación |

### Mejora recibida del compañero
> "Haz que `findVagueTerms` corra **antes** de llamar al LLM. Es código, es gratis y siempre encuentra los términos vagos. Así el modelo se concentra en las reglas faltantes y los riesgos."

Es el mismo principio del agente de valores límite: **lo que se puede calcular con código, se calcula con código; la IA se usa para lo que requiere interpretar.**
