const mysql = require('mysql');
const axios = require('axios');
const cheerio = require('cheerio');


axios.defaults.headers.common['Content-Type'] = 'text/html; charset=UTF-8';
//获取请求的页面的所有书籍链接a

async function getPageUrl(num){
	let httpUrl = "https://sobooks.cc/page/3";
	let res = await axios.get(httpUrl)
	console.log(res.data);
}
getPageUrl(1);