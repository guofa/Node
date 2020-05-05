var qs=require("querystring");

var data="id=1001&name=larry"
var qsObj=qs.parse(data);
console.log(qsObj);
console.log(qs.stringify(qsObj));
