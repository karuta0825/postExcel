/**
 * ユーザー基本モデル
 */

(function ($, cms) {

  var
    _cache
  , config = {
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
  , fetch
  , getCache
  , addClient
  ;

  fetch = function ( kid, callback  ) {


    _cache = $.extend(
      {},
      customer.model.kids.find( {'kid' : kid } )[0],
      _customerModel.fetch(kid)[0]
    );

    if ( typeof callback === 'function' ) {
      callback( _cache );
    }
    else {
      return _cache;
    }

  };

  getCache = function () {
    return _cache;
  };

  /**
   * windowsユーザーを作成する
   * @param {[type]} view_data
   */
  addClient = function ( view_client_number ) {

    var diff = view_client_number - _cache['client_number'];

    if ( diff < 1 ) {
      return ;
    }

    var params = {
      data : {
        kid                 : _cache['kid'],
        userkey             : _cache['userkey'],
        number_client_added : diff
      }
    };

    cms.db.insert('/addClient', params, function () {
      cms.model.clients.fetch( _cache['kid'], cms.view.userClient.redrawTable );
    });

  };

  // To pubic
  cms.model.userBaseInfo = {
    fetch     : fetch,
    getCache  : getCache,
    addClient : addClient,
    update    : $.proxy( _customerModel.update, _customerModel ),
    checkCust : $.proxy( _customerModel._checkWhatsUpdated, _customerModel )
  };

}( jQuery, customer ));