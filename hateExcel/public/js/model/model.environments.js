/**
 * システム環境
 */

( function ( $, cms ) {


  var
    _model = new Model({
      'table' : 'environments'
    })
  , initModule
  ;

  initModule = function () {
    _model.fetch();
  };

  // to public
  cms.model.environments = {
    initModule : initModule,
    find  : $.proxy( _model.find, _model ),
    getCache : $.proxy( _model.getCache, _model )
  };


}( jQuery, customer ))