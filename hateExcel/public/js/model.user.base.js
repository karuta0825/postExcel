/**
 * ユーザー基本モデル
 */

(function ($, cms) {

  var
    _cache
  , vl = new util.Validate({

   })
  , fetch
  , getCache
  , addClient
  , registerClient
  , makeOrgFileMap
  ;

  validate = function ( view_data, has_busiv ) {

    var result = [];

    if ( view_data['client_number'] < getCache().client_number ) {
      result.push('client_number');
    }

    // ユニバのみの場合、端末削除はできない
    // 端末削除するならば、fenicsIDを削除する
    if ( !has_busiv && view_data['number_pc'] < getCache().number_pc ) {
      result.push('number_pc');
    }

    if ( view_data['number_id'] < 0 )  {
      result.push('number_id');
    }
    if ( view_data['start_id'] < 0 ) {
      result.push('start_id');
    }

    return result;

  };

  fetch = function ( kid, callback  ) {

    _cache = _.clone( customer.model.kids.find( {'kid' : kid } )[0] );

    // 端末IDの
    _cache.start_id = _cache.range_id && Number(_cache.range_id.split('-')[0]) || '';
    delete _cache.range_id

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

  /**
   *
   * @param {Object} map
   * @param {Object} map.kid
   * @param {Object} map.userkey
   * @param {Object} map.number_client_added
   */
  registerClient = function ( map ) {

    var params = { data : map };

    return cms.db.post('/addClient', params );

  };

  // To pubic
  cms.model.userBaseInfo = {
    fetch          : fetch,
    getCache       : getCache,
    addClient      : addClient,
    registerClient : registerClient,
    check          : validate
  };

}( jQuery, customer ));