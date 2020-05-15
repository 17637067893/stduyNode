const express = require('express');
var app = express();

//添加中间件

app.use(function(req,res,next){
	console.log('中间件函数',res);
	next(); // next必须要有
})

app.get('/',(req,res) => {
	res.send(`<h1 style='color: blue'>hello world</h1>`);
})
app.get('/use',(req,res) => {
	res.send(`<h1 style='color: blue'>use</h1>`);
})
// b? 表示b可有可无  (bn)?也可以用
app.get('/usb?sde',(req,res) => {
	res.send(`<h1 style='color: blue'>usb?sde</h1>`);
})

// b+ b有一个或多个
app.get('/usbd+sde',(req,res) => {
	res.send(`<h1 style='color: blue'>usbd+sde</h1>`);
})
// * 代表中间插入任意字符
app.get('/a*b',(req,res) => {
	res.send(`<h1 style='color: blue'>a*b</h1>`);
})

// /.*fly$/  正则表达式路径 匹配以fly结尾的路径

app.get('/f/',(req,res) => {
	res.send(`<h1 style='color: blue'>.*fly</h1>`);
})

// 动态路由

app.get('/users/:userId/',(req,res,next) => {
	let userId = req.params.userId
	res.send(`<h1 style='color: blue'>${userId}</h1>`);
	console.log(userId)
	next();
},(req,res) => {
	console.log(req.params.userId+1)
})

app.listen('3000',(err) =>{
	if(err){
		console.log(err)
	}else{
		console.log('server start')
	}
})