
/**
 * 履歴情報
 */

( function ( $, cms ) {

  var
    historyView
  , elements = {

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

    $('#user-edit').find('#usr-history-panel').find('table').remove();
    $('#user-edit').find('#usr-history-panel').append( complied(data) );

  };


  initModule = function () {

  };

  // to public
  cms.view.userHistory = {
    initModule : initModule,
    drawTable  : drawTable
  };


}( jQuery, customer ));