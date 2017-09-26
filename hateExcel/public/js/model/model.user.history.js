/**
 * 履歴モデル
 *
 */

( function ( $, cms ) {

  var
    _model = new Model({
      'table' : 'usrHistorys'
    })
  , remove
  ;

  remove = function ( hid, callback ) {

    var params = {
      table : 'usrHistorys',
      data  : [{'id' : hid }]
    };

    return cms.db.post('/delete', params )
    .then( function () {
      _model.fetchAsync( cms.model.userBaseInfo.getCache().id, callback )
    })
    .catch( function (r) {
      cms.view.dialogAlert.open(r);
    });

  };

  // to public
  cms.model.userHistory = {
    fetch    : $.proxy( _model.fetchAsync, _model ),
    getCache : $.proxy( _model.getCache, _model ),
    find     : $.proxy( _model.find, _model ),
    remove   : remove
  };

}( jQuery, customer ));