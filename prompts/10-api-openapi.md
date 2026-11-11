# Casos y tests de API desde OpenAPI

**Sesión:** S12

```text
Te paso el fragmento OpenAPI del endpoint {metodo} {ruta}: {spec}

1. Matriz de casos: campo × partición (válido, vacío, tipo erróneo, límite, formato).
2. Para cada caso: payload JSON y status esperado.
3. Marca qué status son SUPUESTOS porque el spec no los documenta.
4. Agrega casos de autenticación (sin token, token inválido) y autorización (otro usuario).
5. Genera los tests en Playwright TypeScript (fixture request, data-driven con for...of).
```

## Notas de uso
- Reemplazar las variables `{…}` con contexto real (sin datos sensibles).
- Ejecutar 2-3 veces y comparar; validar siempre la salida.
