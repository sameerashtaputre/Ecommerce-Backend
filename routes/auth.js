const express = require('express');
const {  Login, register,Logout, registerAdmin } = require('../controllers/authcontroller');

const  router = express.Router();

router.post('/register',register)
router.post('/login',Login)
router.post('/logout',Logout)
router.post('/registerAdmin',registerAdmin)

module.exports=router;