import productModel from "../../models/products.model.js";

class ProductManagerMongo {
    constructor(){
        this.model = productModel;
    }


    getProducts = async ({ filter = {}, limit = 10, page = 1, sortOption = {} } = {}) => {
        try {
            const options = {
                page,
                limit,
                sort: sortOption,  
                lean: true          
            };
            
            const products = await this.model.paginate(filter, options);  
            return products;  
        } catch (error) {
            console.log("Error al traer productos con paginación", error);
            throw error;
        }
    }
    
    


    getProductById = async (id) =>{
        try {
            const foundProduct = await this.model.findById(id);

            if(!foundProduct){
                console.log("¡Producto no encontrado!")
                return null;
            }

            console.log("¡Producto Encontrado");
            return foundProduct;
        } catch (error) {
            console.log("Error, no se pudo encontrar el producto por ID.", error);
        }
    }

    createProduct = async ({title, description, price, code, stock, status, thumbnails }) => {
        try {
            if(!title || !description || !price || !code || !stock || !status){
                console.log("Debe completar todos los campos!");
                return
            }

            //Corroborar que no exista un producto con el mismo code 
            const codeExists = await this.model.findOne({code: code})

            if(codeExists){
                console.log("Este código ya existe");
                return;
            }

            const newProduct = new this.model({
                title,
                description,
                price,
                code,
                stock,
                status: true,
                thumbnails
            })

            await newProduct.save();
            console.log("¡Producto creado exitosamente!");
            return newProduct;

        } catch (error) {
            console.log("Error al crear el producto", error);
        }
    }

    updateProduct = async (id, updateFields) =>{
        try {
            const update = await this.model.findByIdAndUpdate(id, updateFields);

            if(!update){
                console.log("No se encuentra el producto a actualizar")
                return null;
            }

            return update;

        } catch (error) {
            console.log("No se pudo actulizar el producto", error);
        }
    }

    deleteProduct = async (id) =>{
        try {
            const deleteProduct = await this.model.findByIdAndDelete(id);

            if(!deleteProduct){
                console.log("No se puede borrar el producto");
                return null;
            }

            return deleteProduct;

        } catch (error) {
             console.log("Hay un error al eliminar el producto", error);
        }
    }

}

export default ProductManagerMongo;