
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
    changeColumnsView,
    changeColumnView,
    initModule
    ;

  /*method*/


  changeColumnViewj = function ( column ) {

  };

  getColumnsMap = function () {
    return _columnsMap;
  };

  /**
   * [changeColumnsView description]
   * @param  {Object} columnsMap - 変更オブジェクト
   */
  changeColumnsView = function ( columnsMap ) {
    customer.db.update('/', columnsMap );
  };

  initModule = function () {
    _columnsMap = customer.db.selectAll('/columns')[0];
    delete _columnsMap.uid;
  };

  return {
    changeColumnsView : changeColumnsView
  };

}());