( function ( $, cms ) {

  var
    _model = new Model({ 'table' : 'login_users' })
  , _selected
  , update
  , setUser
  ;

  setUser = function ( id ) {
    _selected = Number(id);
  };

  update = function ( data, callback ) {

    var params = {
      data : { id : _selected }
    };

    switch ( data ) {
      case 'non-register' :
        params['data']['newadd']   = 1;
        params['data']['is_admin'] = 0;
        break;
      case 'normal' :
        params['data']['newadd']   = 0;
        params['data']['is_admin'] = 0;
        break;
      case 'admin' :
        params['data']['newadd']   = 0;
        params['data']['is_admin'] = 1;
        break;
      default :
        break
    }

    cms.db.post('/updateLogin', params )
    .then( function () {
      return _model.fetchAsync();
    })
    .then( function (r) {
      callback(r);
    });

  };

  cms.model.loginUsers =  {
    fetch    : $.proxy( _model.fetchAsync, _model ),
    getCache : $.proxy( _model.getCache, _model ),
    update   : update,
    find     : $.proxy( _model.find, _model ),
    setUser  : setUser
  };

}( jQuery, customer ))