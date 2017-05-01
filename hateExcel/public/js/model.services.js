/**
 * サービスマスタ
 *
 */
customer.model = customer.model || {};
customer.model.services = ( function () {

  /*member*/
  var
    _services
  , _licenses
  , getServices
  , getLicenses
  ;

  getServices = function () {
    return _services = customer.db.selectAll('/services');
  };

  getLicenses = function ( kid ) {
    return customer.db.select('/licenses', kid );
  };

  return {
    getServices : getServices,
    getLicenses : getLicenses  
  };

}());