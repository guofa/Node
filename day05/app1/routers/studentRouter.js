var express=require("express");
var bodyParser=require("body-parser");

var studentRouter=express.Router();
studentRouter.get("/findById",function(req,resp){
	resp.send("通过id查找学生");
});
studentRouter.get("/findByName",function(req,resp){
	resp.send("通过name查找学生");				
});

module.exports=studentRouter;
