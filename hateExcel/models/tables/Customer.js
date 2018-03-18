/**
 * Cutomersテーブ
 */

const {DbSugar} = require('../mysql/DbSugar');

/**
 * [findLastBaseId description]
 * @param  {String} kids_id 
 * @return {Promise<Number>} 
 */
function findLastBaseId (kids_id) {
  return DbSugar.select(kids_id, 'find_last_base_id')
  .then( r => {
    return r[0].base_id;
  });
}

/**
 * 拠点追加これは必要だ
 * @param {String} kids_id [description]
 */
function addRow(kids_id) {
  if (!kids_id) { throw new Error('kids_idを指定してください'); }
  return DbSugar.insert({kids_id:kids_id}, 'add_base');
}

module.exports = {
  findLastBaseId,
  addRow
};