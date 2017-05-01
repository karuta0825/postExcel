
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
  console.log( querys.select.licenses )
  console.log( params )
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

/**
 * [insert description]
 * @param  {Object}   data
 * @param  {Function} callback
 */
datas.insert = function ( data, callback ) {
  var params = [
    data.kid,
    data.server,
    data.genics,
    data.userkey,
    data.company,
    data.author_id
  ];
  db.query(
    'INSERT INTO KIDS '
      + '(kid, server, genics, userkey, company, author_id, update_on )'
      + 'VALUES '
      + '(?,   ?,      ?,      ?,       ?,       ?,         NOW() )'
      + ';',
    params,
    function ( err, results, fileds ) {
      db.end();
      // エラー時
      if ( err ) {
        callback( err );
        return;
      }
      // 正常時
      callback(null);
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
      callback( null );
     }
  );
}

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
      console.log('end callback(null)');
      return;
    }
  );
};

datas.update = function ( data, callback ) {
  var params = [
    data.age,
    data.name
  ];
  console.log(params);
  db.query(
    'UPDATE TEST SET AGE = ? WHERE NAME = ?',
    params,
    function ( err ) {
      db.end();
      if ( err ) {
        console.log('update error');
        callback( err );
        return;
      }
      callback( null );
    }
  );
}