const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const io = require('socket.io')();
const http = require('http');

const headerPrinter = require('./middle/headerPrinter');
const indexRouter = require('./routes');
const userRouter = require('./routes/users');

const app = express();
const port = 1991;
const server = http.createServer(app);

app.io = io;
app.io.attach(server);
app.io.set('transports', ['websocket']);

// view engine setup

// middleware
app.use(logger('dev'));
app.use(headerPrinter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// router
app.use('/', indexRouter);
app.use('/users', userRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

io.use((socket, next) => {
  const token = socket.handshake.query.token;
  console.log(`token is ${token}`);

  if (token !== 'kkw123') {
    return next(new Error('Unauthorized'));
  }

  next();
});

io.on('connection', (socket) => {
  socket.on('hello', (message) => {
    console.log(message);
  });

  socket.on('disconnect', (err) => {
    console.log(err);
  })
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  res.send(`${err.status} ${res.locals.error}`);
});

server.listen(port, () => {
  console.log(`[### Express server is running on ${port}port.]`);
})