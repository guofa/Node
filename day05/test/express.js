var express=require("express");

var app=express();
app.get('/student',function(req,resp){
	resp.send("以下是所有学生信息");				
});
app.listen(3000,function(){
	console.log("端口号为3000的服务已经开启...");				
});
