customer.view = customer.view || {};
customer.view.accounts = ( function () {


  var
    jqueryMap = {},

    // private method
    _setJqueryMap,
    _onClickDownLoad,
    _loadHtml,

    // public method
    drawTable,
    showTable,
    hideTable,
    initModule
    ;

    _loadHtml = function () {
      customer.db.getHtml('template/accounts.html');
    };

    _setJqueryMap = function () {
      var
        $table = $('#detail-accounts table'),
        $header = $table.find('thead'),
        $body   = $table.find('tbody')
        ;

      jqueryMap.$table = $table;
      jqueryMap.$header = $header;
      jqueryMap.$body = $body;

    };

    drawTable = function ( map_kid ) {
      if ( jqueryMap.$table ) {
        jqueryMap.$table.remove();
      }
      var
       data     = { list : customer.model.accounts.getAccounts( map_kid ) },
       tmpl     = customer.db.getHtml('template/accounts.html'),
       complied = _.template( tmpl )
       ;
      $('#detail-accounts').append( complied( data ) );
      _setJqueryMap();
    };

    redrawTable = function ( map_kid ) {
      jqueryMap.$table.remove();
      drawTable( map_kid );
    };

    showTable = function () {
      jqueryMap.$table.show();
    }

    hideTable = function () {
      jqueryMap.$table.hide();
    };

    initModule = function () {
    };

    return {
      initModule : initModule,
      drawTable  : drawTable,
      showTable  : showTable,
      hideTable  : hideTable,
    };


}());