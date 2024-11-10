class ProductRepository{
    constructor(dao){
        this.dao = dao 
    }

    getProducts = async ({ filter = {}, ...options }) => {
        return await this.dao.get({ filter, ...options });
    };
    
    getProduct = async id => {
        return await this.dao.getBy(id);
    }
    createProduct = async data => {
        return await this.dao.create(data);
    }
    updateProducts = async (id, updateFields) => {
        return await this.dao.update(id, updateFields);
    }
    deleteProducts = async id => {
        return await this.dao.delete(id);
    }
}

export default ProductRepository;