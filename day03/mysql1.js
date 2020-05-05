//1.加载mysql模块
var mysql=require("mysql");
//2.创建链接对象
var connection=mysql.createConnection({
	host:'127.0.0.1',
	port:'3306',
	database:'test',
	user:'test',
	password:'test'
});
//3.进行数据库连接
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
//5.关闭链接对象
connection.end();
