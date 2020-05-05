var http=require("http");
var url=require("url");

var server=http.createServer(function(req,resp){
	var pathname=url.parse(req.url).pathname;
    var method=req.method;
	resp.writeHead(200,'ok',{
		'Content-type':'text/plain;charset=utf-8',
		'Access-Contro-Allow-Origin':'*'
	});
	switch(pathname){
		case '/student':
			resp.write("以下是所有学生信息");
			resp.end();
		break;
		case '/teacher':
			resp.write("以下是所有教师信息");
			resp.end();
		break;
		case '/course':
			resp.write("以下是所有课程信息");
			resp.end();
		break;
	    default:
			resp.write("请求出错啦");
			resp.end();
	}
});

server.listen(8888,function(){
	console.log("端口号为8888的服务已经开启...");				
})
