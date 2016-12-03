customer.view = customer.view || {};
customer.view.viewConfig = ( function (){


  var 
    /*private member*/
    jqueryMap = {},

    /*private method*/
    _setJqueryMap, 

    /*public method*/
    initModule
  ;

  // modalの数だけこれつくるのは大変だ！クラスかできないか？
  _setJqueryMap = function () {
    var 
      $modal       = $('#viewConfig'),
      $modal_body  = $modal.find('.modal-body'),
      headerMap
    ;

    jqueryMap = {
      $modal  : $modal,
      $header : $modal.find('.modal-header'),
      $body   : $modal.find('.modal-body'),
      $cansel : $modal.find('.cancel'),
      $ok     : $modal.find('.ok')
    };

    // DBから取得したものをつかって、よりメンテナンスしやすく
    jqueryMap.$check = {};

    headerMap = customer.model.kids.getHeader();
    delete headerMap.check;
    delete headerMap.uid;

    _.each( headerMap, function ( val, key ) {
      jqueryMap.$check[key] = $modal_body.find('.' + key );
    });

  };

  /**
   * テンプレートエンジンを使用したやり方が効率的
   */
  _loadHtml = function ( url ) {
    var 
      data = { headerMap : customer.model.kids.getHeader() },
      tmpl = customer.db.getHtml(url),
      complied = _.template( tmpl )
      ;

    delete data.headerMap.check;
    delete data.headerMap.uid;

    $('#config').append( complied( data ) );
  };

  _onClickCheck = function () {
    var checkMap = jqueryMap.$check;
    _.each( checkMap, function ( val, key ) {
      $(val).on( 'click', function () {
        customer.model.settings.changeColumnView( key );
      });
    });
  };

  _onClickOk = function () {
    $(jqueryMap.$ok).on( 'click', function () {
      console.log('update');
    });
  };

  initModule = function () {

    _loadHtml('template/modal.viewConfig.html');

    _setJqueryMap();

    customer.model.settings.initModule();

    _onClickOk();
    _onClickCheck();

  };

  return {
    initModule : initModule
  }


}());