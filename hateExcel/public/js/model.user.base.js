/**
 * ユーザー基本モデル
 */

(function ($, cms) {

  var
    _cache
  , fetch
  , getCache
  , addClient
  , makeOrgFileMap
  ;

  fetch = function ( kid, callback  ) {

    _cache = _.clone( customer.model.kids.find( {'kid' : kid } )[0] );

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
      cms.model.clients.fetch( _cache['kid'], cms.view.userClient.redrawTable );
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
    fetch          : fetch,
    getCache       : getCache,
    addClient      : addClient
  };

}( jQuery, customer ));