# Datos de prueba sintéticos

**Sesión:** S07, S12

```text
Genera datos de prueba sintéticos para {entidad} con este esquema: {esquema}.
- 10 registros válidos variados (incluye valores límite válidos).
- 10 inválidos, uno por regla violada, indicando qué regla rompe.
- Incluye unicode, emojis, espacios, cadenas largas e intentos de inyección.
Nunca uses datos reales de personas. Formato: JSON array con campo "_motivo".
```

## Notas de uso
- Reemplazar las variables `{…}` con contexto real (sin datos sensibles).
- Ejecutar 2-3 veces y comparar; validar siempre la salida.
