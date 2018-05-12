const { DbSugar } = require('../mysql/DbSugar');

/**
 * @param  {string} month [YYYY-MM]
 * @return {Promise<[{
 *           id: number,
 *           title: string,
 *           message: string,
 *           start_on_for_view: string,
 *           start_time_for_view: string,
 *           start_on: string,
 *           start_time: string,
 *           date: string,
 *           is_finished: number[0|1],
 *         }]>}}
 */
function select(month) {
  return DbSugar.select(month, 'events');
}

/**
 * @param {{
 *          title: string,
 *          message: string,
 *          start_on: string,
 *          start_time: string
 *          is_finished: number[0|1],
 *        }} input_map
 */
function addRow(input_map) {
  return DbSugar.insert(input_map, 'events');
}

/**
 * @param  {{
 *           title?: string,
 *           message?: string,
 *           start_on?: string,
 *           start_time?: string,
 *           is_finished?: number[0|1],
 *           }} input_map
 * @param  {id: number} condition
 * @return {Promise<null>}
 */
function update(input_map, condition) {
  return DbSugar.update(input_map, condition, 'events');
}

/**
 * @param  {{
 *           id: number
 *         }} condition
 * @return {Promise<{affectedRows: number}>}
 */
function remove(condition) {
  return DbSugar.delete(condition, 'events');
}

module.exports = {
  select,
  addRow,
  update,
  remove,
};

