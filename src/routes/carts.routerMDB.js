const express = require("express");
const cartManagerMongo = require("../dao/cartsManagerMDB.js")
const cartManager = new cartManagerMongo ();

const router = express.Router()


router.get('/carts/:cid', async(req,res) =>{
    try {
        let { cid } = req.params
        const result = await cartManager.cartById(cid)
        res.send({result: "success", playload: result })
    } catch (error) {
        res.status(404).json({message: "No se encontro el carrito"})
    }
})

router.post('/', async (req, res) => {
    try {
        let {cid, products} = req.body
        const result = await cartManager.createCart({cid, products})
        res.send({ result: "success", playload: result })
    } catch (error) {
        res.status(404).json({message: "No se aregego el carrito"})

    }
})
router.delete("/carts/:cid/products/:pid ", (req, res) => {
    //deberá eliminar del carrito el producto seleccionado.
})

router.put("/carts/:cid", (req, res) => {
    // deberá actualizar el carrito con un arreglo de productos con el formato especificado anteriormente.
})

router.put("/carts/:cid/products/:pid", (req, res) => {
    // deberá actualizar la cantidad de un producto en el carrito.
})

router.delete("/carts/:cid", (req, res) => {
    // deberá eliminar los products del carrito seleccionado.
})
router.delete('/:cid', async(req,res) =>{
    try {
        let { cid } = req.params
        const result = await cartManager.deleteCart(cid)
        res.send({ result: "success", playload: result })
    } catch (error) {
        
    }
})
module.exports = router