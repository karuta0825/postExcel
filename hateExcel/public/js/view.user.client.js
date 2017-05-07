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
        'exec'     : '.btn--exec'
      },
      'checkbox' : '.mdl-checkbox',
      'download' : {
        'client'      : '.download--client',
        'open_notice' : '.download--open-notice',
        'spla'        : '.download--spla',
        'mail'        : '.download--mail',
      },
      'table'  : '.accout-table',
      'dialog' : '.mdl-dialog',
    }
  , _openDialog
  , _closeDialog
  , _execDowload
  , _downloadFile
  , clear
  , drawTable
  , initModule
  ;

  _openDialog = function () {
    clientView.get('dialog').get(0).showModal();
  };

  _closeDialog = function () {
    clientView.get('dialog').get(0).close();
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
    clientView.get('dialog').get(0).close();
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

  drawTable = function ( data, is_redraw ) {

    var
      data     = { list : data, is_redraw : is_redraw }
    , tmpl     = customer.db.getHtml('template/user.client.html')
    , complied = _.template( tmpl )
    ;

    if ( clientView ) {
      clientView.wrap.find('table').remove();
      clientView.wrap.append( complied(data) );
      componentHandler.upgradeElements( clientView.wrap );
    }
    else {
      $('#usr-client-panel').append( complied(data) );
    }

  };

  clear = function () {

    _.each( clientView.get('checkbox'), function ( val, key ) {
      if ( $(val).hasClass('is-checked') ) {
        $(val).trigger('click');
      }
    });

  };

  initModule = function () {

    drawTable();

    clientView = new Controller('#usr-client-panel');
    clientView.initElement( elements );

    clientView.addListener({
      'click btn__download'         : _openDialog,
      'click btn__close'            : _closeDialog,
      'click btn__exec'             : _execDowload,
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
    clear : clear,
    get : function() { return clientView; }
  };

}( jQuery, customer ));

