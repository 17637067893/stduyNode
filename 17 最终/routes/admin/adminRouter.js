var express = require('express');
var router = express.Router();
var userRouter = require('./userRouter');
var newsRouter = require('./newsRouter')
var doctorsRouter = require('./doctorsRouter')
var patientsRouter = require('./patientsRouter')
var sqlQuery = require('../../module/lcMysql')

//判断是否符合条件进入后台中间件
function permisson(req,res,next){
    if(req.session.username==undefined){
        //尚未登陆，返回至登录页
        res.render('info/info',{
            title:"尚未登陆",
            content:"请重新登陆,即将进入登陆页",
            href:"/rl/login",
            hrefTxt:"登录页"
        })
    }else{
        //正常进入
        next()
    }
}

router.use(permisson)

/* GET users listing. */
router.get('/',function(req, res, next) {
    //console.log(req.session)
    res.render('admin/index',{username:req.session.username})
});

//设置后台权限的中间件
async function adminAuth(req,res,next){
    //1获取登陆后的用户名
    let username = req.session.username;
	if(username){
	    //如果允许就正常进入
	    next()
	}else{
	    res.render('info/info',{
	        title:"禁止访问",
	        content:"没有权限访问该页面，请联系管理员",
	        href:"/",
	        hrefTxt:"首页"
	    })
	}
    //2通过用户名查看可以访问的地址
    // let sqlStr = "SELECT * from auth where id in (SELECT authid from role_auth where roleid = (SELECT roleid from user where username = ?))"
    // let result = await sqlQuery(sqlStr,[username]);
    // let resultArr = Array.from(result);
    // //console.log(resultArr)
    // //3判断当前请求的路径是否在允许的路径里
    // let httpUrl = req.originalUrl;
    // //console.log('--------'+httpUrl)
    // let isAllow = resultArr.some((item,i)=>{
        
    //     let isTrue = new RegExp("^"+item.authurl).test(httpUrl)
    //     //console.log(item)
    //     //console.log(isTrue)
    //     return isTrue;
    // })
    // console.log('-------',isAllow)
    // if(isAllow){
    //     //如果允许就正常进入
    //     next()
    // }else{
    //     res.render('info/info',{
    //         title:"禁止访问",
    //         content:"没有权限访问该页面，请联系管理员",
    //         href:"/",
    //         hrefTxt:"首页"
    //     })
    // }

}
router.use(adminAuth)

//后台用户管理模块
router.use('/users',userRouter)
//后台新闻管理
router.use("/news",newsRouter)
//后台医生管理
router.use("/doctors",doctorsRouter)
//后台患者管理
router.use("/patients",patientsRouter)

module.exports = router;
