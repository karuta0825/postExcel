
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
    fetch : $.proxy( _model.fetch, _model )
  };

}( jQuery, customer ));