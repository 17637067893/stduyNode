var express = require('express');
var router = express.Router();
var sqlQuery = require('../../module/mysql')
//引入上传模块
let multer = require('multer')
//配置上传对象
let upload = multer({dest:"./public/upload"})
var router = express.Router();
var jiami = require('../../module/jiami')

router.get('/',(req,res) => {
	console.log("usersRouter")
})
//个人信息路由
router.get('/selfinfo',async (req,res)=>{
  
  //获取用户名
  let username = req.session.username;
  //通过用户名查找所有的信息
  let sqlStr = 'select * from user where username = ?';
  let result = await sqlQuery(sqlStr,[username]);
  let users = result[0];
  //通过角色表获取所有角色
  let roles = await getRoles()
  let options = {users,roles};
  res.render('admin/users/selfinfo',options);

})

router.post('/selfimgupload',upload.single('imgfile'),async (req,res)=>{
  let username = req.session.username;
  let result = rename(req)
  //将改名后的结果，上传到数据库
  let strSql = "update user set imgheader = ? where username = ?"
  await sqlQuery(strSql,[result.imgUrl,username])
  res.json(result)
})

function rename(req){
  //console.log(req.file)
  let oldPath = req.file.destination+"/"+req.file.filename;
  let newPath = req.file.destination+"/"+req.file.filename+req.file.originalname;
  fs.rename(oldPath,newPath,()=>{
      //console.log("改名成功")
  })
  return {
    state:'ok',
    imgUrl:"/upload/"+req.file.filename+req.file.originalname
  }
}

async function getRoles(){
  let sqlStr = 'select * from role';
  let result = await sqlQuery(sqlStr);
  return Array.from(result);
}


router.post('/selfinfo',async (req,res)=>{
  console.log(req.body);
  //更新数据
  let password = jiami(req.body.password)
  let email = req.body.email;
  let mobile = req.body.mobile;
  let roleid = req.body.roleid;
  let username = req.body.username;
  let sqlStr = "update user set password=?,email=?,mobile=?,roleid=? where username =?";
  let arr = [password,email,mobile,roleid,username]
  await sqlQuery(sqlStr,arr);
  res.json({
    state:"ok",
    content:"个人信息更新成功"
  })
})



module.exports = router