/**
 * viewController
 * 新規ユーザー追加
 */
( function ( $, cms ) {

  var
  // member
    registerView
  , elements = {
      'upload' : '.upload',
      'btn' : {
        'upload' : '.btn--upload'
      },
      'alert' : '#modal-alert-register'
    }
  , uploadData
  , _onClickUpload
  , _selectFile
  , _dragOver
  , _upload
  , initModule
  ;

  _onClickUpload = function () {
    console.log('upload');
    // upload処理
    _upload( uploadData );
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
      , kid
      , version
      , error
      ;

      // 該当の行のみ抽出
      list_oneline = _.select( list_oneline, function (val, key) {
        if ( val !== '' && val.indexOf('#') !== 0 ) {
          return val;
        }
      });

      kid = list_oneline.shift();

      // 入力チェック
      if ( cms.model.kids.find({'kid' : kid}).length === 0 )  {
        // 入力エラー
        registerView.get('alert').get(0).showModal();
        return false;
      }

      version = cms.model.kids.find({'kid':kid})[0].version;

      // 連想配列作成
      _.each( list_oneline, function (v,k) {
        var
          delimiter_position
        , key
        , val
        , table
        , field
        ;

        delimiter_position = v.indexOf(':');
        key = v.slice(0,delimiter_position);
        val = v.slice(delimiter_position+1);

        table = key.split('__')[0];
        field = key.split('__')[1];

        if ( !map_result.hasOwnProperty(table) ){
          map_result[table] = {};
        }

        if ( table === 'licenses') {
          field = cms.model.services.find({ 'version' : version, 'sales_id' : field })[0].service_id;
        }

        map_result[table][field] = val;

      });



      console.log(map_result);

      // 格納
      uploadData = map_result;

      // ボタン状態制御
      registerView.get('btn__upload').prop('disabled', false);

    }

  };

  _dragOver = function ( evt ) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  };

  _upload = function ( upload_data ) {

    // 更新するKID情報をどこから取得するか？
    // 選択させよう！

    // 基本情報
    cms.model.userBaseInfo.register( upload_data.customers, function (o) {
      console.log('customer');
      console.log(o);
    });

    // サービス
    customer.model.services.register( upload_data.licenses, function (o) {
      console.log('license');
      console.log(o);
    } );

    // クライアント
    // customer.model.initUpdate( upload_data.client );

    // ネットワーク
    // customer.model.initUpdate( upload_data.network );

    // パートナー
    cms.model.userPartner.register( uploadData.partners, function (o) {
      console.log('partner');
      console.log(o);
    } );

  };


  initModule = function () {

    // デフォルトイベントを抑止
    $.event.props.push('dataTransfer');

    // コンテンツの挿入
    $('.main-contents--reg-usr').append( customer.db.getHtml('register.user.html'));

    registerView = new Controller('.main-contents--reg-usr');

    util.alert({
      selector : registerView.top,
      id       : 'modal-alert-register',
      msg      : 'KIDが存在しないため登録できません'
    });

    registerView.initElement( elements );

    registerView.addListener({
      'click btn__upload' : _onClickUpload,
      'dragover upload' : _dragOver,
      'drop upload' : _selectFile
    });

  };

  cms.view.regUsrs = {
    initModule : initModule
  };

}( jQuery, customer ));