// var customer;
( function ( $, cms ) {

  var
    /*private member*/
    config = {
      table : 'kids',
      tab_name : '基本情報',
      item_name_map : {
        'kid'           : 'KID',
        'server'        : 'サーバ',
        'userkey'       : 'ユーザーキー',
        'db_password'   : 'DBパスワード',
        'fenics_key'    : 'Fenicsキー',
        'is_busiv'      : 'ネットワーク',
        'client_number' : 'クライアント数',
        'number_pc'     : '端末台数',
        'number_id'     : '端末id収容数',
        'start_id'      : '開始端末id'
      }
    }
  , _model = new Model( config )
  , _page = new Page([],1)
  , _headerMap = {}
  , _condition = {
      system_type : 'all',
      version     : 'all',
      server      : 'all',
      has_mobile  : 'all',
      has_busiv   : 'all',
      has_fenics  : 'all'
    }
  , _sortOrder = 1
  , MAX_VISIBLE_NUMBER = 30
    /*private method*/
    /*public  method*/
  , sortByCol
  , getCache
  , find
  , setCondition
  , getCondition
  , getHeader
  , register
  , initModule
  , nextPage
  , prevPage
  , getPage
  ;

  /**
   * データソート
   * @param  {String} col - colのキー名
   * @param  {[type]} callbackFromView - Viewで使用するコールバック関数
   * @return {Array}  - ソート結果
   */
  sortByCol = function ( col, callbackFromView ) {

    _model.getFiltered().sort( function ( item1, item2 ) {
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
      callbackFromView( col, _model.getFiltered() );
    }

  };


  /**
   * [getCache description]
   * @override
   * @param  {Function} callback
   * @return {[type]}
   */
  getCache = function ( callback ) {

    _page = new Page( _model.getCache(), MAX_VISIBLE_NUMBER );

    if ( typeof callback === 'function' ) {
      callback( _page.current() );
    }
    else {
      return _page.current();
    }

  };

  /**
   * 指定した条件でのフィルターを行う
   * @override
   * @param  {Object}   condition
   * @param  {Function} callback
   */
  find = function ( condition, callback ) {

    _page = new Page( _model.find( condition ), MAX_VISIBLE_NUMBER );

    if ( typeof callback === 'function' ) {
      callback( _page.current() );
    }
    else {
      return _page.current();
    }

  };

  getCondition = function ( callback ) {

    _page = new Page( _model.find( _condition ), MAX_VISIBLE_NUMBER );

    if ( typeof callback === 'function' ) {
      callback( _page.current() );
    }
    else {
      return _page.current();
    }


  };

  /**
   * 検索メソッド
   * @override
   */
  search = function ( keyword, callback ) {

    _page = new Page( _model.search( keyword ), MAX_VISIBLE_NUMBER );

    if ( typeof callback === 'function' ) {
      callback( _page.current() );
    }
    else {
      return _page.current();
    }


  };

  setCondition = function ( obj, callback ) {

    _.each( obj, function (val, key) {
      _condition[key] = val;
    });

    _page = new Page( _model.find( _condition ), MAX_VISIBLE_NUMBER );

    if ( typeof callback === 'function') {
      callback( _page.current() );
    }
    else {
      return _page.current();
    }

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

  /**
   * 画面と現在の差分データを取得する
   * @override
   * @param  {Object} view_data - 画面オブジェクト
   * @return {Object} result    - 差分オブジェクト
   */
  _model._checkWhatsUpdated = function ( view_data ) {

    var
     result = {},
     before = this.find({ 'kid' : view_data['kid'] })[0]
    ;

    // 端末開始IDを端末ID範囲から求める
    before['start_id'] = before['range_id'] && Number(before['range_id'].split('-')[0]) || 0;
    delete before['range_id'];

    if ( !before ) {
      return;
    }

    for ( var i in view_data ) {
      if ( view_data[i] !== '' && view_data[i] !== before[i] ) {
        result[i] = view_data[i];
      }
    }

    return result;

  };

  /**
   * [_diffUpdated description]
   * @override
   * @param  {[type]} update_data
   * @return {[type]}
   */
  _model._diffUpdated = function ( kid, update_data ) {
    var
      before = _model.find({'kid' : kid})[0]
    , after  = {}
    , list_history = []
    ;

    for ( var i in update_data ) {

      list_history.push({
        kid          : kid,
        type         : '更新',
        content_name : this['config']['tab_name'],
        item_name    : this['config']['item_name_map'][i],
        before       : before[i],
        after        : update_data[i]
      });

    }

    return list_history;

  };


  /**
   * 特定行(KID)の更新
   * @override
   * @param  {[type]}   view_data
   * @param  {Function} callback
   * @return {[type]}
   */
  _model.update = function ( view_data, callback ) {

    var update_data = this._checkWhatsUpdated( view_data );
    var historyData = _.extend( {}, update_data );

    // クライアント・PC数はテーブルにないため削除
    delete update_data.client_number;

    // updateする対象が存在する場合
    if ( _.keys(update_data).length > 0 ) {

      // データの更新
      customer.db.update('/update', {
        data      : update_data,
        condition : {'kid' : view_data['kid']},
        table     : this['config']['table']
      });

    }

    // クライアント数に変更あった場合も更新する
    if ( _.keys(historyData).length > 0 ) {

      // 履歴の更新
      this._updateHistory( this._diffUpdated( view_data['kid'], historyData ) );

      // 再描画
      if ( typeof callback === 'function' ) {
        cms.view.home.refresh();
        cms.view.kids.refresh();
        callback(cms.model.userBaseInfo.fetch(view_data['kid']));
        // callback( this.find( { 'kid' : view_data['kid'] } )[0] );
      }
    }

    // 履歴テーブルの再描画
    customer.model.userHistory.fetch( view_data['kid'],
      customer.view.userHistory.drawTable
    );

  };

  nextPage = function ( callback ) {

    if ( typeof callback === 'function' ) {
      callback( _page.next() );
    }
    else {
      return _page.next();
    }

  };

  prevPage = function ( callback ) {

    if ( typeof callback === 'function' ) {
      callback( _page.prev() );
    }
    else {
      return _page.prev();
    }

  };

  getPage = function ( number, callback  ) {

    if ( typeof callback === 'function' ) {
      callback( _page.get(number) );
    }
    else {
      return _page.get(number);
    }

  };

  getPageList = function ( callback ) {

    if ( typeof callback === 'function' ) {
      callback( _page.getPageList() );
    }
    else {
      return _page.getPageList();
    }
  };

  /*public method*/
  cms.model.kids = {
    initModule   : initModule,
    fetch        : $.proxy( _model.fetch,    _model ),
    // getData      : $.proxy( _model.getCache, _model ),
    getData      : getCache,
    // find         : $.proxy( _model.find,     _model ),
    find         : find,
    delete       : $.proxy( _model.delete,   _model ),
    getCondition : getCondition,
    setCondition : setCondition,
    sortByCol    : sortByCol,
    getHeader    : getHeader,
    update       : $.proxy( _model.update, _model ),
    check        : $.proxy( _model._checkWhatsUpdated, _model ),
    register     : $.proxy( _model.initUpdate, _model ),
    nextPage     : nextPage,
    prevPage     : prevPage,
    getPage      : getPage,
    search       : search,
    getPageList  : getPageList
  };

}( jQuery, customer ));