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
        'header' : '.article-notice__item--header',
        'btnMore' : '.more-news'
      }
    }
  // private
  , getMoreHistory
  // public
  , initModule
  , drawNews
  ;

  drawNews = function ( data ) {

    var
      data     = { list : data }
    , tmpl     = customer.db.getHtml('template/home.news.html')
    , complied = _.template( tmpl )
    ;

    homeView.get('notice__list').append( complied(data) );

  };

  getMoreHistory = function () {
    console.log(this);
  };

  initModule = function () {

    $('.main-contents--home').append( customer.db.getHtml('home.html') );

    homeView = new Controller('.main-contents--home');
    homeView.initElement( elements );

    drawNews( customer.model.historys.getCache() );

    homeView.addListener({
      'click notice__btnMore' : getMoreHistory
    })

  };

  cms.view.home = {
    initModule : initModule,
    get : function () { return homeView; }
  }


}(jQuery, customer));