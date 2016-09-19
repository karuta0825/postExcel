
// メンバ変数の宣言
var 
  database = require('./database'),
  db = database.createClient(),
  datas = exports
  ;

datas.getAll = function ( callback ) {
  db.query(
    'SELECT * FROM test;',
    function ( err, results, fields ) {
      db.end();
      if ( err ) { return; }
      if ( results && results.length > 0 ) {
        // console.log(results); 
        for ( var i = 0; i<results.length; i+=1 ) {
          console.log(results[i].date.toString());
          results[i].date = results[i].date.toString();
        }

        callback( results );
      }
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