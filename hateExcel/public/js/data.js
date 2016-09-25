var customer;
customer =  customer || {};
customer.db = ( function (){

  var 
    configMap, data, getData,
    _ajaxPost, _ajaxGet, _ajaxHtml,
    selectAll, select,
    insert,    update, remove
  ;

  _ajaxGet = function ( url ) {
   var result = $.ajax({
      dataType : 'json',
      url      : url,
      async    : false,
      success  : function ( result ) {
        // return result;
      }
    }).responseText;
   // data = result;
   return result;
  };

  _ajaxHtml = function ( url, callback ) {
    $.ajax({
      dataType: 'text',
      url     : url,
      success : function ( result ) {
        callback(result);
      },
      error   :  function ( XMLHttpRequest ) {
        console.log(XMLHttpRequest.responseText);
      }
    });
  };


  _ajaxPost = function ( data, add_del ) {
    $.ajax({
      dataType: 'json',
      type    : 'post',
      url     : add_del,
      data    : data,
      success : function ( data ) {
        console.log('success');
      },
      error   :  function ( XMLHttpRequest ) {
        console.log(XMLHttpRequest.responseText);
      }
    });
  };

  selectAll = function ( url ) {
    return JSON.parse( _ajaxGet( url ) ) ; 
  };

  select    = function ( params ) {
  };

  insert    = function ( params ) {
    _ajaxPost( params, 'add' );
  };

  update    = function ( params ) {
    _ajaxPost( params, 'update');
  };

  remove    = function ( params ) {
    _ajaxPost( params, 'delete' );
  };

  return {
    _ajaxHtml : _ajaxHtml,
    selectAll : selectAll,
    select    : select,
    insert    : insert,
    update    : update,
    remove    : remove
  };

}());