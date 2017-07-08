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
    _model = new Model(config)
  ;

  // to public
  cms.model.userMobile = {
    fetch    : $.proxy( _model.fetch, _model ),
    getCache : $.proxy( _model.getCache, _model ),
    find     : $.proxy( _model.find, _model ),
    update   : $.proxy( _model.update, _model )
  };

}( jQuery, customer ));