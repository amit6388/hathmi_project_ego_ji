const express = require("express");
const cors = require("cors");
const crypto = require('crypto');
const Functions = require('./library/functions');
const bodyParser=require('body-parser')
require("./config/config");
const Users_RegisterSchema = require("./model/users_model/Register");
const users_upload = require("./multer/users_multer/users_multer");
const Admin_RegisterSchema = require("./model/admin_model/Register");
const CoursesSchema = require("./model/course_model/Course");
const Enrolled_CoursesSchema = require("./model/users_model/EnrolledCourses")
const EnquirySchema = require("./model/common/contact");
const admin_upload = require("./multer/admin_multer/admin_multer");
const courses_upload = require("./multer/courses_multer/courses_multer");
const nodemailer = require("nodemailer");
//const Functions = require("./library/functions");
let PORT = process.env.PORT || 4500;
const app = express();
app.use(bodyParser.json())
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("assets/users_register"));
app.use("/uploadcourses", express.static("assets/courses"));

//******************START  Users Controller*********************************//
app.get('/ip', (req, res) => {
  const ipAddress =  req.socket.remoteAddress;
   res.send(`Your IP address is-> ${ipAddress}`);
  // res.send("oo")
});
app.post("/api/mail", (req, res) => {
 try{
  const email=req.body.email;
  const usermail =  Users_RegisterSchema.findOne({
    email: email, 
  });
  if(usermail){

   // const email = "amitpoly2020@gmail.com";
    //const _id=req.body._id;
    const _id = '464gdgr55654645645645'
  
    crypto.randomBytes(64, function (err, buffer) {
      let token = buffer.toString('hex');
      let timeStamp = Functions.getTimeStamp(Date.now());
        
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'amitpoly2020@gmail.com',
          pass: 'tnipzxxgahbeznwp'
        }
      }); 
      
      (() => {
  
        const mailOptions = {
          from: 'amitpoly2020@gmail.com', // sender 
          to: `${email}`, // list of receivers
          subject: `postmortemshala reset password link`,
          text: ``,
          html: "<p> click below, To Reset <a href='http://postmortemshala.co.in/reset/password/" + token + "'> click here,</a></p>"
        }
  
        const result = transporter
          .sendMail(mailOptions)
          .then((log) => {
            Users_RegisterSchema.updateOne(
              { email: req.body.email },
              { $set: { token: token}},{upsert:true}).then((result, err) => {
                 console.log("tocken add successully")
             })
            res.status(200).json({
              code: 200,
              status: true,
              message: "Mail Sent Successully !!",
              error: false,
              data: {
                messageInfo: log,
                sendTimestamp: timeStamp,
                token: token,
              }
            });
  
          })
          .catch((error) => {
            res.status(404).json({
              code: 404,
              status: false,
              message: "Mail Sent Error !!",
              error: error,
              data: []
            });
          });
  
      })(); 
    }); 
   
  }
  else{ 
    res.send("Something went Wrong ! Email not found")
  } 
  }catch(err){
  console.log(err)
 }

});

app.get("/api/users/:id", async (req, resp) => { 
  resp.header("Access-Control-Allow-Origin", "*");
  resp.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  try {
    const _id = req.params.id;
    const usermail = await Users_RegisterSchema.findOne({ _id: _id });
    if (usermail) {
      resp.status(200).json({
        code: 200,
        message: "user found successfully",
        data: {
          _id: usermail._id,
          name: usermail.name,
          email: usermail.email,
          contact: usermail.contact,
          bio: usermail.bio,
          skill: usermail.skill,
          profilePic: usermail.profilePic,
          dob: usermail.dob,
          regDate: usermail.regDate,
          username: usermail.username,
        },
        error: false,
        status: true,
      });
    } else {
      resp.status(404).json({
        code: 404,
        message: "Invalid User details, Try Again.  ",
        data: [],
        error: false,
        status: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/users", async (req, resp) => {
  try {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let contact = req.body.contact;
    let accept = req.body.accept;
    let skill = req.body.skill;
    let bio = req.body.bio;
    let profilePic = req.body.profilePic;
    let dob = req.body.dob;
    let regDate = req.body.regDate;
    const myArray = name.split(" ");
    const arr1 = myArray[0].toUpperCase();
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}${month}${day}`;
    let username = arr1 + currentDate;
    console.log(username);
    const usermail = await Users_RegisterSchema.findOne({ email: email });
    console.log(usermail);
    if (usermail) {
      resp.status(404).json({
        code: 404,
        message: "user aleready exist....  ",
        data: [],
        error: false,
        status: false,
      });
    } else {
      let data = new Users_RegisterSchema({
        name: name,
        email: email,
        contact: contact,
        password: password,
        accept: accept,
        skill: skill,
        bio: bio,
        profilePic: profilePic,
        dob: dob,
        regDate: regDate,
        username: username,
      });
      //  const token=await data.generatAuthToken()
      //    console.log(token)
      let result = await data.save();
      //resp.send(result);

      resp.status(200).json({
        code: 200,
        message: "user  Register successfully",

        error: false,
        status: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/users/login", async (req, resp) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const usermail = await Users_RegisterSchema.findOne({
      email: email,
      password: password,
    });
    if (usermail) {
      resp.status(200).json({
        code: 200,
        message: "user Login successfully",
        data: {
          _id: usermail._id,
          name: usermail.name,
          email: usermail.email,
          contact: usermail.contact,
        },
        error: false,
        status: true,
      });
      console.log(usermail._id);
    } else {
      resp.status(404).json({
        code: 404,
        message: "Invalid User details, Try Again.  ",
        data: [],
        error: false,
        status: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/users/", async (req, resp) => {
  let data = await Users_RegisterSchema.find();
  resp.send(data);
});

app.delete("api/users/:email", async (req, resp) => {
  try {
    console.log(req.params);
    let data = await Users_RegisterSchema.deleteOne(req.params);
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
});
app.put(
  "/api/userProfilePic/:_id",
  users_upload.single("profilePic"),
  async (req, resp) => {
    try {
      let profilePic = req.file.filename;
      let data = await Users_RegisterSchema.findByIdAndUpdate(
        req.params._id,
        {
          $set: {
            profilePic: profilePic,
          },
        },
        { new: true }
      );
      resp.send(data);
    } catch (error) {
      console.log(error);
    }
  }
);
app.put("/api/userchangepassword/:token",async (req, resp) => {
    try {
      let password = req.body.newpass ;
     const usermail= await Users_RegisterSchema.updateOne(
       {token: req.params.token},
        {
          $set: {
            password: password,
          },
        },
        
      );
      if (usermail) {
        resp.status(200).json({
          code: 200,
          massage: "password has been changed successfully..",
         
          error: false,
          status: true,
        });
      } else {
        console.log("Error Ocured !");
      }
    } catch (error) {
      console.log(error);
    }
  }
);
app.put("/api/users/:_id", async (req, resp) => {
  try {
    let name = req.body.name;
    let password = req.body.password;
    let contact = req.body.contact;
    let skill = req.body.skill;
    let bio = req.body.bio;
    let dob = req.body.dob;
    let data = await Users_RegisterSchema.findByIdAndUpdate(
      req.params._id,
      {
        $set: {
          name: name,

          contact: contact,
          password: password,

          skill: skill,
          bio: bio,
          profilePic: profilePic,
          dob: dob,
        },
      },
      { new: true }
    );
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/user/enroll", async (req, resp) => {
  try {
    let courseId = req.body.courseId;
    let userId = req.body.userId;
    let status = req.body.status;


    const usermail = await Enrolled_CoursesSchema.findOne({ courseId: courseId });
    console.log(usermail);
    if (usermail) {
      resp.status(404).json({
        code: 404,
        message: "You have aleready enrolled in this Course..  ",
        data: [],
        error: false,
        status: false,
      });
    } else {
      let data = new Enrolled_CoursesSchema({
        courseId: courseId,
        userId: userId,
        status: status
      });
      console.log(data)
      let result = await data.save();
      resp.status(200).json({
        code: 200,
        message: "Course enrolled successfully",

        error: false,
        status: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
});
app.get("/api/user/enroll/:_id", async (req, resp) => {
  try {
    const _id = req.params._id;

    const usermail = await Enrolled_CoursesSchema.aggregate([
          { 
            $match: { 
                userId:_id             
            } 
        },
        {$unwind : "$emp"},
      {    
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "emp"
        },
        

      }
      
    ]);
    //  const usermail1 = await CoursesSchema.aggregate([
    //    {
    //     $unionWith: "Enrolled_Courses",
 
    //  }
    // ]);

    resp.send(  usermail)

  } catch (err) {
    console.log(err);
  }
});

//******************START  Admin Controller*********************************//

app.post("/api/admin/", admin_upload.single("picture"), async (req, resp) => {
  try {
    let name = req.body.name;
    let email = req.body.email;
    let mobno = req.body.mobno;
    let password = req.body.password;
    let picture = req.file.filename;

    let data = new Admin_RegisterSchema({
      name: name,
      email: email,
      mobno: mobno,
      password: password,
      picture: picture,
    });
    let result = await data.save();
    console.log(result);
    resp.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/admin/login", async (req, resp) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const usermail = await Users_RegisterSchema.findOne({
      email: email,
      password: password,
    });
    if (usermail) {
      resp.status(200).json({
        code: 200,
        massage: "data found",
        data: `${email}`,
        error: false,
        status: true,
      });
    } else {
      console.log("please fill valid details.");
    }
  } catch (err) {
    console.log(err);
  }
});
app.get("/api/admin/", async (req, resp) => {
  let data = await Admin_RegisterSchema.find();

  resp.send(data);
});

app.delete("/api/admin/:email", async (req, resp) => {
  try {
    console.log(req.params);
    let data = await Admin_RegisterSchema.deleteOne(req.params);
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.put(
  "/api/admin/:email",
  admin_upload.single("picture"),
  async (req, resp) => {
    try {
      let name = req.body.name;
      let email = req.body.email;
      let mobno = req.body.mobno;
      let password = req.body.password;
      let picture = req.file.filename;

      console.log(req.params);
      let data = await Admin_RegisterSchema.updateOne(req.params, {
        $set: {
          name: name,
          email: email,
          mobno: mobno,
          password: password,
          picture: picture,
        },
      });
      resp.send(data);
    } catch (err) {
      console.log(err);
    }
  }
);

//******************START Course Controller*********************************//

app.post("/api/courses", courses_upload.single("img"), async (req, resp) => {
  try {
    let img = req.file.filename;
    let title = req.body.title;
    let desc = req.body.desc;
    let level = req.body.level;
    let lessons = req.body.lessons;
    let duration = req.body.duration;
    let price = req.body.price;
    let rating = req.body.rating;

    let data = new CoursesSchema({
      img,
      title,
      desc,
      level,
      lessons,
      duration,
      price,
      rating,
    });
    let result = await data.save();
    console.log(result);
    resp.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/courses", async (req, resp) => {
  try {
    const usermail = await CoursesSchema.find();
    resp.send(usermail);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/api/courses/:_id", async (req, resp) => {
  try {
    console.log(req.params);
    let data = await CoursesSchema.deleteOne(req.params);
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.put(
  "/api/courses/:_id",
  courses_upload.single("picture"),
  async (req, resp) => {
    try {
      let img = req.file.filename;
      let title = req.body.title;
      let desc = req.body.desc;
      let level = req.body.level;
      let lessons = req.body.lessons;
      let duration = req.body.duration;
      let price = req.body.price;
      let rating = req.body.rating;
      console.log(req.params);
      let data = await CoursesSchema.updateOne(req.params, {
        $set: {
          img,
          title,
          desc,
          level,
          lessons,
          duration,
          price,
          rating,
        },
      });
      resp.send(data);
    } catch (err) {
      console.log(err);
    }
  }
);

//******************START contact Controller*********************************//
app.post("/api/contact", async (req, resp) => {
  try {
    let name = req.body.name;
    let email = req.body.email;
    let msg = req.body.msg;
    console.log(req.body.name + req.body.email + req.body.msg);
    let data = new EnquirySchema({
      name,
      email,
      msg,
    });
    let result = await data.save();
    console.log(result);
    resp.send(result);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/contact", async (req, resp) => {
  try {
    const usermail = await EnquirySchema.find();
    resp.send(usermail);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(
    "server is running at   :" +
    PORT +
    ` 
connection successfully
    `
  );
});

//6390899942 mahagram////


