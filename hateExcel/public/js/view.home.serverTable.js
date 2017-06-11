/**
 * home
 */

( function ( $, cms ) {

  var
  // member
    homeView
  , elements = {
      'article' : {
        'table' : '.article-servers-table'
      },
      'notice' : {
        'title' : '.article-notice .article__title',
        'body'  : '.article-notice .article__body',
        'list'  : '.article-notice__list',
        'items' : '.article-notice__item--body',
        'header' : '.article-notice__item--header',
        'btnMore' : '.article__footer'
      }
    }
  // private
  // public
  , initModule
  , refresh
  ;



  refresh = function () {
  };

  initModule = function () {

    homeView = new Controller('.main-contents--home');
    homeView.initElement( elements );

  };

  cms.view.homeServerTable = {
    initModule : initModule,
    refresh    : refresh,
    get : function () { return homeView; }
  };


}(jQuery, customer));