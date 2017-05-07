/**
 * サービスマスタ
 *
 */
customer.model = customer.model || {};
customer.model.services = ( function () {

  /*member*/
  var
    _cache = {}
  , _updateHistory
  , _checkWhatsUpdated
  , _diffUpdated
  , fetchServives
  , fetchLicenses
  , getCache
  , update
  , initModule
  ;

  _checkWhatsUpdated = function ( view_data ) {

    var result = {};

    if ( !_cache['licenses'] ) {
      return view_data;
    }

    for ( var i in view_data ) {
      if ( view_data[i] !== '' && view_data[i] !== _cache['licenses'][i] ) {
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
    , msg = {}
    ;

    for ( var i in update_data ) {

      if ( _cache['licenses'][i] === 1 && update_data[i] === 0 ) {
        msg.type = '削除';
      }
      else {
        msg.type = '追加';
      }

      list_history.push({
        kid          : _cache['kid'],
        type         : msg.type,
        content_name : 'サービス',
        item_name    : i,
        before       : _cache['licenses'][i],
        after        : update_data[i]
      });

    }

    return list_history;

  };

  _updateHistory = function ( data ) {

    customer.db.insert('/insert', {
      data  : data,
      table : 'historys'
    });

  };

  fetchServices = function () {
    _cache.services = customer.db.select('/select', {
      table : 'services'
    });
    return _cache.services;
  };

  fetchLicenses = function ( kid, callback ) {
    _cache.licenses = customer.db.select('/select', {
      condition : { 'kid' : kid },
      table     : 'licenses'
    })[0];

    _cache['kid'] = _cache.licenses.kid;
    delete _cache.licenses.kid;

    if ( typeof callback === 'function' ) {
      callback(_cache.licenses);
    }
    else {
      return _cache.licenses
    }

  };

  getCache = function ( content, callback ) {

    if ( typeof callback === 'function') {
      callback( _cache[content] );
    }
    else {
      return _cache[content];
    }

  };

  initModule = function () {
    fetchServices();
  };

  update = function ( data, callback ) {

    var update_data = _checkWhatsUpdated( data );

    // updateする対象が存在する場合
    if ( _.keys(update_data).length > 0 ) {

      // データの更新
      customer.db.update('/update', {
        data      : update_data,
        condition : { 'kid' : _cache['kid'] },
        table     : 'licenses'
      });

      // 履歴の更新
      _updateHistory( _diffUpdated( update_data ) );

      // 再描画
      if ( typeof callback === 'function' ) {
        callback( fetchLicenses(_cache['kid']) );
      }

      // 履歴テーブルの再描画
      customer.model.userHistory.fetch(_cache['kid'],
        customer.view.userHistory.drawTable
      );

    }
  };

  return {
    fetchServices : fetchServices,
    fetchLicenses : fetchLicenses,
    getCache      : getCache,
    initModule    : initModule,
    update : update,
    check  : _checkWhatsUpdated
  };

}());