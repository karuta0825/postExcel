/**
 * システム環境
 */

( function ( $, cms ) {


  var
    _model = new Model({
      'table' : 'environments'
    })
  , getNames
  , initModule
  ;

  getNames = function () {
    return _.chain( _model.getCache() )
            .pluck('name')
            .uniq()
            .value()
            ;
  };

  initModule = function () {
    _model.fetch();
  };

  // to public
  cms.model.environments = {
    initModule : initModule,
    find : $.proxy( _model.find, _model ),
    getCache : $.proxy( _model.getCache, _model ),
    getNames : getNames
  };


}( jQuery, customer ))