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
        }
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
          'userkey'        : '.userkey',
          'server'         : '.server',
          'db_password'    : '.db_pass',
          'client_number'  : '.client_number',
          'number_pc'      : '.number_pc',
          'number_id'      : '.number_id',
          'start_id'       : '.start_id'
        },
        'choice' : {
          'univ'           : '.univ',
          'busiv'          : '.busiv',
        },
        'environment' : {
          'system_type'    : '.system_type',
          'version'        : '.version',
          'network'        : '.network',
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
  , baseView
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
  , _hiddenItem
  , _goViewMode
  , getViewInfo
  , makeUserInfo
  , makeSystemInfo
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

  _hiddenItem = function ( is_onpre ) {
    if ( is_onpre === 'onpre' ) {
      baseView.get('input__userkey').addClass('is-hidden');
      baseView.get('input__server').addClass('is-hidden');
      baseView.get('input__db_password').addClass('is-hidden');
    }
  };

  _goViewMode = function () {
    // 編集不可
    _.each( baseView.get('input'), function ( v,k ) {
      _toggleEditMode('input__' +k , false);
    });

    baseView.get('environment__network').removeClass('is-edit');

    _.each( baseView.get('btn'), function (v,k) {
      baseView.get('btn__' + k).addClass('is-hidden');
    });

    // ボタン状態制御
    commonView.get('btn__edit').removeClass('is-hidden');
    commonView.get('btn__cancel').addClass('is-hidden');
    commonView.get('btn__save').addClass('is-hidden');

  };

  _save = function () {
    // update
    customer.model.kids.addFenicsAccount( getViewInfo() );
    customer.model.userBaseInfo.addClient( getViewInfo().client_number );
    customer.model.userBaseInfo.update( getViewInfo('customer'), makeBaseInfo );
    customer.model.kids.update( getViewInfo('system'), makeSystemInfo );

    // 編集不可
    _.each( baseView.get('input'), function ( v,k ) {
      _toggleEditMode('input__' +k , true );
    });

    baseView.get('environment__network').removeClass('is-edit');

    _.each( baseView.get('btn'), function (v,k) {
      baseView.get('btn__' + k).removeClass('is-hidden');
    });

    // ボタン状態制御
    commonView.get('btn__edit').removeClass('is-hidden');
    commonView.get('btn__cancel').addClass('is-hidden');
    commonView.get('btn__save').addClass('is-hidden');

  };

  _cancel = function () {

    _goViewMode();

    // データの初期化
    reset();

  };

  _edit = function () {

    // 編集可
    _.each( baseView.get('input'), function ( v,k ) {
      _toggleEditMode('input__' + k , true );
    });

    // セレクトボックス
    baseView.get('environment__network').addClass('is-edit');

    // ボタン状態制御
    _.each( baseView.get('btn'), function (v,k) {
      baseView.get('btn__' + k).removeClass('is-hidden');
    });

    // ボタン状態制御
    commonView.get('btn__edit').addClass('is-hidden');
    commonView.get('btn__cancel').removeClass('is-hidden');
    commonView.get('btn__save').removeClass('is-hidden');

  };

  _increaseClient = function () {
    var now = Number(baseView.get('input__client_number').find('.item-value').val());
    baseView.get('input__client_number').find('.item-value').val( now + 1 );
  };

  _decreaseClient = function () {
    var now = Number(baseView.get('input__client_number').find('.item-value').val());
    if ( now > 0 ) {
      baseView.get('input__client_number').find('.item-value').val( now - 1 );
    }
  };

  _increasePC = function () {
    var now = Number(baseView.get('input__number_pc').find('.item-value').val());
    baseView.get('input__number_pc').find('.item-value').val( now + 1 );
  };

  _decreasePC = function () {
    var now = Number(baseView.get('input__number_pc').find('.item-value').val());
    if ( now > 0 ) {
      baseView.get('input__number_pc').find('.item-value').val( now - 1 );
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
    , select_network = baseView.get('environment__network').find('.choice--on')
    ;

    result.system = {
      'kid'           : baseView.get('kid'                        ).find('.item-value').val(),
      'user_name'     : baseView.get('input__user_name'           ).find('.item-value').val(),
      'userkey'       : baseView.get('input__userkey'             ).find('.item-value').val(),
      'server'        : baseView.get('input__server'              ).find('.item-value').val(),
      'db_password'   : baseView.get('input__db_password'         ).find('.item-value').val(),
      'client_number' : Number(baseView.get('input__client_number').find('.item-value').val() ),
      'number_pc'     : Number(baseView.get('input__number_pc'    ).find('.item-value').val() ),
      'number_id'     : Number(baseView.get('input__number_id'    ).find('.item-value').val() ),
      'start_id'      : Number(baseView.get('input__start_id'     ).find('.item-value').val() )
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
      // 'user_name'     : customerView.get('input__user_name' ).find('.item-value').val(),
      'postal_cd'     : customerView.get('input__postal_cd' ).find('.item-value').val(),
      'address'       : customerView.get('input__address'   ).find('.item-value').val(),
      'affliation'    : customerView.get('input__affliation').find('.item-value').val(),
      'owner'         : customerView.get('input__owner'     ).find('.item-value').val(),
      'tel'           : customerView.get('input__tel'       ).find('.item-value').val(),
      'fax'           : customerView.get('input__fax'       ).find('.item-value').val(),
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
    util.addOption( list_option, baseView.get('input__server').find('select'), true );


    if ( data.system_type === 'onpre' ) {
      baseView.get('environment__system_type').find('.onpre').addClass('choice--on');
      baseView.get('environment__system_type').find('.cloud').removeClass('choice--on');
    }
    else {
      baseView.get('environment__system_type').find('.onpre').removeClass('choice--on');
      baseView.get('environment__system_type').find('.cloud').addClass('choice--on');
    }

    if ( data.version === 'LM' ) {
      baseView.get('environment__version').find('.ES').removeClass('choice--on');
      baseView.get('environment__version').find('.LM').addClass('choice--on');
    }
    else {
      baseView.get('environment__version').find('.ES').addClass('choice--on');
      baseView.get('environment__version').find('.LM').removeClass('choice--on');
    }

    if ( data.is_busiv === 1 ) {
      baseView.get('environment__network').find('.busiv').addClass('choice--on');
      baseView.get('environment__network').find('.univ').removeClass('choice--on');
    }
    else if ( data.is_busiv === 0 ) {
      baseView.get('environment__network').find('.busiv').removeClass('choice--on');
      baseView.get('environment__network').find('.univ').addClass('choice--on');
    }
    else {
      baseView.get('environment__network').find('.busiv').removeClass('choice--on');
      baseView.get('environment__network').find('.univ').removeClass('choice--on');
    }

  };

  makeBaseInfo = function ( data ) {

    if ( _.isArray( data ) ) {
      data = data[0];
    }

    baseView.get('kid').find('.item-value').val(data['kid']);

    _.each( baseView.get('input'), function (v,k) {
      v.find('.item-value').val(data[k]);
    });

    _.each( customerView.get('input'), function (v,k) {
      v.find('.item-value').val(data[k]);
    });

  };

  makeUserInfo = function ( data ) {

    makeSystemInfo( data );
    makeBaseInfo( data );

    _hiddenItem( data.system_type );

  };

  /**
   * TODO: getCacheのコールバックでしたほうが分離できていい
   * データの初期化
   */
  reset = function () {

    var data = customer.model.userBaseInfo.getCache();

    baseView.get('kid').find('.item-value').val(data.kid);

    _.each( baseView.get('input'), function (v,k) {
      v.find('.item-value').val(data[k])
    });

    _.each( customerView.get('input'), function (v,k) {
      v.find('.item-value').val(data[k])
    });

    if ( data.is_busiv === 1 ) {
      baseView.get('environment__network').find('.busiv').addClass('choice--on');
      baseView.get('environment__network').find('.univ').removeClass('choice--on');
    }
    else if ( data.is_busiv === 0 ) {
      baseView.get('environment__network').find('.busiv').removeClass('choice--on');
      baseView.get('environment__network').find('.univ').addClass('choice--on');
    }
    else {
      baseView.get('environment__network').find('.busiv').removeClass('choice--on');
      baseView.get('environment__network').find('.univ').removeClass('choice--on');
    }

  };

  // ボタンの位置をもとに戻す
  clear = function () {

    // 参照モードに
    _goViewMode();

    baseView.get('input__userkey').removeClass('is-hidden');
    baseView.get('input__server').removeClass('is-hidden');
    baseView.get('input__db_password').removeClass('is-hidden');

    _.each( baseView.get('input'), function (v,k) {
      v.find('.item-value').val('');
    });

    _.each( customerView.get('input'), function (v,k) {
      v.find('.item-value').val('');
    });

  };

  refresh = function () {
    var kid = cms.model.userBaseInfo.getCache().kid;
    cms.model.userBaseInfo.fetch(kid, makeUserInfo);
  };

  initModule = function () {
    $('#usr-base-panel')
    .append( customer.db.getHtml('template/user.base.html'));

    commonView = new Controller('#usr-base-panel');
    baseView = new Controller('#usr-base-panel');
    customerView = new Controller('#usr-base-panel');

    commonView.initElement(elements.common);
    baseView.initElement(elements.base);
    customerView.initElement(elements.customer);

    commonView.addListener({
     'click btn__edit'         : _edit,
     'click btn__cancel'       : _cancel,
     'click btn__save'         : _save,
    });

    baseView.addListener({
     'click btn__plusClient'   : _increaseClient,
     'click btn__minusClient'  : _decreaseClient,
     'click btn__plusPC'       : _increasePC,
     'click btn__minusPC'      : _decreasePC,
     'click environment__network' : _selectNetwork
    });

  };

  cms.view.userBaseInfo = {
    initModule   : initModule,
    makeUserInfo : makeUserInfo,
    reset        : reset,
    clear        : clear,
    refresh      : refresh,
    getViewInfo  : getViewInfo,
  };


}(jQuery, customer));

