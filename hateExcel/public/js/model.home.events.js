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
      'message'    : 'noCheck'
    })
  , validate
  , insert
  , update
  , remove
  ;

  insert = function ( data, cb_success, cb_fail ) {

    var errors = vl.validate( data );

    if ( errors.length > 0 ) {
      cb_fail(errors);
      return;
    }

    // cms.db.insert('/insert', params, function () {
    // _model.fetch(null, cb_success )
    // });

  };

  update = function ( data, callback ) {

    var clone = _.clone( data );

    delete clone.id;

    var param = {
      data      : clone,
      condition : { id : data.id },
      table     : 'events'
    };

    cms.db.update('/update', param, function () {
      _model.fetch( null, callback );
    });


  };

  remove = function ( id, callback ) {

    var param = {
      data : [{ id : id }],
      table : 'events'
    };

    cms.db.remove('/delete', param, function () {
      _model.fetch( null, callback );
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