import express from 'express';
import productRouter from './routes/products.router.js'

const app = express();
const PORT = 8080;
app.use(express.urlencoded({extended:true}));
app.use(express.json())

app.use('/api/products', productRouter)






app.listen(PORT, () =>{
    console.log(`Escuchando desde el puerto ${PORT}`)
})