var http=require("http");

var server=http.createServer(function(req,resp){
	console.log("接收到请求了");				
})

server.listen(8888,function(){
	console.log("端口号为8888的服务已经开启...");				
})
