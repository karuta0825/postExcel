
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
var _ = require('./public/js/lib/underscore');

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

  if ( table === 'licenses' ) {
    datas.getLicense( condition, function ( result ) {
      res.json( result );
    })
    return;
  }

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

app.post('/addFenicsAccounts', function ( req, res ) {

  var data = req.body.data;
  data.create_user_id = req.session.uid;

  datas.makeFenicsList( data, data.number_pc_added, function () {
    res.json({'result' : 'ok'});
  });

});

app.post('/addClient', function ( req, res ) {

  var data = req.body.data;
  data.create_user_id = req.session.uid;

  datas.makeClientList( data, data.number_client_added, function () {
    res.json({'result' : 'ok'});
  });

});

app.post('/makeUser', function ( req, res ) {

  var data = req.body.data;

  data.create_user_id = req.session.uid;

  // urlからダイレクトにされたときのために入力チェックする

  datas.makeUser( data, function ( result ) {
    res.json(result);
  });

});

app.post('/makeMemo', function ( req, res ) {

  var data = req.body.data;

  data.create_user_id = req.session.uid;
  data.create_on = new Date();

  datas.makeMemo( data, function ( err ) {
    if ( err ) {
      res.json({ result : 'fail', err : err });
    }
    else {
      res.json({ result : 'ok'});
    }
  });

});


app.post('/delete', function ( req, res ) {

  var
    data = req.body.data
  , table = req.body.table
  , len = 0
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
        else {
          len += 1;
          if ( len === data.length ) {
            res.json({'result' : 'success', 'number' : len });
          }
        }

      });
    }
  } else {
    res.status(500).send('argument is not Array.');
  }


});

app.post('/update', function ( req, res ) {
  var
    data      = req.body.data
  , condition = req.body.condition
  , table     = req.body.table
  ;

  // TODO: table内容で分岐させるクラスをつくる
  if ( table === 'memos' ) {
    data['update_on'] = new Date();
    data['update_user_id'] = req.session.uid;
  }

  // ライセンス更新のとき分岐
  if ( table === 'licenses' ) {
    var ary = [];
    _.each( data, function ( v, k ) {
      if ( v === '1' ) {
        ary.push(k);
      }
    });
    var license;
    if ( ary.length > 1 ) {
      license = { services: ary.join(':')};
    } else {
      license = { services : ary[0] };
    }

    datas.update( license, condition, table, function ( err ) {
      if  ( err ) {
        res.json({ err : err })
        return;
      }
      res.json({ result : 'ok'});
    });
    return;
  }

  // ライセンステーブル以外の更新処理
  datas.update( data, condition, table, function ( err ) {
    if  ( err ) {
      res.json({ err : err })
      return;
    }
    res.json({ result : 'ok'});
  });


});

app.post('/updateFenics', function (req, res) {
  var
    data = req.body.data
  , item = {}
  , condition
  , len = 0
  ;

  for ( var i = 0; i < data.length; i++ ) {


    item.client_id = data[i].client_id || '';

    if ( data[i].start_on ) {
      item.start_on  = data[i].start_on
    }

    condition = data[i].fenics_id;

    datas.update( item, condition, 'fenics', function ( err ) {
      // insert時のエラー処理
      if (err) {
        console.log(err);
        res.json({ result : 'fail', err : err });
      }
      else {
        len += 1;
        if ( len === data.length ) {
          res.json({'result' : 'success', 'number' : len });
        }
      }

    });

  }

});


app.post('/updateClient', function (req, res) {
  var
    data = req.body.data
  , item = {}
  , condition
  , len = 0
  ;

  for ( var i = 0; i < data.length; i++ ) {


    item.fenics_id = data[i].fenics_id || '';

    condition = data[i].client_id;

    datas.update( item, condition, 'clients', function ( err ) {
      // insert時のエラー処理
      if (err) {
        console.log(err);
        res.json({ result : 'fail', err : err });
      }
      else {
        len += 1;
        if ( len === data.length ) {
          res.json({'result' : 'success', 'number' : len });
        }
      }

    });

  }

});

app.post('/master', function ( req, res ) {

  var
    list    = req.body.items
  , table   = req.body.table
  , version = list[0].version
  ;

  // delete
  datas.delete( version, table, function ( err ) {
    // delete時のエラー処理
    if (err) {
      console.log(err);
      res.json({ 'result' : 'fail', 'error' : err });
      return;
    }
    else {
      // insert
      // 何もデータがないとき
      if ( list.length === 0 ) {
        res.json({'result' : 'OK'});
        return;
      }

      if ( table === 'services' ) {
        datas.makeServiceList( list, list.length, function (result) {
          res.json({'result' : 'OK'});
        });
      }

    }

  });

});


/**
 * マスタデータの更新
 * @param  {[type]} req
 * @param  {[type]} res ) {  var    data
 * @return {[type]}
 */
app.post('/m_update', function ( req, res ) {

  var
    data = req.body.data
  , query = req.body.query
  , item
  , condition
  , len = 0
  ;

  // クラス作成
  // 引数に何かを渡すと、それに応じて特定の処理をしてくれる
  if ( Object.prototype.toString.call( data ) === '[object Array]' ) {

    for ( var i = 0; i < data.length; i+= 1 ) {

      item = data[i];
      condition = data[i].id;
      delete item.id;
      delete item.version;

      datas.update( item, condition, query, function ( err ) {
        // insert時のエラー処理
        if (err) {
          console.log(err);
          res.json({ result : 'fail', err : err });
        }
        else {
          len += 1;
          if ( len === data.length ) {
            res.json({'result' : 'success', 'number' : len });
          }
        }

      });
    }
  } else {
    res.status(500).send('argument is not Array.');
  }

});


app.post('/m_server_add', function (req, res) {

  var
    data = req.body.data
  , table = req.body.table
  ;

  // dataがArrayであることが前提だね
  if ( Object.prototype.toString.call( data ) === '[object Array]' ) {
    for ( var i = 0; i < data.length; i+= 1 ) {

      // data[i].environment_id = ?して追加させる。

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



// app.post('/updateColumns', function ( req, res ) {
//   var data = req.body;
//   console.log(data);
//   console.log( req.session.uid );
//   datas.updateColumns( data, req.session.uid, function ( err ) {
//     if ( err ) {
//       res.status( 500 ).send( err.message );
//       return;
//     }
//     res.redirect('/');
//   });
// });

// アップロード用パス
// app.post('/upload', index.upload );

// app.post('/fncadd', function ( req, res ){
//     var num = parseInt( req.body.num, 10 );
//     res.header("Content-Type", "application/json; charset=utf-8");
//     console.log( num );
//     res.json( JSON.stringify( { data :  num + 1 } )) ;
// });


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
