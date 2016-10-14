customer.view = customer.view || {};
customer.view.kids = ( function () {


  var 
    /*private member*/
    jqueryMap = {}, _model,

    /*private method*/
    _setJqueryMap,   _showTable, 
    _onClickColName, _onClickAccountNumber,

    /*public method*/
    redrawTable,   updateTable,
    initModule
  ;

  var view = {
    kid     : true,
    server : true,
    genics  : true,
    userkey : true,
    account_number : true
  };

  _setJqueryMap = function () {
    var $table  = $('.table'),
        $header = $table.find('thead'),
        $body   = $table.find('tbody')
    ;

    jqueryMap.$table  = $table;
    jqueryMap.$header = $table.find('th');
    jqueryMap.$body   = $table.find('tbody');
    jqueryMap.$row    = $table.find('tr');
    jqueryMap.$col    = { 
      kid            : $body.find('.kid'),
      sever          : $body.find('.server'),
      genics         : $body.find('.genics'),
      userkey        : $body.find('.userkey'),
      author         : $body.find('.author'),
      account_number : $body.find('.account_number')
    };
  };

  /**
   * テーブル描画
   * @param  {Array} data - data get DB
   */
  _showTable = function ( data ) {
    var
      data     =  { list : data },
      tmpl     = $('#template').html(),
      complied = _.template( tmpl )
    ;
    $('tbody').append( complied( data ) );
  };

  /**
   * 並び替えイベント登録-列名クリック時
   */
  _onClickColName = function () {
    _.each( view, function ( val, key ) {
      $('thead .' + key ).on( 'click', function () {
        // customer.model.sortByCol( key, redrawTable );
        _model.sortByCol( key, redrawTable );
      })
    });
  };

  /**
   * 詳細情報表示イベント登録-アカウント数クリック時
   * @return {[type]}
   */
  _onClickAccountNumber = function () {
    _.each( jqueryMap.$col.account_number, function (val , key) {
      $(val).on('click', function () {
        console.log($(this).parent()[0]);
      });
    });
  };

  /**
   * 
   * @param  {[type]} col
   * @param  {[type]} data
   * @return {[type]}
   */
  updateTable = function ( col, data ) {
    var rows   = jqueryMap.$row;
    $(rows).remove();
    _showTable( data );
    _setJqueryMap();
    _onClickAccountNumber();
  };

  /**
   * データの並び替えと表示
   * @param  {[type]} col
   * @param  {[type]} data
   */
  redrawTable = function ( col , data ) {

    // 行数取得
    var rows = jqueryMap.$row;

    rows.each( function ( key, val ) {
      $(val).attr('id', 'id' + data[key].id );
      $(val).find('.kid'           ).empty().append( data[key].kid        );
      $(val).find('.server'        ).empty().append( data[key].server     );
      $(val).find('.genics'        ).empty().append( data[key].genics     );
      $(val).find('.userkey'       ).empty().append( data[key].userkey    );
      $(val).find('.author'        ).empty().append( data[key].name       );
      $(val).find('.company'       ).empty().append( data[key].company    );
      $(val).find('.update_on'     ).empty().append( data[key].update_on  );
      $(val).find('.account_number').empty().append( data[key].account_number );
    });

  };

  initModule = function () {
    // モデル初期化
    _model = customer.model.kids.initModule();

    // テーブル描画
    // _showTable( customer.model.getData() );
    _showTable( _model.getData() );

    // 描画後dom要素のキャッシュ
    _setJqueryMap();

    // イベント登録
    _onClickColName();
    _onClickAccountNumber();
  
  };

  return {
    // _model : function () { return _model } ,
    initModule  : initModule,
    redrawTable : redrawTable,
    updateTable : updateTable
  }


}());