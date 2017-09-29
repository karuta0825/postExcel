
/**
 * 履歴情報
 */

( function ( $, cms ) {

  var
    view
  , elements = {
      'btn' : {
        'del' : '.delete .mdl-button'
      },
      'filter' : {
        'self' : '.filter'
      },
      'table'  : '.body',
      'confirm' : '#confirm-delete-history'
    }
  , _selectedId
  , _drawTable
  , _confirmDel
  , _delete
  , _makeFilter
  , initModule
  ;

  _confirmDel = function () {

    _selectedId = $(this).parents('tr').attr('hid');
    view.get('confirm').get(0).showModal();

  };

  _delete = function () {

    cms.model.userHistory.remove( _selectedId, drawTable );

  };

  _makeFilter = function () {

  };

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

    util.confirm({
      selector : view.top,
      id       : 'confirm-delete-history',
      msg      : '選択した履歴を削除しますか?',
      yes      : _delete
    });

    view.initElement( elements );

    view.addListener({
      'click btn__del' : _confirmDel
    });

  };

  // to public
  cms.view.userHistory = {
    initModule : initModule,
    drawTable  : drawTable
  };


}( jQuery, customer ));