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
      $content = $('.setting--servers')
    , $table   = $content.find('table')
    , $header  = $table.find('thead')
    , $body    = $table.find('tbody')
    ;

    jqueryMap.$main   = $content;

    // table
    jqueryMap.$table  = $table;
    jqueryMap.$header = $header;
    jqueryMap.$body   = $body;
    jqueryMap.$row    = $body.find('tr');

    // buttons
    jqueryMap.$add    = $content.find('.btn--add');
    jqueryMap.$save   = $content.find('.btn--save');
    jqueryMap.$cancel = $content.find('.btn--cancel');
    jqueryMap.$del    = $content.find('.btn--del');

  };

  _makeRow = function () {

    // DOM要素生成
    var
      tr      = $('<tr>')
    , td_env  = $('<td>',     { class : 'env'} )
    , td_name = $('<td>',     { class : 'name' } )
    , td_ip   = $('<td>',     { class : 'ip' } )
    , td_del  = $('<td>',     { align : 'center', class : 'del' } )
    , input   = $('<input>',  { type  : 'text' } )
    , button  = $('<button>', { class : 'btn btn--del', text : '-' } )
    ;

    td_env.append(  $(input).clone(true) );
    td_name.append( $(input).clone(true) );
    td_ip.append(   $(input).clone(true) );
    td_del.append( button );

    tr.append(td_env)
      .append(td_name)
      .append(td_ip)
      .append(td_del)
      ;

    return tr;

  };

  _drawTable = function ( data, is_redraw ) {

    var
      data     =  { list : data, is_redraw : is_redraw  }
    , tmpl     = customer.db.getHtml('template/servers.html')
    , complied = _.template( tmpl )
    ;

    if ( !is_redraw ) {
      jqueryMap.$table.append( complied( data ) );
    }
    else {
      jqueryMap.$body.append( complied( data ) );
    }

    _setJqueryMap();

  };

  _redrawTable = function () {

    jqueryMap.$row.remove();
    // ボディのみ再描画
    _drawTable( customer.model.servers.getServers(), true );
    jqueryMap.$del.on( 'click', _onClickDel );

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
    jqueryMap.$body.append( row );
    _setJqueryMap();
    jqueryMap.$del.off( 'click', _onClickDel );
    jqueryMap.$del.on( 'click', _onClickDel );

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
    $('.main-contents--settings-servers').append( customer.db.getHtml('setting.servers.html') );

    _setJqueryMap();

    _drawTable( customer.model.servers.getServers(), false );

    jqueryMap.$add.on(    'click', _onClickAdd    );
    jqueryMap.$save.on(   'click', _onClickSave   );
    jqueryMap.$cancel.on( 'click', _onClickCancel );
    jqueryMap.$del.on(    'click', _onClickDel    );

  };

  show = function () {
    jqueryMap.$main.show();
  };

  hide = function () {
    jqueryMap.$main.hide();
  }

  // to public
  cms_view.servers = {
    initModule : initModule,
    show       : show,
    hide       : hide
  };

}(jQuery, customer.view ));