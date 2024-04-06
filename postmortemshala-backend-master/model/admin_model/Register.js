const mongoose = require("mongoose");
const Admin_RegisterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobno:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },

  
    picture:{
        type:String,
        required:true
    } 
});


module.exports = mongoose.model('Admin_Register', Admin_RegisterSchema);
 