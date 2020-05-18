var express = require('express');
var router = express.Router();

//引入用户管理
var usersRouter = require('./usersRouter.js')
//引入新闻管理
var newsRouter = require('./newsRouter.js')
//引入医生管理
var doctorsRouter = require('./doctorsRouter.js')
//引入患者管理
var patientsRouter = require('./patientsRouter.js')

function permission(req,res,next){
	if(req.session.username == undefined){
		// 尚未登录，返回登录页
		res.render('info/info',{
			title:'尚未登录',
			content:'请重新登录，即将进入登录页',
			href:'/login/',
			hrefTxt:'登录页'
		})
	}else{
		//正常进入
		next();
	}
}

router.use(permission);
router.get('/', function(req, res, next) {
	console.log(req.session.username);
	let name = req.session.username;
  res.render('admin/index.ejs', { title: 'adminRouter',username: name});
});



// 后台用户管理
router.use('/users',usersRouter)
// 后台新闻管理
router.use('/news',newsRouter)
// 后台用户管理
router.use('/doctors',doctorsRouter)
// 后台用户管理
router.use('/patients',patientsRouter)




module.exports = router