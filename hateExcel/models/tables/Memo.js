
const {DbSugar} = require('../mysql/DbSugar');

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
  return DbSugar.insert(input_map, 'make_memo')
}

module.exports = {
  addRow
}