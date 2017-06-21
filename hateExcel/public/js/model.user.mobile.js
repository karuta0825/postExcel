/**
 * モバイル情報
 */

(function ( $, cms ) {

  var
    _model = new Model({'table' : 'mobiles'})
  ;

  // to public
  cms.model.userMobile = {
    fetch : $.proxy( _model.fetch, _model ),
    getCache : $.proxy( _model.getCache, _model )
  };

}( jQuery, customer ));