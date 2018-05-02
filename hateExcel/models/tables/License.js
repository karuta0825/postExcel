const { DbSugar } = require('../mysql/DbSugar');
const _ = require('underscore');


/**
* [_convertString2Array description]
* @param  {String} str_licenses [description]
* @return {Array}              [description]
*/
function _convertString2Array(str_licenses) {
  const licenses = str_licenses || '';
  let list_licenses;

  if (str_licenses.indexOf(':') > 0) {
    list_licenses = str_licenses.split(':');
  } else if (str_licenses) {
    list_licenses = [str_licenses];
  }
  return list_licenses;
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
    init[list_licenses[i]] = 1;
  }
  return result;
}


class License extends DbSugar {
  /**
   * [get description]
   * @param  {String} kids_id [description]
   * @return {Object<{kids_id:String,license:String}>} [description]
   */
  static get(kids_id) {
    let result = {};
    return super.select(kids_id, 'get_version_by_kid')
      .then(r => super.select(r[0].version, 'get_services_by_version'))
      .then((services) => {
      // 初期化オブジェクト生成
        for (let i = 0; i < services.length; i += 1) {
          result[services[i].service_id] = 0;
        }
        return super.select(kids_id, 'licenses');
      })
      .then((r) => {
        result = _setLicenseInfo(result, r[0].services);
        result.kids_id = r[0].kids_id;
        return result;
      });
  }

  static _convertObj2String(obj) {
    const services = _.chain(obj)
      .pick(v => v === '1')
      .keys()
      .value()
      .join(':');
    return { services };
  }

  // @override
  static update(data, condition) {
    const licenses = this._convertObj2String(data);
    return super.update(licenses, condition, 'licenses');
  }
}

module.exports = License;
