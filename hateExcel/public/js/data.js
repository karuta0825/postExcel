var customer;
customer =  customer || {};
customer.db = ( function (){

  var 
    configMap, data, getData,
    _ajaxPost, _ajaxGet,
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

  getData = function () {
    return JSON.parse(data);
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
    _ajaxGet  : _ajaxGet,
    selectAll : selectAll,
    select    : select,
    insert    : insert,
    update    : update,
    remove    : remove,
    getData   : getData
  };

}());