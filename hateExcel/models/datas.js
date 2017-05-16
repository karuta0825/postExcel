// メンバ変数の宣言
var
  database = require('./database'),
  // SQLクエリは別ファイルで管理する
  querys   = require('./list_query'),
  db = database.createClient(),
  datas = exports,
  async = require('async')
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
        // console.log(err);
        callback( err );
        return;
      }
      // 正常時
      else {
        callback( null, results );
      }
    }
  );
};


datas.delete = function ( data, query, callback ) {
  db.query(
    querys.delete[query],
     data,
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



datas.update = function ( data, condition, table, callback ) {
  db.query(
    querys.update[table],
    [ data, condition ],
    function ( err ) {
      db.end();
      if ( err ) {
        console.log(err);
        callback( err );
        return;
      }
      callback(null);
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

var makeFenicsKey = function ( length ) {
  var c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var c = 'abcdefghijklmnopwrstrvwxyz';
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
      if ( typeof callback === 'function') {
        callback( null, 'KID' + kid );
      }
    }
  );

};

var findNewFenicsKey = function ( data, callback ) {

  var fenics_key = data || makeFenicsKey(3);

  datas.select(
    fenics_key,
    'isUniqueFenicsKey',
    function ( result ) {
      if ( result.length !== 0 ) {
        console.log('not unique');
        findNewFenicsKey( null, callback );
      }
      else {
        console.log('fenics_key: ' + fenics_key);
        if ( typeof callback === 'function') {
          callback( null, fenics_key );
        }
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
    'find_environment_id',
    function ( result ) {
      console.log(result[0]);
      if ( typeof callback === 'function') {
        callback( null, result[0].id );
      }
    }
  );

};

var getNewFenicsIp = function ( data, callback ) {

  datas.select(
    [],
    'get_new_fenics_ip',
    function ( result ) {
      console.log( result[0].next_ip );
      if ( typeof callback === 'function') {
        callback( null, result[0].next_ip );
      }
    }
  );

};

/**
 * [findLastFenicsId description]
 * @param  {Object}   data
 * @param  {Object}   data.kid         - kid
 * @param  {Object}   data.fenics_key  - fenics_key
 * @param  {Function} callback
 * @return {String}
 */
var findLastFenicsId = function ( data, callback ) {

  datas.select(
    [data.kid],
    'find_last_fenics_id',
    function ( result ) {
      if ( result.length === 0 ) {
        callback( null, data.fenics_key + '0001')
      }
      else {
        callback( null, getNextZeroPadData( result[0].fenics_id ) );
      }
    }
  );

};



var getNextZeroPadData = function ( value ) {
    var
      numOnly  = value.match(/(\d+)$/)[0],
      notNum   = value.substr(0, value.length - numOnly.length),
      fmtNum   = Number(numOnly),
      nextNum  = fmtNum + 1,
      zeroPad  = ( '000' + nextNum ).slice( -1 * numOnly.length ),
      nextData = notNum + zeroPad
      ;
    return nextData;
};

/**
 * 新たなfenicsアカウントを作成
 * @param  {Object}   input_map
 * @param  {Function} callback
 * @return {[type]}
 */
datas.makeFenicsAccount = function ( input_map, callback ) {

  var fenics_account = {};

  async.series([
    function ( callback ) {
      findLastFenicsId( input_map, callback );
    },
    function ( callback ) {
      getNewFenicsIp( null, callback );
    }
  ], function (err, results) {
    if ( err ) { console.log( err ); }

    fenics_account['kid']       = input_map.kid;
    fenics_account['fenics_id'] = results[0];
    fenics_account['password'] = results[0];
    fenics_account['fenics_ip'] = results[1];
    fenics_account['fenics_key'] = input_map.fenics_key;
    fenics_account['create_on'] = new Date();
    // check
    console.log( fenics_account );

    datas.insert( fenics_account, 'make_fenics_account', function ( err, results ) {
      // 連続insertでKIDが重複していた場合、再作成
      if ( err ){
        console.log(err);
        datas.makeFenicsAccount( input_map );
      }
      else {
        if ( typeof callback === 'function') {
          callback(null);
        }
      }
    });

  });
};


datas.makeList = function ( map, idx, callback ) {
  new Promise(function(res, rej) {
    // ループ処理（再帰的に呼び出し）
    function loop(i) {
      // 非同期処理なのでPromiseを利用
      return new Promise(function(resolve, reject) {
        // 非同期処理部分
        setTimeout(function() {
          console.log(i);
          // resolveを呼び出し
          datas.makeFenicsAccount(map);
          resolve(i+1);
        }, 100);
      })
      .then(function(count) {
        // ループを抜けるかどうかの判定
        if (count > idx-1 ) {
          // 抜ける（外側のPromiseのresolve判定を実行）
          res();
        } else {
          // 再帰的に実行
          loop(count);
        }
      });
    }
    // 初回実行
    loop(0);
  }).then(function() {
    // ループ処理が終わったらここにくる
    callback()
    console.log('Finish');
  });
}

// makeList({ fenics_key : 'busiv', kid : 'KID77160' }, 30);

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

      set['kid']            = results[0];
      set['server']         = input_map['server'];
      set['environment_id'] = input_map['environment_id'];
      set['create_user_id'] = input_map['create_user_id'];
      set['create_on']      = new Date();


      datas.insert( set, 'make_user', function ( result ) {
        // 連続insertでKIDが重複していた場合、再作成
        if ( result && result.errno === 1062 ){
          datas.make_user( input_map );
        }
        else {
          callback(set);
        }
      });
      // callback(set);
  });
};

// for( var i = 0; i < 100; i += 1) {
  // make_user(4, 1);
// }

// findNewFenicsKey('nfg');
// getNewFenicsIp();

// findLastFenicsId({ fenics_key : 'busiv', kid : 'KID77576' }, function( err, result ) {
//   console.log(result);
// });
