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
      callback( err, null );
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
        console.log(err);
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

};


var findNewDbPass = function ( data, callback ) {
  var db_pass = 'U' + makeUserKey(6);

  datas.select(
    db_pass,
    'db_password',
    function ( result ) {
      if ( result.length !== 0 ) {
        console.log('not unique');
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
        console.log('not unique');
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

  datas.select(
    [data],
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

var findEnvironmentId = function ( data, callback ) {

  var params = [
    data.system_type,
    data.version
  ];

  datas.select(
    params,
    'findEnvironmentId',
    function ( result ) {
      console.log(result[0]);
      if ( typeof callback === 'function') {
        callback( null, result[0].id );
      }
    }
  );

};


datas.make_user = function ( input_map, callback ) {
  var set = {};
  async.series([
      function(callback) {
        findNewKid( input_map.environment_id, callback );
      },
      function(callback) {
        findNewUserkey(null, callback );
      },
      function(callback) {
        findNewDbPass(null, callback );
      }
  ], function(err, results) {
      if ( input_map.system_type === 'cloud' ) {
        set['userkey']        = results[1];
        set['db_password']    = results[2];
      }

      set['kid']           = results[0];
      set['server']         = input_map['server'];
      set['environment_id'] = input_map['environment_id'];
      set['create_user_id'] = input_map['create_user_id'];
      set['create_on']      = new Date();

      console.log(set);

      datas.insert( set, 'make_user', function ( result ) {
        // 連続insertでKIDが重複していた場合、再作成
        if ( result ){
          datas.make_user( input_map );
        }
        else {
          callback(result);
        }
      });
      // callback(set);
  });
};

// for( var i = 0; i < 100; i += 1) {
  // make_user(4, 1);
// }