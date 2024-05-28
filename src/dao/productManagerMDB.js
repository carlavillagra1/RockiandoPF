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
            const productFound = await productModel.findById(id);
            if (productFound) {
                return productFound;
            } else {
                throw new Error("El producto no pudo ser encontrado");
            }
        } catch (error) {
            throw new Error("Error al encontrar el producto: " + error.message);
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
        async paginateProduct({ page = 1, limit = 5, sort = '', query = '', categoria = '' }) {
            try {
                const match = {};
                if (categoria) {
                    match.category = categoria;
                }
                if (query) {
                    match.title = { $regex: query, $options: 'i' }; 
                }
                const sortOption = sort ? { price: sort === 'desc' ? -1 : 1 } : {};
                
                // Verificamos si hay filtros aplicados
                if (Object.keys(match).length === 0) {
                    // No hay filtros aplicados, devolvemos todos los productos
                    const result = await productModel.paginate({}, {
                        page,
                        limit,
                        sort: sortOption,
                        lean: true
                    });
                    return result;
                } else {
                    // Hay filtros aplicados, realizamos la consulta con los filtros
                    const result = await productModel.paginate(match, {
                        page,
                        limit,
                        sort: sortOption,
                        lean: true
                    });
                    return result;
                }
            } catch (error) {
                throw new Error("Error en paginate product");
            }
        }
    
    

    async filterCategory({ categoria, limit = 10, page = 1, sort, query }) {
        try {
            const match = { category: categoria };
            if (query) {
                match.title = { $regex: query, $options: 'i' }; 
            }
            const sortOrder = sort === 'desc' ? -1 : 1;
            const skip = (page - 1) * limit;
            // Realizar la búsqueda con agregación
            const categorias = await productModel.aggregate([
                { $match: match },
                { $sort: { price: sortOrder } },
                { $skip: skip },
                { $limit: parseInt(limit) }
            ]);
    
            // Contar el total de documentos para la paginación
            const totalDocs = await productModel.countDocuments(match);
            const totalPages = Math.ceil(totalDocs / limit);
    
            // Construir los enlaces de paginación
            const prevLink = page > 1 ? `http://localhost:8080/api/views/home?page=${hasPrevPage}&limit=${limit}&sort=${sort}&query=${query}&categoria=${categoria}` : '';
            const nextLink = page < totalPages ? `http://localhost:8080/api/views/home?page=${hasNextPage}&limit=${limit}&sort=${sort}&query=${query}&categoria=${categoria}` : '';
            // Devolver los resultados
            return {
                docs: categorias,
                totalDocs,
                limit,
                page,
                totalPages,
                hasPrevPage: page > 1,
                hasNextPage: page < totalPages,
                prevLink,
                nextLink
            };
        } catch (error) {
            throw new Error("Error en filtrar por categorías");
        }
    }
    

}

module.exports = productManagerMongo