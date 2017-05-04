/**
 * 履歴モデル
 *
 */

( function ( $, cms ) {

  var
    _cache
  , fetch
  , getCache
  ;

  fetch = function ( kid, callback ) {

    _cache = customer.db.select('/select', {
      'condition' : { 'kid' : kid },
      'table' : 'historys'
    });

    _.each( _cache, function ( val, key ) {
      val['msg'] = val.before + 'から' + val.after + 'に変更';
    });

    if ( typeof callback === 'function' ) {
      callback(_cache);
    }
    else {
      return _cache;
    }

  };

  getCache = function () {
    return _cache;
  };

  // to public
  cms.model.userHistory = {
    fetch : fetch,
    getCache : getCache
  };

}( jQuery, customer ));