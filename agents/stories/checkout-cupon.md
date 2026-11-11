# HU-CHK-07 · Aplicar cupón de descuento en el carrito

**Como** cliente registrado de Toolshop
**quiero** aplicar un cupón de descuento en el carrito
**para** pagar menos en mi compra.

## Reglas de negocio
1. El cupón debe existir, estar vigente (fecha actual entre inicio y fin) y no estar agotado.
2. El código es alfanumérico de 6 a 12 caracteres; no distingue mayúsculas.
3. Monto mínimo de compra: 50 USD antes de impuestos.
4. Un solo cupón por pedido.
5. Clientes en su primera compra reciben 10% adicional (máximo 2 descuentos acumulados).
6. Si se eliminan productos y el subtotal baja de 50 USD, el cupón se retira con un aviso.

## Criterios de aceptación
- Se muestra el descuento aplicado y el nuevo total.
- Cupones inválidos muestran un mensaje que indica el motivo.
