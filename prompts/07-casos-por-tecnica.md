# Casos de prueba por técnica (con auto-revisión)

**Sesión:** S07

```text
Rol: QA Engineer experto en diseño de pruebas.
Requisito: {historia_y_reglas}
Técnica(s) a aplicar: {EP | BVA | tabla de decisión | transición de estados | pairwise | escenarios}

Paso 1. Modela la técnica (particiones y límites / tabla / diagrama Mermaid de estados).
Paso 2. Deriva los casos a partir del modelo, uno por partición/regla/transición.
Paso 3. Revisa tu salida como auditor: duplicados, particiones o límites faltantes,
        resultados esperados que sean suposiciones.
Paso 4. Entrega la versión final + lista de supuestos a validar con el PO.
Formato: ID | Título | Técnica | Precondición | Pasos | Datos | Esperado | Prioridad | HU | Riesgo
```

## Notas de uso
- Reemplazar las variables `{…}` con contexto real (sin datos sensibles).
- Ejecutar 2-3 veces y comparar; validar siempre la salida.
