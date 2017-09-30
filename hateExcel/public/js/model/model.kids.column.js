(function ( $, cms ) {

  var
    _model = new Model({'table' : 'header'})
  , setShowColumn
  , getColumn
  , getCache
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

  cms.model.kidsColumn = {
    fetch : $.proxy( _model.fetchAsync, _model ),
    getCache : getCache,
    setShowColumn : setShowColumn,
    getColumn : getColumn
  };


}( jQuery, customer ));