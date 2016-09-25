customer.view = customer.view || {};
customer.view.config = ( function (){


  var 
    /*private member*/
    jqueryMap = {}, _model,

    /*private method*/
    _setJqueryMap, 

    /*public method*/
    initModule
  ;

  _setJqueryMap = function () {
    var $modal = $('#myModal');

    jqueryMap = {
      modal  : $modal,
      header : $modal.find('.modal-header'),
      body   : $modal.find('.modal-body'),
      cansel : $modal.find('.cancel'),
      ok     : $modal.find('.ok')
    }
  };

  _onClickOk = function () {
    $(jqueryMap.ok).on( 'click', function () {
      console.log( $(jqueryMap.body).find('#kid').val() );
    });

    // validate check

    // modelを経由してajaxpost

  };

  initModule = function () {

    if ( ! _model ) { 
      // viewが監視するmodelは複数あるよね！
      _model = customer.model.config.initModule(); 
    }

    _setJqueryMap();

    _onClickOk();

  };

  return {
    initModule : initModule
  }


}());