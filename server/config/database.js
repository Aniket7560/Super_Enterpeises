const mongoose = require("mongoose") ;

const dbconnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("connection to db successful");
    }).catch((err)=>{
        console.log("got an error : ",err);
    })
}

module.exports = dbconnect ;