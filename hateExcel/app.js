
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
// var log4js = require('log4js');

var app = express();

// log4js.configure('log4js_config.json');
// var logger = {
//   // どこのファイルにログを出力するかを決めている
//   access  : log4js.getLogger('access'),
//   error   : log4js.getLogger('error'),
//   request : log4js.getLogger('request')
// };

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.cookieParser());
app.use(express.session({ secret: "password" }));

app.use(express.favicon());
// app.use(log4js.connectLogger(logger['request'], { level :  log4js.levels.INFO} ));
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
  res.render('login', { message : ''} );
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

app.post('/makeLoginAccount', function (req, res) {

  var data = {
    uid      : req.body.id  ,
    name     : req.body.name,
    password : req.body.pass,
    newadd   : 1
  };

  datas.makeLoginAccount(data, function (err) {
    res.render('complete');
  })

});

app.get('/', function ( req, res ) {
  if ( !req.session.pass ) {
    res.redirect('/login');
    return;
  }
  else {
    // logger['access'].info('Access uid is', req.session.uid );
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

  if ( table === 'add_info' ) {
    datas.getAddInfo( condition, function ( result ) {
      res.json( result );
    });
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
  , idx = 0
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
          res.status( 500 ).send( {error : err} );
          return;
        }

        idx++;
        console.log('idx increment');
        console.log(idx);

        console.log( idx === data.length );

        if ( idx === data.length ) {
          console.log('end');
          res.json({'result' : 'ok'});
        }

      });
    }
  }

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

app.post('/addMobileClient', function ( req, res ) {

  var data = req.body.data;
  data.create_user_id = req.session.uid;

  datas.makeMobileList( data, data.number_client_added, function (err) {
    res.json({'result' : 'ok'});
  });

});

app.post('/makeUser', function ( req, res ) {

  var data = req.body.data;

  data.create_user_id = req.session.uid;

  // urlからダイレクトにされたときのために入力チェックする

  datas.makeUser( data, function ( result ) {

    datas.makeBase({kid : result.kid}, function () {
      res.json(result);
    })

  });

});

app.post('/addBase', function ( req, res ) {

  var kid = req.body.kid;

  datas.makeBase({kid:kid}, function (err) {
    if ( err ) {
      res.status(500).send({error : err});
      return;
    }

    res.json({'result' : 'ok'});

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
      // res.json(err)
      // logger['error'].error("Something went wrong:", err );
      res.status(500).send({ error: err });
      return;
    }
    res.json({ result : 'ok'});
  });


});

app.post('/isUniqueIp', function (req, res) {
  var ip = req.body.ip;

  console.log(ip);

  datas.select( ip, 'is_unique_fenics_ip', function ( result ) {
    res.json( result );
  });

});

app.post('/isUniqueFenicsKey', function ( req, res ) {

  var fenicsKey = req.body.fenicsKey;

  datas.select( fenicsKey, 'is_unique_fenicskey_for_update', function ( result ) {
    res.json( result );
  });

});

app.post('/isUniqueUserKey', function ( req, res ) {

  var userkey = req.body.userkey;

  datas.select( userkey, 'is_unique_userkey_for_update', function ( result ) {
    res.json( result );
  });

});

app.post('/isUniqueDBPass', function ( req, res ) {

  var db_password = req.body.db_password;

  datas.select( db_password, 'is_unique_db_password_for_update', function ( result ) {
    res.json( result );
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

    console.log(data[i]);

    item.fenics_id = data[i].fenics_id || '';

    item.start_on = ( data[i].start_on ) ? data[i].start_on : null;

    item.end_on = ( data[i].end_on ) ? data[i].end_on : null;

    if ( data[i].fenics_ip ) {
      item.fenics_ip = inet_aton(data[i].fenics_ip);
    }

    condition = data[i].fenics_id;

    datas.update( item, condition, 'fenics', function ( err ) {
      // insert時のエラー処理
      if (err) {
        console.log(err);
        res.status(500).send({ error: err });
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
          return
        });
      }

      if ( table === 'servers' ) {
        datas.makeServerList( list, list.length, function (result) {
          res.json({'result' : 'OK'});
          return
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
  , idx = 0
  ;

  // dataがArrayであることが前提だね
  if ( Object.prototype.toString.call( data ) === '[object Array]' ) {
    for ( var i = 0; i < data.length; i+= 1 ) {

      datas.insert( data[i], table, function ( err ) {
        // insert時のエラー処理
        if (err) {
          console.log(err);
          res.status( 500 ).send( err.message );
          return;
        }

        idx++;

        if ( idx === data.length ) {
          console.log('end');
          res.json({'result' : 'ok'});
        }

      });
    }
  }

});


function inet_aton(ip){
    // split into octets
    var a = ip.split('.');
    var buffer = new ArrayBuffer(4);
    var dv = new DataView(buffer);
    for(var i = 0; i < 4; i++){
        dv.setUint8(i, a[i]);
    }
    return(dv.getUint32(0));
}

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
