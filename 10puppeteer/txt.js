let puppeteer = require("puppeteer")
let axios = require("axios");


let httpUrl = "https://sobooks.cc/page/1";

(async function(){
	let config = {
		// 设置试图大小
		defaultViewport:{
			width:1400,
			height:800
		},
		// 设置有界面， true 为无界面

	}
	 let browser =await puppeteer.launch(config);
	
	// let page =await browser.newPage();
	// await page.goto("www.baidu.com")
})();
