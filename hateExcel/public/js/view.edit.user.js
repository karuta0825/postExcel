/**
 * viewController
 * 新規ユーザー追加
 */
( function ( $, cms_view ) {

  var
  // member
    editView
  , elements = {
      'tab_bar' : {
        'usr-base'    : 'a[href="#usr-base-panel"]',
        'usr-service' : 'a[href="#usr-service-panel"]',
        'usr-client'  : 'a[href="#usr-client-panel"]',
        'usr-partner' : 'a[href="#usr-partner-panel"]',
        'usr-network' : 'a[href="#usr-network-panel"]',
        'usr-history' : 'a[href="#usr-history-panel"]'
      },
      'tab_panel' : {
        'usr-base'    : '#usr-base-panel',
        'usr-service' : '#usr-service-panel',
        'usr-client'  : '#usr-client-panel',
        'usr-partner' : '#usr-partner-panel',
        'usr-network' : '#usr-network-panel',
        'usr-history' : '#usr-history-panel',
      }
    }
  , backUserTable
  , initModule
  ;


  backUserTable = function () {

    // タブ位置を基本情報に戻す
    _.each( editView.get('tab_bar'), function ( val,key ) {
      $(val).removeClass('is-active');
    });

    _.each( editView.get('tab_panel'), function ( val, key ) {
      $(val).removeClass('is-active');
    });

    editView.get('tab_bar__usr-base').addClass('is-active');
    editView.get('tab_panel__usr-base').addClass('is-active');

    // 各タブの初期化
    customer.view.userBaseInfo.clear();
    customer.view.userPartner.clear();
    customer.view.userService.clear();

    $('.main-contents').removeClass('is-active');

    // クリックされたコンテンツにis-activeを付与
    var target = '.main-contents--' + $(this).attr('href').slice(1);
    $(target).addClass('is-active');
  };


  initModule = function () {

    // コンテンツの挿入
    $('.main-contents--edit-usr').append( customer.db.getHtml('edit.user.html'));

    // DOMキャッシュ作成
    // _setJqueryMap();

    editView = new Controller('.main-contents--edit-usr');
    editView.initElement( elements );

    // イベント登録
    $('.btn--backList').on( 'click', backUserTable );


  };

  cms_view.editUsrs = {
    initModule : initModule
  };

}( jQuery, customer.view ));