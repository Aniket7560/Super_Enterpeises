
const Admin = require("../models/admin") ;
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken") ;

exports.loginController = async (req,res)=>{
    try{
        //extract info from req body
        const  {email,password } = req.body ;

        //validation
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"details are missing"
            })
        }

        //check is mail is registered or not 
        let admin = await Admin.findOne({email}) ;
        if(!admin){
            return res.status(401).json({
                success:false,
                message:"user not found",
            })
        }
        //check password
        const isvalid = await bcrypt.compare(password,admin.password);
        console.log(isvalid);
        if(!isvalid){
            return res.status(500).json({
                success:false,
                message:"invalid credentials"
            })
        }
        //generate token
        //set payload
        const payload = {
            email:admin.email ,
            id:admin._id ,
            name:admin.name
        }

        const token = jwt.sign(payload,process.env.SECRET_KEY,{
            expiresIn:"2hr",
        })

        admin = admin.toObject() ;
        admin.password = undefined ;
        admin.token = token ;
        //send res
        res.status(200).json({
            success:true,
            admin
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"got an error"+err ,
        })
    }
}