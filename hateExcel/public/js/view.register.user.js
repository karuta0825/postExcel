/**
 * viewController
 * 新規ユーザー追加
 */
( function ( $, cms_view ) {

  var
  // member
    jqueryMap = {}
  , _setJqueryMap
  , _onClickUpload
  , initModule
  ;


  /**
   * DOMキャッシュ設定
   */
  _setJqueryMap = function () {
    jqueryMap.btnUpload = $('.btn--upload');
  };

  _onClickUpload = function () {
    console.log('upload');
  };

  initModule = function () {

    // コンテンツの挿入
    $('.main-contents--reg-usr').append( customer.db.getHtml('register.user.html'));

    // DOMキャッシュ作成
    _setJqueryMap();

    jqueryMap.btnUpload.on( 'click', _onClickUpload );

  };

  cms_view.regUsrs = {
    initModule : initModule
  };

}( jQuery, customer.view ));