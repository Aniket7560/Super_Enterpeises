const express = require("express");
const router = express.Router() ;

const {addCylinder,getCylinder}  = require("../controllers/cylinderControllers")
const {deleteCylinder}  = require("../controllers/cylinderControllers")
const {updateCylinder}  = require("../controllers/cylinderControllers")

const {auth} = require("../middlewares/auth")
router.post("/add/cylinder",auth,addCylinder);
router.get("/getcylinder",auth,getCylinder);
router.post("/delete/cylinder",auth,deleteCylinder);
router.post("/update/cylinder",auth,updateCylinder);

module.exports = router ;