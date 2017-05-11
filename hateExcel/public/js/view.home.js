/**
 * home
 */

( function ( $, cms ) {

  var
  // member
    homeView
  , elements = {
      'article' : {
        'notice' : '.article-notice'
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
  , _addNews
  , getMoreHistory
  // public
  , hideFooter
  , initModule
  , drawNews
  ;

  drawNews = function ( data ) {

    var
      data     = { list : data }
    , tmpl     = customer.db.getHtml('template/home.news.html')
    , complied = _.template( tmpl )
    ;

    homeView.get('notice__items').remove();
    homeView.get('notice__list').append( complied(data) );

  };

  getMoreHistory = function () {

    // モデルの更新
    cms.model.historys.getMore( drawNews );

    if ( cms.model.historys.isEnd() ) {
      hideFooter();
    }

  };

  hideFooter = function () {
    homeView.get('notice__btnMore').addClass('is-hidden');
  };

  initModule = function () {

    $('.main-contents--home').append( customer.db.getHtml('home.html') );

    homeView = new Controller('.main-contents--home');
    homeView.initElement( elements );

    drawNews( customer.model.historys.getCache() );

    homeView.addListener({
      'click notice__btnMore' : getMoreHistory
    });

  };

  cms.view.home = {
    initModule : initModule,
    hideFooter : hideFooter,
    get : function () { return homeView; }
  };


}(jQuery, customer));