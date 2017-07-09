  /**
 * ユーザー基本情報
 */

(function ($, cms) {

  var
    elements = {
      'common' : {
        'btn' : {
          'edit'        : '.btn--edit',
          'cancel'      : '.btn--cancel',
          'save'        : '.btn--save'
        },
        'alert' : '#modal-baseInfo-alert',
        'alert-network' : '#modal-baseInfo-notHasNetwork-alert',
        'confirm' : '#modal-baseInfo-fenicsAdd-confirm'
      },
      'base' : {
        'btn' : {
          'minusPC'     : '.btn-minus-pc',
          'plusPC'      : '.btn-plus-pc',
          'minusClient' : '.btn-minus-account',
          'plusClient'  : '.btn-plus-account'
        },
        'kid'              : '.kid',
        'input' : {
          'user_name'      : '.user_name',
          'server'         : '.server',
          'userkey'        : '.userkey',
          'db_password'    : '.db_pass',
          'fenics_key'     : '.fenics_key',
          'client_number'  : '.client_number',
          'number_pc'      : '.number_pc',
          'number_id'      : '.number_id',
          'start_id'       : '.start_id'
        },
        'choice' : {
          'busiv'          : '.busiv',
          'fenics'         : '.univ',
          'mobile'         : '.has_mobile'
        },
        'environment' : {
          'system_type'    : '.system_type',
          'version'        : '.version',
          'network'        : '.network',
          'mobile'         : '.mobile'
        }
      },
      'customer' : {
        'input' : {
          'base_name'      : '.base_name',
          'postal_cd'      : '.postal_cd',
          'address'        : '.address',
          'affliation'     : '.affliation',
          'owner'          : '.owner',
          'tel'            : '.tel',
          'fax'            : '.fax'
        }
      }
    }
  , systemView
  , customerView
  , commonView
  , _save
  , _cancel
  , _edit
  , _decreaseClient
  , _increaseClient
  , _decreasePC
  , _increasePC
  , _selectNetwork
  , _selectHasMobile
  , _hiddenItem
  , _goViewMode
  , _validate
  , _validateSystem
  , _update
  , getViewInfo
  , makeSystemInfo
  , makeCustomerInfo
  , reset
  , clear
  , refresh
  , initModule
  ;

  _validate = function ( list_key ) {

    // 拠点情報の入力チェック
    _.each( customerView.get('input'), function (val, key){
      val.find('.item-value').removeClass('is-error');
    });

    // 除外対象
    list_key = _.without( list_key, 'has_busiv');
    list_key = _.without( list_key, 'has_fenics');
    list_key = _.without( list_key, 'has_mobile');

    if ( list_key.length !== 0 ) {

      _.each( list_key, function ( v,k ) {
        customerView.get('input__' + v )
          .find('.item-value')
          .addClass('is-error');
      });

      commonView.get('alert').get(0).showModal();

      return true;

    }

    return false;

  };

  _validateSystem = function ( list_key ) {

    // エラーviewの初期化
    _.each( systemView.get('input'), function (val, key){
      val.find('.item-value').removeClass('is-error');
    });

    if ( list_key.length !== 0 ) {

      _.each( list_key, function ( v,k ) {
        systemView.get('input__' + v )
          .find('.item-value')
          .addClass('is-error');
      });

      commonView.get('alert').get(0).showModal();

      return true;
    }

    return false;

  };

  _toggleEditMode = function ( view_property, can_edit, view ) {
    if ( can_edit ) {
      view.get(view_property).find('.item-value').addClass('is-edit');
      view.get(view_property).find('.item-value').prop('disabled', false);
    }
    else {
      view.get(view_property).find('.item-value').removeClass('is-edit');
      view.get(view_property).find('.item-value').prop('disabled', true);
    }
  };

  _hiddenItem = function ( is_onpre ) {
    if ( is_onpre === 'onpre' ) {
      systemView.get('input__userkey').addClass('is-hidden');
      systemView.get('input__server').addClass('is-hidden');
      systemView.get('input__db_password').addClass('is-hidden');
    }
  };

  _goViewMode = function () {
    // 編集不可
    _.each( systemView.get('input'), function ( v,k ) {
      _toggleEditMode('input__' +k , false, systemView, systemView );
    });

    _.each( customerView.get('input'), function ( v,k ) {
      _toggleEditMode('input__' +k , false, customerView );
    });

    systemView.get('environment__network').removeClass('is-edit');

    _.each( systemView.get('btn'), function (v,k) {
      systemView.get('btn__' + k).addClass('is-hidden');
    });

    // ボタン状態制御
    commonView.get('btn__edit').removeClass('is-hidden');
    commonView.get('btn__cancel').addClass('is-hidden');
    commonView.get('btn__save').addClass('is-hidden');

  };

  /**
   * 一連の更新内容をまとめる
   * @param  {[type]} can_add_fenicsId
   */
  _update = function ( can_add_fenicsId ) {

    if ( can_add_fenicsId ) {
      customer.model.userNetwork.addFenicsAccount( getViewInfo() );
    }

    customer.model.userBaseInfo.addClient( getViewInfo().client_number );
    customer.model.userCustomer.update( getViewInfo('customer'), makeCustomerInfo );
    customer.model.kids.update( getViewInfo('system'), makeSystemInfo );

  };

  _save = function () {

    var
      error
      // view情報が最新なので判断する
    , has_busiv = getViewInfo('customer').has_busiv
    , has_fenics = getViewInfo('customer').has_fenics
    , has_mobile = getViewInfo('customer').has_mobile
    ;

    // 拠点情報の入力チェック
    error = cms.model.userCustomer.check( getViewInfo('customer') )
    if ( _validate(error) ) {
      return;
    }

    // 基本除法の入力チェック
    error = cms.model.userBaseInfo.check( getViewInfo('system'), has_busiv );
    if ( _validateSystem(error)) {
      return;
    }

    // ネットワーク情報による入力チェック
    if (  has_busiv === 0 && has_fenics === 0     ) {
      commonView.get('alert-network').get(0).showModal();
      return;
    }

    // データ操作 update
    if (  has_busiv === 0 && has_fenics === 1     ) {
      _update(true);
    }

    // 両方使用してる場合、fenics追加かどうか尋ねる
    if ( has_busiv === 1 && has_fenics === 1 ) {
      commonView.get('confirm').get(0).showModal();
    }

    if ( has_busiv === 1 && has_fenics === 0 ) {
      _update(false);
    }

    // モバイル表示制御
    if ( has_mobile === 1 ) {
      cms.view.editUsrs.showMobile();
    }
    else {
      cms.view.editUsrs.hideMobile();
    }

    // 画面制御
    _goViewMode();

  };

  _cancel = function () {

    _goViewMode();

    // データの初期化
    reset();

  };

  _edit = function () {

    // 編集可
    _.each( systemView.get('input'), function ( v,k ) {
      _toggleEditMode('input__' + k , true, systemView );
    });

    _.each( customerView.get('input'), function ( v,k ) {
      _toggleEditMode('input__' + k , true, customerView );
    });

    // セレクトボックス
    systemView.get('environment__network').addClass('is-edit');

    systemView.get('environment__mobile').addClass('is-edit');

    // ボタン状態制御
    _.each( systemView.get('btn'), function (v,k) {
      systemView.get('btn__' + k).removeClass('is-hidden');
    });

    // ボタン状態制御
    commonView.get('btn__edit').addClass('is-hidden');
    commonView.get('btn__cancel').removeClass('is-hidden');
    commonView.get('btn__save').removeClass('is-hidden');

  };

  _increaseClient = function () {
    var now = Number(systemView.get('input__client_number').find('.item-value').val());
    systemView.get('input__client_number').find('.item-value').val( now + 1 );
  };

  _decreaseClient = function () {
    var now = Number(systemView.get('input__client_number').find('.item-value').val());
    if ( now > 0 ) {
      systemView.get('input__client_number').find('.item-value').val( now - 1 );
    }
  };

  _increasePC = function () {
    var now = Number(systemView.get('input__number_pc').find('.item-value').val());
    systemView.get('input__number_pc').find('.item-value').val( now + 1 );
  };

  _decreasePC = function () {
    var now = Number(systemView.get('input__number_pc').find('.item-value').val());
    if ( now > 0 ) {
      systemView.get('input__number_pc').find('.item-value').val( now - 1 );
    }
  };

  _selectNetwork = function ( event ) {

    if ( $(event.target).parent('li').hasClass('is-edit') ) {

      var list_class = $( event.target ).attr('class').split(' ');

      switch ( list_class[1] ) {
        case 'busiv' :
          systemView.get('choice__busiv').toggleClass('choice--on');
          break;
        case 'univ' :
          systemView.get('choice__fenics').toggleClass('choice--on');
          break;
        default:
          break;
      }

    }

  };

  _selectHasMobile = function ( event ) {

    if ( $(event.target).parent('li').hasClass('is-edit') ) {

      systemView.get('choice__mobile').toggleClass('choice--on');

    }

  }

  /**
   * 画面からデータ取得
   * @param  {String} section - 画面のセクション名
   * @return {Object} result  - セクションあるいは画面全体に入力されているデータ
   */
  getViewInfo = function ( section ) {

    var
      result = {}
    , select_network = systemView.get('environment__network').find('.choice--on')
    ;

    result.system = {
      'kid'           : systemView.get('kid'                        ).find('.item-value').val(),
      'user_name'     : systemView.get('input__user_name'           ).find('.item-value').val(),
      'server'        : systemView.get('input__server'              ).find('.item-value').val(),
      'userkey'       : systemView.get('input__userkey'             ).find('.item-value').val(),
      'db_password'   : systemView.get('input__db_password'         ).find('.item-value').val(),
      'fenics_key'    : systemView.get('input__fenics_key'          ).find('.item-value').val(),
      'client_number' : Number(systemView.get('input__client_number').find('.item-value').val() ),
      'number_pc'     : Number(systemView.get('input__number_pc'    ).find('.item-value').val() ),
      'number_id'     : Number(systemView.get('input__number_id'    ).find('.item-value').val() ),
      'start_id'      : Number(systemView.get('input__start_id'     ).find('.item-value').val() )
    };

    result.customer = {
      'kid'           : systemView.get('kid'                ).find('.item-value').val(),
      'postal_cd'     : customerView.get('input__postal_cd' ).find('.item-value').val(),
      'address'       : customerView.get('input__address'   ).find('.item-value').val(),
      'affliation'    : customerView.get('input__affliation').find('.item-value').val(),
      'owner'         : customerView.get('input__owner'     ).find('.item-value').val(),
      'tel'           : customerView.get('input__tel'       ).find('.item-value').val(),
      'fax'           : customerView.get('input__fax'       ).find('.item-value').val(),
      'has_busiv'     : systemView.get('choice__busiv').hasClass('choice--on') ? 1 :0 ,
      'has_fenics'    : systemView.get('choice__fenics').hasClass('choice--on') ? 1 :0,
      'has_mobile'    : systemView.get('choice__mobile').hasClass('choice--on') ? 1 : 0
    };

    if ( section === 'system' ) {
      return result.system;
    }
    else if ( section === 'customer') {
      return result.customer;
    }
    else {
      return _.extend( {}, result.system, result.customer );
    }

  };

  /**
   * システム情報にデータ表示
   */
  makeSystemInfo = function ( data ) {

    // 該当サーバの検索
    var list_option = customer.model.servers.find({
      'version'     : data.version,
      'type'        : 'AP'
    });

    // オンプレの場合非表示
    _hiddenItem( data.system_type );

    // 検索結果をoptionとして追加
    util.addServerOption( list_option, systemView.get('input__server').find('select'), true );

    // 値設定
    _.each( systemView.get('input'), function (v,k) {
      v.find('.item-value').val(data[k]);
    });

    if ( data.system_type === 'onpre' ) {
      systemView.get('environment__system_type').find('.onpre').addClass('choice--on');
      systemView.get('environment__system_type').find('.cloud').removeClass('choice--on');
    }
    else {
      systemView.get('environment__system_type').find('.onpre').removeClass('choice--on');
      systemView.get('environment__system_type').find('.cloud').addClass('choice--on');
    }

    if ( data.version === 'LM' ) {
      systemView.get('environment__version').find('.ES').removeClass('choice--on');
      systemView.get('environment__version').find('.LM').addClass('choice--on');
    }
    else {
      systemView.get('environment__version').find('.ES').addClass('choice--on');
      systemView.get('environment__version').find('.LM').removeClass('choice--on');
    }

    if ( data.has_busiv === 1 ) {
      systemView.get('environment__network').find('.busiv').addClass('choice--on');
    }
    else {
      systemView.get('environment__network').find('.busiv').removeClass('choice--on');
    }

    if ( data.has_fenics === 1 ) {
      systemView.get('environment__network').find('.univ').addClass('choice--on');
    }
    else {
      systemView.get('environment__network').find('.univ').removeClass('choice--on');
    }

    if ( data.has_mobile === 1 )  {
      systemView.get('environment__mobile').find('.has_mobile').addClass('choice--on');
    }
    else {
      systemView.get('environment__mobile').find('.has_mobile').removeClass('choice--on');
    }


  };

  /**
   * 拠点情報にデータを表示
   */
  makeCustomerInfo = function ( data ) {

    if ( _.isArray( data ) ) {
      data = data[0];
    }

    systemView.get('kid').find('.item-value').val(data['kid']);

    _.each( customerView.get('input'), function (v,k) {
      v.find('.item-value').val(data[k]);
    });

  };

  /**
   * TODO: getCacheのコールバックでしたほうが分離できていい
   * データの初期化
   */
  reset = function () {

    var
      systemInfo    = customer.model.userBaseInfo.getCache()
    , customerInfo  = cms.model.userCustomer.getCache()
    ;

    systemView.get('kid').find('.item-value').val(systemInfo.kid);

    _.each( systemView.get('input'), function (v,k) {
      v.find('.item-value').val(systemInfo[k])
    });

    _.each( customerView.get('input'), function (v,k) {
      v.find('.item-value').val(customerInfo[k])
    });

    // ビジVの状態
    if ( customerInfo.has_busiv === 1 ) {
      systemView.get('environment__network').find('.busiv').addClass('choice--on');
    }
    else {
      systemView.get('environment__network').find('.busiv').removeClass('choice--on');
    }

    // ユニバの状態
    if ( customerInfo.has_fenics === 1 ) {
      systemView.get('environment__network').find('.univ').addClass('choice--on');
    }
    else {
      systemView.get('environment__network').find('.univ').removeClass('choice--on');
    }

    // 入力エラーの解除
    // システム情報
    _.each( systemView.get('input'), function (val, key){
      val.find('.item-value').removeClass('is-error');
    });

    // 拠点情報
    _.each( customerView.get('input'), function (val, key){
      val.find('.item-value').removeClass('is-error');
    });


  };

  // ボタンの位置をもとに戻す
  clear = function () {

    // 参照モードに
    _goViewMode();

    // オンプレユーザーで非表示にした項目を表示
    systemView.get('input__userkey').removeClass('is-hidden');
    systemView.get('input__server').removeClass('is-hidden');
    systemView.get('input__db_password').removeClass('is-hidden');

    _.each( systemView.get('input'), function (v,k) {
      v.find('.item-value').val('');
    });

    _.each( customerView.get('input'), function (v,k) {
      v.find('.item-value').val('');
    });

  };

  refresh = function () {
    var kid = cms.model.userBaseInfo.getCache().kid;
    cms.model.userBaseInfo.fetch(kid, makeSystemInfo);
    cms.model.userCustomer.fetch( kid, makeCustomerInfo );
  };

  initModule = function () {

    $('#usr-base-panel')
    .append( customer.db.getHtml('template/user.base.html'));

    commonView = new Controller('#usr-base-panel');
    systemView = new Controller('#usr-base-panel');
    customerView = new Controller('#usr-base-panel');

    util.alert({
      selector : commonView.top,
      id       : 'modal-baseInfo-alert',
      msg      : '入力に誤りがあります'
    });

    util.alert({
      selector : commonView.top,
      id       : 'modal-baseInfo-notHasNetwork-alert',
      msg      : 'ネットワーク情報（ユニバあるいはビジV）を決めてください'
    });

    util.confirmYesNo({
      selector : commonView.top,
      id       : 'modal-baseInfo-fenicsAdd-confirm',
      msg      : 'ビジVとユニバの両方を使用しています。端末追加の場合、fenicsIDを作成しますか？',
      yes      : function () { _update(true) },
      no       : function () { _update(false) }
    });

    commonView.initElement(elements.common);
    systemView.initElement(elements.base);
    customerView.initElement(elements.customer);

    commonView.addListener({
     'click btn__edit'         : _edit,
     'click btn__cancel'       : _cancel,
     'click btn__save'         : _save,
    });

    systemView.addListener({
     'click btn__plusClient'   : _increaseClient,
     'click btn__minusClient'  : _decreaseClient,
     'click btn__plusPC'       : _increasePC,
     'click btn__minusPC'      : _decreasePC,
     'click environment__network' : _selectNetwork,
     'click environment__mobile' : _selectHasMobile
    });

  };

  cms.view.userBaseInfo = {
    initModule   : initModule,
    makeSystemInfo : makeSystemInfo,
    makeCustomerInfo : makeCustomerInfo,
    reset        : reset,
    clear        : clear,
    refresh      : refresh,
    getViewInfo  : getViewInfo,
    get : function () { return customerView;}
  };


}(jQuery, customer));

