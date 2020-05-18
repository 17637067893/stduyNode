var express = require('express');
var router = express.Router();
var sqlQuery = require('../../../module/lcMysql');
var jiami = require('../../../module/jiami')
//引入上传模块
let multer = require('multer')
//配置上传对象
let upload = multer({dest:"./public/upload"})
let fs = require('fs')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/users/authlist');
});

router.get('/api/authlist',async (req,res)=>{
    let page = parseInt(req.query.page) ;
    let limitNum =parseInt(req.query.limit) ;
    let sqlStr = "select * from auth limit ?,?";
    let arr = [(page-1)*limitNum,limitNum]
    let result = await sqlQuery(sqlStr,arr)
    let sqlStr1 = "select count(id) as authnum  from auth";
    let result1 = await sqlQuery(sqlStr1)
    let count = result1[0].authnum;
    let options = {
        "code": 0,
        "msg": "",
        "count": count,
        "data": Array.from(result)
    } 
    res.json(options)
})

router.get('/api/authlistAll',async (req,res)=>{
    let sqlStr = "select * from auth";
    let result = await sqlQuery(sqlStr)
    let options = {
        "code": 0,
        "data": Array.from(result)
    } 
    res.json(options)
})

module.exports = router;
