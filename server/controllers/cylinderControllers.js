const Cylinder = require("../models/cylinder");

exports.addCylinder = async (req,res)=>{
    try{
        const {name,cylinderType,cost} = req.body ;
        const found = await Cylinder.findOne({name,cylinderType});
        if(found){
            return res.status(403).json({
                success:false,
                message:"cylinder already registered"
            })
        }
        const cylinder =await Cylinder.create({name,cylinderType,cost}) ;
        if(!cylinder){
            return res.status(403).json({
                success:false,
                message:"error while creating cylinder"
            })
        }

       return res.status(200).json({
            success:true,
            cylinder,
            message:"cylinder created successfully"
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"got an error :"+err ,
        })
    }
}

exports.deleteCylinder = async (req,res)=>{
    try{
        const {name,cylinderType} = req.body ;
        const cylinder = await Cylinder.findOneAndDelete({name,cylinderType});
        
        if(!cylinder){
            return res.status(403).json({
                success:false,
                message:"cylinder not found"
            })
        }

        res.status(200).json({
            success:true,
            cylinder,
            message:"cylinder deleted successfully"
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"got an error :"+err ,
        })
    }
}

exports.updateCylinder = async (req,res)=>{
    try{
        const {name,cylinderType,cost} = req.body ;
        const cylinder = await Cylinder.findOneAndUpdate({name,cylinderType},{cost});
        
        if(!cylinder){
            return res.status(403).json({
                success:false,
                message:"cylinder not found"
            })
        }

        res.status(200).json({
            success:true,
            cylinder,
            message:"cylinder updated successfully"
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"got an error :"+err ,
        })
    }
}