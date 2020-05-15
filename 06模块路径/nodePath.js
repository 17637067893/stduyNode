let path = require("path");
console.log(path);
 let str = "https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9818521579139026756%22%7D&n_type=0&p_from=1.html";

 //获取路径的后缀名
 let info = path.extname(str);
 console.log(info);   // .html


 //path.resolve()  拼接路径
 let arr = ["/ds",'adf','video'];
 let rePath = path.resolve(...arr);//数组需要解构在传参
 console.log(rePath) //  /ds/adf/video


// __dirname 获取文件的问政路径
console.log(__dirname)
//path.join() 常用路径拼接
let joinPath = path.join(__dirname,'wenjian','daima')
console.log(joinPath)

console.log(__filename)
console.log(__dirname)
