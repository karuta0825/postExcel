const { DbSugar } = require('../mysql/DbSugar');


function select(some, uid) {
  if (!uid) {
    return DbSugar.selectAll('show_columns');
  }
  return DbSugar.select(uid, 'header');
}

/**
 * [update description]
 * @param  {} input_map
 * @param  {{uid: number}} condition
 * @return {Promise<null>}
 */
function update(input_map, uid) {
  return DbSugar.update(input_map, uid, 'columns');
}

module.exports = {
  select,
  update,
};
