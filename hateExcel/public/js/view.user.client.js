/**
 * クライアント情報
 */

( function ( $, cms ) {

  // member
  var
    clientView
  , elements = {
      'btn' : {
        'download' : '.btn--download',
        'close'    : '',
        'ok'       : ''
      },
      'table' : '.accout-table'
    }
  , _openDialog
  , drawTable
  , initModule
  ;

  _openDialog = function () {
    alert('open dialog');
  };

  drawTable = function ( data, is_redraw ) {

    var
      data     = { list : data, is_redraw : is_redraw }
    , tmpl     = customer.db.getHtml('template/user.client.html')
    , complied = _.template( tmpl )
    ;

    clientView.wrap.find('table').remove();

    clientView.wrap.append( complied(data) );

    componentHandler.upgradeElements( clientView.wrap );

    clientView.updateElement({
      'table' : '.account-table'
    });

  };

  initModule = function () {


    clientView = new Controller('#usr-client-panel');
    clientView.initElement( elements );

    drawTable();

    clientView.addListener({
      'click btn__download' : _openDialog
    });

  };

  // to public
  cms.view.userClient = {
    initModule : initModule,
    drawTable  : drawTable,
    get : function() { return clientView; }
  };

}( jQuery, customer ));

