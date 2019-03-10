const database = require('../mysql/database');
const { DbSugar } = require('../mysql/DbSugar');

const db = database.createClient();

function select() {
  return DbSugar.selectAll('services');
}

function remove(condition) {
  return DbSugar.delete(condition, 'services');
}

function addRow(input_map) {
  return DbSugar.insert(input_map, 'services');
}

function update(input_map, id) {
  return DbSugar.update(input_map, id, 'services');
}

function updates(maps) {
  Object.keys(maps).map(async (id) => {
    await update(maps[id], id);
  });
  return Promise.resolve('end');
}

function removes(selection) {
  selection.map(async (id) => {
    await remove({ id });
  });
  return Promise.resolve('end');
}

function register(version, params) {
  const planDel = DbSugar.mkPlan(remove)({ version });
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
// function register(version, params) {
//   // 全削除クエリ
//   const qs = [querys.delete.services];

//   // 追加文のクエリ
//   for (let i = 0; i < params.length; i += 1) {
//     qs.push(querys.insert.services);
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
  register,
  updates,
  removes,
  addRow,
};
