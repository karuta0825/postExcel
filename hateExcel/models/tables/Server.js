const database = require('../mysql/database');
const { DbSugar } = require('../mysql/DbSugar');

const db = database.createClient();

function select() {
  return DbSugar.selectAll('servers');
}

function getAvailableUser() {
  return DbSugar.selectAll('available_number_in_each_server');
}

function remove(version) {
  return DbSugar.delete(version, 'servers');
}

function removes(selection) {
  selection.map(async (id) => {
    await remove({ id });
  });
  return Promise.resolve('end');
}

function addRow(input_map) {
  return DbSugar.insert(input_map, 'servers');
}

function update(input_map, id) {
  return DbSugar.update(input_map, id, 'servers');
}

function updates(maps) {
  Object.keys(maps).map(async (id) => {
    await update(maps[id], id);
  });
  return Promise.resolve('end');
}

function register(version, params) {
  const planDel = DbSugar.mkPlan(remove)(version);
  const plans = [planDel];

  params.forEach((param) => {
    plans.push(DbSugar.mkPlan(addRow)(param));
  });

  return db.transaction(plans).then((r) => {
    db.end();
    return r;
  });
}

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
// function register(version, params) {
//   // 全削除クエリ
//   const qs = [querys.delete.servers];

//   // 追加文のクエリ
//   for (let i = 0; i < params.length; i += 1) {
//     qs.push(querys.insert.servers);
//   }

//   // 削除対象のパラメータ追加
//   params.unshift(version);

//   return db.transaction(qs, params)
//     .then((r) => {
//       db.end();
//       return r;
//     });
// }

module.exports = {
  select,
  updates,
  removes,
  getAvailableUser,
  register,
};
