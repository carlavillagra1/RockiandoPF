const express = require("express");

const router = express.Router()

const ProductManager = require("../productManager")

const productManager = new ProductManager("./src/Productos.json")

router.get('/products', async(req,res) =>{
    try {
        const productsArray = await productManager.readProducts()
        const limit = parseInt(req.query.limit)
        if(limit){
            const arrayLimit = productsArray.slice(0, limit)
            return res.json(arrayLimit)
        }
        else{
            res.json(productsArray)
        }
        
    } catch (error) {
        res.status(404).json({message: "No se encontraron los productos"})
        
    }
})

router.get('/products/:id', async(req,res) =>{
    try {
        const produId = parseInt(req.params.id)
        const pFound = await productManager.getProductById(produId)
        if(produId){
            return res.json(pFound)
        }
    } catch (error) {
        res.status(404).json({message: "No se encontro el producto"})
    
    }
})
router.post('/products', async(req,res) =>{
    try {
        const newP = req.body
        const productAdd = await productManager.addProduct(newP)
        res.json(productAdd)
    } catch (error) {
        res.status(404).json({message: "Error al agregar el producto"})
    }
})

router.put('/products/:id', async(req,res)=>{
    try {
        const prodId = parseInt(req.params.id)
        const producUpdate = await productManager.updateProduct(prodId, obj, campo, valor)
        if(prodId){
        return res.json(producUpdate)
    }
    } catch (error) {
        res.status(404).json({message: "No se pudo modificar el producto"})
    }
})
module.exports = router