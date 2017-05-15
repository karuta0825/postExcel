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
  addClient = function ( view_data ) {

    var
      _model        = customer.model.clients
    , list_client   = _model.find.call( _model.fetch( _cache['kid'] ), {'is_admin' : 0 } )
    , list_add_user = []
    , length        = list_client.length
    , diff          =  view_data - length
    , clients
    ;

    if ( diff < 1 ) {
      return ;
    }

    nextClient = util.getNextZeroPadData( list_client[ length - 1 ].client_id );
    list_add_user.push( nextClient );

    for ( var i = 1; i < diff; i += 1 ) {
      nextClient = util.getNextZeroPadData( nextClient );
      list_add_user.push( nextClient );
    }


    clients = _.map( list_add_user, function ( val, key ) {
      return { 'kid' : _cache['kid'], client_id : val, client_pass :val, is_admin : 0 }
    });

    customer.model.clients.insert( clients, customer.view.userClient.redrawTable );

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