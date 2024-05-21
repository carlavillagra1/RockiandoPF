const express = require("express");

const router = express.Router()

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


        res.render("home", result );
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los productos: " + error.message });
    }
});

router.get('/chat', (req, res) => {
    res.render('chat', { style:'index.css'})
})

router.get('/realTimeProducts', (req, res) => {
    res.render("realTimeProducts", {})
})

router.get('/cart', async(req,res) =>{
    try {
        res.render("cart", {})
    } catch (error) {
        
    }
})


module.exports = router




