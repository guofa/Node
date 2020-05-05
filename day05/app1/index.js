var express=require("express");
var bodyParser=require("body-parser");
var studentRouter=require("./routers/studentRouter");

var app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use("/student",studentRouter);

app.listen(3000,function(){
	console.log("端口号为3000的服务已经开启...");				
});
