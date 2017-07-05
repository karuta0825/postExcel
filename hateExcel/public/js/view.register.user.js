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
      'alert' : '#modal-alert-register'
    }
  , uploadData
  , _onClickUpload
  , _selectFile
  , _dragOver
  , _upload
  , _makeUploadData
  , _makeSetUpInfo
  , _getLineList
  , initModule
  ;

  _onClickUpload = function () {
    console.log('upload');
    // upload処理
    _upload( uploadData );
  };

  _getLineList = function ( fileReader ) {

    var
      line_code = fileReader.result.indexOf('\r') === -1 ? '\n' : '\r\n'
    , list_oneline = fileReader.result.split(line_code)
    ;

    list_oneline = _.select( list_oneline, function (val, key) {
      if ( val !== '' && val.indexOf('#') !== 0 ) {
        return val;
      }
    });

    return list_oneline;

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
      list_oneline = _getLineList(r);

      // 1行目はKID
      kid = list_oneline.shift();

      // 入力チェック
      if ( cms.model.kids.find({'kid' : kid}).length === 0 )  {
        registerView.get('alert').get(0).showModal();
        return false;
      }

      // if ( cms.model.kids.find({'kid' : kid})[0].is_registered === 1 ) {
      //   registerView.get('alert')
      //     .find('.mdl-dialog__content')
      //     .text('二度目の登録はできません')
      //   registerView.get('alert').get(0).showModal();
      //   return false;
      // }

      // データ作成
      uploadData = _makeUploadData( list_oneline, kid );

      // check
      console.log(uploadData);

      // ボタン状態制御
      registerView.get('btn__upload').prop('disabled', false);

    };

  };

  _makeUploadData = function ( list_oneline, kid ) {

      var
        version = cms.model.kids.find({'kid':kid})[0].version
      , map_result = {
          'kids'     : { 'pc_number' : 0 },
          'clients'  : {},
          'licenses' : {},
          'partners' : {},
          'mobiles'  : {}
        }
      , delimiter_position
      , key
      , val
      , table
      , field
      ;

    // データ作成
    _.each( list_oneline, function (v,k) {

      delimiter_position = v.indexOf(':');
      key = v.slice(0,delimiter_position);
      val = v.slice(delimiter_position+1);

      table = key.split('__')[0];
      field = key.split('__')[1].trim();

      if ( !map_result.hasOwnProperty(table) ){
        map_result[table] = { 'kid' : kid };
      }

      if ( table === 'licenses') {
        var item = cms.model.services.find({ 'version' : version, 'sales_id' : field })[0];
        _makeSetUpInfo(item, map_result, val);
      }
      else {
        map_result[table][field] = val.trim();
      }

    });

    return map_result;

  };

  _makeSetUpInfo = function ( item, map, value ) {

    value =  ( value === '' ) ? 0 : Number( value.trim() );

    // ライセンス情報のとき
    if ( item['is_setup_info'] !== 1  ) {
      map['licenses'][item.service_id] = value;
    }
    // セットアップ情報のとき
    else {

      // ネットワーク
      if ( item.service_id === 'has_busiv' ) {
        map['customers']['has_busiv'] = ( value === 1 ) ? 1 : 0;
        map['customers']['has_fenics'] = ( value === 1 ) ? 0 : 1;
      }

      // モバイル使用
      if ( item.service_id === 'has_sd' ) {
        map['licenses']['K1'] = 1;
        map['customers']['has_mobile'] = value;
      }

      // 追加1クライアント数
      if ( item.service_id === 'add_one_cli' ) {
        map['kids']['pc_number'] += Number(value);
      }

      // 追加10クライアント数
      if ( item.service_id === 'add_ten_cli' ) {
        map['kids']['pc_number'] += 10 * Number(value);
      }

      // 追加20クライアント数
      if ( item.service_id === 'add_twe_cli' ) {
        map['kids']['pc_number'] += 20 * Number(value);
      }

      // 追加ユーザー
      if ( item.service_id === 'add_one_usr' ) {
        map['clients']['number'] = value;
      }

      if ( item.service_id === 'add_sd' ) {
        map['mobiles']['number'] = value;
      }


    }

  };

  _dragOver = function ( evt ) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  };

  _upload = function ( upload_data ) {

    cms.model.kids.register({
      kid : kid,
      register_on : moment().format('YYYY-MM-DD'),
      is_registered : 1 },
      function (o) {
        console.log('kids');
        console.log(o);
    });

    // 基本情報
    cms.model.userCustomer.register( upload_data.customers, function (o) {
      console.log('customer');
      console.log(o);
    });

    // サービス
    customer.model.userLicense.register( upload_data.licenses, function (o) {
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