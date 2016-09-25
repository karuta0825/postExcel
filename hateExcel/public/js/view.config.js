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

  // modalの数だけこれつくるのは大変だ！クラスかできないか？
  _setJqueryMap = function () {
    var 
      $modal       = $('#myModal'),
      $modal_body  = $modal.find('.modal-body')
    ;

    jqueryMap = {
      $modal  : $modal,
      $header : $modal.find('.modal-header'),
      $body   : $modal.find('.modal-body'),
      $cansel : $modal.find('.cancel'),
      $ok     : $modal.find('.ok')
    }

    jqueryMap.$input = {
      kid     : $modal_body.find('#kid'),
      company : $modal_body.find('#company'),
      address : $modal_body.find('#address'),
      server  : $modal_body.find('#server'),
      genics  : $modal_body.find('#genics'),
      userkey : $modal_body.find('#userkey')
    };

  };

  _onClickOk = function () {
    $(jqueryMap.$ok).on( 'click', function () {

      var params = {
        kid       : $(jqueryMap.$input.kid).val(),
        server    : $(jqueryMap.$input.server).val(),
        address   : $(jqueryMap.$input.address).val(),
        company   : $(jqueryMap.$input.company).val(),
        genics    : $(jqueryMap.$input.genics).val(),
        userkey   : $(jqueryMap.$input.userkey).val(),
        author_id : 1 //TODO : 入力できるように
      };

      // validate check

      // modelを経由してajaxpost
      _model.addKid( params );

    });

  };

  initModule = function () {

    if ( ! _model ) { 
      _model = customer.model.config.initModule(); 
    }

    _setJqueryMap();

    _onClickOk();

  };

  return {
    initModule : initModule
  }


}());