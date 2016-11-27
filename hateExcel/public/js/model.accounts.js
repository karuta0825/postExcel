
/**
 * クライアント情報モデル
 *  
 */
customer.model = customer.model || {};
customer.model.accounts = ( function () {

  /*member*/
  var 
    _accounts,
    getAccounts
    ;


  getAccounts = function ( kid ) {
    _accounts = customer.db.select('/accounts', kid );
    console.log(_accounts);
    return _accounts;
  };

  return {
    getAccounts     : getAccounts
  };

}());