 
const con=require('../../config/config')  
const createCourse= async(req,resp)=>{
  try { 
    let img = req.file.filename;
    let title = req.body.title;
    let dess = req.body.dess;
    let level = req.body.level;
    let lessons = req.body.lessons;
    let duration = req.body.duration;
    let price = req.body.price;
    let rating = req.body.rating;

    const sql = "SELECT * FROM Course WHERE title =?";
         con.query(sql, title, function (err, result) {
           if (err == null)
             if (result.length > 0) {
               resp.status(404).json({
                 code: 404,
                 message: "Course aleready exist....",
                 data: [],
                 error: false,
                 status: false,
               });
             } else {
     
              const data = {
                img,
                title,
                dess,
                level,
                lessons,
                duration,
                price,
                rating, 
              }
               con.query('INSERT INTO Course SET ?', data, function (error, results, fields) {
     
                 if (error) throw error;
                 console.log(results.insertId);
                 resp.status(200).json({
                   code: 200,
                   message: "Course  Register successfully",
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
const getCourse=async(req,res)=>{
  con.query("SELECT * FROM course", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
}

 const deleteCourse= async (req, res) => {
  try {
    con.query("DELETE FROM Course  WHERE title =?", req.params.title, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
}
const putCourse = async (req, res) => {
  try {

    let img = req.file.filename;
    let title = req.body.title;
    let dess = req.body.dess;
    let level = req.body.level;
    let lessons = req.body.lessons;
    let duration = req.body.duration;
    let price = req.body.price;
    let rating = req.body.rating;
   const title1=req.params.title;
    const data = [
        img,
        title,
        dess,
        level,
        lessons,
        duration,
        price,
        rating,
        title1
    ]
    con.query(`UPDATE Course set img=?,title=?,dess=?,level=?,lessons=?,duration=?,price=?,rating=? WHERE title=?`, data, (err, result) => {
      if (err == null) {
        res.send(result);
      }
    })

 
 
  } catch (err) {
    console.log(err)
  }

} 
const createInstructor=async(req,resp)=>{
    try { 
        
        const name=req.body.name; 
    const address=req.body.address; 
       const contact=req.body.contact;
       const email=req.body.email;
        const gender=req.body.gender;
         const dob=req.body.dob;
         const qualification=req.body.qualification;
       const degree=req.body.degree;
       const exp=req.body.exp;
   
         const sql = "SELECT * FROM Instructor WHERE contact =?";
         con.query(sql, contact, function (err, result) {
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
     
              const data={ 
                name, 
                address,
                contact,
                email,
                gender,
                dob,
                qualification,
                degree,
                exp
                   }
               con.query('INSERT INTO Instructor SET ?', data, function (error, results, fields) {
     
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

const getInstructor=async(req,res)=>{
  con.query("SELECT * FROM Instructor", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
}

const deleteInstructor= async (req, resp) => {
  try {
    con.query("SELECT * FROM Instructor  WHERE contact =?", req.params.contact, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
}

const createEnquiry=async(req,resp)=>{
  try { 
      
   const {name,fname,address,  dob, epx_join,course,contact, email,gender, counseller, note}=req.body;
   const data= {name,fname,address,  dob, epx_join,course,contact, email,gender, counseller, note}
   con.query('INSERT INTO Enquiry SET ?', data, function (error, results, fields) {

    if (error) throw error;
    console.log(results.insertId);
    resp.status(200).json({
      code: 200,
      message: "Enquiry  Register successfully",
      error: false,
      data: results,
      status: true,
    });
  });
      
      
   } catch (err) {
     console.log(err);
   }
}

const getEnquiry=async(req,res)=>{

  con.query("SELECT * FROM Enquiry", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
}
const deleteEnquiry= async (req, res) => {
  try {
    con.query("SELECT * FROM Enquiry  WHERE contact =?", req.params.contact, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
}
const createExpense=async(req,resp)=>{
  try { 
      
      const Expense_Head=req.body.Expense_Head;
    
  const name=req.body.name; 
     const Invoice_Number=req.body.Invoice_Number;
     const date=req.body.date;
      const Amount=req.body.Amount;
       const Attach_Document=req.file.filename;
       const Description=req.body.Description;
 const data={  
  Expense_Head,
  name,
  Invoice_Number,
  date,
  Amount,
  Attach_Document,
  Description
   }
   con.query('INSERT INTO Expense SET ?', data, function (error, results, fields) {

    if (error) throw error;
    console.log(results.insertId);
    resp.status(200).json({
      code: 200,
      message: "Enquiry  Register successfully",
      error: false,
      data: results,
      status: true,
    });
  });
      
       
     
   } catch (err) {
     console.log(err);
   }
}

const getExpense=async(req,res)=>{

  con.query("SELECT * FROM Expense", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
}

const deleteExpense= async (req, resp) => {
try {
  con.query("SELECT * FROM Expense  WHERE Invoice_Number =?", req.params.Invoice_Number, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
} catch (err) {
  console.log(err);
}
}

const createEvent= async(req,resp)=>{
  try { 
    let banner = req.file.filename;
         const {title,des,date,time,link}=req.body 
              const data ={title,des,date,time,link,banner}
               con.query('INSERT INTO event SET ?', data, function (error, results, fields) {
     
                 if (error) throw error;
                 console.log(results.insertId);
                 resp.status(200).json({
                   code: 200,
                   message: "Event created successfully",
                   error: false,
                   data: results,
                   status: true,
                 });
               }); 
       
   } catch (err) {
     console.log(err);
   }
}
const getEvent=async(req,res)=>{
  con.query("SELECT * FROM event", function (err, result) {
    if (err) throw err;
    res.send(result);
  });
}
const getSinglrEvent=async(req,res)=>{
  con.query("SELECT * FROM course WHERE id=?",req.params.id, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
}

 const deleteEvent= async (req, res) => {
  try {
    con.query("DELETE FROM event  WHERE id =?", req.params.id, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
}
const putEvent = async (req, res) => {
  try {

    let banner = req.file.filename;
    const {title,des,date,time,link}=req.body ;
    let data=[ title,des,date,time,link,banner,req.params.id]
    con.query(`UPDATE event set title=?,des=?,date=?,time=?,link=?,banner=? WHERE id=?`, data, (err, result) => {
      if (err == null) {
        res.send(result);
      }
    })

 
 
  } catch (err) {
    console.log(err)
  }

} 
module.exports={
  createInstructor, 
  getInstructor,
  createCourse,
  getCourse,
  createEvent,
  getEvent,
  getSinglrEvent,
  deleteEvent,
  deleteEvent,
  putEvent,
  deleteCourse,
  putCourse,
  deleteInstructor,
  createEnquiry,
  getEnquiry,
  deleteEnquiry,
  createExpense,
  getExpense,
  deleteExpense
  
}