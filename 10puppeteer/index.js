const puppeteer = require('puppeteer');
// const cheerio = require("cheerio")
(async () => {
	// 浏览器配置
    let config = {
		// 截图的大小
		defaultViewport:{
			width:1400,
			height:800
		},
		// 关闭无头
		headless:false
	}
	//等待函数
	async function selfWait(milliseconds){
		return new Promise(function(resolve,reject){
			setTimeout(function(){
				resolve()
			},milliseconds)
		})
	}
	// 实例化浏览器                           
	const browser = await puppeteer.launch(config);
	// 打开新页面
	const page = await browser.newPage();
	// 发送网址
	await page.goto('https://www.dytt8.net/index.htm');
	// 截图
	elementHandles1 = await page.$$("#menu li a");
	elementHandles1[2].click()
	elementHandles2 = await page.$$(".co_area2 .co_content8 a");
	elementHandles2[1].click();
	elementHandles3 = await page.$$(".co_area2 .co_content8 a");
	elementHandles3[0].click();
	// await page.screenshot({path:'example.png'})
	//生成pdf
	//await page.pdf({path:'example.pdf',format:'A4'});
	// 获取浏览器元素内容  其中回调可以在浏览器中运行
	
	// page.$$eval("#menu li a",(elements) => {
	// 	var dataList = [];
		
	// 	elements.forEach((item,index) => {
	// 		if(item.getAttribute("href")!="#"){
	// 			let obj ={
	// 				href:item.getAttribute("href"),
	// 				title:item.innerText
	// 			};
	// 			//selfWait(100*index)
	// 			dataList.push(obj);
	// 		}
	// 	})
	// 	console.log(dataList)
	// })
	// page.on("console",(...args) => {
	// 	console.log(args);
	// })

})();

//关闭浏览器
	//await browser.close();