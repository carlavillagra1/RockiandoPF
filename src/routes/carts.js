const express = require("express");

const router = express.Router()

const Carts = require("../cartsClass")

const cartclass = new Carts("./src/Carrito.json")

const ProductManager = require("../productManager")

const productManager = new ProductManager("./src/Productos,json")


router.get('/:id', async(req,res) =>{
    try {
        const cartsArray = await cartclass.readCart()
        res.json(cartsArray)
        
    } catch (error) {
        res.status(404).json({message: "No se encontro el carrito"})
    }

})
router.post('/', async(req,res) =>{
    try {
        const addCart = await cartclass.addToCart()
        res.json(addCart)
    } catch (error) {
        res.status(404).json({message: "Error al agregar un carrito"})
    
    }
})

router.post('/:id/product/:pid', async(req,res) =>{
    try {
        const  productList = await productManager.readProducts()
        const cartID = (req.params.id)
        const addProduCart = await cartclass.addToCart(productList)
        res.json(addProduCart(cartID))
        
    } catch (error) {
        
    }

})














module.exports = router