var fs = require("fs");

var data=""
var readStream = fs.createReadStream("./新录音2.m4a");

readStream.setEncoding("UTF-8");


readStream.on("data",function(chunk){
	data+=chunk
	console.log(chunk);
})

readStream.on("end",function(data){
	console.log("文件读取结束",data)
})