
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var index = require('./routes/index');
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
app.use(express.bodyParser({uploadDir:'./uploads'}));
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
      req.session.uid = results.id;
    }

    res.redirect('/');
    return;
  });

});

app.get('/logout', function ( req, res ) {
  req.session.pass = null;
  res.redirect('/');
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

app.post('/select', function ( req, res ) {
  var
    condition = req.body.condition
  , table = req.body.table
  ;

  res.header("Content-Type", "application/json; charset=utf-8");

  if ( condition ) {
    datas.select( condition, table, function ( results ) {
      res.json( results );
    });
  }
  else {
    datas.selectAll( table, function ( results ) {
      res.json( results );
    });
  }

});

app.get('/servers', function ( req, res ) {
  res.header("Content-Type", "application/json; charset=utf-8");
  datas.getServers( function ( results ) {
    res.json( results );
  });
});


app.get('/tableHeader', function ( req, res ) {
  res.header("Content-Type", "application/json; charset=utf-8");
  datas.getHeader( function ( results ) {
    res.json( results );
  });
});

app.get('/columns', function ( req, res ) {
  var uid = req.session.uid;
  res.header("Content-Type", "application/json; charset=utf-8");
  datas.getColumns( uid, function ( results ) {
    res.json( results );
  });
});

app.post('/columns', function ( req, res ) {
  var
    headerMap = req.body.headerMap,
    uid       = req.session.uid
    ;

  datas.update( headerMap, uid, function ( err ) {
    if ( err ) {
      res.status( 500 ).send( err.message );
      return;
    }
  });

});

app.post('/accounts', function ( req, res ) {
  var kid = req.body.kid;
  console.log()
  res.header("Content-Type", "application/json; charset=utf-8");
  datas.getAccounts( kid, function ( results ) {
    res.json( results );
  });
});

app.get('/services', function ( req, res ) {
  res.header("Content-Type", "application/json; charset=utf-8");
  datas.getServices( function ( results ) {
    res.json( results );
  });
});

app.post('/licenses', function ( req, res ) {
  var kid = req.body.kid;
  res.header("Content-Type", "application/json; charset=utf-8");
  datas.getLicenses( kid, function ( results ) {
    res.json( results );
  });
});

app.post('/baseInfo', function ( req, res ) {
  var kid = req.body.kid;
  console.log(kid);
  res.header("Content-Type", "application/json; charset=utf-8");
  datas.getBaseInfo( kid, function ( results ) {
    res.json( results );
  });
});


app.post('/insert', function ( req, res ) {
  //post送信で渡ってきたデータ
  var
    data = req.body.data
  , table = req.body.table
  ;

  // dataがArrayであることが前提だね
  if ( Object.prototype.toString.call( data ) === '[object Array]' ) {
    for ( var i = 0; i < data.length; i+= 1 ) {
      data[i]['create_user_id'] = req.session.uid;
      data[i]['create_on'] = new Date();

      datas.insert( data[i], table, function ( err ) {
        // insert時のエラー処理
        if (err) {
          console.log(err);
          res.status( 500 ).send( err.message );
          return;
        }

      });
    }
  }
  res.status(200).send('ok');

});

app.post('/makeUser', function ( req, res ) {

  var data = req.body.data;

  data.create_user_id = req.session.uid;

  datas.make_user( data, function ( result ) {
    res.status(200).send('ok');
  });

});


app.post('/delete', function ( req, res ) {

  var
    data = req.body.data
  , table = req.body.table
  ;

  // dataがArrayであることが前提だね
  if ( Object.prototype.toString.call( data ) === '[object Array]' ) {
    for ( var i = 0; i < data.length; i+= 1 ) {

      datas.delete( data[i], table, function ( err ) {
        // insert時のエラー処理
        if (err) {
          console.log(err);
          res.status( 500 ).send( err.message );
          return;
        }

      });
    }
  }

  res.status(200).send('delete success');

});

app.post('/update', function ( req, res ) {
  var
    data      = req.body.data
  , condition = req.body.condition
  , table     = req.body.table
  ;

  datas.update( data, condition, table, function ( err ) {
    if  ( err ) {
      res.status( 500 ).send( err.message );
      return;
    }
    res.status(200).send('ok');
    // res.redirect('/');
  });

});


app.post('/updateColumns', function ( req, res ) {
  var data = req.body;
  console.log(data);
  console.log( req.session.uid );
  datas.updateColumns( data, req.session.uid, function ( err ) {
    if ( err ) {
      res.status( 500 ).send( err.message );
      return;
    }
    res.redirect('/');
  });
});

// アップロード用パス
app.post('/upload', index.upload );

app.post('/fncadd', function ( req, res ){
    var num = parseInt( req.body.num, 10 );
    res.header("Content-Type", "application/json; charset=utf-8");
    console.log( num );
    res.json( JSON.stringify( { data :  num + 1 } )) ;
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
