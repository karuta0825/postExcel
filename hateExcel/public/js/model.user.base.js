/**
 * ユーザー基本モデル
 */

(function ($, cms) {

  var
    _cache
  , config = {
      item_name_map : {
        'kid'           : 'KID',
        'user_name'     : '顧客名',
        'userkey'       : 'ユーザーキー',
        'server'        : 'サーバ',
        'db_pass'       : 'DBパスワード',
        'postal_cd'     : '郵便番号',
        'address'       : '住所',
        'affliation'    : '所属',
        'owner'         : '担当者',
        'tel'           : '電話番号',
        'fax'           : 'FAX',
        'client_number' : 'クライアント数',
        'is_busiv'      : 'ネットワーク'
      }
    }
  , _updateHistory
  , fetch
  , getCache
  , _checkWhatsUpdated
  , update
  , addClient
  ;

  fetch = function ( kid, callback  ) {

    _cache = $.extend(
      {},
      customer.model.kids.find( {'kid' : kid} )[0],
      customer.db.select('/select', {
        condition : {'kid' : kid},
        table : 'customers'
      })[0]
    );

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
        item_name    : config.item_name_map[i],
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
    var historyData = _.extend( {}, update_data );
    delete update_data.client_number;

    // updateする対象が存在する場合
    if ( _.keys(update_data).length > 0 ) {

      // データの更新
      customer.db.update('/update', {
        data      : update_data,
        condition : { 'kid' : _cache['kid'] },
        table     : 'customers'
      });

    }

    // クライアント数に変更あった場合も更新する
    if ( _.keys(historyData).length > 0 ) {

      // 履歴の更新
      _updateHistory( _diffUpdated( historyData ) );

      // 再描画
      if ( typeof callback === 'function' ) {
        customer.model.kids.fetch(
          customer.view.kids.regenerateTable
        );
        callback( fetch(_cache['kid']) );
      }

      // 履歴テーブルの再描画
      customer.model.userHistory.fetch(_cache['kid'],
        customer.view.userHistory.drawTable
      );

    }

  };

  addClient = function ( view_data ) {

    var
      _model        = customer.model.clients
    , list_client   = _model.find.call( _model.fetch( _cache['kid'] ), {'is_admin' : 0 } )
    , list_add_user = []
    , length        = list_client.length
    , diff          =  view_data - length
    , clients
    ;

    if ( diff < 1 ) {
      return ;
    }

    nextClient = util.getNextZeroPadData( list_client[ length - 1 ].client_id );
    list_add_user.push( nextClient );

    for ( var i = 1; i < diff; i += 1 ) {
      nextClient = util.getNextZeroPadData( nextClient );
      list_add_user.push( nextClient );
    }


    clients = _.map( list_add_user, function ( val, key ) {
      return { 'kid' : _cache['kid'], client_id : val, client_pass :val, is_admin : 0 }
    });

    customer.model.clients.insert( clients, customer.view.userClient.redrawTable );

  };

  _updateHistory = function ( data ) {

    customer.db.insert('/insert',{
      data  : data,
      table : 'historys'
    });

  };

  // To pubic
  cms.model.userBaseInfo = {
    fetch : fetch,
    getCache : getCache,
    update : update,
    addClient : addClient
  };

}( jQuery, customer ));