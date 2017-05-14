/**
 * ネットワークタブ
 */

( function ( $, cms ) {

  var
    networkView
  , elements = {
      'btn' : {
        'download' : '.btn--download',
        'close'    : '.btn--close',
        'exec'     : '.btn--exec'
      },
      'checkbox' : '.mdl-checkbox',
      'download' : {
        'fenics'      : '.download--fenics',
      },
      'table'  : '.fenics-table',
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
    networkView.get('dialog').get(0).showModal();
  };

  _closeDialog = function () {
    networkView.get('dialog').get(0).close();
  };

  _execDowload = function () {

    // ダウンロード
    _.each( networkView.get('checkbox'), function ( val, key ) {
      if( $(val).hasClass('is-checked') ) {
        $(val).find('a').trigger('click');
      }
    });

    // 初期化
    clear();

    // 閉じる
    networkView.get('dialog').get(0).close();
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

  redrawTable = function ( data ) {

    var
      data     = { list : data, is_redraw : true }
    , tmpl     = customer.db.getHtml('template/user.network.html')
    , complied = _.template( tmpl )
    ;

    networkView.wrap.find('table').remove();
    networkView.wrap.append( complied(data) );
    componentHandler.upgradeElements( networkView.wrap );

  };

  drawTable = function ( data ) {

    var
      data     = { list : data, is_redraw : false }
    , tmpl     = customer.db.getHtml('template/user.network.html')
    , complied = _.template( tmpl )
    ;

    $('#usr-network-panel').append( complied(data) );

  };

  clear = function () {

    _.each( networkView.get('checkbox'), function ( val, key ) {
      if ( $(val).hasClass('is-checked') ) {
        $(val).trigger('click');
      }
    });

  };

  initModule = function () {

    drawTable();

    networkView = new Controller('#usr-network-panel');
    networkView.initElement( elements );

    networkView.addListener({
      'click btn__download'         : _openDialog,
      'click btn__close'            : _closeDialog,
      'click btn__exec'             : _execDowload,
      'click download__fenics'      : $.proxy( function (e) { console.log(e); }, this),
    });

  };


  // to public
  cms.view.userNetwork = {
    initModule : initModule,
    redrawTable : redrawTable
  };

} ( jQuery, customer ));