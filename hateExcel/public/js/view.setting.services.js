/**
 * viewController
 * サーバー情報
 */
(function ($, cms_view) {

  var
  // member
    jqueryMap = {}
  // private method
  , _setJqueryMap
  , _onClickEdit
  , _onClickCancel
  , _onClickSave
  , _drawTable
  , _redrawTable
  , _makeRow
  , _validate
  // public method
  , initModule
  , show
  , hide
  ;

  _setJqueryMap = function () {

    var
      content = $('.setting--services')
    , action  = content.find('.setting__action')
    , body    = content.find('.setting__body')

    , table   = content.find('table')
    , thead   = table.find('thead')
    , tbody   = table.find('tbody')
    ;

    jqueryMap.content = content;
    jqueryMap.action  = content.find('.setting__action');
    jqueryMap.body    = content.find('.setting__body');

    // table
    jqueryMap.table  = table;
    jqueryMap.thead  = thead;
    jqueryMap.tbody  = tbody;
    jqueryMap.row    = tbody.find('tr');

    // buttons
    jqueryMap.add    = action.find('.btn--add');
    jqueryMap.save   = action.find('.btn--save');
    jqueryMap.cancel = action.find('.btn--cancel');
    jqueryMap.del    = action.find('.btn--del');

  };

  _makeRow = function () {

    // DOM要素生成
    var
      tr              = $('<tr>')
    , td_service_id   = $('<td>',     { class : 'service_id'} )
    , td_service_name = $('<td>',     { class : 'service_name' } )
    , td_del          = $('<td>',     { align : 'center', class : 'del' } )
    , input           = $('<input>',  { type  : 'text' } )
    , button          = $('<button>', { class : 'btn btn--del', text : '-' } )
    ;

    td_env.append(  $(input).clone(true) );
    td_service_name.append( $(input).clone(true) );
    td_del.append( button );

    tr.append(td_env)
      .append(td_name)
      .append(td_del)
      ;

    return tr;

  };

  _drawTable = function ( data ) {

    var
      data     =  { list : data }
    , tmpl     = customer.db.getHtml('template/services.html')
    , complied = _.template( tmpl )
    ;

    jqueryMap.body.append( complied( data ) );

    _setJqueryMap();

  };

  _redrawTable = function () {

    jqueryMap.table.remove();
    // ボディのみ再描画
    _drawTable( customer.model.servers.fetchServices() );
    jqueryMap.del.on( 'click', _onClickDel );

  };

  // Listeners
  _onClickSave = function () {
    // customer.model.servers.update();
    // updateが終了したときに、再描画が走るようにしないと
    // _redrawTable();
  };

  _onClickCancel = function () {
    _redrawTable();
  };

  _onClickAdd = function () {

    var row = _makeRow();
    jqueryMap.body.append( row );
    _setJqueryMap();
    jqueryMap.del.off( 'click', _onClickDel );
    jqueryMap.del.on( 'click', _onClickDel );

  };

  _onClickDel = function () {
    var id_del = $(this).parents('tr').find('.id').text().trim();
    $(this).parents('tr').remove();
    customer.model.servers.delStock( id_del );
  };

  _validate = function () {

  };

  // initialize module
  initModule = function () {
    // 同期処理させる
    $('.main-contents--settings-services').append( customer.db.getHtml('setting.services.html') );

    _setJqueryMap();

    _drawTable( customer.model.services.getCache() );

    jqueryMap.add.on(    'click', _onClickAdd    );
    jqueryMap.save.on(   'click', _onClickSave   );
    jqueryMap.cancel.on( 'click', _onClickCancel );
    jqueryMap.del.on(    'click', _onClickDel    );

  };

  show = function () {
    jqueryMap.main.show();
  };

  hide = function () {
    jqueryMap.main.hide();
  }

  // to public
  cms_view.services = {
    initModule : initModule,
    show       : show,
    hide       : hide
  };

}(jQuery, customer.view ));