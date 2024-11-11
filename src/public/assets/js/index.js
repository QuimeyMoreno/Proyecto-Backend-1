const socket = io();

socket.emit('getProducts');

socket.on('updateProducts', (products) => {
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';

    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.title} - ${product.price}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.onclick = () => {
            socket.emit('deleteProduct', product._id, userRole);
        };

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Actualizar';
        updateButton.onclick = () => {
            const updatedFields = {
                title: prompt('Nuevo título:', product.title),
                price: parseFloat(prompt('Nuevo precio:', product.price))
            };
            socket.emit('updateProduct', product._id, updatedFields, userRole);
        };

        li.appendChild(updateButton);
        li.appendChild(deleteButton);
        productsList.appendChild(li);
    });
});


const userRole = 'admin'; 

document.getElementById('productForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const newProduct = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        status: true,
        thumbnails: ""
    };

    socket.emit('createProduct', newProduct, userRole);
});

socket.on('errorMessage', (message) => {
    alert(message); // Muestra un mensaje si no tiene permiso
});