console.log('home.js cargado correctamente'); // Log para verificar que el archivo se cargue

function addToCart(cartId, productId) {
    console.log(`Intentando agregar producto al carrito. CartID: ${cartId}, ProductID: ${productId}`); // Log para ver los IDs

    fetch('/api/cart/' + cartId + '/product/' + productId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: 1 }) // Cambia la cantidad si es necesario
    })
    .then(response => {
        console.log('Respuesta del servidor:', response.status); // Log para verificar la respuesta del servidor
        if (!response.ok) {
            throw new Error('Error al agregar producto al carrito');
        }
        return response.json();
    })
    .then(data => {
        console.log('Producto agregado exitosamente:', data); // Log para verificar que el producto fue agregado
        alert('Producto agregado al carrito');
        window.location.href = '/carts/' + data.cartId; // Redirige automáticamente al carrito
    })
    .catch(error => {
        console.error('Error en addToCart:', error); // Log de error
    });
}

// Hacer que la función esté disponible globalmente
window.addToCart = addToCart;
console.log('addToCart definido globalmente'); // Log para verificar si la función está disponible globalmente
