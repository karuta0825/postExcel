const database = require('../mysql/database');
const querys   = require('../mysql/list_query');
const db       = database.createClient();

/**
 * [register description]
 * @param  {String} version [description]
 * @param  {Array<String,...{id:Number,
 *                           ip:String,
 *                           name:String,
 *                           type:String,
 *                           version:String,
 *                           connnect_db:String,
 *                           domain:String,
 *                           capactity:Number,
 *                           environment_id:Number}>} params  [description]
 * @return {Promise<String>} 'end'
 * @throws {Promise<Exception>} If db transaction fail
 */
function register(version, params) {
  // 全削除クエリ
  let qs = [querys.delete.servers];

  // 追加文のクエリ
  for ( var i=0; i< params.length; i+=1 ) {
    qs.push(querys.insert.servers);
  };

  // 削除対象のパラメータ追加
  params.unshift(version);

  return db.transaction(qs, params)
  .then( r => {
    db.end();
    return r;
  })
}

module.exports = {
  register
}