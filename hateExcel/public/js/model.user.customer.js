/**
 * 拠点モデル
 */
( function ( $, cms ) {

  var
    config = {
      table : 'customers',
      tab_name : '基本情報',
      item_name_map : {
        'user_name'     : '顧客名',
        'postal_cd'     : '郵便番号',
        'address'       : '住所',
        'affliation'    : '所属',
        'owner'         : '担当者',
        'tel'           : '電話番号',
        'fax'           : 'FAX'
      }
    }
  , _customerModel = new Model( config )
  , vl = new util.Validate({
      'user_name'     : 'isEmpty',
      'postal_cd'     : 'isTEL',
      'address'       : 'isEmpty',
      'affliation'    : 'isEmpty',
      'owner'         : 'isEmpty',
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
   * @override
   */
  getCache = function () {
    return _customerModel.getCache()[0];
  };

  // to public
  cms.model.userCustomer = {
    fetch    : $.proxy( _customerModel.fetch, _customerModel ),
    getCache : getCache,
    update   : $.proxy( _customerModel.update, _customerModel ),
    register : $.proxy( _customerModel.initUpdate, _customerModel ),
    check    : validate
  };

}( jQuery, customer ));