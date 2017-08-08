/**
 * fenics更新ダイアログ
 */

( function ( $, cms ) {

  var
  // member
    view
  , selectId
  , elements = {
      'btn' : {
        'save'     : '.btn--save',
        'cancel'   : '.btn--cancel',
        'delete'   : '.btn--delete'
      },
      'input' : {
        'fenics_id' : '.fenics_id .input',
        'password'  : '.password .input',
        'fenics_ip' : '.fenics_ip .input',
        'start_on'  : '.start_on .input',
        'end_on'    : '.end_on .input'
      },
      'confirm' : '#confirm-delete-fenics-account2'

    }
  // private method
  , _setViewInfo
  , _showError
  , _save
  , _delete
  // public method
  , open
  , close
  , getViewInfo
  , initModule
  ;

  _showError = function ( list_err_key ) {

    _.each( view.get('input'), function (val, key){
      val.find('.item-value').removeClass('is-error');
    });

    _.each( list_err_key, function ( v,k ) {
      view.get('input__' + v ).addClass('is-error');
    });

    // エラーダイアログの表示
    // view.get('dialog__error').get(0).showModal();

  };

  _setViewInfo = function ( data ) {

    // input type date用にフォーマット
    data['start_on'] = moment(data['start_on']).format('YYYY-MM-DD');
    data['end_on'] = moment(data['end_on']).format('YYYY-MM-DD');

    // 値をセット
    _.each( view.get('input'), function (v,k) {
      v.val( data[k] );
    });

    // 編集対象のIDを設定
    selectId = data.fenics_id;

  };

  /**
   * 保存する
   */
  _save = function () {

    console.log('saved');

    cms.model.userNetwork.update( getViewInfo(), close, _showError );

  };

  /**
   * アカウントの削除
   */
  _delete = function () {
    cms.model.userNetwork.deleteFenics( selectId , close );
  };

  /**
   * 編集画面のデータを消してダイアログを閉じる
   */
  close = function () {

    // エラーの初期化
    _.each( view.get('input'), function (val, key){
      val.removeClass('is-error');
    });

    // 画面データ消去
    _.each( view.get('input'), function (v,k) {
      v.val('');
    });

    view.wrap.get(0).close();

  };


  /**
   * ダイアログを開いて値を入れる
   */
  open = function ( data ) {

    // 値を画面にセット
    if ( data && _.isObject(data) ) {
      _setViewInfo( data );
    }

    // モーダル表示
    view.wrap.get(0).showModal();

  };

  /**
   * 編集画面から値を取得する
   */
  getViewInfo = function () {

    var result = {};

    _.each( view.get('input'), function (v,k) {
      result[k] = v.val();
    });

    return result;

  };

  initModule = function ( ) {

    view = new Controller('#dialog-edit-fenics');

    util.confirm({
      selector : view.top,
      id       : 'confirm-delete-fenics-account2',
      msg      : '選択したユーザを削除しますか？',
      yes      : _delete
    });

    view.initElement(elements);

    view.addListener({
      'click btn__save'   : _save,
      'click btn__cancel' : close,
      'click btn__delete' : function() { view.get('confirm').get(0).showModal(); }
    });

  };

  cms.view.dialogFenics = {
    initModule : initModule,
    open        : open,
    close       : close,
    getViewInfo : getViewInfo
  };

}( jQuery, customer ));