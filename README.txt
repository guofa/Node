Node.js学习笔记
第一章：Node的基础核心模块
1.Node介绍
	Node叫NodeJS或Node.JS,Node是一个JavaScript运行环境。实际上它是对Google V8引擎进行了封装。官网介绍node:一个搭建在ChromeJavaScript运行
时上的平台，用于构建高速可伸缩的网络程序。
	目前Node在实际开发中主要作为基础环境而存在。
2.Node使用
	1）运行js脚本,如node demo.js
	2）Node的REPL环境(read、eval、print、loop)
		读取、计算、输出、循环，可以直接运行各种js命令
3.模块化
	每个文件是一个模块，有自己的作用域，模块内的变量是私有的
	要想使用全局变量，必须使用global来定义
	如果想在多个文件分享变量，必须定义为 global 对象的属性。
	global.warning = true; 
	CommonJS 规范规定，每个模块内部， module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports ）是对外的接口。加载
某个模块，其实是加载该模块的 module.exports 属性。
	Node 内部提供一个 Module 构建函数。所有模块都是 Module 的实例。每个模块内部，都有一个 module 对象，代表当前模块。它有以下属性:
  module.id 模块的识别符，通常是带有绝对路径的模块文件名。
  module.filename 模块的文件名，带有绝对路径。
  module.loaded 返回一个布尔值，表示模块是否已经完成加载。
  module.parent 返回一个对象，表示调用该模块的模块。
  module.children 返回一个数组，表示该模块要用到的其他模块。
  module.exports 表示模块对外输出的值。
	模块交互
		定义模块：
			example.js
			var sayHello=function(){
				console.log("hello");
			}
			module.exports.sayHello=sayHello;//将定义好的模块暴露出来
		加载模块：
			var example=require('./example.js');//加载暴露出来的模块
			example.sayHello();//调用模块
			module.exports.sayHi=sayHi;//将指针sayHi赋给变量sayHi
		    module.exports.a=a;
		简洁写法：
			module.exports={
				sayHi:sayHi,
				a:a
			}
		注：对象的属性名不会被当做变量去解析
4.Node的作用
	1)作为基础开发环境存在
	2)引用了模块化机制(commonJS)，改变了传统js开发模式 
	3)用于构建服务器端程序
	4)模块化机制
	核心模块
		path模块：用于处理文件与目录的路径
			若有一个文件路径名：/home/guofa/a.txt
			var path=require("path");
			path.basename();//该方法返回参数路径的最后一部分，即：a.txt
			path.dirname();//该方法返回文件的目录名，即：/home/guofa
			path.extname();//该方法返回文件的扩展名，即：.txt
			path.isAbsolute();//该方法判断文件路径名是否是一个绝对路径，返回值为true或false
			path.join();//用于路径的拼接
				如：var basepath="http://localhost:8080";
					var sonpath="courses/findById";
					console.log(path.join(basepath,sonpath));
					//http:/localhost:8080/courses/findById
			另外：
				__filename:指向当前运行的脚本文件名
				__dirname:指向当前运行的脚本文件所在目录
		querystring模块：用于解析与格式化url查询字符串
			var querystring=require("querystring");
			var str="id=1001&name=java";
			var str2=querystring.parse(str);//将查询字符串转换为对象
					querystring.stringify(str2);//将对象转换为查询字符串
		url模块：用于url处理与解析
			var url=require("url");
			var urlObj=url.parse();//将url地址转换为对象
			urlObj.pathname;//获取查询路径的名称，如：/students/findAll
			urlObj.query;//获取查询字符串，如：id=1001&name=java
---------------------------------------------------------------------------------
第二章：服务器编程（http模块）
简介：
	Node内置的HTTP功能使得它非常适合用来开发web程序，Node的核心是一个强大的流式http
解析器，大概由1500行经过优化的c代码组成，由Node的作者写的，这个解析器跟Node开发给JavaScript的底层TCP-API相结合，提供了一个非常底层但是非常灵活的HTTP服务器。
1.加载HTTP模块
	var http=require("http");
2.创建HTTP服务器
	var server=http.createServer(function(req,resp){});
	服务器每次接收到http请求后都会调用这个回调函数。这个回调函数函数接收两个参数，第
一个参数为http.IncomingMessage对象，此处代表一个客户端请求，第二个参数为http.ServerR
esponse对象，代表一个服务器端的响应对象。整个函数的返回值为被创建的服务器对象。
3.设置监听
	server.listen(port,...);
4.事件
	HTTP 服务器接收到的客户端请求时调用的回调函数中的第一个参数值为一个
http.IncomingMessage 对象，该对象用于读取客户端请求流中的数据，因此，当从客
户端请求流中读取到新的数据时触发 data 事件，当读取完客户端请求流中的数据时触
发 end 事件
	1）data
	当接受到消息体中的一部分时候发出 data 事件
	2)end
	每次完全接受完消息后都会触发一次
5.属性
	1）req.method
	代表客户端向服务器端发送请求的方式，"GET"/"POST"
	2)req.url
	表示客户端发送请求时使用的 URL 参数字符串，例如 "/","/post/new/?
	param=value"
	3)req.headers
	表示客户端返回发送的请求对象，其中存放了客户端发送的所有请求头信息，包
	括各种 cookie 信息以及浏览器的各种信息
	4)req.pause()
	暂停此 request 触发事件，对于控制上传非常有用
	5)req.resume()
	恢复一个暂停的 request
6.回应客户端请求
	createServer 回调函数的第二个参数，由 HTTP 服务器内部创建的
	1)response.end([data][,encoding]):结束响应
		这个方法会告诉服务器此响应的所有报文头以及报文体已经发出，服务器在此调用后认
	为这条信息已经发送完毕，这个方法必须对每个响应调用一次。如果指定的data参数，相当
	于调用了response.write(data,encoding); 然后跟着调用了response.end();
	2)response.write(chunk[,encoding]):发送响应内容
		chunk 可以是一个字符串或者一个 buffer, 如果 chunk 
	是一个字符串，则第二个参数指定如何将这个字符串编码成字节流，默认编码为 "utf-8"
	3)response.writeHead(statusCode[,reasonPhrase,][headers]);
		statusCode 用于指定一个三位的 HTTP 状态码 , 例如 404
		reasonPhrase 字符串，用于指定该状态码的描述信息
		headers 对象，用于指定服务器端创建的响应头对象
例如：
1.加载http模块
	var http=require("http");
	var url=require("url");
2.创建http服务
	var server=http.createServer(function(req,resp){
		req.url//发送请求时的路径
		var pathname=url.parse(req.url).pathname;//获取pathname
		var method=req.method;//获取发送请求的方式（get、post）
		resp.writeHead(200,'ok',{
			"Content-type":"text/plain;charset=utf-8",
			'Access-Control-Allow-Origin':'*'
		});//编写回应头信息
		switch(pathname){
			case '/students':
				resp.write("以下是所有学生信息");
				resp.end();
			break;
			case '/courses':
				resp.write("以下是所有课程信息");
				resp.end();
			break;
			default:
				resp.write("请求出错");
				resp.end();
		}
	});
3.设置监听
	server.listen(8080,function(){
		console.log("端口号为8080的服务已经开启");
	})
字符大，字节的组成单位更小      
//以post方式提交数据，每一个请求体到来都会调用data事件
//data：请求体的内容会作为一个形式参数传进来
//'data':代表着有一个数据的的到来或有一个请求体的到来
req.on('data',function(data){  
	})
req.on('end',function(){	
})
var file=new Buffer(0) //创建一个字节类型的变量
--------------------------------------------------------------------------
第三章：第三方模块——mysql模块
1.mysql
	安装：npm install mysql
	基本使用：
		加载mysql模块
			var mysql=require("mysql");
		创建连接对象
			var connection=mysql.createConnection({
				host:'192.168.145.200',
				port:'3306',
				database:'test',
				user:'test',
				password:'test'
			});
		进行数据库连接
			connection.connect();
		执行查询
			var sql="select * from students";
			connection.query(sql,function(err,results){
				if(err){
					throw err;
				}else{
					console.log(results);
				}
			});
		关闭连接
			connection.end();//end是关闭连接对象较为优雅的一种方式
			connection.destory();
例如：
//1.加载MySQL模块
var mysql=require('mysql');
//2.创建连接对象
var connection=mysql.createConnection({
	host:'192.168.254.1',
	port:'3306',
	database:'test',
	user:'test',
	password:'test'
});
//3.进行数据库链接
connection.connect();
//4.执行查询
var sql="select * from student";
connection.query(sql,function(err,results){
	if(err){
		throw err;
	}else{
		console.log(results);
	}
});
//5.关闭连接对象
connection.end();
2.连接池：使用连接池管理所有连接，这样可以方便共享单个连接
  1 //1.加载MySQL模块
  2 var mysql=require('mysql');
  3 //2.创建链接池
  4 var pool=mysql.createPool({
  5         host:'192.168.254.1',
  6         port:'3306',
  7         database:'test',
  8         user:'test',
  9         password:'test'
 10 });
 11 //3.从连接池中获取链接对象
 12 pool.getConnection(function(err,connection){
 13         if(err){
 14                 throw err;
 15         }else{
 16                 var sql="select * from teacher";
 17                 connection.query(sql,function(err,results){
 18                         if(err){
 19                                 throw err;
 20                         }else{
 21                                 console.log(results);
 22                         }
 23                         //释放链接对象到链接池中
 24                         connection.release();
 25                         //关闭连接池
 26                         pool.end();
 27                 });
	创建数据库连接池
	vim pool.js
		var mysql=require("mysql");
		var pool=global.pool;//先从全局查找pool
		if(!pool){//如果pool不存在，则先创建pool
			pool=mysql.createPool({
				host:'192.168.145.200',
				port:'3306',
				database:'test',
				user:'test',
				password:'test'
			});
			golbal.pool=pool;
		}
		module.exports=pool;
	创建学生数据库，从数据库中获取数据
	vim studentDB.js
  1 var pool=require('./pool');
  2 //console.log(pool);
  3 //录入学生信息
  4 function save(student,handler){
  5         pool.getConnection(function(err,conn){
  6                 if(err){
  7                 throw err;
  8                 }else{
  9                 var sql='insert into student values(null,?,?,?,?);';
 10                 conn.query(sql,[
 11                         student.name,
 12                         student.gender,
 13                         student.birth,
 14                         student.clazz_id
 15                         ],function(err,result){
 16                         if(err){
 17                                 throw err;
 18                         }else{
 19                         handler(result);
 20                         }
 21                 conn.release();
 22                         });
 23                 }
 24         });
 25 }
 26 
 27 //查询所有学生信息
 28 　function findAll(handler){
 29         pool.getConnection(function(err,conn){
 30                 if(err){
 31                         throw err;
 32                 }else{
 33                 var sql='select * from student';
 34                 conn.query(sql,function(err,results){
 35                         if(err){
 36                                 throw err;
 37                         }else{
 38                                 handler.call(this,results);      
 39                         }
 40                         //释放连接对象
 41                         conn.release();
 42                         });
 43                 }
 44         });
 45 }
 46 //根据id删除学生信息
 47 function deleteById(id,handler){
 48         pool.getConnection(function(err,conn){
 49                 if(err){
 50                         throw err;
 51                 }else{
 52                 var sql='delete from student where id=?';
 53                 conn.query(sql,[id],function(err,results){
 54                         if(err){
 55                                 throw err;
 56                         }else{
 57                                 handler(results);
 58                         }
 59                         conn.release();
 60                 });
 61          }
 62     });
 63 }
 64 //根据id查询学生信息
 65 function findById(id,handler){
 66         pool.getConnection(function(err,conn){
 67                 if(err){
 68                         throw err;
 69                 }else{
 70                 var sql='select * from student where id=?';
 71                         conn.query(sql,[id],function(err,results){
 72                 if(err){
 73                         throw err;
 74                 }else{
 75                         handler.call(this,results);
 76                 }
 77                 conn.release();
 78 });
 79                 }
 80         });
 81 
 82 
 83 }
 84 //修改学生信息
 85 
 86 module.exports={
 87         save:save,
 88         findAll:findAll,
 89         findById:findById,
 90         deleteById:deleteById
 91 }
打印获取数据
 1 var studentDB=require('./db/studentDB');
  2 /*studentDB.findAll(function(results){
  3         console.log(results);
  4 })*/
  5 /*
  6 studentDB.findById(2,function(results){
  7         console.log(results);
  8 
  9 });*/
 10 /*
 11 
 12 studentDB.deleteById(1,function(result){
 13         console.log(result);
 14 });*/
 15 var student={
 16         name:'新来的',
 17         gender:'男',
 18         birth:'1996-09-21',
 19         clazz_id:3
 20 
 21 }
 22 studentDB.save(student,function(result){
 23         console.log(result);
 24         })
--------------------------------------------------------------------------
第四章：服务器编程（express模块），其实express是对http模块的封装
1.介绍
	虽然可以使用 Node 开发一个高性能的服务器应用程序，但是 Node 中只是提供了大
量底层的功能，为了让开发者更快，更方便的开发出一个完整的应用程序， Node 社
区以及 Node 的官方包网站（ https://npmjs.org ）提供了各种可用于实现高端功能的
开发包，其中很多开发包本身已经实现了一个完整的开发框架。 Express 就是基础框
架其中之一。 Express 是一个可以在 Node.js 中使用的 MVC 框架，该框架现在已经
得到了广泛的利用，可以使用该框架中的各种特性更为方便快捷的开发出一个完整的
Web 应用程序。
2.使用
	Express是一个可以在Node.js中使用的MVC框架（model、view、controller）
		MVC:是一个编写代码的指导思想
		model      模型   数据模型（json）
		view       视图    student.html
		controller 控制器  createServer(function(){})  中的回调函数就是一个控制器
普通使用：
	1)安装
	npm install express;
	2)加载
	var express=require("express");
	3)路由配置
	var app=express();
	app.get('/sutdents',function(req,resp){
		resp.send("以下是所有学生信息");
	})
	4)设置监听
	app.listen(3000,function(){
		console.log("端口号为3000的服务器已经开启");
	})
例如：
express最简单的使用：
	1 //1.加载express模块
    2 var express=require("express");
    3 //2.创建express应用程序对象(其实就是创建了一个服务器)
    4 var app=express();
    	app.use(bodyParser.json());
    	app.use(bodyParser.urlencoded({extended:true}));
    5 app.get("/",function(req,resp){
    6         resp.send("welcome my app");
    7 });
    8 app.get("/students",function(req,resp){
    9         resp.send("以下是所有学生的信息");
   10 });
   11 //3.设置监听
   12 app.listen(8080,function(){
   13         console.log("端口号为8080的服务已经开启.....");
   14 })
app.use(bodyParser.json());
	//表示如果浏览器传送json格式的数据，则中间键按json格式进行解析
app.use(bodyParser.urlencoded({extended:true}));
	//表示如果浏览器以urlencoded格式传送数据，则中间键以同样的的方式进行解析
3.路由
	路由（Routing）是 Express 框架中的一个重要概念，在 Express 框架中使
用路由来根据客户端请求所提交的不同 URL 地址返回不同的服务器端响应结
果。
	1)单个路由
直接定义在服务器对象上
	var app = express();
	app.get(url,callback(req,resp){}); 接收 get 请求
	app.post(url,callback(req,resp){}); 接收 post 请求
	app.delete(url,callback(req,resp){}); 接收 delete 请求
	app.put(url,callback(req,resp){}); 接收 put 请求
	app.all(url,callback(req,resp){}); 接收所有类型的请求
 其中回调函数中的参数 req 是用来获取请求信息的对象， resp 是用来回应请
求信息的对象， next 用于调用下一个路由。
	2)路由中间件
在路由中间件对象上定义子路由
	var app = express();
	var userRoute = express.Router (); 创建路由中间件对象
	userRoute.get(callback(){}); 定义中间件
	userRoute.post(callback(){});
	userRoute.delete(callback(){});
	userRoute.put(callback(){});
	app.use("/user",userRoute); 使用中间件
	例如：
	  1 //1.加载模块
	  2 var express=require("express");
	  3 var bodyParser=require("body-parser");
	  4 
	  5 //2.创建服务对象
	  6 var app=express();
	  7 app.use(bodyParser.urlencoded({extended:true}));
	  8 
	  9 //路由中间键
	 10 var studentsRouter=express.Router();
	 11 studentsRouter.get("/findById",function(req,resp){
	 12         resp.send("通过id查找学生");
	 13 });
	 14 studentsRouter.get("/findAll",function(req,resp){
	 15         resp.send("查找所有学生");
	 16 });
	 17 app.use("/students",studentsRouter); //在使用studentsRouter时先指定父路由
	 18 //3.设置监听
	 19 app.listen(8080,function(){
	 20         console.log("端口号为8080的服务已经开启.....");
	 21 });     
	3)路由中指定参数
app.get("/findBook/:id/:name",callback);
如果用户的请求是‘ http://localhost:8888/findBook/1001/terry’ 即可以完成匹配，通过
req.params 获取参数组成的对象。
4.参数获取
	 get 请求中的参数获取
	app.get("/login",function(req,resp){
	var obj = url.parse(req.url);
	var params = querystring.parse(obj.query);
	resp.write(JSON.stringify(req.query));
	resp.end();
	});
	 post 请求中的参数获取
	app.post("/login",function(req,resp){
	var buff = new Buffer(0); req.on("data",function(data){
	buff += data;
	});
	req.on("end",function(){
	var params = querystring.parse(buff.toString());
	resp.send(JSON.stringify(params));
	});
	});
5.回应请求
	通过回调函数中的 response 对象回应请求
	res.send([body]) 发送 http 请求， body 可以为流，字符串，对象，或者数组
	res.json([body]) 与 send 方法参数相同，可以将其他类型参数转换为 json
	res.end([data] [, encoding])结束响应进程
	res.redirect(path) 重定向
6.静态文件托管
	通过 Express 内置的 express.static 可以方便地托管静态文件，例如图
	片、 CSS 、 JavaScript 文件等。将静态资源文件所在的目录作为参数传递给
	express.static 中间件就可以提供静态资源文件的访问了。例如，假设在 public 目录
	放置了图片、 CSS 和 JavaScript 文件，你就可以
	app.use(express.static('public'));
例如：
利用路由中间件
	下载安装express
            npm install express
        加载
            var express=require("express");
        配置路由
            var app=express();
            var url=require("url");
            var querystring=require("querystring");
            var bodyPraser=require("body-praser");
            app.use(bodyPraser.urluncoded({extended:true}));//使用中间件
            app.get('/students/findAll',function(req,resp){
                //第一个参数为路由，接受get请求
                var obj=url.parse(req.url);//获取请求中的路径并转换为对象
                var parmas=querystring.parse(obj.query);//将查询字符串转换为对象
                resp.write(JSON.stringify(req.query));将查询字符串转换为JSON字符串
                resp.end();
            });
            app.post('/login',function(req,resp){
                var buff=new Buffer();
                var body=req.body
                resp.send(JSON.stringfiy(body));
            })
            路由中间件 app.use("/students",studentsRouter);
        设置监听
            app.listen(3000,function(){
                console.log("端口号为3000的端口已开启")
            });
6.Express脚手架
	通过应用生成器工具express，可以快速创建一个应用的骨架
        安装 npm install express-generator -g//全局安装
        生成项目
            express app
        安装所有依赖
            cd app
            npm install
        启动项目
            npm run start
7.常用的第三方中间键
	Express 是一个自身功能极简，完全是由路由和中间件构成一个的 web 开发框架：从本
质上来说，一个 Express 应用就是在调用各种中间件。中间件(Middleware)是一个
函数，它可以访问请求对象 (req), 响应对象 (res), 和 web 应用中处于请求-响应循环
流程中的中间件，一般被命名为 next 的变量。
	body-parser 解析以 post 方式提交的数据
	cookie-parser 解析 cookie
	express-session session
	morgan log 日志
	serve-static 静态服务
	serve-favicon 处理 favicon
	method-override方法重写，为了支持诸如 delete,put 等请求
--------------------------------------------------------------------------
第五章 npm(node package management)
1.介绍：
	npm(node package management)又叫node包管理机制，npm使得js的开发者能够更方便地
分享、复用以及更新代码，被复用的代码称为包或者模块，一个模块中又包含一到多个js文件，
在模块中一般还会包含一个package.json文件，该文件中包含了该模块的配置信息。一个完整的项目一般需要依赖很多个模块。一个完整的npm包括三部分：
	npm网站：
		用于预览npm管理的包
	注册机制：
		用于上传包，使用数据库来记录包与上传者的信息
	客户端：
		用于安装包
2.安装npm
	npm会随着node一起安装到本地，使用以下命令来更新npm
		npm install npm@latest -g
	安装淘宝镜像
		由于默认的npm仓库的服务器在国外，下载起来非常缓慢，可以使用淘宝镜像来加快下
	载速度：
		npm install -g cnpm --registry=https://registry.npm.taobao.org
	Registry注册中心：
		官方：https://registry.npmjs.org
		淘宝：https://registry.npm.taobao.org
		私有：http://localhost:port
	在安装过程中会出现权限不足的问题，使用以下命令更改权限(修改全局安装权限)：
		npm config get prefix
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
	查看npm、node的版本：
		npm --version
		node --version
	查看npm、cnpm的配置信息：
		npm config list
		cnpm config list
3.npm的使用
	1)创建一个模块：
	node.js的模块是一种能够被发布到npm上的包。创建文件从创建package.json文件开始，
package.json是模块的配置文件：
	使用npm init来初始化package.json文件
	npm init  //初始化一个模块
 		name 模块名称 				version 模块版本
  		description 描述信息 		main 指定模块入口文件
  		Dependencies 依赖关系 		engines 指定 node 版本
  		devDependencies 环境依赖或测试依赖
  		optionalDependencies 可选择依赖
  		script 定义当前模块脚本，使用 npm run 来运行所定义的脚本
  		使用 -y 参数创建默认 package.json 文件
			npm init -y
	2)模块的安装：
	如果想要仅在当前模块中使用某个第三方模块，就可以使用 npm install 的默认安装，
默认安装即是本地安装；如果想要在命令行中使用模块，就需要进行全局安装。安装
时，如果当前目录中没有 node_modules 目录， npm 就会创建一个该目录。
	npm install <package_name>
    npm install
	安装所有项目依赖的模块，依赖的模块定义在 package.json 中
	安装模块时，默认会将所安装的模块写入到 package.json 中的 dependencies 属
性，通过添加一些参数改变这个特性。
	-D, --save-dev: Package will appear in your devDependencies.
	-O, --save-optional: Package will appear in your optionalDependencies.
	--no-save: Prevents saving to dependencies(不会保存依赖信息)
	-E, --save-exact: Saved dependencies will be configured with an exact version 
rather than using npm's default semver range operator.
	模块更新
	全局更新依赖的模块
		npm update <module_name>
	模块删除
	从 node_modules 中删除不需要的模块
		npm uninstall -g <package_name>
	不仅删除 node_modules 中的依赖，还需要删除 package.json 中的信息，可以使用
		— save 参数
	npm uninstall –save -g <package_name>
4.搭建本地 npm 仓库（sinopia）           
        安装本地仓库 sinopia
            安装
                npm install -g sinopia
            配置
                npm set registry=http://127.0.0.1:4873
            添加用户
                npm adduser
            发布模块
                npm publish 模块名
            启动
                sinopia
        初始化package.json文件
            npm init -y
        更新 npm update 模块名
        删除 npm uninstall -g 模块名
		npm init:初始化一个模块的配置文件（package.json）
		npm install:会去package.json中找见依赖模块的名称，然后下载下来
--------------------------------------------------------------------------
第六章 Ajax 异步的javascript与xml
1.概念
	Ajax的全称是 Asynchronous Javascript and XML,指异步的JavaScript和xml,它有别于
传统的web开发中的同步方式。它不是一个新技术，而是多个技术的一个组合，使用ajax可以更
方便更快捷地进行页面的局部更新。Ajax 使用XMLHttpRequest 对象与服务器进行交互，它能
够发送和接受多种形式的数据格式（例如 json,xml,html,text）。
	所谓异步即不需要更新整个页面就可以与服务器交换数据，更新局部页面。
2.理解ajax的工作原理
	通过分析XmlHttpRequest来理解ajax原理。
	Ajax的原理简单来说通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，
然后用javascript来操作DOM而更新页面。
	XMLHttpRequest是ajax的核心机制，是一种支持异步请求的技术。简单的说，也就是
javascript可以及时向服务器提出请求和处理响应，而不阻塞用户。达到无刷新的效果。
3.XMLHttpRequest对象的属性
	1)readyState:对象状态值(自己理解为连接建立的过程)
		0:请求未初始化
		1:建立服务器连接
		2:发送请求
		3:处理请求
		4:请求完成 响应返回
	2)status:从服务器返回的数字代码
		404:未找到
		200:就绪
	3)status text:伴随数字代码的字符串信息
    4)onreadystatechange:每次状态改变所触发的事件处理程序
    5)responseText:从服务器进程返回数据的字符串形式
    6)responseXML:从服务器进程返回XML对象信息
例如：
    获取XMLHttpRequest对象
        var httpRequest=new XMLHttpRequest();
    监听就需状态的改变
        httpRequest.onreadystatechange=function(){
            //处理响应信息
            if(httpRequest.readyState==4){
                if(httpRequest.status==200){
                    var data=httpRequest.responseText;//获取数据
                    var arr=JSON.parse(data);
                }
            }
        }
    发送请求
        httpRequest.open('GET','http://127.0.0.1:3000/students/findAll?id=1001',true);//设置请求方式、地址、是否为异步请求
        httpRequest.send();//发送post(将设置信息发送给ajax引擎)
--------------------------------------------------------------------------
第七章 Git
git
    目前世界上最先进的分布式版本控制系统
    下载：sudo apt-get install git
    创建本地仓库
        express app
        cd app
        vim reademe.md  //编辑文件
        git init//初始化一个空的git仓库.git为隐藏文件 ls -a
    管理文件
        git add * //将所有文件添加到本地仓库
        git status //查看当前仓库状态
        git commit -m "提交信息" // 提交文件到本地仓库，-m 表示提交说明
    管理文件    
        vim reademe.md //修改文件
        git add * //将当前目录下所有文件添加到git仓库中
        git commit -m "this is second change";
    查看日志
        git log//查看日志 版本信息
        git reset --hard be91b1 //回退be91b1版本
        git reflog //查看历史版本信息
    分支管理
        主分支  master
        git branch dev //创建新的分支
        git branch //查看当前分支
        git checkout dev //切换分支
            在当前分支下的修改信息不会显示在主分支
        git checkout master //切换到主分支
        git merge dev // 将dev分支合并到主分支上
远程仓库
	可以在github.com中注册一个账号，然后创建一个远程仓库，创建成功后就产生
一个远程仓库地址，例如：https://github.com/guofa/app.git
我们可以将本地代码提交到远程仓库中。远程仓库的名字叫origin,这是git的默认叫法。
	$ git remote add origin https://github.com/guofa/app.git
	(给远程添加一个仓库，仓库的名称：origin,仓库的地址：https://github.com/guofa/app.git)
	下一步就可以把本地仓库中的内容推送到远程仓库上：
	$ git push origin master
	也可以将其他分支推送到远程仓库上
	$ git push origin dev
注意
	如果远程仓库中有初始化文件，在提交之前要更新
	$ git pull origin master //把远程的origin拉到本地的master中
	git config --list //查看当前仓库和远程的哪个仓库绑定
	git clone https://github.com/guofa/app.git
文件删除
	rm readme.txt//删除文件
	git status //查看状态
	这时有两个选择，
	其一：确实要从版本库中删掉该文件，则用git rm,并且git 
	      commit,即如下代码：
	      git rm readme.txt
	      git commit -m "confirm delete"
	其二：可能是误删了，这时版本库中有备份，运行如下命令进行找回
		git checkout -- readme.txt
