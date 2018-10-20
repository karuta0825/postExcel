const { DbSugar } = require('../mysql/DbSugar');

function select(kids_id) {
  if (!kids_id) {
    return DbSugar.selectAll('historys');
  }
  return DbSugar.select(kids_id, 'usrHistorys');
}

function addRow(input_map) {
  return DbSugar.insert(input_map, 'historys');
}

/**
 * [remove description]
 * @param  {Object} condition
 *         {string} id
 * @return {Promise<>}
 */
function remove(condition) {
  return DbSugar.delete(condition, 'usrHistorys');
}

module.exports = {
  select,
  addRow,
  remove,
};
