
/**
 * 設定情報モデル
 *  表示・非表示列情報
 *  選択中のユーザー情報
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
    getColumnState,
    switchDisplayMode,
    updateDisplayMode,
    initModule
    ;

  /*method*/
  getColumnState = function () {
    return _columnsMap;
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
  };

  return {
    initModule        : initModule,
    getColumnState    : getColumnState,
    switchDisplayMode : switchDisplayMode,
    updateDisplayMode : updateDisplayMode
  };

}());