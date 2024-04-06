const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Enrolled_CoursesSchema = new mongoose.Schema({
   
 
  courseId: {
    type: mongoose.Schema.ObjectId,
    required: false,
  },
  userId: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("Enrolled_Courses", Enrolled_CoursesSchema);
