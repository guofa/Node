第一章：Node的基础核心模块
1.Node介绍
		Node叫NodeJS或Node.JS,Node是一个JavaScript运行环境。实际上它是对Google 
	V8引擎进行了封装。官网介绍node:一个搭建在ChromeJavaScript运行时上的平台，用于构建高速可伸缩的网络程序。
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
	CommonJS 规范规定，每个模块内部， module 变量代表当前模块。这个变量是一个
对象，它的 exports 属性（即 module.exports ）是对外的接口。加载某个模块，其实
是加载该模块的 module.exports 属性。
	Node 内部提供一个 Module 构建函数。所有模块都是 Module 的实例。每个模块内部都有一个 module 对象，代表当前模块。它有以下属性。
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
