/**
 * Module dependencies.
 */

const express = require('express');
const http = require('http');
const path = require('path');
const { setRoute, setAPI } = require('./routes/index');
// const log4js = require('log4js');

let app = express();

// log4js.configure('log4js_config.json');
// var logger = {
//   // どこのファイルにログを出力するかを決めている
//   access  : log4js.getLogger('access'),
//   error   : log4js.getLogger('error'),
//   request : log4js.getLogger('request')
// };

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.cookieParser());
app.use(express.session({ secret: 'password' }));

app.use(express.favicon());
// app.use(log4js.connectLogger(logger['request'], { level :  log4js.levels.INFO} ));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser({ uploadDir: './uploads' }));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// エラーハンドリング
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.statusCode).send(err.message);
});


if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

app = setRoute(app);
app = setAPI(app);

http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
