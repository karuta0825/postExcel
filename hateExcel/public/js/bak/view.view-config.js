customer.view = customer.view || {};
customer.view.viewConfig = ( function (){


  var
    /*private member*/
    jqueryMap = {},

    /*private method*/
    _setJqueryMap,
    _onClickCheck,
    _onClickOk,
    _checkBox,
    /*public method*/
    initModule,
    refresh
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

  /**
   * チェックボックスの状態を変更する
   * @param  {Object} val
   * @param  {String} key
   */
  _checkBox = function ( val, key ) {
    if ( val === '1' ) {
      jqueryMap.$check[key].prop( 'checked', true );
    }
    else {
      jqueryMap.$check[key].prop( 'checked', false );
    }
  };

  _onClickCheck = function () {
    var checkMap = jqueryMap.$check;
    _.each( checkMap, function ( val, key ) {
      $(val).on( 'click', function () {
        customer.model.settings.switchDisplayMode(
          key,
          customer.view.table.setViewCol
        );
      });
    });
  };

  _onClickOk = function () {
    $(jqueryMap.$ok).on( 'click', function () {
      customer.model.settings.updateDisplayMode();
    });
  };


  initModule = function () {

    _loadHtml('template/modal.viewConfig.html');

    _setJqueryMap();

    _onClickOk();
    _onClickCheck();

    // チェックボックス状態をモデルの内容に応じて変更　　　　　　　　　　　　　　　　　　　　　　　　
    customer.model.settings.scan( _checkBox );

  };

  /**
   * サーバからデータ取得し、それをviewに反映する
   * ということは、モデルの中身自体更新するので、モデルにrefreshメソッドが
   * あるのは不思議ではない。それに対して必要なメソッドを渡してあげるのだ
   * @return {[type]}
   */
  refresh = function () {
    customer.model.settings.refresh( _checkBox );
  }


  return {
    initModule : initModule,
    refresh    : refresh
  }


}());