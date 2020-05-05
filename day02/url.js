var url=require("url");

var a="http://127.0.0.1:8888/course/findById?id=1001&name=terry";
var urlObj=url.parse(a);
console.log(urlObj);
var pathname=urlObj.pathname;
var query=urlObj.query;
console.log("pathname:"+pathname);
console.log("query:"+query);
