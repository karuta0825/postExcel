
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var datas = require('./models/datas');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.cookieParser());
app.use(express.session({ secret: "password" }));

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/login', function ( req, res ) {
  res.render('login', { title : 'login'} );
});

app.post('/login', function ( req, res ) {
  var user = req.body.user || '';
  var pass = req.body.pass || '';

  // 認証
  datas.authenticate( req.body, function ( err, results ) {

    // DBエラー出ないとき、検索結果がゼロ出ないときは、ログインできる
    if ( err !== null || results !== null ) {
      req.session.pass = true;
      req.session.uid = results.user_id;
    }

    res.redirect('/');
    return;
  });

});

app.get('/', function ( req, res ) {
  if ( !req.session.pass ) {
    res.redirect('/login');
    return;
  }
  else {
    res.render('index');
    return;
  }
});

app.get('/all', function ( req, res ) {

  res.header("Content-Type", "application/json; charset=utf-8");
  datas.getAll( function (results){
    res.json(results);  
  });

});

app.get('/servers', function ( req, res ) {
  res.header("Content-Type", "application/json; charset=utf-8");
  datas.getHeader( function ( results ) {
    res.json( results );
  });
});

app.get('tableHeader', function ( req, res ) {
  res.header("Content-Type", "application/json; charset=utf-8");
  datas.getServers( function ( results ) {
    res.json( results );
  });
});

app.get('/tableInfo', function ( req, res ) {
  var users = req.session.uid;
  res.header("Content-Type", "application/json; charset=utf-8");
  datas.getServers( function ( results ) {
    res.json( results );
  });  
});

app.get('/columns', function ( req, res ) {
  res.header("Content-Type", "application/json; charset=utf-8");
  datas.getServers( function ( results ) {
    res.json( results );
  });
});

app.post('/add', function ( req, res ) {
  console.log(req.body);
  //post送信で渡ってきたデータ
  var data = req.body;
  datas.insert( data, function ( err ) {
    // insert時のエラー処理
    if (err) {
      console.log(err);
      res.status( 500 ).send( err.message );
      return;
    }
  });
});

app.post('/delete', function ( req, res ) {
  var data = req.body;
  datas.delete( data, function ( err ) {
    if ( err ) {
      res.status( 500 ).send( err.message );
      return;
    }
  });
});

app.post('/update', function ( req, res ) {
  var data = req.body;
  console.log(data);
  datas.update( data, function ( err ) {
    if ( err ) {
      res.status( 500 ).send( err.message );
      return;
    }
  });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
