/**
 *
 */

(function ( $, cms ) {

  var
    _cache
  , config = {
      item_name_map : {
        'pid'           : 'PID',
        'name'          : '販社名',
        'postal_cd'     : '郵便番号',
        'address'       : '住所',
        'se_affliation' : 'SE所属',
        'se_name'       : 'SE担当者',
        'se_tel'        : 'SE電話番号',
        'se_fax'        : 'SE_FAX',
        'se_email'      : 'SE_Email',
        'sa_affliation' : 'SA所属',
        'sa_name'       : 'SA担当者',
        'sa_tel'        : 'SA電話番号',
        'sa_fax'        : 'SA_FAX',
        'sa_email'      : 'SA_Email',
        'em_company'    : '緊急連絡先社名',
        'em_name'       : '担当者',
        'em_tel'        : '緊急電話番号',
        'em_email'      : '緊急Email'
      }
    }
  , _updateHistory
  , _checkWhatsUpdated
  , fetch
  , freeCache
  , getCache
  , update
  ;

  _checkWhatsUpdated = function ( view_data ) {

    var result = {};

    if ( !_cache ) {
      return view_data;
    }

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
        content_name : 'パートナー',
        item_name    : config.item_name_map[i],
        before       : _cache[i],
        after        : update_data[i]
      });

    }

    return list_history;

  };

  _updateHistory = function ( data ) {

    customer.db.insert({
      data  : data,
      table : 'historys'
    });

  };



  fetch = function ( kid, callback ) {

    _cache = customer.db.select('/select', {
      'condition' : { 'kid' : kid },
      'table' : 'partners'
    })[0];

    if ( _cache && typeof callback === 'function' ) {
      callback( _cache );
    }
    else {
      return _cache;
    }

  };

  getCache = function ( callback ) {

    if ( typeof callback === 'function') {
      callback( _cache );
    }
    else {
      return _cache;
    }

  };

  freeCache = function () {
    _cache = null;
  };

    /**
   * customerテーブルをアップデート
   * @param  {Object}   data
   * @param  {String}   kid
   * @param  {function} callback - 再描画用view関数
   */
  update = function ( data, callback ) {

    var update_data = _checkWhatsUpdated( data );

    // updateする対象が存在する場合
    if ( _.keys(update_data).length > 0 ) {

      // データの更新
      customer.db.update('/update', {
        data      : update_data,
        condition : { 'kid' : _cache['kid'] },
        table     : 'partners'
      });

      // 履歴の更新
      _updateHistory( _diffUpdated( update_data ) );

      // 再描画
      if ( typeof callback === 'function' ) {
        callback( fetch(_cache['kid']) );
      }

      // 履歴テーブルの再描画
      customer.model.userHistory.fetch(_cache['kid'],
        customer.view.userHistory.drawTable
      );

    }

  };



  // to public
  cms.model.userPartner = {
    fetch     : fetch,
    getCache  : getCache,
    freeCache : freeCache,
    update    : update,
    check     : _checkWhatsUpdated
  };


}( jQuery, customer ));

