
const {DbSugar} = require('../mysql/DbSugar');

/**
 * [findEnvironmentId description]
 * @param  {{system_type:String, version:String}} data [description]
 * @return {Promise<Number| null>}      [description]
 */
function findId({system_type, version} = {}) {
  let params = [system_type, version];
  return DbSugar.select(params,'find_environment_id')
  .then( r => {
    if ( r && r.length > 0 && r[0].id ) {
      return r[0].id
    }
    return null
  });
}

module.exports = {
  findId
};
