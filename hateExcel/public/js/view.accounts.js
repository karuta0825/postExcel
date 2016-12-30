

customer.view = customer.view || {};
customer.view.accounts = ( function () {


  var 
    jqueryMap = {},

    // private method
    _setJqueryMap,
    _onClickDownLoad,
    _loadHtml,

    // public method
    showTalble,
    hideTable,

    _loadHtml = function () {
      customer.db.getHtml('template/accounts.html');
    };

    _setJqueryMap = function () {

    };

    showTalble = function () {
      var
       data     = { list : customer.model.accounts.getAccounts() },
       tmpl     = customer.db.getHtml('template/accounts.html'),
       complied = _.template( tmpl )
       ;

      // $().append( complied( data ) );
    };

    hideTable = function () {

    };


});