const con = require("../../config/config")
const Functions=require('../../library/functions')
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const createSt = async (req, resp, next) => {
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
    let ml = date.getMilliseconds();
    let currentDate = `${year}${month}${day}${ml}`;
    let username = arr1 + currentDate;

    const sql = "SELECT * FROM students WHERE email =?";
    con.query(sql, email, function (err, result) {
      if (err == null)
        if (result.length > 0) {
          resp.status(404).json({
            code: 404,
            message: "user aleready exist....",
            data: [],
            error: false,
            status: false,
          });
        } else {

          let data =  {
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
          };
          con.query('INSERT INTO students SET ?', data, function (error, results, fields) {

            if (error) throw error;
            console.log(results.insertId);
            resp.status(200).json({
              code: 200,
              message: "user  Register successfully",
              error: false,
              data: results,
              status: true,
            });
          });

        }
    });


  } catch (err) {
    console.log(err);
  }
}
const getSt = async (req, res) => {
  con.query("SELECT * FROM students", function (err, result) {
    if (err) throw err;
    res.send(result);
  });

}
const getStudent = async (req, res) => {
  con.query("SELECT * FROM students WHERE email =?",req.params.email, function (err, result) {
   if(err==null){
    if (result.length>0) {
      res.status(200).json({
        code: 200,
        message: "user found successfully",
        data: { 
           
          name: result[0].name,
          email: result[0].email,
          contact: result[0].contact,
          bio: result[0].bio,
          skill: result[0].skill,
          profilePic: result[0].profilePic,
          dob: result[0].dob,
          regDate: result[0].regDate,
          username: result[0].username,
        },
        error: false,
        status: true,
      });
    } else {
      res.status(404).json({
        code: 404,
        message: "Invalid User details, Try Again.  ",
        data: [],
        error: false,
        status: false,
      });
    }
   }
  });

}
const putSt = async (req, res) => {
  try {

    let name = req.body.name;
    let password = req.body.password;
    let contact = req.body.contact;
    let skill = req.body.skill;
    let bio = req.body.bio;
    let dob = req.body.dob;

    const data = [
         name , 
          contact ,
          password , 
          skill ,
          bio , 
          dob ,
      req.params.email
    ]
    con.query("UPDATE students set  name=?, contact=?,password=?,skill=?,bio=?,dob=?  WHERE email=?", data, (err, result) => {
      if (err == null) {
        res.send(result);
      }
    })


  } catch (err) {
    console.log(err)
  }

}
const loginStudent = async (req, res) => {
  const data=[
    req.body.email,
    req.body.password
  ]
  con.query("SELECT * FROM students WHERE email =? AND password=?",data, function (err, result) {
   if(err==null){
    if (result.length>0) {
      res.status(200).json({
        code: 200,
        message: "user found successfully",
        data: { 
           
          name: result[0].name,
          email: result[0].email,
          contact: result[0].contact,
          bio: result[0].bio,
          skill: result[0].skill,
          profilePic: result[0].profilePic,
          dob: result[0].dob,
          regDate: result[0].regDate,
          username: result[0].username,
        },
        error: false,
        status: true,
      });
    } else {
      res.status(404).json({
        code: 404,
        message: "Invalid User details, Try Again.  ",
        data: [],
        error: false,
        status: false,
      });
    }
   }
  });

}
const userProfilePic = (req, res) => {
  try { 
  let profilePic = req.file.filename;  
    const data = [                  
      profilePic,    
     req.params.email 
    ] 
   let a=   con.query("UPDATE students SET profilePic=? WHERE email=? ", data, (err, result) => {
      if (err == null) {
        res.send(result);
      }
    }) 
console.log(a)
 
  } catch (err) {
    console.log(err)
  } 
}
const userProfileEdit = (req, res) => {
  try { 
    let name = req.body.name;
    let password = req.body.password;
    let contact = req.body.contact;
    let skill = req.body.skill;
    let bio = req.body.bio;
    let dob = req.body.dob;
    const data = [                  
       name, 
       contact,
       password, 
          skill,
        bio, 
      dob  ,
     req.params.email 
    ] 
   let a=   con.query("UPDATE students SET name=?,contact=?,password=?,skill=?,bio=?,dob=? WHERE email=? ", data, (err, result) => {
      if (err == null) {
        res.send(result);
      }
    }) 
console.log(a)
 
  } catch (err) {
    console.log(err)
  } 
}
 const forgetPassword=  (req, res) => {
  try{
   const email=req.body.email;
   const sql = "SELECT * FROM students WHERE email =?";
   con.query(sql, email, function (err, result) {
     if (err == null)
       if (result.length > 0) {
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
          const data1 = [                  
            token,    
            email
          ] 
           con.query("UPDATE students SET token=? WHERE email=? ", data1, (err, result) => {
            if (err == null) {
              res.status(200).json({
                code: 200,
                status: true,
                message: "Mail Sent Successully !!",
                error: false,
                data: {
                  messageInfo: log,
                  sendTimestamp: timeStamp,
                       
                }
              });
           
    
            }
          })
           
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
       } else {

        res.send("Something went Wrong ! Email not found")

       }
   });
  
   }catch(err){
   console.log(err)
  }
 
 };
const userchangepassword = (req, res) => {
  try { 
  
    let password = req.body.password;
    
    const data = [  
       password  ,
     req.params.token 
    ] 
   let a=   con.query("UPDATE students SET password=?  WHERE token=? ", data, (err, result) => {
      if (err == null) {
        res.send(result);
      }
    }) 
console.log(a)
 
  } catch (err) {
    console.log(err)
  } 
}
const delSt = async (req, res) => {
  try {
    console.log(req.params)
    con.query(" DELETE FROM students  WHERE  email =?", req.params.email, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  } catch (err) {
    console.log(err)

  }

} 
module.exports = {
   createSt, getSt, putSt,forgetPassword,userchangepassword, delSt,userProfileEdit ,userProfilePic,getStudent
,loginStudent   
  }







 