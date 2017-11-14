(function ( $, cms ) {

  var
    _model = new Model({'table' : 'header'})
  , setShowColumn
  , getColumn
  , getCache
  , update
  ;

  setShowColumn = function ( column, is_show ) {

    var obj = getCache();

    obj[column] = is_show;

  };

  getColumn = function ( column ) {

    return getCache()[column];

  };

  getCache = function () {
    return _model.getCache()[0] || [];
  };

  update = function () {

    var clone = _.clone( getCache() );
    delete clone.uid;

    var params = {
      'data' : clone
    };

    return cms.db.post('/columns', params );

  };

  cms.model.kidsColumn = {
    fetch : $.proxy( _model.fetchAsync, _model ),
    getCache : getCache,
    setShowColumn : setShowColumn,
    getColumn : getColumn,
    update : update
  };


}( jQuery, customer ));