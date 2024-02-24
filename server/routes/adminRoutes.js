const express = require("express") ;

const router = express.Router() ;

const {loginController} = require("../controllers/adminControllers") ;
router.post('/login',loginController) ;

module.exports = router ;