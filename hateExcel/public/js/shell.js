

  // クライアント側操作
$(function(){

  var
    jqueryMap = {}
  , _setJqueryMap
  , initModule
  ;

  // modelの初期化
  customer.model.servers.initModule();
  customer.model.kids.initModule();


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

  };

  /* events */
  $('.btn-navi').on( 'click', manageMainView );

  $('.navi-upper-level').on( 'click', function () {
    $(this).next().slideToggle(250);
    $(this).children('.arrow').toggleClass('arrow--rotate');
  });

  // urlルーティング設定
  // $.uriAnchor.setAnchor( { accounts : 'close' } );

  // $(window).on( 'hashchange', function () {
  //   var hash = $.uriAnchor.makeAnchorMap();

  //   if ( hash.accounts === 'close' ) {
  //     customer.view.table.showTable();
  //     customer.view.accounts.hideTable();
  //   }
  //   else if ( hash.accounts === 'open' ) {
  //     customer.view.table.hideTable();
  //     customer.view.accounts.showTable();
  //   }
  // });

  customer.shell = {
    manageMainView : manageMainView
  };


});