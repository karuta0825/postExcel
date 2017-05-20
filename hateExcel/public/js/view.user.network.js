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
        'exec'     : '.btn--exec',
        'delete'   : '.btn--del'
      },
      'checkbox' : '.mdl-checkbox',
      'download' : {
        'fenics'      : '.download--fenics',
      },
      'table'  : '.fenics-table',
      'dialog' : {
        'download' : '#modal-network-download',
        'delete'   : '#confirm-delete-fenics-accounts'
      }
    }
  , _openDialog
  , _closeDialog
  , _execDowload
  , _downloadFile
  , _getSelectItem
  , _deleteFenicsAccounts
  , clear
  , refresh
  , drawTable
  , initModule
  ;

  _openDialog = function () {
    networkView.get('dialog__download').get(0).showModal();
  };

  _closeDialog = function () {
    networkView.get('dialog__download').get(0).close();
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

    // // 閉じる
    // networkView.get('dialog_download').get(0).close();
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

  /**
   * チェックされたユーザを取得する
   */
  _getSelectItem = function () {

    var ids = _.map( $('.is-selected', networkView.top ), function (val,key){
      return { 'fenics_id' : $(val).attr('id') } ;
    });

    if ( ids.length === 0 ) {
      alert('選択されていません');
      return;
    }

    return ids;

  };


  _deleteFenicsAccounts = function () {

    var
      list_accounts           = _getSelectItem()
    , kid                     = cms.model.userBaseInfo.getCache().kid
    , number_accounts_now     = cms.model.kids.find({kid : kid})[0].number_pc
    , number_deleted_accounts
    ;

    if ( list_accounts && list_accounts.length > 0 ) {

      number_deleted_accounts = list_accounts.length

      // check
      console.log(list_accounts);

      // 端末削除
      cms.model.userNetwork.delete( list_accounts, function () {

        // 端末台数の変更
        cms.model.kids.update({
            'kid'       : kid,
            'number_pc' : number_accounts_now - list_accounts.length
          }, function () {
            cms.view.userBaseInfo.refresh();
            refresh();
        });

      });

    }

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

  refresh = function () {
    var kid = cms.model.userNetwork.getCache()[0].kid;
    cms.model.userNetwork.fetch( kid, redrawTable );
  };

  initModule = function () {

    drawTable();

    util.confirm({
      selector : '#usr-network-panel',
      id       : 'confirm-delete-fenics-accounts',
      msg      : '選択したユーザを削除しますか？',
      yes      : _deleteFenicsAccounts
    });

    networkView = new Controller('#usr-network-panel');
    networkView.initElement( elements );

    networkView.addListener({
      'click btn__download'     : _openDialog,
      'click btn__close'        : _closeDialog,
      'click btn__exec'         : _execDowload,
      'click btn__delete'       : function () { networkView.get('dialog__delete').get(0).showModal(); },
      'click download__fenics'  : $.proxy( function (e) { console.log(e); }, this),
    });

  };


  // to public
  cms.view.userNetwork = {
    initModule : initModule,
    redrawTable : redrawTable
  };

} ( jQuery, customer ));