var sayHello=function(){
	console.log("Hello");
}
var a="This is a";

//module.exports.sayHello=sayHello;
//module.exports.a=a;
module.exports={
	sayHello:sayHello,
	a:a
}
