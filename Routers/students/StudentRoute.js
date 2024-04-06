   
const express=require("express");
const Router=express.Router();
const users_upload=require('../../multer/users_multer/users_multer')
const {
   createSt,
   getSt,
   putSt,
   delSt,
   userProfileEdit,
   userchangepassword,
   forgetPassword, 
   userProfilePic,
   getStudent,
   loginStudent
}=require('../../controllers/students/StudentController')

Router.route('/students').post(createSt);
Router.route('/students').get(getSt);
Router.route('/students/:email').get(getStudent);
Router.route('/studentlogin').post(loginStudent);

Router.route('/students/:email').put(putSt);
Router.route('/students/:email').delete(delSt);
Router.route('/userProfilePic/:email').put(users_upload.single("profilePic"),userProfilePic);
Router.route('/student/:email').put(userProfileEdit);
Router.route('/mail').post(forgetPassword);
Router.route('userchangepassword/:token').put(userchangepassword);
 


   module.exports=Router;