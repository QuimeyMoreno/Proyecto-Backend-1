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
        deleteButton.style.marginLeft = '10px'; 
        deleteButton.onclick = () => {
            socket.emit('deleteProduct', product._id);  
        };

        li.appendChild(deleteButton);
        productsList.appendChild(li);
    });
});


document.getElementById('productForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const newProduct = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        status: true,
        thumbnails: "", 
    };

    socket.emit('createProduct', newProduct);
});
