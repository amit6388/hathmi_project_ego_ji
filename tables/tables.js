 const con=require('../config/config')
// //table instructor
// let query = `CREATE TABLE  instructor 
// (   
// name VARCHAR(255),
//  address VARCHAR(255) NOT NULL ,
//  contact INT(255) NOT NULL PRIMARY KEY,
//  email VARCHAR(255) NOT NULL ,
//  gender VARCHAR(255) NOT NULL ,
//  dob VARCHAR(255) NOT NULL ,
//  qualification VARCHAR(255) NOT NULL ,
//  degree VARCHAR(255) NOT NULL ,
//  exp VARCHAR(255)  ,
//  exp1 VARCHAR(255)  ,
//  exp2 VARCHAR(255)  ,
//  exp3 VARCHAR(255) 
 
//  )`; 
//   con.query(query, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });

// ////table Course
// let query1 = `CREATE TABLE  Course 
// (  
// img VARCHAR(255) NOT NULL,
//  title VARCHAR(255) NOT NULL ,
//   dess VARCHAR(255) ,
//   level VARCHAR(255) NOT NULL,
//   lessons INT(255) NOT NULL,
//   duration INT(255) NOT NULL,
//  price VARCHAR(255) NOT NULL, 
//   rating VARCHAR(255) NOT NULL, 
//   exp1 VARCHAR(255)  ,
//  exp2 VARCHAR(255)  ,
//  exp3 VARCHAR(255)  
//  )`; 
//   con.query(query1, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });

// ////table  Enquiry
// let query3 = `CREATE TABLE  Enquiry 
// (  
//     name VARCHAR(255) NOT NULL,
// address VARCHAR(255) NOT NULL ,
// contact INT(255) NOT NULL PRIMARY KEY,
//      dob VARCHAR(255) NOT NULL,
//      epx_join INT(255) NOT NULL,
//     course VARCHAR(255) NOT NULL, 
//     email VARCHAR(255) NOT NULL,
//     gender VARCHAR(255) NOT NULL,
//      counseller VARCHAR(255) NOT NULL,
//      note VARCHAR(255) NOT NULL, 
//  exp1 VARCHAR(255)  ,
//  exp2 VARCHAR(255)  ,
//  exp3 VARCHAR(255)  
//  )`; 
//   con.query(query3, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
//  //table  EXpense
// let query2 = `CREATE TABLE  Expense 
// (   
// Expense_Head VARCHAR(255) NOT NULL,
// name VARCHAR(255) NOT NULL,
// Invoice_Number VARCHAR(255) NOT NULL PRIMARY KEY,
// date VARCHAR(255) NOT NULL,
// Amount INT(255) NOT NULL,
// Attach_Document VARCHAR(255) NOT NULL,
// Description VARCHAR(255) NOT NULL,
//  exp1 VARCHAR(255)  ,
//  exp2 VARCHAR(255)  ,
//  exp3 VARCHAR(255)  
//  )`; 
//   con.query(query2, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
    
// //   ////table   STudent
// let query4 = `CREATE TABLE  students 
// (    
//  name VARCHAR(255) NOT NULL,
//      email VARCHAR(255) NOT NULL PRIMARY KEY,
//      contact INT(255) NOT NULL ,
//      password VARCHAR(255) NOT NULL,
//      accept VARCHAR(255) NOT NULL ,
 
// skill VARCHAR(255) NOT NULL ,
// bio VARCHAR(255) NOT NULL , 
// profilePic VARCHAR(255) NOT NULL ,
// dob VARCHAR(255) NOT NULL ,
//  regDate VARCHAR(255) NOT NULL ,
//  username VARCHAR(255) NOT NULL ,  
//  exp1 VARCHAR(255)  ,
//  exp2 VARCHAR(255)  ,
//  exp3 VARCHAR(255)
  
//  )`; 
//   con.query(query4, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });