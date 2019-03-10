const { DbSugar } = require('../mysql/DbSugar');

/**
 * @param  {string} kids_id
 * @return {Promise<[{
 *           id: string,
 *           kids_id: string,
 *           title: string,
 *           property_id: number,
 *           property: string,
 *           messeage: string,
 *           short_msg: string,
 *           create_on: string,
 *         }]>}
 */
function select(kids_id) {
  return DbSugar.select(kids_id, 'memos');
}

/**
 * @param {Number} options.kids_id        [description]
 * @param {String} options.title          [description]
 * @param {String} options.priority_id    [description]
 * @param {String} options.message        [description]
 * @param {Number} options.create_user_id [description]
 * @param {Date}   options.create_on    [description]
 * @return {Promise<{affectedRows: number}>}
 */
function addRow(input_map) {
  const data = Object.assign({}, input_map);
  data.create_on = new Date();
  return DbSugar.insert(data, 'make_memo');
}

/**
 * @param  {} input_map [description]
 * @param  {[type]} condition [description]
 * @return {[type]}           [description]
 */
function update(input_map, condition) {
  const data = Object.assign({}, input_map);
  data.update_on = new Date();
  return DbSugar.update(data, condition, 'memos');
}

/**
 * @param  {Object} condition
 *         {string} id
 * @return {[type]}           [description]
 */
function remove(condition) {
  return DbSugar.delete(condition, 'memos');
}

module.exports = {
  select,
  addRow,
  update,
  remove,
};
