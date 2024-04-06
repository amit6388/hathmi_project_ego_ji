const mysql=require('mysql')
 const con=mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"postmortemshala_db"
 })
 con.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("DB connected successfully...")
    }
 })
 module.exports=con;