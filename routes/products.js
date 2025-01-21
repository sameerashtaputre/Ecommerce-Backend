//Product Routes:

//Product Routes:

//POST /api/products (Admin): Add a new product.
//GET /api/products: Get all products (with filters).
//GET /api/products/:id: Get a single product by ID.
//PUT /api/products/:id (Admin): Update a product.
//DELETE /api/products/:id (Admin): Delete a product.

const express=require('express');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');
const { getAllProducts, getProductById, updateProduct, deleteProduct, addProduct, upload } = require('../controllers/productcontroller');



const router=express.Router();

router.post('/addProduct', isAuthenticated, isAdmin, upload.single('image'),addProduct)
router.get('/',getAllProducts)
router.get('/:id',getProductById)
router.put('/:id',isAuthenticated,isAdmin,updateProduct)
router.delete('/:id',isAuthenticated,isAdmin,deleteProduct)

module.exports=router;