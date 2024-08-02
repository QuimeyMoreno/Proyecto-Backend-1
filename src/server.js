import express from 'express';
import productRouter from './routes/products.router.js'
import cartRouter from './routes/carts.router.js'

const app = express();
const PORT = 8080;
app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)






app.listen(PORT, () =>{
    console.log(`Escuchando desde el puerto ${PORT}`)
})