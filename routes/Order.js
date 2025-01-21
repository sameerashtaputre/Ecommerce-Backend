const express=require('express');
const { isAuthenticated, isAdmin } = require('../middlewares/authMiddleware');
const { createOrder, getUserOrders } = require('../controllers/ordercontroller');



const router=express.Router();


router.post('/',isAuthenticated,isAdmin,createOrder)
// Route for getting all orders of the logged-in user
router.get('/',isAuthenticated,getUserOrders)


// Route for getting a specific order by ID (Admin only)
router.get('/:id',isAuthenticated,isAdmin,getUserOrders)//Admin only


module.exports=router;