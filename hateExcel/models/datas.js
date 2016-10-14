
// メンバ変数の宣言
var 
  database = require('./database'),
  // SQLクエリは別ファイルで管理する
  querys   = require('./list_query'),
  db = database.createClient(),
  datas = exports
  ;

console.log(querys.select.all);

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