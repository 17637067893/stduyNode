const sqlQuery = require('./mysql/mysql.js');
var express = require('express');
const path = require('path')
const app = express('path');
const ejs = require('ejs');
app.set('views','views');
app.set('views engine','ejs');
app.set('ejs',ejs._express);
app.use(express.static(path.join(__dirname,'public')))
app.get('/',async (req,res) => {
	let strSql = 'select id,bookname,bookimg,author,cataory from book limit 0,28';
	let result =await sqlQuery(strSql);
	let obj = {
		arr:Array.from(result),
		title:'你看看'
	}
	//res.send(data)
	// console.log(data)
	res.render('index.ejs',obj)
})

app.get('/xiaoshuowenxue',async (req,res) => {
	let strSql = "select id,bookname,bookimg,author,cataory from book where cataory = '小说文学' limit 0,28"
	let result = await sqlQuery(strSql);
	res.send(res.json(result))
})

app.get('/books?/:bookid',async (req,res) => {
	let strSql = "select * from book where id = ? limit 0,28"
	let id = req.params.bookid
	let result = await sqlQuery(strSql,[id]);
	res.send(res.json(result))
})

app.listen('3000',(err) => {
	if(err){
		console.log(err)
	}else{
		console.log('server start')
	}
})


module.exports = app;