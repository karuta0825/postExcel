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
     'fenics-list' : '.fenics-list'
    }
  // private method
  , _goEditMode
  , _goViewMode
  , _save
  , _cancel
  , _increaseMobile
  , _decreaseMobile
  // public method
  , setInfo
  , getInfo
  , drawTable
  , initModule
  ;


  /**
   * private method
   */

  /**
   * 編集モードへ移行
   */
  _goEditMode = function () {

    // 画面入力制御
    _.each( view.get('input'), function ( v,k ) {
      if ( k !== 'client_number' ) {
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
      if ( k !== 'client_number' ) {
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

  _save = function () {

    // update
    cms.model.userMobile.update( getInfo(), setInfo );

    // 参照モードに戻す
    _goViewMode();

  };

  _cancel = function () {
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

  initModule = function () {

    view = new Controller('#usr-mobile-panel');

    view.wrap.append( customer.db.getHtml('template/user.mobile.html'));

    view.initElement( elements );

    view.addListener({
      'click btn__edit'          : _goEditMode,
      'click btn__cancel'        : _cancel,
      'click btn__save'          : _save,
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