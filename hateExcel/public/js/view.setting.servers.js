/**
 * viewController
 * サーバー情報
 */
(function ($, cms) {

  var
  // member
    jqueryMap = {}
  , idx = 0
  // private method
  , _setJqueryMap
  , _onClickAdd
  , _onClickEdit
  , _onClickCancel
  , _onClickSave
  , _onClickDel
  , _drawTable
  , redrawTable
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
      tr      = $('<tr>',     { 'data-id' : 'c' + idx })
    , td_ver  = $('<td>',     { class : 'version'} )
    , td_name = $('<td>',     { class : 'name' } )
    , td_ip   = $('<td>',     { class : 'ip' } )
    , td_del  = $('<td>',     { align : 'center', class : 'del' } )
    , input   = $('<input>',  { type  : 'text' } )
    , select  = $('<select>')
    , opt_es  = $('<option>', { value : 'ES', text : 'ES'} )
    , opt_lm  = $('<option>', { value : 'LM', text : 'LM'} )
    , button  = $('<button>', { class : 'btn btn--del mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'} )
    , icon    = $('<i>'     , { class : 'material-icons', text : 'delete_forever'})
    ;

    idx += 1;
    select.append( opt_es ).append( opt_lm );

    td_ver.append(select);
    td_name.append( $(input).clone(true) );
    td_ip.append(   $(input).clone(true) );
    td_del.append( button.append(icon) );

    tr.append(td_ver)
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

  redrawTable = function () {

    jqueryMap.$row.remove();
    // ボディのみ再描画
    _drawTable( customer.model.servers.getServers(), true );
    jqueryMap.$del.on( 'click', _onClickDel );

  };

  // Listeners
  _onClickSave = function () {
    // customer.model.servers.update();
    // updateが終了したときに、再描画が走るようにしないと
    // redrawTable();
    console.log( cms.model.servers.getI() );
    console.log( cms.model.servers.getU() );
    console.log( cms.model.servers.getD() );
  };

  _onClickCancel = function () {
    redrawTable();
    cms.model.servers.reset();
  };

  _onClickAdd = function () {

    var row = _makeRow();
    jqueryMap.$body.append( row );
    _setJqueryMap();
    jqueryMap.$del.off( 'click', _onClickDel );
    jqueryMap.$del.on( 'click', _onClickDel );

  };

  _onClickDel = function () {
    var id_del = $(this).parents('tr').data('id');
    $(this).parents('tr').remove();
    cms.model.servers.remove(id_del);
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

    jqueryMap.$body.on( 'change', function (e) {

      var el  = $(e.target);
      var id  = el.parents('tr').data('id');
      var key = el.parents('td').attr('class');

      var data = {};
      data['id'] = el.parents('tr').data('id');
      data[key] = el.val();

      cms.model.servers.change( data );

      // 以下の作業は、モデルが行う仕事
      // ビューは必要な更新情報をモデルに送るだけ

      // update
      // idで検索して, keyでsetして修正したものを、セレクションに追加
      // 検索はセレクションを先に、なければキャッシュを確認する

      // insert
      // キャッシュでidの検索がない場合、insertとしてセレクションに追加

      // delete
      // 削除ボタンが押されたときなので、別イベント

      // console.log(el);
    });

  };

  //

  // to public
  cms.view.servers = {
    initModule : initModule,
    redrawTable : redrawTable,
    tmp        : function () { return jqueryMap;}
  };

}(jQuery, customer ));