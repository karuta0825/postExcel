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
  , _headerMap = {}
  , _condition = {
      system_type : 'all',
      version     : 'all',
      server      : 'all',
      has_mobile  : 'all',
      has_busiv   : 'all',
      has_fenics  : 'all'
    }
    /*private method*/
  , _sortOrder = 1
    /*public  method*/
  , sortByCol
  , setCondition
  , getCondition
  , getHeader
  , register
  , initModule
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

  getCondition = function ( callback ) {

    if ( typeof callback === 'function' ) {
      _model.find( _condition, callback );
    }
    else {
      return _model.find( _condition );
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
        cms.model.userBaseInfo.fetch(view_data['kid']);
        callback( this.find( { 'kid' : view_data['kid'] } )[0] );
      }
    }

    // 履歴テーブルの再描画
    customer.model.userHistory.fetch( view_data['kid'],
      customer.view.userHistory.drawTable
    );

  };

  register = function ( obj, callback ) {

    var kid = obj.kid;
    delete obj.kid;

      customer.db.update('/update', {
        data      : obj,
        condition : {'kid' : kid },
        table     : _model['config']['table']
      }, callback );

  };

  /*public method*/
  cms.model.kids = {
    initModule   : initModule,
    fetch        : $.proxy( _model.fetch,    _model ),
    getData      : $.proxy( _model.getCache, _model ),
    find         : $.proxy( _model.find,     _model ),
    delete       : $.proxy( _model.delete,   _model ),
    getCondition : getCondition,
    setCondition : setCondition,
    sortByCol    : sortByCol,
    getHeader    : getHeader,
    update       : $.proxy( _model.update, _model ),
    check        : $.proxy( _model._checkWhatsUpdated, _model ),
    register     : register
  };

}( jQuery, customer ));