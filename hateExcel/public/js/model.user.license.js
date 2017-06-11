/**
 * ライセンスモデル
 */

( function ( $, cms ) {

  var
    _model = new Model({ 'table' : 'licenses'})
  , initModule
  ;


  _model.update = function ( view_data, callback ) {

    var update_data = this._checkWhatsUpdated( view_data );

    // updateする対象が存在する場合
    if ( _.keys(update_data).length > 0 ) {

      // データの更新
      customer.db.update('/update', {
        data      : view_data,
        condition : {'kid' : this['_cache'][0]['kid']},
        table     : this['config']['table']
      });

      // 履歴の更新
      this._updateHistory( this._diffUpdated( update_data ) );

      // 再描画
      if ( typeof callback === 'function' ) {
        callback( this.fetch( this['_cache'][0]['kid']) );
      }

      // 履歴テーブルの再描画
      customer.model.userHistory.fetch( this['_cache'][0]['kid'],
        customer.view.userHistory.drawTable
      );

    }

  };

  /**
   * [_diffUpdated description]
   * @override
   */
  _model._diffUpdated = function ( update_data ) {
    var
      before = {}
    , after  = {}
    , list_history = []
    , msg = {}
    , cache = this.getCache()[0]
    ;

    for ( var i in update_data ) {

      if ( cache[i] === 1 && update_data[i] === 0 ) {
        msg.type = '削除';
      }
      else {
        msg.type = '追加';
      }

      list_history.push({
        kid          : cache['kid'],
        type         : msg.type,
        content_name : 'サービス',
        item_name    : i,
        before       : cache[i],
        after        : update_data[i]
      });

    }

    return list_history;

  };

  // to public
  cms.model.userLicense = {
    fetch    : $.proxy( _model.fetch, _model ),
    find     : $.proxy( _model.find, _model ),
    getCache : $.proxy( _model.getCache, _model ),
    update   : $.proxy( _model.update, _model ),
    register : $.proxy( _model.initUpdate, _model)
  };

}( jQuery, customer ))