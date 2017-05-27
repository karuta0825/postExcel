/**
 * サービスマスタ+ユーザライセンスモデル
 *
 */
( function ( $, cms ) {

  /*member*/
  var
    _serviceModel = new Model({ table : 'services' })
  , _licenseModel = new Model({ table : 'licenses' })
  , fetchLicenses
  , getCache
  , initModule
  ;

  /**
   * [_diffUpdated description]
   * @override
   */
  _licenseModel._diffUpdated = function ( update_data ) {
    var
      before = {}
    , after  = {}
    , list_history = []
    , msg = {}
    , cache = this.getCache()[0]
    ;

    for ( var i in update_data ) {

      if ( cache[i] === 1 && update_data[i] === 0 ) {
        msg.type = '削除';
      }
      else {
        msg.type = '追加';
      }

      list_history.push({
        kid          : cache['kid'],
        type         : msg.type,
        content_name : 'サービス',
        item_name    : i,
        before       : cache[i],
        after        : update_data[i]
      });

    }

    return list_history;

  };

  fetchLicenses = function ( kid, callback ) {

    var result = _licenseModel.fetch( kid )[0];
    // _cache['kid'] = kid;
    // delete result.kid;

    if ( typeof callback === 'function' ) {
      callback( result );
    }
    else {
      return result
    }

  };

  getCache = function ( content, callback ) {

    var result;

    if ( content === 'services' ) {
      result = _serviceModel.getCache();
    }
    else {
      result = _licenseModel.getCache()[0];
    }

    if ( typeof callback === 'function') {
      callback( result );
    }
    else {
      return result;
    }


  };

  initModule = function () {
    _serviceModel.fetch();
  };


  // to public
  cms.model.services =  {
    initModule    : initModule,
    fetchServices : $.proxy( _serviceModel.fetch, _serviceModel ),
    fetchLicenses : fetchLicenses,
    getCache      : getCache,
    update        : $.proxy( _licenseModel.update, _licenseModel ),
    check         : $.proxy( _licenseModel._checkWhatsUpdated, _licenseModel ),
    register      : $.proxy( _licenseModel.initUpdate, _licenseModel )
  };

}( jQuery, customer ));