const mongoose = require("mongoose");
 
const Pay_Schema = new mongoose.Schema({
    date:{
        type:Number,
        required:true
    },
     month:{
        type:Number,
        required:true
    },
     year:{
        type:Number,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
     description:{
        type:String,
        required:true
    }
   
   
}); 

module.exports = mongoose.model('pay_user',Pay_Schema);
 