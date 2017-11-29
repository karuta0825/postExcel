

  // クライアント側操作
$(function(){

  var
    jqueryMap = {}
  , _setJqueryMap
  , initModule
  ;

  // modelの初期化
  customer.model.servers.initModule();
  customer.model.services.initModule();
  customer.model.homeServerTable.initModule();
  customer.model.homeGraph.initModule();
  customer.model.environments.initModule();

  // viewの初期化
  _.each( customer.view, function ( val, key ) {
    val.initModule();
  });

  // navアコディーオン
  $('.toggle').on( 'click', function () {
    $(this).next().slideToggle(100);
  });


  /**
   * メインコンテンツの表示管理メディエータ
   * ナビゲーションでクリックされたコンテンツを表示し、
   * それ以外すべてを非表示にする
   */
  var manageMainView = function () {
    // すべてis-activeを外す
    $('.main-contents').removeClass('is-active');

    // クリックされたコンテンツにis-activeを付与
      var target = '.main-contents--' + $(this).attr('href').slice(1);
      $(target).addClass('is-active');

      if ( target === '.main-contents--home' ) {
        customer.view.homeGraph.pushThisMonth();
      }
  };

  var changeTitle = function ( title ) {
    if ( !title || title === '' ) {
      title = 'ユーザー管理';
    }

    $('.mdl-layout__header-row .mdl-layout-title').text(title);
  };

  /* events */
  $('.btn-navi').on( 'click', manageMainView );

  $('.navi-upper-level').on( 'click', function () {
    $(this).next().slideToggle(250);
    $(this).children('.arrow').toggleClass('arrow--rotate');
  });

  // ログアウト
  $('.mdl-menu--bottom-right .logout').on('click', function () {
    window.location.href = '/logout';
  });

  $('.mdl-menu--bottom-right .show-column').on('click', function () {
    customer.view.kidsColumn.open();
  });

  customer.shell = {
    manageMainView : manageMainView,
    changeTitle : changeTitle
  };


});