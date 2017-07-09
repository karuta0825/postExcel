/**
 * 拠点モデル
 */
( function ( $, cms ) {

  var
    config = {
      table : 'customers',
      tab_name : '基本情報',
      item_name_map : {
        'base_name'     : '顧客名',
        'postal_cd'     : '郵便番号',
        'address'       : '住所',
        'affliation'    : '所属',
        'owner'         : '担当者',
        'tel'           : '電話番号',
        'fax'           : 'FAX',
        'has_busiv'     : 'ビジV利用',
        'has_fenics'    : 'ユニバ利用',
        'has_mobile'    : 'モバイル利用'
      }
    }
  , _customerModel = new Model( config )
  , vl = new util.Validate({
      'base_name'     : 'noCheck',
      'postal_cd'     : 'isTEL',
      'address'       : 'noCheck',
      'affliation'    : 'noCheck',
      'owner'         : 'noCheck',
      'tel'           : 'isTEL',
      'fax'           : 'isTEL'
    })
  , validate
  , getCache
  ;

  validate = function ( data ) {
    var
      diff   = _customerModel._checkWhatsUpdated(data)
    , result = vl.validate( diff )
    ;
    return result;
  };

  /**
   * ネットワーク情報のみ更新したときは、kidsに変更がないので、
   * kidsがリフレッシュされないので、代わりに行う
   * @override
   */
  update = function ( view_date, callback ) {

    _customerModel.update( view_date, callback);

    cms.view.kids.refresh();

  };

  /**
   * @override
   */
  getCache = function () {
    return _customerModel.getCache()[0];
  };

  // to public
  cms.model.userCustomer = {
    fetch    : $.proxy( _customerModel.fetch, _customerModel ),
    getCache : getCache,
    update   : update,
    register : $.proxy( _customerModel.initUpdate, _customerModel ),
    check    : validate
  };

}( jQuery, customer ));