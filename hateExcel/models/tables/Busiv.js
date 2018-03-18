
const {DbSugar} = require('../mysql/DbSugar');

/**
 * 拠点テーブルに指定したkid_idの行を追加する
 * @param {String} kids_id [description]
 * @param {Number} base_id [description]
 */
function addRow(kids_id, base_id) {
  if (!kids_id || !base_id) { throw new Error('引数を指定してください'); }
  return DbSugar.insert({
    kids_id: kids_id,
    base_id: base_id
  }, 'make_busiv');
}

module.exports = {
  addRow
};