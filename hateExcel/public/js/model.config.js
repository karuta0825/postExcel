customer.model = customer.model || {};
customer.model.config = ( function () {

  var
    /*private member*/
    _data,
    /*private method*/
    /*public method*/
    addKid,
    initModule
  ;

  addKid = function ( params ) {
    customer.db.insert( params );
  };

  initModule = function () {
    var html = customer.db._ajaxHtml('template/modal.new.html');
    $('#config').append(html);
    return {
      addKid : addKid
    }
  };

  return {
    initModule : initModule
  }

}()); 