const { DbSugar } = require('../mysql/DbSugar');

function select(kids_id) {
  if (!kids_id) {
    return DbSugar.selectAll('historys');
  }
  return DbSugar.select(kids_id, 'usrHistorys');
}

/**
 * last_idから10件昔の履歴情報を取得
 * @param  {number} last_id
 * @return {Promise<Array<Object>>}
 */
function fetchLatestTenHistorys(last_id) {
  const start_id = last_id * 10;
  return DbSugar.select(start_id, 'fetchLatestHistorys');
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

async function removes(conditions) {
  for (let i = 0; i < conditions.length; i += 1) {
    await remove({ id: conditions[i] });
  }
  return 'end';
}

module.exports = {
  select,
  fetchLatestTenHistorys,
  addRow,
  removes,
};
