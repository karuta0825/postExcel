
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
        'self' : '.filter',
        'select' : '.select-item_name'
      },
      'table'  : '.body',
      'confirm' : '#confirm-delete-history'
    }
  , _selectedId
  , _drawTable
  , _confirmDel
  , _delete
  , _selectFilter
  , makeFilter
  , initModule
  ;

  _confirmDel = function () {

    _selectedId = $(this).parents('tr').attr('hid');
    view.get('confirm').get(0).showModal();

  };

  _delete = function () {

    cms.model.userHistory.remove( _selectedId, drawTable );

  };

  makeFilter = function () {

    var options = cms.model.userHistory.getFilterOption();

    view.get('filter__select').empty();

    view.get('filter__select').append(
      $('<option>', { 'value' : 'all', 'text' : '全て' })
    );

    _.each( options, function (v,k) {

      view.get('filter__select').append(
        $('<option>', { 'value' : v, 'text' : v })
      );

    });

  };

  _selectFilter = function () {

    var item_name = $(this).val();
    var items = cms.model.userHistory.find({item_name:item_name});

    drawTable( items );

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
      'click btn__del' : _confirmDel,
      'change filter__select' : _selectFilter
    });

  };

  // to public
  cms.view.userHistory = {
    initModule : initModule,
    drawTable  : drawTable,
    makeFilter : makeFilter
  };


}( jQuery, customer ));