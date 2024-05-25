const productModel = require("./models/product.model.js")
const cartsModel  = require("./models/carts.model.js")

class productManagerMongo {

    async createProduct(title, description, price, thumbnail, code, stock, category) {
        try {
            const create = await productModel.create({title, description, price, thumbnail, code, stock, category})
            return create
        } catch (error) {
            throw new Error("Error al crear el producto")
        }
    }

    async readProducts() {
        try {
            const products = await productModel.find().lean()
            return products
        } catch (error) {
            throw new Error("Error al leer los productos")

        }
    }

    async getProductById(id) {
        try {
            const productFound = await productModel.findById(id).lean()
            if (productFound) {
                return productFound
            }
        } catch (error) {
            throw new Error("Error al encontrar el producto")

        }
    }
    async updateProduct(id) {
        try {
            const productUpdate = await productModel.updateOne({_id: id})
            return productUpdate
        } catch (error) {
            throw new Error("Error al modificar el producto")

        }
    }
    async deleteProduct(id) {
        try {
            const productDelete = await productModel.deleteOne({_id: id})
            return productDelete
        } catch (error) {
            throw new Error("Error al eliminar el producto")
        }
    }

    async paginateProduct (page){
        try {
            const result = await productModel.paginate({}, { page, limit: 5, lean: true })
            return result
        } catch (error) {
            throw new Error("Error en paginate product")
        }
    }
}

module.exports = productManagerMongo