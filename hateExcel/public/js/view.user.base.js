/**
 * ユーザー基本情報
 */

(function ($, cms) {

  var
    elements = {
      'kid'            : '.kid',
      'user_name'      : '.user_name',
      'userkey'        : '.userkey',
      'server'         : '.server',
      'db_pass'        : '.db_pass',
      'postal_cd'      : '.postal_cd',
      'address'        : '.address',
      'affliation'     : '.affliation',
      'owner'          : '.owner',
      'tel'            : '.tel',
      'fax'            : '.fax',
      'client_number'  : '.client_number',
      'system_type'    : '.system_type',
      'version'        : '.version',
      'number_pc'      : '.number_pc',
      'number_id'      : '.number_id',
      'range_id'       : '.range_id',
      'network'        : '.network',
      'univ'           : '.univ',
      'busiv'          : '.busiv',
      'btnMinusPC'     : '.btn-minus-pc',
      'btnPlusPC'      : '.btn-plus-pc',
      'btnMinusClient' : '.btn-minus-account',
      'btnPlusClient'  : '.btn-plus-account',
      'btnEdit'        : '.btn--edit',
      'btnCancel'      : '.btn--cancel',
      'btnSave'        : '.btn--save'
    }
  , baseView
  , _save
  , _cancel
  , _edit
  , _decreaseClient
  , _increaseClient
  , _decreasePC
  , _increasePC
  , _selectNetwork
  , _hiddenItem
  , getViewInfo
  , makeUserInfo
  , reset
  , clear
  , refresh
  , initModule
  ;

  _toggleEditMode = function ( view_property, can_edit ) {
    if ( can_edit ) {
      baseView.get(view_property).find('.item-value').addClass('is-edit');
      baseView.get(view_property).find('.item-value').prop('disabled', false);
    }
    else {
      baseView.get(view_property).find('.item-value').removeClass('is-edit');
      baseView.get(view_property).find('.item-value').prop('disabled', true);
    }
  };

  _hiddenItem = function ( is_busiv ) {
    if ( is_busiv === 1 ) {
      baseView.get('userkey').addClass('is-hidden');
      baseView.get('server').addClass('is-hidden');
      baseView.get('db_pass').addClass('is-hidden');
    }
  };

  _save = function () {
    // update
    customer.model.userBaseInfo.addClient( getViewInfo().client_number );
    customer.model.kids.addFenicsAccount( getViewInfo() );
    customer.model.userBaseInfo.update( getViewInfo('customer'), makeBaseInfo );
    customer.model.kids.update( getViewInfo('system'), makeSystemInfo );

    // 編集不可
    _toggleEditMode( 'user_name' , false );
    _toggleEditMode( 'userkey'   , false );
    _toggleEditMode( 'server'    , false );
    _toggleEditMode( 'db_pass'   , false );
    _toggleEditMode( 'postal_cd' , false );
    _toggleEditMode( 'address'   , false );
    _toggleEditMode( 'affliation', false );
    _toggleEditMode( 'owner'     , false );
    _toggleEditMode( 'tel'       , false );
    _toggleEditMode( 'fax'       , false );
    baseView.get('network').removeClass('is-edit');

    // ボタン状態制御
    baseView.get('btnEdit').removeClass('is-hidden');
    baseView.get('btnCancel').addClass('is-hidden');
    baseView.get('btnSave').addClass('is-hidden');
    baseView.get('btnPlusClient').addClass('is-hidden');
    baseView.get('btnMinusClient').addClass('is-hidden');
    baseView.get('btnPlusPC').addClass('is-hidden');
    baseView.get('btnMinusPC').addClass('is-hidden');


  };

  _cancel = function () {
    // 編集不可
    // _toggleEditMode( 'kid'       , false );
    _toggleEditMode( 'user_name' , false );
    _toggleEditMode( 'userkey'   , false );
    _toggleEditMode( 'server'    , false );
    _toggleEditMode( 'db_pass'   , false );
    _toggleEditMode( 'postal_cd' , false );
    _toggleEditMode( 'address'   , false );
    _toggleEditMode( 'affliation', false );
    _toggleEditMode( 'owner'     , false );
    _toggleEditMode( 'tel'       , false );
    _toggleEditMode( 'fax'       , false );
    baseView.get('network').removeClass('is-edit');

    // ボタン状態制御
    baseView.get('btnEdit').removeClass('is-hidden');
    baseView.get('btnCancel').addClass('is-hidden');
    baseView.get('btnSave').addClass('is-hidden');
    baseView.get('btnPlusClient').addClass('is-hidden');
    baseView.get('btnMinusClient').addClass('is-hidden');
    baseView.get('btnPlusPC').addClass('is-hidden');
    baseView.get('btnMinusPC').addClass('is-hidden');

    // データの初期化
    reset();

  };

  _edit = function () {
    // 編集可
    // _toggleEditMode( 'kid'       , true );
    _toggleEditMode( 'user_name' , true );
    _toggleEditMode( 'userkey'   , true );
    _toggleEditMode( 'server'    , true );
    _toggleEditMode( 'db_pass'   , true );
    _toggleEditMode( 'postal_cd' , true );
    _toggleEditMode( 'address'   , true );
    _toggleEditMode( 'affliation', true );
    _toggleEditMode( 'owner'     , true );
    _toggleEditMode( 'tel'       , true );
    _toggleEditMode( 'fax'       , true );

    // セレクトボックス
    baseView.get('network').addClass('is-edit');

    // ボタン状態制御
    baseView.get('btnEdit').addClass('is-hidden');
    baseView.get('btnCancel').removeClass('is-hidden');
    baseView.get('btnSave').removeClass('is-hidden');
    baseView.get('btnPlusClient').removeClass('is-hidden');
    baseView.get('btnMinusClient').removeClass('is-hidden');
    baseView.get('btnPlusPC').removeClass('is-hidden');
    baseView.get('btnMinusPC').removeClass('is-hidden');

  };

  _increaseClient = function () {
    var now = Number(baseView.get('client_number').find('.item-value').val());
    baseView.get('client_number').find('.item-value').val( now + 1 );
  };

  _decreaseClient = function () {
    var now = Number(baseView.get('client_number').find('.item-value').val());
    if ( now > 0 ) {
      baseView.get('client_number').find('.item-value').val( now - 1 );
    }
  };

  _increasePC = function () {
    var now = Number(baseView.get('number_pc').find('.item-value').val());
    baseView.get('number_pc').find('.item-value').val( now + 1 );
  };

  _decreasePC = function () {
    var now = Number(baseView.get('number_pc').find('.item-value').val());
    if ( now > 0 ) {
      baseView.get('number_pc').find('.item-value').val( now - 1 );
    }
  };


  _selectNetwork = function ( event ) {

    if ( $(event.target).parent('li').hasClass('is-edit') ) {

      var list_class = $( event.target ).attr('class').split(' ');

      switch ( list_class[1] ) {
        case 'busiv' :
          baseView.get('busiv').addClass('choice--on');
          baseView.get('univ').removeClass('choice--on');
          break;
        case 'univ' :
          baseView.get('busiv').removeClass('choice--on');
          baseView.get('univ').addClass('choice--on');
          break;
        default:
          break;
      }

    }

  };

  /**
   * [getViewInfo description]
   * @param  {String} section - 画面のセクション名
   * @return {Object} result  - セクションあるいは画面全体に入力されているデータ
   */
  getViewInfo = function ( section ) {

    var
      result = {}
    , select_network = baseView.get('network').find('.choice--on')
    ;

    result.system = {
      'kid'           : baseView.get('kid'          ).find('.item-value').val(),
      'user_name'     : baseView.get('user_name'    ).find('.item-value').val(),
      'userkey'       : baseView.get('userkey'      ).find('.item-value').val(),
      'server'        : baseView.get('server'       ).find('.item-value').val(),
      'db_password'   : baseView.get('db_pass'      ).find('.item-value').val(),
      'client_number' : Number(baseView.get('client_number').find('.item-value').val() ),
      'number_pc'     : Number(baseView.get('number_pc').find('.item-value').val() )
    };

    // ネットワーク判定
    if ( select_network.length !== 0 ) {
      if ( select_network.attr('class').split(' ')[1] === 'busiv' ) {
        result['system']['is_busiv'] = 1;
      }
      else {
        result['system']['is_busiv'] = 0;
      }
    }

    result.customer = {
      'kid'           : baseView.get('kid'          ).find('.item-value').val(),
      'user_name'     : baseView.get('user_name'    ).find('.item-value').val(),
      'postal_cd'     : Number(baseView.get('postal_cd'    ).find('.item-value').val() ),
      'address'       : baseView.get('address'      ).find('.item-value').val(),
      'affliation'    : baseView.get('affliation'   ).find('.item-value').val(),
      'owner'         : baseView.get('owner'        ).find('.item-value').val(),
      'tel'           : baseView.get('tel'          ).find('.item-value').val(),
      'fax'           : baseView.get('fax'          ).find('.item-value').val(),
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

  makeSystemInfo = function ( data ) {
    // 該当サーバの検索
    var list_option = customer.model.servers.find({
      'version'     : data.version
    });

    // 検索結果をoptionとして追加
    util.addOption( list_option, baseView.get('server').find('select'), true );

    baseView.get('kid'          ).find('.item-value').val(data.kid);
    baseView.get('userkey'      ).find('.item-value').val(data.userkey);
    baseView.get('server'       ).find('.item-value').val(data.server);
    baseView.get('db_pass'      ).find('.item-value').val(data.db_password);
    baseView.get('client_number').find('.item-value').val(data.client_number);
    baseView.get('number_pc'    ).find('.item-value').val(data.number_pc);
    baseView.get('number_id'    ).find('.item-value').val(data.number_id);
    baseView.get('range_id'     ).find('.item-value').val(data.start_id);

    if ( data.system_type === 'onpre' ) {
      baseView.get('system_type').find('.onpre').addClass('choice--on');
      baseView.get('system_type').find('.cloud').removeClass('choice--on');
    }
    else {
      baseView.get('system_type').find('.onpre').removeClass('choice--on');
      baseView.get('system_type').find('.cloud').addClass('choice--on');
    }

    if ( data.version === 'LM' ) {
      baseView.get('version').find('.ES').removeClass('choice--on');
      baseView.get('version').find('.LM').addClass('choice--on');
    }
    else {
      baseView.get('version').find('.ES').addClass('choice--on');
      baseView.get('version').find('.LM').removeClass('choice--on');
    }

    if ( data.is_busiv === 1 ) {
      baseView.get('network').find('.busiv').addClass('choice--on');
      baseView.get('network').find('.univ').removeClass('choice--on');
    }
    else if ( data.is_busiv === 0 ) {
      baseView.get('network').find('.busiv').removeClass('choice--on');
      baseView.get('network').find('.univ').addClass('choice--on');
    }
    else {
      baseView.get('network').find('.busiv').removeClass('choice--on');
      baseView.get('network').find('.univ').removeClass('choice--on');
    }

  };

  makeBaseInfo = function ( data ) {

    if ( _.isArray( data ) ) {
      data = data[0];
    }

    baseView.get('user_name'    ).find('.item-value').val(data.user_name);
    baseView.get('postal_cd'    ).find('.item-value').val(data.postal_cd);
    baseView.get('address'      ).find('.item-value').val(data.address);
    baseView.get('affliation'   ).find('.item-value').val(data.affliation);
    baseView.get('owner'        ).find('.item-value').val(data.owner);
    baseView.get('tel'          ).find('.item-value').val(data.tel);
    baseView.get('fax'          ).find('.item-value').val(data.fax);

  };

  makeUserInfo = function ( data ) {

    makeSystemInfo( data );
    makeBaseInfo( data );

    _hiddenItem( data.is_busiv );

  };

  /**
   * TODO: getCacheのコールバックでしたほうが分離できていい
   * データの初期化
   */
  reset = function () {

    var data = customer.model.userBaseInfo.getCache();

    baseView.get('userkey'      ).find('.item-value').val(data.userkey);
    baseView.get('server'       ).find('.item-value').val(data.server);
    baseView.get('db_pass'      ).find('.item-value').val(data.db_password);
    baseView.get('client_number').find('.item-value').val(data.client_number);
    baseView.get('number_pc'    ).find('.item-value').val(data.number_pc);

    baseView.get('kid'          ).find('.item-value').val(data.kid);
    baseView.get('user_name'    ).find('.item-value').val(data.user_name);
    baseView.get('postal_cd'    ).find('.item-value').val(data.postal_cd);
    baseView.get('address'      ).find('.item-value').val(data.address);
    baseView.get('affliation'   ).find('.item-value').val(data.affliation);
    baseView.get('owner'        ).find('.item-value').val(data.owner);
    baseView.get('tel'          ).find('.item-value').val(data.tel);
    baseView.get('fax'          ).find('.item-value').val(data.fax);

    if ( data.is_busiv === 1 ) {
      baseView.get('network').find('.busiv').addClass('choice--on');
      baseView.get('network').find('.univ').removeClass('choice--on');
    }
    else if ( data.is_busiv === 0 ) {
      baseView.get('network').find('.busiv').removeClass('choice--on');
      baseView.get('network').find('.univ').addClass('choice--on');
    }
    else {
      baseView.get('network').find('.busiv').removeClass('choice--on');
      baseView.get('network').find('.univ').removeClass('choice--on');
    }

  };

  // ボタンの位置をもとに戻す
  clear = function () {
    _cancel();
    baseView.get('userkey').removeClass('is-hidden');
    baseView.get('server').removeClass('is-hidden');
    baseView.get('db_pass').removeClass('is-hidden');

  };

  refresh = function () {
    var kid = cms.model.userBaseInfo.getCache().kid;
    cms.model.userBaseInfo.fetch(kid, makeUserInfo);
  };

  initModule = function () {
    $('#usr-base-panel')
    .append( customer.db.getHtml('template/user.base.html'));

    baseView = new Controller('#usr-base-panel');
    baseView.initElement(elements);

    baseView.addListener({
     'click btnEdit'         : _edit,
     'click btnCancel'       : _cancel,
     'click btnPlusClient'   : _increaseClient,
     'click btnMinusClient'  : _decreaseClient,
     'click btnPlusPC'       : _increasePC,
     'click btnMinusPC'      : _decreasePC,
     'click btnSave'         : _save,
     'click network'         : _selectNetwork
    });

  };

  cms.view.userBaseInfo = {
    initModule   : initModule,
    makeUserInfo : makeUserInfo,
    reset        : reset,
    clear        : clear,
    refresh      : refresh,
    getViewInfo  : getViewInfo,
    get          : function () { return baseView; }
  };


}(jQuery, customer));

