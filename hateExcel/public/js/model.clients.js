
/**
 * クライアント情報モデル
 *
 */
( function ( $, cms ) {

  /*member*/
  var
    _model = new Model({
      'table' : 'clients'
    })
  ;

  // to public
  cms.model.clients = {
    fetch    : $.proxy( _model.fetch, _model ),
    getCache : $.proxy( _model.getCache, _model),
    find     : $.proxy( _model.find, _model ),
    insert   : $.proxy( _model.insert, _model )
  };

}( jQuery, customer ));