/**
 * ネットワーク情報モデル
 */

( function ( $, cms ) {

  var
    _model = new Model({
      'table' : 'fenics'
    })
  , _makeNextUser
  , makeUserList
  ;

  // updateするときどうするか？
  // insertだな
  var insert_obj = {
    kid        : 'fix',
    fenics     : 'fix',
    fenics_id  : 'calc in clinet',
    password   : 'same_above',
    fenics_ip  : 'calc in server'
  };

  // 一つだったら最後から
  // 複数だったら、

  _makeNextUser = function ( last_user ) {
    var next_user;

    next_user = {
        'kid'        : last_user.kid,
        'fenics_key' : last_user.fenics_key,
        'fenics_id'  : util.getNextZeroPadData( last_user.fenics_id ),
        'password'   : util.getNextZeroPadData( last_user.fenics_id )
    };

    return next_user;

  };

  makeUserList = function ( number ) {
    var
      list = []
    , next_user
    ;

    if ( _model.getCache().length === 0 ) {
      var obj = cms.model.userBaseInfo.getCache();

      if ( !obj.fenics_key ) {
        alert('feincs keyがないため作成できません')
        return;
      }

      next_user = {
        'kid'        : obj.kid,
        'fenics_key' : obj.fenics_key,
        'fenics_id'  : obj.fenics_key + '0001',
        'password'   : obj.fenics_key + '0001'
      };

    }
    else {
      next_user = _makeNextUser( _.last( _model.getCache() ) )
    }

    list.push( next_user );

    if ( !number ) {
      return list;
    }

    if ( number < 1 ) {
      return;
    }

    if ( number === 1 ) {
      return list;
    }

    if ( number > 1 ) {
      for ( var i = 1; i < number; i+=1 ) {
        list.push( _makeNextUser( next_user ));
        next_user = _makeNextUser( next_user );
      }
      return list;
    }

  };

  cms.model.userNetwork = {
    fetch        : $.proxy( _model.fetch, _model ),
    getCache     : $.proxy( _model.getCache, _model),
    makeUserList : makeUserList,
    delete       : $.proxy( _model.delete, _model )
  };

}( jQuery, customer ));

