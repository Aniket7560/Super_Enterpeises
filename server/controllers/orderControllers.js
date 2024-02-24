const Order = require("../models/order") 
const Client = require("../models/client")
exports.addOrder = async (req,res)=>{
    try{
        const {items,clientPhone} = req.body ;
        // const found = await Order.findOne({name,orderType});
        // if(found){
        //     return res.status(403).json({
        //         success:false,
        //         message:"order already registered"
        //     })
        // }
        console.log(items) ;
        const client = await Client.findOne({phoneNo:clientPhone}) ;
        if(!client){
            return res.status(403).json({
                success:false,
                message:"client not found"
            })
        }
        console.log(client) ;
        let arr = []  ;
        for (item of items) {
            console.log(item);
            const cylinder = await cylinder.findOne({name:item.name,cylinderType:item.type}) ;
            if(!cylinder){
                return res.status(403).json({
                    success:false,
                    message:"cylinder not found"
                })
            }
            console.log("test")
            arr.append({cylinder:cylinder._id,count:item.count}) ;

        }
        console.log("arr:",arr) ;
        // arr = items.map(async(item)=>{
           
        const order =await Order.create({date:Date.now(),items:arr,client:client._id}) ;
        if(!order){
            return res.status(403).json({
                success:false,
                message:"error while creating order"
            })
        }

       return res.status(200).json({
            success:true,
            order,
            message:"order created successfully"
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"got an error :"+err ,
        })
    }
}

exports.deleteOrder = async (req,res)=>{
    try{
        const {name,orderType} = req.body ;
        const order = await Order.findOneAndDelete({name,orderType});
        
        if(!order){
            return res.status(403).json({
                success:false,
                message:"order not found"
            })
        }

        res.status(200).json({
            success:true,
            order,
            message:"order deleted successfully"
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"got an error :"+err ,
        })
    }
}

exports.updateOrder = async (req,res)=>{
    try{
        const {name,orderType,cost} = req.body ;
        const order = await Order.findOneAndUpdate({name,orderType},{cost});
        
        if(!order){
            return res.status(403).json({
                success:false,
                message:"order not found"
            })
        }

        res.status(200).json({
            success:true,
            order,
            message:"order updated successfully"
        })

    }catch(err){
        res.status(500).json({
            success:false,
            message:"got an error :"+err ,
        })
    }
}