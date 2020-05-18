let express = require('express')
let sqlQuery = require("./mysql.js")
const bodyParser=require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
let app = express()
let register = require('./register.js')
app.use('/register',register)
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/',(req,res) => {
	res.send('连接')
})
app.use(express.urlencoded()) 
app.post('/login',async (req,res) => {
	let strSql = "select * from user where username = ? "
	let name = req.body.username;
	let result = await sqlQuery(strSql,[name])
	console.log(name,result)
	if(result.length==0){
		//res.send(' 先去注册')
		res.render('info',{
			title:'登录失败',
			content:'账号密码不正确',
			href:'/',
			hrefTxt:'首页'
			
		})
	}else{
		//res.send('登录成功')
		res.sessin.username = name;
		res.render('info',{
			title:'登录成功',
			content:'账号密码正确',
			href:'/',
			hrefTxt:'首页'
			
		})
	}
	
})




app.listen('3000',(err) => {
	if(err){
		console.log(err);
	}else{
		console.log("server start")
	}
})