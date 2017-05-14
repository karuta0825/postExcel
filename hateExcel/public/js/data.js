var customer = {
  model : {},
  view  : {}
};

customer.db = ( function (){

  var
    configMap, data, getData,
    _ajaxPost, _ajaxGet, ajaxHtml,
    selectAll, select,
    insert,    update, remove
  ;

  _ajaxGet = function ( url ) {
   var result = $.ajax({
      dataType : 'json',
      url      : url,
      async    : false,
      success  : function ( result ) {
      }
    }).responseText;
   // data = result;
   return result;
  };

  ajaxHtml = function ( url ) {
     var result = $.ajax({
        dataType : 'text',
        url      : url,
        async    : false,
        success  : function ( result ) {
        },
        error    : function ( XMLHttpRequest ) {
          console.log(XMLHttpRequest);
        }
      }).responseText;
     return result;
  };


  _ajaxPost = function ( url, data, callback ) {
    var result = $.ajax({
      dataType: 'json',
      type    : 'post',
      url     : url,
      async   : false,
      data    : data,
      success : function ( result ) {
        if ( typeof callback === 'function' ) {
          callback( result );
        }
      }
    }).responseText;
    return result;
  };

  selectAll = function ( url ) {
    return JSON.parse( _ajaxGet( url ) ) ;
  };

  select    = function ( url, params ) {
    return JSON.parse( _ajaxPost( url, params ));
  };

  insert    = function ( url, params, callback ) {
    _ajaxPost( url, params, callback );
  };

  update    = function ( url, params, callback ) {
    _ajaxPost( url, params, callback );
  };

  remove    = function ( url, params, callback ) {
    _ajaxPost( url, params, callback );
  };

  return {
    getHtml   : ajaxHtml,
    selectAll : selectAll,
    select    : select,
    insert    : insert,
    update    : update,
    remove    : remove
  };

}());