const express = require("express");
const router = express.Router() ;

const {addClient}  = require("../controllers/clientControllers")
const {deleteClient}  = require("../controllers/clientControllers")
const {updateClient}  = require("../controllers/clientControllers")

const {auth} = require("../middlewares/auth")
router.post("/add/client",auth,addClient);
router.post("/delete/client",auth,deleteClient);
router.post("/update/client",auth,updateClient);

module.exports = router ;