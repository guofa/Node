var express=require("express");
var bodyParser=require("body-parser");

var app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,resp){
	resp.send("Welcome my app");				
});

app.get("/student",function(req,resp){
	console.log(req.query);
	resp.send("以下是学生信息");
});

app.post("/course",function(req,resp){
	console.log(req.body);
	resp.send("以下是课程信息");
});

app.listen(3000,function(){
	console.log("端口号为3000的服务已经开启...");				
});
