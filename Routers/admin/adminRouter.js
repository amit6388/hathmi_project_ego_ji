   
const express=require("express");
const Router=express.Router();
const {
   createInstructor,
   getInstructor,
   getCourse,
   createCourse,
   putCourse, 
   deleteCourse,
   deleteInstructor,
   createEnquiry,
   getEnquiry,
   deleteEnquiry,
   createExpense,
   getExpense,
   deleteExpense,
   createEvent,
   getEvent,
   getSinglrEvent,
   deleteEvent,
   putEvent,  
 }=require('../../controllers/admin/AdminController')
const course_upload=require('../../multer/admin/course_upload')
const event_upload=require("../../multer/admin/events_upload")
const Expense_Attach=require("../../multer/admin/Expense_Attach")
Router.route('/event').post(event_upload.single('banner'),createEvent);
Router.route('/event').get(getEvent);
Router.route('/event/:id').get(getSinglrEvent);
Router.route('/event/:id').delete(deleteEvent);
Router.route('/event/:id').put(event_upload.single('banner'),putEvent);

Router.route('/course').post(course_upload.single('img'),createCourse);
Router.route('/course').get(getCourse);
Router.route('/course/:_id').delete(deleteCourse);
Router.route('/course/:_id').put(course_upload.single('img'),putCourse);
Router.route('/instructor').post(createInstructor);
Router.route('/instructor').get(getInstructor);
Router.route('/instructor/:contact').delete(deleteInstructor);

Router.route('/enquiry').post(createEnquiry);
Router.route('/enquiry').get(getEnquiry);
Router.route('/enquiry/:contact').delete(deleteEnquiry);
Router.route('/expense').post(Expense_Attach.single("Attach_Document"),createExpense);
Router.route('/expense').get(getExpense);
Router.route('/expense/:contact').delete(deleteExpense);
   module.exports=Router;