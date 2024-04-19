const fs = require('fs').promises

class Carts {
    constructor(cartPath){
        this.carts = [],
        this.cartPath = this.cartPath
    }
    async createCart(carts){
        try {
            await fs.writeFile(this.cartPath, JSON.stringify(carts, null, 2))
        } catch (error) {
            throw new Error("Error al actualizar")
        }
    }

    
}
