/**
 * 履歴テーブル
 */

( function ( $, cms ) {

  var
    _model = new Model({
      table : 'historys'
    })
  , _is_end = false
  , initModule
  , makeNews
  , getMore
  ;

  initModule = function () {
    _model.fetch();
  };

  makeNews = function ( list_item ) {

    return _.map( list_item, function ( val, key ) {

      if ( val.type === '新規') {
        val.className = 'state state--primary'
        val.msg = val.kid + 'の' + val.item_name + ':' + val.after
      }
      else if ( val.type === '追加') {
        val.className = 'state state--info'
        val.msg = val.kid + 'に' + val.item_name + 'が追加されました'
      }
      else if ( val.type === '削除') {
        val.className = 'state state--danger'
        val.msg = val.kid + 'の' + val.item_name + 'が削除されました'
      }
      else {
        val.className = 'state state--warning'
        val.msg = val.kid + 'の' + val.item_name + 'が' + val.after + 'に更新されました'
      }

      return val;

    });
  };

  /**
   * 次があるかどうかわからないよ
   */
  getMore = function ( callback ) {

    if ( _is_end ) {
      console.log('読み込むデータがありません')
      return;
    }

    var last_id = _.last( _model.getCache(), 1)[0].id;

    var list = customer.db.select('/select', {
      'condition' : [ last_id ],
      'table' : 'moreHistorys'
    });

    if ( list.length < 11 ) {
      _is_end = true;
      if ( typeof callback === 'function' ) {
        // 追加
        _model.union( list );
        callback( _model.getCache() );
      }
      else {
        // 追加
        _model.union( list );
        return _model.getCache();
      }
    }
    else {
      if ( typeof callback === 'function' ) {
        // 追加
        _model.union( list.slice(0,10))
        callback( _model.getCache() );
      }
      else {
        // 追加
        _model.union( list.slice(0,10) )
        return _model.getCache();
      }
    }

  };

  // to public
  cms.model.historys = {
    initModule : initModule,
    fetch      : $.proxy( _model.fetch, _model ),
    getMore    : getMore,
    getCache   : function () { return makeNews( _model.getCache() );},
    isEnd      : function () { return _is_end; },
    makeNews   : makeNews
  };

} ( jQuery, customer ))