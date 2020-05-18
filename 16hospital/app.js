var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//引入session
var session = require('express-session');
// 引入上传模块
var multer = require('multer');
// 配置上传对象
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



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// 引入后台路由
var adminRouter = require('./routes/admin/adminRouter')
// 引入登录
var loginRouter = require('./routes/login/loginRouter')
var app = express();



//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});

// 单图上传
app.post('/upload', upload.single('logo'), function(req, res, next){
    var file = req.file;
    console.log(file)
	res.send('66')
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 配置session 
app.use(session({
	secret:'123',
	resave:true, //前端保存session
	cookie:{
		//maxAge:1000*60*60*24*7  设置session的有效期为一周
	},
	saveUninitialized:true//是否保存初始化的session
}))

//前台路由
app.use('/', indexRouter);
//后台路由
app.use('/admin', adminRouter);
//登录路由
app.use('/login', loginRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
