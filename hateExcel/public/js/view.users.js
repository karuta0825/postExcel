customer.view = customer.view || {};
customer.view.kids = ( function () {


  var 
    /*private member*/
    jqueryMap = {}, _model,

    /*private method*/
    _setJqueryMap,
    _showTable, _showTableHeader,
    _onClickColName, _onClickAccountNumber,

    /*public method*/
    redrawTable, updateTable, 
    hideTable,   setViewCol,
    initModule
  ;

  // この情報はユーザーごとにもちDBから取得するように変更予定
  var view = {
    kid            : true,
    company        : true,
    server         : true,
    genics         : true,
    userkey        : true,
    name           : true,
    account_number : true,
    update_on      : true
  };

  _setJqueryMap = function () {
    var $table  = $('.table'),
        $header = $table.find('thead'),
        $body   = $table.find('tbody')
    ;

    jqueryMap.$table  = $table;
    jqueryMap.$header = $header;
    jqueryMap.$body   = $table.find('tbody');
    jqueryMap.$row    = $table.find('tr');
    jqueryMap.$col    = {};

    // すべての列情報をセット
    _.each( customer.model.kids.getHeader(), function ( val, key ) {
      jqueryMap.$col[key] = $body.find('.' + key);
    });

  };


  _showTableHeader = function () {
    var 
      data = { headerMap : customer.model.kids.getHeader() },
      tmpl = customer.db.getHtml('template/tableHeader.html'),
      complied = _.template( tmpl )
      ;

    delete data.headerMap.uid;

    // dataの引数がeachの引数をプロパティにもつObjectでないといけない
    $('thead').append( complied( data ) );

  };

  /**
   * テーブル描画
   * @param  {Array} data - data get DB
   */
  _showTable = function ( data ) {
    var
      data     =  { list : data },
      tmpl     = customer.db.getHtml('template/tableContent.html'),
      complied = _.template( tmpl )
      ;
    $('tbody').append( complied( data ) );
  };

  /**
   * テーブル非表示
   */
  hideTable = function () {
    jqueryMap.$table.hide();
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
    var row, kid;
    _.each( jqueryMap.$col.account_number, function (val , key) {
      $(val).on('click', function () {
        row = $(this).parent()[0];
        kid = $(row).find('.kid').text();
        kid = kid.trim();
        customer.model.accounts.getAccounts({kid:kid});
      });
    });
  };


  /**
   * 指定した列を表示・非表示
   * @param {String} key - テーブルの列のkey名
   */
  setViewCol = function ( key ) {
   if ( view[key] === true ) {
      $('table .' + key ).hide();
      view[key] = false;
    }
    else {
      $( 'table .' + key ).show();
      view[key] = true;
    }
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
    var 
      $rows      = jqueryMap.$row,
      headerMap = customer.model.kids.getHeader()
      ;

    delete headerMap.uid;

    $rows.each( function ( key, val ) {
      // idだけは個別処理
      $(val).attr('id', 'id' + data[key].id );
      // 各々の列の値をクリアしてソートした値をセット
      _.each( headerMap, function ( v, k ) {
        $(val).find('.' + k).empty().append( data[key][k]);
      });
    });

  };

  initModule = function () {
    // モデル初期化
    _model = customer.model.kids.initModule();

    // テーブルヘッダー描画
    _showTableHeader();

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
    updateTable : updateTable,
    setViewCol  : setViewCol
  }


}());