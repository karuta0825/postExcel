/**
 * home
 */

( function ( $, cms ) {

  var
  // member
    homeView
  , elements = {
      'article' : {
        'notice' : '.article-notice',
        'table'  : '.article-servers-table'
      },
      'notice' : {
        'title' : '.article-notice .article__title',
        'body'  : '.article-notice .article__body',
        'list'  : '.article-notice__list',
        'items' : '.article-notice__item--body',
        'header' : '.article-notice__item--header',
        'btnMore' : '.article__footer'
      },
      'table' : {
        'title' : '.article-servers-table .article__title',
        'body'  : '.article-servers-table .article__body'
      }
    }
  // private
  , _addNews
  , _drawTable
  , getMoreHistory
  // public
  , hideFooter
  , initModule
  , refresh
  , drawNews
  ;

  _drawTable = function ( data ) {

    var
      data     = { list : data }
    , tmpl     = customer.db.getHtml('template/home.serverTable.html')
    , complied = _.template( tmpl )
    ;

    homeView.get('table__body').append( complied(data) );

  };

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

  refresh = function () {
    drawNews(customer.model.historys.fetch() );
  };

  initModule = function () {

    $('.main-contents--home').append( customer.db.getHtml('home.html') );

    homeView = new Controller('.main-contents--home');
    homeView.initElement( elements );

    drawNews( customer.model.historys.getCache() );

    _drawTable(
      cms.db.select('/select', {'table' : 'available_number_in_each_server'})
    );

    homeView.updateElement({ 'notice__items' : '.article-notice__item--body'});

    homeView.addListener({
      'click notice__btnMore' : getMoreHistory
    });

  };

  cms.view.home = {
    initModule : initModule,
    hideFooter : hideFooter,
    drawNews   : drawNews,
    refresh    : refresh,
    get : function () { return homeView; }
  };


}(jQuery, customer));