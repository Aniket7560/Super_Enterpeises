const mongoose = require("mongoose") ;

const orderScheme = mongoose.Schema({
    date:{
        type:String ,
        required:true,
    },
    items:[
       {
         cylinder: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Cylinder",
            required:true 
          } ,
          count:{
            type:String,
            required:true ,
          }
       } 
    ],
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Client"
    },
    note:{
        type:String,
    }
})

module.exports = mongoose.model('Order',orderScheme) ;