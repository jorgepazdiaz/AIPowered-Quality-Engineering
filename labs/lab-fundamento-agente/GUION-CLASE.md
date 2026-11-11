# Guion de clase · Los 6 escalones en vivo (HU-CART-03)

Guion para el docente: qué hacer, qué decir y qué deben lograr los alumnos en cada escalón. Todo el recorrido usa la misma HU y la misma técnica (valores límite), y **cada escalón usa el resultado del anterior**:

```
E1 chat ──► E2 chat ──► E3 chat ──► tabla revisada
                                        │  (Copilot la convierte en JSON)
                                        ▼
E4 Copilot crea el test ◄── playwright/data/HU-CART-03.casos.json
                                        ▲
E5 el agente genera el mismo JSON solo ─┘  (reemplaza E1-E3 y la conversión)
E6 el pipeline corre E5 + evaluación en cada cambio de una HU
```

**Duración total:** unos 100 minutos (E1 5 · E2 10 · E3 15 · E4 25 · E5 25 · E6 15 · cierre 5).

---

## Preparación del docente (el día anterior)

- [ ] Repo clonado y `npm install` hecho en `playwright/` y en `agents/`.
- [ ] `agents/.env` configurado y `npm run hello` funcionando con tu clave.
- [ ] Ejecutar una vez todo el guion. Guardar como plan B: la tabla del E3, el JSON y la salida del agente.
- [ ] Tener abierto: un chat de IA, VS Code con Copilot activo y Toolshop en el navegador.
- [ ] Pedir a los alumnos que traigan: VS Code, Node.js LTS, Copilot activado (o una alternativa) y una clave gratuita de Gemini o Groq.
- [ ] Pegar en el chat de la clase el texto de HU-CART-03 (está en `agents/stories/HU-CART-03.md`).

> Antes de empezar, pide a los alumnos que calculen a mano los 10 límites en 2 minutos: cantidad 0·1·99·100, subtotal 49.99·50.00 y longitud del cupón 5·6·12·13. Esa es la vara con la que juzgarán a la IA en cada escalón.

---

## Escalón 1 · Prompt suelto · 5 min

**Herramienta:** cualquier chat de IA (ChatGPT, Claude, Gemini o Copilot Chat).

**Pasos con los alumnos**
1. Abrir un chat nuevo, sin contexto previo.
2. Escribir exactamente:
   ```text
   Dame casos de prueba para el carrito de compras.
   ```
3. Contar cuántos de los 10 límites aparecen.

**Resultado esperado:** casos genéricos (agregar, eliminar, aplicar cupón…). Cubre 0 de 10 límites.

**Qué explicar:** la IA responde lo que le pides. Sin técnica ni contexto, devuelve un promedio de internet.

**Punto de control:** cada alumno dice en el chat cuántos límites encontró. Casi todos dirán 0.

---

## Escalón 2 · Plantilla con técnica · 10 min

**Herramienta:** el mismo chat, en una conversación nueva.

**Pasos con los alumnos**
1. Abrir un chat nuevo.
2. Pegar la plantilla, reemplazando `[HU]` por el texto completo de HU-CART-03:
   ```text
   # ROL       Eres un QA experto en diseño de pruebas.
   # CONTEXTO  [HU]
   # TAREA     Aplica VALORES LÍMITE (2 valores) a cada campo con rango.
   # RESTRICCIONES  No inventes reglas; si falta información, pregunta.
   # FORMATO   Tabla: ID | Campo | Valor | ¿Válido? | Resultado esperado | Regla
   ```
3. Comparar la tabla con los 10 límites calculados a mano. Marcar ✓ o ✗ en cada fila.

**Resultado esperado:** 8 a 10 de 10. El error más común es el subtotal en **49 / 50** (paso de 1 en vez de 0.01).

**Qué explicar:** con técnica y formato la calidad sube mucho, pero sigue habiendo errores de precisión. Por eso la revisión humana es obligatoria.

**Punto de control:** ¿a quién le salió el error del 49? Si a nadie, pregunta: ¿quién verificó el paso de los decimales?

---

## Escalón 3 · Encadenamiento con autocrítica · 15 min

**Herramienta:** el mismo chat, en una conversación nueva. Los 3 prompts van en esa misma conversación.

**Pasos con los alumnos**
1. **Paso A** (pegar la HU antes):
   ```text
   [HU]
   Lista los campos con rango: mínimo, máximo y paso (entero o 0.01). No generes casos todavía.
   ```
2. Revisar la lista. ¿Detectó que el subtotal usa decimales?
3. **Paso B:**
   ```text
   Con esa lista, aplica valores límite de 2 valores.
   Tabla: ID | Campo | Valor | ¿Válido? | Resultado esperado | Regla
   ```
4. **Paso C:**
   ```text
   Revisa tu tabla como auditor: ¿falta algún límite? ¿algún paso incorrecto?
   ¿algún resultado esperado inventado? Entrega la versión corregida y las dudas para el PO.
   ```
5. **Guardar la tabla final:** copiarla en un archivo `tabla-E3.md`. Se usa en el Escalón 4.

**Resultado esperado:** 10 de 10 y al menos una duda para el PO (por ejemplo: *¿hay un subtotal máximo?*).

**Qué explicar:** separar *analizar → generar → revisar* imita cómo trabaja un QA. Es el primer "flujo"; todavía lo orquestas tú copiando y pegando.

**Punto de control:** todos tienen `tabla-E3.md` con 10 filas. Quien no la tenga, usa la del docente (plan B).

---

## Escalón 4 · Herramientas: Copilot convierte y automatiza · 25 min

**Herramienta:** VS Code + GitHub Copilot (Chat en modo **Agent** y autocompletado). Ahora la IA trabaja **dentro del proyecto**: crea archivos y escribe código.

### 4.1 · Convertir la tabla del E3 en datos de prueba (8 min)
1. En VS Code: **File → Open Folder** y abrir la carpeta raíz del repositorio.
2. Abrir Copilot Chat (Ctrl+Alt+I en Windows, Ctrl+Cmd+I en Mac) y elegir el modo **Agent**.
3. Arrastrar `tabla-E3.md` al chat (o escribir `#file:tabla-E3.md`) y pedir:
   ```text
   Convierte la tabla de #file:tabla-E3.md en el archivo playwright/data/HU-CART-03.casos.json
   con esta forma: { "story": "HU-CART-03", "cases": [ { "id", "field", "value", "valid", "expected", "rule" } ] }.
   field en minúsculas: cantidad, subtotal o longitud_cupon. value como número y valid como booleano.
   ```
4. Revisar el archivo que crea Copilot y aceptar con **Keep**.

### 4.2 · Generar el test con Copilot (10 min)
1. Crear el archivo `playwright/tests/ui/cart-boundaries.spec.ts` y escribir solo esto:
   ```ts
   import { test, expect } from '@playwright/test';
   import fs from 'node:fs';
   import path from 'node:path';

   // Test data-driven: un test por cada caso de "cantidad" de data/HU-CART-03.casos.json.
   // Ir a la home, abrir el primer producto (getByTestId('product-name')), llenar getByTestId('quantity'),
   // clic en getByTestId('add-to-cart'). Si valid: getByTestId('cart-quantity') muestra la cantidad.
   // Si no es válido: el carrito no se actualiza.
   ```
2. Ir al final del comentario y presionar **Enter**. Copilot propone el código en gris: aceptar con **Tab**.
   *Alternativa:* pedirlo en Copilot Chat (modo Agent) con el mismo texto del comentario.
3. Comparar con la versión de referencia del repo, en `playwright/tests/ui/cart-boundaries.spec.ts`.

### 4.3 · Ejecutar (7 min)
```bash
cd playwright
npm run test:boundaries -- --headed     # o: npx playwright test tests/ui/cart-boundaries.spec.ts --ui
```

**Resultado esperado:**
- Los casos válidos (1 y 99) deberían pasar.
- Los inválidos (0 y 100) probablemente **fallen**: HU-CART-03 es didáctica y Toolshop no implementa esa regla.

**Qué explicar:**
- La IA ahora escribe código y archivos dentro del proyecto. Igual hay que revisar los selectores (si alguno falla, verificarlo con `npm run codegen`).
- El test que falla **encontró algo**: la app no cumple la HU. En QA eso se lleva al PO: ¿es un bug o la HU está mal?

**Punto de control:** todos ven la lista de tests ejecutados (pasados y fallidos) en la terminal o en UI Mode.

**Opcional (Playwright MCP):** en Copilot Chat con Playwright MCP configurado, pedir: *"Abre practicesoftwaretesting.com, entra al primer producto e intenta agregar 0, 99 y 100 unidades. Dime qué pasa en cada caso."* Así un agente verifica en la pantalla real.

---

## Escalón 5 · Agente propio · 25 min

**Herramienta:** terminal de VS Code + el agente del repositorio. **No usa Copilot**: el "cerebro" es el modelo configurado en `agents/.env`.

**Qué reemplaza:** todo lo manual de E1 a E4.1, es decir los prompts, la revisión de la tabla y la conversión a JSON.

**Pasos con los alumnos**
1. Configurar el modelo (si no lo hicieron antes):
   ```bash
   cd agents
   npm install
   cp .env.example .env        # Windows: copy .env.example .env
   # editar .env: LLM_BASE_URL, LLM_API_KEY, LLM_MODEL
   npm run hello
   ```
2. Abrir `src/boundary-agent.ts` y recorrerlo **5 minutos** con ellos:
   - **Contrato** (`BoundaryCase`): lo que debe tener cada caso.
   - **Herramientas:** `readStory`, `readContext`, `calcBoundaries` (calcula con código) y `saveCases` (valida con Zod).
   - **Instrucciones:** la técnica de valores límite como prompt de sistema.
3. Ejecutar el agente y **leer la traza en voz alta**, paso por paso:
   ```bash
   npm run agent:boundary -- stories/HU-CART-03.md
   ```
4. Evaluar contra la referencia:
   ```bash
   npm run eval:boundary -- HU-CART-03
   ```
5. **Conectar con el E4:** el agente produce el mismo formato que hicieron a mano. Hay que reemplazar el archivo y volver a correr el test:
   ```bash
   cd ../playwright
   npm run use:agent-cases
   npm run test:boundaries
   ```

**Resultado esperado:** 10 de 10 en la evaluación, una duda para el PO en el resumen y el mismo test del E4 ejecutándose ahora con los casos del agente.

**Qué explicar:**
- La IA **decide** qué leer e interpreta la HU.
- El **código calcula** los límites, así que no hay error de decimales.
- El **esquema valida**: si rechaza algo, el agente lo corrige solo. Señalar el paso de la traza donde ocurre.
- Lo que en E1-E3 tomó 30 minutos de prompts, aquí son unos segundos y se puede repetir con cualquier HU.

**Punto de control:** todos muestran `Cobertura de límites esperados: 10/10`. Si el modelo falla, revisar la tabla de problemas comunes del README.

---

## Escalón 6 · El agente en el pipeline · 15 min

**Herramienta:** GitHub + GitHub Actions. Hazlo como **demo del docente**: necesita el repo en GitHub y configurar secretos.

**Pasos (docente, en pantalla)**
1. Mostrar `.github/workflows/agent-boundary.yml`: se ejecuta cuando cambia un archivo en `agents/stories/`.
2. En GitHub, ir a **Settings → Secrets and variables → Actions** y crear:
   - Secret `LLM_API_KEY`.
   - Variables `LLM_BASE_URL` y `LLM_MODEL`.
3. Crear una rama, editar `agents/stories/HU-CART-03.md` (por ejemplo, cambiar la cantidad máxima a 50) y abrir un pull request.
4. En la pestaña **Actions**, mostrar cómo corre el agente y luego la evaluación.
5. La evaluación **falla**: la referencia todavía dice 99. Ese es el *quality gate* en acción.
6. Actualizar `data/reference/HU-CART-03.boundary.json` con los nuevos límites de cantidad (**0 · 1 · 50 · 51**), hacer commit y ver el pipeline en verde.
7. Descargar el artefacto `casos-valores-limite` con los CSV generados.

**Qué explicar:** el agente ya no depende de que alguien se acuerde de correrlo. Cada cambio de requisito genera y valida sus casos automáticamente, y una persona revisa solo las excepciones.

**Punto de control:** los alumnos identifican en la pantalla qué paso falló y por qué.

---

## Cierre · 5 min

Pregunta para la plenaria: **¿en qué escalón está hoy tu equipo de trabajo y cuál sería el siguiente paso realista?**

| Escalón | Herramienta | Quién orquesta | Resultado |
|---|---|---|---|
| 1 | Chat | Persona | Genérico |
| 2 | Chat + plantilla | Persona | Técnica, con errores |
| 3 | Chat + 3 prompts | Persona | Completo, manual |
| 4 | Copilot en VS Code | Persona + IA en el proyecto | Datos y test ejecutable |
| 5 | Agente (terminal) | IA con herramientas y validación | Completo, repetible, evaluado |
| 6 | GitHub Actions | Pipeline | Automático en cada cambio |

## Plan B rápido

| Si falla… | Usa… |
|---|---|
| El chat de algún alumno (E1-E3) | Proyectar tu propio chat y que sigan contigo |
| La tabla del E3 | La tabla guardada por el docente |
| Copilot no está activo (E4) | El JSON y el spec de referencia del repo: `data/` y `tests/ui/` |
| La clave del modelo (E5) | Trabajar en parejas con quien sí tenga clave, u Ollama local |
| GitHub Actions (E6) | Mostrar capturas o un video grabado de una ejecución previa |
