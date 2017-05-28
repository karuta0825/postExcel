/**
 * ライセンスモデル
 */

( function ( $, cms ) {

  var
    _model = new Model({ 'table' : 'licenses'})
  , initModule
  ;


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
    getCache : $.proxy( _model.getCache, _model )
  };

}( jQuery, customer )) 