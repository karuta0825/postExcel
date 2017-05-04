/**
 * サービスマスタ
 *
 */
customer.model = customer.model || {};
customer.model.services = ( function () {

  /*member*/
  var
    _cache = {}
  , fetchServives
  , fetchLicenses
  , getCache
  , initModule
  ;

  fetchServices = function () {
    _cache.services = customer.db.select('/select', {
      table : 'services'
    });
    return _cache.services;
  };

  fetchLicenses = function ( kid, callback ) {
    _cache.licenses = customer.db.select('/select', {
      condition : { 'kid' : kid },
      table     : 'licenses'
    })[0];

    delete _cache.licenses.kid;

    if ( typeof callback === 'function' ) {
      callback(_cache.licenses);
    }
    else {
      return _cache.licenses
    }

  };

  getCache = function ( content ) {
    return _cache[content];
  };

  initModule = function () {
    fetchServices();
  };

  return {
    fetchServices : fetchServices,
    fetchLicenses : fetchLicenses,
    getCache      : getCache,
    initModule    : initModule
  };

}());