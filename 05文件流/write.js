let fs = require("fs");

let data="写入流接口createWriteStream"
// 创建写入流接口 写入到
let writeStrem = fs.createWriteStream("output.txt",{flags:'a'})

//设置写入编码
writeStrem.write(data,"UTF-8");

//设置文oo件末尾
writeStrem.end(function(){
	console.log("文件写入end")
});

//处理流事件->data(可读) end(没有更多数据) error(写入过程出错) finish(所有数据已被写入底层系统)

writeStrem.on('finish',function(){
	console.log("写入完成")
})

writeStrem.on("error",function(err){
	console.log(err.stack)
})


console.log('程序结束')