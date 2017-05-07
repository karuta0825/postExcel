// メンバ変数の宣言
var
  database = require('./database'),
  // SQLクエリは別ファイルで管理する
  querys   = require('./list_query'),
  db = database.createClient(),
  datas = exports
  ;

datas.authenticate = function ( data, callback ) {
  var
    params = [
      data.user,
      data.pass
    ];

  db.query(
    querys.select.users,
    params,
    function ( err, results, fileds ) {
      db.end();
      // DBエラーのとき
      if ( err ) {
        console.log( err );
        callback(err);
        return;
      }
      // 検索ヒットしたとき
      if ( results && results.length > 0 ) {
        delete results[0].password;
        callback( null, results[0] );
        return;
      }
      // 検索ゼロ件のとき
      console.log( 'err: ' + err );
      callback( err, null )
      return;
    }
  );
};

datas.getAll = function ( callback ) {
  db.query(
    querys.select.all,
    function ( err, results, fields ) {
      db.end();
      if ( err ) { console.log(err); return; }
      callback( results );
    }
  );
};

datas.selectAll = function ( table, callback ) {
  db.query(
    querys.select[table],
    function ( err, results, fields ) {
      db.end();
      if ( err ) {
        console.log(err);
        callback(err);
      }
      callback( results );
    }
  );
};

datas.select = function ( condition, access, callback ) {
  db.query(
    querys.select[access],
    // [condition],
    condition,
    function ( err, results, fields ) {
      db.end();
      if ( err ) {
        console.log(err);
        // エラーもオブジェクトなのでそのまま返す
        callback(err);
      }
      callback(results);
    }
  );
};

datas.getServers = function ( callback ) {
  db.query(
    querys.select.servers,
    function ( err, results, fields ) {
      db.end();
      if ( err ) { console.log(err); return; }
      callback( results );
    }
  );
};

datas.getHeader = function ( callback ) {
  db.query(
    querys.select.header,
    function ( err, results, fields ) {
      db.end();
      if ( err ) { console.log(err); return; }
      callback( results );
    }
  );
};


datas.getColumns = function ( uid, callback ) {
  var params = [uid];
  db.query(
    querys.select.show_columns,
    params,
    function ( err, results, fields ) {
      db.end();
      if ( err ) { console.log(err); return; }
      callback( results );
    }
  );
};

datas.getAccounts = function ( kid, callback ) {
  var params = [kid];
  db.query(
    querys.select.accounts,
    params,
    function ( err, results, fields ) {
      db.end();
      if ( err ) { console.log(err); return; }
      callback( results ) ;
    }
  );
};

datas.getServices = function ( callback ) {
  db.query(
    querys.select.services,
    [],
    function ( err, results, fields ) {
      db.end();
      if ( err ) { console.log(err); return; }
      callback( results ) ;
    }
  );
};

datas.getLicenses = function ( kid, callback ) {
  var params = [kid];
  db.query(
    querys.select.licenses,
    params,
    function ( err, results, fields ) {
      db.end();
      console.log( results );
      if ( err ) { console.log(err); return; }
      callback( results ) ;
    }
  );
};

datas.getBaseInfo = function ( kid, callback ) {
  var params = [kid];
  db.query(
    querys.select.base_info,
    params,
    function ( err, results, fields ) {
      db.end();
      if ( err ) { console.log(err); return; }
      callback( results ) ;
    }
  );
}

/**
 * [insert description]
 * @param  {Object}   data
 * @param  {Function} callback
 */
datas.insert = function ( data, table, callback ) {
  db.query(
    querys.insert[table],
    data,
    function ( err, results, fileds ) {
      db.end();
      // エラー時
      if ( err ) {
        callback( err );
        return;
      }
      // 正常時
      else {
        callback(null);
      }
    }
  );
};

// test
// datas.insert(
//   { kid : 'KID77891', type : '更新', content_name : '基本情報', item_name : 'TEL', before : '090-1111-1111', after : '090-2222-2222', date : new Date(), login_id : '1' },
//   'historys',
//   function (i) {console.log(i);}
// );


datas.delete = function ( data, callback ) {
  var params = [
    data.name
  ];
  db.query(
    'DELETE FROM TEST WHERE NAME= ?;',
     params,
     function ( err, results, fields ) {
      db.end();
      if ( err ) {
        console.log('delete error');
        callback( err );
        return;
      }
      else {
        callback( null );
      }
     }
  );
};

datas.updateColumns = function ( data, uid, callback ) {
  var params = [
    data.kid,
    data.company,
    data.server,
    data.userkey,
    data.genics,
    data.name,
    data.account_number,
    data.update_on,
    uid
  ];
  console.log(params);
  db.query(
    querys.update.columns,
    params,
    function ( err ) {
      db.end();
      if ( err ) {
        callback( err );
        return;
      }
      callback( null );
      return;
    }
  );
};

datas.update = function ( data, condition, table, callback ) {
  db.query(
    querys.update[table],
    [ data, condition ],
    function ( err ) {
      db.end();
      if ( err ) {
        console.log('err');
        callback( err );
        return;
      }
      callback(null);
    }
  );
};

// datas.update(
//   { user_name : 'MMmサービスセンター', address : '東京都品川区' },
//   { kid : 'KID00824' },
//   'customers',
//   function (i) { console.log(i); }
// );

var async = require('async');

var makeUserKey = function ( length ) {
  var c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var l = length;
  var cl = c.length;
  var r = '';

  for(var i=0; i<l; i++){
    r += c[Math.floor(Math.random()*cl)];
  }

  return r;

}


var findNewDbPass = function ( data, callback ) {
  var db_pass = 'U' + makeUserKey(6);

  datas.select(
    db_pass,
    'db_password',
    function ( result ) {
      if ( result.length !== 0 ) {
        console.log(result);
        findNewDbPass( null, callback );
      }
      else {
        // console.log('ok: ' +  db_pass)
        if ( typeof callback === 'function') {
          callback( null, db_pass );
        }
      }
    }
  );
};

var findNewUserkey = function ( data, callback ) {
  var userkey = makeUserKey(6);

  datas.select(
    userkey,
    'userkey',
    function ( result ) {
      if ( result.length !== 0 ) {
        console.log(result);
        findNewUserkey( null, callback );
      }
      else {
        // console.log('ok: ' +  userkey + ' kid: ' + data)

        if ( typeof callback === 'function') {
          callback( null, userkey );
        }
      }
    }
  );
};

var findNewKid = function ( data, callback ) {

  datas.selectAll(
    'kid',
    function ( result ) {
      var kid = Number(result[0].kid.slice(3)) + 1;
      // console.log( 'KID' + kid );
      if ( typeof callback === 'function') {
        callback( null, 'KID' + kid );
      }
    }
  );

};

// findNewKid( null, findNewUserkey );

var tmp = 'XYMMS'
var bool = true;

async.series([
    function(callback) {
        console.log('function1');
        datas.selectAll(
          'kid',
          function ( result ) {
            var kid = Number(result[0].kid.slice(3)) + 1;
            if ( typeof callback === 'function') {
              callback( null, 'KID' + kid );
            }
          }
        );
    },
    function(callback) {
      console.log('function2');

      if ( bool ) {
        var userkey = tmp;
        bool = false;
      }
      else {
        var userkey = makeUserKey(6);
      }

      datas.select(
        userkey,
        'userkey',
        function ( result ) {
          if ( result.length !== 0 ) {
            console.log('not unique');
            findNewUserkey( null, callback );
          }
          else {
            if ( typeof callback === 'function') {
              callback( null, userkey );
            }
          }
        }
      );
    },
    function(callback) {
        console.log('function3');
        findNewDbPass(null, callback );
    }
], function(data, results) {
    console.log(results);
    console.log('end');
});

