
(function ( $, cms ) {

  var
    config = {'table' : 'memo_templates'}
  , _model = new Model(config)
  , _selected
  , _vl = util.Validate({
      'id'    : 'noCheck',
      'title' : 'isEmpty',
      'msg'   : 'isEmpty'
    })
  , find
  , insert
  , update
  , remove
  ;

  setSelectedItem = function ( id ) {
    _selected = id;
  };

  getSelectedItem = function () {
    return _selected;
  };

  find = function ( condition, callback ) {

    setSelectedItem(condition.id);

    return _model.find( condition, callback );

  };

  insert = function ( data, cb_success, cb_fail ) {

    var errs = _vl.validate(data);

    if ( errs && errs.length > 0 ) {
      cb_fail(errs);
      return;
    }

    return cms.db.post('/insert', {
      'data'  : [data],
      'table' : 'memo_templates'
    })
    .then( function () {
      cb_success();
    })
    ;


  };

  update = function ( data, cb_success, cb_fail ) {

    var
      id   = getSelectedItem()
    , errs = _vl.validate(data)
    , params
    ;

    if ( errs && errs.length > 0 ) {
      cb_fail(errs);
      return;
    };

    params = {
      data      : data,
      condition : { id : id },
      table     : 'memo_templates'
    };

    cms.db.post('/update', params )
    .then( function () {
      cb_success();
    })
    ;

  };

  remove = function ( callback ) {

    // 対象を見つける
    var id = getSelectedItem();

    params = {
      data  : [{ id : id }],
      table : 'memo_templates'
    };

    cms.db.post('/delete', params )
    .then( function () {
      return _model.fetch();
    })
    .then( function (r) {

      if ( r.length > 0 ) {
        callback( r );
        setSelectedItem( r[0].id );
      }

    })
    ;

  };

  cms.model.memoTemplate = {
    fetch           : $.proxy( _model.fetchAsync, _model ),
    getCache        : $.proxy( _model.getCache, _model ),
    find            : find,
    insert          : insert,
    update          : update,
    remove          : remove,
    setSelectedItem : setSelectedItem,
    getSelectedItem : getSelectedItem
  };

}( jQuery, customer ))