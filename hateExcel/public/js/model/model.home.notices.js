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
  , getMore
  ;

  /**
   * お知らせ情報を10件をさらに読み込む
   * @param  {Function} callback
   * @return {Promise}
   */
  getMore = function ( callback ) {

    if ( _is_end ) {
      console.log('読み込むデータがありません')
      return;
    }

    var last_id = _.last( _model.getCache(), 1)[0].id;

    return customer.db.post('/select', {
      'condition' : [ last_id ],
      'table' : 'moreHistorys'
    })
    .then(function(r){

      if ( r.length < 11 ) {
        _is_end = true;
      }

      if ( typeof callback === 'function' ) {
        // 追加
        _model.union( r );
        callback( _model.getCache() ) ;
      }
      else {
        // 追加
        _model.union( r );
        return _model.getCache();
      }

    });

  };

  // to public
  cms.model.homeNotices = {
    fetch      : $.proxy( _model.fetchAsync, _model ),
    getCache   : $.proxy( _model.getCache, _model ),
    find       : $.proxy( _model.find, _model ),
    getMore    : getMore,
    isEnd      : function () { return _is_end; }
  };

} ( jQuery, customer ))