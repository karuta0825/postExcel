/**
 * ユーザー基本モデル
 */

(function ($, cms) {

  var
    _cache
  , fetch
  , getCache
  ;

  fetch = function ( kid ) {
    _cache = $.extend(
      {},
      customer.model.kids.findByKid(kid),
      customer.db.select('/baseInfo', {'kid' : kid} )[0]
    );
    return _cache;
  };

  getCache = function () {
    return _cache;
  };

  cms.model.userBaseInfo = {
    fetch : fetch,
    getCache : getCache
  }

}( jQuery, customer ));