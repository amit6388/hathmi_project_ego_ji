const multer=require("multer")
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./assets/admin/course_upload')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
});
var fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/jpg' || file.mimetype==='image/png'){
        cb(null,true)
    }else{
        cb(null,false)
    }
}
var event_upload=multer({
    storage:storage,
    

})
module.exports=event_upload;