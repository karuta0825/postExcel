/**
 * ネットワーク情報モデル
 */

( function ( $, cms ) {

  var
    _model = new Model({
      'table' : 'fenics'
    })
  , makeFenicsDownloadMap
  ;


  makeFenicsDownloadMap = function ( check_list ) {

    var user_name    = cms.model.userBaseInfo.getCache().user_name;
    var partner_name = cms.model.userPartner.getCache().name;
    var server       = cms.model.userBaseInfo.getCache().server;
    var list_fenics  = _model.find( check_list );

    return _.map( list_fenics, function ( val, key ) {
      return {
        'A' : 'A',
        'B' : 'hopecl-',
        'C' : val.fenics_id,
        'D' : val.password,
        'E' : 'お客様　システム１',
        'F' : val.start_on,
        'G' : user_name,
        'H' : 'パートナー　' + partner_name,
        'I' : 'システム１　' + server,
        'J' : 2
      };
    });

  };

  cms.model.userNetwork = {
    fetch        : $.proxy( _model.fetch, _model ),
    getCache     : $.proxy( _model.getCache, _model),
    delete       : $.proxy( _model.delete, _model ),
    find         : $.proxy( _model.find, _model ),
    makeList     : makeFenicsDownloadMap
  };

}( jQuery, customer ));

