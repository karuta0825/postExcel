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
    // upload処理
    _upload( uploadData );
    // ボタン非活性
    registerView.get('btn__upload').prop('disabled', true);

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

      if ( cms.model.kids.find({'kid' : kid})[0].is_registered === 1 ) {
        registerView.get('alert')
          .find('.mdl-dialog__content')
          .text('二度目の登録はできません')
        registerView.get('alert').get(0).showModal();
        return false;
      }

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
          'kids'      : { 'kid' : kid, 'number_pc' : 1 },
          'clients'   : { 'kid' : kid, 'number' : 1 },
          'customers' : { 'kid' : kid },
          'licenses'  : { 'kid' : kid },
          'partners'  : { 'kid' : kid },
          'mobiles'   : { 'kid' : kid, 'number' : 1 }
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
        map['kids']['number_pc'] += Number(value);
      }

      // 追加10クライアント数
      if ( item.service_id === 'add_ten_cli' ) {
        map['kids']['number_pc'] += 10 * Number(value);
      }

      // 追加20クライアント数
      if ( item.service_id === 'add_twe_cli' ) {
        map['kids']['number_pc'] += 20 * Number(value);
      }

      // 追加ユーザー
      if ( item.service_id === 'add_one_usr' ) {
        map['clients']['number'] += value;
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

    // kids -端末数
    cms.model.kids.register({
      kid                      : kid,
      user_name                : uploadData['kids']['user_name'],
      kana                     : uploadData['kids']['kana'],
      number_pc                : uploadData['kids']['number_pc'],
      has_qa                   : ( uploadData['kids']['has_qa']                   === '1') ? '1' : '0',
      is_new_contract          : ( uploadData['kids']['is_new_contract']          === '1') ? '1' : '0',
      is_replaced_from_cj      : ( uploadData['kids']['is_replaced_from_cj']      === '1') ? '1' : '0',
      is_replaced_from_wc      : ( uploadData['kids']['is_replaced_from_wc']      === '1') ? '1' : '0',
      is_replaced_from_another : ( uploadData['kids']['is_replaced_from_another'] === '1') ? '1' : '0',
      register_on              : moment().format('YYYY-MM-DD'),
      is_registered            : 1
    })
    // customers
    .then( function () {
      return cms.model.userCustomer.register( upload_data.customers );

    })
    // licenses
    .then( function () {
      return customer.model.userLicense.register( upload_data.licenses );
    })
    // partners
    .then( function () {
      return cms.model.userPartner.register( upload_data.partners );

    })
    // mobiles
    .then( function () {
      //
    })
    // クライアント - ユーザー数
    .then( function () {
      // kid , userkey が必要
      return cms.model.userBaseInfo.registerClient({
        kid                 : kid,
        userkey             : cms.model.kids.find({'kid' : kid})[0].userkey,
        number_client_added : upload_data['clients']['number']
      });

    })
    // ネットワーク - クライアント数
    .then( function () {
      if ( uploadData['customers']['has_fenics'] === 1 ) {
        return cms.model.userNetwork.registerFenicsAccount({
          kid             : kid,
          fenics_key      : cms.model.kids.find({'kid' : kid})[0].fenics_key,
          number_pc_added : upload_data['kids']['number_pc']
        });
      }
    })
    // all refresh
    .then( function () {
      cms.view.kids.refresh();
      registerView.get('finish').get(0).showModal();
    })
    .fail( function (err) {
      throw err.responseJSON;
    })
    ;

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
    initModule : initModule
  };

}( jQuery, customer ));