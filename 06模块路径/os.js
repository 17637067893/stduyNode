let os =require("os");
let url = require('url');

let httpUrl = "https://www.jianshu.com/writer#/notebooks/34584116/notes/69110747/preview"

console.log(url.parse(httpUrl));

// 获取操作系统
console.log(os.cpus()); // cup

console.log(os.totalmem()); // 内存信息

console.log(os.arch())   //cup 架构

console.log(os.freemem()) //空闲内存

console.log(os.platform()) //空闲内存  +