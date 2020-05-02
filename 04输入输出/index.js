//模块提供了一个接口，用于一次一行地读取可读流中的数据。
var readline = require('readline');
var writePromise = require('../02文件写入')
console.log(writePromise)
//createInterface()构造一个可读流和一个可写流
var rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})
function makeDir(title){
    return new Promise((res,rej)=>{
        rl.question(title,(answer)=>{
            res(answer)
        })
    })
}

makeDir("创建JSON？")
.then((res)=>{
    if(res=="ok"){
        writePromise.writePromise("./pageK.json",`{a:"a"\n,b:'b'\n}`)
    }else{
        console.log("拒绝")
    }
   
})
