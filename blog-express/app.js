var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');  //日记模块;

var session = require('express-session'); // session处理模块

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var fs = require('fs');
var blogsRoutet = require('./routes/blogs');
var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
var ohterRouter = require('./routes/other');
var RedisStore = require('connect-redis')(session);//传入session
var redisClient = require('./db/redis');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const ENV = process.env.NODE_ENV;
if(ENV !== 'production'){

  app.use(morgan('dev'));

}else{
  // 线上环境
  let logFileName = path.join(__dirname, 'logs', 'access.log')
  let write = fs.createWriteStream(logFileName,{
    flags:'a'
  })
  app.use(morgan('combined', {
    stream: write
  }))
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //处理cookie;
//app.use(express.static(path.join(__dirname, 'public')));


let sessionStorage = new RedisStore({
  client: redisClient
})
app.use(session({
  secret: 'gj520',
  cookie: {
    path:'/',
    httpOnly:true,  
    maxAge:24*60*60*1000
  },
  resave: false, //添加 resave 选项
  saveUninitialized: true,
  store: sessionStorage
}))//其中path、httpOnly是默认的

app.use('/api/blog', blogsRoutet);
app.use('/api/user', usersRouter);
app.use('/api/index',indexRouter);
app.use('/api/other',ohterRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
