const { DbSugar } = require('../mysql/DbSugar');
const _ = require('underscore');

/**
* [_convertString2Array description]
* @param  {String} str_licenses [description]
* @return {Array}              [description]
*/
function _convertString2Array(str_licenses) {
  if (!str_licenses) {
    return [];
  }

  if (str_licenses.indexOf(':') > 0) {
    return str_licenses.split(':');
  }

  return [str_licenses];
}

/**
* [_setLicenseInfo description]
* @param {Object} init     [description]
* @param {String} licenses [description]
*/
function _setLicenseInfo(init, licenses) {
  const list_licenses = _convertString2Array(licenses);
  const result = Object.assign(init);
  for (let i = 0; i < list_licenses.length; i += 1) {
    result[list_licenses[i]] = 1;
  }
  return result;
}

function _convertObj2String(obj) {
  const services = _.chain(obj)
    .pick(v => v === '1')
    .keys()
    .value()
    .join(':');
  return { services };
}

/**
 * [get description]
 * @param  {String} kids_id [description]
 * @return {Object<{kids_id:String,license:String}>} [description]
 */
function select(kids_id) {
  let result = {};
  return DbSugar.select(kids_id, 'get_version_by_kid')
    .then(r => DbSugar.select(r[0].version, 'get_services_by_version'))
    .then((services) => {
    // 初期化オブジェクト生成
      services.forEach((service) => {
        result[service.service_id] = 0;
      });

      return DbSugar.select(kids_id, 'licenses');
    })
    .then((r) => {
      if (r.length > 0 && r[0].services) {
        result = _setLicenseInfo(result, r[0].services);
      }
      result.kids_id = kids_id;
      return [result];
    });
}

/**
 * [update description]
 * @param  {Object} data
 * @param  {Object} condition
 *         {string} kids_id
 * @return {Promise<>}
 */
function update(data, condition) {
  const licenses = _convertObj2String(data);
  return DbSugar.update(licenses, condition, 'licenses');
}

module.exports = {
  select,
  update,
  _convertObj2String,
  planUpdate: DbSugar.mkPlan(update),
};
