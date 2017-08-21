
(function ( $, cms ) {

  var
    _model = new Model({'table' : 'login_user'})
  , _vl = new util.Validate({
      name  : 'isEmpty',
      pass1 : 'isEmpty',
      pass2 : 'isEmpty'
     })
  , update
  ;

  update = function ( data, cb_success, cb_fail ) {

    var
      errs = _vl.validate(data)
    , params
    ;

    // 入力エラー
    if (errs && errs.length > 0 ) {
      cb_fail(errs);
      return;
    }

    // パスワードが一致しない場合
    if ( data.pass1 !== data.pass2 ) {
      cb_fail(['pass1','pass2']);
      return;
    }

    params = {
      'data'  : { name : data.name, password : data.pass1 }
    };

    cms.db.post('/updateLogin', params )
    .then( function () {
      return _model.fetchAsync();
    })
    .then( function (r) {
      cb_success(r);
    });

  };

  cms.model.loginUser = {
    fetch    : $.proxy( _model.fetchAsync, _model ),
    getCache : $.proxy( _model.getCache, _model ),
    update   : update
  };

}( jQuery, customer ));