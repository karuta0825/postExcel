/**
 * ビジV情報
 */

( function ( $, cms ) {

  var
    _model = new Model({'table' : 'busivs'})
  ;

  // to public
  cms.model.userBusiv = {
    fetch    : $.proxy( _model.fetch, _model ),
    getCache : $.proxy( _model.getCache, _model)
  };

}( jQuery, customer ));