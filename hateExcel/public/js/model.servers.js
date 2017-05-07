/**
 * サーバモデル
 */
( function ( $, cms ) {

  /* member */
  var
    _model = new Model({
      table : 'servers'
    })
  , initModule
  ;

  initModule = function () {
    _model.fetch();
  };


  /* to public */
  cms.model.servers = {
    initModule : initModule,
    getServers : $.proxy( _model.getCache, _model ),
    find       : $.proxy( _model.find, _model ),
    tmp : function () { return _model;}
  };


}( jQuery, customer ));