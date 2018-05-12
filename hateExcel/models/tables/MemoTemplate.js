const { DbSugar } = require('../mysql/DbSugar');

function select(memo_id) {
  if (!memo_id) {
    return DbSugar.selectAll('memo_templates');
  }
  return DbSugar.select(memo_id, 'memo_template');
}

/**
 * @param {{
 *        title: string,
 *        msg: string,
 *        create_user_id: number,
 *        create_on: string['YYYY-MM-DD'],
 *        }} input_map
 * @return {Promise<{affectedRows: number}>}
 */
function addRow(input_map) {
  return DbSugar.insert(input_map, 'memo_templates');
}

/**
 * [update description]
 * @param {{
 *          title?: string,
 *          msg?: string,
 *          create_user_id?: number,
 *          create_on?: string['YYYY-MM-DD'],
 *        }} input_map
 * @param  {{id: number}} condition [description]
 * @return {Promise<null>}
 */
function update(input_map, condition) {
  return DbSugar.update(input_map, condition, 'memo_templates');
}

/**
 * [remove description]
 * @param  {{id: number}} condition
 * @return {Promise<{affenctedRows: number}>}
 */
function remove(condition) {
  return DbSugar.delete(condition, 'memo_templates');
}

module.exports = {
  select,
  addRow,
  update,
  remove,
};
