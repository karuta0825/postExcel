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

  /**
   * customerテーブルをアップデート
   * @param  {[type]} data
   * @param  {[type]} condition
   * @return {[type]}
   */
  update = function ( data, condition ) {

    customer.db.update('/update', {
      data      : data,
      condition : condition,
      table     : 'customers'
    });

  };

  cms.model.userBaseInfo = {
    fetch : fetch,
    getCache : getCache,
    update : update
  };

}( jQuery, customer ));