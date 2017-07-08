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
        'office_cd'     : '事業者コード'
      }
    }
  , _model = new Model(config)
  // private
  // public method
  , addMobile
  ;

  /**
   * モバイル使用クライアントのFenics追加
   * @param {Number} value - 画面のモバイル数
   */
  addMobile = function ( value ) {

    var
      diff = value - _model.getCache()[0].client_number
    , params
    ;

    if ( diff <= 0 ) {
      return;
    }

    params = {
      data : {
        kid                 : _model.getCache()[0].kid,
        fenics_key          : _model.getCache()[0].fenics_key,
        number_client_added : diff
      }
    };

    return cms.db.post('/addMobileClient', params)
    .then( function () {
      cms.model.userNetwork.fetch( _model.getCache()[0].kid );
    });

  };

  // to public
  cms.model.userMobile = {
    fetch     : $.proxy( _model.fetch, _model ),
    getCache  : $.proxy( _model.getCache, _model ),
    find      : $.proxy( _model.find, _model ),
    update    : $.proxy( _model.update, _model ),
    addMobile : addMobile
  };

}( jQuery, customer ));