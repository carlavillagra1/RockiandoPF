const ProductManager = require("./productManager")
const productManager = new ProductManager("./src/Productos.json")
const express = require("express");
const app = express()
const port = 8080
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/products', async(req,res) =>{
    try {
        const productsArray = await productManager.readProducts()
        const limit = parseInt(req.query.limit)
        if(limit){
            const arrayLimit = productsArray.splice(0, limit)
            return res.send(arrayLimit)
        }
        else{
            res.send(productsArray)
        }
        
    } catch (error) {
        res.status(404).json({message: "No se encontraron los productos"})
        
    }
})

app.get('/products/:id', async(req,res) =>{
    try {
        const produId = parseInt(req.params.id)
        const pFound = await productManager.getProductById(produId)
        if(produId){
            return res.send(pFound)
        }
    } catch (error) {
        res.status(404).json({message: "No se encontro el producto"})
    
    }

}
)
app.listen(port, () =>
    console.log(`server running on port ${port}`))
    