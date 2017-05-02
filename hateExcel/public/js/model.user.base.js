/**
 * ユーザー基本モデル
 */

(function ($, cms) {

  var
    _cache
  , fetch
  , getCache
  , checkWhatsUpdated
  , update
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

  checkWhatsUpdated = function ( view_data ) {

    var result = {};

    for ( var i in view_data ) {
      if ( view_data[i] !== '' && view_data[i] !== _cache[i] ) {
        result[i] = view_data[i];
      }
    }

    return result;

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
    checkWhatsUpdated : checkWhatsUpdated,
    update : update
  };

}( jQuery, customer ));