var studentDB=require("./db/studentDB");
var student={
	name:'赵四',
	gender:'男',
	birth:'1996-02-03',
	clazz_id:3
};
/*
studentDB.save(student,function(result){
	console.log(result);				
})
*/
studentDB.findAll(function(result){
	console.log(result);				
})
