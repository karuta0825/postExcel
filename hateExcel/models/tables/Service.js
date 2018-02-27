const database = require('../mysql/database');
const querys   = require('../mysql/list_query');
const db       = database.createClient();

function register(version, params, callback) {
  var qs = [querys.delete.servers];
  for ( var i=0; i< params.length; i+=1 ) {
    qs.push(querys.insert.servers);
  };
  params.unshift(version);
  db.transaction( qs, params, function (err, result) {
    db.end();
    callback(err, result);
  });
}

module.exports = {
  register : register
}