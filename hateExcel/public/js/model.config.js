customer.model = customer.model || {};
customer.model.config = ( function () {

  var
    _data,
    initModule
  ;

  initModule = function () {
    var html = customer.db._ajaxHtml('template/modal.html');
    $('#config').append(html);
  };

  return {
    initModule : initModule
  }

}()); 