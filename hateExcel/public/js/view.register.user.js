/**
 * viewController
 * 新規ユーザー追加
 */
( function ( $, cms_view ) {

  var
  // member
    registerView
  , elements = {
      'upload' : '.upload',
      'btn' : {
        'upload' : '.btn--upload'
      }
    }
  , _onClickUpload
  , _selectFile
  , _dragOver
  , initModule
  ;

  _onClickUpload = function () {
    console.log('upload');
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

      var
        line_code = r.result.indexOf('\r') === -1 ? '\n' : '\r\n'
      , list_oneline = r.result.split(line_code)
      , map_result = {}
      ;

      // 該当の行のみ抽出
      list_oneline = _.select( list_oneline, function (val, key) {
        if ( val !== '' ) {
          return val;
        }
      });

      // 連想配列作成
      _.each( list_oneline, function (v,k) {
        var delimiter_position, key, val;

        delimiter_position = v.indexOf(':');
        key = v.slice(0,delimiter_position);
        val = v.slice(delimiter_position+1);

        map_result[key] = val;

      });

      console.log(map_result);

      // 入力チェック

      // ボタン状態制御
      registerView.get('btn__upload').prop('disabled', false);

    }

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
    $('.main-contents--reg-usr').append( customer.db.getHtml('register.user.html'));

    registerView = new Controller('.main-contents--reg-usr');
    registerView.initElement( elements );

    registerView.addListener({
      'click btn__upload' : _onClickUpload,
      'dragover upload' : _dragOver,
      'drop upload' : _selectFile
    });

  };

  cms_view.regUsrs = {
    initModule : initModule
  };

}( jQuery, customer.view ));