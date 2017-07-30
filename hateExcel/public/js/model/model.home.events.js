/**
 * イベントモデル
 */

( function ( $, cms ) {

  var
    config = {
      'table' : 'events'
    }
  , _model = new Model(config)
  , vl = new util.Validate({
      'title'      : 'isEmpty',
      'start_on'   : 'isEmpty',
      'start_time' : 'noCheck',
      'message'    : 'noCheck',
      'is_finished' : 'noCheck'
    })
  , validate
  , insert
  , update
  , remove
  ;

  insert = function ( month, data, cb_success, cb_fail ) {

    var
      errors = vl.validate( data )
    , params = {
        table : 'events',
        data  : [data]
      }
    ;

    if ( errors.length > 0 ) {
      cb_fail(errors);
      return;
    }

    cms.db.post('/insert', params )
    .then( function () {
      _model.fetch( month , cb_success );
    });

  };

  update = function ( month, data, cb_success, cb_fail ) {

    var
      clone = _.clone( data )
    , params
    , errors
    ;

    delete clone.id;

    errors = vl.validate( clone );

    if ( errors.length > 0 ) {
      cb_fail( errors );
      return;
    }

    param = {
      data      : clone,
      condition : { id : data.id },
      table     : 'events'
    };

    cms.db.update('/update', param, function () {
      _model.fetch( month, cb_success );
    });


  };

  remove = function ( month, id, callback ) {

    var param = {
      data : [{ id : id }],
      table : 'events'
    };

    cms.db.remove('/delete', param, function () {
      _model.fetch( month, callback );
    });

  };



  // to public
  cms.model.homeEvents = {
    fetch    : $.proxy( _model.fetch, _model ),
    getCache : $.proxy( _model.getCache, _model ),
    find     : $.proxy( _model.find, _model ),
    insert   : insert,
    remove   : remove,
    update   : update
  };

} ( jQuery, customer ));