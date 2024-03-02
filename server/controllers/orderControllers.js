const Order = require("../models/order") 
const Client = require("../models/client")
const Cylinder = require("../models/cylinder")

exports.addOrder = async (req,res)=>{
    try{
        const {items,phoneNo,cost} = req.body ;
        // console.log(items) ;
        const client = await Client.findOne({phoneNo}) ;
        if(!client){
            return res.status(403).json({
                success:false,
                message:"client not found"
            })
        }
        // console.log(client) ;
        // const isupdate =await Client.findOneAndUpdate({_id:client._id},{$push:{"pending_orders":}})
        let arr = []  ;
        for (item of items) {
            console.log(item);
            const cylinder = await Cylinder.findOne({_id:item._id}) ;
            if(!cylinder){
                return res.status(403).json({
                    success:false,
                    message:"cylinder not found"
                })
            }
            console.log("test")
            arr.push({cylinder:cylinder._id,count:item.count}) ;

        }
        // console.log("arr:",arr) ;
        // arr = items.map(async(item)=>{
        let date = new Date();
        let time = `${date.getHours()}` + ":"+ `${date.getMinutes()}` ;
        const order =await Order.create({date:new Date().toISOString(),time:time,items:arr,client:client._id,cost}) ;

        if(order){
            try{
                const isvalid = await Client.findOneAndUpdate({_id:client._id},{$push:{"pending_orders":order._id}});
                console.log(isvalid) ;
            }catch(err){
                return res.status(403).json({
                    success:false,
                    message:"error while updating client:",err
                })
            }
           
          if(!order){

              return res.status(403).json({
                  success:false,
                  message:"error while creating order"
                })
            }
        
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
//-----------------------------pending --------------------------------------------
exports.getOrder = async (req,res)=>{
    try{
        let {startDate,endDate,_id} = req.body ;
        console.log(req.body)
        if(_id){
            console.log(_id) ;
            const order = await Order.findOne({_id:_id});
        if(!order){
            return res.status(403).json({
                success:false,
                message:"order not found"
            })
        }
        console.log(order)
        res.status(200).json({
            success:true,
            order,
            message:"order  successfully"
        })
    }
    else{
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        console.log(startDate);
        console.log(endDate);
        const orderList = await Order.find({
                "date": { $gte: startDate, $lte: endDate }
        });
        if(!orderList){
            return res.status(403).json({
                success:false,
                message:"order not found"
            })
        }
        console.log(orderList)
        res.status(200).json({
            success:true,
            orderList,
            message:"order  successfully"
        })
    }
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