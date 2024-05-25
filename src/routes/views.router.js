const express = require("express");
const router = express.Router()
const cartManagerMongo = require("../dao/cartsManagerMDB");
const cartManager = new cartManagerMongo(); 
const productManagerMongo = require("../dao/productManagerMDB.js");
const productManager = new productManagerMongo();

router.get('/home', async (req, res) => {
    try {
        let page = parseInt(req.query.page, 5);
        if (isNaN(page) || page < 1) page = 1;

        const result = await productManager.paginateProduct(page);
        result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/views/home?page=${result.prevPage}` : '';
        result.nextLink = result.hasNextPage ? `http://localhost:8080/api/views/home?page=${result.nextPage}` : '';
        result.isValid = !(page <= 0 || page > result.totalPages);


        res.render("home", {result, style:'index.css' });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los productos: " + error.message });
    }
});
router.get('/productDetail/:id', async(req,res) =>{
    try {
        const {id} = req.params
        const product = await productManager.getProductById(id)
        if(product)
        res.render('productDetail', { product, style: 'index.css'})
    } catch (error) {
        res.status(404).send('Producto no encontrado');
    }
})
router.get('/chat', (req, res) => {
    res.render('chat', { style:'index.css'})
})

router.get('/realTimeProducts', (req, res) => {
    res.render("realTimeProducts", {})
})


router.get('/cart', async(req,res) =>{
    try {
        const {cid} = '6650dacf751e5e5f87b268c7'
        const cart = await cartManager.cartFindOne(cid)
        if (!cart) {
            return res.render('cart', { cart: { products: [] } });
        }
        res.render('cart', { cart });
    } catch (error) {
        console.error(error)
        res.status(500).send('Error al obtener el carrito');
    }
}) 

module.exports = router




