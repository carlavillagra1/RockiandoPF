const fs = require('fs').promises

class Carts {
    constructor(cartPath) {
        this.carts = [],
            this.cartPath = cartPath
    }
    async createCart(carts) {
        try {
            await fs.writeFile(this.cartPath, JSON.stringify(carts, null, 2))
        } catch (error) {
            throw new Error("Error al actualizar")
        }
    }

    async addToCart(cart, products) {
        try {
        if(!this.validCart(cart)){
            throw new Error("No es valido")
        }
            const carts = await this.readCart()
        /*    if(this.productIncrement(cart.id, products)){
            const quanity = products.length + 1
            return quanity
            } */

        cart.id = carts.length > 0 ? carts[carts.length  -1].id + 1 : 1;
        carts.push(cart)
        await this.createCart(carts)
        return cart
        } catch (error) {
            throw error
        }
    }
    validCart(cart){
        return(
            cart.products = []
        )
    }
    /*
    productIncrement( id, products){
        return products.find((product) => product.id === id)
    } */

    async readCart (){
        try {
            const dataCart = await fs.readFile(this.cartPath, 'utf8')
            return JSON.parse(dataCart)
        } catch (error) {
            console.error("Error al consultar carritos")
            if(error.code === 'ENOENT'){
                await fs.writeFile(this.cartPath, JSON.stringify([],null,2))
                return []
            }
            else{
                throw error
            }
        }
    }
}

module.exports = Carts

//Agregar eventos
const cartclass = new Carts("Carrito.json")

cartclass.addToCart({})