customer.view = customer.view || {};
customer.view.table = ( function () {


  var
    /*private member*/
    jqueryMap = {}, _model,

    /*private method*/
    _setJqueryMap,
    _drawTable, _drawTableHeader,
    _onClickColName, _onClickAccountNumber,
    _showCol,

    /*public method*/
    redrawTable, updateTable,
    showTable,   hideTable,
    setViewCol,
    initModule, refresh
  ;


  _setJqueryMap = function () {
    var $table  = $('#main-table table'),
        $header = $table.find('thead'),
        $body   = $table.find('tbody')
    ;

    jqueryMap.$table  = $table;
    jqueryMap.$header = {};
    jqueryMap.$body   = {};
    jqueryMap.$col    = {};
    jqueryMap.$row    = $table.find('tr');

    _.each( customer.model.kids.getHeader(), function ( val, key ) {
      jqueryMap.$header[key] = $header.find( '.' + key );
      jqueryMap.$body[key]   = $body.find(   '.' + key );
      jqueryMap.$col[key]    = $table.find(  '.' + key );
    });

  };


  _drawTableHeader = function () {
    var
      data = { headerMap : customer.model.kids.getHeader() },
      tmpl = customer.db.getHtml('template/tableHeader.html'),
      complied = _.template( tmpl )
      ;

    delete data.headerMap.uid;

    // dataの引数がeachの引数をプロパティにもつObjectでないといけない
    // TODO: .find()はsetJqueryMapで使用する
    jqueryMap.$table.find('.thead').append( complied( data ) );

  };

  /**
   * テーブル描画
   * @param  {Array} data - data get DB
   */
  _drawTable = function ( data ) {
    var
      data     =  { list : data },
      tmpl     = customer.db.getHtml('template/tableContent.html'),
      complied = _.template( tmpl )
      ;
    jqueryMap.$table.append( complied( data ) );
    _setJqueryMap();
  };

  /**
   * テーブル表示
   */
  showTable = function () {
    jqueryMap.$table.show();
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
    var colsMap = customer.model.settings.getColumnState();
    _.each( colsMap, function ( val, key ) {
      $('thead .' + key ).on( 'click', function () {
        // customer.model.sortByCol( key, redrawTable );
        _model.sortByCol( key, redrawTable );
      })
    });
  };

  /**
   * 詳細情報表示イベント登録-アカウント数クリック時
   * @return {[type]k}
   */
  _onClickAccountNumber = function () {
    var row, kid, accounts;
    _.each( jqueryMap.$body.account_number, function (val , key) {
      $(val).on('click', function () {
        row = $(this).parent()[0];
        kid = $(row).find('.kid').text();
        kid = kid.trim();
        customer.view.accounts.drawTable({kid:kid});
        $.uriAnchor.setAnchor( { accounts : 'open'} );
      });
    });
  };

  _showCol = function ( val, key ) {
    if ( val === '1' ) {
      jqueryMap.$col[key].show();
    }
    else {
      jqueryMap.$col[key].hide();
    }
  }

  /**
   * 指定した列を表示・非表示
   * @param {String} key - テーブルの列のkey名
   */
  setViewCol = function ( key ) {
    jqueryMap.$col[key].toggle();
  };

  /**
   * @param  {[type]} col
   * @param  {[type]} data
   * @return {[type]}
   */
  updateTable = function ( col, data ) {
    var rows   = jqueryMap.$row;
    $(rows).remove();
    _drawTable( data );
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
      $rows     = jqueryMap.$row,
      headerMap = customer.model.kids.getHeader()
      ;

    delete headerMap.uid;

    $rows.each( function ( key, val ) {
      // idだけは個別処理
      $(val).attr('id', 'id' + data[key].id );
      // 各々の列の値をクリアしてソートした値をセット
      _.each( headerMap, function ( v, k ) {
        $(val).find('.' + k).empty().append( data[key][k] );
      });
    });

  };

  initModule = function () {
    // モデル初期化
    _model = customer.model.kids.initModule();
    customer.model.settings.initModule();

    // 描画後dom要素のキャッシュ
    _setJqueryMap();

    // テーブルヘッダー描画
    _drawTableHeader();

    // テーブル描画
    _drawTable( _model.getData() );

    // イベント登録
    _onClickColName();
    _onClickAccountNumber();

    // 表示設定内容に応じて表示列を変更
    customer.model.settings.scan( _showCol );

  };

  refresh = function () {
    customer.model.settings.refresh( _showCol );
  }

  customer.model.settings.on('refresh', _showCol );

  return {
    // _model : function () { return _model } ,
    initModule  : initModule,
    redrawTable : redrawTable,
    updateTable : updateTable,
    setViewCol  : setViewCol,
    showTable   : showTable,
    hideTable   : hideTable,
    refresh     : refresh
  }


}());