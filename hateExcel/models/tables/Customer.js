/**
 * Cutomersテーブ
 */

const { DbSugar } = require('../mysql/DbSugar');

/**
 * [select description]
 * @param  {string} kids_id
 * @return {[{
 *           kid_id: string,
 *           base_id: number,
 *           base_name: string,
 *           postal_cd: string,
 *           address: string,
 *           owner: string,
 *           affiliation: string,
 *           tel: string,
 *           fax: string,
 *           email: string,
 *           has_busiv: number,
 *           has_fenics: number,
 *           has_mobile: number,
 *         }]}
 */
async function select(kids_id) {
  if (!kids_id) {
    throw new Error('引数を指定してください');
  }
  return DbSugar.select(kids_id, 'customers');
}

/**
 * [findLastBaseId description]
 * @param  {string} kids_id
 * @return {Promise<Number>}
 */
async function findLastBaseId(kids_id) {
  if (!kids_id) {
    throw new Error('引数を指定してください');
  }
  return DbSugar.select(kids_id, 'find_last_base_id').then(r => r[0].base_id);
}

/**
 * 拠点追加これは必要だ
 * @param {Object} input_map
 */
async function addRow(input_map) {
  if (!input_map.kids_id) {
    throw new Error('引数を指定してください');
  }
  console.log(input_map);
  return DbSugar.insert(input_map, 'add_base');
}

/**
 * [update description]
 * @param  {Object} input_map
 *         {string} ?base_name
 *         {string} ?postal_cd
 *         {string} ?address
 *         {string} ?owner
 *         {string} ?affliation
 *         {string} ?tel
 *         {string} ?fax
 *         {string} ?email
 *         {number} ?has_buisv
 *         {number} ?has_fenics
 *         {number} ?has_mobile
 * @param  {Object} condition
 *         {string} base_id
 * @return {[type]}           [description]
 */
function update(input_map, condition) {
  return DbSugar.update(input_map, condition, 'customers');
}

/**
 * [remove description]
 * @param  {Object} condition
 *         {string} base_id
 * @return {Promise<>}
 */
function remove(condition) {
  return DbSugar.delete(condition, 'customers');
}

module.exports = {
  select,
  findLastBaseId,
  addRow,
  update,
  remove,
  planUpdate: DbSugar.mkPlan(update),
};
