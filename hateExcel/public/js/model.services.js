/**
 * サービスマスタ+ユーザライセンスモデル
 *
 */
( function ( $, cms ) {

  /*member*/
  var
    _model = new Model({ table : 'services' })
  , getCache
  , initModule
  ;

  initModule = function () {
    _model.fetch();
  };


  // to public
  cms.model.services =  {
    initModule : initModule,
    fetch      : $.proxy( _model.fetch, _model ),
    getCache   : $.proxy( _model.getCache, _model ),
    find       : $.proxy( _model.find, _model )
  };

}( jQuery, customer ));