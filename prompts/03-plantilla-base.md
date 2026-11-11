# Plantilla base R-C-T-R-F

**Sesión:** S03

```text
# ROL
Eres un QA Engineer senior experto en {dominio}.
# CONTEXTO
Sistema: {descripcion}. Reglas de negocio: {reglas}. Usuarios: {usuarios}.
# TAREA
Diseña casos de prueba para {funcionalidad} aplicando {tecnicas}.
# RESTRICCIONES
- No inventes reglas: si falta información, lista preguntas.
- Máximo {n} casos, sin duplicados.
# FORMATO
Tabla: ID | Título | Precondición | Pasos | Datos | Resultado esperado | Técnica | Prioridad
```

## Notas de uso
- Reemplazar las variables `{…}` con contexto real (sin datos sensibles).
- Ejecutar 2-3 veces y comparar; validar siempre la salida.
