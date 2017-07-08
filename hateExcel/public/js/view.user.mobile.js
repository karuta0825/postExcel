/**
 * モバイル情報
 */

( function ( $, cms ) {

  var
  // member
    view
  , elements = {
     'btn' : {
        'cancel'   : '.btn--cancel',
        'delete'   : '.btn--del',
        'save'     : '.btn--save',
        'edit'     : '.btn--edit',
        'download' : '.btn--download'
     },
     'deivice_btn' : {
        'minus'     : '.btn-minus-mobile',
        'plus'      : '.btn-plus-mobile',
     },
     'input' : {
        'fenics_key'    : '.fenics_key',
        'client_number' : '.client_number',
        'admin_id'      : '.admin_id',
        'admin_pw'      : '.admin_pw',
        'city_cd'       : '.city_cd',
        'office_cd'     : '.office_cd'
     },
     'fenics-list' : '.fenics-list',
     'dialog' : {
      'delete' : '#confirm-delete-mobile-fenics-accounts',
      'error'  : '#modal-mobile-save-alert'
     }
    }
  // private method
  , _validate
  , _goEditMode
  , _goViewMode
  , _getSelectItem
  , _save
  , _cancel
  , _delete
  , _increaseMobile
  , _decreaseMobile
  // public method
  , setInfo
  , getInfo
  , drawTable
  , refresh
  , initModule
  ;

  /**
   * private method
   */

  _validate = function ( list_key ) {

    _.each( view.get('input'), function (val, key){
      val.find('.item-value').removeClass('is-error');
    });

    if ( list_key.length !== 0 ) {

      _.each( list_key, function ( v,k ) {
        view.get('input__' + v )
          .find('.item-value')
          .addClass('is-error');
      });

      view.get('dialog__error').get(0).showModal();

      return true;

    }

    return false;

  };

  /**
   * 編集モードへ移行
   */
  _goEditMode = function () {

    // 画面入力制御
    _.each( view.get('input'), function ( v,k ) {
      if ( k !== 'client_number' &&  k !== 'fenics_key' ) {
        v.find('.item-value').addClass('is-edit');
        v.find('.item-value').prop('disabled', false);
      }
    });

    _.each( view.get('deivice_btn'), function (v,k) {
      v.removeClass('is-hidden');
    });

    // ボタンの画面制御
    view.get('btn__edit').addClass('is-hidden');
    view.get('btn__download').addClass('is-hidden');
    view.get('btn__cancel').removeClass('is-hidden');
    view.get('btn__delete').removeClass('is-hidden');
    view.get('btn__save').removeClass('is-hidden');

  };

  /**
   * 参照モードへ移行
   */
  _goViewMode = function () {

    // 画面入力制御
    _.each( view.get('input'), function ( v,k ) {
      if ( k !== 'client_number' ||  k !== 'fenics_key' ) {
        v.find('.item-value').removeClass('is-edit');
        v.find('.item-value').prop('disabled', true);
      }
    });

    _.each( view.get('deivice_btn'), function (v,k) {
      v.addClass('is-hidden');
    });

    // ボタンの画面制御
    view.get('btn__edit').removeClass('is-hidden');
    view.get('btn__download').removeClass('is-hidden');
    view.get('btn__cancel').addClass('is-hidden');
    view.get('btn__delete').addClass('is-hidden');
    view.get('btn__save').addClass('is-hidden');

  };

  // 画面のデータを取得
  getInfo = function () {

    var result = {};

    _.each( view.get('input'), function (v,k) {
      result[k] = v.find('.item-value').val();
    });

    result['client_number'] = Number( result['client_number'] );

    return result;

  };

  /**
   * チェックされたユーザを取得する
   */
  _getSelectItem = function () {

    var ids = _.map( $('.is-selected', view.top ), function (val,key){
      return { 'fenics_id' : $(val).attr('id') } ;
    });

    if ( ids.length === 0 ) {
      alert('選択されていません');
      return [];
    }

    return ids;

  };



  _save = function () {

    var errors = cms.model.userMobile.validate( getInfo() );

    if ( _validate(errors) ) {
      return;
    }

    // update
    var promise = cms.model.userMobile.addMobile( getInfo().client_number );

    cms.model.userMobile.update( getInfo(), setInfo );

    // モバイル追加があったとき
    if ( promise ) {
      promise.then( function () {
        cms.model.userNetwork.find( {is_mobile : 1}, drawTable );
      });
    }

    // 参照モードに戻す
    _goViewMode();

  };

  _delete = function () {

    var
      list_accounts           = _getSelectItem()
    , kid                     = cms.model.userBaseInfo.getCache().kid
    , number_accounts_now     = cms.model.userMobile.getCache()[0].client_number
    , number_deleted_accounts
    , diff
    ;

    if ( list_accounts && list_accounts.length > 0 ) {

      number_deleted_accounts = list_accounts.length

      // 差分がマイナスになる場合、0にする
      diff = number_accounts_now - list_accounts.length;

      diff = ( diff < 0 ) ? 0 : diff;

      // 端末削除
      cms.model.userNetwork.delete( list_accounts, function () {

        // 端末台数の変更
        cms.model.userMobile.update({
            'kid'           : kid,
            'client_number' : diff
          }, function () {
            refresh();
        });

      });

      _goViewMode();

    }


  };

  _cancel = function () {

    // エラー色を消す
    _.each( view.get('input'), function (val, key){
      val.find('.item-value').removeClass('is-error');
    });

    cms.model.userMobile.getCache(setInfo);

    _goViewMode();

  };

  _increaseMobile = function () {
    var now = Number(view.get('input__client_number').find('.item-value').val());
    view.get('input__client_number').find('.item-value').val( now + 1 );
  };

  _decreaseMobile = function () {
    var now = Number(view.get('input__client_number').find('.item-value').val());
    if ( now > 0 ) {
      view.get('input__client_number').find('.item-value').val( now - 1 );
    }
  };

  /**
   * public method
   */

  drawTable = function ( data ) {

    var
      data     = { list : data }
    , tmpl     = customer.db.getHtml('template/mobile.fenics.list.html')
    , complied = _.template( tmpl )
    ;

    // 空にして
    view.get('fenics-list').empty();

    // 詰めて
    view.get('fenics-list').append( complied(data) );

    // MDL表示用に更新
    componentHandler.upgradeElement( view.get('fenics-list').find('table').get(0) );

  };

  // 画面にデータを入れる
  setInfo = function ( data ) {

    data  = _.isArray(data) ? data[0] : data;

    if ( !data ) {
      throw Error("モバイルテーブルにこのKIDが存在しません");
    }

    _.each( view.get('input'), function (v,k) {
      v.find('.item-value').val( data[k] );
    });

  };

  refresh = function () {

    if ( cms.model.userNetwork.getCache().length > 0 ) {

      var kid = cms.model.userBaseInfo.getCache().kid;

      cms.model.userNetwork.fetch(kid);
      cms.model.userMobile.fetch( kid, setInfo );

      cms.model.userNetwork.find({is_mobile : 1}, drawTable);

    }


  };

  initModule = function () {

    view = new Controller('#usr-mobile-panel');

    view.wrap.append( customer.db.getHtml('template/user.mobile.html'));

    util.alert({
      selector : view.top,
      id       : 'modal-mobile-save-alert',
      msg      : '入力に誤りがあります'
    });

    util.confirm({
      selector : view.top,
      id       : 'confirm-delete-mobile-fenics-accounts',
      msg      : '選択したユーザを削除しますか？',
      yes      : _delete
    });

    view.initElement( elements );

    view.addListener({
      'click btn__edit'          : _goEditMode,
      'click btn__cancel'        : _cancel,
      'click btn__save'          : _save,
      'click btn__delete'        : function () { view.get('dialog__delete').get(0).showModal()},
      'click deivice_btn__plus'  : _increaseMobile,
      'click deivice_btn__minus' : _decreaseMobile
    });

  };

  // to public
  cms.view.userMobile = {
    initModule : initModule,
    setInfo : setInfo,
    getInfo : getInfo,
    drawTable : drawTable
  };

} ( jQuery, customer ));