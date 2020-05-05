var mysql=require("mysql");
var pool=global.pool;
if(!pool){
	pool=mysql.createPool({
			host:'127.0.0.1',
			port:'3306',
			database:'test',
			user:'test',
			password:'test'
		});
	global.pool=pool;
}

module.exports=pool;
