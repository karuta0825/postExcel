const { DbSugar } = require('../mysql/DbSugar');

function select(kids_id) {
  return DbSugar.select(kids_id, 'usrHistorys');
}

function addRow(input_map) {
  return DbSugar.insert(input_map, 'historys');
}

function remove(condition) {
  return DbSugar.delete(condition, 'usrHistorys');
}

module.exports = {
  select,
  addRow,
  remove,
};
