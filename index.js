const express=require('express');
const app=express();
const bodyParser=require("body-parser")
const cors=require('cors')
const PORT=process.env.PORT || 5000;
const   adminRouter=require('./Routers/admin/adminRouter')
const  StudentRoute=require('./Routers/students/StudentRoute');
app.use(bodyParser.json());
app.use(express.json())
app.use(cors()
        ) ;
require('./config/config');
//require('./tables/tables')
app.use("/api",adminRouter);
app.use('/api',StudentRoute);
app.use("/coursepic", express.static("./assets/admin/course_upload"));
app.listen(PORT, () => {
    console.log("your server is running at  this :" + PORT)
}) 