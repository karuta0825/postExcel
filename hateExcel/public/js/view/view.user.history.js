
/**
 * 履歴情報
 */

( function ( $, cms ) {

  var
  // member
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
  // private method
  , _selectedId
  , _drawTable
  , _confirmDel
  , _delete
  , _selectFilter
  // public method
  , makeFilter
  , refresh
  , initModule
  ;

  _confirmDel = function () {

    _selectedId = $(this).parents('tr').attr('hid');
    view.get('confirm').get(0).showModal();

  };

  _delete = function () {

    var option = view.get('filter__select').val();
    cms.model.userHistory.remove( _selectedId, function () {

      var data = cms.model.userHistory.find({item_name:option});
      makeFilter();

      if ( data.length > 0 ) {
        view.get('filter__select').val(option);
        drawTable(data);
      }
      else {
        drawTable( cms.model.userHistory.getCache() );
      }
    });

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

  refresh = function (data) {
    drawTable(data);
    makeFilter();
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
    makeFilter : makeFilter,
    refresh    : refresh
  };


}( jQuery, customer ));