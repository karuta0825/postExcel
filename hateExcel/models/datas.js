
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
    "SELECT U.id, kid, server, genics, userkey, name, DATE_FORMAT( update_on, '%Y-%m-%d') as update_on, company FROM USER AS U"
    + ' INNER JOIN LOGIN_USERS AS L ON U.AUTHOR_ID = L.ID;',
    function ( err, results, fields ) {
      db.end();
      if ( err ) { console.log(err); return; }
      callback( results );
    }
  );
};

datas.getServers = function ( callback ) {
  db.query(
    'SELECT ip, name, type, ENV.environment FROM SERVERS AS SV '
    + 'INNER JOIN ENVIRONMENTS AS ENV ON SV.ENVIRONMENT_ID = ENV.ID '
    + 'ORDER BY environment, name',
    function ( err, results, fields ) {
      db.end();
      if ( err ) { console.log(err); return; }
      console.log(err);
      console.log(results);      
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
    data.id,
    data.name,
    data.age,
    data.tf,
    data.sex
  ];
  console.log(data);
  db.query(
    'INSERT INTO TEST '
      + '(ID, NAME, AGE, TF, SEX, DATE)'
      + 'VALUES '
      + '(?,  ?,    ?,   ?,  ?,   NOW() )'
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