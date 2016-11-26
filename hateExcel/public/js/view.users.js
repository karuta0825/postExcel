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

  // 今後DBから取得する予定
  var headerMap = {
    check          : '対象',
    kid            : 'KID',
    company        : '名前',
    server         : 'サーバ',
    genics         : 'genicd',
    userkey        : 'ユーザキー',
    name           : '作成者',
    account_number : 'アカウント数',
    update_on      : '更新日'
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
    jqueryMap.$col    = { 
      kid            : $body.find('.kid'),
      sever          : $body.find('.server'),
      genics         : $body.find('.genics'),
      userkey        : $body.find('.userkey'),
      name           : $body.find('.name'),
      account_number : $body.find('.account_number')
    };
  };


  _showTableHeader = function () {
    var 
      data = { headerMap : customer.db.selectAll('/tableHeader')[0] },
      // data = { headerMap : headerMap },
      tmpl = customer.db._ajaxHtml('template/tableHeader.html'),
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
      tmpl     = customer.db._ajaxHtml('template/tableContent.html'),
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
    _.each( jqueryMap.$col.account_number, function (val , key) {
      $(val).on('click', function () {
        console.log($(this).parent()[0]);
      });
    });
  };


  /**
   * 指定した列を表示・非表示
   * @param {String} key - テーブルの列のkey名
   */
  setViewCol = function ( key ) {
   if ( view[key] === true ) {
      $( '.' + key ).hide();
      view[key] = false;
    }
    else {
      $( '.' + key ).show();
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
    var rows = jqueryMap.$row;

    rows.each( function ( key, val ) {
      $(val).attr('id', 'id' + data[key].id );
      $(val).find('.kid'           ).empty().append( data[key].kid        );
      $(val).find('.server'        ).empty().append( data[key].server     );
      $(val).find('.genics'        ).empty().append( data[key].genics     );
      $(val).find('.userkey'       ).empty().append( data[key].userkey    );
      $(val).find('.name'          ).empty().append( data[key].name       );
      $(val).find('.company'       ).empty().append( data[key].company    );
      $(val).find('.update_on'     ).empty().append( data[key].update_on  );
      $(val).find('.account_number').empty().append( data[key].account_number );
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
    updateTable : updateTable
  }


}());