const cartsModel  = require("./models/carts.model.js")

class cartManagerMongo{
    
    async createCart(){
        try {
            const cart = await cartsModel.create({cid, products})
            return cart
        } catch (error) {
            throw new Error("Error al crear carrito")
        }

    }
    async readCarts(){
        try {
            const carts = await cartsModel.find()
            return carts
        } catch (error) {
            throw new Error("Error al leer los carritos")
        }
    }
    async cartById(cid){
        try {
            const cartID = await cartsModel.findById(cid) 
            return cartID
        } catch (error) {
            throw new Error("Error al encontrar el carrito")
        }
    }
    async deleteCart (cid){
        try {
            const cartDelete = await cartsModel.deleteOne(cid) 
            return cartDelete
        } catch (error) {
            throw new Error("Error al eliminar el carrito")
        }
    }

}

module.exports = cartManagerMongo