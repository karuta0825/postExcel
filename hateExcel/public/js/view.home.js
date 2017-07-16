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
        'title'   : '.article-notice .article__title',
        'body'    : '.article-notice .article__body',
        'list'    : '.article-notice__list',
        'items'   : '.article-notice__item--body',
        'header'  : '.article-notice__item--header',
        'btnMore' : '.article__footer',
        'filter'  : '.article-notice .filter'
      }
    }
  // private
  , _filter
  // public
  , getMoreHistory
  , hideFooter
  , initModule
  , refresh
  , drawNews
  ;

  _filter = function () {

    var condition = $(this).val();

    switch ( condition ) {
      case 'new' :
        condition = '新規';
      break
      case 'add' :
        condition = '追加';
      break
      case 'update' :
        condition = '更新';
      break
      case 'delete' :
        condition = '削除';
      break
      default :
      break
    }

    cms.model.historys.find({ type : condition }, drawNews );

  };

  drawNews = function ( data ) {

    var
      data     = { list : data }
    , tmpl     = customer.db.getHtml('template/home.news.html')
    , complied = _.template( tmpl )
    ;

    homeView.get('notice__items').remove();
    homeView.get('notice__list').append( complied(data) );

    homeView.updateElement({'notice__items' : '.article-notice__item--body'});

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

    homeView.updateElement({ 'notice__items' : '.article-notice__item--body'});

    homeView.addListener({
      'click notice__btnMore' : getMoreHistory,
      'change notice__filter' : _filter
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