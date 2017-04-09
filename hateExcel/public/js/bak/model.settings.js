
/**
 * 設定情報モデル
 *  表示・非表示列情報
 *  選択中のユーザー情報
 *  モデルのデータ構造は、リストマップ [{},{},{}]
 */
customer.model = customer.model || {};
customer.model.settings = ( function () {

  /*member*/
  var
    DISPLAY = {
      SHOW : '1',
      HIDE : '0'
    },
    _columnsMap,
    callbacks = {},
    getColumnState,
    refresh,
    scan,
    on, trigger,
    switchDisplayMode,
    updateDisplayMode,
    initModule
    ;

  /*method*/
  getColumnState = function () {
    return _columnsMap;
  };

  /**
   * 内部データに対して外部からのコールバック関数を適用する
   * 主にviewからのリフレッシュ用に使用
   * @param  {Function} callback
   */
  scan = function ( callback ) {
    _.each( _columnsMap, function ( v, k ) {
      callback( v, k );
    });
  };

  on = function ( event, callback ) {
    if ( callbacks[event] ) {
        callbacks[event].push( callback );
    }
    else {
      callbacks[event] = [];
      callbacks[event].push(callback);
    }
  };

  trigger = function ( event ) {
    if ( !callbacks ) { return; }
    if ( !callbacks[event] ) { return; }
    if ( event === 'refresh' ) { refresh(); }
    _.each( callbacks[event], function ( val, key ) {
      _.each( _columnsMap, function ( v, k ) {
        val( v,k );
      });
    });
  };

  refresh = function () {
    _columnsMap = customer.db.selectAll('/columns')[0];
    delete _columnsMap.uid;
    delete _columnsMap.check;
  };

  switchDisplayMode = function ( column, callback ) {
    var is_checked = _columnsMap[column];

    if ( typeof callback === 'function' ) {
      callback( column );
    }

    if ( is_checked === DISPLAY.SHOW ) {
      _columnsMap[column] = DISPLAY.HIDE;
    }
    else {
      _columnsMap[column] = DISPLAY.SHOW;
    }

  };

  updateDisplayMode = function () {
    customer.db.update('/updateColumns', _columnsMap );
  };

  initModule = function () {
    _columnsMap = customer.db.selectAll('/columns')[0];
    delete _columnsMap.uid;
    delete _columnsMap.check;
    // ここに画面系の関数を用意するのがいいよね。scanとか使わずに
  };

  return {
    initModule        : initModule,
    getColumnState    : getColumnState,
    switchDisplayMode : switchDisplayMode,
    updateDisplayMode : updateDisplayMode,
    scan              : scan,
    on                : on,
    trigger           : trigger,
    refresh           : refresh
  };

}());