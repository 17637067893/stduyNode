//引入文件模块
const fs = require("fs");


//同步写入
let writeSync=function(path){
    //同步写入文件 
    fs.writeFileSync(path,"努力学习。。。",{flag:'a'})
        //关闭文件
    }
 



//异步写入文件

let write=function(path){
        fs.writeFile(path,'异步写入\n',{flag:'a'},(err)=>{
            if(err){throw err}else{console.log   ("写入成功")}
        })
}
// writeSync("test.txt");
// write("test.txt");

//1打开写入流
// var ws = fs.createWriteStream("test.txt");

 let writePromise = function(path,centent){
     return new Promise((res,rej)=>{
         fs.writeFile(path,centent,{flag:'a',encodeing:'utf-8'},function(err){
             if(err){rej(err)}else{
                 res("success")
             }
         })
     })
 }

//  let wr = async function(){
//     await    writePromise("test.html","去哪了\n");
//     await   writePromise("test.html","吃饭\n"); 
//     await   writePromise("test.html","吃的什么\n");
//     await    writePromise("test.html","蛋炒饭\n"); 
    
//  }
//  wr();

 module.exports.writePromise=writePromise 