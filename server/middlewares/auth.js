const Admin = require("../models/admin")
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.auth = async (req,res,next)=>{
    //extract token
    let token ;
    if(req.header("Authorization")){
         token = req.header("Authorization").replace("Bearer ","") ;
    }
    console.log(token) ;
    if(!token){
        return res.status(403).json({
            success:false ,
            message:"token not found",
        })
    }
    //decrypt
    try{
        const payload  =  jwt.verify(token,process.env.SECRET_KEY) ;
        console.log(payload) ;
        // const admin  =await Admin.findOne({email:payload.email}) ;
        // if(!admin)
        // {
        //     return res.status(403).json({
        //         success:false,
        //         message:"got an error "
        //     })
        // }
        next() ;
    }catch(err){
       return res.status(500).json({
        success:false,
        message:"got error "+err
       })
    }

}