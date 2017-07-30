/**
 * サーバー収容可能テーブル用のモデル
 */


( function ( $, cms ) {

  var
    _model = new Model({'table' : 'available_number_in_each_server'})
  , initModule
  ;

  initModule = function () {
    _model.fetch();
  };

  // to public
  cms.model.homeServerTable = {
    initModule : initModule,
    fetch      : $.proxy( _model.fetch, _model ),
    find       : $.proxy( _model.find, _model ),
    getCache   : $.proxy( _model.getCache, _model )
  };

} ( jQuery, customer ));