
const { DbSugar } = require('../mysql/DbSugar');

function select() {
  return DbSugar.selectAll('environments');
}

/**
 * [findEnvironmentId description]
 * @param  {{system_type:String, version:String}} data [description]
 * @return {Promise<Number| null>}      [description]
 */
function findId({ system_type, version } = {}) {
  const params = [system_type, version];
  return DbSugar.select(params, 'find_environment_id')
    .then((r) => {
      if (r && r.length > 0 && r[0].id) {
        return r[0].id;
      }
      return null;
    });
}

/**
 * [findTypeVer description]
 * @param  {number} environment_id
 * @return {Promise<{system_type: string, version: string}>}
 */
async function findById(environment_id) {
  if (!environment_id) {
    return new Error('引数を指定してください');
  }
  return DbSugar.select([environment_id], 'find_type_and_version_by_id')
    .then(r => r[0]);
}

module.exports = {
  select,
  findId,
  findById,
};
