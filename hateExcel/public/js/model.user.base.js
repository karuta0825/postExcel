/**
 * ユーザー基本モデル
 */

(function ($, cms) {

  var
    _cache
  , _updateHistory
  , fetch
  , getCache
  , _checkWhatsUpdated
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

  _checkWhatsUpdated = function ( view_data ) {

    var result = {};

    for ( var i in view_data ) {
      if ( view_data[i] !== '' && view_data[i] !== _cache[i] ) {
        result[i] = view_data[i];
      }
    }

    return result;

  };

  /**
   * この関数は、customer.dbが持つか、Modelクラスに持たせるのがよい。
   * @param  {[type]} update_data
   * @return {Object}
   */
  _diffUpdated = function ( update_data ) {
    var
      before = {}
    , after  = {}
    , list_history = []
    ;

    for ( var i in update_data ) {

      list_history.push({
        kid          : _cache['kid'],
        type         : '更新',
        content_name : '基本情報',
        item_name    : '',
        before       : _cache[i],
        after        : update_data[i]
      });

    }

    return list_history;

  };

  /**
   * customerテーブルをアップデート
   * @param  {Object}   data
   * @param  {String}   kid
   * @param  {function} callback - 再描画用view関数
   */
  update = function ( data, callback ) {

    var update_data = _checkWhatsUpdated( data );

    if ( _.keys(update_data).length > 0 ) {

      // データの更新
      customer.db.update('/update', {
        data      : update_data,
        condition : { 'kid' : _cache['kid'] },
        table     : 'customers'
      });

      // 履歴の更新
      _updateHistory( _diffUpdated( update_data ) );

      // 再描画
      if ( typeof callback === 'function' ) {
        callback( _cache['kid'] );
      }

    }

  };

  _updateHistory = function ( data ) {

    customer.db.insert({
      data  : data,
      table : 'historys'
    });

  };

  // To pubic
  cms.model.userBaseInfo = {
    fetch : fetch,
    getCache : getCache,
    update : update
  };

}( jQuery, customer ));