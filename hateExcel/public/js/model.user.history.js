/**
 * 履歴モデル
 *
 */

( function ( $, cms ) {

  var
    _cache
  , fetch
  , getCache
  , _model = new Model({
      'table' : 'usrHistorys'
    })
  ;

  // to public
  cms.model.userHistory = {
    fetch    : $.proxy( _model.fetch,    _model ),
    getCache : $.proxy( _model.getCache, _model )
  };

}( jQuery, customer ));