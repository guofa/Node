var express=require("express");
var bodyParser=require("body-parser");
var url=require("url");
var querystring=require("querystring");

var app=express();
app.use(bodyParser.urlencoded({extended:true}));

var studentRouter=express.Router();
studentRouter.get("/findById",function(req,resp){
    //resp.send("通过id查找学生");				
	var obj=url.parse(req.url);
	var params=querystring.parse(obj.query);
	console.log(params);
	resp.write(JSON.stringify(req.query));
	resp.end();
});
studentRouter.get("/findByName",function(req,resp){
	resp.send("通过名字查找学生");				
});
app.use("/student",studentRouter);
app.listen(3000,function(){
	console.log("端口号为3000的服务已经开启...");				
});
