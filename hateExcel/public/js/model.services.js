/**
 * サービスマスタ
 *
 */
customer.model = customer.model || {};
customer.model.services = ( function () {

  /*member*/
  var
    _services,
    getServices
    ;

  getServices = function () {
    _services = customer.db.selectAll('/services');
    return _services;
  };

  return {
    getServices : getServices,
  };

}());