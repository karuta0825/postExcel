
/**
 * 履歴情報
 */

( function ( $, cms ) {

  var
    view
  , elements = {
      filter : {
        self : '.filter'
      },
      table  : '.body'
    }
  , _drawTable
  , initModule
  ;

  drawTable = function ( data ) {
    var
      data     = { list : data }
    , tmpl     = customer.db.getHtml('template/user.history.html')
    , complied = _.template( tmpl )
    ;

    view.get('table').empty().append( complied(data) );

  };


  initModule = function () {

    view = new Controller('#usr-history-panel');

    view.wrap.append( customer.db.getHtml('html/user.history.html') );

    view.initElement( elements );

  };

  // to public
  cms.view.userHistory = {
    initModule : initModule,
    drawTable  : drawTable
  };


}( jQuery, customer ));