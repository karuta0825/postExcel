/**
 * home
 */

( function ( $, cms_view ) {

  var
  // member
    jqueryMap = {}
  // private
  , _setJqueryMap
  , _onClickMore
  // public
  , initModule
  ;

  _setJqueryMap = function () {
    var
      notice = $('.article-notice')
    , graph  = $('.article-graph')
    ;

    jqueryMap.notice = notice;
    jqueryMap.graph  = graph;
    jqueryMap.more   = notice.find('.article__footer');

  };

  _onClickMore = function () {
    console.log(this);
  };

  initModule = function () {

    $('.main-contents--home').append( customer.db.getHtml('home.html') );

    _setJqueryMap();

    jqueryMap.more.on( 'click', _onClickMore );

  };

  cms_view.home = {
    initModule : initModule
  }


}(jQuery, customer.view ));