const express = require("express")
require("dotenv").config()

const app = express() ;

//midlewares
app.use(express.json())

//mounting
const adminroutes = require("./routes/adminRoutes") ;
const clientroutes = require("./routes/clientRoutes") ;
const cylinderroutes = require("./routes/cylinderRoutes") ;
const orderroutes = require("./routes/orderRoutes") ;
app.use('/api/v1',adminroutes) ;
app.use('/api/v1',clientroutes) ;
app.use('/api/v1',cylinderroutes) ;
app.use('/api/v1',orderroutes) ;
const PORT = process.env.PORT || 4000 ;
app.listen(PORT,(err)=>{
    if(err){
        console.log("got an error while listening : ") ;
    }
    else{
        console.log("app listing on port ",PORT) ;
    }
})

const dbconnect = require("./config/database") ;
dbconnect() ;

