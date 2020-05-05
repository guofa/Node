var pool = require('./pool');

//保存学生信息
function save(student,handler){
    pool.getConnection(function(err,conn){
        if(err){
            throw err;
        } else {
            var sql = 'insert into student values(null,?,?,?,?);'
            conn.query(sql,[
                student.name,
                student.gender,
                student.birth,
                student.class_id
            ],function(err,result){
                if(err){
                    throw err;
                }else {
                    handler(result);
                }
                conn.release();
            });
        }
    });
}
//查询所有学生信息
function findAll(handler){
    pool.getConnection(function(err,conn){
        if(err){
            throw err;
        } else {
            var sql = "select * from student";
            conn.query(sql,function(err,results){
                if(err){
                    throw err;
                } else {
                    handler.call(this,results);
                }
                //释放连接对象
                conn.release();
            });
        }
    });
}


//根据id查询学生信息
function findById(id,handler){
    pool.getConnection(function(err,conn){
        if(err){
            throw err;
        } else {
            var sql = "select * from student where id = ?";
            conn.query(sql,[id],function(err,results){
                if(err){
                    throw err;
                } else {
                    handler.call(this,results);
                }
                conn.release();
            });
        }        
    });
}
//根据id删除学生信息
function deleteById(id,handler){
    pool.getConnection(function(err,conn){
        if(err){
            throw err;
        }else {
            var sql = "delete from student where id = ?";
            conn.query(sql,[id],function(err,results){
                if(err){
                    throw err;
                }else {
                    handler(results);
                }
                conn.release();
            });
        }
    });
}
//修改学生信息
module.exports = {
    save:save,
    findAll:findAll,
    findById:findById,
    deleteById:deleteById
}
