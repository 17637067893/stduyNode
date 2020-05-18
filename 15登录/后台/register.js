let express = require('express');
let register = express.Router();
let sqlQuery = require("./mysql.js")
let crypto = require('crypto');
let fs = require('fs')
var multer  = require('multer')






var createFolder = function(folder){
    try{
        fs.accessSync(folder); 
    }catch(e){
        fs.mkdirSync(folder);
    }  
};

var uploadFolder = './upload/';

createFolder(uploadFolder);

// 通过 filename 属性定制
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null, file.fieldname + '-' + Date.now() + file.originalname);  
    }
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

// 单图上传
register.post('/upload', upload.single('logo'), function(req, res, next){
    var file = req.file;
    console.log(file)
	res.send('66')
});

// register.get('/form', function(req, res, next){
//     var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
//     res.send(form);
// });









function jiami(str){
	let salt = "adfasdfasdf"
	let obj = crypto.createHash('md5');
	str = str + salt;
	obj.update(str)
	return obj.digest('hex')
}

register.use(express.urlencoded()) 

register.post('/',async (req,res) => {
	let strSql = "select * from user where username = ?"
	let name = req.body.username;
	let password =jiami(req.body.password); ;
	let result = await sqlQuery(strSql,[name,password])
	if(result.length > 0){
		res.send("用户已存在")
	}else{
		let insertSql = "insert into user (username,password) values (?,?)"
		let insertResult = await sqlQuery(insertSql,[name,password])
		res.send("用户注册成功")
		console.log(insertResult)
	}
})

register.post('/login',async (req,res) => {
	let strSql = "select * from user where username = ?"
	let name = req.body.username;
	let password =jiami(req.body.password);
	let result = await sqlQuery(strSql,[name])
	console.log(result,password)
	if(result.length < 1){
		res.send('用户不存在')
	}else{
		res.send('123')
	}
	
})



module.exports = register