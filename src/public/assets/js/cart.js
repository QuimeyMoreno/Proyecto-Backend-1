function removeFromCart(cartId, productId) {
    console.log(`Intentando eliminar producto. CartID: ${cartId}, ProductID: ${productId}`);

    fetch(`/api/cart/${cartId}/product/${productId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar producto del carrito');
        }
        return response.json();
    })
    .then(data => {
        alert('Producto eliminado del carrito');
        // Eliminar el producto del DOM
        const productElement = document.getElementById(`product-${productId}`);
        if (productElement) {
            productElement.remove();
        }
    })
    .catch(error => {
        console.error('Error en removeFromCart:', error);
    });
}