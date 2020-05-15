const axios = require('axios');
const cheerio = require('cheerio');
const fs = require("fs");
const path= require('path')

//1 获取第一页的地址 请求数据 返回当前的页的数据
// 2 根据元素找到我们需要的数据内容

let httpUrl = "https://www.doutula.com/article/list/?page=1";
axios.get(httpUrl)
      .then((res) => {
          
          // 使用cheerio解析 html文档
           let $ = cheerio.load(res.data)
           $("#home .col-sm-9>a").each((index,item) => {
               let url1 = $(item).attr("href")
               let title = $(item).find(".random_title").text();
               let reg = /(.*?)\d/;
               title = reg.exec(title)[1];
            //    fs.mkdir("/img",{ recursive: true },(err) => {
            //        if(err){
            //            console.log(err);
            //        }
            //    })
               parsePage(url1,title);
               
           })
      })
async function parsePage(url,title){
    let res = await axios.get(url);
    let $ = cheerio.load(res.data);
    $(".pic-content .artile_des table img").each((index,item) => {
        console.log($(item).attr("src"))
        // 图片地址
        let imgUrl = $(item).attr("src");
        // 图片扩展名
        let lastName = path.extname(imgUrl)
        // 图片名拼接
        let ws = fs.createWriteStream(`./img/${title}-${index}${lastName}`);
        axios.get(imgUrl,{responseType:'stream'}).then((res,rej) => {
            res.data.pipe(ws);
        })
    })
}     

let axios = require('axios');
let httpUrl = "http://www.app-echo.com/api/recommend/sound-day";
axios.get(httpUrl,{
    page:'1'
})((res) => {
    console.log(res.data)
})