var path=require("path");

var a="/home/test/hello.js";
console.log("basename:"+path.basename(a));
console.log("dirname:"+path.dirname(a));
console.log("extname:"+path.extname(a));
console.log("isAbsolute:"+path.isAbsolute(a));
var basepath="http://127.0.0.1:8888";
var sonpath="///course/findById?id=1";
console.log("join:"+path.join(basepath,sonpath));
