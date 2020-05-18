var express = require('express');
var sqlQuery = require('../../module/mysql')
var crypto = require('crypto');
var router = express.Router();


function jiami(str){
    let salt = "fjdsoigijasoigjasdiodgjasdiogjoasid"
    let obj = crypto.createHash('md5')
    str = salt+str;
    obj.update(str)
    return obj.digest('hex')
}

//注册页面
router.get('/register',(req,res) => {
	res.render('login/register.ejs',{})
})
//登录页面
router.get('/',(req,res) => {
	res.render('login/index.ejs',{})
})

//登录页面
router.get('/seekName',async (req,res) => {
	console.log(req.query)
	let username = req.query.username;
	let strSql = 'select * from user where username = ?';
	let result = await sqlQuery(strSql,[username]);
	if(result.length > 0){
		res.send({exist:true})
	}else{
		res.send({exist:false})
	}
})

// 注册页面
router.post('/register',async (req,res) => {
	let username = req.body.username;
	let password = req.body.password1;
	let strSql = 'select * from user where username = ?';
	let result = await sqlQuery(strSql,[username]);
	if(result > 0) {
		res.render('info/info',{
			title:'注册失败',
			content:'用户名已存在',
			href:'/login/register',
			hrefTxt:'注册页'
		})
	}else{
		let insertSql = 'insert into user (username,password) values (?,?)';
		let result1 = await sqlQuery(insertSql,[username,jiami(password)]);
		res.render('info/info',{
			title:'注册成功',
			content:'即将进入登录页面',
			href:'/',
			hrefTxt:'登录页'
		})
	}
})

// 登录页面
router.post('/',async (req,res) => {
	// 获取username和密码
	let username = req.body.username;
	let password = req.body.password;
	let sqlStr = "select * from user where username = ? and password = ?";
	let result = await sqlQuery(sqlStr,[username,jiami(password)]);
	console.log('login')
	if(result.length==0){
	        //登陆失败
	        res.render('info/info',{
	            title:"登陆失败",
	            content:"用户或密码错误",
	            href:"/login/login",
	            hrefTxt:"登陆页"
	        })
	    }else{
	        req.session.username = username;
	        res.render('info/info',{
	            title:"登陆成功",
	            content:"立即跳转至后台页面",
	            href:"admin/",
	            hrefTxt:"后台"
	        })
	    }
})
router.get('/loginout',(req,res) => {
	req.session.destroy()
	res.render('info/info',{
		title:'退出登录成功',
		content:'立即跳转登录页面',
		href:'/login',
		hrefTxt:'登录'
	})
})


module.exports = router