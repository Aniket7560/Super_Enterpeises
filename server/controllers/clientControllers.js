const Client = require("../models/client") ;


exports.addClient = async (req,res)=>{
    try{
        const {name,phoneNo,address} = req.body ;
        const found = await Client.findOne({phoneNo});
        if(found){
            return res.status(403).json({
                success:false,
                message:"phone no already registered"
            })
        }
        const client =await Client.create({name,phoneNo,address}) ;
        if(!client){
            return res.status(403).json({
                success:false,
                message:"error while creating client"
            })
        }

        res.status(200).json({
            success:true,
            client,
            message:"client created successfully"
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"got an error :"+err ,
        })
    }
}

exports.deleteClient = async (req,res)=>{
    try{
        const {name,phoneNo} = req.body ;
        const client = await Client.findOneAndDelete({name,phoneNo});
        
        if(!client){
            return res.status(403).json({
                success:false,
                message:"client not found"
            })
        }

        res.status(200).json({
            success:true,
            client,
            message:"client deleted successfully"
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"got an error :"+err ,
        })
    }
}

exports.updateClient = async (req,res)=>{
    try{
        const {name,phoneNo,newPhone,address} = req.body ;
        const client = await Client.findOneAndUpdate({phoneNo},{name,address,phoneNo:newPhone});
        
        if(!client){
            return res.status(403).json({
                success:false,
                message:"client not found"
            })
        }

        res.status(200).json({
            success:true,
            client,
            message:"client updated successfully"
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"got an error :"+err ,
        })
    }
}