const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

//导入路由配置文件
const articleRouter = require('./routes/api/article')
const tagRouter = require('./routes/api/tag')
const userRouter = require('./routes/api/user')


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

//api路由
app.use('/article',articleRouter)
app.use('/tag',tagRouter)  //api路由
app.use('/user',userRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if(err.name === 'UnauthorizedError'){
    res.status(401).send('invalid token');
  }

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
