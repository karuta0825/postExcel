/**
 * fenics更新ダイアログ
 */

( function ( $, cms ) {

  var
    view
  , elements = {
      'btn' : {
        'save'     : '.btn--save',
        'cancel'   : '.btn--cancel'
      },
      'input' : {
        'fenics_id' : '.fenics_id .input',
        'password'  : '.password .input',
        'fenics_ip' : '.fenics_ip .input',
        'start_on'  : '.start_on .input',
        'end_on'    : '.end_on .input'
      }
    }
  , _setViewInfo
  , _showError
  , _save
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

  };

  /**
   * 保存する
   */
  _save = function () {

    console.log('saved');

    cms.model.userNetwork.update2( getViewInfo(), close, _showError );

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

    view.initElement(elements);

    view.addListener({
      'click btn__save'   : _save,
      'click btn__cancel' : close
    });

  };

  cms.view.dialogFenics = {
    initModule : initModule,
    open        : open,
    close       : close,
    getViewInfo : getViewInfo
  };

}( jQuery, customer ));