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

  fetch = function ( kid ) {

    _cache = customer.db.select('/select', {
      'condition' : { 'kid' : kid },
      'table' : 'historys'
    });

    return _cache;

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