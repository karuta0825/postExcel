

(function ($, cms) {

  var
     uploadData
  , _makeSetUpInfo
  , getUploadData
  , getLineList
  , makeUploadData
  , upload
  ;

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

    map.licenses.UI = map.licenses.UE;
  };

  /**
  * @param  {File}          - fileReader
  * @return {Array<String>} - list_oneline
  */
  getLineList = function ( fileReader ) {
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

  makeUploadData = function ( list_oneline, kid ) {

    var
      id = cms.model.kids.find({'kid' : kid})[0].id
    , version = cms.model.kids.find({'kid':kid})[0].version
    , map_result = {
        'kids'      : { 'id' : id, 'number_pc' : 1 },
        'clients'   : { 'kids_id' : id, 'number' : 1 },
        'customers' : { 'kids_id' : id },
        'licenses'  : { 'kids_id' : id },
        'partners'  : { 'kids_id' : id },
        'mobiles'   : { 'kids_id' : id, 'number' : 1 },
        'busivs'    : { 'kids_id' : id }
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
        throw Error( '存在しないテーブル(' + table + ')があるため失敗しました' );
      }

      if ( table === 'licenses') {
        var item = cms.model.services.find({ 'version' : version, 'sales_id' : field })[0];
        _makeSetUpInfo(item, map_result, val );
      }
      else {
        map_result[table][field] = val.trim();
      }

    });

    uploadData =  map_result;
    uploadData.kid = kid;

    console.log(uploadData);
  }

  upload = function () {

    cms.db.post('/user', {'data': uploadData})
    // クライアント - ユーザー数
    .then( function () {
      // kid , userkey が必要
      return cms.model.userBaseInfo.registerClient({
        kids_id             : uploadData['kids']['id'],
        userkey             : cms.model.kids.find({'kid' : uploadData.kid})[0].userkey,
        number_client_added : uploadData['clients']['number']
      });
    })
    // ネットワーク - クライアント数
    .then( function () {
      if ( uploadData['customers']['has_fenics'] === 1 ) {
        return cms.model.userNetwork.registerFenicsAccount({
          kids_id         : uploadData['kids']['id'],
          fenics_key      : cms.model.kids.find({'kid' : uploadData.kid})[0].fenics_key,
          number_pc_added : uploadData['kids']['number_pc']
        });
      }
    })
    // モバイル数
    .then( function () {
      return cms.model.userMobile.register( uploadData.mobiles );
    })
    // all refresh
    .then( function () {
      cms.view.kids.refresh();
      cms.view.regUsrs.showSuccess();
    })
    .catch( function (err) {
      cms.view.regUsrs.showError(err.message);
    })
    ;


  };

  cms.model.regUsrs = {
    getLineList    : getLineList,
    makeUploadData : makeUploadData,
    upload : upload
  };

}( jQuery, customer ));