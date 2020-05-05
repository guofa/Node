var express=require("express");
var studentDB=require("../db/studentDB");

var studentRouter=express.Router();
studentRouter.post("/login",function(req,resp){
	var body=req.body;
	resp.send(body);
});
studentRouter.post("/findAll",function(req,resp){
	studentDB.findAll(function(result){
		resp.send(JSON.stringify(result));
	});
});

module.exports=studentRouter;