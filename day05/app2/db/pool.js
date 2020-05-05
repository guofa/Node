var mysql=require("mysql");
var pool=global.pool;
if (!pool) {
	pool=mysql.createPool({
		host:'127.0.0.1',
		port:'3306',
		database:'web1701',
		user:'guofa',
		password:'guofa'
	});
	global.pool=pool;
}
module.exports=pool;