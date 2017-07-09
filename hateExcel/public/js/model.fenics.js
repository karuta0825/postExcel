/**
 * Fenicsリストモデル
 * Ajax Defferedのテスト用にする
 */

( function ( $, cms ) {

  var
    // member
    config = {
      table : 'all_fenics'
    }
  , _model = new Model( config )
  , vl = new util.Validate({
      'id'         : 'noCheck',
      'kid'        : 'noCheck',
      'fenics_key' : 'noCheck',
      'fenics_id'  : 'isAlphaNum',
      'fenics_ip'  : 'isIp',
      'password'   : 'isAlphaNum',
      'start_on'   : 'noCheck',
      'end_on'     : 'noCheck',
      'is_mobile'  : 'noCheck',
      'create_on'  : 'noCheck'
    })
  // public method
  , initModule
  , validate
  , update
  ;

  validate = function ( view_data ) {

    return vl.validate( view_data );

  };

  // 成功時と失敗時のコールバックを引数にすることで
  // viewの負担が減る
  update = function ( view_data, cb_success, cb_fail ) {

    var
      errs = validate( view_data );

    if ( errs && errs.length > 0 ) {
      cb_fail( errs );
      return;
    }

    cms.db.post('/isUniqueIp', { ip : view_data['fenics_ip']})
    .then( function (result) {

      if ( result.length > 0 ) {

        cb_fail( ['fenics_ip'] );

      }
      else {

        cms.db.post('/updateFenics', { data : [view_data] })
        .then( function () {
          _model.fetchAsync( null, cms.view.fenics.drawTable );
        })
        .then ( function (result) {
          cb_success();
        })
        .fail( function (err) {
          throw Error(err);
        });

      }

    });

  };

  initModule = function () {
    _model.fetchAsync();
  };

  // to public
  cms.model.fenics = {
    initModule : initModule,
    validate   : validate,
    update     : update,
    fetch      : $.proxy( _model.fetchAsync, _model),
    getCache   : $.proxy( _model.getCache, _model ),
    find       : $.proxy( _model.find, _model )
  };

} ( jQuery, customer ));