/**
 * 履歴モデル
 *
 */

( function ( $, cms ) {

  var
  　 _model = new Model({
      'table' : 'usrHistorys'
    })
  ;

  // to public
  cms.model.userHistory = {
    fetch    : $.proxy( _model.fetchAsync,    _model ),
    getCache : $.proxy( _model.getCache, _model ),
    find     : $.proxy( _model.find, _model )
  };

}( jQuery, customer ));