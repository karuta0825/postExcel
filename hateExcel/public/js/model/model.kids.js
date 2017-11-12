// var customer;
( function ( $, cms ) {

  var
    /*private member*/
    config = {
      table : 'kids',
      tab_name : '基本情報',
      item_name_map : {
        'kid'           : 'KID',
        'register_on'   : '受付日',
        'user_name'     : '事業者名',
        'server'        : 'サーバ',
        'userkey'       : 'ユーザーキー',
        'db_password'   : 'DBパスワード',
        'fenics_key'    : 'Fenicsキー',
        'is_busiv'      : 'ネットワーク',
        'client_number' : 'ユーザ数(CitrixID数)',
        'number_pc'     : 'クライアント数(FENICSID数)',
        'number_id'     : '端末id収容数',
        'start_id'      : '開始端末id',
        'has_qa'        : '業務QA'
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
  , fetch
  , sortByCol
  , getCache
  , find
  , search
  , setCondition
  , getCondition
  , getConditionAll
  , getHeader
  , register
  , initModule
  , getPageList
  ;

  fetch = function ( condition, callback ) {
    return _model.fetchAsync(null)
    .then(function (r) {
      _page.initialize(r, MAX_VISIBLE_NUMBER);
      callback(_page.get(1));
    });
  };

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

    _page.initialize( _model.getCache(), MAX_VISIBLE_NUMBER );

    if ( typeof callback === 'function' ) {
      callback( _page.current() );
    }
    else {
      return _page.current();
    }

  };

  getCondition = function ( callback ) {

    _page.initialize( _model.find( _condition ), MAX_VISIBLE_NUMBER );

    if ( typeof callback === 'function' ) {
      callback( _page.current() );
    }
    else {
      return _page.current();
    }


  };

  getConditionAll = function () {
    return _model.find( _condition );
  };

  /**
   * 検索メソッド
   * @override
   */
  search = function ( keyword, callback ) {

    _page.initialize( _model.search( keyword ), MAX_VISIBLE_NUMBER );

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

    _page.initialize( _model.find( _condition ), MAX_VISIBLE_NUMBER );

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
    // _model.fetch();
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
      result = {}
    , before = this.find({ 'id' : view_data['id'] })[0]
    , clone = _.clone(view_data)
    ;

    // 前回がないなら処理終了
    if ( !before ) {
      return;
    }

    // 前処理1
    // 端末開始IDを端末ID範囲から求める
    before['start_id'] = before['range_id'] && Number(before['range_id'].split('-')[0]) || 0;
    delete before['range_id'];

    // 前処理2
    // viewは数値のみ, modelは、KIDが先頭につくという差をなくす
    if ( view_data.hasOwnProperty('kid') ) {
      view_data['kid'] = 'KID' + view_data['kid'];
    }

    // 差分を求める
    for ( var i in view_data ) {

      if (
        ( before[i] && before[i] !== '' ) ||
        ( view_data[i] && view_data[i] !== '' )
      ) {
        if ( view_data[i] !== before[i] ) {
          result[i] = view_data[i];
        }
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
  _model._diffUpdated = function ( kids_id, update_data ) {
    var
      before = _model.find({'id' : kids_id})[0]
    , after  = {}
    , list_history = []
    ;

    for ( var i in update_data ) {

      list_history.push({
        kids_id      : kids_id,
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

    if ( update_data.hasOwnProperty('kid') ) {
      update_data.kid = update_data.kid.substr(-5,5);
    }

    // updateする対象が存在する場合
    if ( _.keys(update_data).length > 0 ) {

      // データの更新
      customer.db.post('/update', {
        data      : update_data,
        condition : {'id' : view_data['id']},
        table     : this['config']['table']
      })
      .then( cms.view.kids.refresh );

    }

    // クライアント数に変更あった場合も更新する
    if ( _.keys(historyData).length > 0 ) {

      // 履歴の更新
      this._updateHistory( this._diffUpdated( view_data['id'], historyData ) );

      // 再描画
      cms.view.homeNotices.refresh();

    }

    // 履歴テーブルの再描画
    customer.model.userHistory.fetch( view_data['id'],
      customer.view.userHistory.drawTable
    );

  };

  getPageList = function ( callback ) {

    if ( typeof callback === 'function' ) {
      callback( _page.getPageList() );
    }
    else {
      return _page.getPageList();
    }
  };

  register = function ( obj ) {

    var kids_id = _model.find({ kid : obj.kid })[0].id;

    // 先頭のKIDを取り除く
    obj.kid = obj.kid.substr(-5,5);

    return customer.db.post('/update', {
      data  : obj,
      condition : { 'id' : kids_id },
      table : 'kids'
    });

  };

  /*public method*/
  cms.model.kids = {
    initModule   : initModule,
    fetch        : fetch,
    getCache     : $.proxy( _model.getCache, _model ),
    getData      : getCache,
    find         : $.proxy( _model.find,     _model ),
    delete       : $.proxy( _model.delete,   _model ),
    getFilter    : function ()  { return _model.getFiltered(); },
    getCondition : getCondition,
    setCondition : setCondition,
    sortByCol    : sortByCol,
    getHeader    : getHeader,
    update       : $.proxy( _model.update, _model ),
    check        : $.proxy( _model._checkWhatsUpdated, _model ),
    register     : register,
    search       : search,
    nextPage     : $.proxy( _page.next, _page ),
    prevPage     : $.proxy( _page.prev, _page ),
    getPage      : $.proxy( _page.get, _page ),
    getPageIndex : $.proxy( _page.getIndex, _page ),
    getPageList  : getPageList,
    getConditionAll : getConditionAll,
    getHeader    : getHeader
  };

}( jQuery, customer ));