// メンバ変数の宣言
var
  async    = require('async')
  database = require('./database'),
  querys   = require('./list_query'),
  flow     = require('./flow'),
  moment   = require('../public/js/lib/moment.min'),
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
      if ( results && results.length > 0 && results[0].newadd === 0) {
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

datas.makeLoginAccount = function ( data, callback ) {

  db.query(
    querys.insert.make_login_account,
    [ data ],
    function ( err, results, fileld ) {
      if ( err ) {
        console.log(err);
        callback(err);
        return
      }
      callback(null);
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
        return;
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
        callback(err);
        return;
      }
      callback(results);
    }
  );
};


datas.getHeader = function ( callback ) {
  db.query(
    querys.select.show_columns,
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
        console.log(err);
        callback( err );
        return;
      }
      callback( null, results );
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
        console.log(err);
        callback( err );
        return;
      }
      callback( null );
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


var makeUserKey = function ( length ) {
  var c = 'ABCDEFGHIJKLMNPQRSTUVWXYZ';
  var l = length;
  var cl = c.length;
  var r = '';

  for(var i=0; i<l; i++){
    r += c[Math.floor(Math.random()*cl)];
  }

  return r;

};

var makeFenicsKey = function ( length ) {

  var c = 'abcdefghijklmnopwrstrvwxyz';
  var l = length;
  var cl = c.length;
  var r = '';

  for(var i=0; i<l; i++){
    r += c[Math.floor(Math.random()*cl)];
  }

  return r;

};

var makeMoblieFenicsKey = function () {
  var num = Math.floor( Math.random() * 9 + 1);

  return 'm' + num + makeFenicsKey(3);
};

var makeMobileAdminPw = function ( adminId ) {
  var c = '1234567890';
  var cl = c.length;
  var r = '';

  for(var i=0; i<2; i++){
    r += c[Math.floor(Math.random()*cl)];
  }
  return adminId + r;
};


/**
 * 旧台帳と同じ変換方法を利用してＤＢパスワードを求める
 * @param  {String} userkey    - ユーザーキー
 * @return {String} dbpassword - ＤＢパスワード
 */
var findNewDbPass = function ( userkey ) {

  var convert = userkey.replace(/A/g,"4")
                       .replace(/B/g,"8")
                       .replace(/E/g,"3")
                       .replace(/G/g,"6")
                       .replace(/I/g,"1")
                       .replace(/O/g,"0")
                       .replace(/S/g,"5")
                       .replace(/T/g,"7")
                       .replace(/Z/g,"2")
                       ;

  return 'U53R' + convert;

};

var findNewUserkey = function ( data, callback ) {
  var userkey =  makeUserKey(6);

  datas.select(
    userkey,
    'find_new_userkey',
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
    'find_new_kid',
    function ( result ) {
      var kid = Number(result[0].kid) + 1;
      if ( typeof callback === 'function') {
        callback( null,  kid );
      }
    }
  );

};

var findNewFenicsKey = function ( data, callback ) {

  var fenics_key = data || makeFenicsKey(4);
  datas.select(
    fenics_key,
    'is_unique_fenicskey',
    function ( result ) {
      if ( result.length !== 0 ) {
        console.log('not unique');
        findNewFenicsKey( null, callback );
      }
      else {
        if ( typeof callback === 'function') {
          callback( null, fenics_key );
        }
      }
    }
  );
};

var findNewMobileFenicsKey = function ( data, callback ) {

  var fenics_key = data || makeMoblieFenicsKey();

  datas.select(
    fenics_key,
    'is_unique_fenicskey',
    function ( result ) {
      if ( result.length !== 0 ) {
        console.log('not unique');
        findNewMobileFenicsKey( null, callback );
      }
      else {
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

var makeNewFenicsIp = function ( data, callback ) {

  datas.select(
    [],
    'get_new_fenics_ip',
    function ( result ) {
      if ( typeof callback === 'function') {
        callback( null, result[0].next_ip );
      }
    }
  );

};

/**
 * [makeNewFenicsId description]
 * @param  {Object}   data
 * @param  {Object}   data.kids_id     - kids_id
 * @param  {Object}   data.fenics_key  - fenics_key
 * @param  {Function} callback
 * @return {String}
 */
var makeNewFenicsId = function ( data, callback ) {

  datas.select(
    [data.kids_id],
    'find_last_fenics_id',
    function ( result ) {
      if ( result.length === 0 ) {
        callback( null, data.fenics_key + '01001');
      }
      else {
        callback( null, getNextZeroPadData( result[0].fenics_id ) );
      }
    }
  );

};

/**
 * [makeNewClient description]
 * @param  {Object}   data
 * @param  {String}   data.kids_id
 * @param  {String}   data.user_key
 * @param  {Function} callback
 */
var makeNewClientId = function ( data, callback ) {

  datas.select(
    [data.kids_id],
    'find_last_client_id',
    function ( result ) {
      console.log(result);
      if ( result.length === 0 ) {
        callback( null, data.userkey + '0001')
      }
      else {
        callback( null, getNextZeroPadData( result[0].client_id ) );
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
var makeFenicsAccount = function ( input_map, idx, callback ) {

  var fenics_account = {};

  async.series([
    function ( callback ) {
      makeNewFenicsId( input_map, callback );
    },
    function ( callback ) {
      makeNewFenicsIp( null, callback );
    }
  ], function (err, results) {
    if ( err ) { console.log( err ); }

    fenics_account['kids_id']    = input_map.kids_id;
    fenics_account['fenics_id']  = results[0];
    fenics_account['password']   = results[0];
    fenics_account['pc_name']    = results[0].toUpperCase();
    fenics_account['fenics_ip']  = results[1];
    fenics_account['start_on']   = new Date();
    fenics_account['create_on']  = new Date();
    fenics_account['is_mobile']  = 0;

    // check
    // console.log( fenics_account );

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

/**
 * windows接続クライアントを作成
 * @param  {[type]}   input_map
 * @param  {Function} callback
 * @return {[type]}
 */
var makeClient = function ( input_map, idx, callback ) {

  var client = {};

  async.series([
    function ( callback ) {
      makeNewClientId( input_map, callback );
    }
  ], function ( err, results ) {
    if ( err ) { console.log(err); }

    client['kids_id']        = input_map.kids_id
    client['client_id']      = results[0];
    client['client_pass']    = results[0];
    client['create_on']      = new Date();
    client['create_user_id'] = input_map.create_user_id;
    client['is_admin']       = 0;

    console.log(client);
    datas.insert( client, 'make_client', function ( err, result ) {
      if ( err ) {
        console.log(err);
        datas.makeClient( input_map );
      }
      else {
        if ( typeof callback === 'function' ) {
          callback(null);
        }
      }
    });

  });

};

var makeService = function ( list_item, idx, callback ) {

  var data = list_item[idx];
  datas.insert( data, 'services', function ( err, results ) {
    // 連続insertでKIDが重複していた場合、再作成
    if ( err ){
      console.log(err);
      callback( err );
      return;
    }

    if ( typeof callback === 'function') {
      callback({ result : 'OK'});
    }

  });

};

var makeServer = function ( list_item, idx, callback ) {

  var data = list_item[idx];
  console.log(idx);
  console.log(data);

  datas.insert( data, 'servers', function ( err, results ) {
    // 連続insertでKIDが重複していた場合、再作成
    if ( err ){
      console.log(err);
      callback( err );
      return;
    }

    if ( typeof callback === 'function') {
      callback({ result : 'OK'});
    }

  });

};

var makeNewMobileFenicsId = function ( data, callback ) {

  return new Promise( function (res,rej) {
      datas.select(
      [data.kids_id],
      'find_last_mobile_fenics_id',
      function ( result ) {
        if ( result.length === 0 ) {
          res( data.fenics_key + '001' );
        }
        else {
          res( getNextZeroPadData( result[0].fenics_id ) );
        }
      }
    );
  });

};

var makeNewMobileFenicsIp = function ( data, callback ) {

  return new Promise( function ( res, rej ) {
    datas.select(
      [],
      'get_new_fenics_ip',
      function ( result ) {
        if ( result.length !== 0 ) {
          res( result[0].next_ip );
        }
      }
    );
  });

};


/**
 * [makeMobileUser description]
 * @param  {Object}   input_map  - オブジェクト化した引数
 * @param  {Number}   idx        - ループ現在番号
 * @param  {Function} cb_resolve - 非同期処理終了後の合図
 */
var makeMobileUser = function ( input_map, idx, cb_resolve ) {

  var fenics_account = {};

  Promise.all([
    makeNewMobileFenicsId(input_map),
    makeNewMobileFenicsIp(null)
  ]).
  then( function (results) {

    fenics_account['kids_id']    = input_map.kids_id;
    fenics_account['fenics_id']  = results[0];
    fenics_account['password']   = results[0];
    fenics_account['fenics_ip']  = results[1];
    fenics_account['start_on']   = new Date();
    fenics_account['create_on']  = new Date();
    fenics_account['is_mobile']  = 1;

    datas.insert( fenics_account, 'make_fenics_account', function ( err, results ) {
      if ( err ){
        console.log(err);
        return;
      }
      else {
        cb_resolve(null);
      }
    });

  });

};


/**
 * fenicsアカウント作成関数
 */
datas.makeFenicsList = flow.makeSyncLoop( makeFenicsAccount );

datas.makeClientList = flow.makeSyncLoop( makeClient );

datas.makeServiceList = function ( version, params, callback ) {
  var qs = [querys.delete.services];
  for ( var i=0; i< params.length; i+=1 ) {
    qs.push(querys.insert.services);
  };
  params.unshift(version);
  db.transaction( qs, params, function (err, result) {
    db.end();
    callback(err, result);
  });

};

datas.makeServerList = function ( version, params, callback ) {
  var qs = [querys.delete.servers];
  for ( var i=0; i< params.length; i+=1 ) {
    qs.push(querys.insert.servers);
  };
  params.unshift(version);
  db.transaction( qs, params, function (err, result) {
    db.end();
    callback(err, result);
  });

};

datas.makeMobileList = flow.makeSyncLoop( makeMobileUser );

/**
 * 空ユーザー作成関数
 * @param  {Object}   input_map                - 入力引数
 * @param  {String}   input_map.system_type    - オンプレ or クラウド
 * @param  {String}   input_map.version        - LM or ES
 * @param  {Number}   input_map.environment    - 環境ID
 * @param  {String}   input_map.server         - サーバ名
 * @param  {Number}   input_map.create_user_id - 作成ユーザーID
 * @param  {Function} callback                 - 非同期処理終了後の実行関数
 */
datas.makeUser = function ( input_map, callback ) {
  var set = {};
  async.series([
      function(callback) {
        findNewKid( input_map.environment_id, callback );
      },
      function(callback) {
        findNewUserkey(null, callback );
      },
      function(callback) {
        findNewFenicsKey(null, callback);
      }
  ], function(err, results) {
      if ( err ) { console.log( err ); }

      set['kid']            = input_map.kid || results[0];
      set['userkey']        = results[1];
      set['db_password']    = findNewDbPass(results[1]);
      set['fenics_key']     = results[2];
      set['server']         = input_map['server'];
      set['environment_id'] = input_map['environment_id'];
      set['create_user_id'] = input_map['create_user_id'];
      set['create_on']      = new Date();

      console.log(set);

      datas.insert( set, 'make_user', function ( err, result ) {
        // 連続insertでKIDが重複していた場合、再作成
        if ( err && err.errno === 1062 ){
          delete input_map.kid;
          datas.makeUser( input_map, callback );
        }
        else {
          set['kids_id'] = result.insertId;
          callback(set);
        }
      });
  });
};


var findLastBaseId = function ( kids_id ) {
  return new Promise( function ( res, rej ) {
    datas.select( kids_id, 'find_last_base_id', function (r) {
      console.log(r);
      res( r[0].base_id );
    });
  });
};

/**
 * 指定した拠点idをもつレコードをbusivとmobilesに追加する
 * @param  {[type]}   input_map
 * @param  {Function} callback
 * @return {[type]}
 */
datas.makeBase = function ( input_map, callback ) {

  findLastBaseId(input_map.kids_id)
  .then( function (r) {
    input_map['base_id'] = r;
    datas.insert( input_map, 'make_busiv', function ( err ,result ) {
      if ( err ) { console.log(err); }
    });
  })
  .then( function (r) {
    return new Promise( function ( res, rej ) {
      findNewMobileFenicsKey( null, function ( err, result ) {
        res( result );
      });
    });
  })
  .then( function (r) {
    input_map['fenics_key'] = r;
  })
  .then( function () {

    input_map['admin_id']   = input_map['fenics_key'];
    input_map['admin_pw']   = makeMobileAdminPw( input_map['fenics_key'] );

    // モバイルテーブルに追加
    datas.insert(input_map, 'make_mobiles', function (err, result) {
      if ( typeof callback === 'function') {
        callback(err);
      }
    });

  });

};

datas.makeMemo = function ( input_map, callback ) {

  datas.insert( input_map, 'make_memo', function ( err, result ) {
    if ( err ){
      callback(err);
    }
    else {
      callback(null);
    }
  });

};

/**
 * 指定された月から前3ヶ月分のデータを渡す
 * @param  {String} month
 * @return {Array}
 */
datas.getAddInfo = function ( month, callback ) {

  var
    index_month = moment(month)
  , pre = index_month.add(-1, 'months').format('YYYY/MM')
  , prepre = index_month.add(-1, 'months').format('YYYY/MM')
  , list
  ;

  list = [ month, month, pre, pre, prepre, prepre ];

  datas.select( list, 'get_add_info_in_three_month', function ( result ) {
    callback( result );
  });

};

/**
 * KIDから使用ライセンスを取得
 * @param  {[type]}   kid
 * @param  {Function} callback
 * @return {Object}
 */
datas.getLicense = function ( kids_id, callback ) {
  datas.select(
    [kids_id],
    'get_version_by_kid',
    function ( result ) {
      // ライセンス文字列からオブジェクトに変換
      datas.select( result[0].version,'get_services_by_version', function ( services ) {

        // サービス一覧オブジェクト生成
        var obj = {};
        for ( var i = 0; i < services.length ; i += 1 ) {
          obj[ services[i].service_id ] = 0;
        }

        // 使用ライセンスのフラグ立て
        datas.select(kids_id, 'licenses',function ( result ) {
          var
            str_licenses = result[0].services || ''
          , list_licenses = []
          ;

          if ( str_licenses.indexOf(':') > 0 ) {
             list_licenses = str_licenses.split(':');
          } else {
            if ( str_licenses ) {
              list_licenses = [ str_licenses ];
            }
          }


          for ( var i = 0 ; i < list_licenses.length ; i+=1 ) {
            obj[list_licenses[i]] = 1;
          }

          obj.kids_id = result[0].kids_id;

          if ( typeof callback === 'function' ){
            callback([obj]);
          }

        });

      });
    }
  );

};


///////////////
// unit test //
///////////////

// for( var i = 0; i < 100; i += 1) {
  // make_user(4, 1);
// }

// findNewFenicsKey('nfg');
// makeNewFenicsIp();

// makeNewFenicsId({ fenics_key : 'busiv', kid : 'KID77576' }, function( err, result ) {
//   console.log(result);
// });

// makeNewClient({kid : 'KID77160'});

// datas.getLicense('KID92468');
// datas.getLicense('KID02907');


// 複数インサートテスト
// var lists = [
//   {          service_id : 'B1', service_name : 'B1', version : 'LM' },
//   {          service_id : 'B3', service_name : 'B2', version : 'LM' },
//   {          service_id : 'B4', service_name : 'B2', version : 'LM' },
//   {          service_id : 'B5', service_name : 'B2', version : 'LM' },
//   {          service_id : 'B6', service_name : 'B2', version : 'LM' },
//   {          service_id : 'B7', service_name : 'B2', version : 'LM' },
//   { id : 70, service_id : 'A1', service_name : 'A1', version : 'LM' },
//   { id : 73, service_id : 'A4', service_name : 'A4', version : 'LM' },
//   {          service_id : 'B2', service_name : 'B2', version : 'LM' },
//   {          service_id : 'B8', service_name : 'B2', version : 'LM' },
//   {          service_id : 'B9', service_name : 'B2', version : 'LM' },
//   {          service_id : 'M2', service_name : 'B2', version : 'LM' },
//   {          service_id : 'M3', service_name : 'B2', version : 'LM' },
//   {          service_id : 'M4', service_name : 'B2', version : 'LM' },
//   {          service_id : 'M5', service_name : 'B2', version : 'LM' },
//   {          service_id : 'M6', service_name : 'B2', version : 'LM' },
//   {          service_id : 'M7', service_name : 'B2', version : 'LM' },
//   {          service_id : 'M8', service_name : 'B2', version : 'LM' },
//   {          service_id : 'M9', service_name : 'B2', version : 'LM' },
//   { id : 71, service_id : 'A2', service_name : 'A2', version : 'LM' },
//   { id : 72, service_id : 'A3', service_name : 'A3', version : 'LM' }
// ];
// datas.makeServiceList( lists, lists.length, function (result) {
//   console.log( result );
// });

// モバイルユーザー追加用
// datas.makeMobileUserList({kid:'KID98375', fenics_key : 'm4wlm' }, 3, function (err) {
//   console.log('heelo');
// });

// ビジVテスト
// datas.insert({ kid : 'KID77777' }, 'make_busiv', function (err, result) {
//   console.log(result.insertId);
//   console.log(result);
// });

// 拠点追加テスト
// datas.makeBase({kid:'KID77777'}, function () {
//     console.log('finish');
// });




