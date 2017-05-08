// var customer;
customer.model = customer.model || {};
customer.model.kids = ( function () {

  var
    /*private member*/
    _data
  , _headerMap = {}
  , _condition = {
      system_type : 'all',
      version     : 'all',
      server      : 'all',
      has_mobile  : 'all'
    }
  , _sortOrder = 1
    /*private method*/
    /*public  method*/
  , find
  , sortByCol
  , getData
  , getHeader
  , initModule
  ;

  findByIds = function ( list_id ) {
    var list = [];
    _.each( list_id, function ( val, key ) {
      list.push( find( { kid : val }) );
    });
    return list;
  };


  /**
   * 条件に一致したデータを抽出(and条件)
   * @param  {Object}   condition_map - 絞り込む条件を決めるためのキー・バリュー
   * @param  {Function} callback      - viewから描画関数
   * @return {Array}    filterd       - 抽出結果
   */
  find = function ( condition_map, callback ) {

    var filtered = _data;

    _.each( condition_map, function ( val, key ) {

      if ( val !== 'all' ) {
        filtered = _.select( filtered, function ( v, k ) {
          return v[key] === val;
        });
      }

    });

    if ( typeof callback === 'function' ) {
      callback( filtered );
    }
    else {
      return filtered;
    }

  };

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

    find( _condition, callback );

  };

  /**
   * TODO:引数でシステムタイプやバージョン取り出すかどうか選択可能にする
   */
  getData = function ( is_all ) {

    if ( is_all ) {
      return _data;
    }

    var clone = _.map( _data, _.clone );

    return _.map( clone, function ( val, key ) {
      delete val.system_type;
      delete val.version;
      return val;
    });

  };

  getHeader = function () {
    return _headerMap;
  };


  initModule = function () {
    _data = customer.db.selectAll('all');
    _headerMap = customer.db.selectAll('/tableHeader')[0];
  };

  /*public method*/
  return {
    initModule   : initModule,
    find : find,
    setCondition : setCondition,
    sortByCol    : sortByCol,
    getData      : getData,
    getHeader    : getHeader
  };

}());