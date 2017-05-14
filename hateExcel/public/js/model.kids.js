// var customer;
( function ( $, cms ) {

  var
    /*private member*/
    _model = new Model({ table : 'all' })
  , _headerMap = {}
  , _condition = {
      system_type : 'all',
      version     : 'all',
      server      : 'all',
      has_mobile  : 'all',
      is_busiv    : 'all'
    }
    /*private method*/
  , _sortOrder = 1
    /*public  method*/
  , sortByCol
  , setCondition
  , getHeader
  , initModule
  ;

  /**
   * データソート
   * @param  {String} col - colのキー名
   * @param  {[type]} callbackFromView - Viewで使用するコールバック関数
   * @return {Array}  - ソート結果
   */
  sortByCol = function ( col, callbackFromView ) {

    _data.sort( function ( item1, item2 ) {
      item1 = _.isString( item1[col] ) && item1[col].toString().toLowerCase() || item1[col];
      item2 = _.isString( item2[col] ) && item2[col].toString().toLowerCase() || item2[col];
      if ( item1 < item2 ) {
        return -1 * _sortOrder;
      }
      else if ( item1 > item2 ) {
        return 1 * _sortOrder;
      }
    });

    // 並び替え方向の入れ替え
    _sortOrder *= -1;

    // モデルの変化時にviewを更新する処理
    if( callbackFromView ) {
      callbackFromView( col, _data );
    }

  };

  setCondition = function ( obj, callback ) {

    _.each( obj, function (val, key) {
      _condition[key] = val;
    });

    _model.find( _condition, callback );

  };

  /**
   * TODO:引数でシステムタイプやバージョン取り出すかどうか選択可能にする
   */
  getHeader = function () {
    return _headerMap;
  };


  initModule = function () {
    _model.fetch();
    _headerMap = customer.db.selectAll('/tableHeader')[0];
  };

  /*public method*/
  cms.model.kids = {
    initModule   : initModule,
    fetch        : $.proxy( _model.fetch,    _model ),
    getData      : $.proxy( _model.getCache, _model ),
    find         : $.proxy( _model.find,     _model ),
    setCondition : setCondition,
    sortByCol    : sortByCol,
    getHeader    : getHeader
  };

}( jQuery, customer ));