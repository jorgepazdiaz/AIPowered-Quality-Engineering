# HU-CART-03 · Cantidad de productos y cupón en el carrito

**Como** cliente de Toolshop
**quiero** elegir la cantidad de cada producto y aplicar un cupón
**para** comprar lo que necesito pagando menos.

## Reglas de negocio
1. La cantidad por producto debe estar entre **1 y 99** unidades (números enteros).
2. El cupón solo se aplica si el **subtotal es de al menos 50.00 USD** (montos con 2 decimales).
3. El código de cupón tiene entre **6 y 12 caracteres** alfanuméricos.

## Criterios de aceptación
- Si la cantidad está fuera de rango, se muestra "Cantidad no válida" y no se agrega al carrito.
- Si el subtotal es menor al mínimo, se muestra "Monto mínimo para cupón: 50.00 USD".
- Si el código no tiene la longitud correcta, se muestra "Código de cupón no válido".
