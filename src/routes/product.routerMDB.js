const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers.js');
const { isAuthenticated, isNotAuthenticated, isAdmin, isUser  } = require('../public/js/auth.js'); 

// Middleware para validar la entrada en la creación y actualización de productos
function validateProduct(req, res, next) {
    const { title, description, price, thumbnail, code, stock } = req.body;
    if (!title || !description || !price || !thumbnail || !code || !stock) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    next();
}
router.post('/', isAuthenticated, isAdmin, productController.createProduct);
router.get('/', isAuthenticated, isUser, productController.getAllProducts);
router.get('/:id', isAuthenticated, isUser, productController.getProductById);
router.put('/:id', isAuthenticated, isAdmin, productController.updateProduct);
router.delete('/:id',isAuthenticated, isAdmin, productController.deleteProduct);
router.get('/paginate', isAuthenticated, isUser, productController.paginateProducts);
router.get('/filtrar/:categoria', isAuthenticated, isUser,  productController.filterByCategory);

module.exports = router;