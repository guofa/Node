var pool=require("./pool.js");
//1.录入学生信息
function save(student,handler){
	pool.getConnection(function(err,conn){
		if(err){
			throw err;
		}else{
			var sql="insert into student values(null,?,?,?,?);";
			conn.query(sql,[
				student.name,
				student.gender,
				student.birth,
				student.clazz_id
			],function(err,results){
				if(err){
					throw err;
				}else{
					handler(results);
				}
				conn.release();
			})
		}				
	})
}
//2.查询所有学生信息
function findAll(handler){
	pool.getConnection(function(err,conn){
		if(err){
			throw err;
		}else{
			var sql="select * from student";
			conn.query(sql,function(err,results){
							if(err){
								throw err;
							}else{
								handler.call(this,results);
							}
							conn.release();
						});
		}				
	});
}

module.exports={
	save:save,
	findAll:findAll
}
