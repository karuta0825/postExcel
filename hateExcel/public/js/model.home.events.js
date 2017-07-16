/**
 * イベントモデル
 */

( function ( $, cms ) {

  var
    config = {
      'table' : 'events'
    }
  , _model = new Model(config)
  ;

  // to public
  cms.model.homeEvents = {
    fetch    : $.proxy( _model.fetch, _model ),
    getCache : $.proxy( _model.getCache, _model ),
    find     : $.proxy( _model.find, _model ),
    update   : $.proxy( _model.update, _model )
  };

} ( jQuery, customer ));