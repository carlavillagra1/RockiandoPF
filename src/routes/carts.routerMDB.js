const express = require("express");
const cartManagerMongo = require("../dao/cartsManagerMDB.js");
const cartManager = new cartManagerMongo();

const router = express.Router()


router.get('/:cid', async (req, res) => {
    try {
        let { cid } = req.params;
        const result = await cartManager.cartById(cid);
        console.log("Carrito encontrado:", JSON.stringify(result, null, 2)); 
        res.send({ result: "success", payload: result });
    } catch (error) {
        res.status(404).json({ message: "No se encontró el carrito" });
    }
});

router.post('/:cid/product/:id', async (req, res) => {
    const { cid, id } = req.params;
    try {
        const cart = await cartManager.cartFindOne(cid);
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }
        const existingProductIndex = cart.products.findIndex(p => p.product.toString() === id);
        if (existingProductIndex >= 0) {
            cart.products[existingProductIndex].quantity += 1;
        } else {
            cart.products.push({ product: id, quantity: 1 });
        }
        await cart.save();
        res.redirect('/cart');
        res.send({ result :"success", cart });
    } catch (error) {
        res.status(500).json({ message: "Error al agregar el producto al carrito", error });
    }
});


router.post('/', async (req, res) => {
    try {
        const { products = [], total = 0 } = req.body;
        const cart = await cartManager.createCart(products, total);
        res.send({ result: 'success', payload: cart });
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: "Error al crear el carrito", error });
    }
});
router.delete("/:cid/products/:pid ", (req, res) => {
    //deberá eliminar del carrito el producto seleccionado.
    try {

    } catch (error) {

        
    }
})

router.put("/:cid/products/:pid", (req, res) => {
    // deberá actualizar la cantidad de un producto en el carrito.
})

router.delete("/:cid", (req, res) => {
    // deberá eliminar los products del carrito seleccionado.
})

module.exports = router