/**
 * ユーザー基本情報
 */

(function ($, cms) {

  var
    elements = {
      'kid'        : '.kid',
      'customer'   : '.customer',
      'userkey'    : '.userkey',
      'server'     : '.server',
      'db_pass'    : '.db_pass',
      'account'    : '.account',
      'postal_cd'  : '.postal_cd',
      'address'    : '.address',
      'affliation' : '.affliation',
      'owner'      : '.owner',
      'tel'        : '.tel',
      'fax'        : '.fax',
      'client'     : '.account',
      'btnMinus'   : '.btn-minus-account',
      'btnPlus'    : '.btn-plus-account',
      'btnEdit'    : '.btn--edit',
      'btnCancel'  : '.btn--cancel',
      'btnSave'    : '.btn--save'
    }
  , baseView
  , _onClickCancel
  , _onClickSave
  , _onClickEdit
  , _decreaseClient
  , _increaseClient
  , _toggleEditMode
  , getViewInfo
  , makeUserInfo
  , reset
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

  _onClickCancel = function () {
    // 編集不可
    _toggleEditMode( 'kid'       , false );
    _toggleEditMode( 'customer'  , false );
    _toggleEditMode( 'userkey'   , false );
    _toggleEditMode( 'server'    , false );
    _toggleEditMode( 'db_pass'   , false );
    _toggleEditMode( 'postal_cd' , false );
    _toggleEditMode( 'address'   , false );
    _toggleEditMode( 'affliation', false );
    _toggleEditMode( 'owner'     , false );
    _toggleEditMode( 'tel'       , false );
    _toggleEditMode( 'fax'       , false );

    // ボタン状態制御
    baseView.get('btnEdit').removeClass('is-hidden');
    baseView.get('btnCancel').addClass('is-hidden');
    baseView.get('btnSave').addClass('is-hidden');
    baseView.get('btnPlus').addClass('is-hidden');
    baseView.get('btnMinus').addClass('is-hidden');

  };

  _onClickEdit = function () {
    // 編集可
    _toggleEditMode( 'kid'       , true );
    _toggleEditMode( 'customer'  , true );
    _toggleEditMode( 'userkey'   , true );
    _toggleEditMode( 'server'    , true );
    _toggleEditMode( 'db_pass'   , true );
    _toggleEditMode( 'postal_cd' , true );
    _toggleEditMode( 'address'   , true );
    _toggleEditMode( 'affliation', true );
    _toggleEditMode( 'owner'     , true );
    _toggleEditMode( 'tel'       , true );
    _toggleEditMode( 'fax'       , true );

    // ボタン状態制御
    baseView.get('btnEdit').addClass('is-hidden');
    baseView.get('btnCancel').removeClass('is-hidden');
    baseView.get('btnSave').removeClass('is-hidden');
    baseView.get('btnPlus').removeClass('is-hidden');
    baseView.get('btnMinus').removeClass('is-hidden');

  };

  _increaseClient = function () {
    var now = Number(baseView.get('client').find('.item-value').val());
    baseView.get('client').find('.item-value').val( now + 1 );
  };

  _decreaseClient = function () {
    var now = Number(baseView.get('client').find('.item-value').val());
    if ( now > 0 ) {
      baseView.get('client').find('.item-value').val( now - 1 );
    }
  };

  /**
   * 画面から情報を取得
   */
  getViewInfo = function () {
    return {
      'kid'        : baseView.get('kid'       ).find('.item-value').val(),
      'customer'   : baseView.get('customer'  ).find('.item-value').val(),
      'userkey'    : baseView.get('userkey'   ).find('.item-value').val(),
      'server'     : baseView.get('server'    ).find('.item-value').val(),
      'db_pass'    : baseView.get('db_pass'   ).find('.item-value').val(),
      'client'     : baseView.get('account'   ).find('.item-value').val(),
      'postal_cd'  : baseView.get('postal_cd' ).find('.item-value').val(),
      'address'    : baseView.get('address'   ).find('.item-value').val(),
      'affliation' : baseView.get('affliation').find('.item-value').val(),
      'owner'      : baseView.get('owner'     ).find('.item-value').val(),
      'tel'        : baseView.get('tel'       ).find('.item-value').val(),
      'fax'        : baseView.get('fax'       ).find('.item-value').val()
    }
  };

  makeUserInfo = function ( data ) {
      baseView.get('kid'       ).find('.item-value').val(data);
      baseView.get('customer'  ).find('.item-value').val(data);
      baseView.get('userkey'   ).find('.item-value').val(data);
      baseView.get('server'    ).find('.item-value').val(data);
      baseView.get('db_pass'   ).find('.item-value').val(data);
      baseView.get('account'   ).find('.item-value').val(data);
      baseView.get('postal_cd' ).find('.item-value').val(data);
      baseView.get('address'   ).find('.item-value').val(data);
      baseView.get('affliation').find('.item-value').val(data);
      baseView.get('owner'     ).find('.item-value').val(data);
      baseView.get('tel'       ).find('.item-value').val(data);
      baseView.get('fax'       ).find('.item-value').val(data);
  };

  initModule = function () {
    $('#usr-base-panel')
    .append( customer.db.getHtml('template/user.base.html'));

    baseView = new Controller('#usr-base-panel');
    baseView.initElement(elements);
    baseView.addListener({
     'click btnEdit'   : _onClickEdit,
     'click btnCancel' : _onClickCancel,
     'click btnPlus'   : _increaseClient,
     'click btnMinus'  : _decreaseClient
    });

  };

  cms.view.userbase = {
    initModule : initModule,
    makeUserInfo : makeUserInfo,
    get : function () { return baseView; },
    getViewInfo : getViewInfo
  };


}(jQuery, customer));

