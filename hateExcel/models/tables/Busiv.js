
const { DbSugar } = require('../mysql/DbSugar');

/**
 * @param  {string} kids_id
 * @return {[{
 *           kid_id: string,
 *           base_id: string,
 *           information: any
 *         }]}
 */
function select(kids_id) {
  return DbSugar.select(kids_id, 'busivs')
    .then(r => r.map(item => JSON.parse(item.information)));
}

/**
 * 拠点テーブルに指定したkid_idの行を追加する
 * @param {String} kids_id [description]
 * @param {Number} base_id [description]
 * @return {Promise<any>} [description]
 *
 * @throws {Promise<Exception>}
 *
 */
async function addRow(kids_id, base_id) {
  if (!kids_id || !base_id) {
    throw new Error('引数を指定してください');
  }
  return DbSugar.insert({ kids_id, base_id }, 'make_busiv');
}

function update(input_map, condition) {
  return DbSugar.update(input_map, condition, 'busivs');
}

function remove(condition) {
  return DbSugar.delete(condition, 'busivs');
}

module.exports = {
  select,
  addRow,
  update,
  remove,
};
