const mongoose = require("mongoose");
const Student_RegisterSchema = new mongoose.Schema({
    regno:{
        type:Number,
       // required:true
    },
    name:{
        type:String,
       // required:true
    },
    fname:{
        type:String,
      //  required:true
    },
    address:{
        type:String,
       // required:true
    },
    contact:{
        type:Number,
      //  required:true
    },
    email:{
        type:String,
       // required:true
    },
    gender:{
        type:String,
       // required:true
    }, 
    dob:{
        type:String,
       // required:true
    },
    admdate:{
        type:String,
       // required:true
    },
   
    refby:{
        type:String,
       // required:false
    },
    
});


module.exports = mongoose.model('Student_Register',Student_RegisterSchema);
 