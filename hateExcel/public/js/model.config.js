customer.model = customer.model || {};
customer.model.config = ( function () {

  var
    /*private member*/
    _data,
    /*private method*/
    _loadHtml,
    /*public method*/
    addKid,
    initModule
  ;

  addKid = function ( params ) {
    customer.db.insert( params );
  };

  _loadHtml = function ( url ) {
    var html = customer.db.getHtml(url);
    $('#config').append(html);
  };

  initModule = function () {
    _loadHtml('template/modal.new.html');
    return {
      addKid : addKid
    }
  };

  return {
    initModule : initModule
  }

}()); 