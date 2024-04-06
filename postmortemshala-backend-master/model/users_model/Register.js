const mongoose = require("mongoose");
 
const Users_RegisterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

    contact:{
        type:Number,
        required:true
    },
    accept:{
        type:Boolean,
        required:false
    },
    skill:{
        type:String,
        required:false
    },
    bio:{
        type:String,
        required:false
    },
    token:{
        type:String,
    
    },
    profilePic:{
        type:String,
    
    },
});


module.exports = mongoose.model('Users_Register', Users_RegisterSchema);
 
 