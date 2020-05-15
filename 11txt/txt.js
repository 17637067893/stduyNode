let puppeteer = require("puppeteer")
let axios = require("axios");



let httpUrl = "https://sobooks.cc/page/1";
axios.get(httpUrl).then((res) => {
	console.log(res)
})

(async function(){
	let config = {
		// 设置试图大小
		defaultViewport:{
			width:1400,
			height:800
		},
		// 设置有界面， true 为无界面
	    headless:false

	}
	 let browser =await puppeteer.launch(config);
	 let page =await browser.newPage();
	  console.log(123);
	  await page.goto(httpUrl)
})();
