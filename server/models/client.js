const mongoose = require("mongoose") ;

const clientScheme = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    },
    phoneNo:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    pending_orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        }
    ],
    pending_payment:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        }
    ],
    completed:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        }
    ]
})

module.exports = mongoose.model('client',clientScheme) ;