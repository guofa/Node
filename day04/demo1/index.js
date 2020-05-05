var mysql=require('mysql');
var connection=mysql.createConnection({
	host:'127.0.0.1',
	port:'3306',
	database:'test',
	user:'test',
	password:'test'
});
connection.connect();
var sql="select * from student";
connection.query(sql,function(err,result){
	if(err){
		throw err;
	}else{
		console.log(result);
	}				
});
connection.end();
