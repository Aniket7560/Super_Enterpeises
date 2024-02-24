const mongoose = require("mongoose") ;

const cylinderScheme = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    cylinderType:{
        type:String,
        required:true,
    },
    cost:{
        type:String,
        required:true ,
    }
})

module.exports = mongoose.model('Cylinder',cylinderScheme) ;