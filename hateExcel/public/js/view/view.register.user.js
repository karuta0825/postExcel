/**
 * viewController
 * 新規ユーザー追加
 */
( function ( $, cms ) {

  var
  // member
    registerView
  , kid
  , elements = {
      'upload' : '.upload',
      'btn' : {
        'upload' : '.btn--upload'
      },
      'alert'  : '#modal-alert-register',
      'finish' : '#modal-finish-register'
    }
  , _onClickUpload
  , _selectFile
  , _dragOver
  , _alertDialog
  , initModule
  ;

  _alertDialog = function ( text ) {

    msg = ( text ) ? text : '入力に誤りがあります';

    registerView.get('alert')
      .find('.mdl-dialog__content')
      .text(msg)
      ;

    registerView.get('alert').get(0).showModal();

  };

  _onClickUpload = function () {
    // upload処理
    cms.model.regUsrs.upload();
    // ボタン非活性
    registerView.get('btn__upload').prop('disabled', true);

  };

  _selectFile = function ( evt )  {

    evt.stopPropagation();
    evt.preventDefault();

    var
      files = evt.dataTransfer.files
    , r = new FileReader()
    ;

    r.readAsText(files[0]);

    r.onload = function ( e ) {

      // １行分の情報を取得
      list_oneline = cms.model.regUsrs.getLineList(r);

      // 1行目はKID
      kid = list_oneline.shift();

      // 存在しないKIDは登録できない
      if ( cms.model.kids.find({'kid' : kid}).length === 0 )  {
        _alertDialog('KIDが存在しません。作成してください')
        return false;
      }

      // 上書き登録はできない
      if ( cms.model.kids.find({'kid' : kid})[0].is_registered === 1 ) {
        _alertDialog('二度目の登録はできません');
        return false;
      }

      // データ作成
      try {
        cms.model.regUsrs.makeUploadData( list_oneline, kid );
      } catch (e) {
        _alertDialog( e.msg );
        return;
      }

      // ボタン状態制御
      registerView.get('btn__upload').prop('disabled', false);

    };

  };

  _dragOver = function ( evt ) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  };


  initModule = function () {

    // デフォルトイベントを抑止
    $.event.props.push('dataTransfer');

    // コンテンツの挿入
    $('.main-contents--reg-usr').append( customer.db.getHtml('html/register.user.html'));

    registerView = new Controller('.main-contents--reg-usr');

    // 登録前入力違反ダイアログ
    util.alert({
      selector : registerView.top,
      id       : 'modal-alert-register',
      msg      : 'KIDが存在しないため登録できません'
    });

    // 登録後ダイアログ
    util.alert({
      selector : registerView.top,
      id       : 'modal-finish-register',
      msg      : '登録完了しました'
    });

    registerView.initElement( elements );

    registerView.addListener({
      'click btn__upload' : _onClickUpload,
      'dragover upload' : _dragOver,
      'drop upload' : _selectFile
    });

  };

  cms.view.regUsrs = {
    initModule : initModule,
    showError : _alertDialog,
    showSuccess : function () { registerView.get('finish').get(0).showModal(); }
  };

}( jQuery, customer ));