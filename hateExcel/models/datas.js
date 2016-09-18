
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
        callback(results);
      }
    }
  );
};

