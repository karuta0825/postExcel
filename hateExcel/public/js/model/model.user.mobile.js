/**
 * モバイル情報
 */

(function ( $, cms ) {

  var
    config = {
      table : 'mobiles',
      tab_name : 'モバイル',
      item_name_map : {
        'fenics_key'    : 'FENICSキー',
        'client_number' : 'モバイル台数',
        'admin_id'      : '管理者ID',
        'admin_pw'      : '管理者パスワード',
        'city_cd'       : '市町村コード',
        'office_cd'     : '事業者コード',
        'disk_name'    : '追加ディスク名',
        'disk_size'    : 'ディスク容量'
      }
    }
  , _model = new Model(config)
  , vl = new util.Validate({
      'fenics_key'    : 'isAlphaNum',
      'client_number' : 'isNatural',
      'admin_id'      : 'isAlphaNum',
      'admin_pw'      : 'isAlphaNum',
      'city_cd'       : 'isId',
      'office_cd'     : 'isId',
      'disk_name'     : 'isConmmaAlpa',
      'disk_size'     : 'isConmmaOverZero'
    })
  // private
  , _isUniqueFenicsKey
  // public method
  , update
  , validate
  , addMobile
  , register
  ;


  /**
   * fenics_keyが重複しているかどうか判定する
   * @param   {String}  fenics_key
   * @return  {Boolean}
   * @private
   */
  _isUniqueFenicsKey = function ( fenics_key ) {

    var id = customer.model.userBaseInfo.getCache().id;

    return cms.db.select('/isUniqueFenicsKey', { fenicsKey : fenics_key, kids_id : id }).result;

  };

  /**
   * 入力チェック。違反のキーのリストを返す
   * @param  {Object} view_data - 画面のデータ
   * @return {Array}  result    - エラーのkeyリスト
   */
  validate = function ( view_data ) {
    var
      diff   = _model._checkWhatsUpdated(view_data)
    , result = vl.validate( diff )
    ;

    // クライアント数の差分を減少することはできない
    if ( diff.client_number ) {
      if ( view_data.client_number - _model.getCache()[0].client_number < 0 ) {
        result.push('client_number');
      }
    }

    if ( diff.fenics_key ) {
      if (!_isUniqueFenicsKey(view_data.fenics_key) ) {
        result.push('fenics_key');
      }
    }

    return result;

  };


  /**
   * モバイル使用クライアントのFenics追加
   * @param {Number} value - 画面のモバイル数
   */
  addMobile = function ( value ) {

    var
      kids_id = _model.getCache()[0].kids_id
    , diff = value - _model.getCache()[0].client_number
    , params
    ;

    if ( diff === 0 ) {
      return;
    }

    params = {
      data : {
        kids_id             : kids_id,
        fenics_key          : _model.getCache()[0].fenics_key,
        number_client_added : diff
      }
    };

    return cms.db.post('/addMobileClient', params)
    .then( function () {
      return cms.model.userNetwork.fetch( kids_id );
    })
    .then( function () {
      cms.model.userNetwork.find({is_mobile : 1}, cms.view.userMobile.drawTable);
    })
    .then( function () {
      cms.model.userMobile.fetch(kids_id, cms.view.userMobile.setInfo );
    });

  };

  register = function ( obj ) {

    var params = {};

    if ( obj.number < 1 ) {
      return;
    }

    return _model.fetchAsync(obj['kids_id'])
    .then(function (r) {
      params['data'] = {
        kids_id             : obj.kids_id,
        fenics_key          : r[0].fenics_key,
        number_client_added : obj.number
      };
    })
    .then( function () {
      cms.db.post('/addMobileClient', params );
    })
    .then( function () {
      return cms.model.userNetwork.fetch( obj.kids_id );
    })
    .then( function () {
      cms.model.userNetwork.find({is_mobile : 1}, cms.view.userMobile.drawTable );
    })
    .then( function () {
      cms.model.userMobile.fetch( obj.kids_id, cms.view.userMobile.setInfo );
    })
    ;

  };

  // to public
  cms.model.userMobile = {
    fetch     : $.proxy( _model.fetchAsync, _model ),
    getCache  : $.proxy( _model.getCache, _model ),
    find      : $.proxy( _model.find, _model ),
    update    : $.proxy( _model.update, _model ),
    validate  : validate,
    addMobile : addMobile,
    register  : register
  };

}( jQuery, customer ));