//导入文件模块 
var fs = require('fs');
// node,写文件也有同步和异步的接口 默认为异步

//同步 读取文件(影响效率）
// var fd = fs.openSync(';

var content = fs.readFileSync('./hello.txt','utf-8');

console.log(content);

//异步读取 没有阻塞 速度快 性能高

var readFile= function(path){
    return new Promise((res,rej)=>{
        fs.readFile(path,function(err,data){
            if(err){
                rej(err)
            }else{
                res(data.toString());
            }
        })
    })
    
}
readFile("./hello.txt")
.then((res)=>{
    console.log("异步结果"+res)
})