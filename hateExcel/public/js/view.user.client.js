/**
 * クライアント情報
 */

( function ( $, cms ) {

  // member
  var
    clientView
  , elements = {
      'btn' : {
        'cancel'   : '.btn--cancel',
        'delete'   : '.btn--del',
        'save'     : '.btn--save',
        'edit'     : '.btn--edit',
        'download' : '.btn--download',
        'close'    : '.btn--close',
        'exec'     : '.btn--exec',
      },
      'checkbox' : '.mdl-checkbox',
      'select-clients' : '.select-clients',
      'download' : {
        'client'      : '.download--client',
        'open_notice' : '.download--open-notice',
        'spla'        : '.download--spla',
        'mail'        : '.download--mail',
      },
      'table'  : '.account-table',
      'dialog' : {
        'download' : '#modal-client-download',
        'delete'   : '#delete-clients-confirm'
      }
    }
  , _goEditMode
  , _backMode
  , _openDialog
  , _closeDialog
  , _execDowload
  , _downloadOpenNotice
  , _downloadBat
  , _downloadSpla
  , _changeFenicsId
  , _save
  , makeFenicsSelectBox
  , clear
  , drawTable
  , redrawTable
  , initModule
  ;

  /**
   * 編集モード
   * TODO:セレクトボックス指定のためのPropertyを作る
   */
  _goEditMode = function () {
    clientView.get('btn__edit').addClass('is-hidden');
    clientView.get('btn__download').addClass('is-hidden');
    clientView.get('btn__cancel').removeClass('is-hidden');
    clientView.get('btn__delete').removeClass('is-hidden');
    clientView.get('btn__save').removeClass('is-hidden');

    // wrapではなく、propertyをしていさせる
    clientView.wrap.find('.select-clients').prop('disabled', false);

  };

  /**
   * 通常モードに戻る
   */
  _backMode = function () {

    clientView.get('btn__edit').removeClass('is-hidden');
    clientView.get('btn__download').removeClass('is-hidden');
    clientView.get('btn__cancel').addClass('is-hidden');
    clientView.get('btn__delete').addClass('is-hidden');
    clientView.get('btn__save').addClass('is-hidden');

    clientView.wrap.find('.select-clients').prop('disabled', true);

  };

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
        $(val).find('a')[0].click();
      }
    });

    // 初期化
    clear();

    // 閉じる
    clientView.get('dialog__download').get(0).close();
  };


  _downloadOpenNotice = function () {

    var
      kid          =  cms.model.userBaseInfo.getCache().kid
    , file_name    = new moment().format('YYYYMMDD') + '_' + kid + '_OpenNotice.csv'
    , list_checked = _getSelectItem()
    , downloadMap
    , csv_header
    , blob
    ;

    // 検索データがゼロのとき、処理終了
    if ( list_checked.length < 1 ) {
      return;
    }

    // 取得データからモデルにデータ検索
    downloadMap = cms.model.clients.makeOpenNotice( list_checked );

    csv_header = _.values(downloadMap.header).join(',');

    // データ作成
    blob = util.convertMap2Blob( downloadMap.body, csv_header );

    // ダウンロード
    util.downloadFile( this, blob, file_name );

  };

  _downloadBat = function () {

    var
      kid          =  cms.model.userBaseInfo.getCache().kid
    , file_name    = new moment().format('YYYYMMDD') + '_' + kid + '_makeUserData.bat'
    , downloadMap
    , csv_header
    , blob
    ;

    downloadMap = cms.model.clients.makeBatInfo();

    // データ作成
    blob = util.makeMapList2Txt( downloadMap );

    // ダウンロード
    util.downloadFile( this, blob, file_name );



  };

  _downloadSpla = function () {

  };

  _getSelectItem = function () {

    var ids = _.map( $('.is-selected', clientView.top ), function (val,key){
      return { 'client_id' : $(val).attr('id') } ;
    });

    if ( ids.length === 0 ) {
      alert('選択されていません');
      return [];
    }

    return ids;

  };

  _setFenicsSelectValue = function () {
    var
      tr = clientView.get('table').find('tbody tr')
    , value
    ;

    _.each( tr, function ( el, idx ) {
      value = cms.model.clients.find( { client_id :$(el).attr('id') })[0].fenics_id;
      $(el).find('.select-clients').val( value );
    });

  };


  makeFenicsSelectBox = function () {

    var
      data = cms.model.userNetwork.getCache()
    , option
    ;

    clientView.get('select-clients').empty();

    // 空オプション作成
    clientView.get('select-clients').append( $('<option>') );

    _.each( data, function ( v, k ) {
      option = $('<option>', { 'value' : v['fenics_id'], 'text' : v['fenics_id'] } );
      clientView.get('select-clients').append(option);
    });

    _setFenicsSelectValue();

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

  _changeFenicsId = function ( evt ) {
    var
      el        = $(evt.target)
    , client_id = el.parents('tr').attr('id')
    , value     = el.val()
    ;

    // コレクションの値を書き換える
    cms.model.clients.find({ 'client_id' : client_id })[0].fenics_id = value;

    cms.model.clients.changeUpdateInfo( client_id );

  };


  _save = function () {
    cms.model.clients.update();
    _backMode();
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

    clientView.updateElement({'table'           : '.account-table'});
    clientView.updateElement({'select-clients'  : '.select-clients'});

    makeFenicsSelectBox();

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

    _backMode();

  };

  refresh = function () {

    if ( cms.model.clients.getCache().length > 0 ) {
      var kid = cms.model.clients.getCache()[0].kid;
      cms.model.clients.fetch( kid , redrawTable );
    }

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
      'click btn__edit'             : _goEditMode,
      'click btn__cancel'           : _backMode,
      'click btn__save'             : _save,
      'click download__client'      : _downloadBat,
      'click download__open_notice' : _downloadOpenNotice,
      'click download__spla'        : function () { alert('download download__s')},
      'click download__mail'        : function () { alert('download download__m')},
      'change select-clients'       : _changeFenicsId
    });

  };

  // to public
  cms.view.userClient = {
    initModule : initModule,
    drawTable  : drawTable,
    redrawTable : redrawTable,
    clear : clear,
    get : _getSelectItem,
    makeFenicsSelectBox : makeFenicsSelectBox
  };

}( jQuery, customer ));

