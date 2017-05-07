
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
    _accounts = customer.db.select('/select', {
     condition : [ kid ],
     'table' : 'accounts'
    });
    return _accounts;
  };

  return {
    getAccounts     : getAccounts,
  };

}());