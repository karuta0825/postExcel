/**
 * ネットワークタブ
 */

( function ( $, cms ) {

  var
    networkView
  , elements = {
      'btn' : {
        'cancel'   : '.btn--cancel',
        'save'     : '.btn--save',
        'edit'     : '.btn--edit',
        'download' : '.btn--download',
        'close'    : '.btn--close',
        'exec'     : '.btn--exec',
        'fenics-edit' : '.fenics-table td.edit'
      },
      'input-date'     : '.input-date',
      'alert-dialog' : '#modal-userBusiv-alert',
      'checkbox' : '.mdl-checkbox',
      'download' : {
        'fenics'      : '.download--fenics',
      },
      'fenics-section' : {
        'self'  : '.fenics-section',
        'title' : '.fenics-section .user-list__section',
        'body'  : '.fenics-section .body'
      },
      'dialog' : {
        'download' : '#modal-network-download',
      },
      'busiv-section' : {
        'self' : '.busiv-section',
        'input' : {
          'circuit_name'           : '.circuit_name'      ,
          'circuit_service'        : '.circuit_service'   ,
          'open_date'              : '.open_date'         ,
          'w_network'              : '.w_network'         ,
          'w_subnet'               : '.w_subnet'          ,
          'w_router'               : '.w_router'          ,
          'has_sx'                 : '.has_sx'            ,
          'how_to_cooperate'       : '.how_to_cooperate'  ,
          'has_L3'                 : '.has_L3'            ,
          'sx_ip'                  : '.sx_ip'             ,
          'has_carte'              : '.has_carte'         ,
          'carte_system'           : '.carte_system'      ,
          'carte_html_save_ip'     : '.carte_html_save_ip',
          'has_cc'                 : '.has_cc'            ,
          'cc_ip'                  : '.cc_ip'             ,
          'download_server_ip'     : '.download_server_ip',
          'auth_server_ip'         : '.auth_server_ip'
        }
      }
    }
  , _validate
  , _openDialog
  , _closeDialog
  , _execDowload
  , _downloadFile
  , _getSelectItem
  , _goEditMode
  , _deleteFenicsAccounts
  , _save
  , _cancel
  , _selectChoice
  , _getBusivInfo
  , _openFenicsEditDialog
  , clear
  , showBusiv
  , hideBusiv
  , showFenics
  , hideFenics
  , setBusivInfo
  , refresh
  , drawTable
  , initModule
  ;

  _validate = function ( list_key ) {

    _.each( networkView.get('busiv-section__input'), function (val, key){
      val.find('.item-value').removeClass('is-error');
    });

    if ( list_key.length !== 0 ) {

      _.each( list_key, function ( v,k ) {
        networkView.get('busiv-section__input__' + v )
          .find('.item-value')
          .addClass('is-error');
      });

      networkView.get('alert-dialog').get(0).showModal();

      return true;

    }

    return false;

  };


  /**
   * 編集モード
   * TODO:セレクトボックス指定のためのPropertyを作る
   */
  _goEditMode = function () {

    // ボタン制御
    networkView.get('btn__edit').addClass('is-hidden');
    networkView.get('btn__download').addClass('is-hidden');
    networkView.get('btn__cancel').removeClass('is-hidden');
    networkView.get('btn__save').removeClass('is-hidden');

    // 日付変更可能
    networkView.wrap.find('.input-date').prop('disabled', false);

    // busiv情報
    _.each( networkView.get('busiv-section__input'), function (val,key) {
      val.find('.item-value').addClass('is-edit');
      val.find('.item-value').prop('disabled', false);
    });

    // buisvセレクトボックスの編集可能
    networkView.get('busiv-section__input')['has_sx'].addClass('is-edit');
    networkView.get('busiv-section__input')['has_L3'].addClass('is-edit');
    networkView.get('busiv-section__input')['has_carte'].addClass('is-edit');
    networkView.get('busiv-section__input')['has_cc'].addClass('is-edit');

  };

  /**
   * 通常モードに戻る
   */
  _backMode = function () {

    // ボタン制御
    networkView.get('btn__edit').removeClass('is-hidden');
    networkView.get('btn__download').removeClass('is-hidden');
    networkView.get('btn__cancel').addClass('is-hidden');
    networkView.get('btn__save').addClass('is-hidden');

    // ユニバ情報
    networkView.wrap.find('.input-date').prop('disabled', true);

    // busiv情報
    _.each( networkView.get('busiv-section__input'), function (val,key) {
      val.find('.item-value').removeClass('is-edit');
      val.find('.item-value').prop('disabled', true);
    });

    // buisvセレクトボックスの編集不可能
    networkView.get('busiv-section__input')['has_sx'].removeClass('is-edit');
    networkView.get('busiv-section__input')['has_L3'].removeClass('is-edit');
    networkView.get('busiv-section__input')['has_carte'].removeClass('is-edit');
    networkView.get('busiv-section__input')['has_cc'].removeClass('is-edit');

  };


  _openDialog = function () {
    networkView.get('dialog__download').get(0).showModal();
  };

  _closeDialog = function () {
    networkView.get('dialog__download').get(0).close();
  };

  _openFenicsEditDialog = function () {

    var
      fenics_id = $(this).parents('tr').attr('id')
    , item = cms.model.userNetwork.find({ 'fenics_id' : fenics_id })[0];
    ;

    cms.view.dialogFenics.open(item);

  };

  _execDowload = function () {

    // ダウンロード
    _.each( networkView.get('checkbox'), function ( val, key ) {
      if( $(val).hasClass('is-checked') ) {
        $(val).find('a')[0].click();
      }
    });

    // 初期化
    clear();

    // // 閉じる
    networkView.get('dialog__download').get(0).close();

  };

  _downloadFile = function () {

    var
      csv_header   = '"※update_flag[A:Add,M:modify,D:Delete] ",※Prefix,※user_label,init_password,id_group,access_control_group,start_date[ex.20091201],end_date[ex.20091231],comment1,comment2,comment3,"regist_terminal_flag[1:Pre-Reg,2:Auto-Reg,3:Approval]",card_line_no01[ex.09012345678],card_line_no02[ex.09012345678],card_line_no03[ex.09012345678],card_line_no04[ex.09012345678],card_line_no05[ex.09012345678],card_line_no06[ex.09012345678],card_line_no07[ex.09012345678],card_line_no08[ex.09012345678],card_line_no09[ex.09012345678],card_line_no10[ex.09012345678]'
    , kid          =  cms.model.userBaseInfo.getCache().kid
    , file_name    = new moment().format('YYYYMMDD') + '_' + kid + '_fenicsAccount.csv'
    , list_checked = _getSelectItem()
    , downloadMap
    , blob
    ;

    // 検索データがゼロのとき、処理終了
    if ( list_checked.length < 1 ) {
      return;
    }

    // 取得データからモデルにデータ検索
    downloadMap = cms.model.userNetwork.makeAccountMapList( list_checked );

    // データ作成
    blob = util.convertMap2Blob( downloadMap, csv_header );

    // ダウンロード
    util.downloadFile( this, blob, file_name );

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
      return [];
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

      // 端末削除
      cms.model.userNetwork.delete( list_accounts, function () {

        // 端末台数の変更
        cms.model.kids.update({
            'kid'       : kid,
            'number_pc' : number_accounts_now - list_accounts.length
          }, function () {
            cms.view.userBaseInfo.refresh();
            refresh();
            _backMode();
        });

      });

    }

  };

  /**
   * ビジV情報を更新するために必要
   */
  _save = function () {

    var error;

    if ( cms.model.userBaseInfo.getCache().has_busiv === 1 ) {

      error = cms.model.userBusiv.check( _getBusivInfo() );

      if ( _validate(error) ) {
        return;
      }

      cms.model.userBusiv.update( _getBusivInfo(), setBusivInfo );

    }

    _backMode();

  };

  _cancel = function () {

    // 画面制御
    _backMode();

    // 最新データの取得・再描画
    refresh();

  };

  _selectChoice    = function () {
    var
      el_pushed = $(event.target)
    , className = el_pushed.attr('class').split(' ')[0]
    , yes = $( $(this).find('button').get(0) )
    ;

    if ( className === 'choice' && el_pushed.parents('li').hasClass('is-edit') ) {
      yes.toggleClass('choice--on');
    }

  };

  _getBusivInfo = function () {

    var
      result = {}
    , list_choice = ['has_sx', 'has_L3', 'has_carte', 'has_cc']
    ;

    _.each( networkView.get('busiv-section__input'), function (v,k) {
      result[k] = v.find('.item-value').val();
    });

    // 選択形式の入力の値を取得
    _.each( list_choice, function (v,k) {

      if ( networkView.get('busiv-section__input')[v]
      .hasClass('.choice--on') ) {
        result[v] = 1
      }
      else {
        result[v]= 0
      }
      ;

    });

    return result;

  };

  setBusivInfo = function ( data ) {

    var data = _.isArray( data ) ? data[0] : data;

    if ( !data ) {
      return;
    }

    _.each( networkView.get('busiv-section__input'), function (v,k) {
      v.find('.item-value').val( data[k]);
    });

    // sx連携
    if ( data.has_sx === 1 ) {
      networkView.get('busiv-section__input__has_sx')
      .find('.yes_sx').addClass('choice--on');
    }
    else {
      networkView.get('busiv-section__input__has_sx')
      .find('.yes_sx').removeClass('choice--on');
    }

    //　L3有無
    if ( data.has_L3 === 1) {
      networkView.get('busiv-section__input__has_L3')
      .find('.yes_L3').addClass('choice--on');
    }
    else {
      networkView.get('busiv-section__input__has_L3')
      .find('.yes_L3').removeClass('choice--on');
    }

    // カルテ連携
    if ( data.has_carte === 1 ) {
      networkView.get('busiv-section__input__has_carte')
      .find('.yes_carte').addClass('choice--on');
    }
    else {
      networkView.get('busiv-section__input__has_carte')
      .find('.yes_carte').removeClass('choice--on');
    }

    //　CC連携
    if ( data.has_cc === 1) {
      networkView.get('busiv-section__input__has_cc')
      .find('.yes_cc').addClass('choice--on');
    }
    else {
      networkView.get('busiv-section__input__has_cc')
      .find('.yes_cc').removeClass('choice--on');
    }

  };

  redrawTable = function ( data ) {

    var
      data     = {
        list      : data,
        clients   : cms.model.clients.find({ is_admin : 0 })
      }
    , tmpl     = customer.db.getHtml('template/mobile.fenics.list.html')
    , complied = _.template( tmpl )
    ;

    networkView.get('fenics-section').empty();
    networkView.get('fenics-section').append( complied(data) );

  };

  drawTable = function ( data ) {

    var
      data     = {
        list      : data,
        clients   : cms.model.clients.find({ is_admin : 0 })
      }
    , tmpl     = customer.db.getHtml('template/mobile.fenics.list.html')
    , complied = _.template( tmpl )
    ;

    networkView.get('fenics-section__body').empty();
    networkView.get('fenics-section__body').append( complied(data) );
    componentHandler.upgradeElements( networkView.wrap );

  };

  /**
   * 初期状態の戻す
   * チェック状態とボタンの情報を初期化してる
   */
  clear = function () {

    // チェックを外す
    _.each( networkView.get('checkbox'), function ( val, key ) {
      if ( $(val).hasClass('is-checked') ) {
        $(val).trigger('click');
      }
    });

    _backMode();

  };

  showBusiv = function () {
    networkView.get('busiv-section__self').removeClass('is-hidden');
    networkView.get('btn__edit').removeClass('is-hidden');
  };

  hideBusiv = function () {
    networkView.get('busiv-section__self').addClass('is-hidden');
    networkView.get('btn__edit').addClass('is-hidden');
  };

  showFenics = function () {
    networkView.get('fenics-section__self').removeClass('is-hidden');
  };

  hideFenics = function () {
    networkView.get('fenics-section__self').addClass('is-hidden');
  };

  refresh = function () {

    if ( cms.model.userNetwork.getCache().length > 0 ) {
      var kid = cms.model.userNetwork.getCache()[0].kid;
      cms.model.userNetwork.fetch( kid , function () {
        cms.model.userNetwork.find({'is_mobile' : 0}, redrawTable);
      });
    }

    cms.model.userBusiv.getCache( setBusivInfo );

  };

  initModule = function () {

    networkView = new Controller('#usr-network-panel');

    networkView.wrap.append(
      customer.db.getHtml('template/user.network.html')
    );

    util.alert({
      selector : networkView.top,
      id       : 'modal-userBusiv-alert',
      msg      : '入力に誤りがあります'
    });

    networkView.initElement( elements );

    networkView.addListener({
      'click btn__download'     : _openDialog,
      'click btn__close'        : _closeDialog,
      'click btn__exec'         : _execDowload,
      'click btn__edit'         : _goEditMode,
      'click btn__cancel'       : _cancel,
      'click btn__save'         : _save,
      'click btn__fenics-edit'  : _openFenicsEditDialog,
      'click download__fenics'  : _downloadFile,
      'click busiv-section__input__has_sx' : _selectChoice,
      'click busiv-section__input__has_L3' : _selectChoice,
      'click busiv-section__input__has_carte' : _selectChoice,
      'click busiv-section__input__has_cc' : _selectChoice,
    });

  };


  // to public
  cms.view.userNetwork = {
    initModule          : initModule,
    redrawTable         : drawTable,
    clear               : clear,
    showBusiv           : showBusiv,
    hideBusiv           : hideBusiv,
    showFenics          : showFenics,
    hideFenics          : hideFenics,
    setBusivInfo        : setBusivInfo,
    refresh             : refresh
  };

} ( jQuery, customer ));