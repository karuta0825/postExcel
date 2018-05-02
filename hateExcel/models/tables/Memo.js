
const { DbSugar } = require('../mysql/DbSugar');

/**
* [addMemo description]
* @param {Number} options.kids_id        [description]
* @param {String} options.title          [description]
* @param {String} options.priority_id    [description]
* @param {String} options.message        [description]
* @param {Number} options.create_user_id [description]
* @param {Date}   options.create_on    [description]
*/
function addRow(input_map) {
  return DbSugar.insert(input_map, 'make_memo');
}

/**
 * @param  {[type]} input_map [description]
 * @param  {[type]} condition [description]
 * @return {[type]}           [description]
 */
function update(input_map, condition) {
  return DbSugar.update(input_map, condition, 'memos');
}

/**
 * @param  {[type]} condition [description]
 * @return {[type]}           [description]
 */
function remove(condition) {
  return DbSugar.delete(condition, 'memos');
}

module.exports = {
  addRow,
  update,
  remove,
};
