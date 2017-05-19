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
        'close'    : '.btn--close',
        'exec'     : '.btn--exec',
        'delete'   : '.btn--del'
      },
      'checkbox' : '.mdl-checkbox',
      'download' : {
        'client'      : '.download--client',
        'open_notice' : '.download--open-notice',
        'spla'        : '.download--spla',
        'mail'        : '.download--mail',
      },
      'table'  : '.accout-table',
      'dialog' : {
        'download' : '#modal-client-download',
        'delete'   : '#delete-clients-confirm'
      }
    }
  , _openDialog
  , _closeDialog
  , _execDowload
  , _downloadFile
  , clear
  , drawTable
  , redrawTable
  , initModule
  ;

  _openDialog = function () {
    clientView.get('dialog__download').get(0).showModal();
  };

  _openDelDialog = function () {
    clientView.get('dialog__delete').get(0).showModal();
  };

  _closeDialog = function () {
    clientView.get('dialog__download').get(0).close();
  };

  _execDowload = function () {

    // ダウンロード
    _.each( clientView.get('checkbox'), function ( val, key ) {
      if( $(val).hasClass('is-checked') ) {
        $(val).find('a').trigger('click');
      }
    });

    // 初期化
    clear();

    // 閉じる
    clientView.get('dialog__download').get(0).close();
  };


  _downloadFile = function ( content, file_type ) {

    // filenameを決める
    // @example yyyy-mm-dd_KIDXXXXX_content.file_type

    // チェックの付いたクライアントを取得

    // 取得データからモデルにデータ検索

    // 検索データがゼロのとき、処理終了

    // データ作成

    // ダウンロード
    // util.downloadFile( this, Blob, filename );

  };

  _getSelectItem = function () {

    var ids = _.map( $('.is-selected', clientView.top ), function (val,key){
      return { 'client_id' : $(val).attr('id') } ;
    });

    if ( ids.length === 0 ) {
      alert('選択されていません');
      return;
    }

    return ids;

  };


  _deleteClients = function () {

    var list_clients = _getSelectItem();

    if ( list_clients && list_clients.length > 0 ) {
      console.log(list_clients);
      customer.model.clients.delete( list_clients, function () {
        // 画面更新
        cms.view.kids.refresh();
        cms.view.home.refresh();
        cms.view.userBaseInfo.refresh();
        refresh();
      } );
    }


  };

  redrawTable = function ( data ) {

    var
      data     = { list : data, is_redraw : true }
    , tmpl     = customer.db.getHtml('template/user.client.html')
    , complied = _.template( tmpl )
    ;

    clientView.wrap.find('table').remove();
    clientView.wrap.append( complied(data) );
    componentHandler.upgradeElements( clientView.wrap );

  };

  drawTable = function ( data ) {

    var
      data     = { list : data, is_redraw : false }
    , tmpl     = customer.db.getHtml('template/user.client.html')
    , complied = _.template( tmpl )
    ;

    $('#usr-client-panel').append( complied(data) );

  };

  clear = function () {

    _.each( clientView.get('checkbox'), function ( val, key ) {
      if ( $(val).hasClass('is-checked') ) {
        $(val).trigger('click');
      }
    });

  };

  refresh = function () {
    var kid = cms.model.clients.getCache()[0].kid;
    cms.model.clients.fetch( kid , redrawTable );
  };

  initModule = function () {

    drawTable();

    util.confirm({
      selector : '#usr-client-panel',
      id       : 'delete-clients-confirm',
      msg      : '選択したクライアントを削除しますか？',
      yes      : _deleteClients
    });

    clientView = new Controller('#usr-client-panel');
    clientView.initElement( elements );

    clientView.addListener({
      'click btn__download'         : _openDialog,
      'click btn__close'            : _closeDialog,
      'click btn__exec'             : _execDowload,
      'click btn__delete'           : _openDelDialog,
      'click download__client'      : $.proxy( function (e) { console.log(e); }, this),
      'click download__open_notice' : function () { alert('download download__o')},
      'click download__spla'        : function () { alert('download download__s')},
      'click download__mail'        : function () { alert('download download__m')}
    });

  };

  // to public
  cms.view.userClient = {
    initModule : initModule,
    drawTable  : drawTable,
    redrawTable : redrawTable,
    clear : clear,
    get : function() { return clientView; }
  };

}( jQuery, customer ));

