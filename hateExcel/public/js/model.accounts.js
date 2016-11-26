
/**
 * クライアント情報モデル
 *  
 */
customer.model = customer.model || {};
customer.model.accounts = ( function () {

  /*member*/
  var 
    _accounts,
    getAccounts,
    getAccontsByKid
    ;


  getAccontsByKid = function ( kid ) {

  };

  getAccounts = function ( kid ) {
    return customer.db.select('', kid )[0];
  };

  return {
    getAccontsByKid : getAccontsByKid,
    getAccounts     : getAccounts
  };

}());