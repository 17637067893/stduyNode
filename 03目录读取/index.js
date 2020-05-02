let fs = require("fs")

let readFloder = function(path){
    return new Promise((res,rej)=>{
        fs.readdir(path,(err,files)=>{
            if(err){
                rej(err)
            }else{
                res(files)
            }
        })
    })
}
readFloder("../02文件写入")
.then((files)=>{
    console.log(files)
})


fs.rmdir("../buffer",(err)=>{
    if(err){
        throw err
    }else{
        console.log("success")
    }
})