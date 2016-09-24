customer.view = ( function () {


  var 
    jqueryMap = {},
    _setJqueryMap,
    rowsort,
    initModule
  ;

  _setJqueryMap = function () {
    var $table = $('.table'),
        $header = $table.find('thead'),
        $body  = $table.find('tbody')
    ;

    jqueryMap.$table   = $table;
    jqueryMap.$header  = $table.find('thead');
    jqueryMap.$body    = $table.find('tbody');
    jqueryMap.$row     = $table.find('tr');
    jqueryMap.$kid     = $body.find('.kid');
    jqueryMap.$severs  = $body.find('.server');
    jqueryMap.$genics  = $body.find('.genics');
    jqueryMap.$userkey = $body.find('.userkey');
    jqueryMap.$author  = $body.find('.author');
  };

    /**
   * データの並び替えと表示
   * @param {Array}  datas - テーブルに表示するデータ
   * @param {String} place - htmlの表示場所を指定(class name)
   * @param {String} key   - 並び替え対象のkeyを指定
   */
  var rowsort = function ( col , data ) {

    // 行数取得
    var rows = jqueryMap.$row;

    // 表示データを削除
    rows.each( function (key, val) {
      $(val).find('.kid').empty();
      $(val).find('.server').empty();
      $(val).find('.genics').empty();
      $(val).find('.userkey').empty();
      $(val).find('.author').empty();
    });

    // ソート後のデータを表示
    rows.each( function ( key, val ) {
      $(val).find('.kid').append(  data[key].kid  );
      $(val).find('.server').append(   data[key].server   );
      $(val).find('.genics').append(   data[key].genics   );
      $(val).find('.userkey').append( data[key].userkey );
      $(val).find('.author').append( data[key].author );
    });

  };

  initModule = function () {
    _setJqueryMap();
  };

  return {
    initModule : initModule,
    rowsort : rowsort
  }


}());