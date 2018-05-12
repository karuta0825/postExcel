const database = require('../mysql/database');
const querys = require('../mysql/list_query');
const { DbSugar } = require('../mysql/DbSugar');

const db = database.createClient();

function select() {
  return DbSugar.selectAll('services');
}

/**
 * [register description]
 * @param  {[type]} version [description]
 * @param  {Array<String,...{id:Number,
 *                           service_id:String,
 *                           sales_id:String,
 *                           service_name:String,
 *                           version:String,
 *                           is_setup_info:Number}>} params  [description]
 * @return {Promise<String>} end
 * @throws {Promise<Exception>} If db transaction fail
 */
function register(version, params) {
  // 全削除クエリ
  const qs = [querys.delete.services];

  // 追加文のクエリ
  for (let i = 0; i < params.length; i += 1) {
    qs.push(querys.insert.services);
  }

  // 削除対象のパラメータ追加
  params.unshift(version);

  return db.transaction(qs, params)
    .then((r) => {
      db.end();
      return r;
    });
}

module.exports = {
  select,
  register,
};
