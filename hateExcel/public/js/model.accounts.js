
/**
 * クライアント情報モデル
 *
 */
( function ( $, cms ) {

  /*member*/
  var
    _model = new Model({
      'table' : 'accounts'
    })
  ;

  // to public
  cms.model.accounts = {
    getAccounts : $.proxy( _model.fetch, _model )
  };

}( jQuery, customer ));